import { motion } from 'framer-motion';
import { Folder, ChevronRight } from 'lucide-react';
import { AppFolder } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface FolderCardProps {
  folder: AppFolder;
  index: number;
  onClick?: () => void;
}

export function FolderCard({ folder, index, onClick }: FolderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      className="folder-card group"
    >
      <div className="flex items-center gap-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: `${folder.color}20` }}
        >
          {folder.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground truncate">{folder.name}</h3>
          <p className="text-sm text-muted-foreground">
            {folder.screenshotCount} screenshots
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground hidden sm:block">
            {formatDistanceToNow(folder.lastUpdated, { addSuffix: true, locale: ptBR })}
          </span>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </motion.div>
  );
}
