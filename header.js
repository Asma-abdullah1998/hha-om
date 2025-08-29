function initHeader() {
  // Toggle mobile menu
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (menuToggle && navLinks) {
    // Remove any existing event listeners
    const newToggle = menuToggle.cloneNode(true);
    menuToggle.parentNode.replaceChild(newToggle, menuToggle);
    
    const newNav = navLinks.cloneNode(true);
    navLinks.parentNode.replaceChild(newNav, navLinks);
    
    // Reattach event listeners
    newToggle.addEventListener('click', function() {
      newNav.classList.toggle('active');
      newToggle.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    const navItems = newNav.querySelectorAll('a');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        newNav.classList.remove('active');
        newToggle.classList.remove('active');
      });
    });
  }
  
  // Language switcher functionality
  const langButtons = document.querySelectorAll('.language-switcher button');
  langButtons.forEach(button => {
    // Remove any existing event listeners
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    
    newButton.addEventListener('click', () => {
      langButtons.forEach(btn => btn.classList.remove('active'));
      newButton.classList.add('active');
      console.log('Switching to language: ' + newButton.dataset.lang);
    });
  });
}

// Initialize when DOM is loaded
if (document.readyState !== 'loading') {
  initHeader();
} else {
  document.addEventListener('DOMContentLoaded', initHeader);
}
