const fs = require('fs');
let html = fs.readFileSync('disclaimer.html', 'utf8');

html = html.replace(/<title>.*<\/title>/, '<title>Steam - About</title>');

html = html.replace(
  /<nav class="main-nav">[\s\S]*?<\/nav>/,
  \<nav class="main-nav">
          <a class="nav-item" href="index.html">GAMES</a>
          <a class="nav-item" href="disclaimer.html">DISCLAIMER</a>
          <a class="nav-item active" href="about.html">ABOUT</a>
          <a class="nav-item" href="#support" onclick="alert('Welcome to Steam Web Arcade! Click any game to play immediately directly in your browser with full screen support.')">SUPPORT</a>
        </nav>\
);

html = html.replace(
  /<main class="content-wrapper">[\s\S]*?<\/main>/,
  \<main class="content-wrapper">
    <h1 class="page-header">About</h1>
    
    <div class="disclaimer-card">
      <h2 class="disclaimer-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
        Our Mission
      </h2>
      
      <p class="disclaimer-text" style="font-size: 16px;">
        This site is supposed to make these games more playable and just easier to have them all in one place.
      </p>

      <p class="disclaimer-text">
        Instead of hunting down various links and dealing with broken sites, Steam Web Arcade brings classic web-ported titles together under a single, unified, Steam-styled interface for a seamless nostalgic experience.
      </p>

      <a href="index.html" class="back-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Return to Arcade
      </a>
    </div>
  </main>\
);

fs.writeFileSync('about.html', html);
