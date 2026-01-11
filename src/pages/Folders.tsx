import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid3X3, List, Plus, Filter } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { FolderCard } from '@/components/dashboard/FolderCard';
import { mockFolders } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Folders() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFolders = mockFolders.filter(folder =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Pastas
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm lg:text-base text-muted-foreground mt-1"
          >
            {mockFolders.length} pastas • {mockFolders.reduce((acc, f) => acc + f.screenshotCount, 0)} screenshots
          </motion.p>
        </div>

        <Button className="gap-2 bg-primary hover:bg-primary/90 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          Nova Pasta
        </Button>
      </div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar pastas..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="flex-shrink-0 sm:hidden">
            <Filter className="w-4 h-4" />
          </Button>

          <Button variant="outline" className="gap-2 hidden sm:flex">
            <Filter className="w-4 h-4" />
            Filtrar
          </Button>

          <div className="flex items-center rounded-lg bg-secondary/50 p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Folders Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4' : 'space-y-3'}>
        {filteredFolders.map((folder, index) => (
          <FolderCard key={folder.id} folder={folder} index={index} />
        ))}
      </div>

      {filteredFolders.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground">Nenhuma pasta encontrada</p>
        </motion.div>
      )}
    </AppLayout>
  );
}
