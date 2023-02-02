import { createContext, useState } from "react";

export const AnimationsContext = createContext({
  isAnimationsEnabled: true,
  setIsAnimationsEnabled: () => null,
});

export const AnimationsProvider = ({ children }) => {
  const [isAnimationsEnabled, setIsAnimationsEnabled] = useState(true);

  const value = {
    isAnimationsEnabled,
    setIsAnimationsEnabled,
  };

  return (
    <AnimationsContext.Provider value={value}>
      {children}
    </AnimationsContext.Provider>
  );
};
