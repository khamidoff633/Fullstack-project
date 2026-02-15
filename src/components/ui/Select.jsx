import React from 'react';

export function Select({ className = '', children, ...props }) {
  const baseClasses = 'w-full px-3 py-2 border border-line dark:border-night-line rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-900 focus:border-transparent bg-white dark:bg-night-900 text-ink-900 dark:text-slate-100';
  
  const classes = `${baseClasses} ${className}`;
  
  return (
    <select className={classes} {...props}>
      {children}
    </select>
  );
}
