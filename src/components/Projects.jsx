import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StyledProjects = styled.section`
  min-height: 100vh;
  padding: 8rem 5%;
  background: var(--dark-bg);

  h2 {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 4rem;
    color: var(--neon-purple);
    text-shadow: 0 0 10px var(--neon-purple);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const ProjectCard = styled(motion.div)`
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: visible;
  border: 1px solid var(--neon-blue);
  z-index: 1;
  
  
  &:hover .project-image {
    transform: scale(2.1); /* 🔥 scale on hover */
    z-index: 5;
    box-shadow: 0 15px 40px rgba(8, 247, 254, 0.3); /* optional glow */
  }

  &:hover {
    z-index: 10;
  }

  .project-image {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: visible;
    transition: transform 0.6s ease;
    z-index: 2;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.08); 
    backdrop-filter: blur(10px);          
    -webkit-backdrop-filter: blur(10px);  
    box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.05); 
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 15px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      transition: transform 0.6s ease; /* smooth zoom */
    }
  }



  .project-content {
    padding: 1.5rem;

    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: var(--neon-green);
    }

    p {
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 1.5rem;

      span {
        padding: 0.3rem 0.8rem;
        background: rgba(255, 46, 99, 0.1);
        border: 1px solid var(--neon-pink);
        border-radius: 20px;
        font-size: 0.9rem;
        color: var(--neon-pink);
      }
    }

    .project-links {
      display: flex;
      gap: 1rem;

      a {
        padding: 0.5rem 1rem;
        border: 1px solid var(--neon-blue);
        border-radius: 5px;
        color: var(--neon-blue);
        text-decoration: none;
        transition: all 0.3s ease;

        &:hover {
          background: var(--neon-blue);
          color: var(--dark-bg);
        }
      }
    }
  }
`;

const projects = [
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
    description: 'Portfolio website built with React, Styled Components, and GSAP. Designed with a futuristic cyberpunk aesthetic.',
    tags: ['Vue.js', 'D3.js', 'GraphQL', 'GSAP'],
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
      code: ''
    }
  }
];

const Projects = () => {
  const sectionRef = useRef(null);
  const [animationsTriggered, setAnimationsTriggered] = useState(false);
  const animationTimelineRef = useRef(null);

  // Function to trigger animations
  const triggerAnimations = () => {
    if (animationsTriggered || !sectionRef.current) return;
    
    setAnimationsTriggered(true);
    
    // Kill existing timeline if it exists
    if (animationTimelineRef.current) {
      animationTimelineRef.current.kill();
    }
    
    // Create new timeline
    const tl = gsap.timeline();
    animationTimelineRef.current = tl;
    
    const section = sectionRef.current;
    const title = section.querySelector('h2');
    const cards = section.querySelectorAll('.project-card');
    
    // Only animate if elements exist
    if (title && cards.length > 0) {
      // Set initial states only for elements that exist
      gsap.set(title, { opacity: 0, y: 100 });
      gsap.set(cards, { opacity: 0, y: 100 });
      
      // Animate elements in sequence
      tl.to(title, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .to(cards, {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }, '-=0.6');
    }
  };

  // Check if user navigated directly to this section
  useEffect(() => {
    const checkDirectNavigation = () => {
      const hash = window.location.hash;
      if (hash === '#projects') {
        // Add a longer delay for direct navigation to ensure DOM is ready
        setTimeout(() => {
          triggerAnimations();
        }, 300);
      }
    };
    
    checkDirectNavigation();
    window.addEventListener('hashchange', checkDirectNavigation);
    
    return () => {
      window.removeEventListener('hashchange', checkDirectNavigation);
    };
  }, []);

  // Listen for custom navigation events
  useEffect(() => {
    const handleNavigationToProjects = () => {
      setTimeout(() => {
        triggerAnimations();
      }, 400); // Increased delay for better reliability
    };
    
    window.addEventListener('navigateToProjects', handleNavigationToProjects);
    
    return () => {
      window.removeEventListener('navigateToProjects', handleNavigationToProjects);
    };
  }, []);

  // Ensure content is visible by default
  useEffect(() => {
    if (sectionRef.current && !animationsTriggered) {
      // Make sure content is visible by default
      const section = sectionRef.current;
      const title = section.querySelector('h2');
      const cards = section.querySelectorAll('.project-card');
      
      if (title && cards.length > 0) {
        gsap.set(title, { opacity: 1, y: 0 });
        gsap.set(cards, { opacity: 1, y: 0 });
      }
    }
  }, [animationsTriggered]);

  useEffect(() => {
    // ScrollTrigger-based animations (fallback)
    if (!animationsTriggered && sectionRef.current) {
      const section = sectionRef.current;
      
      // Create ScrollTrigger only if not already animated
      const scrollTriggerAnimation = ScrollTrigger.create({
        trigger: section,
        start: 'top center+=100',
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

  return (
    <StyledProjects ref={sectionRef} id="projects">
      <h2>Featured Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            className="project-card"
            bgColor={project.bgColor}
            whileHover={{ y: -10 }}
          >
            <div className="project-image">
              {project.image && (
                  <img src={project.image} alt={project.title} />
              )}
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tags">
                {project.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
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
        ))}
      </div>
    </StyledProjects>
  );
};

export default Projects;
