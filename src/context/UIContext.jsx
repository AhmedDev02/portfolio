import { createContext, useState } from "react";

export const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [eyeOpen, setEyeOpen] = useState(true);

  return (
    <UIContext.Provider value={{ eyeOpen, setEyeOpen }}>
      {children}
    </UIContext.Provider>
  );
}
