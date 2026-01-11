import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Image, 
  BarChart3, 
  Upload,
  Menu,
  X,
  Settings,
  Camera
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: FolderOpen, label: 'Pastas', path: '/folders' },
  { icon: Upload, label: 'Upload', path: '/upload' },
  { icon: Image, label: 'Screenshots', path: '/screenshots' },
  { icon: BarChart3, label: 'Stats', path: '/stats' },
];

export function MobileNav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 h-14 glass-panel border-b border-border/50 flex items-center justify-between px-4 z-50 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-info flex items-center justify-center">
            <Camera className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground text-sm">Screenshots</span>
        </div>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2 rounded-lg hover:bg-secondary/50 transition-colors">
              <Menu className="w-5 h-5 text-foreground" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 glass-panel border-l border-border/50 p-0">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-info flex items-center justify-center">
                  <Camera className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-semibold text-foreground">Screenshots</h1>
                  <p className="text-xs text-muted-foreground">Organizer</p>
                </div>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'nav-item relative',
                        isActive && 'nav-item-active'
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="mobileActiveNav"
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

              <div className="pt-6 mt-6 border-t border-border/50">
                <NavLink
                  to="/settings"
                  onClick={() => setOpen(false)}
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
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 glass-panel border-t border-border/50 flex items-center justify-around px-2 z-50 lg:hidden safe-area-bottom">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[60px]',
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className={cn(
                'p-1.5 rounded-lg transition-colors',
                isActive && 'bg-primary/10'
              )}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
