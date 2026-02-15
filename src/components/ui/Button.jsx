import React from 'react';

export function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-paper-100 dark:focus:ring-offset-slate-950';
  
  const variants = {
    primary: 'bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-600',
    secondary: 'bg-brand-900 text-white hover:bg-brand-800 focus:ring-brand-900',
    outline: 'border border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-white focus:ring-brand-900 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800',
    ghost: 'text-brand-900 hover:bg-brand-100 focus:ring-brand-900 dark:text-slate-100 dark:hover:bg-slate-800'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
