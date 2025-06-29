import { useEffect, useRef, useState, useCallback, useMemo, memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Importing GSAP for animations
gsap.registerPlugin(ScrollTrigger); 
 
const StyledProjects = styled.section`
  min-height: 100vh;
  padding: 8rem 5%;
  background: var(--dark-bg);
  position: relative;
  overflow: visible; 
  perspective: 3000px;
  transform-style: preserve-3d;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 25% 25%, rgba(8, 247, 254, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(113, 34, 250, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }

  h2 {
    font-size: clamp(2.5rem, 6vw, 3.5rem);
    text-align: center;
    margin-bottom: 4rem;
    color: var(--neon-purple);
    text-shadow: 0 0 20px rgba(113, 34, 250, 0.5);
    font-family: 'Orbitron', sans-serif;
    position: relative;
    z-index: 10;
    
    &::before {
      content: '';
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 200px;
      height: 4px;
      background: linear-gradient(90deg, 
        transparent, 
        var(--neon-purple), 
        var(--neon-blue), 
        var(--neon-purple), 
        transparent
      );
      border-radius: 2px;
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    &.animated::before {
      opacity: 1;
      animation: glowPulse 3s ease-in-out infinite;
    }
  }

  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 5px var(--neon-purple); }
    50% { box-shadow: 0 0 20px var(--neon-purple), 0 0 30px var(--neon-blue); }
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 4rem;
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 10;
    perspective: 2000px;
    transform-style: preserve-3d;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 0 1rem;
      perspective: none;
      transform-style: flat;
    }
    
    @media (max-width: 480px) {
      gap: 1.5rem;
      padding: 0 0.5rem;
    }
  }
`;

const ProjectCard = styled(motion.div)`
  position: relative;
  background: rgba(10, 10, 15, 0.8);
  border-radius: 20px;
  overflow: visible;
  border: 1px solid rgba(8, 247, 254, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-style: preserve-3d;
  perspective: 2000px;
  will-change: transform;
  backface-visibility: hidden;
  animation: glowPulse 4s ease-in-out infinite;
  
  @media (max-width: 768px) {
    perspective: none;
    transform-style: flat;
    animation: none;
    transition: all 0.3s ease;
  }
  
  @media (max-width: 480px) {
    border-radius: 15px;
    margin: 0 auto;
    max-width: 100%;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, 
      rgba(8, 247, 254, 0.3), 
      rgba(113, 34, 250, 0.3), 
      rgba(255, 46, 99, 0.3),
      rgba(8, 247, 254, 0.3)
    );
    border-radius: 20px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
    background-size: 400% 400%;
    animation: gradientShift 8s ease infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      transparent 50%, 
      rgba(8, 247, 254, 0.1) 100%
    );
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-25px) rotateX(8deg) rotateY(8deg) scale(1.03);
    box-shadow: 
      0 50px 100px rgba(0, 0, 0, 0.5),
      0 25px 60px rgba(8, 247, 254, 0.4),
      0 0 80px rgba(8, 247, 254, 0.3);
    border-color: var(--neon-blue);
    z-index: 50;
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      opacity: 1;
    }
    
    .project-image {
      transform: scale(1.4);
      z-index: 10;
      box-shadow: 0 15px 40px rgba(8, 247, 254, 0.3);
    }
    
    .project-content {
      transform: translateZ(60px) translateY(-10px) rotateX(5deg);
    }
    
    .tags span {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 5px 15px rgba(255, 46, 99, 0.3);
    }
    
    .project-links a {
      transform: translateY(-2px) scale(1.05);
    }
    
    @media (max-width: 768px) {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.3),
        0 10px 20px rgba(8, 247, 254, 0.3);
      
      .project-image {
        transform: scale(1.05);
        box-shadow: 0 8px 20px rgba(8, 247, 254, 0.2);
      }
      
      .project-content {
        transform: translateY(-5px);
      }
      
      .tags span {
        transform: scale(1.02);
        box-shadow: 0 2px 8px rgba(255, 46, 99, 0.2);
      }
      
      .project-links a {
        transform: translateY(-1px) scale(1.02);
      }
    }
    
    @media (max-width: 480px) {
      transform: translateY(-5px) scale(1.01);
      box-shadow: 
        0 10px 20px rgba(0, 0, 0, 0.2),
        0 5px 10px rgba(8, 247, 254, 0.2);
      
      .project-image {
        transform: scale(1.02);
        box-shadow: 0 4px 12px rgba(8, 247, 254, 0.15);
      }
      
      .project-content {
        transform: none;
      }
      
      .tags span, .project-links a {
        transform: none;
        box-shadow: none;
      }
    }
  }
  
  /* Mobile touch states */
  @media (max-width: 768px) {
    &:active {
      transform: translateY(-5px) scale(1.01);
      transition: all 0.1s ease;
      
      .project-image {
        transform: scale(1.02);
      }
    }
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes imageFloat {
    0%, 100% { 
      transform: translateY(0px) rotateZ(0deg); 
    }
    50% { 
      transform: translateY(-3px) rotateZ(0.5deg); 
    }
  }

  @keyframes imageBreakout {
    0% { 
      transform: translateY(0px) rotateZ(0deg) scale(1);
      box-shadow: 0 0 0 rgba(8, 247, 254, 0);
    }
    50% { 
      transform: translateY(-15px) rotateZ(2deg) scale(1.1);
      box-shadow: 0 30px 60px rgba(8, 247, 254, 0.3);
    }
    100% { 
      transform: translateY(0px) rotateZ(0deg) scale(1);
      box-shadow: 0 0 0 rgba(8, 247, 254, 0);
    }
  }

  @keyframes glowPulse {
    0%, 100% { 
      box-shadow: 0 0 20px rgba(8, 247, 254, 0.2);
    }
    50% { 
      box-shadow: 0 0 30px rgba(8, 247, 254, 0.4);
    }
  }

  @keyframes screenBreak {
    0%, 100% { 
      opacity: 0.8;
      transform: scale(1);
    }
    50% { 
      opacity: 1;
      transform: scale(1.1);
    }
  }

  .project-image {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
    transition: transform 0.6s ease;
    z-index: 2;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.05);
    transform-style: preserve-3d;
    backface-visibility: hidden;
    
    @media (max-width: 768px) {
      height: 180px;
      transform-style: flat;
      transition: transform 0.3s ease;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
    }
    
    @media (max-width: 480px) {
      height: 160px;
      border-radius: 12px;
      transition: transform 0.2s ease;
      background: rgba(255, 255, 255, 0.05);
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 15px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      transition: transform 0.6s ease;
      filter: brightness(1) contrast(1) saturate(1);
      transform-style: preserve-3d;
      backface-visibility: hidden;
      will-change: transform, filter;
      
      @media (max-width: 768px) {
        transition: transform 0.3s ease;
        transform-style: flat;
        will-change: auto;
        filter: brightness(0.95) contrast(1.05);
      }
      
      @media (max-width: 480px) {
        border-radius: 12px;
        transition: transform 0.2s ease;
        filter: brightness(0.9) contrast(1.1);
      }
    }
  }

  .project-content {
    padding: 2rem;
    transition: transform 0.4s ease;
    position: relative;
    z-index: 5;
    
    @media (max-width: 768px) {
      padding: 1.5rem;
      transition: transform 0.2s ease;
    }
    
    @media (max-width: 480px) {
      padding: 1rem;
    }

    h3 {
      font-size: 1.6rem;
      margin-bottom: 1rem;
      color: var(--neon-green);
      font-family: 'Orbitron', sans-serif;
      text-shadow: 0 0 10px rgba(46, 255, 163, 0.3);
      transition: all 0.3s ease;
      
      @media (max-width: 768px) {
        font-size: 1.4rem;
        margin-bottom: 0.8rem;
      }
      
      @media (max-width: 480px) {
        font-size: 1.2rem;
        margin-bottom: 0.6rem;
        text-shadow: 0 0 5px rgba(46, 255, 163, 0.2);
      }
      
      &:hover {
        transform: translateX(5px);
        text-shadow: 0 0 15px rgba(46, 255, 163, 0.5);
        
        @media (max-width: 768px) {
          transform: translateX(2px);
          text-shadow: 0 0 8px rgba(46, 255, 163, 0.3);
        }
        
        @media (max-width: 480px) {
          transform: none;
        }
      }
    }

    p {
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 1.5rem;
      line-height: 1.7;
      font-family: 'Poppins', sans-serif;
      transition: color 0.3s ease;
      
      @media (max-width: 768px) {
        margin-bottom: 1.2rem;
        line-height: 1.6;
        font-size: 0.95rem;
      }
      
      @media (max-width: 480px) {
        margin-bottom: 1rem;
        line-height: 1.5;
        font-size: 0.9rem;
      }
    }

    .tags {
      display: flex;
      gap: 0.8rem;
      flex-wrap: wrap;
      margin-bottom: 2rem;
      
      @media (max-width: 768px) {
        gap: 0.6rem;
        margin-bottom: 1.5rem;
      }
      
      @media (max-width: 480px) {
        gap: 0.5rem;
        margin-bottom: 1rem;
      }

      span {
        padding: 0.5rem 1rem;
        background: rgba(255, 46, 99, 0.15);
        border: 1px solid rgba(255, 46, 99, 0.4);
        border-radius: 25px;
        font-size: 0.85rem;
        color: var(--neon-pink);
        font-family: 'Orbitron', sans-serif;
        font-weight: 500;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        position: relative;
        overflow: hidden;
        
        @media (max-width: 768px) {
          padding: 0.4rem 0.8rem;
          font-size: 0.8rem;
          transition: all 0.2s ease;
        }
        
        @media (max-width: 480px) {
          padding: 0.3rem 0.6rem;
          font-size: 0.75rem;
          border-radius: 20px;
        }
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 46, 99, 0.3), transparent);
          transition: left 0.5s ease;
          
          @media (max-width: 768px) {
            transition: left 0.3s ease;
          }
        }
        
        &:hover::before {
          left: 100%;
          
          @media (max-width: 480px) {
            left: 0;
          }
        }
        
        &:nth-child(even) {
          border-color: rgba(8, 247, 254, 0.4);
          background: rgba(8, 247, 254, 0.15);
          color: var(--neon-blue);
          
          &::before {
            background: linear-gradient(90deg, transparent, rgba(8, 247, 254, 0.3), transparent);
          }
        }
      }
    }

    .project-links {
      display: flex;
      gap: 1.2rem;
      
      @media (max-width: 768px) {
        gap: 1rem;
        flex-direction: column;
      }
      
      @media (max-width: 480px) {
        gap: 0.8rem;
      }

      a {
        padding: 0.8rem 1.5rem;
        border: 2px solid var(--neon-blue);
        border-radius: 8px;
        color: var(--neon-blue);
        text-decoration: none;
        font-family: 'Orbitron', sans-serif;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        position: relative;
        overflow: hidden;
        text-align: center;
        
        @media (max-width: 768px) {
          padding: 0.7rem 1.2rem;
          font-size: 0.9rem;
          transition: all 0.2s ease;
          width: 100%;
        }
        
        @media (max-width: 480px) {
          padding: 0.6rem 1rem;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
        }
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--neon-blue);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s ease;
          z-index: -1;
          
          @media (max-width: 768px) {
            transition: transform 0.2s ease;
          }
        }

        &:hover {
          color: var(--dark-bg);
          box-shadow: 0 8px 25px rgba(8, 247, 254, 0.4);
          
          @media (max-width: 768px) {
            box-shadow: 0 4px 15px rgba(8, 247, 254, 0.3);
          }
          
          @media (max-width: 480px) {
            box-shadow: 0 2px 10px rgba(8, 247, 254, 0.2);
          }
          
          &::before {
            transform: scaleX(1);
            transform-origin: left;
          }
        }
        
        &:nth-child(2) {
          border-color: var(--neon-purple);
          color: #ffffff;
          
          &::before {
            background: var(--neon-purple);
          }
          
          &:hover {
            box-shadow: 0 8px 25px rgba(113, 34, 250, 0.4);
            color: var(--dark-bg);
            
            @media (max-width: 768px) {
              box-shadow: 0 4px 15px rgba(113, 34, 250, 0.3);
            }
            
            @media (max-width: 480px) {
              box-shadow: 0 2px 10px rgba(113, 34, 250, 0.2);
            }
          }
        }
      }
    }
  }
`;

// Memoized projects data - moved outside component to prevent re-creation
const projectsData = [
  {
    title: 'Cocktails Website',
    description: 'Interactive website about cocktails with animations and framer motion using Gsap and react.',
    tags: ['React', 'GSAP', 'WebGL', 'Node.js', 'Personal-Project'],
    bgColor: '#ff2e63',
    image: '/assets/Project-1.png',
    links: {
      live: 'https://cocktailwebsite.vercel.app/',
      code: 'https://github.com/vishwafernando/cocktailweb'
    }
  },
  {
    title: 'Portfolio Website',
    description: 'Portfolio website built with React, Styled Components,Spline and GSAP. Designed with a futuristic cyberpunk aesthetic.',
    tags: ['React', 'Vite', 'Spline', 'GSAP', 'Personal-Project'],
    bgColor: '#08f7fe',
    image: '/assets/Project-2.png',
    links: {
      live: 'https://www.vishwafernando.me/',
      code: 'https://github.com/vishwafernando/portfolio'
    }
  },
  {
    title: 'Banking App',
    description: 'Simple web application that allows users to perform basic banking operations such as depositing money, withdrawing money, checking balance, and viewing transaction history.',
    tags: ['Java', 'JavaScript', 'React', 'Css', 'Personal-Project'],
    bgColor: '#7122fa',
    image: '/assets/Project-3.png',
    links: {
      live: 'https://bankingwebapp-three.vercel.app/',
      code: 'https://github.com/vishwafernando/bankingwebapp'
    }
  }
];

const Projects = () => {
  const sectionRef = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const timelineRef = useRef(null);

  // Enhanced animation function with advanced effects
  const animateProjects = useCallback(() => {
    if (isAnimated || !sectionRef.current) return;
    
    setIsAnimated(true);
    
    const section = sectionRef.current;
    const title = section.querySelector('h2');
    const cards = section.querySelectorAll('.project-card');
    
    // Kill existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    
    // Create master timeline with advanced defaults
    const masterTL = gsap.timeline({
      defaults: { ease: 'power2.out' }
    });
    timelineRef.current = masterTL;
    
    // Set initial states for all elements
    gsap.set(title, { opacity: 0, y: -50, scale: 0.8, rotationX: 45 });
    gsap.set(cards, { 
      opacity: 0, 
      y: 100, 
      rotationY: 25, 
      scale: 0.8,
      transformOrigin: 'center bottom'
    });
    
    // Enhanced animation sequence
    masterTL
      // Title entrance with 3D rotation and scale
      .to(title, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        ease: 'back.out(1.4)',
        onComplete: () => {
          title.classList.add('animated');
        }
      })
      // Cards with staggered 3D entrance
      .to(cards, {
        opacity: 1,
        y: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: 'start',
          ease: 'power2.out'
        },
        ease: 'back.out(1.2)'
      }, '-=0.6');

    return masterTL;
  }, [isAnimated]);

  // Add magnetic hover effects to cards
  const addMagneticEffects = useCallback(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.project-card');
    const eventListeners = [];
    
    cards.forEach(card => {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(card, {
          rotationY: x * 0.05,
          rotationX: -y * 0.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: 'back.out(1.7)'
        });
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      
      // Store listeners for cleanup
      eventListeners.push({
        element: card,
        type: 'mousemove',
        handler: handleMouseMove
      }, {
        element: card,
        type: 'mouseleave',
        handler: handleMouseLeave
      });
    });
    
    // Return cleanup function
    return () => {
      eventListeners.forEach(({ element, type, handler }) => {
        element.removeEventListener(type, handler);
      });
    };
  }, []);

  // Add parallax effects to images
  const addParallaxEffects = useCallback(() => {
    if (!sectionRef.current) return;

    const images = sectionRef.current.querySelectorAll('.project-image img');
    const eventListeners = [];
    
    images.forEach(img => {
      const card = img.closest('.project-card');
      
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.02;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.02;
        
        gsap.to(img, {
          x: x,
          y: y,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(img, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'back.out(1.7)'
        });
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      
      // Store listeners for cleanup
      eventListeners.push({
        element: card,
        type: 'mousemove',
        handler: handleMouseMove
      }, {
        element: card,
        type: 'mouseleave',
        handler: handleMouseLeave
      });
    });
    
    // Return cleanup function
    return () => {
      eventListeners.forEach(({ element, type, handler }) => {
        element.removeEventListener(type, handler);
      });
    };
  }, []);

  // Unified effect for all triggers - optimized and performant
  useEffect(() => {
    if (isAnimated || !sectionRef.current) return;

    const section = sectionRef.current;
    let scrollTrigger = null;
    let magneticCleanup = null;
    let parallaxCleanup = null;

    // Check for direct navigation first
    const checkDirectNavigation = () => {
      if (window.location.hash === '#projects') {
        setTimeout(() => {
          animateProjects();
          // Set up interactive effects after animation
          magneticCleanup = addMagneticEffects();
          parallaxCleanup = addParallaxEffects();
        }, 300);
        return true;
      }
      return false;
    };

    // Setup scroll trigger if not direct navigation
    if (!checkDirectNavigation()) {
      const ctx = gsap.context(() => {
        scrollTrigger = ScrollTrigger.create({
          trigger: section,
          start: 'top center+=100',
          once: true,
          onEnter: () => {
            animateProjects();
            // Set up interactive effects after animation
            magneticCleanup = addMagneticEffects();
            parallaxCleanup = addParallaxEffects();
          },
          invalidateOnRefresh: true,
          refreshPriority: 1
        });
      });

      scrollTrigger.context = ctx;
    }

    // Event handlers
    const handleHashChange = () => {
      if (window.location.hash === '#projects' && !isAnimated) {
        setTimeout(() => {
          animateProjects();
          // Set up interactive effects after animation
          magneticCleanup = addMagneticEffects();
          parallaxCleanup = addParallaxEffects();
        }, 200);
      }
    };

    const handleCustomNavigation = () => {
      if (!isAnimated) {
        setTimeout(() => {
          animateProjects();
          // Set up interactive effects after animation
          magneticCleanup = addMagneticEffects();
          parallaxCleanup = addParallaxEffects();
        }, 150);
      }
    };

    // Add event listeners
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('navigateToProjects', handleCustomNavigation);

    // Cleanup function
    return () => {
      if (scrollTrigger) {
        scrollTrigger.kill();
        if (scrollTrigger.context) {
          scrollTrigger.context.revert();
        }
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (magneticCleanup) {
        magneticCleanup();
      }
      if (parallaxCleanup) {
        parallaxCleanup();
      }
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('navigateToProjects', handleCustomNavigation);
    };
  }, [isAnimated, animateProjects, addMagneticEffects, addParallaxEffects]);

  // Memoize projects rendering to prevent unnecessary re-renders
  const memoizedProjects = useMemo(() => 
    projectsData.map((project, index) => (
      <ProjectCard
        key={`${project.title}-${index}`} // More stable key
        className="project-card"
        bgColor={project.bgColor}
        whileHover={{ y: -10 }}
      >
        <div className="project-image">
          {project.image && (
            <img 
              src={project.image} 
              alt={project.title}
              loading="lazy" // Add lazy loading for performance
            />
          )}
        </div>
        <div className="project-content">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="tags">
            {project.tags.map((tag, i) => (
              <span key={`${tag}-${i}`}>{tag}</span>
            ))}
          </div>
          <div className="project-links">
            <a href={project.links.live} target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
            <a href={project.links.code} target="_blank" rel="noopener noreferrer">
              View Code
            </a>
          </div>
        </div>
      </ProjectCard>
    )), 
    [] // Empty dependency array since projectsData is static
  );

  return (
    <StyledProjects ref={sectionRef} id="projects">
      <h2>Featured Projects</h2>
      <div className="projects-grid">
        {memoizedProjects}
      </div>
    </StyledProjects>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Projects);
