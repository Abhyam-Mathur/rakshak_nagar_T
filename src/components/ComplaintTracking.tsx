import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Search, Clock, CheckCircle, User, MapPin, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

type Language = "en" | "hi" | "bn" | "te";

// 1. Update the interface to accept the language prop
interface ComplaintTrackingProps {
  onBack: () => void;
  language: Language;
}

// 2. Create the translations object
const translations = {
  en: {
    title: "Track Complaint",
    searchTitle: "Enter Complaint ID",
    complaintIdLabel: "Complaint ID",
    complaintIdPlaceholder: "e.g., NGR123456",
    trackButton: "Track Status",
    searchingButton: "Searching...",
    timelineTitle: "Status Timeline",
    assignedAuthority: "Assigned Authority",
    callButton: "Call",
    trackYourComplaint: "Track Your Complaint",
    trackInstruction: "Enter your complaint ID to see real-time status updates and contact information.",
    realTimeBadge: "Real-time Tracking",
    contactLabel: "Contact",
    submittedLabel: "Submitted",
    // Timeline statuses
    Registered: "Registered",
    Assigned: "Assigned",
    'In-Progress': "In Progress",
    Resolved: "Resolved",
  },
  hi: {
    title: "शिकायत ट्रैक करें",
    searchTitle: "शिकायत आईडी दर्ज करें",
    complaintIdLabel: "शिकायत आईडी",
    complaintIdPlaceholder: "उदा., NGR123456",
    trackButton: "स्थिति ट्रैक करें",
    searchingButton: "खोज रहा है...",
    timelineTitle: "स्थिति समयरेखा",
    assignedAuthority: "सौंपा गया अधिकारी",
    callButton: "कॉल करें",
    trackYourComplaint: "अपनी शिकायत ट्रैक करें",
    trackInstruction: "वास्तविक समय की स्थिति अपडेट और संपर्क जानकारी देखने के लिए अपनी शिकायत आईडी दर्ज करें।",
    realTimeBadge: "वास्तविक समय ट्रैकिंग",
    contactLabel: "संपर्क",
    submittedLabel: "प्रस्तुत",
    Registered: "पंजीकृत",
    Assigned: "सौंपा गया",
    'In-Progress': "प्रगति में",
    Resolved: "हल हो गई",
  },
  bn: {
    title: "অভিযোগ ট্র্যাক করুন",
    searchTitle: "অভিযোগ আইডি লিখুন",
    complaintIdLabel: "অভিযোগ আইডি",
    complaintIdPlaceholder: "যেমন, NGR123456",
    trackButton: "স্ট্যাটাস ট্র্যাক করুন",
    searchingButton: "অনুসন্ধান চলছে...",
    timelineTitle: "স্ট্যাটাস টাইমলাইন",
    assignedAuthority: "নিযুক্ত কর্তৃপক্ষ",
    callButton: "কল করুন",
    trackYourComplaint: "আপনার অভিযোগ ট্র্যাক করুন",
    trackInstruction: "রিয়েল-টাইম স্ট্যাটাস আপডেট এবং যোগাযোগের তথ্য দেখতে আপনার অভিযোগ আইডি লিখুন।",
    realTimeBadge: "রিয়েল-টাইম ট্র্যাকিং",
    contactLabel: "যোগাযোগ",
    submittedLabel: "জমা দেওয়া হয়েছে",
    Registered: "নিবন্ধিত",
    Assigned: "নিযুক্ত",
    'In-Progress': "চলমান",
    Resolved: "সমাধান হয়েছে",
  },
  te: {
    title: "ఫిర్యాదును ట్రాక్ చేయండి",
    searchTitle: "ఫిర్యాదు IDని నమోదు చేయండి",
    complaintIdLabel: "ఫిర్యాదు ID",
    complaintIdPlaceholder: "ఉదా., NGR123456",
    trackButton: "స్థితిని ట్రాక్ చేయండి",
    searchingButton: "వెతుకుతోంది...",
    timelineTitle: "స్థితి కాలక్రమం",
    assignedAuthority: "కేటాయించిన అధికారి",
    callButton: "కాల్ చేయండి",
    trackYourComplaint: "మీ ఫిర్యాదును ట్రాక్ చేయండి",
    trackInstruction: "నిజ-సమయ స్థితి నవీకరణలు మరియు సంప్రదింపు సమాచారాన్ని చూడటానికి మీ ఫిర్యాదు IDని నమోదు చేయండి.",
    realTimeBadge: "నిజ-సమయ ట్రాకింగ్",
    contactLabel: "సంప్రదించండి",
    submittedLabel: "సమర్పించబడింది",
    Registered: "నమోదు చేయబడింది",
    Assigned: "కేటాయించబడింది",
    'In-Progress': "ప్రోగ్రెస్‌లో ఉంది",
    Resolved: "పరిష్కరించబడింది",
  },
};

