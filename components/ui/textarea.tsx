import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  success?: boolean;
  helperText?: string;
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, success, helperText, label, id, ...props }, ref) => {
    const textareaId = id || `textarea-${React.useId()}`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-ds-body-sm text-text-primary mb-ds-xs font-medium"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            'flex min-h-[80px] w-full rounded-ds-md border bg-white px-ds-md py-ds-sm text-ds-body transition-all duration-fast',
            'placeholder:text-text-tertiary resize-vertical',
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

Textarea.displayName = 'Textarea';

export { Textarea };
