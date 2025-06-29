import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import SplitType from 'split-type';
 
// Error Boundary for Spline Component  
class SplineErrorBoundary extends React.Component {
  constructor(props) {
    super(props); 
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Only log non-WebGL errors to avoid spam
    if (!error.message.includes('WebGL') && !error.message.includes('GL_INVALID')) {
      console.warn('Spline Error Boundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(113, 34, 250, 0.1), rgba(8, 247, 254, 0.1), transparent 70%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '0.8rem'
        }}>
          3D Model Error
        </div>
      );
    }

    return this.props.children;
  }
}

// Lazy load Spline to avoid Three.js conflicts
let Spline = null;
let splineLoadPromise = null; // Cache the loading promise

const loadSpline = async () => {
  // Return cached promise if already loading
  if (splineLoadPromise) {
    return splineLoadPromise;
  }
  
  if (!Spline) {
    splineLoadPromise = (async () => {
      try {
        // Add a small delay to allow React Three Fiber to initialize first
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const SplineModule = await import('@splinetool/react-spline');
        // Handle both default and named exports
        Spline = SplineModule.default || SplineModule.Spline || SplineModule;
        
        // Validate that we got a valid component
        if (!Spline || (typeof Spline !== 'function' && !Spline.$$typeof)) {
          throw new Error('Invalid Spline component loaded');
        }
        
        return Spline;
      } catch (error) {
        console.warn('Failed to load Spline:', error);
        Spline = null;
        splineLoadPromise = null; // Reset on error
        throw error;
      }
    })();
    
    return splineLoadPromise;
  }
  return Promise.resolve(Spline);
};

// Suppress Three.js warnings in development and production
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

console.warn = (...args) => {
  // Convert all arguments to strings for checking
  const fullMessage = args.join(' ');
  
  if (
    fullMessage.includes('Multiple instances of Three.js') || 
    fullMessage.includes('Missing property') ||
    fullMessage.includes('GL_INVALID_FRAMEBUFFER_OPERATION') ||
    fullMessage.includes('GL_INVALID_VALUE') ||
    fullMessage.includes('GL_INVALID_OPERATION') ||
    fullMessage.includes('GL_INVALID_ENUM') ||
    fullMessage.includes('glTexStorage2D') ||
    fullMessage.includes('glClear') ||
    fullMessage.includes('glClearBufferfv') ||
    fullMessage.includes('glDrawElements') ||
    fullMessage.includes('glDrawArrays') ||
    fullMessage.includes('glGetParameter') ||
    fullMessage.includes('Framebuffer is incomplete') ||
    fullMessage.includes('Attachment has zero size') ||
    fullMessage.includes('Texture dimensions must all be greater than zero') ||
    fullMessage.includes('Invalid WebGL context') ||
    fullMessage.includes('Canvas created with zero dimensions') ||
    fullMessage.includes('WebGL context lost') ||
    fullMessage.includes('ForwardRef') ||
    fullMessage.includes('WARNING: Multiple instances') ||
    // Check for object-based error patterns from Honeybadger/React DevTools
    (args[0] && typeof args[0] === 'object' && args[0].message && 
     (args[0].message.includes('Multiple instances') || args[0].message.includes('Missing property')))
  ) {
    return; // Suppress these specific warnings
  }
  originalConsoleWarn.apply(console, args);
};

console.error = (...args) => {
  // Convert all arguments to strings for checking
  const fullMessage = args.join(' ');
  
  if (
    fullMessage.includes('ForwardRef') ||
    fullMessage.includes('Missing property') ||
    fullMessage.includes('GL_INVALID_FRAMEBUFFER_OPERATION') ||
    fullMessage.includes('GL_INVALID_VALUE') ||
    fullMessage.includes('GL_INVALID_OPERATION') ||
    fullMessage.includes('GL_INVALID_ENUM') ||
    fullMessage.includes('glGetParameter') ||
    fullMessage.includes('Invalid WebGL context Error') ||
    fullMessage.includes('WebGL') ||
    fullMessage.includes('Multiple instances of Three.js') ||
    // Check for object-based error patterns
    (args[0] && typeof args[0] === 'object' && args[0].message && 
     (args[0].message.includes('Multiple instances') || args[0].message.includes('Missing property')))
  ) {
    return; // Suppress these specific errors
  }
  originalConsoleError.apply(console, args);
};

