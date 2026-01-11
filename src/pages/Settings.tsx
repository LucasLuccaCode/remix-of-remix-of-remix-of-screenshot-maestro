import { motion } from 'framer-motion';
import { FolderSync, Bell, Shield, Database, Trash2 } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const settingSections = [
  {
    icon: FolderSync,
    title: 'Sincronização',
    description: 'Configure a sincronização automática',
    settings: [
      { id: 'auto-sync', label: 'Sincronização automática', type: 'switch', defaultValue: true },
      { id: 'sync-interval', label: 'Intervalo (minutos)', type: 'number', defaultValue: 30 },
      { id: 'sync-path', label: 'Pasta de screenshots', type: 'text', defaultValue: '~/Pictures/Screenshots' },
    ]
  },
  {
    icon: Bell,
    title: 'Notificações',
    description: 'Preferências de notificação',
    settings: [
      { id: 'notify-new', label: 'Novos screenshots', type: 'switch', defaultValue: true },
      { id: 'notify-organized', label: 'Organização concluída', type: 'switch', defaultValue: true },
      { id: 'notify-duplicates', label: 'Duplicatas encontradas', type: 'switch', defaultValue: false },
    ]
  },
  {
    icon: Shield,
    title: 'Privacidade',
    description: 'Controle de privacidade',
    settings: [
      { id: 'blur-sensitive', label: 'Borrar informações sensíveis', type: 'switch', defaultValue: false },
      { id: 'local-only', label: 'Manter dados localmente', type: 'switch', defaultValue: true },
    ]
  },
  {
    icon: Database,
    title: 'Armazenamento',
    description: 'Gerenciar espaço',
    settings: [
      { id: 'compression', label: 'Comprimir automaticamente', type: 'switch', defaultValue: false },
      { id: 'auto-delete', label: 'Excluir antigos após (dias)', type: 'number', defaultValue: 90 },
    ]
  },
];

export default function Settings() {
  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl lg:text-3xl font-bold text-foreground"
        >
          Configurações
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm lg:text-base text-muted-foreground mt-1"
        >
          Personalize o Screenshots Organizer
        </motion.p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4 lg:space-y-6 max-w-3xl">
        {settingSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="glass-panel p-4 lg:p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <section.icon className="w-4 lg:w-5 h-4 lg:h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm lg:text-base">{section.title}</h3>
                <p className="text-xs lg:text-sm text-muted-foreground">{section.description}</p>
              </div>
            </div>

            <div className="space-y-4 mt-4 lg:mt-6">
              {section.settings.map((setting) => (
                <div key={setting.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                  <Label htmlFor={setting.id} className="text-xs lg:text-sm text-foreground cursor-pointer">
                    {setting.label}
                  </Label>
                  
                  {setting.type === 'switch' && (
                    <Switch id={setting.id} defaultChecked={setting.defaultValue as boolean} />
                  )}
                  
                  {setting.type === 'number' && (
                    <Input
                      id={setting.id}
                      type="number"
                      defaultValue={setting.defaultValue as number}
                      className="w-full sm:w-20 bg-secondary/50 border-border/50 text-sm"
                    />
                  )}
                  
                  {setting.type === 'text' && (
                    <Input
                      id={setting.id}
                      type="text"
                      defaultValue={setting.defaultValue as string}
                      className="w-full sm:w-48 lg:w-64 bg-secondary/50 border-border/50 font-mono text-xs lg:text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel p-4 lg:p-6 border-destructive/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Trash2 className="w-4 lg:w-5 h-4 lg:h-5 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm lg:text-base">Zona de Perigo</h3>
              <p className="text-xs lg:text-sm text-muted-foreground">Ações irreversíveis</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 lg:mt-6">
            <div>
              <p className="text-sm text-foreground">Limpar todos os dados</p>
              <p className="text-xs text-muted-foreground">
                Remover screenshots e pastas
              </p>
            </div>
            <Button variant="destructive" className="w-full sm:w-auto">
              Limpar Dados
            </Button>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
