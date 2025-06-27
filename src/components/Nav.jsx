import { useEffect, useRef, useState, useCallback, useMemo, memo } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.2rem 5%;
  z-index: 1000;
  background: rgba(5, 5, 6, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(8, 247, 254, 0.2);
  box-shadow: 0 0 20px rgba(8, 247, 254, 0.1);

  &::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(113, 34, 250, 0.5), 
      rgba(8, 247, 254, 0.8), 
      rgba(113, 34, 250, 0.5), 
      transparent
    );
    z-index: 2;
  }

  .nav-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }

  .nav-logo {
    font-family: 'Orbitron', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--neon-blue);
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(8, 247, 254, 0.5);
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      color: var(--neon-pink);
      opacity: 0.4;
      filter: blur(3px);
      transform: translateX(-3px);
    }
  }

  ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 3rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: var(--text-primary);
    text-decoration: none;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 500;
    position: relative;
    padding: 5px 0;
    transition: color 0.3s ease;
    font-family: 'Poppins', sans-serif;
    
    &::before {
      content: "";
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
      box-shadow: 0 0 10px var(--neon-blue);
      transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    &:hover {
      color: var(--neon-blue);
      text-shadow: 0 0 8px rgba(8, 247, 254, 0.5);
      
      &::before {
        width: 100%;
      }
    }
  }

  .active {
    color: var(--neon-blue);
    text-shadow: 0 0 8px rgba(8, 247, 254, 0.5);
    
    &::before {
      width: 100%;
    }
  }
  
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 20px;
    cursor: pointer;
    z-index: 1000;
    
    span {
      display: block;
      height: 2px;
      width: 100%;
      background-color: var(--neon-blue);
      border-radius: 5px;
      transition: all 0.3s ease;
      box-shadow: 0 0 5px var(--neon-blue);
    }
  }

  @media (max-width: 768px) {
    .hamburger {
      display: flex;
    }
    
    .nav-content {
      position: relative;
    }

    ul {
      position: fixed;
      top: 0;
      right: 0;
      height: 100vh;
      width: 100%;
      background: rgba(5, 5, 6, 0.97);
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2.5rem;
      padding: 2rem;
      transform: translateX(100%);
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      backdrop-filter: blur(10px);
      border-left: 1px solid rgba(8, 247, 254, 0.2);
      
      a {
        font-size: 1.2rem;
      }
      
      &.open {
        transform: translateX(0);
        box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
      }
    }
    
    .hamburger.open {
      span:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
      }
      
      span:nth-child(2) {
        opacity: 0;
      }
      
      span:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
      }
    }
  }
`;

const Nav = () => {
  const navRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Memoize sections data to prevent recreation
  const sections = useMemo(() => [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'contact', label: 'CONTACT' }
  ], []);

  // More efficient scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    
    // Special case for when at the very top - always show home as active
    if (scrollPosition < 50) {
      setActiveSection(prev => prev !== 'home' ? 'home' : prev);
      return;
    }
    
    // Use center of viewport to determine which section is active
    const viewportCenter = scrollPosition + window.innerHeight / 2;
    
    // Find the section that contains the center of the viewport
    let currentSection = 'home';
    
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (viewportCenter >= offsetTop && viewportCenter < offsetTop + offsetHeight) {
          currentSection = id;
        }
      }
    });
    
    setActiveSection(prev => prev !== currentSection ? currentSection : prev);
  }, [sections]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      );
      
      gsap.fromTo(
        '.nav-link',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.8 }
      );
    });

    // Throttle scroll events for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      ctx.revert();
      window.removeEventListener('scroll', onScroll);
    };
  }, [handleScroll]);

  const handleClick = useCallback((e, id) => {
    e.preventDefault();
    
    // Immediately update active section for instant visual feedback
    setActiveSection(id);
    
    if (id === 'home') {
      // For home, scroll to the very top with more reliable targeting
      const homeElement = document.getElementById('home');
      if (homeElement) {
        homeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Fallback to window.scrollTo
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // Dispatch custom event for home animation triggering if needed
      setTimeout(() => {
        const customEvent = new CustomEvent('navigateToHome');
        window.dispatchEvent(customEvent);
      }, 300);
    } else {
      // For other sections, use the element scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        
        // Dispatch custom event for animation triggering
        setTimeout(() => {
          const customEvent = new CustomEvent(`navigateTo${id.charAt(0).toUpperCase() + id.slice(1)}`);
          window.dispatchEvent(customEvent);
        }, 300); // Delay to allow scroll to start
      }
    }
    
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  }, []);
  
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => {
      const newState = !prev;
      document.body.style.overflow = newState ? 'hidden' : 'auto';
      return newState;
    });
  }, []);

  // Memoize navigation items
  const navigationItems = useMemo(() => 
    sections.map(({ id, label }) => (
      <li key={id}>
        <a
          href={`#${id}`}
          className={`nav-link ${activeSection === id ? 'active' : ''}`}
          onClick={(e) => handleClick(e, id)}
        >
          {label}
        </a>
      </li>
    )), 
    [sections, activeSection, handleClick]
  );

  return (
    <StyledNav ref={navRef}>
      <div className="nav-content">
        <a href="#home" className="nav-logo" onClick={(e) => handleClick(e, 'home')}>
          Vishwa Fernando
        </a>
        
        <div 
          className={`hamburger ${isMenuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <ul className={isMenuOpen ? 'open' : ''}>
          {navigationItems}
        </ul>
      </div>
    </StyledNav>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Nav);
