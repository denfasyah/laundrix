'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function login(formData: FormData) {
  const email = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, message: 'Email atau password salah' };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.is_active) {
    return { success: false, message: 'Email atau password salah' };
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  
  if (!passwordMatch) {
    return { success: false, message: 'Email atau password salah' };
  }

  const roleValue = user.role.toLowerCase();
  (await cookies()).set('session', roleValue, { path: '/', httpOnly: true });

  return { success: true, role: roleValue as 'owner' | 'staff' };
}

export async function logout() {
  (await cookies()).delete('session');
  // Invalidate router cache so "back" button doesn't show protected pages
  revalidatePath('/', 'layout');
  redirect('/login');
}
