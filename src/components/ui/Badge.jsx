import React from 'react';

export function Badge({ children, variant = 'default', className = '' }) {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const variants = {
    default: 'bg-brand-100 text-brand-800 dark:bg-slate-800 dark:text-slate-100',
    secondary:
      'bg-brand-50 text-brand-800 ring-1 ring-brand-200 dark:bg-slate-800/60 dark:text-slate-100 dark:ring-slate-700',
    accent: 'bg-accent-100 text-accent-800 dark:bg-slate-800 dark:text-slate-100',
    success: 'bg-green-100 text-green-800 dark:bg-emerald-950/40 dark:text-emerald-200',
    outline: 'border border-brand-300 text-brand-700 dark:border-slate-700 dark:text-slate-100'
  };
  
  const classes = `${baseClasses} ${variants[variant] ?? variants.default} ${className}`;
  
  return <span className={classes}>{children}</span>;
}
