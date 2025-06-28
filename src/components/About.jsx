import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Skills data with icons
const skills = [
  { 
    name: 'HTML', 
    color: '#e44d26',
    icon: (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" 
        alt="HTML5" 
        width="48" 
        height="48"
      />
    )
  },
  { 
    name: 'CSS', 
    color: '#1572b6',
    icon: (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" 
        alt="CSS3" 
        width="48" 
        height="48"
      />
    )
  },
  { 
    name: 'React', 
    color: '#61dafb',
    icon: (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" 
        alt="React" 
        width="48" 
        height="48"
      />
    )
  },
  { 
    name: 'Node.js', 
    color: '#339933',
    icon: (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" 
        alt="Node.js" 
        width="48" 
        height="48"
      />
    )
  },
  { 
    name: 'JavaScript', 
    color: '#f0db4f',
    icon: (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" 
        alt="JavaScript" 
        width="48" 
        height="48"
      />
    )
  },
  { 
    name: 'Java', 
    color: '#ea2d2e',
    icon: (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" 
        alt="Java" 
        width="48" 
        height="48"
      />
    )
  },
  { 
    name: 'MySQL', 
    color: '#00618a',
    icon: (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" 
        alt="MySQL" 
        width="48" 
        height="48"
      />
    )
  },
  { 
    name: 'Git', 
    color: '#f34f29',
    icon: (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" 
        alt="Git" 
        width="48" 
        height="48"
      />
    )
  },
  { 
    name: 'GitHub', 
    color: '#eff6ff',
    icon: (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" 
        alt="GitHub" 
        width="48" 
        height="48"
      />
    )
  },
  { 
    name: 'VS Code', 
    color: '#007acc',
    icon: (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" 
        alt="VS Code" 
        width="48" 
        height="48"
      />
    )
  },
  { 
    name: 'Photoshop', 
    color: '#31a8ff',
    icon: (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg" 
        alt="Photoshop" 
        width="48" 
        height="48"
      />
    )
  },
  { 
    name: 'Python', 
    color: '#3776ab',
    icon: (
      <img 
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" 
        alt="Python" 
        width="48" 
        height="48"
      />
    )
  }
];

