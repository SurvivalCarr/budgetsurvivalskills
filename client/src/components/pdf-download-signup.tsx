import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { getRegionClasses } from "@/lib/region-themes";

interface PDFDownloadSignupProps {
  selectedRegion?: string;
}

export function PDFDownloadSignup({ selectedRegion }: PDFDownloadSignupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState(selectedRegion || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const regionClasses = getRegionClasses(region || selectedRegion || "us");

  const regionOptions = [
    { value: "us", label: "United States", flag: "🇺🇸" },
    { value: "uk", label: "United Kingdom", flag: "🇬🇧" },
    { value: "au", label: "Australia", flag: "🇦🇺" },
    { value: "ca", label: "Canada", flag: "🇨🇦" },
  ];

  const getRegionName = (regionCode: string) => {
    const regionData = regionOptions.find(r => r.value === regionCode);
    return regionData ? regionData.label : "Your Region";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !region) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to download your guide.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiRequest("POST", "/api/subscribe", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        region,
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        toast({
          title: "Success!",
          description: "Check your email for your Budget Survival Skills guide!",
        });
      } else {
        throw new Error("Email delivery failed");
      }
    } catch (error: any) {
      const errorMessage = error.message || "Failed to process subscription. Please try again.";
      toast({
        title: "Subscription Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                Guide Sent Successfully!
              </h3>
              <p className="text-green-700 dark:text-green-300 mt-2">
                Your {getRegionName(region)} Budget Survival Skills Guide has been sent to {email}.
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                Check your email inbox (and spam folder) for your personalized financial guide.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full max-w-md mx-auto ${regionClasses.cardGradient} ${regionClasses.border}`}>
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Download className={`w-8 h-8 ${regionClasses.accentColor} mr-2`} />
          <Mail className={`w-8 h-8 ${regionClasses.accentColor}`} />
        </div>
        <CardTitle className={`text-xl ${regionClasses.textPrimary}`}>
          Get Your FREE Budget Survival Guide
        </CardTitle>
        <CardDescription className={`${regionClasses.textSecondary}`}>
          Download a comprehensive financial guide tailored for {selectedRegion ? getRegionName(selectedRegion) : "your region"} with emergency fund strategies, debt payoff methods, and local investment opportunities.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className={regionClasses.textPrimary}>
              Your Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your first name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              className={`${regionClasses.border} focus:border-opacity-70`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className={regionClasses.textPrimary}>
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className={`${regionClasses.border} focus:border-opacity-70`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="region" className={regionClasses.textPrimary}>
              Your Region
            </Label>
            <Select value={region} onValueChange={setRegion} disabled={isSubmitting}>
              <SelectTrigger className={`${regionClasses.border} focus:border-opacity-70`}>
                <SelectValue placeholder="Select your region" />
              </SelectTrigger>
              <SelectContent>
                {regionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <span className="flex items-center">
                      <span className="mr-2">{option.flag}</span>
                      {option.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className={`w-full ${regionClasses.primaryButton} text-white`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending Guide...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download FREE Guide
              </>
            )}
          </Button>

          <div className="text-xs text-blue-600 dark:text-blue-400 text-center mt-3">
            <div className="flex items-center justify-center mb-1">
              <AlertCircle className="w-3 h-3 mr-1" />
              What you'll receive:
            </div>
            <ul className="space-y-1 text-left">
              <li>• Region-specific emergency fund strategies</li>
              <li>• Local government benefits and programs</li>
              <li>• Debt payoff methods that work in your area</li>
              <li>• Investment and savings opportunities</li>
              <li>• Side hustle ideas for your market</li>
            </ul>
            <p className="mt-2 text-center">
              No spam. Unsubscribe anytime. Your email stays private.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}