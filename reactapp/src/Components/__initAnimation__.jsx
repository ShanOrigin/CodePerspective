import { useEffect, useRef, useState } from 'react';
import useAnimation from '../Hooks/useAnimation';

const InitAnimation = (props) => {
  const imported = useRef(false);
  const Animation = useRef(null);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0); // State to track remaining seconds

  const startAnimation = async () => {
    if (Animation.current && Animation.current[0]) {
      const [AnimaterFunction, id, AnimationFunction, name, type] =
        Animation.current;
      if (AnimaterFunction) {
        try {
          await AnimaterFunction(id, AnimationFunction, name, type);
          console.log('Animation executed successfully');
        } catch (error) {
          console.error('Error during animation execution:', error);
        }
      } else {
        console.error('AnimaterFunction is undefined or invalid');
      }
    } else {
      console.warn('Animation data is not available');
    }
  };

  const startCountdown = (seconds) => {
    setCountdown(seconds);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setButtonDisabled(false); // Re-enable the button after countdown
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const importAnimation = async () => {
    if (!imported.current) {
      try {
        const animations = await useAnimation('CreationArray'); // Import animations
        if (animations?.length > 0) {
          Animation.current = animations; // Store animations
          imported.current = true; // Mark as imported
          console.log('Animations imported successfully:', Animation.current);
          setButtonDisabled(true);
          await startAnimation(); // Start the animation
          startCountdown(10); // Start 10-second countdown
        } else {
          console.warn('No animations found');
        }
      } catch (error) {
        console.error('Error importing animations:', error);
      }
    } else {
      console.log('Animations already imported');
      setButtonDisabled(true);
      await startAnimation(); // If already imported, just start the animation
      startCountdown(10); // Start 10-second countdown
    }
  };

  return (
    <>
      <div id="Animation-Canvas"></div>
      <button
        id="CreationArray"
        onClick={importAnimation}
        disabled={isButtonDisabled}
      >
        {isButtonDisabled
          ? `Please Wait... (${countdown}s)`
          : 'Start Animation'}
      </button>
    </>
  );
};

export default InitAnimation;
