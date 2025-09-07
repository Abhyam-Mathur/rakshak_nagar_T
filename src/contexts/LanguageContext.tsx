import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context data
type LanguageContextType = {
  language: 'en' | 'hi' | 'bn' | 'te';
  setLanguage: (language: 'en' | 'hi' | 'bn' | 'te') => void;
};

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create a provider component that will wrap our app
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'hi' | 'bn' | 'te'>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a custom hook to easily use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};