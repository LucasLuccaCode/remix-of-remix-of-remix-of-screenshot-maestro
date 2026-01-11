import { motion } from 'framer-motion';
import { Upload, Wand2, FolderSync, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const actions = [
  { icon: Upload, label: 'Upload', description: 'Adicionar screenshots', variant: 'default' as const },
  { icon: Wand2, label: 'Organizar', description: 'Auto-organizar tudo', variant: 'secondary' as const },
  { icon: FolderSync, label: 'Sincronizar', description: 'Atualizar pastas', variant: 'secondary' as const },
  { icon: Trash2, label: 'Limpar', description: 'Remover duplicatas', variant: 'secondary' as const },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-panel p-4 lg:p-6"
    >
      <h2 className="text-base lg:text-lg font-semibold text-foreground mb-4 lg:mb-6">Ações Rápidas</h2>
      
      <div className="grid grid-cols-4 lg:grid-cols-2 gap-2 lg:gap-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center gap-1.5 lg:gap-2 p-3 lg:p-4 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-primary/20 transition-all group"
          >
            <div className="p-2 lg:p-3 rounded-lg lg:rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <action.icon className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
            </div>
            <span className="text-[10px] lg:text-sm font-medium text-foreground">{action.label}</span>
            <span className="text-[9px] lg:text-xs text-muted-foreground hidden lg:block">{action.description}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
