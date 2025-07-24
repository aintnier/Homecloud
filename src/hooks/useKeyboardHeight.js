import { useState, useEffect } from "react";

export const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.visualViewport) {
        const heightDiff = window.screen.height - window.visualViewport.height;
        setKeyboardHeight(heightDiff);
        setIsKeyboardVisible(heightDiff > 150);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
      return () => {
        window.visualViewport.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return { keyboardHeight, isKeyboardVisible };
};
