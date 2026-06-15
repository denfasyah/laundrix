const fs = require('fs');
const path = require('path');

const root = __dirname;
const src = path.join(root, 'src');

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

ensureDir(path.join(src, 'components/ui'));
ensureDir(path.join(src, 'components/auth'));

// 1. globals.css update
const globalsCss = `@import "tailwindcss";

@theme {
  --color-secondary: #805600;
  --color-on-primary-fixed-variant: #004e5d;
  --color-border-default: #E5E5E5;
  --color-on-primary-container: #00323c;
  --color-on-tertiary-fixed: #2d1600;
  --color-on-secondary-fixed-variant: #614000;
  --color-on-secondary-container: #694600;
  --color-on-tertiary: #ffffff;
  --color-success: #16A34A;
  --color-on-primary: #ffffff;
  --color-on-surface: #1b1c1c;
  --color-background: #fbf9f9;
  --color-on-error: #ffffff;
  --color-tertiary-container: #cd843a;
  --color-surface-card: #FFFFFF;
  --color-surface-variant: #e3e2e2;
  --color-outline: #6e797d;
  --color-primary-fixed-dim: #6dd4ef;
  --color-tertiary-fixed-dim: #ffb875;
  --color-secondary-container: #fdaf06;
  --color-teal-50: #EBF8FC;
  --color-secondary-fixed-dim: #ffba42;
  --color-surface-container-lowest: #ffffff;
  --color-on-surface-variant: #3e484c;
  --color-inverse-primary: #6dd4ef;
  --color-secondary-fixed: #ffddaf;
  --color-tertiary: #8c4f03;
  --color-primary-fixed: #aeecff;
  --color-error: #DC2626;
  --color-outline-variant: #bdc8cd;
  --color-tertiary-fixed: #ffdcc0;
  --color-surface-tint: #00687b;
  --color-inverse-surface: #303031;
  --color-surface-dim: #dbdad9;
  --color-surface-container-highest: #e3e2e2;
  --color-surface-container: #efeded;
  --color-error-container: #ffdad6;
  --color-surface-bg: #FAFAFA;
  --color-on-error-container: #93000a;
  --color-on-background: #1b1c1c;
  --color-on-tertiary-fixed-variant: #6b3b00;
  --color-on-primary-fixed: #001f26;
  --color-primary-container: #2fa1bb;
  --color-on-secondary: #ffffff;
  --color-primary: #00687b;
  --color-inverse-on-surface: #f2f0f0;
  --color-on-tertiary-container: #472500;
  --color-teal-900: #0C3A47;
  --color-surface-container-high: #e9e8e7;
  --color-on-secondary-fixed: #281800;
  --color-surface-container-low: #f5f3f3;
  --color-surface: #fbf9f9;
  --color-surface-bright: #fbf9f9;

  --spacing-md: 16px;
  --spacing-gutter: 24px;
  --spacing-margin-desktop: 64px;
  --spacing-margin-mobile: 16px;
  --spacing-3xl: 64px;
  --spacing-sm: 8px;
  --spacing-2xl: 48px;
  --spacing-xs: 4px;
  --spacing-lg: 24px;
  --spacing-unit: 4px;
  --spacing-xl: 32px;

  --font-body-sm: "Inter", sans-serif;
  --font-display-md: "Inter", sans-serif;
  --font-data-metric: "JetBrains Mono", monospace;
  --font-label-sm: "Inter", sans-serif;
  --font-body-md: "Inter", sans-serif;
  --font-headline-lg: "Inter", sans-serif;
  --font-display-lg: "Inter", sans-serif;
  --font-headline-lg-mobile: "Inter", sans-serif;
  --font-body-lg: "Inter", sans-serif;
  --font-headline-md: "Inter", sans-serif;
  --font-caption: "Inter", sans-serif;
}

body {
  font-family: var(--font-body-sm);
  margin: 0;
  overflow: hidden;
  background-color: var(--color-background);
  color: var(--color-on-surface);
}

.refined-glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
}
`;
fs.writeFileSync(path.join(src, 'app/globals.css'), globalsCss);


// 2. Shader Background
const shaderContent = `'use client';

import { useEffect, useRef } from 'react';

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vertexShaderSource = \`
      attribute vec2 position;
      void main() {
          gl_Position = vec4(position, 0.0, 1.0);
      }
    \`;

    const fragmentShaderSource = \`
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          
          // Create a soft, flowing teal gradient background
          vec3 color1 = vec3(0.184, 0.631, 0.733); // #2fa1bb
          vec3 color2 = vec3(0.92, 0.98, 1.0);    // Light sky blue
          
          float noise = sin(uv.x * 3.0 + u_time * 0.5) * cos(uv.y * 2.0 + u_time * 0.3);
          float mixFactor = uv.y + noise * 0.1;
          
          vec3 finalColor = mix(color1, color2, clamp(mixFactor, 0.0, 1.0));
          
          // Add a subtle vignette
          float vignette = distance(uv, vec2(0.5));
          finalColor *= 1.0 - vignette * 0.2;
          
          gl_FragColor = vec4(finalColor, 1.0);
      }
    \`;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

    let animationFrameId: number;

    function render(time: number) {
      time *= 0.001;
      
      if (canvas && (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight)) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          gl!.viewport(0, 0, canvas.width, canvas.height);
      }

      gl!.uniform1f(timeLocation, time);
      gl!.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      id="shader-canvas" 
      className="fixed top-0 left-0 w-[100vw] h-[100vh] -z-10" 
    />
  );
}
`;
fs.writeFileSync(path.join(src, 'components/ui/shader-background.tsx'), shaderContent);

