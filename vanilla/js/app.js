// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const menuOverlay = document.getElementById('menuOverlay');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const activityList = document.getElementById('activityList');
const foldersGrid = document.getElementById('foldersGrid');
const foldersGridFull = document.getElementById('foldersGridFull');
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
  setupNavigation();
  setupMobileMenu();
  setupFoldersToolbar();
  animateStorageBars();
  updateFoldersSubtitle();
  initAutoDestroy();
  
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

// Auto Destroy State
let autoDestroyEnabled = false;
let configuredFolders = [];

// Initialize Auto Destroy
function initAutoDestroy() {
  const toggle = document.getElementById('autoDestroyToggle');
  const addSection = document.getElementById('autoDestroyAddSection');
  const folderSelect = document.getElementById('folderSelect');
  const addFolderBtn = document.getElementById('addFolderBtn');
  
  if (!toggle) return;
  
  // Load from localStorage
  const saved = localStorage.getItem('autoDestroySettings');
  if (saved) {
    const settings = JSON.parse(saved);
    autoDestroyEnabled = settings.enabled || false;
    configuredFolders = settings.folders || [];
    toggle.checked = autoDestroyEnabled;
  }
  
  // Toggle handler
  toggle.addEventListener('change', () => {
    autoDestroyEnabled = toggle.checked;
    updateAutoDestroyUI();
    saveAutoDestroySettings();
  });
  
  // Populate folder select
  populateFolderSelect();
  
  // Add folder button
  if (addFolderBtn) {
    addFolderBtn.addEventListener('click', addFolderToAutoDestroy);
  }
  
  // Initial UI update
  updateAutoDestroyUI();
  renderConfiguredFolders();
}

// Populate folder select dropdown
function populateFolderSelect() {
  const select = document.getElementById('folderSelect');
  if (!select) return;
  
  select.innerHTML = '<option value="">Escolha uma pasta...</option>';
  
  mockFolders.forEach(folder => {
    const isConfigured = configuredFolders.some(f => f.id === folder.id);
    if (!isConfigured) {
      const option = document.createElement('option');
      option.value = folder.id;
      option.textContent = `${folder.icon} ${folder.name}`;
      select.appendChild(option);
    }
  });
}

// Add folder to auto destroy
function addFolderToAutoDestroy() {
  const select = document.getElementById('folderSelect');
  const daysInput = document.getElementById('retentionDays');
  
  if (!select || !daysInput) return;
  
  const folderId = select.value;
  const days = parseInt(daysInput.value) || 30;
  
  if (!folderId) {
    showToast('Selecione uma pasta', 'error');
    return;
  }
  
  if (days < 1 || days > 365) {
    showToast('O prazo deve ser entre 1 e 365 dias', 'error');
    return;
  }
  
  const folder = mockFolders.find(f => f.id === folderId);
  if (!folder) return;
  
  configuredFolders.push({
    id: folder.id,
    name: folder.name,
    icon: folder.icon,
    color: folder.color,
    screenshotCount: folder.screenshotCount,
    retentionDays: days
  });
  
  saveAutoDestroySettings();
  populateFolderSelect();
  renderConfiguredFolders();
  
  // Reset form
  select.value = '';
  daysInput.value = '30';
  
  showToast(`${folder.name} adicionada com prazo de ${days} dias`, 'success');
}

// Remove folder from auto destroy
function removeFolderFromAutoDestroy(folderId) {
  configuredFolders = configuredFolders.filter(f => f.id !== folderId);
  saveAutoDestroySettings();
  populateFolderSelect();
  renderConfiguredFolders();
  showToast('Pasta removida', 'success');
}

// Update retention days
function updateRetentionDays(folderId, days) {
  const folder = configuredFolders.find(f => f.id === folderId);
  if (folder) {
    folder.retentionDays = Math.max(1, Math.min(365, parseInt(days) || 30));
    saveAutoDestroySettings();
  }
}

// Update UI based on toggle state
function updateAutoDestroyUI() {
  const addSection = document.getElementById('autoDestroyAddSection');
  if (addSection) {
    if (autoDestroyEnabled) {
      addSection.classList.add('active');
    } else {
      addSection.classList.remove('active');
    }
  }
}

// Render configured folders
function renderConfiguredFolders() {
  const list = document.getElementById('autoDestroyFoldersList');
  const empty = document.getElementById('autoDestroyEmpty');
  const countEl = document.getElementById('configuredFoldersCount');
  
  if (!list) return;
  
  if (configuredFolders.length === 0) {
    if (empty) empty.style.display = 'flex';
    if (countEl) countEl.textContent = '0 pastas';
    // Clear any folder items but keep empty state
    const items = list.querySelectorAll('.autodestroy-folder-item');
    items.forEach(item => item.remove());
    return;
  }
  
  if (empty) empty.style.display = 'none';
  if (countEl) countEl.textContent = `${configuredFolders.length} pasta${configuredFolders.length > 1 ? 's' : ''}`;
  
  // Clear existing items
  list.innerHTML = '';
  
  configuredFolders.forEach(folder => {
    const item = document.createElement('div');
    item.className = 'autodestroy-folder-item';
    item.innerHTML = `
      <div class="autodestroy-folder-icon" style="background-color: ${folder.color}20">
        ${folder.icon}
      </div>
      <div class="autodestroy-folder-info">
        <div class="autodestroy-folder-name">${folder.name}</div>
        <div class="autodestroy-folder-meta">${folder.screenshotCount} screenshots</div>
      </div>
      <div class="autodestroy-folder-days">
        <input type="number" class="autodestroy-days-input" value="${folder.retentionDays}" min="1" max="365" data-folder-id="${folder.id}">
        <span class="autodestroy-days-label">dias</span>
      </div>
      <button class="autodestroy-folder-remove" data-folder-id="${folder.id}" title="Remover pasta">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 6h18"/>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
      </button>
    `;
    
    // Add event listeners
    const daysInput = item.querySelector('.autodestroy-days-input');
    daysInput.addEventListener('change', (e) => {
      updateRetentionDays(folder.id, e.target.value);
    });
    
    const removeBtn = item.querySelector('.autodestroy-folder-remove');
    removeBtn.addEventListener('click', () => {
      removeFolderFromAutoDestroy(folder.id);
    });
    
    list.appendChild(item);
  });
}

// Save settings to localStorage
function saveAutoDestroySettings() {
  localStorage.setItem('autoDestroySettings', JSON.stringify({
    enabled: autoDestroyEnabled,
    folders: configuredFolders
  }));
}

// Toast notification helper
function showToast(message, type = 'success') {
  // Remove existing toast
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === 'success' 
        ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
        : '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
      }
    </svg>
    <span>${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

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
  if (foldersGrid) {
    foldersGrid.innerHTML = mockFolders.slice(0, 6).map(folderHTML).join('');
  }
  
  // Folders page (filtered or all)
  if (foldersGridFull) {
    foldersGridFull.innerHTML = foldersToRender.map(folderHTML).join('');
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
