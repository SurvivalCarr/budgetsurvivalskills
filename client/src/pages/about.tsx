import { MetaTags } from '@/components/seo/meta-tags';
import { Sidebar } from '@/components/layout/sidebar';

const aboutSEO = {
  title: "About Budget Survival Skills | Financial Emergency Preparedness Experts",
  description: "Learn about our mission to help families build financial resilience through practical budget survival skills, emergency preparedness, and frugal living strategies.",
  ogTitle: "About Budget Survival Skills",
  ogDescription: "Learn about our mission to help families build financial resilience through practical budget survival skills.",
  ogType: "website" as const,
  canonicalUrl: "https://budgetsurvivalskills.com/about",
};

export default function About() {
  return (
    <>
      <MetaTags seo={aboutSEO} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">About Budget Survival Skills</h1>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-600 mb-6">
                  At Budget Survival Skills, we believe that financial preparedness is not a luxury—it's a necessity. Our mission is to empower families worldwide with practical, actionable strategies to build emergency funds, live frugally, and prepare for any financial crisis.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
                <p className="text-gray-700 mb-6">
                  Founded by financial experts who've personally navigated economic uncertainty, Budget Survival Skills was born from the understanding that traditional financial advice often falls short during real-world crises. We focus on practical, tested strategies that work for everyday families across the United States, United Kingdom, Australia, and Canada, regardless of income level.
                </p>
                
                <p className="text-gray-700 mb-6">
                  Having experienced financial hardship firsthand, we understand the stress and uncertainty that comes with living paycheck to paycheck. That's why we've dedicated ourselves to creating resources that provide immediate, actionable solutions rather than theoretical advice.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Core Financial Skills</h3>
                    <ul className="list-disc pl-6 text-gray-700">
                      <li>Emergency fund building strategies</li>
                      <li>Debt payoff methods that work</li>
                      <li>Budget optimization techniques</li>
                      <li>Investment basics for beginners</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Income Generation</h3>
                    <ul className="list-disc pl-6 text-gray-700">
                      <li>Side hustle opportunities</li>
                      <li>Freelancing and remote work</li>
                      <li>Programming and tech skills</li>
                      <li>Passive income strategies</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Money-Saving Strategies</h3>
                    <ul className="list-disc pl-6 text-gray-700">
                      <li>Budget-friendly meal planning</li>
                      <li>Utility and bill optimization</li>
                      <li>Smart shopping techniques</li>
                      <li>Emergency preparedness on a budget</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Region-Specific Guidance</h3>
                    <ul className="list-disc pl-6 text-gray-700">
                      <li>US: Credit building, tax strategies</li>
                      <li>UK: ISAs, benefits optimization</li>
                      <li>Australia: Superannuation advice</li>
                      <li>Canada: RRSP and TFSA guidance</li>
                    </ul>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Global Approach</h2>
                <p className="text-gray-700 mb-6">
                  Understanding that financial challenges and opportunities vary by region, we provide tailored content for English-speaking markets worldwide. Whether you're dealing with student loans in the US, navigating Universal Credit in the UK, maximizing your superannuation in Australia, or optimizing your RRSP in Canada, we have region-specific advice that considers local laws, tax implications, and cultural factors.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why We're Different</h2>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <ul className="list-none space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-3">✓</span>
                      <span><strong>Real-world tested:</strong> Every strategy has been personally tested or verified through reader success stories</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-3">✓</span>
                      <span><strong>No-fluff content:</strong> We skip the theory and focus on actionable steps you can implement today</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-3">✓</span>
                      <span><strong>Global perspective:</strong> Content tailored for multiple countries and currencies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 font-bold mr-3">✓</span>
                      <span><strong>Income-agnostic:</strong> Strategies that work whether you earn £20,000 or £100,000+</span>
                    </li>
                  </ul>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to You</h2>
                <p className="text-gray-700 mb-6">
                  Every piece of content we create is thoroughly researched, fact-checked, and designed to provide genuine value. We don't just give advice—we provide complete systems, downloadable resources, and step-by-step guides that have helped thousands of families improve their financial security across four countries.
                </p>
                
                <p className="text-gray-700 mb-6">
                  We also believe in transparency. When we recommend financial products or services, we clearly disclose any affiliate relationships. Our recommendations are based on genuine value and personal experience, not commission rates.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Track Record</h2>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">104+</div>
                    <div className="text-gray-700">Comprehensive Guides</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
                    <div className="text-gray-700">Countries Covered</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">1000s</div>
                    <div className="text-gray-700">Families Helped</div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Free Resources</h2>
                <p className="text-gray-700 mb-4">
                  We believe financial education should be accessible to everyone. That's why we offer:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li><strong>Emergency Fund PDF Guides</strong> - Region-specific 2,000+ word guides for US, UK, Australia, and Canada</li>
                  <li><strong>Budget Calculators</strong> - Interactive tools to plan your financial goals</li>
                  <li><strong>Weekly Newsletter</strong> - Latest money-saving tips and strategies</li>
                  <li><strong>Step-by-Step Tutorials</strong> - From emergency funds to side hustles</li>
                </ul>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-primary mb-3">Join Our Community</h3>
                  <p className="text-gray-700 mb-4">
                    Subscribe to our weekly newsletter and join thousands of families who are building their financial resilience one step at a time.
                  </p>
                  <p className="text-gray-700">
                    Get your free Emergency Fund PDF guide tailored to your region when you sign up today.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <Sidebar />
        </div>
      </div>
    </>
  );
}
