import { motion } from 'framer-motion';
import { Screenshot } from '@/types';
import { Image, MoreVertical, Download, Trash2, FolderOpen } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ScreenshotCardProps {
  screenshot: Screenshot;
  index: number;
}

export function ScreenshotCard({ screenshot, index }: ScreenshotCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="screenshot-card group"
    >
      {/* Thumbnail placeholder */}
      <div className="aspect-video bg-secondary/50 flex items-center justify-center relative overflow-hidden">
        <Image className="w-12 h-12 text-muted-foreground/30" />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg bg-primary text-primary-foreground"
          >
            <Download className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg bg-secondary text-foreground"
          >
            <FolderOpen className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground truncate">
              {screenshot.filename}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {screenshot.appName}
              </span>
              <span className="text-xs text-muted-foreground">
                {(screenshot.size / 1000).toFixed(0)} KB
              </span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-panel border-border/50">
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <Download className="w-4 h-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <FolderOpen className="w-4 h-4" />
                Mover para pasta
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 cursor-pointer text-destructive focus:text-destructive">
                <Trash2 className="w-4 h-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-xs text-muted-foreground mt-3">
          {formatDistanceToNow(screenshot.createdAt, { addSuffix: true, locale: ptBR })}
        </p>
      </div>
    </motion.div>
  );
}
