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

  /* Ensure proper stacking context */
  section {
    position: relative;
    z-index: 10;
    width: 100%;
    min-height: 100vh;
    display: block;
  }
`;

export default GlobalStyles;
