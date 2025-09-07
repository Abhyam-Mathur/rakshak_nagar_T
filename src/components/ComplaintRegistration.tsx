import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Camera, MapPin, Send, CheckCircle, LoaderCircle, Mic, StopCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { cn } from "@/lib/utils"

type Language = "en" | "hi" | "bn" | "te";

// 1. Update the interface to accept the language prop
interface ComplaintRegistrationProps {
  onBack: () => void;
  language: Language;
}

// 2. Add the translations object
const translations = {
  en: {
    title: "Register New Complaint",
    issueDetails: "Issue Details",
    issueTypeLabel: "Issue Type *",
    issueTypePlaceholder: "Select issue type",
    stateLabel: "State / UT *",
    statePlaceholder: "Select your state",
    cityLabel: "City / District *",
    cityPlaceholder: "Enter city or district",
    uploadPhotoLabel: "Upload Photo (Optional)",
    uploadPhotoAction: "Tap to add photo",
    aiDescription: "AI will generate a description for you",
    recordAudioLabel: "Record Audio Description (Optional)",
    descriptionLabel: "Detailed Description *",
    descriptionPlaceholder: "Describe the issue, let AI do it for you, or record a voice note.",
    submitButton: "Submit Report",
    submittingButton: "Submitting...",
    successTitle: "Report Submitted Successfully! 🎉",
    complaintIdLabel: "Your Complaint ID",
    responsibleCitizen: "🙏 You are a Responsible Citizen of India",
    trulyNagarRakshak: "Truly a Nagar Rakshak!",
    trackButton: "Track This Complaint",
    newComplaintButton: "Register New Complaint",
  },
  hi: {
    title: "नई शिकायत दर्ज करें",
    issueDetails: "समस्या का विवरण",
    issueTypeLabel: "समस्या का प्रकार *",
    issueTypePlaceholder: "समस्या का प्रकार चुनें",
    stateLabel: "राज्य / केंद्र शासित प्रदेश *",
    statePlaceholder: "अपना राज्य चुनें",
    cityLabel: "शहर / जिला *",
    cityPlaceholder: "शहर या जिला दर्ज करें",
    uploadPhotoLabel: "फोटो अपलोड करें (वैकल्पिक)",
    uploadPhotoAction: "फोटो जोड़ने के लिए टैप करें",
    aiDescription: "AI आपके लिए विवरण तैयार करेगा",
    recordAudioLabel: "ऑडियो विवरण रिकॉर्ड करें (वैकल्पिक)",
    descriptionLabel: "विस्तृत विवरण *",
    descriptionPlaceholder: "समस्या का वर्णन करें, AI को आपके लिए करने दें, या वॉयस नोट रिकॉर्ड करें।",
    submitButton: "रिपोर्ट सबमिट करें",
    submittingButton: "सबमिट हो रहा है...",
    successTitle: "रिपोर्ट सफलतापूर्वक सबमिट हुई! 🎉",
    complaintIdLabel: "आपकी शिकायत आईडी",
    responsibleCitizen: "🙏 आप भारत के एक जिम्मेदार नागरिक हैं",
    trulyNagarRakshak: "वास्तव में एक नगर रक्षक!",
    trackButton: "इस शिकायत को ट्रैक करें",
    newComplaintButton: "नई शिकायत दर्ज करें",
  },
  bn: {
    title: "নতুন অভিযোগ নথিভুক্ত করুন",
    issueDetails: "সমস্যার বিবরণ",
    issueTypeLabel: "সমস্যার প্রকার *",
    issueTypePlaceholder: "সমস্যার প্রকার নির্বাচন করুন",
    stateLabel: "রাজ্য / কেন্দ্রশাসিত অঞ্চল *",
    statePlaceholder: "আপনার রাজ্য নির্বাচন করুন",
    cityLabel: "শহর / জেলা *",
    cityPlaceholder: "শহর বা জেলা লিখুন",
    uploadPhotoLabel: "ছবি আপলোড করুন (ঐচ্ছিক)",
    uploadPhotoAction: "ছবি যোগ করতে আলতো চাপুন",
    aiDescription: "AI আপনার জন্য একটি বিবরণ তৈরি করবে",
    recordAudioLabel: "অডিও বিবরণ রেকর্ড করুন (ঐচ্ছিক)",
    descriptionLabel: "বিস্তারিত বিবরণ *",
    descriptionPlaceholder: "সমস্যাটি বর্ণনা করুন, AI কে আপনার জন্য করতে দিন, অথবা একটি ভয়েস নোট রেকর্ড করুন।",
    submitButton: "রিপোর্ট জমা দিন",
    submittingButton: "জমা দেওয়া হচ্ছে...",
    successTitle: "রিপোর্ট সফলভাবে জমা হয়েছে! 🎉",
    complaintIdLabel: "আপনার অভিযোগ আইডি",
    responsibleCitizen: "🙏 আপনি ভারতের একজন দায়িত্বশীল নাগরিক",
    trulyNagarRakshak: "সত্যিই একজন নগর রক্ষক!",
    trackButton: "এই অভিযোগ ট্র্যাক করুন",
    newComplaintButton: "নতুন অভিযোগ নথিভুক্ত করুন",
  },
  te: {
    title: "కొత్త ఫిర్యాదును నమోదు చేయండి",
    issueDetails: "సమస్య వివరాలు",
    issueTypeLabel: "సమస్య రకం *",
    issueTypePlaceholder: "సమస్య రకాన్ని ఎంచుకోండి",
    stateLabel: "రాష్ట్రం / యుటి *",
    statePlaceholder: "మీ రాష్ట్రాన్ని ఎంచుకోండి",
    cityLabel: "నగరం / జిల్లా *",
    cityPlaceholder: "నగరం లేదా జిల్లాను నమోదు చేయండి",
    uploadPhotoLabel: "ఫోటోను అప్‌లోడ్ చేయండి (ఐచ్ఛికం)",
    uploadPhotoAction: "ఫోటోను జోడించడానికి నొక్కండి",
    aiDescription: "AI మీ కోసం ఒక వివరణను ఉత్పత్తి చేస్తుంది",
    recordAudioLabel: "ఆడియో వివరణను రికార్డ్ చేయండి (ఐచ్ఛికం)",
    descriptionLabel: "వివరణాత్మక వివరణ *",
    descriptionPlaceholder: "సమస్యను వివరించండి, AI మీ కోసం చేయనివ్వండి, లేదా వాయిస్ నోట్ రికార్డ్ చేయండి.",
    submitButton: "నివేదికను సమర్పించండి",
    submittingButton: "సమర్పిస్తోంది...",
    successTitle: "నివేదిక విజయవంతంగా సమర్పించబడింది! 🎉",
    complaintIdLabel: "మీ ఫిర్యాదు ID",
    responsibleCitizen: "🙏 మీరు భారతదేశ బాధ్యతాయుతమైన పౌరులు",
    trulyNagarRakshak: "నిజంగా ఒక నగర్ రక్షక్!",
    trackButton: "ఈ ఫిర్యాదును ట్రాక్ చేయండి",
    newComplaintButton: "కొత్త ఫిర్యాదును నమోదు చేయండి",
  },
};

