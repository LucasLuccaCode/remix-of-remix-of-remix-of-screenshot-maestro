import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="stat-card group"
    >
      <div className="flex items-start justify-between mb-2 lg:mb-4">
        <div className="p-2 lg:p-3 rounded-lg lg:rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-colors">
          <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
        </div>
        {trend && (
          <span className={cn(
            'text-[10px] lg:text-sm font-medium px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-md',
            trend.isPositive 
              ? 'text-success bg-success/10' 
              : 'text-destructive bg-destructive/10'
          )}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      
      <h3 className="text-xl lg:text-3xl font-bold text-foreground mb-0.5 lg:mb-1">{value}</h3>
      <p className="text-xs lg:text-sm text-muted-foreground line-clamp-1">{title}</p>
      {subtitle && (
        <p className="text-[10px] lg:text-xs text-muted-foreground/70 mt-0.5 lg:mt-1">{subtitle}</p>
      )}
    </motion.div>
  );
}