// Styled components
const StyledAbout = styled.section`
  min-height: 100vh;
  width: 100%;
  padding: clamp(4rem, 12vh, 120px) 0 clamp(3rem, 8vh, 80px);
  position: relative;
  background: var(--darker-bg);
  overflow: hidden;
  
  @media (max-width: 1024px) {
    padding: clamp(3rem, 10vh, 100px) 0 clamp(2.5rem, 6vh, 60px);
  }
  
  @media (max-width: 768px) {
    min-height: auto;
    padding: 5rem 0 3rem;
  }
  
  @media (max-width: 480px) {
    padding: 4rem 0 2.5rem;
  }
  
  /* Diagonal line dividers */
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 200%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(8, 247, 254, 0.3), transparent);
    z-index: 1;
    
    @media (max-width: 768px) {
      display: none;
    }
  }
  
  &::before {
    top: 0;
    left: -50%;
    transform: rotate(-1deg);
  }
  
  &::after {
    bottom: 0;
    right: -50%;
    transform: rotate(1deg);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 0 clamp(1rem, 5vw, 2rem);
    position: relative;
    z-index: 5;
  }
  
  .section-title {
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: 700;
    margin-bottom: clamp(1.5rem, 4vw, 2rem);
    color: var(--text-primary);
    font-family: 'Orbitron', sans-serif;
    text-transform: uppercase;
    position: relative;
    display: inline-block;
    
    /* Underline effect */
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
      border-radius: 3px;
    }
    
    @media (min-width: 769px) and (max-width: 1000px) {
      margin-bottom: clamp(2rem, 5vw, 2.5rem);
      font-size: clamp(1.8rem, 4vw, 2.2rem);
    }
    
    @media (max-width: 768px) {
      text-align: center;
      margin-bottom: clamp(1.2rem, 3vw, 1.5rem);
      
      &::after {
        height: 2px;
        bottom: -8px;
      }
    }
    
    @media (max-width: 480px) {
      &::after {
        height: 2px;
        bottom: -6px;
      }
    }
  }
    
  .section-subtitle {
    font-size: clamp(1.2rem, 3.5vw, 1.8rem);
    color: var(--neon-blue);
    margin-bottom: clamp(2rem, 5vw, 3rem);
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    letter-spacing: clamp(0.5px, 1vw, 1px);
    
    @media (max-width: 768px) {
      text-align: center;
    }
  }
  
  .p-subtitle {
    font-size: clamp(1.2rem, 3.5vw, 1.8rem);
    color: var(--neon-white);
    margin-bottom: clamp(2.5rem, 6vw, 3.5rem);
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    letter-spacing: clamp(0.5px, 1vw, 1px);
    line-height: 1.4;
    
    @media (min-width: 769px) and (max-width: 1000px) {
      margin-bottom: clamp(3rem, 7vw, 4rem);
      font-size: clamp(1.1rem, 3vw, 1.6rem);
      line-height: 1.5;
    }
    
    @media (max-width: 768px) {
      text-align: center;
      line-height: 1.3;
      margin-bottom: clamp(2rem, 5vw, 3rem);
    }
    
    img {
      @media (max-width: 768px) {
        width: 40px;
        height: auto;
      }
      
      @media (max-width: 480px) {
        width: 35px;
        height: auto;
      }
    }
  }
  
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(2rem, 6vw, 4rem);
    align-items: start;
    
    @media (min-width: 1001px) {
      gap: clamp(3rem, 6vw, 4rem);
    }
    
    @media (min-width: 769px) and (max-width: 1000px) {
      gap: clamp(2.5rem, 5vw, 3.5rem);
      grid-template-columns: 1fr 1fr;
      align-items: flex-start;
    }
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: clamp(2rem, 4vw, 3rem);
    }
    
    @media (max-width: 480px) {
      gap: 2rem;
    }
  }
  
  .about-content {
    color: var(--text-primary);
    
    @media (max-width: 768px) {
      text-align: center;
      max-width: 600px;
      margin: 0 auto;
    }
    
    p {
      font-size: clamp(0.95rem, 2.5vw, 1.1rem);
      line-height: 1.8;
      margin-bottom: clamp(1rem, 3vw, 1.5rem);
      color: rgba(255, 255, 255, 0.85);
      font-family: 'Poppins', sans-serif;
      
      @media (max-width: 768px) {
        line-height: 1.7;
      }
      
      @media (max-width: 480px) {
        line-height: 1.6;
        text-align: left;
      }
    }
    
    .highlight {
      color: var(--neon-blue);
      font-weight: 600;
    }
    
    a {
      color: var(--neon-blue);
      text-decoration: none;
      border-bottom: 1px dotted var(--neon-blue);
      transition: all 0.3s ease;
      
      &:hover {
        color: var(--neon-purple);
        border-bottom-color: var(--neon-purple);
        text-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
      }
    }
    
    img {
      @media (max-width: 768px) {
        width: 18px;
        height: auto;
      }
      
      @media (max-width: 480px) {
        width: 16px;
        height: auto;
      }
    }
  }
  
  .skills-section {
    margin-top: -8rem;
    
    @media (min-width: 993px) {
      margin-top: -14rem;
    }
    
    @media (min-width: 769px) and (max-width: 992px) {
      margin-top: -2rem;
    }
    
    @media (max-width: 768px) {
      margin-top: 2rem;
    }
    
    @media (max-width: 480px) {
      margin-top: 1.5rem;
    }
    
    .skills-title {
      font-size: clamp(1.5rem, 4vw, 2.2rem);
      color: var(--text-primary);
      margin-bottom: clamp(1.5rem, 4vw, 2rem);
      font-family: 'Orbitron', sans-serif;
      font-weight: 700;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: clamp(1px, 2vw, 3px);
      position: relative;
      text-shadow: 0 0 20px rgba(8, 247, 254, 0.3);
      
      @media (min-width: 769px) and (max-width: 1000px) {
        font-size: clamp(1.4rem, 3.5vw, 2rem);
        margin-bottom: clamp(2rem, 5vw, 2.5rem);
        letter-spacing: clamp(1px, 1.8vw, 2.5px);
      }
      
      @media (max-width: 768px) {
        letter-spacing: clamp(1px, 1.5vw, 2px);
        margin-bottom: clamp(1rem, 3vw, 1.5rem);
      }
      
      @media (max-width: 480px) {
        letter-spacing: 1px;
      }
      
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 120%;
        height: 120%;
        background: radial-gradient(
          ellipse,
          rgba(8, 247, 254, 0.1) 0%,
          transparent 70%
        );
        z-index: -1;
      }
      
      &::after {
        content: '';
        position: absolute;
        bottom: -12px;
        left: 50%;
        transform: translateX(-50%);
        width: clamp(60px, 15vw, 80px);
        height: 3px;
        background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple), var(--neon-blue));
        border-radius: 3px;
        box-shadow: 0 0 15px rgba(8, 247, 254, 0.6);
        
        @media (max-width: 768px) {
          height: 2px;
          bottom: -10px;
        }
        
        @media (max-width: 480px) {
          height: 2px;
          bottom: -8px;
        }
      }
    }
  }
  
  .skills-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: clamp(1rem, 3vw, 2rem);
    margin-top: 2rem;
    
    @media (max-width: 1200px) {
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: clamp(1rem, 2.5vw, 1.5rem);
    }
    
    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: clamp(1rem, 2vw, 1.5rem);
    }
    
    @media (max-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    
    @media (max-width: 360px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.8rem;
    }
  }
  
  .skill-box {
    background: linear-gradient(135deg, rgba(12, 12, 15, 0.95), rgba(20, 20, 25, 0.8));
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: clamp(15px, 3vw, 20px);
    padding: clamp(1.2rem, 3vw, 2rem) clamp(1rem, 2.5vw, 1.5rem);
    text-align: center;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(25px);
    height: clamp(110px, 20vw, 140px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    
    @media (max-width: 768px) {
      height: clamp(100px, 18vw, 120px);
    }
    
    @media (max-width: 480px) {
      height: clamp(90px, 16vw, 110px);
      padding: clamp(1rem, 2.5vw, 1.5rem) clamp(0.8rem, 2vw, 1rem);
    }
    
    @media (max-width: 360px) {
      height: clamp(85px, 15vw, 100px);
      padding: clamp(0.8rem, 2vw, 1.2rem) clamp(0.6rem, 1.5vw, 0.8rem);
    }
    
    /* Animated gradient border */
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      padding: 2px;
      background: linear-gradient(
        45deg,
        transparent,
        ${props => props.color || '#08f7fe'}30,
        transparent,
        ${props => props.color || '#08f7fe'}30,
        transparent
      );
      border-radius: clamp(15px, 3vw, 20px);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: xor;
      -webkit-mask-composite: xor;
      animation: borderRotate 4s linear infinite;
      opacity: 0;
      transition: opacity 0.4s ease;
    }
    
    /* Glowing background effect */
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: radial-gradient(
        circle,
        ${props => props.color || '#08f7fe'}15,
        transparent 70%
      );
      transform: translate(-50%, -50%);
      transition: all 0.5s ease;
      border-radius: 50%;
      z-index: -1;
    }
    
    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.5),
        0 0 30px ${props => props.color || '#08f7fe'}25,
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      background: linear-gradient(135deg, rgba(15, 15, 20, 0.98), rgba(25, 25, 35, 0.9));
      border-color: ${props => props.color || '#08f7fe'}60;
      
      @media (max-width: 768px) {
        transform: translateY(-6px) scale(1.015);
      }
      
      @media (max-width: 480px) {
        transform: translateY(-4px) scale(1.01);
      }
      
      &::before {
        opacity: 1;
      }
      
      &::after {
        width: clamp(100px, 20vw, 140px);
        height: clamp(100px, 20vw, 140px);
      }
      
      .skill-icon {
        opacity: 0.25;
        transform: scale(0.75) translateY(-6px);
        filter: blur(0.5px);
        
        @media (max-width: 768px) {
          transform: scale(0.8) translateY(-4px);
        }
        
        @media (max-width: 480px) {
          transform: scale(0.85) translateY(-3px);
        }
      }
      
      .skill-name {
        opacity: 1;
        transform: translateY(0);
      }
      
      .skill-progress {
        opacity: 1;
        transform: scaleX(1);
      }
    }
    
    .skill-icon {
      transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      opacity: 1;
      transform: scale(1);
      filter: drop-shadow(0 0 15px ${props => props.color || '#08f7fe'}40);
      z-index: 2;
      
      img {
        width: clamp(38px, 8vw, 52px);
        height: clamp(38px, 8vw, 52px);
        object-fit: contain;
        filter: brightness(1.2) contrast(1.3) saturate(1.1);
        
        @media (max-width: 768px) {
          width: clamp(35px, 7vw, 45px);
          height: clamp(35px, 7vw, 45px);
        }
        
        @media (max-width: 480px) {
          width: clamp(32px, 6vw, 40px);
          height: clamp(32px, 6vw, 40px);
        }
        
        @media (max-width: 360px) {
          width: clamp(28px, 5vw, 35px);
          height: clamp(28px, 5vw, 35px);
        }
      }
    }
    
    .skill-name {
      font-family: 'Poppins', sans-serif;
      font-size: clamp(0.7rem, 1.8vw, 0.95rem);
      color: var(--text-primary);
      margin: 0;
      font-weight: 600;
      position: absolute;
      opacity: 0;
      transform: translateY(clamp(15px, 3vw, 20px));
      transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      text-shadow: 
        0 0 20px ${props => props.color || '#08f7fe'}60,
        0 2px 4px rgba(0, 0, 0, 0.3);
      letter-spacing: clamp(0.2px, 0.5vw, 0.5px);
      z-index: 2;
      text-transform: uppercase;
      white-space: nowrap;
      max-width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      
      @media (max-width: 768px) {
        transform: translateY(clamp(12px, 2.5vw, 15px));
      }
      
      @media (max-width: 480px) {
        transform: translateY(clamp(10px, 2vw, 12px));
        letter-spacing: 0.2px;
      }
    }
    
    .skill-progress {
      position: absolute;
      bottom: clamp(8px, 2vw, 12px);
      left: 50%;
      transform: translateX(-50%) scaleX(0);
      width: clamp(50px, 12vw, 70px);
      height: clamp(3px, 0.8vw, 4px);
      background: linear-gradient(
        90deg,
        ${props => props.color || '#08f7fe'},
        ${props => props.color || '#08f7fe'}60,
        ${props => props.color || '#08f7fe'}
      );
      border-radius: 3px;
      opacity: 0;
      transition: all 0.5s ease 0.1s;
      box-shadow: 
        0 0 15px ${props => props.color || '#08f7fe'}50,
        0 2px 4px rgba(0, 0, 0, 0.3);
      
      @media (max-width: 768px) {
        bottom: clamp(6px, 1.5vw, 10px);
      }
      
      @media (max-width: 480px) {
        bottom: clamp(5px, 1vw, 8px);
        height: clamp(2px, 0.6vw, 3px);
      }
    }
  }
  
  @keyframes borderRotate {
    0% {
      background: linear-gradient(
        0deg,
        transparent,
        currentColor,
        transparent
      );
    }
    25% {
      background: linear-gradient(
        90deg,
        transparent,
        currentColor,
        transparent
      );
    }
    50% {
      background: linear-gradient(
        180deg,
        transparent,
        currentColor,
        transparent
      );
    }
    75% {
      background: linear-gradient(
        270deg,
        transparent,
        currentColor,
        transparent
      );
    }
    100% {
      background: linear-gradient(
        360deg,
        transparent,
        currentColor,
        transparent
      );
    }
  }

  @media (max-width: 1024px) {
    padding: clamp(3rem, 8vh, 80px) 0 clamp(2rem, 6vh, 50px);
  }
  
  @media (max-width: 768px) {
    padding: 5rem 0 3rem;
    min-height: auto;
  }
  
  @media (max-width: 480px) {
    padding: 4rem 0 2.5rem;
  }
`;

