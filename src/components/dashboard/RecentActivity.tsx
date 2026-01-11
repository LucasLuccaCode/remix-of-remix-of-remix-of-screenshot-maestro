import { motion } from 'framer-motion';
import { Screenshot } from '@/types';
import { Image, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface RecentActivityProps {
  screenshots: Screenshot[];
}

export function RecentActivity({ screenshots }: RecentActivityProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-panel p-4 lg:p-6"
    >
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h2 className="text-base lg:text-lg font-semibold text-foreground">Atividade Recente</h2>
        <button className="text-xs lg:text-sm text-primary hover:text-primary/80 transition-colors">
          Ver tudo
        </button>
      </div>

      <div className="space-y-2 lg:space-y-4">
        {screenshots.slice(0, 5).map((screenshot, index) => (
          <motion.div
            key={screenshot.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
            className="flex items-center gap-3 lg:gap-4 p-2 lg:p-3 rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
              <Image className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-xs lg:text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                {screenshot.filename}
              </p>
              <div className="flex items-center gap-1.5 lg:gap-2 text-[10px] lg:text-xs text-muted-foreground">
                <span className="px-1.5 lg:px-2 py-0.5 rounded-full bg-primary/10 text-primary truncate max-w-[80px] lg:max-w-none">
                  {screenshot.appName}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">{(screenshot.size / 1000).toFixed(0)} KB</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-[10px] lg:text-xs text-muted-foreground flex-shrink-0">
              <Clock className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
              <span className="whitespace-nowrap">{formatDistanceToNow(screenshot.createdAt, { addSuffix: true, locale: ptBR })}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
