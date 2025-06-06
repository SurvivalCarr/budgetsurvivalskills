import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, Shield, TrendingUp, Calculator, CreditCard } from "lucide-react";
import { useRegion } from "@/components/region-selector";
import { getFeaturedAffiliates, getAffiliatesByCategory, type AffiliateLink } from "@/lib/affiliate-links";

interface AffiliateShowcaseProps {
  category?: string;
  featured?: boolean;
  limit?: number;
}

export function AffiliateShowcase({ category, featured = false, limit }: AffiliateShowcaseProps) {
  const { selectedRegion } = useRegion();
  
  const affiliates = featured 
    ? getFeaturedAffiliates(selectedRegion)
    : category 
    ? getAffiliatesByCategory(selectedRegion, category)
    : getFeaturedAffiliates(selectedRegion);
    
  const displayAffiliates = limit ? affiliates.slice(0, limit) : affiliates;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'banking': return <CreditCard className="h-4 w-4" />;
      case 'investing': return <TrendingUp className="h-4 w-4" />;
      case 'insurance': return <Shield className="h-4 w-4" />;
      case 'comparison': return <Star className="h-4 w-4" />;
      case 'budgeting': return <Calculator className="h-4 w-4" />;
      default: return <ExternalLink className="h-4 w-4" />;
    }
  };

  if (displayAffiliates.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {featured ? 'Recommended Financial Services' : `${category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Financial'} Partners`}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Trusted financial services to help you save money and reach your goals. These are services we personally recommend and use.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayAffiliates.map((affiliate, index) => (
          <Card key={index} className="group hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(affiliate.category)}
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {affiliate.name}
                  </CardTitle>
                </div>
                {affiliate.featured && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                {affiliate.description}
              </p>
              
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="capitalize">
                  {affiliate.category}
                </Badge>
                <Button 
                  size="sm" 
                  className="group-hover:bg-primary group-hover:text-white transition-colors"
                  onClick={() => window.open(affiliate.url, '_blank', 'noopener,noreferrer')}
                >
                  Learn More
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {featured && (
        <div className="text-center">
          <p className="text-xs text-gray-500 max-w-xl mx-auto">
            * We may earn a commission when you sign up for these services, but this doesn't affect our recommendations. 
            We only suggest services we genuinely believe can help you save money and improve your finances.
          </p>
        </div>
      )}
    </div>
  );
}