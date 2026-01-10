import * as React from 'react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  icon: LucideIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
};

const Icon: React.FC<IconProps> = ({ icon: LucideIconComponent, size = 'md', className, ...props }) => {
  return (
    <LucideIconComponent
      className={cn(sizeMap[size], className)}
      {...props}
    />
  );
};

Icon.displayName = 'Icon';

export { Icon };
