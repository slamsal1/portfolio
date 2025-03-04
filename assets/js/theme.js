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

// Elements
const downloadBtn = document.getElementById("download-btn");
const modal = document.getElementById("download-modal");
const closeModal = document.getElementById("close-modal");
const downloadForm = document.getElementById("download-form");
const skipBtn = document.getElementById("skip-btn");

// URL to download your resume PDF
const resumeURL = "{{ site.baseurl }}/assets/docs/resume.pdf";

// Function: Soft verification using Cloudflare Turnstile token
function verifyRequest() {
  // Retrieve the Cloudflare Turnstile token if available.
  // In production, you should send the token to your server for additional verification.
  const token = document.querySelector('textarea[name="cf-turnstile-response"]')?.value;
  if (!token) {
    alert("Please verify that you're not a robot.");
    return false;
  }
  return true;
}

// Function: Trigger the PDF download
function triggerDownload() {
  const link = document.createElement("a");
  link.href = resumeURL;
  link.download = resumeURL.substring(resumeURL.lastIndexOf("/") + 1);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Show Modal on Download Button Click
downloadBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

// Close Modal on click of Close Button
closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});

// Handle form submission with user details
downloadForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!verifyRequest()) return;
  
  // Optionally: send the user details to your server here.
  // const userData = {
  //   firstName: document.getElementById("first-name").value,
  //   lastName: document.getElementById("last-name").value,
  //   email: document.getElementById("email").value,
  // };

  modal.style.display = "none";
  triggerDownload();
});

// Handle Skip Button click for direct download
skipBtn.addEventListener("click", function () {
  if (!verifyRequest()) return;
  modal.style.display = "none";
  triggerDownload();
});

// Close modal if clicking outside of modal content
window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});