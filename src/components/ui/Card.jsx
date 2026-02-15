import React from 'react';

export function Card({ children, className = '', ...props }) {
  const baseClasses = 'bg-paper-50 dark:bg-night-900 rounded-xl2 shadow-soft border border-line dark:border-night-line text-ink-900 dark:text-slate-100';
  
  const classes = `${baseClasses} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
