import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-ds-md text-ds-button transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95',
          {
            'bg-primary-ds text-white hover:bg-primary-ds-dark hover:shadow-elevation-2 focus-visible:ring-primary-ds': variant === 'primary',
            'bg-secondary-ds text-white hover:bg-secondary-ds hover:brightness-110 hover:shadow-elevation-2 focus-visible:ring-secondary-ds': variant === 'secondary',
            'border-2 border-primary-ds text-primary-ds bg-transparent hover:bg-primary-ds-lighter focus-visible:ring-primary-ds': variant === 'outline',
            'text-text-primary bg-transparent hover:bg-bg-light focus-visible:ring-primary-ds': variant === 'ghost',
            'bg-danger text-white hover:bg-danger hover:brightness-110 hover:shadow-elevation-2 focus-visible:ring-danger': variant === 'danger',
            'bg-success text-white hover:bg-success hover:brightness-110 hover:shadow-elevation-2 focus-visible:ring-success': variant === 'success',
          },
          {
            'h-8 px-ds-md gap-ds-xs': size === 'sm',
            'h-10 px-ds-lg gap-ds-sm': size === 'md',
            'h-12 px-ds-xl gap-ds-sm': size === 'lg',
          },
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
