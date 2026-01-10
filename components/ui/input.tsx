import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
  helperText?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, success, helperText, label, id, ...props }, ref) => {
    const inputId = id || `input-${React.useId()}`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-ds-body-sm text-text-primary mb-ds-xs font-medium"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            'flex h-10 w-full rounded-ds-md border bg-white px-ds-md py-ds-sm text-ds-body transition-all duration-fast',
            'placeholder:text-text-tertiary',
            'focus:outline-none focus:ring-2 focus:ring-offset-1',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-bg-light',
            {
              'border-border-ds focus:ring-primary-ds focus:border-primary-ds': !error && !success,
              'border-danger focus:ring-danger text-danger': error,
              'border-success focus:ring-success': success,
            },
            className
          )}
          ref={ref}
          {...props}
        />
        {helperText && (
          <p
            className={cn('mt-ds-xs text-ds-body-sm', {
              'text-text-secondary': !error && !success,
              'text-danger': error,
              'text-success': success,
            })}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
