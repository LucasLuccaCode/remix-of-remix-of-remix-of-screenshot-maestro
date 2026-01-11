// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const menuOverlay = document.getElementById('menuOverlay');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const activityList = document.getElementById('activityList');
const foldersGrid = document.getElementById('foldersGrid');
const foldersGridFull = document.getElementById('foldersGridFull');
const screenshotsGrid = document.getElementById('screenshotsGrid');
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const folderSearchInput = document.getElementById('folderSearchInput');
const viewToggle = document.getElementById('viewToggle');
const foldersSubtitle = document.getElementById('foldersSubtitle');
const foldersEmpty = document.getElementById('foldersEmpty');

// State
let currentViewMode = 'list';
let folderSearchQuery = '';

// Navigation
const allNavItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
const pages = document.querySelectorAll('.page');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderActivityList();
  renderFolders();
  renderScreenshots();
  setupNavigation();
  setupMobileMenu();
  setupUploadZone();
  setupFoldersToolbar();
  animateStorageBars();
  updateFoldersSubtitle();
  
  // Initialize settings
  if (typeof initSettings === 'function') {
    initSettings();
  }
  
  // Initialize charts if on stats page
  const statsPage = document.getElementById('page-stats');
  if (statsPage && statsPage.classList.contains('page-active')) {
    if (typeof initCharts === 'function') {
      initCharts();
    }
  }
});

// Render Activity List
function renderActivityList() {
  const html = mockScreenshots.slice(0, 5).map((screenshot, index) => `
    <div class="activity-item" style="animation-delay: ${0.4 + index * 0.05}s">
      <div class="activity-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <circle cx="9" cy="9" r="2"/>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
        </svg>
      </div>
      <div class="activity-info">
        <p class="activity-filename">${screenshot.filename}</p>
        <div class="activity-meta">
          <span class="activity-app">${screenshot.appName}</span>
          <span class="activity-size">• ${(screenshot.size / 1000).toFixed(0)} KB</span>
        </div>
      </div>
      <div class="activity-time">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <span>${formatDistanceToNow(screenshot.createdAt)}</span>
      </div>
    </div>
  `).join('');
  
  activityList.innerHTML = html;
}

// Render Folders
function renderFolders(filteredFolders = null) {
  const foldersToRender = filteredFolders || mockFolders;
  
  const folderHTML = (folder, index) => `
    <div class="folder-card" style="animation-delay: ${index * 0.05}s">
      <div class="folder-icon" style="background-color: ${folder.color}20">
        ${folder.icon}
      </div>
      <div class="folder-info">
        <h3 class="folder-name">${folder.name}</h3>
        <p class="folder-count">${folder.screenshotCount} screenshots</p>
      </div>
      <div class="folder-meta">
        <span class="folder-time">${formatDistanceToNow(folder.lastUpdated)}</span>
        <svg class="folder-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </div>
    </div>
  `;
  
  // Dashboard folders (limited)
  foldersGrid.innerHTML = mockFolders.slice(0, 6).map(folderHTML).join('');
  
  // Folders page (filtered or all)
  foldersGridFull.innerHTML = foldersToRender.map(folderHTML).join('');
  
  // Show/hide empty state
  if (foldersEmpty) {
    foldersEmpty.style.display = foldersToRender.length === 0 ? 'flex' : 'none';
  }
}

// Update folders subtitle with counts
function updateFoldersSubtitle() {
  if (foldersSubtitle) {
    const totalFolders = mockFolders.length;
    const totalScreenshots = mockFolders.reduce((acc, f) => acc + f.screenshotCount, 0);
    foldersSubtitle.textContent = `${totalFolders} pastas • ${totalScreenshots} screenshots`;
  }
}

// Setup Folders Toolbar (search and view toggle)
function setupFoldersToolbar() {
  // Search functionality
  if (folderSearchInput) {
    folderSearchInput.addEventListener('input', (e) => {
      folderSearchQuery = e.target.value.toLowerCase();
      filterFolders();
    });
  }
  
  // View toggle functionality
  if (viewToggle) {
    const toggleBtns = viewToggle.querySelectorAll('.view-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        if (view === currentViewMode) return;
        
        currentViewMode = view;
        
        // Update active state
        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update grid class
        if (foldersGridFull) {
          foldersGridFull.classList.toggle('grid-view', view === 'grid');
        }
      });
    });
  }
}

// Filter folders based on search query
function filterFolders() {
  const filtered = mockFolders.filter(folder =>
    folder.name.toLowerCase().includes(folderSearchQuery)
  );
  renderFolders(filtered);
}

// Render Screenshots
function renderScreenshots() {
  const html = mockScreenshots.map((screenshot, index) => `
    <div class="screenshot-card" style="animation-delay: ${index * 0.05}s">
      <div class="screenshot-preview">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <circle cx="9" cy="9" r="2"/>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
        </svg>
      </div>
      <div class="screenshot-info">
        <p class="screenshot-filename">${screenshot.filename}</p>
        <div class="screenshot-meta">
          <span class="screenshot-app">${screenshot.appName}</span>
          <span>${(screenshot.size / 1000).toFixed(0)} KB</span>
        </div>
      </div>
    </div>
  `).join('');
  
  screenshotsGrid.innerHTML = html;
}

// Setup Navigation
function setupNavigation() {
  allNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      if (!page) return;
      
      // Update active state for all navs
      allNavItems.forEach(nav => {
        nav.classList.remove('nav-item-active', 'mobile-nav-active');
      });
      
      // Add active class to clicked items
      document.querySelectorAll(`[data-page="${page}"]`).forEach(nav => {
        if (nav.classList.contains('mobile-nav-item')) {
          nav.classList.add('mobile-nav-active');
        } else {
          nav.classList.add('nav-item-active');
        }
      });
      
      // Show page
      pages.forEach(p => p.classList.remove('page-active'));
      const targetPage = document.getElementById(`page-${page}`);
      if (targetPage) {
        targetPage.classList.add('page-active');
        
        // Initialize charts when navigating to stats page
        if (page === 'stats' && typeof initCharts === 'function') {
          setTimeout(initCharts, 100);
        }
      }
      
      // Close mobile menu
      menuOverlay.classList.remove('active');
    });
  });
}

// Setup Mobile Menu
function setupMobileMenu() {
  menuBtn.addEventListener('click', () => {
    menuOverlay.classList.add('active');
  });
  
  closeMenuBtn.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
  });
  
  menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
      menuOverlay.classList.remove('active');
    }
  });
}

// Setup Upload Zone
function setupUploadZone() {
  uploadZone.addEventListener('click', () => {
    fileInput.click();
  });
  
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
  });
  
  uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('drag-over');
  });
  
  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    handleFiles(files);
  });
  
  fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
  });
}

function handleFiles(files) {
  console.log('Files uploaded:', files);
  alert(`${files.length} arquivo(s) selecionado(s)!`);
}

// Animate storage bars
function animateStorageBars() {
  const storageFills = document.querySelectorAll('.storage-fill');
  storageFills.forEach(fill => {
    const width = fill.style.width;
    fill.style.width = '0';
    setTimeout(() => {
      fill.style.width = width;
    }, 500);
  });
}
