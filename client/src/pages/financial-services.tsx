import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AffiliateShowcase } from "@/components/affiliate-showcase";
import { MetaTags } from "@/components/seo/meta-tags";
import { useRegion, getRegionInfo } from "@/components/region-selector";
import { CreditCard, TrendingUp, Shield, Star, Calculator } from "lucide-react";
import type { SEOData } from "@/lib/seo";

export default function FinancialServices() {
  const { selectedRegion } = useRegion();
  const regionInfo = getRegionInfo(selectedRegion);

  const seo: SEOData = {
    title: `Best Financial Services ${regionInfo.name} | Budget Survival Skills`,
    description: `Discover the best banks, investment platforms, and financial tools in ${regionInfo.name}. Compare savings accounts, credit cards, and budgeting apps to save money.`,
    keywords: `financial services ${regionInfo.name}, best banks ${regionInfo.name}, investment platforms, budgeting apps, savings accounts`,
    ogTitle: `Top Financial Services & Tools for ${regionInfo.name}`,
    ogDescription: `Compare the best financial services available in ${regionInfo.name}. Find high-yield savings accounts, investment platforms, and money-saving tools.`
  };

  return (
    <>
      <MetaTags seo={seo} />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Financial Services for {regionInfo.name} {regionInfo.flag}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Carefully selected financial services that can help you save money, invest wisely, and reach your financial goals. 
              All recommendations are based on our research and personal experience.
            </p>
          </div>

          {/* Category Tabs */}
          <Tabs defaultValue="featured" className="mb-12">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="featured" className="flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <span className="hidden sm:inline">Featured</span>
              </TabsTrigger>
              <TabsTrigger value="banking" className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Banking</span>
              </TabsTrigger>
              <TabsTrigger value="investing" className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Investing</span>
              </TabsTrigger>
              <TabsTrigger value="insurance" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Insurance</span>
              </TabsTrigger>
              <TabsTrigger value="comparison" className="flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <span className="hidden sm:inline">Compare</span>
              </TabsTrigger>
              <TabsTrigger value="budgeting" className="flex items-center space-x-2">
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Budgeting</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="featured">
              <AffiliateShowcase featured={true} />
            </TabsContent>

            <TabsContent value="banking">
              <AffiliateShowcase category="banking" />
            </TabsContent>

            <TabsContent value="investing">
              <AffiliateShowcase category="investing" />
            </TabsContent>

            <TabsContent value="insurance">
              <AffiliateShowcase category="insurance" />
            </TabsContent>

            <TabsContent value="comparison">
              <AffiliateShowcase category="comparison" />
            </TabsContent>

            <TabsContent value="budgeting">
              <AffiliateShowcase category="budgeting" />
            </TabsContent>
          </Tabs>

          {/* Why We Recommend These Services */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Why These Services?</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Our Selection Process</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Competitive rates and low fees</li>
                    <li>• Strong security and regulation compliance</li>
                    <li>• Excellent customer service ratings</li>
                    <li>• User-friendly mobile apps and websites</li>
                    <li>• Proven track record and reliability</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Regional Focus</h3>
                  <p className="text-gray-600 mb-4">
                    We specifically research and recommend services available in {regionInfo.name}, 
                    ensuring you get relevant options with local support and compliance.
                  </p>
                  <p className="text-gray-600">
                    Our recommendations are updated regularly to reflect changes in the financial services landscape.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-sm text-gray-600 max-w-4xl mx-auto">
              <strong>Transparency Note:</strong> We may earn a commission when you sign up for these services through our links. 
              This helps support our free content and research. However, we only recommend services we genuinely believe 
              can help improve your financial situation. Our recommendations are based on independent research and personal experience, 
              not commission rates.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}