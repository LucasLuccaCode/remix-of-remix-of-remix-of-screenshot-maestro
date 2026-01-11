import { motion } from 'framer-motion';
import { TrendingUp, Calendar, HardDrive, Clock } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ActivityChart } from '@/components/stats/ActivityChart';
import { AppDistributionChart } from '@/components/stats/AppDistributionChart';
import { OrganizationProgress } from '@/components/stats/OrganizationProgress';
import { mockStats, mockDailyStats, mockAppStats } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Stats() {
  const formatBytes = (bytes: number) => {
    if (bytes >= 1000000000) return `${(bytes / 1000000000).toFixed(1)} GB`;
    if (bytes >= 1000000) return `${(bytes / 1000000).toFixed(0)} MB`;
    return `${(bytes / 1000).toFixed(0)} KB`;
  };

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl lg:text-3xl font-bold text-foreground"
        >
          Estatísticas
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm lg:text-base text-muted-foreground mt-1"
        >
          Análise da organização dos seus screenshots
        </motion.p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
        <StatCard
          icon={TrendingUp}
          title="Taxa de Organização"
          value={`${((mockStats.organizedScreenshots / mockStats.totalScreenshots) * 100).toFixed(0)}%`}
          trend={{ value: 5, isPositive: true }}
          delay={0}
        />
        <StatCard
          icon={Calendar}
          title="Screenshots Hoje"
          value={mockDailyStats[mockDailyStats.length - 1].screenshots}
          subtitle={`${mockDailyStats[mockDailyStats.length - 1].organized} org.`}
          delay={0.05}
        />
        <StatCard
          icon={HardDrive}
          title="Armazenamento"
          value={formatBytes(mockStats.storageUsed)}
          subtitle="de 2 GB"
          delay={0.1}
        />
        <StatCard
          icon={Clock}
          title="Última Org."
          value={mockStats.lastOrganized ? formatDistanceToNow(mockStats.lastOrganized, { addSuffix: false, locale: ptBR }) : 'Nunca'}
          delay={0.15}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 lg:mb-8">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <ActivityChart data={mockDailyStats} />
        </div>
        <div className="order-1 lg:order-2">
          <OrganizationProgress stats={mockStats} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppDistributionChart data={mockAppStats} />
        
        {/* Top Apps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-panel p-4 lg:p-6"
        >
          <h3 className="text-base lg:text-lg font-semibold text-foreground mb-4 lg:mb-6">Apps Mais Utilizados</h3>
          
          <div className="space-y-3 lg:space-y-4">
            {mockAppStats.slice(0, 5).map((app, index) => (
              <motion.div
                key={app.appName}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="flex items-center gap-3 lg:gap-4"
              >
                <span className="text-xs lg:text-sm font-medium text-muted-foreground w-5 lg:w-6">
                  #{index + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5 lg:mb-2">
                    <span className="text-xs lg:text-sm font-medium text-foreground">{app.appName}</span>
                    <span className="text-xs lg:text-sm text-muted-foreground">{app.count}</span>
                  </div>
                  <div className="h-1.5 lg:h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-info rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${app.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
