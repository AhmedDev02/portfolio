import { createContext, useState } from "react";

export const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [eyeOpen, setEyeOpen] = useState(false);

  return (
    <UIContext.Provider value={{ eyeOpen, setEyeOpen }}>
      {children}
    </UIContext.Provider>
  );
}
