'use client';

import { useState, useEffect } from 'react';

export function LoginHeader() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="mb-10 text-center">
      <h1 className={`text-4xl font-bold tracking-tight mb-3 transition-all duration-700 delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Welcome Back
      </h1>
      <p className={`text-xl text-gray-600 max-w-md mx-auto transition-all duration-700 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Sign in to access your bookings, manage your properties, and continue your SmartHost experience.
      </p>
    </div>
  );
}