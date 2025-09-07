import { useState } from "react";
import SplashScreen from "../components/SplashScreen.tsx";
import Dashboard from "../components/Dashboard.tsx";
import ComplaintRegistration from "../components/ComplaintRegistration.tsx";
import ComplaintTracking from "../components/ComplaintTracking.tsx";
import HelplineNumbers from "../components/HelplineNumbers.tsx";
import AdminPortal from "../components/AdminPortal.tsx";
import Signup from "../components/Signup.tsx";
import { useLanguage } from "../contexts/LanguageContext.tsx";

// Pure helper so we can unit-test the back-navigation logic
export const nextScreenAfterBack = (current: string): 'dashboard' | 'splash' => {
  return (['complaint', 'tracking', 'helpline', 'signup', 'login'].includes(current))
    ? 'dashboard'
    : 'splash';
};

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('splash');
  const { language, setLanguage } = useLanguage();

  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    setCurrentScreen(nextScreenAfterBack(currentScreen));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onNavigate={handleNavigation} language={language} setLanguage={setLanguage} />;

      case 'login':
      case 'signup':
        return <Signup onBack={() => setCurrentScreen('splash')} onNavigate={handleNavigation} language={language} />;

      case 'dashboard':
        return <Dashboard onBack={handleBack} onNavigate={handleNavigation} language={language} />;

      case 'complaint':
        // Pass the dynamic language state
        return <ComplaintRegistration onBack={handleBack} language={language} />;

      case 'tracking':
        // Pass the language prop
        return <ComplaintTracking onBack={handleBack} language={language} />;

      case 'helpline':
         // Pass the language prop
        return <HelplineNumbers onBack={handleBack} language={language} />;

      case 'admin':
        return <AdminPortal onBack={handleBack} />;

      default:
        return <SplashScreen onNavigate={handleNavigation} language={language} setLanguage={setLanguage} />;
    }
  };

  return <div className="min-h-screen">{renderScreen()}</div>;
};

export default Index;

// ------------------------
// Lightweight test cases
// ------------------------
// We run these only in dev to avoid any prod overhead.
// If your bundler doesn't define process.env, this block will be skipped.
if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production') {
  // Back navigation should return 'dashboard' from these screens
  console.assert(nextScreenAfterBack('complaint') === 'dashboard', 'Back from complaint should go to dashboard');
  console.assert(nextScreenAfterBack('tracking') === 'dashboard', 'Back from tracking should go to dashboard');
  console.assert(nextScreenAfterBack('helpline') === 'dashboard', 'Back from helpline should go to dashboard');
  console.assert(nextScreenAfterBack('signup') === 'dashboard', 'Back from signup should go to dashboard');
  console.assert(nextScreenAfterBack('login') === 'dashboard', 'Back from login should go to dashboard');

  // Any other/unknown screen should go to splash
  console.assert(nextScreenAfterBack('admin') === 'splash', 'Back from admin should go to splash');
  console.assert(nextScreenAfterBack('unknown') === 'splash', 'Back from unknown should go to splash');
}