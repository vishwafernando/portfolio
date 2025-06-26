import { useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlobalStyles from './styles/GlobalStyles';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Nav from './components/Nav';

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
  useEffect(() => {
    console.log('App component mounted');
    gsap.registerPlugin(ScrollTrigger);
    
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse'
    });

    window.scrollTo(0, 0);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  console.log('App component rendering');

  return (
    <>
      <GlobalStyles />
      <Nav />
      <StyledMain>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </StyledMain>
    </>
  );
};

export default App;
