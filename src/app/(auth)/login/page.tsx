import { ShaderBackground } from '@/components/ui/shader-background';
import { LoginForm } from '@/components/auth/login-form';

export const metadata = {
  title: 'Laundrix | Masuk',
};

export default function LoginPage() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-4">
      <ShaderBackground />
      <LoginForm />
    </div>
  );
}
