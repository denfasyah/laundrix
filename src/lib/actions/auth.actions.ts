'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function login(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  if (username === 'owner' && password === 'owner123') {
    (await cookies()).set('session', 'owner', { path: '/', httpOnly: true });
    redirect('/owner/dashboard');
  } else if (username === 'staff' && password === 'staff123') {
    (await cookies()).set('session', 'staff', { path: '/', httpOnly: true });
    redirect('/staff/dashboard');
  } else {
    return { error: 'Invalid credentials' };
  }
}

export async function logout() {
  (await cookies()).delete('session');
  // Invalidate router cache so "back" button doesn't show protected pages
  revalidatePath('/', 'layout');
  redirect('/login');
}
