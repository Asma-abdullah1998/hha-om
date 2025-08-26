// language.js
let currentLanguage = 'en';
let translations = {};

// Load translations from JSON file
function loadTranslations() {
  fetch('translations.json')
    .then(response => response.json())
    .then(data => {
      translations = data;
      applyTranslations();
    })
    .catch(error => console.error('Error loading translations:', error));
}

// Function to set the language
function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('preferredLanguage', lang);
  applyTranslations();
  updateDirection();
}

// Function to apply translations to the page
function applyTranslations() {
  if (Object.keys(translations).length === 0) return;
  
  // Get all elements with data-translate attribute
  const elements = document.querySelectorAll('[data-translate]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    
    // Check if translation exists for this key
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translations[currentLanguage][key];
      } else {
        element.innerHTML = translations[currentLanguage][key];
      }
    }
  });
  
  // Update language switcher buttons
  updateLanguageSwitcher();
}

// Function to update text direction based on language
function updateDirection() {
  if (currentLanguage === 'ar') {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
  }
}

// Function to update language switcher buttons
function updateLanguageSwitcher() {
  const enButton = document.querySelector('[data-lang="en"]');
  const arButton = document.querySelector('[data-lang="ar"]');
  
  if (enButton && arButton) {
    if (currentLanguage === 'en') {
      enButton.classList.add('active');
      arButton.classList.remove('active');
    } else {
      arButton.classList.add('active');
      enButton.classList.remove('active');
    }
  }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
  // Load translations first
  loadTranslations();
  
  // Check for saved language preference or use browser language
  const savedLanguage = localStorage.getItem('preferredLanguage');
  const browserLanguage = navigator.language.startsWith('ar') ? 'ar' : 'en';
  
  currentLanguage = savedLanguage || browserLanguage;
  
  // Apply translations and update direction
  applyTranslations();
  updateDirection();
});

// Add event listeners to language switcher buttons
document.addEventListener('click', function(e) {
  if (e.target.matches('[data-lang]')) {
    setLanguage(e.target.getAttribute('data-lang'));
  }
});