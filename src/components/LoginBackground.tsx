'use client';

export function LoginBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-white opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-100 to-transparent opacity-70"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-100 blur-3xl opacity-30"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-purple-100 blur-3xl opacity-20"></div>
    </div>
  );
}