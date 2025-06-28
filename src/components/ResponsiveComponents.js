import styled from 'styled-components';

// Responsive Container Component 
export const ResponsiveContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto; 
  padding: 0 clamp(1rem, 5vw, 2rem);
  width: 100%;
`;

// Responsive Grid Component
export const ResponsiveGrid = styled.div`
  display: grid;
  gap: clamp(1rem, 4vw, 2rem);
  
  ${props => {
    if (props.columns === 2) {
      return `
        grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
      `;
    }
    if (props.columns === 3) {
      return `
        grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
      `;
    }
    if (props.columns === 4) {
      return `
        grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
      `;
    }
    return `
      grid-template-columns: 1fr;
    `;
  }}
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: clamp(1rem, 3vw, 1.5rem);
  }
`;

// Responsive Text Component
export const ResponsiveText = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  line-height: 1.6;
  color: ${props => props.color || 'var(--text-primary)'};
  margin-bottom: ${props => props.mb || '1rem'};
  
  @media (max-width: 480px) {
    line-height: 1.5;
  }
`;

// Responsive Heading Component
export const ResponsiveHeading = styled.h2`
  font-size: clamp(${props => props.size === 'large' ? '2.5rem, 6vw, 3.5rem' : '2rem, 5vw, 2.8rem'});
  line-height: 1.2;
  color: ${props => props.color || 'var(--text-primary)'};
  font-family: 'Orbitron', sans-serif;
  margin-bottom: ${props => props.mb || '2rem'};
  text-align: ${props => props.center ? 'center' : 'left'};
  
  @media (max-width: 768px) {
    text-align: ${props => props.center ? 'center' : 'left'};
  }
`;

// Responsive Section Component
export const ResponsiveSection = styled.section`
  padding: clamp(4rem, 10vh, 8rem) 0;
  position: relative;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: clamp(3rem, 8vh, 6rem) 0;
  }
  
  ${props => props.minHeight && `
    min-height: 100vh;
    
    @media (max-width: 768px) {
      min-height: auto;
    }
  `}
`;

// Responsive Card Component
export const ResponsiveCard = styled.div`
  background: rgba(10, 10, 15, 0.8);
  border-radius: clamp(12px, 2vw, 20px);
  padding: clamp(1.5rem, 4vw, 2rem);
  border: 1px solid rgba(8, 247, 254, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(8, 247, 254, 0.2);
    border-color: var(--neon-blue);
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 16px rgba(8, 247, 254, 0.15);
    }
  }
  
  @media (max-width: 480px) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(8, 247, 254, 0.1);
    }
  }
`;

// Responsive Button Component
export const ResponsiveButton = styled.button`
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem);
  font-size: clamp(0.9rem, 2.2vw, 1.1rem);
  border: 2px solid var(--neon-blue);
  background: transparent;
  color: var(--neon-blue);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    background: var(--neon-blue);
    color: var(--dark-bg);
    box-shadow: 0 0 20px rgba(8, 247, 254, 0.5);
  }
  
  @media (max-width: 480px) {
    letter-spacing: 0.5px;
  }
`;
