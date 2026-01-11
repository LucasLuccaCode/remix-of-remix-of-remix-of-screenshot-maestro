// Mock Data
const mockFolders = [
  { id: '1', name: 'Chrome', icon: '🌐', screenshotCount: 45, lastUpdated: new Date('2026-01-10'), color: '#4285F4' },
  { id: '2', name: 'VS Code', icon: '💻', screenshotCount: 32, lastUpdated: new Date('2026-01-11'), color: '#007ACC' },
  { id: '3', name: 'Figma', icon: '🎨', screenshotCount: 28, lastUpdated: new Date('2026-01-09'), color: '#F24E1E' },
  { id: '4', name: 'Slack', icon: '💬', screenshotCount: 19, lastUpdated: new Date('2026-01-08'), color: '#4A154B' },
  { id: '5', name: 'Discord', icon: '🎮', screenshotCount: 15, lastUpdated: new Date('2026-01-07'), color: '#5865F2' },
  { id: '6', name: 'Terminal', icon: '⬛', screenshotCount: 12, lastUpdated: new Date('2026-01-06'), color: '#2D2D2D' },
  { id: '7', name: 'Notion', icon: '📝', screenshotCount: 8, lastUpdated: new Date('2026-01-05'), color: '#000000' },
  { id: '8', name: 'Spotify', icon: '🎵', screenshotCount: 5, lastUpdated: new Date('2026-01-04'), color: '#1DB954' },
];

const mockScreenshots = [
  { id: '1', filename: 'screenshot_2026-01-11_001.png', appName: 'Chrome', createdAt: new Date('2026-01-11T10:30:00'), size: 245000, width: 1920, height: 1080 },
  { id: '2', filename: 'screenshot_2026-01-11_002.png', appName: 'VS Code', createdAt: new Date('2026-01-11T11:15:00'), size: 189000, width: 1920, height: 1080 },
  { id: '3', filename: 'screenshot_2026-01-10_001.png', appName: 'Figma', createdAt: new Date('2026-01-10T14:22:00'), size: 312000, width: 2560, height: 1440 },
  { id: '4', filename: 'screenshot_2026-01-10_002.png', appName: 'Chrome', createdAt: new Date('2026-01-10T16:45:00'), size: 278000, width: 1920, height: 1080 },
  { id: '5', filename: 'screenshot_2026-01-09_001.png', appName: 'Slack', createdAt: new Date('2026-01-09T09:10:00'), size: 156000, width: 1920, height: 1080 },
  { id: '6', filename: 'screenshot_2026-01-09_002.png', appName: 'Discord', createdAt: new Date('2026-01-09T20:30:00'), size: 198000, width: 1920, height: 1080 },
];

const mockStats = {
  totalScreenshots: 164,
  organizedScreenshots: 148,
  unorganizedScreenshots: 16,
  totalFolders: 8,
  storageUsed: 847000000,
  lastOrganized: new Date('2026-01-11T12:00:00'),
};

// Helper function to format relative time
function formatDistanceToNow(date) {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `há ${days} dia${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `há ${hours} hora${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  } else {
    return 'agora mesmo';
  }
}
