import { createGlobalStyle } from 'styled-components';
 
const GlobalStyles = createGlobalStyle`
  :root {
    --neon-pink: #ff2e63; 
    --neon-blue: #08f7fe;
    --neon-yellow: #f7df1e;
    --neon-white: #ffffff;
    --neon-purple: #7122fa;
    --neon-green: #48ff00;
    --dark-bg: #0a0a0b;
    --darker-bg: #050506;
    --text-primary: #ffffff;
    --text-secondary: #b3b3b3;
    --accent-gradient: linear-gradient(45deg, var(--neon-blue), var(--neon-purple));
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  html, body {
    width: 100%;
    height: 100%;
    background-color: var(--dark-bg);
    color: var(--text-primary);
    font-family: 'Space Grotesk', sans-serif;
    line-height: 1.6;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
  }

  body {
    position: relative;
  }

  #root {
    position: relative;
    z-index: 1;
    width: 100%;
    min-height: 100vh;
  }

  /* Responsive font sizes */
  @media (max-width: 1200px) {
    html {
      font-size: 14px;
    }
  }

  @media (max-width: 768px) {
    html {
      font-size: 13px;
    }
  }

  @media (max-width: 480px) {
    html {
      font-size: 12px;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  a {
    color: var(--neon-blue);
    text-decoration: none;
    transition: all 0.3s ease;
  }

  button {
    font-family: 'Orbitron', sans-serif;
    cursor: pointer;
    border: none;
    outline: none;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    background: var(--darker-bg);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--neon-blue);
    border-radius: 4px;
    
    &:hover {
      background: var(--neon-purple);
    }
  }

  /* Text selection */
  ::selection {
    background: var(--neon-blue);
    color: var(--dark-bg);
  }

  /* Ensure proper stacking context */
  section {
    position: relative;
    z-index: 10;
    width: 100%;
    min-height: 100vh;
  }

  canvas {
    position: fixed !important;
    top: 0;
    left: 0;
    z-index: 0 !important;
    pointer-events: none;
  }

  /* Ensure proper responsive sections */
  section {
    position: relative;
    z-index: 10;
    width: 100%;
    min-height: 100vh;
    display: block;
    
    @media (max-width: 768px) {
      min-height: auto;
    }
  }

  /* Responsive container utility */
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    width: 100%;
    
    @media (max-width: 1200px) {
      padding: 0 1.5rem;
    }
    
    @media (max-width: 768px) {
      padding: 0 1rem;
    }
    
    @media (max-width: 480px) {
      padding: 0 0.75rem;
    }
  }

  /* Responsive text utilities */
  .text-responsive {
    font-size: clamp(1rem, 2.5vw, 1.2rem);
    line-height: 1.6;
  }

  .heading-responsive {
    font-size: clamp(2rem, 5vw, 3rem);
    line-height: 1.2;
  }

  /* Responsive spacing utilities */
  .section-spacing {
    padding: clamp(4rem, 10vh, 8rem) 0;
    
    @media (max-width: 768px) {
      padding: clamp(3rem, 8vh, 6rem) 0;
    }
  }

  /* Responsive grid utilities */
  .grid-responsive {
    display: grid;
    gap: clamp(1rem, 4vw, 2rem);
    
    &.grid-2 {
      grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
    }
    
    &.grid-3 {
      grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
    }
  }

  /* Performance optimizations */
  * {
    will-change: auto;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default GlobalStyles;