// Styles
const StyledHero = styled.section`
  min-height: 100vh;
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: var(--darker-bg);
  z-index: 5;
  margin: 0;
  overflow: hidden;
  
  /* Grid lines */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(8, 247, 254, 0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(8, 247, 254, 0.07) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 2;
    pointer-events: none;
  }

  .container {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 clamp(1rem, 5vw, 2rem);
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    height: 100%;
    gap: clamp(1rem, 4vw, 2rem);
    
    @media (max-width: 1000px) and (min-width: 769px) {
      grid-template-columns: 1fr 1fr;
      text-align: left;
      gap: 1.5rem;
      align-items: center;
      padding: 0 clamp(1rem, 4vw, 1.5rem);
    }
    
    @media (max-width: 992px) {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 0.5rem;
      
    }
    
    @media (max-width: 768px) {
      align-items: center;
      justify-content: flex-start;
      padding-top: 4rem;
      min-height: auto;
    }
  }
  
  .hero-content {
    position: relative;
    z-index: 10;
  }
  
  .hero-visual {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    
    @media (max-width: 1000px) and (min-width: 769px) {
      max-width: 450px;
      height: 450px;
      justify-content: center;
      align-items: flex-start;
      margin-top: -2rem;
    }
    
    @media (max-width: 992px) and (min-width: 769px) {
      order: -1;
      max-width: 400px;
      height: 400px;
      justify-content: center;
      align-items: center;
    }
    
    @media (max-width: 768px) {
      display: none; /* Completely hide on mobile */
    }
    
    @media (max-width: 480px) {
      display: none; /* Ensure it stays hidden on small mobile */
    }
  }

  .hero-sphere {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(400px, 80vw);
    height: min(400px, 80vw);
    z-index: 1;
    opacity: 0; 
    
    @media (max-width: 1000px) and (min-width: 769px) {
      top: 45%;
      left: 55%;
      width: min(320px, 65vw);
      height: min(320px, 65vw);
    }
    
    @media (max-width: 992px) and (min-width: 769px) {
      left: 12%;
      top: 60%;
      width: min(350px, 70vw);
      height: min(350px, 70vw);
    }
    
    @media (max-width: 768px) {
      display: none; /* Hide sphere on mobile */
    }
    
    @media (max-width: 480px) {
      display: none; /* Ensure it stays hidden on small mobile */
    }
    
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(113, 34, 250, 0.3), rgba(8, 247, 254, 0.2), transparent 70%);
      box-shadow: 0 0 60px rgba(8, 247, 254, 0.5);
      animation: pulseSphere 4s ease-in-out infinite alternate;
    }
    
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid rgba(8, 247, 254, 0.6);
      box-sizing: border-box;
      filter: blur(4px);
      animation: rotateSphere 15s linear infinite;
    }
  }

  .spline-container {
    position: absolute;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);
    width: min(500px, 85vw);
    height: min(500px, 85vw);
    border-radius: 50%;
    overflow: hidden;
    z-index: 3;
    opacity: 0; 
    
    @media (max-width: 1000px) and (min-width: 769px) {
      top: 45%;
      left: 65%;
      width: min(380px, 70vw);
      height: min(380px, 70vw);
    }
    
    @media (max-width: 992px) and (min-width: 769px) {
      left: 65%;
      top: 60%;
      width: min(400px, 75vw);
      height: min(400px, 75vw);
    }
    
    @media (max-width: 768px) {
      display: none; /* Hide 3D model on mobile */
    }
    
    @media (max-width: 480px) {
      display: none; /* Ensure it stays hidden on small mobile */
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(8, 247, 254, 0.1), transparent 70%);
      pointer-events: none;
      z-index: 2;
    }
    }
    
    canvas {
      width: 100% !important;
      height: 100% !important;
    }
  }
  
  .title-container {
    margin-bottom: 2rem;
    opacity: 0; 
  }
  
  .glitch-title {
    font-size: clamp(2.5rem, 8vw, 4.8rem);
    font-weight: 800;
    line-height: 1.1;
    margin: 0 0 1rem 0;
    color: #fff;
    text-transform: uppercase;
    font-family: 'Orbitron', sans-serif;
    letter-spacing: clamp(-2px, -0.5vw, -1px);
    position: relative;
    display: inline-block;
    text-shadow: 0 0 20px rgba(8, 247, 254, 0.4);
  }
  
  .char {
    display: inline-block;
    position: relative;
    color: var(--text-primary);
    
    &[data-char="."] {
      margin-right: clamp(0.5rem, 2vw, 1rem);
    }
    
    &::before,
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      content: attr(data-char);
    }
    
    &::before {
      color: var(--neon-pink);
      z-index: -1;
      transform: translateX(-2px);
      filter: blur(1px);
    }
    
    &::after {
      color: var(--neon-blue);
      z-index: -2;
      transform: translateX(2px);
      filter: blur(1px);
    }
  }

  .subtitle {
    font-size: clamp(1.2rem, 4vw, 1.75rem);
    color: var(--neon-blue);
    margin: 1rem 0 1.5rem;
    font-family: 'Poppins', sans-serif;
    text-shadow: 0 0 10px rgba(8, 247, 254, 0.5);
    font-weight: 400;
    opacity: 0; 
    
    .role-text {
      position: relative;
      display: inline-block;
      min-width: 120px;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--neon-blue), var(--neon-purple), transparent);
        animation: glow 2s linear infinite;
      }
    }
    
    .typing-cursor {
      display: inline-block;
      width: 2px;
      height: 1em;
      background-color: var(--neon-blue);
      margin-left: 2px;
      animation: blink 1s infinite;
      vertical-align: text-bottom;
    }
  }

  .description {
    font-size: clamp(1rem, 2.5vw, 1.1rem);
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.7;
    margin: 0 0 2rem;
    font-family: 'Poppins', sans-serif;
    max-width: 600px;
    text-align: left;
    opacity: 0;
    
    @media (max-width: 992px) {
      text-align: center;
      margin-left: auto;
      margin-right: auto;
    }
    
    p {
      margin-bottom: 1rem;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .cta-container {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    opacity: 0;
    
    @media (max-width: 992px) {
      justify-content: center;
    }
    
    @media (max-width: 768px) {
      flex-direction: column;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }
    
    .cta-button {
      padding: 0.9rem 2rem;
      background: transparent;
      border: 1px solid var(--neon-blue);
      color: var(--neon-blue);
      font-size: clamp(0.8rem, 2vw, 0.9rem);
      text-transform: uppercase;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: 'Orbitron', sans-serif;
      border-radius: 4px;
      position: relative;
      overflow: hidden;
      font-weight: 600;
      opacity: 0;
      
      @media (max-width: 768px) {
        width: 100%;
        padding: 1rem 2rem;
      }
      
      @media (max-width: 480px) {
        letter-spacing: 1px;
        padding: 0.8rem 1.5rem;
      }
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--neon-blue);
        z-index: -1;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }
      
      &::after {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border-radius: 4px;
        background: transparent;
        z-index: -2;
        opacity: 0;
        transition: opacity 0.3s ease;
        box-shadow: 0 0 15px var(--neon-blue);
      }

      &:hover {
        color: var(--darker-bg);
        transform: translateY(-2px);
        
        &::before {
          transform: scaleX(1);
          transform-origin: left;
        }
        
        &::after {
          opacity: 1;
        }
      }
      
      &:nth-child(2) {
        border-color: var(--neon-pink);
        color: var(--neon-pink);
        
        &::before {
          background: var(--neon-pink);
        }
        
        &::after {
          box-shadow: 0 0 15px var(--neon-pink);
        }
        
        &:hover {
          color: var(--darker-bg);
        }
      }
        &:nth-child(3) {
            border-color: var(--neon-yellow);
            color: var(--neon-yellow);

            &::before {
                background: var(--neon-yellow);
            }

            &::after {
                box-shadow: 0 0 15px var(--neon-yellow);
            }

            &:hover {
                color: var(--darker-bg);
            }
        }  
    }
  }
  
  .scroll-indicator {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--text-primary);
    opacity: 0; 
    transition: opacity 0.3s ease;
    z-index: 10;
    
    @media (min-width: 768px) and (max-width: 992px) {
      bottom: 20Ppx;
      opacity: 0.6;
    }
    
    &:hover {
      opacity: 1;
    }
    
    .scroll-text {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 8px;
    }
    
    .scroll-icon {
      width: 30px;
      height: 50px;
      border: 2px solid var(--text-primary);
      border-radius: 15px;
      display: flex;
      justify-content: center;
      padding-top: 10px;
      
      &::before {
        content: '';
        width: 6px;
        height: 6px;
        background: var(--text-primary);
        border-radius: 50%;
        animation: scrollDown 2s infinite;
      }
    }
  }

  .three-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    opacity: 1;
    
    @media (max-width: 768px) {
      opacity: 0.8; /* Slightly reduced opacity on mobile for better readability */
    }
  }

  /* Animations */
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  
  @keyframes glow {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
  
  @keyframes pulseSphere {
    0% { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(1.05); opacity: 0.8; }
  }
   
  @keyframes rotateSphere {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes scrollDown {
    0% { transform: translateY(0); opacity: 1; }
    30% { opacity: 1; }
    70% { opacity: 0; }
    100% { transform: translateY(15px); opacity: 0; }
  }

  /* Media queries */
  @media (max-width: 1200px) {
    .glitch-title {
      font-size: 4.5rem;
    }
  }

  @media (max-width: 1000px) and (min-width: 769px) {
    .container {
      grid-template-columns: 1fr 1fr;
      text-align: left;
      align-items: center;
      gap: 1rem;
    }
    
    .hero-content {
      order: 1;
    }
    
    .hero-visual {
      order: 2;
    }
    
    .description {
      text-align: left;
      margin-left: 0;
      margin-right: 0;
    }
    
    .cta-container {
      justify-content: flex-start;
    }
  }

  @media (max-width: 992px) {
    .container {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    .description {
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
    
    .cta-container {
      justify-content: center;
      margin-bottom: 3rem;
    }
    
    .scroll-indicator {
      bottom: 15px;
      opacity: 0.5;
    }
  }

  @media (min-width: 768px) and (max-width: 992px) {
    .container {
      padding-bottom: 8rem;
    }
    
    .cta-container {
      margin-bottom: 7rem;
    }
    
    .scroll-indicator {
      bottom: 15px;
      opacity: 0.4;
      transform: translateX(-50%) scale(0.9);
    }
  }

  @media (min-width: 778px) and (max-width: 992px) {
    .scroll-indicator {
      bottom: 0px;
      opacity: 0.3;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 1.5rem;
      padding-top: 4rem;
      align-items: flex-start;
    }
    
    .hero-content {
      margin-top: 2rem;
    }
    
    .glitch-title {
      font-size: 3.5rem;
    }
    
    .subtitle {
      font-size: 1.5rem;
    }
    
    .description {
      font-size: 1rem;
      text-align: center;
    }
    
    .cta-container {
      flex-direction: column;
      width: 100%;
      margin-bottom: 4rem;
      
      .cta-button {
        width: 100%;
      }
    }
    
    .scroll-indicator {
      bottom: 20px;
      margin-bottom: -1rem;
    }
  }
  
  @media (max-width: 480px) {
    .glitch-title {
      font-size: 2.8rem;
    }
  }
`;

