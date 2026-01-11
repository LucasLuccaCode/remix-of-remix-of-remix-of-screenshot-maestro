import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Image, 
  BarChart3, 
  Upload, 
  Settings,
  Camera
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: FolderOpen, label: 'Pastas', path: '/folders' },
  { icon: Image, label: 'Screenshots', path: '/screenshots' },
  { icon: BarChart3, label: 'Estatísticas', path: '/stats' },
  { icon: Upload, label: 'Upload', path: '/upload' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 glass-panel border-r border-border/50 p-6 flex flex-col z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-info flex items-center justify-center">
          <Camera className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-semibold text-foreground">Screenshots</h1>
          <p className="text-xs text-muted-foreground">Organizer</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'nav-item relative',
                isActive && 'nav-item-active'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-lg"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <item.icon className={cn('w-5 h-5 relative z-10', isActive && 'text-primary')} />
              <span className="relative z-10">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="pt-6 border-t border-border/50">
        <NavLink
          to="/settings"
          className={cn(
            'nav-item',
            location.pathname === '/settings' && 'nav-item-active'
          )}
        >
          <Settings className="w-5 h-5" />
          <span>Configurações</span>
        </NavLink>
      </div>

      {/* Storage indicator */}
      <div className="mt-6 p-4 glass-panel rounded-lg">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Armazenamento</span>
          <span className="text-foreground font-medium">847 MB</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-info rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '42%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">847 MB de 2 GB usado</p>
      </div>
    </aside>
  );
}
