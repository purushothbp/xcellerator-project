// actions/auth-actions.ts
'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const getRequestHeaders = async () => {
  const currentHeaders = await headers();
  const headerObject: Record<string, string> = {};
  for (const [key, value] of currentHeaders.entries()) {
    headerObject[key] = value;
  }
  return headerObject;
};

export async function signInAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }
  try {
    // This calls Better Auth's core sign-in logic on the server

    await auth.api.signInEmail({
      body: { email, password },
      headers: await getRequestHeaders(),
    });
    
    // Redirect on success (Better Auth handles setting secure cookies internally)
    redirect('/'); 
    
  } catch (error) {
    // Handle specific errors
    if (
      typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      error.name === 'IncorrectCredentialsError'
    ) {
      return { error: 'Invalid email or password.' };
    }
    console.error(error);
    return { error: 'An unexpected error occurred.' };
  }
}

export async function signInWithGoogleAction() {
  try {
    const response = await auth.api.signInSocial({
      body: {
        provider: 'google',
        callbackURL: '/',
        errorCallbackURL: '/?error=google',
      },
      headers: await getRequestHeaders(),
    });

    if (
      response &&
      typeof response === 'object' &&
      'redirect' in response &&
      response.redirect &&
      'url' in response &&
      response.url
    ) {
      redirect(response.url);
    } else {
      redirect('/');
    }
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'digest' in error &&
      typeof error.digest === 'string' &&
      error.digest.startsWith('NEXT_REDIRECT')
    ) {
      throw error;
    }
    console.error('Google sign-in failed', error);
    redirect('/?error=google');
  }
}

export async function signOutAction() {
  'use server';
  await auth.api.signOut({
    headers: await getRequestHeaders(),
  });
  redirect('/');
}