// WebGL Error Fallback Component
const WebGLFallback = () => (
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'var(--darker-bg)' 
  }} />
);

// Safe Canvas Wrapper that prevents zero-sized rendering
const SafeCanvasWrapper = ({ children, canvasSize, webglSupported, canvasReady }) => {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Only mark as ready when all conditions are met
    const ready = webglSupported && 
                  canvasReady && 
                  canvasSize.width > 0 && 
                  canvasSize.height > 0;
    
    // Add a small delay to ensure stability
    if (ready) {
      const timeout = setTimeout(() => setIsReady(true), 50);
      return () => clearTimeout(timeout);
    } else {
      setIsReady(false);
    }
  }, [webglSupported, canvasReady, canvasSize]);
  
  if (!isReady) {
    return <WebGLFallback />;
  }
  
  return children;
};

// Dimension validator hook
const useDimensionValidator = (ref, threshold = 10) => {
  const [isValid, setIsValid] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const validateDimensions = () => {
      const rect = ref.current.getBoundingClientRect();
      const valid = rect.width >= threshold && rect.height >= threshold;
      setIsValid(valid);
    };
    
    validateDimensions();
    
    const observer = new ResizeObserver(validateDimensions);
    observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, [ref, threshold]);
  
  return isValid;
};

// Spline Model Component with error handling
const SplineModel = ({ scene, isVisible }) => {
  const [SplineComponent, setSplineComponent] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    // Reset states when visibility changes
    if (!isVisible) {
      setError(false);
      setIsLoading(false);
      return;
    }

    // Only load Spline when it's supposed to be visible and component is mounted
    if (!SplineComponent && !isLoading && !error && mounted) {
      setIsLoading(true);
      loadSpline()
        .then(LoadedSpline => {
          if (LoadedSpline && mounted) {
            // Ensure we have a valid React component
            if (typeof LoadedSpline === 'function' || (LoadedSpline && LoadedSpline.$$typeof)) {
              setSplineComponent(() => LoadedSpline);
            } else {
              console.warn('Loaded Spline component is not valid');
              setError(true);
            }
          } else if (!mounted) {
            // Component was unmounted, don't update state
            return;
          } else {
            setError(true);
          }
        })
        .catch((err) => {
          console.warn('Failed to load Spline component:', err);
          if (mounted) {
            setError(true);
          }
        })
        .finally(() => {
          if (mounted) {
            setIsLoading(false);
          }
        });
    }
  }, [isVisible, SplineComponent, isLoading, error, mounted]);

  // Don't render anything if not visible
  if (!isVisible) {
    return null;
  }

  if (error) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(113, 34, 250, 0.1), rgba(8, 247, 254, 0.1), transparent 70%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.8rem'
      }}>
        3D Model Unavailable
      </div>
    );
  }

  if (isLoading || !SplineComponent) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(113, 34, 250, 0.1), rgba(8, 247, 254, 0.1), transparent 70%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.8rem'
      }}>
        Loading 3D Model...
      </div>
    );
  }

  // Render with additional error boundary
  return (
    <SafeSplineWrapper
      SplineComponent={SplineComponent}
      scene={scene}
      onLoad={() => {
        // Spline model loaded successfully
      }}
      onError={(error) => {
        console.warn('Spline model error:', error);
        setError(true);
      }}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%'
      }}
    />
  );
};

