import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Phone, Shield, Building, HeartPulse, Sun } from "lucide-react"

type Language = "en" | "hi" | "bn" | "te";

interface HelplineNumbersProps {
  onBack: () => void;
  language: Language;
}

const translations = {
  en: {
    title: "Emergency Helplines",
    emergencyServices: "Emergency Services",
    municipalServices: "Municipal Services",
    publicUtilities: "Public Utilities",
    healthSocialServices: "Health & Social Services",
    police: "Police",
    fire: "Fire",
    ambulance: "Ambulance",
    disasterManagement: "Disaster Management",
    waterSupply: "Water Supply",
    wasteManagement: "Waste Management",
    propertyTax: "Property Tax",
    birthDeathCert: "Birth/Death Certificates",
    electricity: "Electricity",
    gasLeak: "Gas Leak",
    telecom: "Telecom Services",
    postalServices: "Postal Services",
    childHelpline: "Child Helpline",
    womenHelpline: "Women Helpline",
    seniorCitizen: "Senior Citizen Helpline",
    mentalHealth: "Mental Health Support",
  },
  hi: {
    title: "आपातकालीन हेल्पलाइन",
    emergencyServices: "आपातकालीन सेवाएं",
    municipalServices: "नगरपालिका सेवाएं",
    publicUtilities: "सार्वजनिक उपयोगिताएँ",
    healthSocialServices: "स्वास्थ्य और सामाजिक सेवाएं",
    police: "पुलिस",
    fire: "अग्नि",
    ambulance: "एम्बुलेंस",
    disasterManagement: "आपदा प्रबंधन",
    waterSupply: "जल आपूर्ति",
    wasteManagement: "अपशिष्ट प्रबंधन",
    propertyTax: " संपत्ति कर",
    birthDeathCert: "जन्म/मृत्यु प्रमाण पत्र",
    electricity: "बिजली",
    gasLeak: "गैस रिसाव",
    telecom: "दूरसंचार सेवाएं",
    postalServices: "डाक सेवाएं",
    childHelpline: "बाल हेल्पलाइन",
    womenHelpline: "महिला हेल्पलाइन",
    seniorCitizen: "वरिष्ठ नागरिक हेल्पलाइन",
    mentalHealth: "मानसिक स्वास्थ्य सहायता",
  },
  bn: {
    title: "জরুরী হেল্পলাইন",
    emergencyServices: "জরুরী পরিষেবা",
    municipalServices: "পৌরসভা পরিষেবা",
    publicUtilities: "পাবলিক ইউটিলিটিস",
    healthSocialServices: "স্বাস্থ্য ও সমাজসেবা",
    police: "পুলিশ",
    fire: "দমকল",
    ambulance: "অ্যাম্বুলেন্স",
    disasterManagement: "দুর্যোগ ব্যবস্থাপনা",
    waterSupply: "জল সরবরাহ",
    wasteManagement: "বর্জ্য ব্যবস্থাপনা",
    propertyTax: "সম্পত্তি কর",
    birthDeathCert: "জন্ম/মৃত্যু সার্টিফিকেট",
    electricity: "বিদ্যুৎ",
    gasLeak: "গ্যাস লিক",
    telecom: "টেলিকম পরিষেবা",
    postalServices: "ডাক পরিষেবা",
    childHelpline: "চাইল্ড হেল্পলাইন",
    womenHelpline: "মহিলা হেল্পলাইন",
    seniorCitizen: "সিনিয়র সিটিজেন হেল্পলাইন",
    mentalHealth: "মানসিক স্বাস্থ্য সহায়তা",
  },
  te: {
    title: "అత్యవసర హెల్ప్‌లైన్‌లు",
    emergencyServices: "అత్యవసర సేవలు",
    municipalServices: "మునిసిపల్ సేవలు",
    publicUtilities: "ప్రజా వినియోగాలు",
    healthSocialServices: "ఆరోగ్యం & సామాజిక సేవలు",
    police: "పోలీస్",
    fire: "అగ్ని",
    ambulance: "అంబులెన్స్",
    disasterManagement: "విపత్తు నిర్వహణ",
    waterSupply: "నీటి సరఫరా",
    wasteManagement: "వ్యర్థ పదార్థాల నిర్వహణ",
    propertyTax: "ఆస్తి పన్ను",
    birthDeathCert: "జనన/మరణ ధృవపత్రాలు",
    electricity: "విద్యుత్",
    gasLeak: "గ్యాస్ లీక్",
    telecom: "టెలికాం సేవలు",
    postalServices: "తపాలా సేవలు",
    childHelpline: "చైల్డ్ హెల్ప్‌లైన్",
    womenHelpline: "మహిళా హెల్ప్‌లైన్",
    seniorCitizen: "సీనియర్ సిటిజన్ హెల్ప్‌లైన్",
    mentalHealth: "మానసిక ఆరోగ్య మద్దతు",
  },
};

const HelplineNumbers = ({ onBack, language }: HelplineNumbersProps) => {
    const t = translations[language];

    const helplines = [
        {
            category: t.emergencyServices,
            icon: <Shield className="h-6 w-6 text-red-500" />,
            contacts: [
                { name: t.police, number: "100" },
                { name: t.fire, number: "101" },
                { name: t.ambulance, number: "102" },
                { name: t.disasterManagement, number: "108" },
            ]
        },
        {
            category: t.municipalServices,
            icon: <Building className="h-6 w-6 text-blue-500" />,
            contacts: [
                { name: t.waterSupply, number: "1800-425-1234" },
                { name: t.wasteManagement, number: "1800-425-5369" },
                { name: t.propertyTax, number: "1800-425-4567" },
                { name: t.birthDeathCert, number: "1800-425-4567" },
            ]
        },
        {
            category: t.publicUtilities,
            icon: <Sun className="h-6 w-6 text-yellow-500" />,
            contacts: [
                { name: t.electricity, number: "1912" },
                { name: t.gasLeak, number: "1906" },
                { name: t.telecom, number: "198" },
                { name: t.postalServices, number: "1800-266-6868" },
            ]
        },
        {
            category: t.healthSocialServices,
            icon: <HeartPulse className="h-6 w-6 text-green-500" />,
            contacts: [
                { name: t.childHelpline, number: "1098" },
                { name: t.womenHelpline, number: "1091" },
                { name: t.seniorCitizen, number: "14567" },
                { name: t.mentalHealth, number: "1800-599-0019" },
            ]
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-civic-blue-light">
          <div className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-civic-blue/20">
            <div className="flex items-center p-4 max-w-md mx-auto">
              <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold">{t.title}</h1>
            </div>
          </div>

          <div className="p-6 max-w-md mx-auto space-y-6">
            {helplines.map((group) => (
                <Card key={group.category} className="border-civic-blue/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            {group.icon}
                            {group.category}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {group.contacts.map((contact) => (
                                <li key={contact.name} className="flex items-center justify-between p-3 bg-civic-blue/5 rounded-lg">
                                    <span className="font-medium">{contact.name}</span>
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="border-civic-blue text-civic-blue hover:bg-civic-blue hover:text-white"
                                        onClick={() => window.open(`tel:${contact.number}`)}
                                    >
                                        <Phone className="h-4 w-4 mr-2" />
                                        {contact.number}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
          </div>
        </div>
    )
}

export default HelplineNumbers