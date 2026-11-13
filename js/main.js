/**
 * MKTG Coursework - Main UI Scripts
 * Handles header dropdowns, mobile navigation, newsletter interactions, and toasts.
 */

document.addEventListener('DOMContentLoaded', () => {
  initOfficeDropdown();
  initMobileNav();
  initNewsletter();
  syncHomeBlogMetrics();
});

// Sync metrics on homepage if homeBlogGrid exists
async function syncHomeBlogMetrics() {
  const grid = document.getElementById('homeBlogGrid');
  if (!grid) return;

  try {
    const res = await fetch('data/engagement.json');
    const data = await res.json();
    const map = new Map(data.posts.map(p => [p.slug, p]));

    grid.querySelectorAll('.article-card').forEach(card => {
      const link = card.querySelector('a');
      if (!link) return;
      const url = new URL(link.href, window.location.origin);
      const slug = url.searchParams.get('slug');
      const metricsEl = card.querySelector('.card-metrics');
      if (slug && map.has(slug) && metricsEl) {
        const item = map.get(slug);
        metricsEl.innerHTML = `<span>${item.views.toLocaleString()} views</span><span>•</span><span>${item.likes.toLocaleString()} likes</span>`;
      }
    });
  } catch (err) {
    // Graceful fallback to static numbers
  }
}

// Toast notification utility
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Office dropdown toggle
function initOfficeDropdown() {
  const officeContainer = document.querySelector('.office-dropdown-container');
  const officeBtn = document.getElementById('btnOffice');
  if (!officeContainer || !officeBtn) return;

  officeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    officeContainer.classList.toggle('active');
    officeBtn.classList.toggle('open');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!officeContainer.contains(e.target)) {
      officeContainer.classList.remove('active');
      officeBtn.classList.remove('open');
    }
  });
}

// Mobile drawer navigation
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileDrawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
    toggleBtn.textContent = drawer.classList.contains('open') ? 'CLOSE' : 'MENU';
  });

  // Close drawer on link click
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.textContent = 'MENU';
    });
  });
}

// Static Newsletter form with in-session feedback
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value.trim() !== '') {
      showToast('Thank you for subscribing to SUWIK blog updates!');
      input.value = '';
    } else {
      showToast('Please enter a valid email address.');
    }
  });
}