// Safe Spline Wrapper to handle ForwardRef issues
const SafeSplineWrapper = ({ SplineComponent, scene, onLoad, onError, style }) => {
  const [hasError, setHasError] = useState(false);

  // Validate SplineComponent before rendering
  if (!SplineComponent || (typeof SplineComponent !== 'function' && !SplineComponent.$$typeof)) {
    return (
      <div style={{
        ...style,
        background: 'radial-gradient(circle, rgba(113, 34, 250, 0.1), rgba(8, 247, 254, 0.1), transparent 70%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.8rem'
      }}>
        Invalid 3D Component
      </div>
    );
  }

  if (hasError) {
    return (
      <div style={{
        ...style,
        background: 'radial-gradient(circle, rgba(113, 34, 250, 0.1), rgba(8, 247, 254, 0.1), transparent 70%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.8rem'
      }}>
        3D Model Error
      </div>
    );
  }

  try {
    // Create element with proper error handling
    return React.createElement(SplineComponent, {
      scene,
      onLoad: () => {
        try {
          onLoad && onLoad();
        } catch (err) {
          console.warn('Spline onLoad error:', err);
          setHasError(true);
        }
      },
      onError: (error) => {
        console.warn('Spline onError:', error);
        setHasError(true);
        onError && onError(error);
      },
      style
    });
  } catch (error) {
    console.warn('SafeSplineWrapper render error:', error);
    setHasError(true);
    return (
      <div style={{
        ...style,
        background: 'radial-gradient(circle, rgba(113, 34, 250, 0.1), rgba(8, 247, 254, 0.1), transparent 70%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.8rem'
      }}>
        3D Model Error
      </div>
    );
  }
};

