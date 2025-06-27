import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background: var(--darker-bg);
  border-top: 1px solid rgba(8, 247, 254, 0.3);
  padding: clamp(2rem, 6vw, 3rem) 0 1.5rem;
  position: relative;
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
      linear-gradient(rgba(8, 247, 254, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(8, 247, 254, 0.05) 1px, transparent 1px);
    background-size: 50px 50px;
    z-index: 1;
    pointer-events: none;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 2;
  }

  .footer-content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 3rem;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
      text-align: center;
    }
  }

  .footer-section {
    h3 {
      color: var(--neon-blue);
      font-family: 'Orbitron', sans-serif;
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 30px;
        height: 2px;
        background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
        
        @media (max-width: 768px) {
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }

    p {
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.6;
      margin-bottom: 0.5rem;
      font-family: 'Poppins', sans-serif;
    }

    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      
      @media (max-width: 768px) {
        justify-content: center;
      }
    }

    .social-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: transparent;
      border: 1px solid var(--neon-blue);
      border-radius: 50%;
      color: var(--neon-blue);
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      font-size: 1.2rem;
      font-weight: 600;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--neon-blue);
        border-radius: 50%;
        transform: scale(1);
        transition: transform 0.3s ease;
        z-index: -1;
      }
      
      &:hover {
        color: var(--darker-bg);
        transform: translateY(-4px);
        transform: scale(1.2);
        box-shadow: 0 5px 15px rgba(8, 247, 254, 0.3);
        
        &::before {
          transform: scale(2);
        }
      }
      
      &:nth-child(2) {
        border: 1px solid var(--neon-pink);
        color: var(--neon-pink);
        
        &::before {
            background: var(--neon-pink);
        }

        &:hover {
            color: var(--darker-bg);
            box-shadow: 0 5px 15px rgba(255, 0, 255, 0.3);     
      }
  
      &:nth-child(3) {
        border: 1px solid var(--neon-yellow);
        color: var(--neon-yellow);

        
        &::before {
            background: var(--neon-yellow);
        }
        
        &:hover {
            color: var(--darker-bg);
            box-shadow: 0 5px 15px rgba(8, 247, 254, 0.3);
      }
    }

    .quick-links {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 0.5rem;
      }

      a {
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        font-family: 'Poppins', sans-serif;
        transition: all 0.3s ease;
        position: relative;
        
        &::before {
          content: '>';
          position: absolute;
          left: -15px;
          color: var(--neon-blue);
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        &:hover {
          color: var(--neon-blue);
          padding-left: 15px;
          
          &::before {
            opacity: 1;
          }
        }
      }
    }
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }

  .copyright {
    color: rgba(255, 255, 255, 0.5);
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
  }

  .footer-logo {
    color: var(--neon-blue);
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    font-size: 1.2rem;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      text-shadow: 0 0 10px var(--neon-blue);
    }
  }

  .scroll-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: var(--darker-bg);
    border: 2px solid var(--neon-blue);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--neon-blue);
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    
    &.visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    
    &:hover {
      background: var(--neon-blue);
      color: var(--darker-bg);
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(8, 247, 254, 0.3);
    }
    
    &::before {
      content: '↑';
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
`;

const Footer = () => {
    const [showScrollTop, setShowScrollTop] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <StyledFooter>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>About Me</h3>
                        <p>
                            A passionate web developer crafting digital experiences that push
                            the boundaries of creativity and technology.
                        </p>

                        <p>
                            Follow me on.
                        </p>
                        <div className="social-links">
                            <a
                                href="https://github.com/vishwafernando"
                                className="social-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                            >
                                <img width="24" height="24" src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/external-github-with-cat-logo-an-online-community-for-software-development-logo-bold-tal-revivo.png" alt="Github" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/vishwafernando"
                                className="social-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/linkedin.png" alt="linkedin" />
                            </a>
                            <a
                                className="social-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Email"
                            >
                                <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/blogger.png" alt="Blogger" />
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul className="quick-links">
                            <li>
                                <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>
                                    Projects
                                </a>
                            </li>
                            <li>
                                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Get In Touch</h3>
                        <p>Ready to start your next project?</p>
                        <p>Let's create something extraordinary together.</p>
                        <p style={{ marginTop: '1rem' }}>
                            <strong style={{ color: 'var(--neon-blue)' }}>Email:</strong><br />
                            <a
                                href="mailto:vishwafernando.vf@gmail.com"
                                style={{
                                    color: 'var(--neon-blue)',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.textShadow = '0 0 10px var(--neon-blue)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.textShadow = 'none';
                                }}
                            >
                                vishwafernando.vf@gmail.com
                            </a>
                        </p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="copyright">
                        © 2025 Vishwa Fernando. All rights reserved.
                    </div>
                    <a
                        href="#home"
                        className="footer-logo"
                        onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                    >
                        VISHWA FERNANDO
                    </a>
                </div>
            </div>

            <div
                className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
                onClick={scrollToTop}
            />
        </StyledFooter>
    );
};

export default Footer;
