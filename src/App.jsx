import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlobalStyles from './styles/GlobalStyles'; 
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Loading from './components/Loading'; 
 
gsap.registerPlugin(ScrollTrigger);

const StyledMain = styled.main`
  position: relative;
  background-color: var(--dark-bg);
  width: 100%;
  padding: 0;
  margin: 0;

  section {
    position: relative;
    width: 100%;
    min-height: 100vh;
    z-index: 2;
    display: block;
  }
`;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [startAnimations, setStartAnimations] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse'
    });

    window.scrollTo(0, 0);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
    // Delay to ensure loading screen fade out completes
    setTimeout(() => {
      setStartAnimations(true);
    }, 100);
  };

  return (
    <>
      <GlobalStyles />
      {isLoading && <Loading onLoadComplete={handleLoadComplete} />}
      <Nav />
      <StyledMain>
        <Hero startAnimations={startAnimations} />
        <About />
        <Projects />
        <Contact />
      </StyledMain>
      <Footer />
    </>
  );
};

export default App;
