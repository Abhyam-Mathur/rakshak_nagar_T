import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Search, Phone, BarChart3, Clock, CheckCircle, AlertTriangle } from "lucide-react"

// Define the type for the language prop
type Language = "en" | "hi" | "bn" | "te";

// 1. Update the interface to accept the language prop
interface DashboardProps {
  onBack: () => void
  onNavigate: (screen: string) => void
  language: Language;
}

// 2. Add the translations object
const translations = {
  en: {
    title: "Citizen Dashboard",
    welcome: "Welcome, Nagar Rakshak!",
    issuesResolved: "Issues Resolved",
    inProgress: "In Progress",
    registerComplaint: "Register New Complaint",
    registerDescription: "Report civic issues in your area",
    quickSubmit: "Quick Submit",
    trackComplaint: "Track Complaint Status",
    trackDescription: "Monitor your reports progress",
    realTimeUpdates: "Real-time Updates",
    emergencyHelplines: "Emergency Helplines",
    emergencyDescription: "Important contact numbers",
    available247: "24/7 Available",
    recentActivity: "Recent Activity",
    streetLightFixed: "Street Light Fixed",
    resolved: "Resolved",
    potholeReport: "Pothole Report",
    communityImpact: "Community Impact",
    communityDescription: "Your reports have helped improve 5 civic issues this month!",
    activeCitizenBadge: "Active Citizen Badge",
  },
  hi: {
    title: "नागरिक डैशबोर्ड",
    welcome: "आपका स्वागत है, नगर रक्षक!",
    issuesResolved: "समस्याएं हल हुईं",
    inProgress: "प्रगति में",
    registerComplaint: "नई शिकायत दर्ज करें",
    registerDescription: "अपने क्षेत्र में नागरिक मुद्दों की रिपोर्ट करें",
    quickSubmit: "त्वरित सबमिट",
    trackComplaint: "शिकायत की स्थिति ट्रैक करें",
    trackDescription: "अपनी रिपोर्ट की प्रगति की निगरानी करें",
    realTimeUpdates: "वास्तविक समय अपडेट",
    emergencyHelplines: "आपातकालीन हेल्पलाइन",
    emergencyDescription: "महत्वपूर्ण संपर्क नंबर",
    available247: "24/7 उपलब्ध",
    recentActivity: "हाल की गतिविधि",
    streetLightFixed: "स्ट्रीट लाइट ठीक हो गई",
    resolved: "हल हो गई",
    potholeReport: "गड्ढे की रिपोर्ट",
    communityImpact: "सामुदायिक प्रभाव",
    communityDescription: "आपकी रिपोर्टों ने इस महीने 5 नागरिक मुद्दों को सुधारने में मदद की है!",
    activeCitizenBadge: "सक्रिय नागरिक बैज",
  },
  bn: {
    title: "নাগরিক ড্যাশবোর্ড",
    welcome: "স্বাগতম, নগর রক্ষক!",
    issuesResolved: "সমস্যা সমাধান হয়েছে",
    inProgress: "চলছে",
    registerComplaint: "নতুন অভিযোগ নথিভুক্ত করুন",
    registerDescription: "আপনার এলাকার নাগরিক সমস্যাগুলি রিপোর্ট করুন",
    quickSubmit: "দ্রুত জমা দিন",
    trackComplaint: "অভিযোগের স্থিতি ট্র্যাক করুন",
    trackDescription: "আপনার প্রতিবেদনের অগ্রগতি নিরীক্ষণ করুন",
    realTimeUpdates: "রিয়েল-টাইম আপডেট",
    emergencyHelplines: "জরুরী হেল্পলাইন",
    emergencyDescription: "গুরুত্বপূর্ণ যোগাযোগ নম্বর",
    available247: "২৪/৭ উপলব্ধ",
    recentActivity: "সাম্প্রতিক কার্যকলাপ",
    streetLightFixed: "রাস্তার আলো ঠিক করা হয়েছে",
    resolved: "সমাধান হয়েছে",
    potholeReport: "গর্তের রিপোর্ট",
    communityImpact: "সম্প্রদায়ের উপর প্রভাব",
    communityDescription: "আপনার প্রতিবেদনগুলি এই মাসে ৫টি নাগরিক সমস্যার উন্নতিতে সাহায্য করেছে!",
    activeCitizenBadge: "সক্রিয় নাগরিক ব্যাজ",
  },
  te: {
    title: "సిటిజన్ డాష్‌బోర్డ్",
    welcome: "స్వాగతం, నగర్ రక్షక్!",
    issuesResolved: "సమస్యలు పరిష్కరించబడ్డాయి",
    inProgress: "ప్రోగ్రెస్‌లో ఉంది",
    registerComplaint: "కొత్త ఫిర్యాదును నమోదు చేయండి",
    registerDescription: "మీ ప్రాంతంలోని పౌర సమస్యలను నివేదించండి",
    quickSubmit: "త్వరిత సమర్పణ",
    trackComplaint: "ఫిర్యాదు స్థితిని ట్రాక్ చేయండి",
    trackDescription: "మీ నివేదికల పురోగతిని పర్యవేక్షించండి",
    realTimeUpdates: "రియల్-టైమ్ అప్‌డేట్‌లు",
    emergencyHelplines: "అత్యవసర హెల్ప్‌లైన్‌లు",
    emergencyDescription: "ముఖ్యమైన సంప్రదింపు నంబర్లు",
    available247: "24/7 అందుబాటులో ఉంది",
    recentActivity: "ఇటీవలి కార్యాచరణ",
    streetLightFixed: "వీధి దీపం సరిదిద్దబడింది",
    resolved: "పరిష్కరించబడింది",
    potholeReport: "గుంతల నివేదిక",
    communityImpact: "కమ్యూనిటీ ప్రభావం",
    communityDescription: "మీ నివేదికలు ఈ నెలలో 5 పౌర సమస్యలను మెరుగుపరచడంలో సహాయపడ్డాయి!",
    activeCitizenBadge: "క్రియాశీల పౌర బ్యాడ్జ్",
  },
};


