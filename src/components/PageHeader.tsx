'use client';

import { useState, useEffect } from 'react';

type PageHeaderProps = {
  title: string;
  description: string;
  className?: string;
};

export function PageHeader({ title, description, className = '' }: PageHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className={`mb-10 text-center ${className}`}>
      <h1 className={`text-4xl font-bold tracking-tight mb-3 transition-all duration-700 delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {title}
      </h1>
      <p className={`text-xl text-gray-600 max-w-md mx-auto transition-all duration-700 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {description}
      </p>
    </div>
  );
}