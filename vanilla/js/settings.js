// Settings Module - Form handling and settings management

// Settings state (simulated localStorage)
let settings = {
  profile: {
    name: 'Usuário Demo',
    email: 'usuario@exemplo.com',
  },
  appearance: {
    theme: 'dark',
    accentColor: 'teal',
    animations: true,
  },
  notifications: {
    newScreenshots: true,
    organized: true,
    storage: false,
    weeklyReport: false,
  },
};

// Initialize settings from localStorage
function loadSettings() {
  const saved = localStorage.getItem('screenshotOrganizerSettings');
  if (saved) {
    try {
      settings = JSON.parse(saved);
      applySettings();
    } catch (e) {
      console.error('Error loading settings:', e);
    }
  }
}

// Save settings to localStorage
function saveSettings() {
  localStorage.setItem('screenshotOrganizerSettings', JSON.stringify(settings));
}

// Apply settings to UI
function applySettings() {
  // Profile
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  if (userName) userName.value = settings.profile.name;
  if (userEmail) userEmail.value = settings.profile.email;
  
  // Appearance
  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) themeSelect.value = settings.appearance.theme;
  
  const colorOptions = document.querySelectorAll('.color-option');
  colorOptions.forEach(opt => {
    opt.classList.toggle('active', opt.dataset.color === settings.appearance.accentColor);
  });
  
  const animationsToggle = document.getElementById('animationsToggle');
  if (animationsToggle) animationsToggle.checked = settings.appearance.animations;
  
  // Notifications
  const notifyNewScreenshots = document.getElementById('notifyNewScreenshots');
  const notifyOrganized = document.getElementById('notifyOrganized');
  const notifyStorage = document.getElementById('notifyStorage');
  const notifyWeeklyReport = document.getElementById('notifyWeeklyReport');
  
  if (notifyNewScreenshots) notifyNewScreenshots.checked = settings.notifications.newScreenshots;
  if (notifyOrganized) notifyOrganized.checked = settings.notifications.organized;
  if (notifyStorage) notifyStorage.checked = settings.notifications.storage;
  if (notifyWeeklyReport) notifyWeeklyReport.checked = settings.notifications.weeklyReport;
  
  // Apply animations setting
  document.body.classList.toggle('no-animations', !settings.appearance.animations);
}

// Show toast notification
function showToast(message, type = 'success') {
  // Remove existing toasts
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) existingToast.remove();
  
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === 'success' 
        ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
        : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'
      }
    </svg>
    <span>${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  
  // Remove after delay
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Initialize settings page
function initSettings() {
  loadSettings();
  
  // Profile form
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userName = document.getElementById('userName').value.trim();
      const userEmail = document.getElementById('userEmail').value.trim();
      
      // Validation
      if (!userName) {
        showToast('Por favor, insira seu nome.', 'error');
        return;
      }
      
      if (!userEmail || !userEmail.includes('@')) {
        showToast('Por favor, insira um email válido.', 'error');
        return;
      }
      
      settings.profile.name = userName;
      settings.profile.email = userEmail;
      saveSettings();
      showToast('Perfil salvo com sucesso!');
    });
  }
  
  // Theme select
  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      settings.appearance.theme = e.target.value;
      saveSettings();
      showToast(`Tema alterado para ${e.target.options[e.target.selectedIndex].text}`);
    });
  }
  
  // Color options
  const colorOptions = document.getElementById('colorOptions');
  if (colorOptions) {
    colorOptions.addEventListener('click', (e) => {
      const colorBtn = e.target.closest('.color-option');
      if (colorBtn) {
        document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
        colorBtn.classList.add('active');
        settings.appearance.accentColor = colorBtn.dataset.color;
        saveSettings();
        showToast('Cor de destaque alterada!');
      }
    });
  }
  
  // Animations toggle
  const animationsToggle = document.getElementById('animationsToggle');
  if (animationsToggle) {
    animationsToggle.addEventListener('change', (e) => {
      settings.appearance.animations = e.target.checked;
      document.body.classList.toggle('no-animations', !e.target.checked);
      saveSettings();
      showToast(e.target.checked ? 'Animações ativadas' : 'Animações desativadas');
    });
  }
  
  // Notification toggles
  const notificationToggles = ['notifyNewScreenshots', 'notifyOrganized', 'notifyStorage', 'notifyWeeklyReport'];
  const notificationKeys = ['newScreenshots', 'organized', 'storage', 'weeklyReport'];
  
  notificationToggles.forEach((id, index) => {
    const toggle = document.getElementById(id);
    if (toggle) {
      toggle.addEventListener('change', (e) => {
        settings.notifications[notificationKeys[index]] = e.target.checked;
        saveSettings();
      });
    }
  });
  
  // Clear cache button
  const clearCacheBtn = document.getElementById('clearCacheBtn');
  if (clearCacheBtn) {
    clearCacheBtn.addEventListener('click', () => {
      if (confirm('Tem certeza que deseja limpar o cache?')) {
        showToast('Cache limpo com sucesso!');
      }
    });
  }
  
  // Reset settings button
  const resetSettingsBtn = document.getElementById('resetSettingsBtn');
  if (resetSettingsBtn) {
    resetSettingsBtn.addEventListener('click', () => {
      if (confirm('Tem certeza que deseja resetar todas as configurações?')) {
        settings = {
          profile: { name: 'Usuário Demo', email: 'usuario@exemplo.com' },
          appearance: { theme: 'dark', accentColor: 'teal', animations: true },
          notifications: { newScreenshots: true, organized: true, storage: false, weeklyReport: false },
        };
        saveSettings();
        applySettings();
        showToast('Configurações restauradas!');
      }
    });
  }
  
  // Delete all button
  const deleteAllBtn = document.getElementById('deleteAllBtn');
  if (deleteAllBtn) {
    deleteAllBtn.addEventListener('click', () => {
      if (confirm('ATENÇÃO: Esta ação é irreversível! Tem certeza que deseja excluir todos os dados?')) {
        if (confirm('Confirme novamente para excluir TODOS os screenshots e pastas.')) {
          showToast('Todos os dados foram excluídos.', 'error');
        }
      }
    });
  }
}

// Export for use in main app
window.initSettings = initSettings;
window.initCharts = typeof initCharts !== 'undefined' ? initCharts : () => {};
