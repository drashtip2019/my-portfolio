/**
 * =========================================================
 * DRASHTI PATEL - PORTFOLIO INTERACTIVITY SCRIPT
 * Features:
 * 1. Automatically update copyright year
 * 2. Mobile hamburger menu toggle & accessibility
 * 3. Smooth scrolling and active link highlighting on scroll
 * 4. Header shadow on scroll
 * 5. Elegant fallback for my-photo.jpg
 * =========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------
     1. Automatically Update Copyright Year
     ------------------------------------------------------- */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
  }

  /* -------------------------------------------------------
     2. Mobile Hamburger Menu Toggle
     ------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    // Toggle menu on button click
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when any nav link is clicked (mobile UX)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      const isClickInsideNav = navMenu.contains(event.target);
      const isClickOnToggle = mobileToggle.contains(event.target);

      if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* -------------------------------------------------------
     3. Header Elevation Shadow on Scroll
     ------------------------------------------------------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  /* -------------------------------------------------------
     4. Active Link Highlight on Scroll (Scroll Spy)
     ------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120; // Offset for sticky header

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (matchingLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  /* -------------------------------------------------------
     5. Elegant Image Fallback for "my-photo.jpg"
     Ensures that if the user hasn't added their photo yet,
     a stylish avatar placeholder is displayed seamlessly.
     ------------------------------------------------------- */
  const fallbackAvatarSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 450" width="400" height="450">
      <defs>
        <linearGradient id="gradBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E8F3FD" />
          <stop offset="100%" stop-color="#CDE2F7" />
        </linearGradient>
        <linearGradient id="gradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4D8DCC" />
          <stop offset="100%" stop-color="#3475B5" />
        </linearGradient>
      </defs>
      <!-- Background fill -->
      <rect width="100%" height="100%" fill="url(#gradBg)" />
      
      <!-- Subtle geometric decorative elements -->
      <circle cx="340" cy="80" r="50" fill="#4D8DCC" opacity="0.12" />
      <circle cx="60" cy="380" r="70" fill="#4D8DCC" opacity="0.1" />

      <!-- Modern Student Avatar Illustration -->
      <!-- Head / Face -->
      <circle cx="200" cy="175" r="68" fill="#FCE5D8" />
      
      <!-- Hair -->
      <path d="M130 170 C130 95, 270 95, 270 170 C270 195, 255 220, 255 220 C240 160, 160 160, 145 220 Z" fill="#263D59" />
      
      <!-- Glasses / Smart frame -->
      <circle cx="178" cy="175" r="17" fill="none" stroke="#263D59" stroke-width="3.5" />
      <circle cx="222" cy="175" r="17" fill="none" stroke="#263D59" stroke-width="3.5" />
      <line x1="195" y1="175" x2="205" y2="175" stroke="#263D59" stroke-width="3.5" />
      
      <!-- Friendly Smile -->
      <path d="M188 208 Q200 218 212 208" fill="none" stroke="#263D59" stroke-width="3" stroke-linecap="round" />

      <!-- Shoulders & Outfit -->
      <path d="M100 370 C100 280, 140 260, 200 260 C260 260, 300 280, 300 370 Z" fill="url(#gradPrimary)" />
      <!-- Collar -->
      <path d="M175 260 L200 295 L225 260 Z" fill="#FFFFFF" opacity="0.9" />

      <!-- Label -->
      <rect x="90" y="390" width="220" height="34" rx="17" fill="#FFFFFF" opacity="0.95" />
      <text x="200" y="412" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#263D59" text-anchor="middle">
        Drashti Patel
      </text>
    </svg>
  `)}`;

  const photoImages = document.querySelectorAll('.personal-photo');
  photoImages.forEach(img => {
    // If the image fails to load or my-photo.jpg is absent, show friendly fallback
    img.addEventListener('error', () => {
      img.src = fallbackAvatarSvg;
    });

    // Also trigger fallback check if image has no naturalWidth after load attempt
    if (img.complete && img.naturalWidth === 0) {
      img.src = fallbackAvatarSvg;
    }
  });

});