const About = () => {
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const [animationsTriggered, setAnimationsTriggered] = useState(false);
  const animationTimelineRef = useRef(null);
  
  // Function to trigger animations
  const triggerAnimations = () => {
    if (animationsTriggered || !aboutRef.current) return;
    
    setAnimationsTriggered(true);

    if (animationTimelineRef.current) {
      animationTimelineRef.current.kill();
    }

    const tl = gsap.timeline();
    animationTimelineRef.current = tl;
    
    const aboutSection = aboutRef.current;
    const title = aboutSection.querySelector('.section-title');
    const subtitle = aboutSection.querySelector('.section-subtitle');
    const paragraphs = aboutSection.querySelectorAll('.about-content p');
    const skillBoxes = aboutSection.querySelectorAll('.skill-box');
    
    // Only animate elements that exist
    if (title && subtitle && paragraphs.length > 0 && skillBoxes.length > 0) {
      // Set initial states
      gsap.set(title, { opacity: 0, y: 50 });
      gsap.set(subtitle, { opacity: 0, y: 30 });
      gsap.set(paragraphs, { opacity: 0, y: 30 });
      gsap.set(skillBoxes, { opacity: 0, y: 30 });
      
      // Animate elements in sequence
      tl.to(title, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8')
      .to(paragraphs, {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.6')
      .to(skillBoxes, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }, '-=0.4');
    }
  };

  useEffect(() => {
    const checkDirectNavigation = () => {
      const hash = window.location.hash;
      if (hash === '#about') {
        setTimeout(() => {
          triggerAnimations();
        }, 300);
      }
    };
    
    // Check on mount
    checkDirectNavigation();
    
    // Listen for hash changes
    window.addEventListener('hashchange', checkDirectNavigation);
    
    return () => {
      window.removeEventListener('hashchange', checkDirectNavigation);
    };
  }, []);
  
  // Listen for custom navigation events
  useEffect(() => {
    const handleNavigationToAbout = () => {
      setTimeout(() => {
        triggerAnimations();
      }, 400);
    };
    
    window.addEventListener('navigateToAbout', handleNavigationToAbout);
    
    return () => {
      window.removeEventListener('navigateToAbout', handleNavigationToAbout);
    };
  }, []);

  useEffect(() => {
    const aboutSection = aboutRef.current;
    
    if (aboutSection && !animationsTriggered) {
      const scrollTriggerAnimation = ScrollTrigger.create({
        trigger: aboutSection,
        start: 'top 80%',
        onEnter: () => {
          if (!animationsTriggered) {
            triggerAnimations();
          }
        },
        once: true
      });
      
      return () => {
        if (scrollTriggerAnimation) {
          scrollTriggerAnimation.kill();
        }
      };
    }
  }, [animationsTriggered]);

  // Ensure content is visible by default
  useEffect(() => {
    if (aboutRef.current && !animationsTriggered) {
      // Make sure content is visible by default
      const aboutSection = aboutRef.current;
      const title = aboutSection.querySelector('.section-title');
      const subtitle = aboutSection.querySelector('.section-subtitle');
      const paragraphs = aboutSection.querySelectorAll('.about-content p');
      const skillBoxes = aboutSection.querySelectorAll('.skill-box');
      
      if (title && subtitle && paragraphs.length > 0 && skillBoxes.length > 0) {
        gsap.set(title, { opacity: 1, y: 0 });
        gsap.set(subtitle, { opacity: 1, y: 0 });
        gsap.set(paragraphs, { opacity: 1, y: 0 });
        gsap.set(skillBoxes, { opacity: 1, y: 0 });
      }
    }
  }, [animationsTriggered]);
  
  
  return (
    <StyledAbout id="about" ref={aboutRef}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="p-subtitle">
          Hello! I'm <span className="section-subtitle">Vishwa</span> a<br/>
          <span className="section-subtitle">Developer & Designer</span>
          <img src="https://media.giphy.com/media/WUlplcMpOCEmTGBtBW/giphy.gif" width="50" alt="Wave emoji"/>
        </p>

        <div className="grid">
          <div className="about-content">
            <p>
              I am an undergraduate student currently pursuing a Higher National Diploma in Software Engineering at
              Saegis Campus in Sri Lanka
              <img src="https://flagpedia.net/data/flags/emoji/google/160x160/lk.png" width="20" alt="Sri Lanka flag"/>
              &nbsp; passionate about Frontend Development and UI Design.
            </p>
            <p>
              My journey started with a curiosity about how things work on the web.
              Since then, I've been continuously learning and growing, embracing new technologies and
              best practices. Check my <a href="https://github.com/vishwafernando/vishwafernando" target="_blank" rel="noopener noreferrer">work here</a>.
            </p>
            <p>
              I'm also learning back-end to build full-stack apps.
            </p>
            <p>
              Outside coding, I enjoy staying active, following design trends, and watching TV shows.
            </p>
          </div>
          
          <div className="skills-section" ref={skillsRef}>
            <h3 className="skills-title">Technologies & Tools</h3>
            <div className="skills-container">
              {skills.map((skill, index) => (
                <div 
                  className="skill-box" 
                  key={index}
                  style={{ '--skill-color': skill.color }}
                >
                  <div className="skill-icon" style={{ color: skill.color }}>
                    {skill.icon}
                  </div>
                  <h3 className="skill-name" style={{ color: skill.color }}>
                    {skill.name}
                  </h3>
                  <div className="skill-progress" style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)` }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StyledAbout>
  );
};

export default About;
