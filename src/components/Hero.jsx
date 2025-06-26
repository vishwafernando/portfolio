import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import SplitType from 'split-type';

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
    padding: 0 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    height: 100%;
    gap: 2rem;
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
  }

  .hero-sphere {
    position: relative;
    width: 400px;
    height: 400px;
    
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
  
  .title-container {
    margin-bottom: 2rem;
  }
  
  .glitch-title {
    font-size: 4.8rem;
    font-weight: 800;
    line-height: 1;
    margin: 0 0 1rem 0;
    color: #fff;
    text-transform: uppercase;
    font-family: 'Orbitron', sans-serif;
    letter-spacing: -2px;
    position: relative;
    display: inline-block;
    text-shadow: 0 0 20px rgba(8, 247, 254, 0.4);
  }
  
  .char {
    display: inline-block;
    position: relative;
    color: var(--text-primary);
    
    &[data-char="."] {
      margin-right: 1rem;
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
    font-size: 1.75rem;
    color: var(--neon-blue);
    margin: 1rem 0 1.5rem;
    font-family: 'Poppins', sans-serif;
    text-shadow: 0 0 10px rgba(8, 247, 254, 0.5);
    font-weight: 400;
    
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
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.7;
    margin: 0 0 2rem;
    font-family: 'Poppins', sans-serif;
    max-width: 600px;
    text-align: left;
    
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
    
    .cta-button {
      padding: 0.9rem 2rem;
      background: transparent;
      border: 1px solid var(--neon-blue);
      color: var(--neon-blue);
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: 'Orbitron', sans-serif;
      border-radius: 4px;
      position: relative;
      overflow: hidden;
      font-weight: 600;
      
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
    opacity: 0.7;
    transition: opacity 0.3s ease;
    z-index: 10;
    
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
    opacity: 0.7;
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

  @media (max-width: 992px) {
    .container {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    .hero-visual {
      display: none;
    }
    
    .description {
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
    
    .cta-container {
      justify-content: center;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 1.5rem;
    }
    
    .glitch-title {
      font-size: 3.5rem;
    }
    
    .subtitle {
      font-size: 1.5rem;
    }
    
    .description {
      font-size: 1rem;
    }
    
    .cta-container {
      flex-direction: column;
      width: 100%;
      
      .cta-button {
        width: 100%;
      }
    }
  }
  
  @media (max-width: 480px) {
    .glitch-title {
      font-size: 2.8rem;
    }
  }
`;

// 3D Background component
const HeroBackground = () => {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.3}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
      />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        fade
        speed={1}
      />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#08f7fe" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#7122fa" />
      <ambientLight intensity={0.2} />
      <fog attach="fog" args={['#000', 5, 30]} />
    </Canvas>
  );
};

// Main Hero component
const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const [currentRole, setCurrentRole] = useState('Developer');
  const roles = ['Developer', 'Designer'];

  useEffect(() => {
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
            delay: 0.5
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

    // GSAP animations for hero section elements
    const tl = gsap.timeline();

    tl.fromTo(
      '.subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 1.2 }
    )
      .fromTo(
        '.description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        '.cta-button',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        '.hero-sphere',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
        '-=1'
      )
      .fromTo(
        '.scroll-indicator',
        { opacity: 0, y: -20 },
        { opacity: 0.7, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );

    return () => {
      clearInterval(roleInterval);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <StyledHero ref={heroRef} id="home">
      <div className="three-container">
        <HeroBackground />
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="title-container">
            <h1 className="glitch-title" ref={titleRef}>Vishwa <br/>
                Fernando</h1>
            <div className="subtitle">
              Web <span className="role-text">{currentRole}</span>
              <span className="typing-cursor"></span>
            </div>
          </div>

          <div className="description">
            <p>Crafting digital experiences that push the boundaries of creativity and technology.</p>
            <p>Let's build something extraordinary together.</p>
          </div>

          <div className="cta-container">
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
                link.href = '/VishwaFernando-CV.pdf';
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
          <div className="hero-sphere"></div>
        </div>
      </div>

      <div className="scroll-indicator" onClick={() => scrollToSection('about')}>
        <div className="scroll-text">Scroll</div>
        <div className="scroll-icon"></div>
      </div>
    </StyledHero>
  );
};

export default Hero;
