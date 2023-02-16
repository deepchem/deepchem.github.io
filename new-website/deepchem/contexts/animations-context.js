import { createContext, useState } from "react";

/** AnimationsContext to manage animation state throughout the application
 * @function
 */
export const AnimationsContext = createContext({
  isAnimationsEnabled: false,
  setIsAnimationsEnabled: () => null,
});

/** AnimationsProvider component to allow components to subscribe to animation context changes
 * @component
 * @param {props.children} - Children passed to the Provider
 * @return {React.Provider} - Provider for the AnimationsContext
 */
export const AnimationsProvider = ({ children }) => {
  const [isAnimationsEnabled, setIsAnimationsEnabled] = useState(false);

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