const ComplaintTracking = ({ onBack, language }: ComplaintTrackingProps) => {
  const [searchId, setSearchId] = useState("")
  const [complaint, setComplaint] = useState<any>(null)
  const [statusUpdates, setStatusUpdates] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const t = translations[language]; // 3. Use the language prop

  useEffect(() => {
    if (complaint) {
      const channel = supabase
        .channel(`complaint-${complaint.id}`)
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'complaint_status_updates', filter: `complaint_id=eq.${complaint.id}` },
          () => { handleSearch() }
        )
        .on('postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'complaints', filter: `id=eq.${complaint.id}` },
          () => { handleSearch() }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [complaint?.id])

  const handleSearch = async () => {
    if (!searchId.trim()) {
      toast({ title: "Please enter a complaint ID", variant: "destructive" })
      return
    }
    setLoading(true)
    try {
      const { data: complaintData, error: complaintError } = await supabase
        .from('complaints')
        .select('*')
        .eq('complaint_code', searchId.toUpperCase())
        .single()

      if (complaintError || !complaintData) {
        toast({ title: "Complaint Not Found", description: "Please check the complaint ID and try again", variant: "destructive" })
        setLoading(false)
        return
      }

      const { data: updatesData, error: updatesError } = await supabase
        .from('complaint_status_updates')
        .select('*')
        .eq('complaint_id', complaintData.id)
        .order('created_at', { ascending: true })

      if (updatesError) throw updatesError

      setComplaint(complaintData)
      setStatusUpdates(updatesData || [])
      setLoading(false)
      
      toast({ title: "Complaint Found", description: `Status: ${complaintData.status}`, variant: "default" })
    } catch (error) {
      console.error('Error fetching complaint:', error)
      toast({ title: "Error", description: "Failed to fetch complaint details", variant: "destructive" })
      setLoading(false)
    }
  }

  const generateTimeline = () => {
    if (!complaint) return []
    
    const statuses: Array<keyof typeof t> = ['Registered', 'Assigned', 'In-Progress', 'Resolved']
    const currentStatusIndex = statuses.indexOf(complaint.status)
    
    return statuses.map((status, index) => {
      const statusUpdate = statusUpdates.find(update => update.status === status)
      const isCompleted = index <= currentStatusIndex
      
      return {
        status: t[status] || status, // Translate the status
        timestamp: statusUpdate ? new Date(statusUpdate.created_at).toLocaleString() : (isCompleted ? 'Processing...' : ''),
        completed: isCompleted,
        authority: statusUpdate?.assigned_to,
        contact: statusUpdate?.assigned_contact,
        note: statusUpdate?.note
      }
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'registered': return 'bg-civic-saffron/20 text-civic-saffron border-civic-saffron/30'
      case 'assigned': return 'bg-civic-blue/20 text-civic-blue border-civic-blue/30'
      case 'in progress': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'resolved': return 'bg-civic-green/20 text-civic-green border-civic-green/30'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-civic-green-light to-background">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-civic-green/20">
        <div className="flex items-center p-4 max-w-md mx-auto">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-3">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">{t.title}</h1>
        </div>
      </div>

      <div className="p-6 max-w-md mx-auto space-y-6">
        {/* Search Section */}
        <Card className="border-civic-green/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-civic-green" />
              {t.searchTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="complaint-id">{t.complaintIdLabel}</Label>
              <Input 
                id="complaint-id"
                placeholder={t.complaintIdPlaceholder}
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>
            <Button 
              variant="default" 
              className="w-full bg-civic-green hover:bg-civic-green/90"
              onClick={handleSearch}
              disabled={loading}
            >
              <Search className="h-4 w-4 mr-2" />
              {loading ? t.searchingButton : t.trackButton}
            </Button>
          </CardContent>
        </Card>

        {/* Complaint Details */}
        {complaint && (
          <div className="space-y-4">
            <Card className="border-civic-saffron/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{complaint.issue_type}</span>
                  <Badge className={getStatusColor(complaint.status)}>
                    {t[complaint.status as keyof typeof t] || complaint.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-civic-saffron mt-1" />
                  <p className="text-sm">{complaint.city}, {complaint.state}</p>
                </div>
                <p className="text-sm text-muted-foreground">{complaint.description}</p>
                {complaint.media_url && (
                  <div className="mt-3">
                    <img 
                      src={complaint.media_url} 
                      alt="Complaint evidence" 
                      className="max-w-full h-auto rounded-lg border"
                    />
                  </div>
                )}
                <div className="bg-civic-saffron/5 rounded-lg p-3">
                  <p className="text-sm font-medium">{t.complaintIdLabel}: {complaint.complaint_code}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.submittedLabel}: {new Date(complaint.created_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-civic-green/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-civic-green" />
                  {t.timelineTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {generateTimeline().map((step: any, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-4 h-4 rounded-full mt-1 ${
                        step.completed 
                          ? 'bg-civic-green' 
                          : index === generateTimeline().findIndex((s: any) => !s.completed)
                            ? 'bg-civic-saffron animate-pulse'
                            : 'bg-muted'
                      }`} />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className={`text-sm font-medium ${
                            step.completed ? 'text-civic-green' : 'text-muted-foreground'
                          }`}>
                            {step.status}
                          </p>
                          {step.completed && (
                            <CheckCircle className="h-4 w-4 text-civic-green" />
                          )}
                        </div>
                        
                        {step.timestamp && (
                          <p className="text-xs text-muted-foreground mb-2">
                            {step.timestamp}
                          </p>
                        )}
                        
                        {step.note && (
                          <p className="text-xs text-muted-foreground mb-2 italic">
                            {step.note}
                          </p>
                        )}
                        
                        {step.authority && (
                          <div className="bg-civic-blue/5 rounded p-2 text-xs">
                            <div className="flex items-center gap-1 mb-1">
                              <User className="h-3 w-3" />
                              <span className="font-medium">{step.authority}</span>
                            </div>
                            {step.contact && (
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">{t.contactLabel}: {step.contact}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs"
                                  onClick={() => window.open(`tel:${step.contact}`)}
                                >
                                  <Phone className="h-3 w-3 mr-1" />
                                  {t.callButton}
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {complaint.status !== 'Resolved' && statusUpdates.find(update => update.assigned_to) && (
              <Card className="border-civic-blue/20 bg-civic-blue/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{t.assignedAuthority}</h4>
                      <p className="text-sm text-muted-foreground">
                        {statusUpdates.find(update => update.assigned_to)?.assigned_to}
                      </p>
                    </div>
                    {statusUpdates.find(update => update.assigned_contact) && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-civic-blue text-civic-blue hover:bg-civic-blue hover:text-white"
                        onClick={() => window.open(`tel:${statusUpdates.find(update => update.assigned_contact)?.assigned_contact}`)}
                      >
                        {t.callButton}: {statusUpdates.find(update => update.assigned_contact)?.assigned_contact}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {!complaint && (
          <Card className="border-civic-saffron/20 bg-civic-saffron/5">
            <CardContent className="p-4 text-center">
              <Search className="h-12 w-12 text-civic-saffron mx-auto mb-3" />
              <h3 className="font-semibold mb-2">{t.trackYourComplaint}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {t.trackInstruction}
              </p>
              <Badge variant="outline" className="border-civic-saffron text-civic-saffron">
                {t.realTimeBadge}
              </Badge>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default ComplaintTracking