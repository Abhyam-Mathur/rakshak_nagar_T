import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, Shield, Users, Phone, UserPlus, Settings } from "lucide-react";
import heroImage from "@/assets/nagar-rakshak-hero.jpg";

// 1. Update the interface to accept the new props
interface SplashScreenProps {
  onNavigate: (screen: string) => void;
  language: 'en' | 'hi' | 'bn' | 'te';
  setLanguage: (language: 'en' | 'hi' | 'bn' | 'te') => void;
}

const translations = {
    en: {
        title: "Nagar Rakshak",
        tagline: "Your Voice, Your City's Future",
        citizenPowered: "Citizen Powered",
        mobileFirst: "Mobile First",
        loginWithPhone: "Login with Phone",
        loginDescription: "Quick OTP verification",
        signup: "New Citizen Signup",
        signupDescription: "Join the movement",
        adminPortal: "Admin Portal",
        adminDescription: "Government officials",
        footer: "Empowering citizens to build better communities",
        madeFor: "Made for Digital India",
    },
    hi: {
        title: "नगर रक्षक",
        tagline: "आपकी आवाज़, आपके शहर का भविष्य",
        citizenPowered: "नागरिक संचालित",
        mobileFirst: "मोबाइल फर्स्ट",
        loginWithPhone: "फ़ोन से लॉगिन करें",
        loginDescription: "त्वरित OTP सत्यापन",
        signup: "नए नागरिक का पंजीकरण",
        signupDescription: "आंदोलन में शामिल हों",
        adminPortal: "एडमिन पोर्टल",
        adminDescription: "सरकारी अधिकारी",
        footer: "बेहतर समुदाय बनाने के लिए नागरिकों को सशक्त बनाना",
        madeFor: "डिजिटल इंडिया के लिए बनाया गया",
    },
    bn: {
        title: "নগর রক্ষক",
        tagline: "আপনার আওয়াজ, আপনার শহরের ভবিষ্যৎ",
        citizenPowered: "নাগরিক দ্বারা চালিত",
        mobileFirst: "মোবাইল ফার্স্ট",
        loginWithPhone: "ফোন দিয়ে লগইন করুন",
        loginDescription: "দ্রুত OTP যাচাই",
        signup: "নতুন নাগরিক সাইনআপ",
        signupDescription: "আন্দোলনে যোগ দিন",
        adminPortal: "অ্যাডমিন পোর্টাল",
        adminDescription: "সরকারি কর্মকর্তারা",
        footer: "উন্নত সমাজ গড়তে নাগরিকদের ক্ষমতায়ন",
        madeFor: "ডিজিটাল ইন্ডিয়ার জন্য তৈরি",
    },
    te: {
        title: "నగర్ రక్షక్",
        tagline: "మీ స్వరం, మీ నగరం యొక్క భవిష్యత్తు",
        citizenPowered: "పౌర శక్తి",
        mobileFirst: "మొబైల్ ఫస్ట్",
        loginWithPhone: "ఫోన్‌తో లాగిన్ అవ్వండి",
        loginDescription: "త్వరిత OTP ధృవీకరణ",
        signup: "కొత్త పౌరసత్వం సైన్అప్",
        signupDescription: "ఉద్యమంలో చేరండి",
        adminPortal: "అడ్మిన్ పోర్టల్",
        adminDescription: "ప్రభుత్వ అధికారులు",
        footer: "మెరుగైన సమాజాలను నిర్మించడానికి పౌరులను శక్తివంతం చేయడం",
        madeFor: "డిజిటల్ ఇండియా కోసం తయారు చేయబడింది",
    },
};

const SplashScreen = ({ onNavigate, language, setLanguage }: SplashScreenProps) => {
  // 2. Remove the local state - we now use the props from Index.tsx
  // const [language, setLanguage] = useState<'en' | 'hi' | 'bn' | 'te'>("en");

  return (
    <div className="min-h-screen bg-gradient-to-br from-civic-orange-light via-background to-civic-green-light">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
        <img 
          src={heroImage} 
          alt="Nagar Rakshak - Digital Civic Engagement" 
          className="w-full h-64 md:h-80 object-cover"
        />
        
        <div className="absolute top-4 right-4 z-10">
          <Select
            defaultValue={language}
            onValueChange={(value: "en" | "hi" | "bn" | "te") => setLanguage(value)}
          >
            <SelectTrigger className="w-32 bg-white/90 border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी</SelectItem>
              <SelectItem value="bn">বাংলা</SelectItem>
              <SelectItem value="te">తెలుగు</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-civic-saffron to-civic-green p-4 rounded-full shadow-civic">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-civic-saffron to-civic-green bg-clip-text text-transparent mb-2">
            {translations[language].title}
          </h1>
          
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            {translations[language].tagline}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Badge variant="outline" className="border-civic-saffron text-civic-saffron">
              <Users className="h-3 w-3 mr-1" />
              {translations[language].citizenPowered}
            </Badge>
            <Badge variant="outline" className="border-civic-green text-civic-green">
              <Smartphone className="h-3 w-3 mr-1" />
              {translations[language].mobileFirst}
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-8">
          <Card className="border-2 border-civic-saffron/20 hover:border-civic-saffron/40 transition-colors cursor-pointer"
                onClick={() => onNavigate('login')}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-civic-saffron/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-civic-saffron" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{translations[language].loginWithPhone}</h3>
                  <p className="text-sm text-muted-foreground">{translations[language].loginDescription}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-civic-green/20 hover:border-civic-green/40 transition-colors cursor-pointer"
                onClick={() => onNavigate('signup')}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-civic-green/10 p-3 rounded-full">
                  <UserPlus className="h-6 w-6 text-civic-green" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{translations[language].signup}</h3>
                  <p className="text-sm text-muted-foreground">{translations[language].signupDescription}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-civic-blue/20 hover:border-civic-blue/40 transition-colors cursor-pointer"
                onClick={() => onNavigate('admin')}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-civic-blue/10 p-3 rounded-full">
                  <Settings className="h-6 w-6 text-civic-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{translations[language].adminPortal}</h3>
                  <p className="text-sm text-muted-foreground">{translations[language].adminDescription}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>{translations[language].footer}</p>
          <p className="mt-2 text-xs">🇮🇳 {translations[language].madeFor}</p>
        </div>
      </div>
    </div>
  )
};

export default SplashScreen;