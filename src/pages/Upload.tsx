import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { UploadZone } from '@/components/upload/UploadZone';
import { Wand2, FolderOpen, Zap } from 'lucide-react';

export default function Upload() {
  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl lg:text-3xl font-bold text-foreground"
        >
          Upload
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm lg:text-base text-muted-foreground mt-1"
        >
          Faça upload para organização automática
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Upload Zone */}
        <div className="lg:col-span-2 order-1">
          <UploadZone />
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4 lg:space-y-6 order-2">
          {/* Auto-organize info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-4 lg:p-6"
          >
            <div className="flex items-center gap-3 mb-3 lg:mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Wand2 className="w-4 lg:w-5 h-4 lg:h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm lg:text-base">Organização Automática</h3>
            </div>
            <p className="text-xs lg:text-sm text-muted-foreground">
              Os screenshots serão organizados em pastas baseadas no app de origem.
            </p>
          </motion.div>

          {/* Supported formats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-4 lg:p-6"
          >
            <div className="flex items-center gap-3 mb-3 lg:mb-4">
              <div className="p-2 rounded-lg bg-info/10">
                <FolderOpen className="w-4 lg:w-5 h-4 lg:h-5 text-info" />
              </div>
              <h3 className="font-semibold text-foreground text-sm lg:text-base">Formatos Suportados</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['PNG', 'JPG', 'JPEG', 'WebP', 'GIF', 'BMP'].map((format) => (
                <span 
                  key={format}
                  className="px-2.5 py-1 text-[10px] lg:text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
                >
                  {format}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Quick tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-4 lg:p-6"
          >
            <div className="flex items-center gap-3 mb-3 lg:mb-4">
              <div className="p-2 rounded-lg bg-success/10">
                <Zap className="w-4 lg:w-5 h-4 lg:h-5 text-success" />
              </div>
              <h3 className="font-semibold text-foreground text-sm lg:text-base">Dicas Rápidas</h3>
            </div>
            <ul className="space-y-2 text-xs lg:text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Arraste múltiplos arquivos
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Metadados melhoram detecção
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Use sync automático
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