const Dashboard = ({ onBack, onNavigate, language }: DashboardProps) => {
  const t = translations[language]; // 3. Use the language prop for translations

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-civic-orange-light">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-civic-saffron/20">
        <div className="flex items-center justify-between p-4 max-w-md mx-auto">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">{t.title}</h1>
              <p className="text-sm text-muted-foreground">{t.welcome}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-md mx-auto space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-civic-saffron/20">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-civic-green mx-auto mb-2" />
              <p className="text-2xl font-bold text-civic-green">12</p>
              <p className="text-xs text-muted-foreground">{t.issuesResolved}</p>
            </CardContent>
          </Card>
          
          <Card className="border-civic-green/20">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-civic-saffron mx-auto mb-2" />
              <p className="text-2xl font-bold text-civic-saffron">3</p>
              <p className="text-xs text-muted-foreground">{t.inProgress}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="space-y-4">
          <Card 
            className="border-2 border-civic-saffron/20 hover:border-civic-saffron/40 transition-colors cursor-pointer transform hover:scale-[1.02] duration-200"
            onClick={() => onNavigate('complaint')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-civic-saffron to-civic-green p-4 rounded-full shadow-civic">
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{t.registerComplaint}</h3>
                  <p className="text-sm text-muted-foreground">{t.registerDescription}</p>
                  <Badge variant="outline" className="mt-2 border-civic-saffron text-civic-saffron">
                    {t.quickSubmit}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-2 border-civic-green/20 hover:border-civic-green/40 transition-colors cursor-pointer transform hover:scale-[1.02] duration-200"
            onClick={() => onNavigate('tracking')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-civic-green p-4 rounded-full shadow-success">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{t.trackComplaint}</h3>
                  <p className="text-sm text-muted-foreground">{t.trackDescription}</p>
                  <Badge variant="outline" className="mt-2 border-civic-green text-civic-green">
                    {t.realTimeUpdates}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-2 border-civic-blue/20 hover:border-civic-blue/40 transition-colors cursor-pointer transform hover:scale-[1.02] duration-200"
            onClick={() => onNavigate('helpline')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-civic-blue p-4 rounded-full">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{t.emergencyHelplines}</h3>
                  <p className="text-sm text-muted-foreground">{t.emergencyDescription}</p>
                  <Badge variant="outline" className="mt-2 border-civic-blue text-civic-blue">
                    {t.available247}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-civic-saffron/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-civic-saffron" />
              {t.recentActivity}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-civic-green/5 rounded-lg">
              <div>
                <p className="font-medium">{t.streetLightFixed}</p>
                <p className="text-sm text-muted-foreground">NGR123456 • 2 hours ago</p>
              </div>
              <Badge variant="outline" className="border-civic-green text-civic-green">{t.resolved}</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-civic-saffron/5 rounded-lg">
              <div>
                <p className="font-medium">{t.potholeReport}</p>
                <p className="text-sm text-muted-foreground">NGR123457 • 1 day ago</p>
              </div>
              <Badge variant="outline" className="border-civic-saffron text-civic-saffron">{t.inProgress}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Appreciation Section */}
        <Card className="bg-gradient-to-r from-civic-saffron/10 to-civic-green/10 border-civic-saffron/30">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-civic-saffron mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-2">{t.communityImpact}</h3>
            <p className="text-sm text-muted-foreground mb-3">
              {t.communityDescription}
            </p>
            <Badge className="bg-gradient-to-r from-civic-saffron to-civic-green text-white">
              🏆 {t.activeCitizenBadge}
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard