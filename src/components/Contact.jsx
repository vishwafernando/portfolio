import { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
 
gsap.registerPlugin(ScrollTrigger);

const StyledContact = styled.section`
  min-height: 100vh;
  width: 100%;
  padding: clamp(2rem, 8vw, 8rem) clamp(1rem, 5vw, 5%);
  background: var(--darker-bg);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    min-height: auto;
    padding: 4rem 1rem;
    align-items: flex-start;
    padding-top: 6rem;
  }
  
  @media (max-width: 480px) {
    padding: 3rem 0.5rem;
    padding-top: 5rem;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 10;
    background: rgba(10, 10, 11, 0.9);
    padding: 3rem;
    border-radius: 20px;
    border: 1px solid rgba(8, 247, 254, 0.1);
    box-shadow: 
      0 0 30px rgba(8, 247, 254, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    &::before {
      content: '';
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      background: linear-gradient(45deg, 
        rgba(8, 247, 254, 0.2), 
        rgba(113, 34, 250, 0.2), 
        rgba(255, 20, 147, 0.2),
        rgba(8, 247, 254, 0.2)
      );
      border-radius: 20px;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
      background-size: 400% 400%;
      animation: gradientShift 8s ease infinite;
    }

    &:hover::before {
      opacity: 1;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 2rem;
      max-width: 90%;
      border-radius: 15px;

      &::before {
        border-radius: 15px;
      }
    }
    
    @media (max-width: 480px) {
      padding: 1.5rem;
      gap: 1.5rem;
      max-width: 95%;
      border-radius: 10px;
      margin: 0 auto;

      &::before {
        border-radius: 10px;
      }
    }
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  h2 {
    font-size: clamp(2.5rem, 6vw, 3.5rem);
    margin-bottom: 2rem;
    color: var(--neon-blue);
    text-shadow: 0 0 15px rgba(8, 247, 254, 0.5);
    font-family: 'Orbitron', sans-serif;
    letter-spacing: -1px;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent, 
        rgba(8, 247, 254, 0.4), 
        transparent
      );
      transition: left 0.5s ease;
    }

    &:hover::before {
      left: 100%;
    }
    
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
      justify-content: flex-start;

      @media (max-width: 768px) {
        justify-content: center;
        margin-top: 2rem;
      }

      @media (max-width: 480px) {
        gap: 0.8rem;
        flex-direction: column;
        align-items: center;
      }

      a {
        color: var(--neon-blue);
        font-size: clamp(0.9rem, 2vw, 1.1rem);
        text-transform: uppercase;
        letter-spacing: 2px;
        font-family: 'Orbitron', sans-serif;
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        position: relative;
        padding: 0.5rem 1rem;
        border: 1px solid rgba(8, 247, 254, 0.3);
        border-radius: 5px;
        white-space: nowrap;
        transform-origin: center;

        @media (max-width: 768px) {
          text-align: center;
        }

        @media (max-width: 480px) {
          padding: 0.6rem 1rem;
          letter-spacing: 1px;
          font-size: 0.85rem;
          white-space: normal;
          text-align: center;
          width: 100%;
          max-width: 200px;
        }

        &:hover {
          transform: translateY(-3px) scale(1.05);
          color: #fff;
          background: rgba(8, 247, 254, 0.15);
          box-shadow: 0 8px 25px rgba(8, 247, 254, 0.3);
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
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        font-family: 'Poppins', sans-serif;
        position: relative;
        z-index: 2;

        @media (max-width: 480px) {
          padding: 0.8rem;
        }

        &:focus {
          outline: none;
          border-color: var(--neon-blue);
          box-shadow: 
            0 0 20px rgba(8, 247, 254, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.02);

          & + label {
            transform: translateY(-2.5rem) scale(0.9);
            color: var(--neon-blue);
            text-shadow: 0 0 8px rgba(8, 247, 254, 0.6);
          }
        }

        &:not(:placeholder-shown) + label {
          transform: translateY(-2.5rem) scale(0.9);
        }

        &:hover {
          border-color: rgba(8, 247, 254, 0.5);
          box-shadow: 0 0 15px rgba(8, 247, 254, 0.2);
        }
      }

      textarea {
        min-height: 150px;
        resize: vertical;
        
        @media (max-width: 480px) {
          min-height: 120px;
        }
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
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      position: relative;
      overflow: hidden;
      font-family: 'Orbitron', sans-serif;
      margin-top: 1rem;
      border-radius: 8px;
      width: 100%;
      transform-origin: center;

      @media (max-width: 480px) {
        padding: 0.8rem 1.5rem;
        letter-spacing: 1px;
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
        transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        z-index: -1;
      }

      &:hover {
        color: var(--dark-bg);
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 8px 25px rgba(8, 247, 254, 0.4);
        
        &::before {
          transform: scaleX(1);
          transform-origin: left;
        }
      }
    }
  }

  .background-circuit {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.08;
    pointer-events: none;
    background: 
      linear-gradient(to right, var(--neon-blue) 1px, transparent 1px) 0 0,
      linear-gradient(to bottom, var(--neon-blue) 1px, transparent 1px) 0 0;
    background-size: 50px 50px;
    z-index: 1;
    animation: circuitPulse 8s ease-in-out infinite;
  }

  .floating-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
    overflow: hidden;
  }

  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--neon-blue);
    border-radius: 50%;
    opacity: 0;
    box-shadow: 0 0 6px var(--neon-blue);
  }

  .glow-orb {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(8, 247, 254, 0.1), transparent 70%);
    pointer-events: none;
    z-index: 1;
    opacity: 0.6;
    animation: orbFloat 12s ease-in-out infinite;
  }

  .glow-orb:nth-child(1) {
    top: 10%;
    right: 20%;
    animation-delay: 0s;
  }

  .glow-orb:nth-child(2) {
    bottom: 20%;
    left: 15%;
    animation-delay: -4s;
    background: radial-gradient(circle, rgba(113, 34, 250, 0.1), transparent 70%);
  }

  .glow-orb:nth-child(3) {
    top: 60%;
    right: 10%;
    animation-delay: -8s;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(255, 20, 147, 0.1), transparent 70%);
  }

  @keyframes circuitPulse {
    0%, 100% { opacity: 0.08; }
    50% { opacity: 0.15; }
  }

  @keyframes orbFloat {
    0%, 100% { transform: translateY(0px) scale(1); }
    33% { transform: translateY(-20px) scale(1.1); }
    66% { transform: translateY(10px) scale(0.9); }
`;

const Contact = () => {
  const sectionRef = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const timelineRef = useRef(null);
  const formRef = useRef();
  const [status, setStatus] = useState('');

  // Enhanced animation function with particle effects and advanced sequencing
  const animateContact = useCallback(() => {
    if (isAnimated || !sectionRef.current) return;
    
    setIsAnimated(true);
    
    const section = sectionRef.current;
    const contactInfo = section.querySelector('.contact-info');
    const formGroups = section.querySelectorAll('.form-group');
    const title = section.querySelector('h2');
    const socialLinks = section.querySelectorAll('.social-links a');
    const submitButton = section.querySelector('button');
    const grid = section.querySelector('.grid');
    
    // Kill existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    
    // Create master timeline with advanced defaults
    const masterTL = gsap.timeline({
      defaults: { ease: 'power2.out' }
    });
    timelineRef.current = masterTL;
    
    // Create floating particles
    createFloatingParticles();
    
    // Set initial states for all elements
    gsap.set([contactInfo, formGroups], { opacity: 0 });
    gsap.set(title, { opacity: 0, y: -30, rotationX: 45 });
    gsap.set(contactInfo.querySelector('p'), { opacity: 0, y: 20, scale: 0.95 });
    gsap.set(socialLinks, { opacity: 0, y: 20, scale: 0.8, rotation: 5 });
    gsap.set(formGroups, { opacity: 0, x: 50, rotationY: 15 });
    gsap.set(submitButton, { opacity: 0, scale: 0.8, y: 20 });
    gsap.set(grid, { scale: 0.95, opacity: 0 });
    
    // Enhanced animation sequence
    masterTL
      // Grid container entrance with scale
      .to(grid, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.2)'
      })
      // Title with 3D rotation effect
      .to(title, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.4')
      // Contact info paragraph with scale
      .to(contactInfo.querySelector('p'), {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.1)'
      }, '-=0.5')
      // Social links with rotation and stagger
      .to(socialLinks, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: {
          amount: 0.3,
          from: 'start',
          ease: 'power2.out'
        },
        ease: 'back.out(1.4)'
      }, '-=0.4')
      // Form groups with 3D rotation
      .to(formGroups, {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 0.8,
        stagger: {
          amount: 0.4,
          from: 'start'
        },
        ease: 'power3.out'
      }, '-=0.8')
      // Submit button with bounce
      .to(submitButton, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)'
      }, '-=0.2');

    // Add hover animations for interactive elements
    addHoverAnimations();
      
    return masterTL;
  }, [isAnimated]);

  // Create floating particle effects
  const createFloatingParticles = useCallback(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    let particlesContainer = section.querySelector('.floating-particles');
    
    if (!particlesContainer) {
      particlesContainer = document.createElement('div');
      particlesContainer.className = 'floating-particles';
      section.appendChild(particlesContainer);
    }

    // Create 15 particles
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particlesContainer.appendChild(particle);

      // Random initial position
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0
      });

      // Animate particle
      gsap.to(particle, {
        opacity: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 2 + 1,
        ease: 'power2.out'
      });

      // Floating animation
      gsap.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        duration: Math.random() * 8 + 6,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2
      });
    }
  }, []);

  // Add advanced hover animations
  const addHoverAnimations = useCallback(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const socialLinks = section.querySelectorAll('.social-links a');
    const formInputs = section.querySelectorAll('input, textarea');
    const button = section.querySelector('button');

    // Enhanced social link hovers
    socialLinks.forEach((link, index) => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          scale: 1.1,
          rotation: Math.random() * 10 - 5,
          duration: 0.3,
          ease: 'back.out(2)'
        });
        
        // Create ripple effect
        createRippleEffect(link, index);
      });

      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: 'back.out(1.7)'
        });
      });
    });

    // Form input animations
    formInputs.forEach(input => {
      input.addEventListener('focus', () => {
        gsap.to(input.parentElement, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      input.addEventListener('blur', () => {
        gsap.to(input.parentElement, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Button pulse effect
    if (button) {
      const pulseAnimation = () => {
        gsap.to(button, {
          boxShadow: '0 0 30px rgba(8, 247, 254, 0.6)',
          duration: 1.5,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: -1
        });
      };
      
      setTimeout(pulseAnimation, 2000);
    }
  }, []);

  // Create ripple effect for social links
  const createRippleEffect = (element, index) => {
    const colors = ['#08f7fe', '#7122fa', '#ff1493'];
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 10px;
      height: 10px;
      background: ${colors[index % colors.length]};
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 1000;
    `;
    
    element.appendChild(ripple);
    
    gsap.to(ripple, {
      scale: 8,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => ripple.remove()
    });
  };

  // Unified effect for all triggers - cleaner and more performant
  useEffect(() => {
    if (isAnimated || !sectionRef.current) return;

    const section = sectionRef.current;
    let scrollTrigger = null;

    // Check for direct navigation first
    const checkDirectNavigation = () => {
      if (window.location.hash === '#contact') {
        setTimeout(animateContact, 300);
        return true;
      }
      return false;
    };

    // Setup scroll trigger if not direct navigation
    if (!checkDirectNavigation()) {
      const ctx = gsap.context(() => {
        scrollTrigger = ScrollTrigger.create({
          trigger: section,
          start: 'top center+=80',
          once: true,
          onEnter: animateContact,
          invalidateOnRefresh: true,
          refreshPriority: 1
        });
      });

      // Store context for cleanup
      scrollTrigger.context = ctx;
    }

    // Event handlers
    const handleHashChange = () => {
      if (window.location.hash === '#contact' && !isAnimated) {
        setTimeout(animateContact, 200);
      }
    };

    const handleCustomNavigation = () => {
      if (!isAnimated) {
        setTimeout(animateContact, 150);
      }
    };

    // Add event listeners
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('navigateToContact', handleCustomNavigation);

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
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('navigateToContact', handleCustomNavigation);
    };
  }, [isAnimated, animateContact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set the time field before sending
    if (formRef.current) {
      const now = new Date();
      const formatted = now.toLocaleString();
      let timeInput = formRef.current.querySelector('input[name="time"]');
      if (!timeInput) {
        timeInput = document.createElement('input');
        timeInput.type = 'hidden';
        timeInput.name = 'time';
        formRef.current.appendChild(timeInput);
      }
      timeInput.value = formatted;
    }
    setStatus('Sending...');
    // Debug: log env variables
    console.log('EmailJS config:',
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      process.env.REACT_APP_EMAILJS_USER_ID
    );
    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      formRef.current,
      process.env.REACT_APP_EMAILJS_USER_ID
    )
    .then((result) => {
      setStatus('Message sent successfully!');
      formRef.current.reset();
    }, (error) => {
      setStatus('Failed to send message. Please try again.');
      // Debug: log error details
      console.error('EmailJS error:', error);
    });
  };

  return (
    <StyledContact ref={sectionRef} id="contact">
      <div className="background-circuit" />
      <div className="glow-orb"></div>
      <div className="glow-orb"></div>
      <div className="glow-orb"></div>
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
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" id="name" name="from_name" placeholder=" " required autocomplete="name" />
              <label htmlFor="name">Your Name</label>
            </div>
            <div className="form-group">
              <input type="email" id="email" name="from_email" placeholder=" " required autocomplete="email" />
              <label htmlFor="email">Your Email</label>
            </div>
            <div className="form-group">
              <textarea id="message" name="message" placeholder=" " required autocomplete="message"></textarea>
              <label htmlFor="message">Your Message</label>
            </div>
            <input type="hidden" name="time" />
            <button type="submit">Send Message</button>
            <div style={{marginTop: '1rem', color: status.includes('success') ? 'var(--neon-blue)' : 'var(--neon-pink)'}}>{status}</div>
          </form>
        </div>
      </div>
    </StyledContact>
  );
};

export default Contact;
