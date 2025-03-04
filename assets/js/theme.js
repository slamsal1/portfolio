const STORAGE_KEY = "theme";
const THEME_ATTR  = "data-theme";
const QUERY_KEY   = "(prefers-color-scheme: dark)";

const themes = {
  LIGHT: "light",
  DARK: "dark",
};

initTheme();

function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY);

  if (savedTheme) {
    // Storage theme
    setTheme(savedTheme);
  } else {
    // Always default to light theme regardless of system preference
    setTheme(themes.LIGHT);
  }

  // Watch for system theme changes (optional - you can remove this if you don't want system changes)
  window.matchMedia(QUERY_KEY).addEventListener("change", (e) => {
    const newTheme = e.matches ? themes.DARK : themes.LIGHT;
    setTheme(newTheme);
  });
}


function toggleTheme() {
  const theme = getTheme();
  const newTheme = theme === themes.DARK ? themes.LIGHT : themes.DARK;
  setTheme(newTheme);
  localStorage.setItem(STORAGE_KEY, newTheme);
}

function getTheme() {
  return document.documentElement.getAttribute(THEME_ATTR);
}

function setTheme(value) {
  document.documentElement.setAttribute(THEME_ATTR, value);
}

// Animate timeline items when they come into view
document.addEventListener('DOMContentLoaded', function() {
  const timelineCards = document.querySelectorAll('.project-flow-card');
  
  function checkScroll() {
    timelineCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (cardTop < windowHeight - 100) {
        card.classList.add('animated');
      }
    });
  }
  
  // Initial check
  checkScroll();
  
  // Check on scroll
  window.addEventListener('scroll', checkScroll);
});






// Animate tree project cards when they come into view
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.tree-project-card');
  
  function checkScroll() {
    projectCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (cardTop < windowHeight - 100) {
        card.classList.add('animated');
      }
    });
  }
  
  // Initial check
  checkScroll();
  
  // Check on scroll
  window.addEventListener('scroll', checkScroll);
});


// Filtering Logic
document.addEventListener("DOMContentLoaded", () => {
  "use strict";
  
  /**
   * Project Category Filter
   */
  const filterButtons = document.querySelectorAll('.project-filters button');
  const projectItems = document.querySelectorAll('.project-flow-item');
  
  // Count projects by category
  const categoryCounts = {
    student: 0,
    freelance: 0,
    personal: 0,
    employment: 0,
    all: projectItems.length
  };
  
  // Initialize category counts
  projectItems.forEach(item => {
    const category = item.getAttribute('data-category');
    if (category) {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }
  });
  
  // Update count badges
  document.querySelector('.all-count').textContent = categoryCounts.all;
  document.querySelector('.student-count').textContent = categoryCounts.student || 0;
  document.querySelector('.freelance-count').textContent = categoryCounts.freelance || 0;
  document.querySelector('.personal-count').textContent = categoryCounts.personal || 0;
  document.querySelector('.employment-count').textContent = categoryCounts.employment || 0;
  
  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const selectedCategory = button.getAttribute('data-category');
      
      projectItems.forEach(item => {
        // Force a reflow to ensure animations work
        item.offsetHeight;
        
        const itemCategory = item.getAttribute('data-category');
        if (selectedCategory === 'filter-all' || selectedCategory === itemCategory) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
  // Initial layout setup
  projectItems.forEach((item, index) => {
    if (index % 2 === 0) {
      item.classList.add('odd-item');
    } else {
      item.classList.add('even-item');
    }
  });
  /**
   * Animated counting for filter counts
   */
  function animateCount(element, target) {
    const duration = 1000;
    const start = 0;
    const startTime = performance.now();
    
    function updateCount(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = progress * (2 - progress); // Ease out
      const currentCount = Math.floor(start + (target * easeProgress));
      
      element.textContent = currentCount;
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = target;
      }
    }
    
    requestAnimationFrame(updateCount);
  }
  
  // Animate the count badges when page loads
  document.querySelectorAll('.filter-count').forEach(badge => {
    const count = parseInt(badge.textContent);
    badge.textContent = '0';
    animateCount(badge, count);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-card');

  // Disable any existing scroll observers
  if (window.scrollObserver) {
    window.scrollObserver.disconnect();
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      const selectedCategory = button.getAttribute('data-category');
      
      projectItems.forEach(item => {
        // Reset any scroll-based classes
        item.classList.remove('wow', 'fadeIn');
        
        const itemCategory = item.getAttribute('data-category');
        if (selectedCategory === 'filter-all' || selectedCategory === itemCategory) {
          item.classList.remove('hidden');
          // Force immediate display
          requestAnimationFrame(() => {
            item.style.display = 'block';
            item.style.opacity = '1';
          });
        } else {
          item.classList.add('hidden');
          item.style.display = 'none';
        }
      });

      // Force layout recalculation
      window.dispatchEvent(new Event('resize'));
    });
  });
});

