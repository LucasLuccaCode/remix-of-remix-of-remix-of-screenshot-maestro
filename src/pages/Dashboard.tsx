import { motion } from 'framer-motion';
import { Images, FolderOpen, CheckCircle, Clock, Search, Bell } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { FolderCard } from '@/components/dashboard/FolderCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { mockFolders, mockScreenshots, mockStats } from '@/data/mockData';
import { Input } from '@/components/ui/input';

export default function Dashboard() {
  return (
    <AppLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl lg:text-3xl font-bold text-foreground"
          >
            Dashboard
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm lg:text-base text-muted-foreground mt-1"
          >
            Visão geral do seu organizador
          </motion.p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar..." 
              className="pl-10 w-full sm:w-48 lg:w-64 bg-secondary/50 border-border/50 focus:border-primary/50"
            />
          </div>
          <button className="p-2.5 rounded-xl glass-panel hover:border-primary/30 transition-colors relative flex-shrink-0">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
        <StatCard
          icon={Images}
          title="Total Screenshots"
          value={mockStats.totalScreenshots}
          trend={{ value: 12, isPositive: true }}
          delay={0}
        />
        <StatCard
          icon={FolderOpen}
          title="Pastas"
          value={mockStats.totalFolders}
          delay={0.05}
        />
        <StatCard
          icon={CheckCircle}
          title="Organizados"
          value={mockStats.organizedScreenshots}
          subtitle={`${((mockStats.organizedScreenshots / mockStats.totalScreenshots) * 100).toFixed(0)}%`}
          trend={{ value: 8, isPositive: true }}
          delay={0.1}
        />
        <StatCard
          icon={Clock}
          title="Pendentes"
          value={mockStats.unorganizedScreenshots}
          delay={0.15}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 lg:mb-8">
        {/* Quick Actions - First on mobile */}
        <div className="lg:order-2">
          <QuickActions />
        </div>
        
        {/* Recent Activity - 2 columns on desktop */}
        <div className="lg:col-span-2 lg:order-1">
          <RecentActivity screenshots={mockScreenshots} />
        </div>
      </div>

      {/* Folders Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base lg:text-lg font-semibold text-foreground">Pastas por Aplicativo</h2>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            Ver todas
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
          {mockFolders.slice(0, 6).map((folder, index) => (
            <FolderCard key={folder.id} folder={folder} index={index} />
          ))}
        </div>
      </motion.div>
    </AppLayout>
  );
}