const ComplaintRegistration = ({ onBack, language }: ComplaintRegistrationProps) => {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [complaintId, setComplaintId] = useState<string>('')
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const t = translations[language]; // 3. Use the language prop for translations

  const [formData, setFormData] = useState({
    state: '',
    city: '',
    issueType: '',
    description: '',
    media: null as File | null
  })

  const issueTypes = [
    { value: 'streetlight', label: '🔦 Street Light Issues', category: 'Infrastructure' },
    { value: 'pothole', label: '🕳️ Pothole/Road Damage', category: 'Roads' },
    { value: 'garbage', label: '🗑️ Garbage Collection', category: 'Sanitation' },
    { value: 'drainage', label: '🌊 Drainage Problems', category: 'Water' },
    { value: 'water', label: '💧 Water Supply Issues', category: 'Water' },
    { value: 'electricity', label: '⚡ Power Outage', category: 'Utilities' },
    { value: 'noise', label: '🔊 Noise Pollution', category: 'Environment' },
    { value: 'others', label: '📝 Other Issues', category: 'General' }
  ]

  const states = [
    'Andhra Pradesh', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Gujarat', 
    'Rajasthan', 'West Bengal', 'Delhi', 'Others'
  ]


  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!formData.issueType) {
        toast({
            title: "Please select an issue type first",
            description: "The AI needs to know what kind of issue to look for.",
            variant: "destructive"
        });
        e.target.value = '';
        return;
    }

    setFormData(prev => ({ ...prev, media: file, description: '' }));
    setIsAnalyzing(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
        const base64data = reader.result?.toString().split(',')[1];

        try {
            const { data, error } = await supabase.functions.invoke('analyze-complaint-image', {
                body: { imageData: base64data, issueType: formData.issueType },
            });

            if (error) throw error;
            
            if (data.is_relevant) {
                setFormData(prev => ({ ...prev, description: data.description }));
                toast({
                    title: "Image Analyzed Successfully",
                    description: "An AI-generated description has been added.",
                });
            } else {
                setFormData(prev => ({ ...prev, media: null }));
                e.target.value = '';
                toast({
                    title: "Irrelevant Image Detected",
                    description: data.reason || "Please upload an image related to the selected issue.",
                    variant: "destructive"
                });
            }
        } catch (err) {
            console.error('Error analyzing image:', err);
            toast({
                title: "AI Analysis Failed",
                description: "Could not analyze the image. Please write a description manually.",
                variant: "destructive"
            });
        } finally {
            setIsAnalyzing(false);
        }
    };
  };

  const handleToggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          setAudioBlob(event.data);
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
        toast({ title: "Recording started..." });
      } catch (error) {
        console.error("Error accessing microphone:", error);
        toast({
          title: "Microphone access denied",
          description: "Please allow microphone access to record audio.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async () => {
    if (!formData.state || !formData.city || !formData.issueType || (!formData.description && !audioBlob)) {
        toast({
          title: "Missing Information",
          description: "Please fill all required fields or provide a voice note.",
          variant: "destructive"
        })
        return
      }
      setIsSubmitting(true);
      try {
        let mediaUrl = null
  
        if (formData.media) {
          const fileExt = formData.media.name.split('.').pop()
          const fileName = `${Date.now()}.${fileExt}`
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('complaints')
            .upload(fileName, formData.media)
  
          if (uploadError) throw uploadError
          
          const { data: { publicUrl } } = supabase.storage
            .from('complaints')
            .getPublicUrl(fileName)
          
          mediaUrl = publicUrl
        }

        let voiceNoteUrl = null;
        if (audioBlob) {
            const fileName = `${Date.now()}.webm`;
            const { error: uploadError } = await supabase.storage
              .from('complaints')
              .upload(fileName, audioBlob);
            if (uploadError) throw uploadError;
            const { data: { publicUrl } } = supabase.storage
              .from('complaints')
              .getPublicUrl(fileName);
            voiceNoteUrl = publicUrl;
        }
  
        const { data, error } = await supabase
          .from('complaints')
          .insert({
            state: formData.state,
            city: formData.city, 
            issue_type: formData.issueType,
            description: formData.description,
            media_url: mediaUrl,
            voice_note_url: voiceNoteUrl
          } as any)
          .select('complaint_code')
          .single()
  
        if (error) throw error
  
        setComplaintId(data.complaint_code)
        setStep('success')
        
        toast({
          title: "Report Submitted Successfully! 🎉",
          description: `Complaint ID: ${data.complaint_code}`,
          variant: "default"
        })
      } catch (error) {
        console.error('Error submitting complaint:', error)
        toast({
          title: "Submission Failed",
          description: "Please try again later",
          variant: "destructive"
        })
      } finally {
          setIsSubmitting(false);
      }
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-civic-green-light to-background p-6">
        <div className="max-w-md mx-auto pt-8">
          <Card className="border-civic-green border-2 shadow-success">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <CheckCircle className="h-20 w-20 text-civic-green mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-civic-green mb-2">
                  {t.successTitle}
                </h2>
              </div>

              <div className="bg-civic-green/10 rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-2">{t.complaintIdLabel}</p>
                <p className="text-2xl font-bold text-civic-green font-mono">{complaintId}</p>
              </div>

              <div className="bg-gradient-to-r from-civic-saffron/10 to-civic-green/10 rounded-lg p-4 mb-6">
                <p className="font-semibold text-civic-saffron text-lg mb-2">
                  {t.responsibleCitizen}
                </p>
                <p className="font-bold text-civic-green">
                  {t.trulyNagarRakshak}
                </p>
              </div>

              <div className="space-y-3">
                <Button 
                  variant="default"
                  size="lg" 
                  className="w-full"
                  onClick={() => onBack()}
                >
                  {t.trackButton}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={() => {
                    setStep('form')
                    setFormData({
                      state: '',
                      city: '',
                      issueType: '',
                      description: '',
                      media: null
                    })
                  }}
                >
                  {t.newComplaintButton}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-civic-orange-light to-background">
      <div className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-civic-saffron/20">
        <div className="flex items-center p-4 max-w-md mx-auto">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">{t.title}</h1>
        </div>
      </div>

      <div className="p-6 max-w-md mx-auto">
        <Card className="shadow-lg border-civic-saffron/20">
          <CardHeader className="bg-gradient-to-r from-civic-saffron/5 to-civic-green/5">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-civic-saffron" />
              {t.issueDetails}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
               <div>
                <Label htmlFor="issueType">{t.issueTypeLabel}</Label>
                <Select value={formData.issueType} onValueChange={(value) => setFormData(prev => ({...prev, issueType: value}))}>
                  <SelectTrigger id="issueType">
                    <SelectValue placeholder={t.issueTypePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {issueTypes.map(issue => (
                      <SelectItem key={issue.value} value={issue.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{issue.label}</span>
                          <Badge variant="secondary" className="ml-2">{issue.category}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="state">{t.stateLabel}</Label>
                <Select value={formData.state} onValueChange={(value) => setFormData(prev => ({...prev, state: value}))}>
                  <SelectTrigger id="state">
                    <SelectValue placeholder={t.statePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="city">{t.cityLabel}</Label>
                <Input
                  id="city" 
                  placeholder={t.cityPlaceholder}
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({...prev, city: e.target.value}))}
                />
              </div>
            </div>

            <div>
              <Label>{t.uploadPhotoLabel}</Label>
              <div className="border-2 border-dashed border-civic-saffron/30 rounded-lg p-4 text-center hover:border-civic-saffron/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMediaUpload}
                  className="hidden"
                  id="media-upload"
                  disabled={isAnalyzing}
                />
                <label htmlFor="media-upload" className={cn("cursor-pointer", isAnalyzing && "cursor-not-allowed")}>
                  {isAnalyzing ? (
                      <LoaderCircle className="h-8 w-8 text-civic-saffron mx-auto mb-2 animate-spin" />
                  ) : (
                      <Camera className="h-8 w-8 text-civic-saffron mx-auto mb-2" />
                  )}
                  <p className="text-sm text-muted-foreground">
                    {isAnalyzing ? "Analyzing..." : formData.media ? formData.media.name : t.uploadPhotoAction}
                  </p>
                  <p className="text-xs text-civic-saffron mt-1">{t.aiDescription}</p>
                </label>
              </div>
            </div>

            <div>
              <Label>{t.recordAudioLabel}</Label>
              <div className="flex items-center gap-4">
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  size="icon"
                  onClick={handleToggleRecording}
                >
                  {isRecording ? <StopCircle /> : <Mic />}
                </Button>
                {audioBlob && (
                  <audio src={URL.createObjectURL(audioBlob)} controls className="w-full" />
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="description">{t.descriptionLabel}</Label>
              <Textarea
                id="description"
                placeholder={isAnalyzing ? "AI is analyzing the image..." : t.descriptionPlaceholder}
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                disabled={isAnalyzing}
              />
            </div>

            <Button 
              size="xl" 
              className="w-full"
              onClick={handleSubmit}
              disabled={isSubmitting || isAnalyzing || isRecording}
            >
              {isSubmitting ? <LoaderCircle className="animate-spin mr-2" /> : <Send className="h-5 w-5 mr-2" />}
              {isSubmitting ? t.submittingButton : t.submitButton}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ComplaintRegistration;