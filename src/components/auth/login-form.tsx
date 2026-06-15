'use client';

import { login } from '@/lib/actions/auth.actions';
import { Lock, Eye, EyeOff, LogOut, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export function LoginForm() {
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className={`relative z-10 w-full max-w-[400px] transition-opacity duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="refined-glass bg-white/70 rounded-2xl p-6 sm:p-8 shadow-2xl transition-all duration-300">
        <header className="mb-4 sm:mb-6 flex flex-col items-center text-center">
          <div className="mb-2 sm:mb-4">
            <img 
              src="/logo.png" 
              alt="Logo Laundrix" 
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-md" 
              onError={(e) => {
                e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuAIea0CE3VDU9HMMvUxS45WjYuTHDD35FIN6u5uCeMmjWp6jBqA6RmfJ_vaBgnLUQsF_Y_ex-kmuYSB_HzzZxRt61c8gyng8P97m3GoS5mPl2T-xdn9LDZtRnEHkrEVKWs9fOBM8u8sMVmi_64yRuNzM5ceQ9fvsqIpFZCfUna9iw5qpye2_5NX6DHir5-xFN3WLqQ-ocQG4APlNIFcZyqhYRANN9GZ-PWxiT2Qz58m1R91w6r1N6fw3Gsk8udlJF8ZLYvq8kkDeT4";
              }}
            />
          </div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-[24px] sm:text-[28px] leading-tight tracking-tight font-bold text-[#00687b]">Laundrix</h1>
          </div>
          <p className="text-[12px] sm:text-[13px] leading-[18px] sm:leading-[20px] text-[#3e484c] mt-1">
            Please enter your credentials to access your dashboard.
          </p>
        </header>

        <form 
          action={async (formData) => {
            const email = formData.get('username') as string;
            const password = formData.get('password') as string;

            if (!email || !password) {
              MySwal.fire({
                icon: 'warning',
                title: 'Validasi Gagal',
                text: 'Email dan password wajib diisi!',
                confirmButtonColor: '#00687b',
              });
              return;
            }

            setIsLoading(true);
            try {
              const res = await login(formData);
              if (res.success) {
                await MySwal.fire({
                  icon: 'success',
                  title: 'Login Berhasil',
                  text: 'Mengarahkan ke dashboard...',
                  showConfirmButton: false,
                  timer: 1500,
                });
                router.push(`/${res.role}/dashboard`);
              } else {
                MySwal.fire({
                  icon: 'error',
                  title: 'Login Gagal',
                  text: res.message || 'Email atau password salah',
                  confirmButtonColor: '#00687b',
                });
              }
            } finally {
              setIsLoading(false);
            }
          }} 
          className="space-y-4 sm:space-y-5"
        >
          {/* Email / Username Field */}
          <div className="space-y-1">
            <label className="text-[12px] sm:text-[13px] leading-tight font-semibold text-[#3e484c] block" htmlFor="username">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Mail className="text-[#2FA1BB] w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
              </div>
              <input 
                id="username" 
                name="username" 
                type="text" 
                placeholder="nama@laundrix.com" 
                required 
                className="block w-full pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 bg-white/60 border border-white/60 rounded-xl text-[14px] sm:text-[15px] focus:ring-2 focus:ring-[#2FA1BB]/40 focus:border-[#2FA1BB] focus:bg-white outline-none transition-all duration-200 placeholder:text-[#6e797d]/60 shadow-sm text-black"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <div className="flex justify-between items-center mb-1">
              <label className="text-[12px] sm:text-[13px] leading-tight font-semibold text-[#3e484c]" htmlFor="password">
                Password
              </label>
              <a href="#" className="text-[12px] sm:text-[13px] leading-tight font-semibold text-[#00687b] hover:text-[#004e5d] transition-colors">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Lock className="text-[#2FA1BB] w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
              </div>
              <input 
                id="password" 
                name="password" 
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••" 
                required 
                className="block w-full pl-10 sm:pl-11 pr-10 sm:pr-12 py-3 sm:py-3.5 bg-white/60 border border-white/60 rounded-xl text-[14px] sm:text-[15px] focus:ring-2 focus:ring-[#2FA1BB]/40 focus:border-[#2FA1BB] focus:bg-white outline-none transition-all duration-200 placeholder:text-[#6e797d]/60 shadow-sm text-black"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-[#6e797d]/60 hover:text-[#00687b] transition-colors"
              >
                {showPassword ? <EyeOff className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" /> : <Eye className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center">
            <input 
              id="remember" 
              name="remember" 
              type="checkbox" 
              className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#00687b] focus:ring-[#2FA1BB]/40 border-white/80 rounded transition-all duration-200 bg-white/60"
            />
            <label htmlFor="remember" className="ml-2 text-[12px] sm:text-[13px] leading-tight text-[#3e484c] cursor-pointer select-none">
              Remember me
            </label>
          </div>

          {/* Action Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#00687b] hover:bg-[#004e5d] text-white text-[13px] sm:text-[14px] leading-tight font-semibold py-3 sm:py-3.5 rounded-xl shadow-lg transform active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 mt-6 sm:mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : (
              <>
                Sign In
                <LogOut className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <footer className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/40 text-center">
          <p className="text-[12px] sm:text-[13px] leading-tight text-[#3e484c]">
            Don't have an account? <a href="#" className="text-[#00687b] font-semibold hover:underline">Contact Support</a>
          </p>
        </footer>
      </div>

      {/* System Status */}
      <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3 sm:gap-4">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#16A34A] shadow-[0_0_8px_rgba(22,163,74,0.4)]"></div>
        </div>
        <div className="w-1 h-1 rounded-full bg-[#bdc8cd]/50"></div>
      </div>
    </main>
  );
}