// 3. Login Form Component
const loginFormContent = `'use client';

import { login } from '@/lib/actions/auth.actions';
import { Mail, Lock, Eye, EyeOff, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="relative z-10 w-full max-w-[440px]">
      <div className="refined-glass rounded-2xl p-xl md:p-xl shadow-2xl transition-all duration-300">
        <header className="mb-xl flex flex-col items-center text-center">
          <div className="mb-md">
            <div className="w-16 h-16 flex items-center justify-center bg-[#00687b] rounded-full text-white text-2xl font-bold shadow-md">
              L
            </div>
          </div>
          <div className="flex items-center gap-2 mb-xs">
            <h1 className="font-display-md text-[30px] font-bold text-[#00687b]">Laundrix</h1>
          </div>
          <p className="font-body-sm text-[13px] text-on-surface-variant mt-1">
            Please enter your credentials to access your dashboard.
          </p>
        </header>

        <form 
          action={(formData) => {
            setIsLoading(true);
            login(formData).finally(() => setIsLoading(false));
          }} 
          className="space-y-lg"
        >
          {/* Username Field */}
          <div className="space-y-xs">
            <label className="font-label-sm text-[13px] font-semibold text-on-surface-variant block" htmlFor="username">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-md flex items-center pointer-events-none">
                <User className="text-[#2FA1BB] w-[20px] h-[20px]" />
              </div>
              <input 
                id="username" 
                name="username" 
                type="text" 
                placeholder="owner / staff" 
                required 
                className="block w-full pl-11 pr-md py-md bg-white/40 border border-white/60 rounded-xl font-body-md text-[15px] focus:ring-2 focus:ring-[#2FA1BB]/20 focus:border-[#2FA1BB] outline-none transition-all duration-200 placeholder:text-outline/60 shadow-sm"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-xs">
            <div className="flex justify-between items-center mb-xs">
              <label className="font-label-sm text-[13px] font-semibold text-on-surface-variant" htmlFor="password">
                Password
              </label>
              <a href="#" className="font-label-sm text-[13px] font-semibold text-[#00687b] hover:text-[#004e5d] transition-colors">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-md flex items-center pointer-events-none">
                <Lock className="text-[#2FA1BB] w-[20px] h-[20px]" />
              </div>
              <input 
                id="password" 
                name="password" 
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••" 
                required 
                className="block w-full pl-11 pr-12 py-md bg-white/40 border border-white/60 rounded-xl font-body-md text-[15px] focus:ring-2 focus:ring-[#2FA1BB]/20 focus:border-[#2FA1BB] outline-none transition-all duration-200 placeholder:text-outline/60 shadow-sm"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-md flex items-center text-outline/60 hover:text-[#00687b] transition-colors"
              >
                {showPassword ? <EyeOff className="w-[20px] h-[20px]" /> : <Eye className="w-[20px] h-[20px]" />}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center">
            <input 
              id="remember" 
              name="remember" 
              type="checkbox" 
              className="h-4 w-4 text-[#00687b] focus:ring-[#2FA1BB]/40 border-white/80 rounded transition-all duration-200 bg-white/40"
            />
            <label htmlFor="remember" className="ml-sm font-body-sm text-[13px] text-on-surface-variant cursor-pointer select-none">
              Remember me
            </label>
          </div>

          {/* Action Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#00687b] hover:bg-[#004e5d] text-white font-label-sm text-[13px] font-semibold py-md rounded-xl shadow-lg transform active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-sm mt-xl disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : "Sign In"}
            {!isLoading && <LogOut className="w-[18px] h-[18px]" />}
          </button>
        </form>

        {/* Footer */}
        <footer className="mt-xl pt-lg border-t border-white/40 text-center">
          <p className="font-body-sm text-[13px] text-on-surface-variant">
            Don't have an account? <a href="#" className="text-[#00687b] font-label-sm font-semibold hover:underline">Contact Support</a>
          </p>
        </footer>
      </div>

      {/* System Status */}
      <div className="mt-lg flex items-center justify-center gap-md">
        <div className="flex items-center gap-xs">
          <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(22,163,74,0.4)]"></div>
        </div>
        <div className="w-1 h-1 rounded-full bg-outline-variant/50"></div>
      </div>
    </main>
  );
}
`;
fs.writeFileSync(path.join(src, 'components/auth/login-form.tsx'), loginFormContent);


// 4. Login Page
const pageContent = `import { ShaderBackground } from '@/components/ui/shader-background';
import { LoginForm } from '@/components/auth/login-form';

export const metadata = {
  title: 'Laundrix | Masuk',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-margin-mobile">
      <ShaderBackground />
      <LoginForm />
    </div>
  );
}
`;
fs.writeFileSync(path.join(src, 'app/(auth)/login/page.tsx'), pageContent);

console.log("UI implemented successfully.");
