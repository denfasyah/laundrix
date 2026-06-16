'use client';

import { useEffect, useRef } from 'react';

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
          gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
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
    `;

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
      gl!.uniform2f(resolutionLocation, canvas!.width, canvas!.height);
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
