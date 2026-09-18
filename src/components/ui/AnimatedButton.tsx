import React from 'react';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold-shimmer' | 'dark-shimmer' | 'outline-gold' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'gold-shimmer',
  size = 'md',
  children,
  icon,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-xs tracking-[0.15em]',
    lg: 'px-8 py-4 text-sm tracking-[0.18em]',
  };

  if (variant === 'gold-shimmer') {
    return (
      <button
        className={`group relative inline-flex items-center justify-center gap-2.5 rounded-full overflow-hidden font-medium uppercase transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-charcoal-900 shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.45)] ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {/* Animated Light Sweep */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
        </span>
      </button>
    );
  }

  if (variant === 'dark-shimmer') {
    return (
      <button
        className={`group relative inline-flex items-center justify-center gap-2.5 rounded-full overflow-hidden font-medium uppercase transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 bg-[#12141A] text-[#F5E6C8] border border-gold/40 shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:border-gold hover:shadow-[0_8px_25px_rgba(197,160,89,0.3)] ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {/* Animated 21st shimmer line */}
        <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-gold/25 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
        </span>
      </button>
    );
  }

  if (variant === 'outline-gold') {
    return (
      <button
        className={`group relative inline-flex items-center justify-center gap-2.5 rounded-full overflow-hidden font-medium uppercase transition-all duration-300 bg-white hover:bg-[#FDFCFA] text-charcoal-800 border border-gold/40 hover:border-gold shadow-sm hover:shadow-[0_4px_20px_rgba(197,160,89,0.15)] ${sizeClasses[size]} ${className}`}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
        </span>
      </button>
    );
  }

  return (
    <button
      className={`group relative inline-flex items-center justify-center gap-2 text-charcoal-700 hover:text-gold uppercase transition-colors duration-200 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
    </button>
  );
};
