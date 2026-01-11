export interface Screenshot {
  id: string;
  filename: string;
  appName: string;
  thumbnail: string;
  createdAt: Date;
  size: number;
  width: number;
  height: number;
}

export interface AppFolder {
  id: string;
  name: string;
  icon: string;
  screenshotCount: number;
  lastUpdated: Date;
  color: string;
}

export interface OrganizationStats {
  totalScreenshots: number;
  organizedScreenshots: number;
  unorganizedScreenshots: number;
  totalFolders: number;
  storageUsed: number;
  lastOrganized: Date | null;
}

export interface DailyStats {
  date: string;
  screenshots: number;
  organized: number;
}

export interface AppStats {
  appName: string;
  count: number;
  percentage: number;
}