// 3D Background component
const HeroBackground = () => {
  const { camera, size, gl } = useThree();
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    // Check if the canvas and WebGL context are valid
    if (!gl || !size || size.width === 0 || size.height === 0) {
      setIsValid(false);
      return;
    }
    
    // Validate WebGL context
    try {
      const contextLost = gl.isContextLost && gl.isContextLost();
      setIsValid(!contextLost);
    } catch (error) {
      console.warn('WebGL context validation error:', error);
      setIsValid(false);
    }
  }, [gl, size]);

  useEffect(() => {
    if (!isValid) return;
    
    const handleMouseMove = (event) => {
      try {
        // Additional safety check
        if (!camera) return;
        
        // Get mouse position relative to viewport
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Apply subtle movement to camera position (reduced on mobile)
        const sensitivity = window.innerWidth <= 768 ? 0.3 : 1;
        camera.position.x = x * sensitivity;
        camera.position.y = y * sensitivity;
        camera.lookAt(0, 0, 0);
      } catch (error) {
        console.warn('Camera movement error:', error);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [camera, isValid]);

  // Don't render anything if context is invalid
  if (!isValid) {
    return null;
  }

  // Adjust settings based on screen size for better mobile performance
  const isMobile = window.innerWidth <= 768;
  const starCount = isMobile ? 2000 : 5000; // Fewer stars on mobile
  const autoRotateSpeed = isMobile ? 0.1 : 0.3; // Slower rotation on mobile

  return (
    <>
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={autoRotateSpeed}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
      />
      <Stars
        radius={300}
        depth={100}
        count={starCount}
        factor={6}
        fade
        speed={1}
      />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#08f7fe" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#7122fa" />
      <ambientLight intensity={0.2} />
      <fog attach="fog" args={['#000', 10, 50]} />
    </>
  );
};

// Main Hero component
const Hero = ({ startAnimations = false }) => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const titleContainerRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaContainerRef = useRef(null);
  const heroSphereRef = useRef(null);
  const splineContainerRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [currentRole, setCurrentRole] = useState('Developer');
  const [animationsStarted, setAnimationsStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [canvasReady, setCanvasReady] = useState(false);
  const [shouldShow3D, setShouldShow3D] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const canvasContainerRef = useRef(null);
  const isContainerValid = useDimensionValidator(canvasContainerRef);
  const roles = ['Developer', 'Designer'];

  useEffect(() => {
    let resizeTimeout;
    let resizeObserver;
    
    // Check if device is mobile with debouncing
    const checkMobile = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newIsMobile = window.innerWidth <= 768; // Changed to <= 768 to include 768px
        setIsMobile(newIsMobile);
      }, 150); // Debounce resize events
    };
    
    // Check WebGL support
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        const supported = !!gl;
        
        // Additional WebGL validation
        if (supported && gl) {
          try {
            // Test basic WebGL functionality
            gl.getParameter(gl.VERSION);
            setWebglSupported(true);
          } catch (error) {
            console.warn('WebGL context test failed:', error);
            setWebglSupported(false);
          }
        } else {
          setWebglSupported(false);
        }
      } catch (error) {
        console.warn('WebGL not supported:', error);
        setWebglSupported(false);
      }
    };
    
    // Monitor canvas container size
    const observeCanvasSize = () => {
      if (canvasContainerRef.current && window.ResizeObserver) {
        resizeObserver = new ResizeObserver((entries) => {
          const entry = entries[0];
          if (entry) {
            const { width, height } = entry.contentRect;
            setCanvasSize({ width, height });
            setCanvasReady(width > 0 && height > 0);
          }
        });
        
        resizeObserver.observe(canvasContainerRef.current);
      } else {
        // Fallback for browsers without ResizeObserver
        const updateCanvasSize = () => {
          if (canvasContainerRef.current) {
            const rect = canvasContainerRef.current.getBoundingClientRect();
            setCanvasSize({ width: rect.width, height: rect.height });
            setCanvasReady(rect.width > 0 && rect.height > 0);
          } else {
            setCanvasReady(false);
            setCanvasSize({ width: 0, height: 0 });
          }
        };
        
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
        
        return () => window.removeEventListener('resize', updateCanvasSize);
      }
    };
    
    checkMobile();
    checkWebGL();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('resize', checkWebGL);
    
    // Set canvas ready after a brief delay to ensure DOM is ready
    setTimeout(() => {
      observeCanvasSize();
    }, 100);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', checkWebGL);
      clearTimeout(resizeTimeout);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  // Update 3D visibility when mobile or WebGL state changes
  useEffect(() => {
    // Add a small delay to prevent rapid state changes during resize
    const timeout = setTimeout(() => {
      // Allow 3D to show on all devices if WebGL is supported
      const should3DShow = webglSupported;
      setShouldShow3D(should3DShow);
    }, 200);
    
    return () => clearTimeout(timeout);
  }, [isMobile, webglSupported]);

  useEffect(() => {
    // Only start animations when loading is complete
    if (!startAnimations || animationsStarted) return;

    // Add a small delay to ensure loading screen has fully faded out
    const animationTimeout = setTimeout(() => {
      setAnimationsStarted(true);

      // Setup SplitType for text animation
      if (titleRef.current) {
        const splitTitle = new SplitType(titleRef.current, { types: 'chars' });

        // Make sure we've got the elements
        if (splitTitle.chars) {
          gsap.fromTo(
            splitTitle.chars,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.5,
              ease: 'power2.out',
              delay: 0.2
            }
          );
        }
      }

      // Role cycling
      const roleInterval = setInterval(() => {
        setCurrentRole(prev => {
          const currentIndex = roles.indexOf(prev);
          return roles[(currentIndex + 1) % roles.length];
        });
      }, 2500);

      // GSAP animations for hero section elements using refs
      const tl = gsap.timeline();

      // First animate the title container
      if (titleContainerRef.current) {
        tl.fromTo(
          titleContainerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.1 }
        );
      }

      // Then subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        );
      }

      // Description
      if (descriptionRef.current) {
        tl.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        );
      }

      if (ctaContainerRef.current) {
        tl.fromTo(
          ctaContainerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        );
        
        const buttons = ctaContainerRef.current.querySelectorAll('.cta-button');
        tl.fromTo(
          buttons,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        );
      }


      // Animate 3D elements only if they should be shown
      if (shouldShow3D) {
        if (heroSphereRef.current) {
          tl.fromTo(
            heroSphereRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
            '-=1'
          );
        }

        if (splineContainerRef.current) {
          tl.fromTo(
            splineContainerRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
            '-=1'
          );
        }
      }

      // Scroll indicator
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -20 },
          { opacity: 0.7, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        );
      }

      // Store cleanup function for the interval
      return () => {
        clearInterval(roleInterval);
      };
    }, 300); // 300ms delay to ensure loading screen fade completes

    // Cleanup function
    return () => {
      clearTimeout(animationTimeout);
    };
  }, [startAnimations, animationsStarted, roles, shouldShow3D]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <StyledHero ref={heroRef} id="home">
      <div className="three-container" ref={canvasContainerRef}>
        {shouldShow3D && webglSupported && (
          <SafeCanvasWrapper 
            canvasSize={canvasSize} 
            webglSupported={webglSupported} 
            canvasReady={canvasReady && isContainerValid}
          >
            <Canvas 
              camera={{ position: [0, 0, 20], fov: 90 }}
              frameloop="demand" // Only render when needed to reduce conflicts
              onCreated={(state) => {
                try {
                  // Comprehensive validation before proceeding
                  if (!state || !state.gl || !state.size) {
                    return;
                  }
                  
                  const { width, height } = state.size;
                  if (width === 0 || height === 0) {
                    return;
                  }
                  
                  // Enhanced WebGL context validation
                  const gl = state.gl;
                  if (!gl || typeof gl.getParameter !== 'function') {
                    return;
                  }
                  
                  // Check if context is lost
                  if (gl.isContextLost && gl.isContextLost()) {
                    return;
                  }
                  
                  // Test basic WebGL functionality with safer checks
                  try {
                    // First check if we can access basic WebGL constants
                    if (typeof gl.VENDOR === 'undefined' || typeof gl.VERSION === 'undefined') {
                      return;
                    }
                    
                    // Check drawing buffer dimensions as additional validation
                    if (gl.drawingBufferWidth === 0 || gl.drawingBufferHeight === 0) {
                      return;
                    }
                    
                    // Only call getParameter if we're confident the context is valid
                    const vendor = gl.getParameter(gl.VENDOR);
                    const version = gl.getParameter(gl.VERSION);
                    if (!vendor || !version) {
                      return;
                    }
                  } catch (contextError) {
                    // Context is not fully functional, fail silently
                    setWebglSupported(false);
                    return;
                  }
                  
                  // Add context loss listeners only after validation
                  const canvas = gl.domElement;
                  if (canvas) {
                    canvas.addEventListener('webglcontextlost', (event) => {
                      event.preventDefault();
                      setWebglSupported(false);
                    });
                    
                    canvas.addEventListener('webglcontextrestored', () => {
                      // Restore WebGL support when context is restored
                      setWebglSupported(true);
                    });
                  }
                } catch (error) {
                  // Silently handle any errors in onCreated to prevent console spam
                  setWebglSupported(false);
                  return;
                }
              }}
              onError={(error) => {
                console.warn('Canvas error:', error);
                setWebglSupported(false);
              }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                failIfMajorPerformanceCaveat: false,
                preserveDrawingBuffer: false
              }}
              resize={{ scroll: false, debounce: { scroll: 50, resize: 50 } }}
            >
              <HeroBackground />
            </Canvas>
          </SafeCanvasWrapper>
        )}
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="title-container" ref={titleContainerRef}>
            <h1 className="glitch-title" ref={titleRef}>Vishwa <br />
              Fernando</h1>
            <div className="subtitle" ref={subtitleRef}>
              Web <span className="role-text">{currentRole}</span>
              <span className="typing-cursor"></span>
            </div>
          </div>

          <div className="description" ref={descriptionRef}>
            <p>Crafting digital experiences that push the boundaries of creativity and technology.</p>
            <p>Let's build something extraordinary.</p>
          </div>

          <div className="cta-container" ref={ctaContainerRef}>
            <button
              className="cta-button"
              onClick={() => scrollToSection('projects')}
            >
              View Projects
            </button>
            <button
              className="cta-button"
              onClick={() => scrollToSection('contact')}
            >
              Contact Me
            </button>
            <button
              className="cta-button"
              onClick={() => {
                // Try to download first
                const link = document.createElement('a');
                link.href = '/assets/VishwaFernando-CV.pdf';
                link.download = 'VishwaFernando-CV.pdf';

                // Fallback to opening in new tab if download fails
                link.onclick = (e) => {
                  // If download attribute is not supported, open in new tab
                  if (!link.download) {
                    e.preventDefault();
                    window.open('/VishwaFernando-CV.pdf', '_blank');
                  }
                };

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              My CV
            </button>
          </div>
        </div>

        <div className="hero-visual">
          {shouldShow3D && !isMobile && webglSupported && window.innerWidth > 768 && (
            <>
              <div className="spline-container" ref={splineContainerRef}>
                <SplineErrorBoundary>
                  <SplineModel
                    key={`spline-${shouldShow3D}`}
                    scene="https://prod.spline.design/5JsnlbsegYxB4sfm/scene.splinecode"
                    isVisible={shouldShow3D && !isMobile && window.innerWidth > 768}
                  />
                </SplineErrorBoundary>
              </div>
              <div className="hero-sphere" ref={heroSphereRef}></div>
            </>
          )}
        </div>
      </div>

      <div className="scroll-indicator" ref={scrollIndicatorRef} onClick={() => scrollToSection('about')}>
        <div className="scroll-text">Scroll</div>
        <div className="scroll-icon"></div>
      </div>
    </StyledHero>
  );
};

export default Hero;
