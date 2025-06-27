import { useState, useEffect, memo } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeOut = keyframes`
  from {
    opacity: 1;
    visibility: visible;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #161b33 50%, #1a1a2e 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.8s ease-out, visibility 0.8s ease-out;
  
  ${props => props.$isLoading === false && `
    animation: ${fadeOut} 0.8s ease-out forwards;
  `}

  /* Grid lines background */
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
`;

const LoadingContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${slideUp} 1s ease-out;
`;

const LoadingSpinner = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid rgba(8, 247, 254, 0.2);
  border-top: 3px solid #08f7fe;
  animation: ${rotate} 1s linear infinite;
  margin-bottom: 2rem;
  box-shadow: 0 0 30px rgba(8, 247, 254, 0.3);
`;

const LoadingText = styled.div`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.5rem;
  animation: ${pulse} 2s ease-in-out infinite;
  font-family: 'Orbitron', sans-serif;
  text-shadow: 0 0 20px rgba(8, 247, 254, 0.5);
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const LoadingSubText = styled.div`
  color: rgba(8, 247, 254, 0.8);
  font-size: 1rem;
  font-weight: 300;
  text-align: center;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 2rem;
  font-family: 'Poppins', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    letter-spacing: 2px;
  }
`;

const ProgressBarContainer = styled.div`
  width: 300px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  
  @media (max-width: 480px) {
    width: 250px;
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${props => props.$progress}%;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 2px;
  transition: width 0.3s ease;
  box-shadow: 0 0 10px rgba(8, 247, 254, 0.6);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 100%;
    animation: ${rotate} 1s linear infinite;
    
  }
`;

const ProgressText = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-family: 'Orbitron', sans-serif;
  margin-top: 1rem;
  text-align: center;
`;

const Loading = ({ onLoadComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    const loadingTexts = ['Loading', 'Initializing', 'Preparing Experience', 'Almost Ready'];
    let textIndex = 0;

    // Text cycling animation
    const textInterval = setInterval(() => {
      setLoadingText(loadingTexts[textIndex]);
      textIndex = (textIndex + 1) % loadingTexts.length;
    }, 600);

    // Simulate realistic loading progress with more efficient updates
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 15 + 5;
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(progressInterval);
      } else {
        setProgress(Math.min(currentProgress, 100));
      }
    }, 200);

    // Minimum loading time for smooth UX
    const minLoadTime = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          onLoadComplete();
        }, 8); 
      }, 500);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
      clearTimeout(minLoadTime);
    };
  }, [onLoadComplete]);

  // Remove component from DOM after animation completes
  if (!isLoading && progress === 100) {
    return null;
  }

  return (
    <LoadingContainer $isLoading={isLoading}>
      <LoadingContent>
        <LoadingSpinner />
        <LoadingText>{loadingText}</LoadingText>
        <LoadingSubText>Welcome to my Portfolio</LoadingSubText>
        <ProgressBarContainer>
          <ProgressBar $progress={progress} />
        </ProgressBarContainer>
        <ProgressText>{Math.round(progress)}%</ProgressText>
      </LoadingContent>
    </LoadingContainer>
  );
};

export default memo(Loading);
