import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid3X3, List, Download, Trash2, SortAsc, Filter } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ScreenshotCard } from '@/components/screenshots/ScreenshotCard';
import { mockScreenshots, mockFolders } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Screenshots() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<string>('all');
  const [selectedScreenshots, setSelectedScreenshots] = useState<string[]>([]);

  const filteredScreenshots = mockScreenshots.filter(screenshot => {
    const matchesSearch = screenshot.filename.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesApp = selectedApp === 'all' || screenshot.appName === selectedApp;
    return matchesSearch && matchesApp;
  });

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
            Screenshots
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm lg:text-base text-muted-foreground mt-1"
          >
            {mockScreenshots.length} screenshots no total
          </motion.p>
        </div>

        {selectedScreenshots.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2"
          >
            <span className="text-xs sm:text-sm text-muted-foreground">
              {selectedScreenshots.length} selecionados
            </span>
            <Button variant="outline" size="sm" className="gap-1.5 h-8">
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </Button>
            <Button variant="destructive" size="sm" className="gap-1.5 h-8">
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Excluir</span>
            </Button>
          </motion.div>
        )}
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
            placeholder="Buscar screenshots..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select value={selectedApp} onValueChange={setSelectedApp}>
            <SelectTrigger className="w-full sm:w-36 bg-secondary/50 border-border/50">
              <SelectValue placeholder="App" />
            </SelectTrigger>
            <SelectContent className="glass-panel border-border/50">
              <SelectItem value="all">Todos</SelectItem>
              {mockFolders.map(folder => (
                <SelectItem key={folder.id} value={folder.name}>
                  {folder.icon} {folder.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="flex-shrink-0 lg:hidden">
            <SortAsc className="w-4 h-4" />
          </Button>

          <Button variant="outline" className="gap-2 hidden lg:flex">
            <SortAsc className="w-4 h-4" />
            Ordenar
          </Button>

          <div className="flex items-center rounded-lg bg-secondary/50 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Screenshots Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4' : 'space-y-3'}>
        {filteredScreenshots.map((screenshot, index) => (
          <ScreenshotCard key={screenshot.id} screenshot={screenshot} index={index} />
        ))}
      </div>

      {filteredScreenshots.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground">Nenhum screenshot encontrado</p>
        </motion.div>
      )}
    </AppLayout>
  );
}