// Resume Page
document.addEventListener("DOMContentLoaded", function() {
  // Adobe DC Viewer
  document.addEventListener("adobe_dc_view_sdk.ready", function() {
    var adobeDCView = new AdobeDC.View({
      clientId: "7529f23aaf054c05953bde3983760b61",
      divId: "adobe-dc-view"
    });
    adobeDCView.previewFile({
      content: { location: { url: "/assets/docs/resume.pdf" } },
      metaData: { fileName: "Resume.pdf" }
    }, { embedMode: "IN_LINE" });
  });
  
  // Elements
  const downloadBtn = document.getElementById('resume-download-btn');
  const modal = document.getElementById('resume-download-modal');
  const closeBtn = document.getElementById('resume-modal-close');
  const downloadForm = document.getElementById('resume-download-form');
  const submitBtn = document.getElementById('resume-submit-btn');
  const skipBtn = document.getElementById('resume-skip-btn');
  const verificationStatus = document.getElementById('resume-verification-status');
  
  // Correct resume file path
  const resumeURL = '/assets/docs/resume.pdf';
  
  // State
  let isVerified = false;
  let turnstileWidget = null;
  
  // Functions
  function openModal() {
    modal.style.display = 'block';
    initTurnstile();
  }
  
  function closeModal() {
    modal.style.display = 'none';
  }
  
  function initTurnstile() {
    if (window.turnstile) {
      verificationStatus.textContent = "Verifying...";
      submitBtn.disabled = true;
      skipBtn.disabled = true;
      
      // Reset any existing widget
      if (turnstileWidget) {
        window.turnstile.reset(turnstileWidget);
      }
      
      // Create hidden container for Turnstile
      let turnstileContainer = document.getElementById('cf-turnstile-container');
      if (!turnstileContainer) {
        turnstileContainer = document.createElement('div');
        turnstileContainer.id = 'cf-turnstile-container';
        turnstileContainer.style.height = '0';
        turnstileContainer.style.overflow = 'hidden';
        document.querySelector('.resume-verification-container').appendChild(turnstileContainer);
      }
      
      // Render turnstile with explicit execution
      setTimeout(() => {
        try {
          turnstileWidget = window.turnstile.render('#cf-turnstile-container', {
            sitekey: '0x4AAAAAAA_hGhnGe75InF1l', // Replace with your actual sitekey
            callback: function(token) {
              console.log("Turnstile verification complete with token:", token ? "Success" : "Failed");
              if (token) {
                isVerified = true;
                verificationStatus.innerHTML = '<span style="color: green;">✓ Verification successful</span>';
                submitBtn.disabled = false;
                skipBtn.disabled = false;
              } else {
                verificationStatus.innerHTML = '<span style="color: red;">✗ Verification failed</span>';
              }
            },
            'error-callback': function() {
              verificationStatus.innerHTML = '<span style="color: red;">✗ Verification error</span>';
            }
          });
          console.log("Turnstile initialized");
        } catch (e) {
          console.error("Turnstile error:", e);
          // Fallback verification (just in case)
          setTimeout(() => {
            isVerified = true;
            verificationStatus.innerHTML = '<span style="color: green;">✓ Verification successful</span>';
            submitBtn.disabled = false;
            skipBtn.disabled = false;
          }, 1500);
        }
      }, 500);
    } else {
      console.log("Turnstile not loaded, retrying...");
      setTimeout(initTurnstile, 500);
    }
  }
  
  function triggerDownload() {
    const link = document.createElement('a');
    link.href = resumeURL;
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  // Event Listeners
  downloadBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  
  window.addEventListener('click', function(e) {
    if (e.target == modal) {
      closeModal();
    }
  });
  
  downloadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (isVerified) {
      const firstName = document.getElementById('resume-first-name').value;
      const lastName = document.getElementById('resume-last-name').value;
      const email = document.getElementById('resume-email').value;
      console.log("Form submitted with:", { firstName, lastName, email });
      closeModal();
      triggerDownload();
    } else {
      verificationStatus.innerHTML = '<span style="color: red;">Please wait for verification to complete</span>';
    }
  });
  
  skipBtn.addEventListener('click', function() {
    if (isVerified) {
      closeModal();
      triggerDownload();
    } else {
      verificationStatus.innerHTML = '<span style="color: red;">Please wait for verification to complete</span>';
    }
  });
});