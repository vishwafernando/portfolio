import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Skills data
const skills = [
  { name: 'HTML 5', color: '#e44d26' },
  { name: 'CSS', color: '#1572b6' },
  { name: 'React', color: '#61dafb' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Javascript', color: '#f0db4f' },
  { name: 'Java', color: '#ea2d2e' },
  { name: 'MySQL', color: '#00618a' },
  { name: 'Git', color: '#f34f29' },
  { name: 'Github', color: '#eff6ff' },
  { name: 'VsCode', color: '#25aef3' },
  { name: 'Photoshop', color: '#9b4f96' },
  { name: 'Python', color: '#FF6B6B' }
];

// Styled components
const StyledAbout = styled.section`
  min-height: 100vh;
  width: 100%;
  padding: 120px 0 80px;
  position: relative;
  background: var(--darker-bg);
  overflow: hidden;
  
  /* Diagonal line dividers */
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 200%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(8, 247, 254, 0.3), transparent);
    z-index: 1;
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
    padding: 0 2rem;
    position: relative;
    z-index: 5;
  }
  
  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
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
  }
    
  .section-subtitle {
    font-size: 2rem;
    color: var(--neon-blue);
    margin-bottom: 3rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    letter-spacing: 1px;
  }
  .p-subtitle {
    font-size: 2rem;
    color:var(--neon-white);
    margin-bottom: 3rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    letter-spacing: 1px;
  }
  
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }
  
  .about-content {
    color: var(--text-primary);
    
    p {
      font-size: 1.1rem;
      line-height: 1.8;
      margin-bottom: 1.5rem;
      color: rgba(255, 255, 255, 0.85);
      font-family: 'Poppins', sans-serif;
    }
    
    .highlight {
      color: var(--neon-blue);
      font-weight: 600;
    }
  }
  
  .skills-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    
    @media (max-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }
  
  .skill-box {
    background: rgba(10, 10, 11, 0.5);
    border: 1px solid rgba(8, 247, 254, 0.2);
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: default;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: ${props => props.color || 'var(--neon-blue)'};
      box-shadow: 0 0 15px ${props => props.color || 'var(--neon-blue)'};
      z-index: 1;
    }
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      border-color: ${props => props.color || 'var(--neon-blue)'};
    }
    
    .skill-name {
      font-family: 'Poppins', sans-serif;
      font-size: 1.2rem;
      color: ${props => props.color || 'var(--neon-blue)'};
      margin: 0;
      font-weight: 500;
    }
  }

  @media (max-width: 768px) {
    padding: 100px 0 60px;
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
        <p className="p-subtitle">Hello! I'm <span className="section-subtitle">Vishwa</span> a<br/>
          <span className="section-subtitle">Developer & Designer</span>
           <img src="https://media.giphy.com/media/WUlplcMpOCEmTGBtBW/giphy.gif" width="50"/>
        </p>

        <div className="grid">
          <div className="about-content">
            <p>
              I am a undergraduate student currently pursuing a Higher National Diploma in Software Engineering at
              Saegis Campus in Sri Lanka
              <img src="https://flagpedia.net/data/flags/emoji/google/160x160/lk.png" width="20"/>
              &nbsp; passionate about Frontend Development and UI Design</p>
            <p>
              My journey started with a curiosity about how things work on the web.
              Since then, I've been continuously learning and growing, embracing new technologies and
              best practicing. Check my <a href="https://github.com/vishwafernando/vishwafernando" target="_blank">work here</a>
            </p>
            <p>
              I'm also learning back-end to build full-stack apps.
            </p>
            <p>
              Outside coding, I enjoy staying active, following design trends, and watching TV shows.
            </p>
          </div>
          
          <div className="skills-section" ref={skillsRef}>
            <div className="skills-container">
              {skills.map((skill, index) => (
                <div 
                  className="skill-box" 
                  key={index}
                  style={{ '--skill-color': skill.color }}
                >
                  <h3 className="skill-name" style={{ color: skill.color }}>{skill.name}</h3>
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
