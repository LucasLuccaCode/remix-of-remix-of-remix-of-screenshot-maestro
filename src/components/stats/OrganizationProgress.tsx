import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { OrganizationStats } from '@/types';

interface OrganizationProgressProps {
  stats: OrganizationStats;
}

export function OrganizationProgress({ stats }: OrganizationProgressProps) {
  const organizationRate = (stats.organizedScreenshots / stats.totalScreenshots) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-panel p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-6">Progresso de Organização</h3>
      
      {/* Main progress ring */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="hsl(222, 30%, 14%)"
              strokeWidth="10"
              fill="none"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              stroke="url(#progressGradient)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 70}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - organizationRate / 100) }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(175, 80%, 50%)" />
                <stop offset="100%" stopColor="hsl(199, 89%, 48%)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold gradient-text">{organizationRate.toFixed(0)}%</span>
            <span className="text-sm text-muted-foreground">organizado</span>
          </div>
        </div>
      </div>

      {/* Stats breakdown */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
          <CheckCircle className="w-5 h-5 text-success" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Organizados</p>
            <p className="text-xs text-muted-foreground">{stats.organizedScreenshots} screenshots</p>
          </div>
          <span className="text-lg font-semibold text-success">
            {((stats.organizedScreenshots / stats.totalScreenshots) * 100).toFixed(0)}%
          </span>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
          <Clock className="w-5 h-5 text-warning" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Pendentes</p>
            <p className="text-xs text-muted-foreground">{stats.unorganizedScreenshots} screenshots</p>
          </div>
          <span className="text-lg font-semibold text-warning">
            {((stats.unorganizedScreenshots / stats.totalScreenshots) * 100).toFixed(0)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
