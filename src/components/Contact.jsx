import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StyledContact = styled.section`
  min-height: 100vh;
  width: 100%;
  padding: clamp(4rem, 8vw, 8rem) 5%;
  background: var(--darker-bg);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 10;
    background: rgba(10, 10, 11, 0.9);
    padding: 3rem;
    border-radius: 20px;
    border: 1px solid rgba(8, 247, 254, 0.1);
    box-shadow: 0 0 30px rgba(8, 247, 254, 0.1);
    backdrop-filter: blur(10px);

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 2rem;
    }
    
    @media (max-width: 480px) {
      padding: 1.5rem;
      gap: 1.5rem;
    }
  }

  h2 {
    font-size: clamp(2.5rem, 6vw, 3.5rem);
    margin-bottom: 2rem;
    color: var(--neon-blue);
    text-shadow: 0 0 15px rgba(8, 247, 254, 0.5);
    font-family: 'Orbitron', sans-serif;
    letter-spacing: -1px;
    
    @media (max-width: 480px) {
      margin-bottom: 1.5rem;
    }
  }

  .contact-info {
    p {
      font-size: clamp(1rem, 2.5vw, 1.2rem);
      line-height: 1.8;
      margin-bottom: 2rem;
      color: var(--text-secondary);
      font-family: 'Poppins', sans-serif;
    }

    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 3rem;
      flex-wrap: wrap;

      @media (max-width: 480px) {
        gap: 0.8rem;
      }

      a {
        color: var(--neon-blue);
        font-size: clamp(0.9rem, 2vw, 1.1rem);
        text-transform: uppercase;
        letter-spacing: 2px;
        font-family: 'Orbitron', sans-serif;
        transition: all 0.3s ease;
        position: relative;
        padding: 0.5rem 1rem;
        border: 1px solid rgba(8, 247, 254, 0.3);
        border-radius: 5px;
        white-space: nowrap;

        @media (max-width: 480px) {
          padding: 0.4rem 0.8rem;
          letter-spacing: 1px;
          font-size: 0.8rem;
        }

        &:hover {
          transform: translateY(-5px);
          color: #fff;
          background: rgba(8, 247, 254, 0.1);
          box-shadow: 0 0 20px rgba(8, 247, 254, 0.2);
          border-color: var(--neon-blue);
        }
      }
    }
  }

  .contact-form {
    form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      position: relative;

      label {
        position: absolute;
        left: 1rem;
        top: 1rem;
        color: var(--text-secondary);
        transition: all 0.3s ease;
        pointer-events: none;
        font-family: 'Poppins', sans-serif;
        z-index: 1;
        
        @media (max-width: 480px) {
          font-size: 0.9rem;
        }
      }

      input,
      textarea {
        width: 100%;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(8, 247, 254, 0.3);
        border-radius: 8px;
        color: var(--text-primary);
        font-size: clamp(0.9rem, 2vw, 1rem);
        transition: all 0.3s ease;
        font-family: 'Poppins', sans-serif;
        position: relative;
        z-index: 2;

        @media (max-width: 480px) {
          padding: 0.8rem;
        }

        &:focus {
          outline: none;
          border-color: var(--neon-blue);
          box-shadow: 0 0 20px rgba(8, 247, 254, 0.2);
          background: rgba(255, 255, 255, 0.1);

          & + label {
            transform: translateY(-2.5rem) scale(0.9);
            color: var(--neon-blue);
          }
        }

        &:not(:placeholder-shown) + label {
          transform: translateY(-2.5rem) scale(0.9);
        }
      }

      textarea {
        min-height: 150px;
        resize: vertical;
      }
    }

    button {
      padding: 1rem 2rem;
      background: rgba(8, 247, 254, 0.1);
      border: 2px solid var(--neon-blue);
      color: var(--neon-blue);
      font-size: clamp(0.9rem, 2vw, 1.1rem);
      text-transform: uppercase;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      font-family: 'Orbitron', sans-serif;
      margin-top: 1rem;
      border-radius: 8px;
      width: 100%;

      @media (max-width: 480px) {
        padding: 0.8rem 1.5rem;
        letter-spacing: 1px;
      }

      &:hover {
        background: var(--neon-blue);
        color: var(--dark-bg);
        box-shadow: 0 0 20px rgba(8, 247, 254, 0.3);
      }
    }
  }

  .background-circuit {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.05;
    pointer-events: none;
    background: 
      linear-gradient(to right, var(--neon-blue) 1px, transparent 1px) 0 0,
      linear-gradient(to bottom, var(--neon-blue) 1px, transparent 1px) 0 0;
    background-size: 50px 50px;
    z-index: 1;
  }
`;

const Contact = () => {
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
    const formGroups = section.querySelectorAll('.form-group');
    const contactInfo = section.querySelector('.contact-info');

    // Only animate if elements exist
    if (title && formGroups.length > 0 && contactInfo) {
      // Set initial states
      gsap.set(contactInfo, { opacity: 0, x: -50 });
      gsap.set(formGroups, { opacity: 0, y: 20 });

      // Animate elements in sequence
      tl.to(contactInfo, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
      })
        .to(formGroups, {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.5');
    }
  };

  // Check if user navigated directly to this section
  useEffect(() => {
    const checkDirectNavigation = () => {
      const hash = window.location.hash;
      if (hash === '#contact') {
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
    const handleNavigationToContact = () => {
      setTimeout(() => {
        triggerAnimations();
      }, 400);
    };

    window.addEventListener('navigateToContact', handleNavigationToContact);

    return () => {
      window.removeEventListener('navigateToContact', handleNavigationToContact);
    };
  }, []);

  // Ensure content is visible by default
  useEffect(() => {
    if (sectionRef.current && !animationsTriggered) {
      // Make sure content is visible by default
      const section = sectionRef.current;
      const contactInfo = section.querySelector('.contact-info');
      const formGroups = section.querySelectorAll('.form-group');

      if (contactInfo && formGroups.length > 0) {
        gsap.set(contactInfo, { opacity: 1, x: 0 });
        gsap.set(formGroups, { opacity: 1, y: 0 });
      }
    }
  }, [animationsTriggered]);

  useEffect(() => {
    // ScrollTrigger-based animations (fallback)
    if (!animationsTriggered && sectionRef.current) {
      const ctx = gsap.context(() => {
        // Section fade in
        gsap.from(sectionRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center+=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse',
            onStart: () => triggerAnimations()
          }
        });
      });

      return () => ctx.revert();
    }
  }, [animationsTriggered]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <StyledContact ref={sectionRef} id="contact">
      <div className="background-circuit" />
      <div className="grid">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>
            Ready to start a project or just want to chat?
            Feel free to reach out. I'm always open to discussing new projects,
            creative ideas, or opportunities to be part of your visions.
          </p>
          <div className="social-links">
            <a href="https://github.com/vishwafernando" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/vishwafernando" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://mail.google.com/mail/u/0/?tf=cm&fs=1&to=vishwafernando.vf@gmail.com" target="_blank" rel="noopener noreferrer">Email Me</a>
          </div>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" id="name" placeholder=" " required />
              <label htmlFor="name">Your Name</label>
            </div>
            <div className="form-group">
              <input type="email" id="email" placeholder=" " required />
              <label htmlFor="email">Your Email</label>
            </div>
            <div className="form-group">
              <textarea id="message" placeholder=" " required></textarea>
              <label htmlFor="message">Your Message</label>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </StyledContact>
  );
};

export default Contact;
