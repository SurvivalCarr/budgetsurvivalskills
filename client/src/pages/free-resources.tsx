import { MetaTags } from '@/components/seo/meta-tags';
import { Sidebar } from '@/components/layout/sidebar';
import { PDFDownloadSignup } from '@/components/pdf-download-signup';
import { useRegion } from '@/components/region-selector';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Calculator, BookOpen, DollarSign, Shield, Link as LinkIcon } from 'lucide-react';
import { Link } from 'wouter';

const freeResourcesSEO = {
  title: "Free Financial Resources & Tools | Budget Survival Skills",
  description: "Access free financial planning resources, emergency fund guides, calculators, and budgeting tools for US, UK, Australia, and Canada.",
  ogTitle: "Free Financial Resources & Tools",
  ogDescription: "Download free emergency fund guides, use financial calculators, and access budgeting tools to improve your financial security.",
  ogType: "website" as const,
  canonicalUrl: "https://budgetsurvivalskills.com/free-resources",
};

export default function FreeResources() {
  const { selectedRegion } = useRegion();

  const resources = [
    {
      title: "Emergency Fund Guides",
      description: "Comprehensive 2,000+ word guides tailored for each region",
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      items: [
        "🇺🇸 United States Emergency Fund Guide",
        "🇬🇧 United Kingdom Emergency Fund Guide", 
        "🇦🇺 Australia Emergency Fund Guide",
        "🇨🇦 Canada Emergency Fund Guide"
      ]
    },
    {
      title: "Financial Calculators",
      description: "Interactive tools to plan your financial goals",
      icon: Calculator,
      color: "text-green-600",
      bgColor: "bg-green-50",
      items: [
        "Emergency Fund Calculator",
        "Debt Payoff Calculator",
        "Savings Goal Calculator",
        "Budget Planning Tools"
      ]
    },
    {
      title: "Budget Templates",
      description: "Downloadable spreadsheets and planning tools",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      items: [
        "Monthly Budget Tracker",
        "Debt Snowball Worksheet",
        "Emergency Fund Tracker",
        "Expense Category Breakdown"
      ]
    },
    {
      title: "Educational Articles",
      description: "Over 100 comprehensive financial guides",
      icon: BookOpen,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      items: [
        "Emergency Fund Building",
        "Debt Payoff Strategies",
        "Side Hustle Ideas",
        "Government Benefits Guides"
      ]
    }
  ];

  const governmentResources = {
    us: [
      { name: "IRS Tax Information", url: "https://www.irs.gov", description: "Official tax forms and guidance" },
      { name: "Benefits.gov", url: "https://www.benefits.gov", description: "Find government benefits you qualify for" },
      { name: "Social Security Administration", url: "https://www.ssa.gov", description: "Social Security benefits and planning" },
      { name: "Consumer Financial Protection Bureau", url: "https://www.consumerfinance.gov", description: "Financial protection and education" }
    ],
    uk: [
      { name: "GOV.UK Money Guidance", url: "https://www.gov.uk/browse/benefits", description: "Benefits and financial support" },
      { name: "MoneyHelper", url: "https://www.moneyhelper.org.uk", description: "Free financial guidance service" },
      { name: "HMRC", url: "https://www.gov.uk/government/organisations/hm-revenue-customs", description: "Tax information and self-assessment" },
      { name: "Citizens Advice", url: "https://www.citizensadvice.org.uk", description: "Free advice on money and legal issues" }
    ],
    au: [
      { name: "Australian Taxation Office", url: "https://www.ato.gov.au", description: "Tax information and myGov services" },
      { name: "Services Australia", url: "https://www.servicesaustralia.gov.au", description: "Centrelink and Medicare services" },
      { name: "ASIC MoneySmart", url: "https://moneysmart.gov.au", description: "Financial guidance and calculators" },
      { name: "Australian Securities & Investments Commission", url: "https://asic.gov.au", description: "Investment and financial product information" }
    ],
    ca: [
      { name: "Canada Revenue Agency", url: "https://www.canada.ca/en/revenue-agency.html", description: "Tax information and benefits" },
      { name: "Government of Canada Benefits", url: "https://www.canada.ca/en/services/benefits.html", description: "Federal benefits and programs" },
      { name: "Financial Consumer Agency of Canada", url: "https://www.canada.ca/en/financial-consumer-agency.html", description: "Financial education and tools" },
      { name: "Employment and Social Development Canada", url: "https://www.canada.ca/en/employment-social-development.html", description: "Employment insurance and social programs" }
    ]
  };

  const currentRegionResources = governmentResources[selectedRegion as keyof typeof governmentResources] || governmentResources.us;

  return (
    <>
      <MetaTags seo={freeResourcesSEO} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="text-center mb-8">
              <Download className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Free Financial Resources</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Access our complete library of free financial planning tools, guides, and calculators to build your financial security.
              </p>
            </div>

            {/* Main Resources Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {resources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className={`p-2 rounded-lg ${resource.bgColor} mr-3`}>
                        <resource.icon className={`w-6 h-6 ${resource.color}`} />
                      </div>
                      {resource.title}
                    </CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {resource.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Download Your Free Guide */}
            <Card className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-blue-900">Get Your Free Emergency Fund Guide</CardTitle>
                <CardDescription className="text-blue-700">
                  Download our comprehensive guide tailored specifically for your region with local resources and strategies.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PDFDownloadSignup selectedRegion={selectedRegion} />
              </CardContent>
            </Card>

            {/* Quick Access Tools */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Quick Access Tools</CardTitle>
                <CardDescription>Jump straight to our most popular financial planning tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button asChild variant="outline" className="h-auto p-4 justify-start">
                    <Link href="/calculator-tools">
                      <Calculator className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Financial Calculators</div>
                        <div className="text-xs text-gray-500">Emergency fund, debt payoff, savings goals</div>
                      </div>
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="h-auto p-4 justify-start">
                    <Link href="/emergency-fund-guide">
                      <Shield className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Emergency Fund Guide</div>
                        <div className="text-xs text-gray-500">Step-by-step building strategies</div>
                      </div>
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="h-auto p-4 justify-start">
                    <Link href="/category/side-hustles">
                      <DollarSign className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Side Hustle Ideas</div>
                        <div className="text-xs text-gray-500">Extra income opportunities</div>
                      </div>
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="h-auto p-4 justify-start">
                    <Link href="/all-articles">
                      <BookOpen className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">All Articles</div>
                        <div className="text-xs text-gray-500">100+ financial guides</div>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Government Resources */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LinkIcon className="w-5 h-5 mr-2" />
                  Official Government Resources
                </CardTitle>
                <CardDescription>
                  Authoritative financial information and benefits for your region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {currentRegionResources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-blue-600 hover:text-blue-800">{resource.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{resource.description}</div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resource Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Browse by Category</CardTitle>
                <CardDescription>Find specific financial guidance organized by topic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Link href="/category/emergency-fund" className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="font-medium text-blue-900">Emergency Fund</div>
                    <div className="text-sm text-blue-700">Building financial security</div>
                  </Link>
                  
                  <Link href="/category/debt-payoff" className="block p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                    <div className="font-medium text-red-900">Debt Payoff</div>
                    <div className="text-sm text-red-700">Strategies to become debt-free</div>
                  </Link>
                  
                  <Link href="/category/side-hustles" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <div className="font-medium text-green-900">Side Hustles</div>
                    <div className="text-sm text-green-700">Extra income opportunities</div>
                  </Link>
                  
                  <Link href="/category/frugal-living" className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <div className="font-medium text-purple-900">Frugal Living</div>
                    <div className="text-sm text-purple-700">Money-saving strategies</div>
                  </Link>
                  
                  <Link href="/category/meal-planning" className="block p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                    <div className="font-medium text-orange-900">Meal Planning</div>
                    <div className="text-sm text-orange-700">Budget-friendly food tips</div>
                  </Link>
                  
                  <Link href="/category/preparedness" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="font-medium text-gray-900">Preparedness</div>
                    <div className="text-sm text-gray-700">Emergency planning</div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Sidebar />
        </div>
      </div>
    </>
  );
}