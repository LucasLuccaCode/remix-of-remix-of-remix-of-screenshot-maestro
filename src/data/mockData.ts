import { Screenshot, AppFolder, OrganizationStats, DailyStats, AppStats } from '@/types';

export const mockFolders: AppFolder[] = [
  { id: '1', name: 'Chrome', icon: '🌐', screenshotCount: 45, lastUpdated: new Date('2026-01-10'), color: '#4285F4' },
  { id: '2', name: 'VS Code', icon: '💻', screenshotCount: 32, lastUpdated: new Date('2026-01-11'), color: '#007ACC' },
  { id: '3', name: 'Figma', icon: '🎨', screenshotCount: 28, lastUpdated: new Date('2026-01-09'), color: '#F24E1E' },
  { id: '4', name: 'Slack', icon: '💬', screenshotCount: 19, lastUpdated: new Date('2026-01-08'), color: '#4A154B' },
  { id: '5', name: 'Discord', icon: '🎮', screenshotCount: 15, lastUpdated: new Date('2026-01-07'), color: '#5865F2' },
  { id: '6', name: 'Terminal', icon: '⬛', screenshotCount: 12, lastUpdated: new Date('2026-01-06'), color: '#2D2D2D' },
  { id: '7', name: 'Notion', icon: '📝', screenshotCount: 8, lastUpdated: new Date('2026-01-05'), color: '#000000' },
  { id: '8', name: 'Spotify', icon: '🎵', screenshotCount: 5, lastUpdated: new Date('2026-01-04'), color: '#1DB954' },
];

export const mockScreenshots: Screenshot[] = [
  { id: '1', filename: 'screenshot_2026-01-11_001.png', appName: 'Chrome', thumbnail: '', createdAt: new Date('2026-01-11T10:30:00'), size: 245000, width: 1920, height: 1080 },
  { id: '2', filename: 'screenshot_2026-01-11_002.png', appName: 'VS Code', thumbnail: '', createdAt: new Date('2026-01-11T11:15:00'), size: 189000, width: 1920, height: 1080 },
  { id: '3', filename: 'screenshot_2026-01-10_001.png', appName: 'Figma', thumbnail: '', createdAt: new Date('2026-01-10T14:22:00'), size: 312000, width: 2560, height: 1440 },
  { id: '4', filename: 'screenshot_2026-01-10_002.png', appName: 'Chrome', thumbnail: '', createdAt: new Date('2026-01-10T16:45:00'), size: 278000, width: 1920, height: 1080 },
  { id: '5', filename: 'screenshot_2026-01-09_001.png', appName: 'Slack', thumbnail: '', createdAt: new Date('2026-01-09T09:10:00'), size: 156000, width: 1920, height: 1080 },
  { id: '6', filename: 'screenshot_2026-01-09_002.png', appName: 'Discord', thumbnail: '', createdAt: new Date('2026-01-09T20:30:00'), size: 198000, width: 1920, height: 1080 },
];

export const mockStats: OrganizationStats = {
  totalScreenshots: 164,
  organizedScreenshots: 148,
  unorganizedScreenshots: 16,
  totalFolders: 8,
  storageUsed: 847000000,
  lastOrganized: new Date('2026-01-11T12:00:00'),
};

export const mockDailyStats: DailyStats[] = [
  { date: '05 Jan', screenshots: 12, organized: 10 },
  { date: '06 Jan', screenshots: 18, organized: 16 },
  { date: '07 Jan', screenshots: 8, organized: 8 },
  { date: '08 Jan', screenshots: 24, organized: 22 },
  { date: '09 Jan', screenshots: 15, organized: 14 },
  { date: '10 Jan', screenshots: 21, organized: 19 },
  { date: '11 Jan', screenshots: 16, organized: 13 },
];

export const mockAppStats: AppStats[] = [
  { appName: 'Chrome', count: 45, percentage: 27.4 },
  { appName: 'VS Code', count: 32, percentage: 19.5 },
  { appName: 'Figma', count: 28, percentage: 17.1 },
  { appName: 'Slack', count: 19, percentage: 11.6 },
  { appName: 'Discord', count: 15, percentage: 9.1 },
  { appName: 'Outros', count: 25, percentage: 15.3 },
];
