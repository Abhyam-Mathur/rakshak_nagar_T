import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the type for the language prop
type Language = "en" | "hi" | "bn" | "te";

// 1. Update the interface to accept the new prop
interface SignupProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
  language: Language;
}

const translations = {
    en: {
        title: "Citizen Signup / Login",
        welcome: "Welcome to Nagar Rakshak",
        phoneLabel: "Phone Number",
        phonePlaceholder: "Enter your 10-digit number",
        sendOtp: "Send OTP",
        sendingOtp: "Sending OTP...",
        otpLabel: "Enter OTP",
        otpPlaceholder: "Enter the 6-digit code",
        verify: "Verify & Proceed",
        verifying: "Verifying...",
    },
    hi: {
        title: "नागरिक पंजीकरण / लॉगिन",
        welcome: "नगर रक्षक में आपका स्वागत है",
        phoneLabel: "फ़ोन नंबर",
        phonePlaceholder: "अपना 10 अंकों का नंबर दर्ज करें",
        sendOtp: "OTP भेजें",
        sendingOtp: "OTP भेजा जा रहा है...",
        otpLabel: "OTP दर्ज करें",
        otpPlaceholder: "6 अंकों का कोड दर्ज करें",
        verify: "सत्यापित करें और आगे बढ़ें",
        verifying: "सत्यापित हो रहा है...",
    },
    bn: {
        title: "নাগরিক সাইনআপ / লগইন",
        welcome: "নগর রক্ষক-এ স্বাগতম",
        phoneLabel: "ফোন নম্বর",
        phonePlaceholder: "আপনার ১০-সংখ্যার নম্বর লিখুন",
        sendOtp: "OTP পাঠান",
        sendingOtp: "OTP পাঠানো হচ্ছে...",
        otpLabel: "OTP লিখুন",
        otpPlaceholder: "৬-সংখ্যার কোড লিখুন",
        verify: "যাচাই করুন এবং এগিয়ে যান",
        verifying: "যাচাই করা হচ্ছে...",
    },
    te: {
        title: "పౌర సైన్అప్ / లాగిన్",
        welcome: "నగర్ రక్షక్‌కు స్వాగతం",
        phoneLabel: "ఫోన్ నంబర్",
        phonePlaceholder: "మీ 10-అంకెల నంబర్‌ను నమోదు చేయండి",
        sendOtp: "OTP పంపండి",
        sendingOtp: "OTP పంపుతోంది...",
        otpLabel: "OTP నమోదు చేయండి",
        otpPlaceholder: "6-అంకెల కోడ్‌ను నమోదు చేయండి",
        verify: "ధృవీకరించి కొనసాగండి",
        verifying: "ధృవీకరిస్తోంది...",
    },
};

const Signup = ({ onBack, onNavigate, language }: SignupProps) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const { toast } = useToast();
  
  const t = translations[language];

  const handleSendOtp = async () => {
    if (!/^\d{10}$/.test(phone)) {
      toast({ title: "Invalid Phone Number", description: "Please enter a valid 10-digit phone number.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: `+91${phone}`,
      });
      if (error) throw error;
      setOtpSent(true);
      toast({ title: "OTP Sent!", description: "Check your phone for the verification code." });
    } catch (error) {
      toast({ title: "Error Sending OTP", description: (error as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!/^\d{6}$/.test(otp)) {
      toast({ title: "Invalid OTP", description: "Please enter the 6-digit OTP.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: `+91${phone}`,
        token: otp,
        type: 'sms'
      });
      if (error) throw error;

      if(data.session) {
        toast({ title: "Login Successful!", description: "Welcome to Nagar Rakshak." });
        onNavigate('dashboard');
      } else {
         throw new Error("Could not verify OTP. Please try again.");
      }
    } catch (error) {
      toast({ title: "Verification Failed", description: (error as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-civic-orange-light to-background">
      <div className="flex items-center p-4 max-w-md mx-auto">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">{t.title}</h1>
      </div>

      <div className="p-6 max-w-md mx-auto">
        <Card className="shadow-lg border-civic-saffron/20">
          <CardHeader>
            <CardTitle className="text-center">{t.welcome}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!otpSent ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone">{t.phoneLabel}</Label>
                  <Input
                    id="phone"
                    placeholder={t.phonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                  />
                </div>
                <Button onClick={handleSendOtp} disabled={loading} className="w-full" variant="civic">
                  {loading ? t.sendingOtp : t.sendOtp}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="otp">{t.otpLabel}</Label>
                  <Input
                    id="otp"
                    placeholder={t.otpPlaceholder}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <Button onClick={handleVerifyOtp} disabled={loading} className="w-full" variant="civic">
                  <LogIn className="h-4 w-4 mr-2" />
                  {loading ? t.verifying : t.verify}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;