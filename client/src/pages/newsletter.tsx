import { MetaTags } from '@/components/seo/meta-tags';
import { Sidebar } from '@/components/layout/sidebar';
import { PDFDownloadSignup } from '@/components/pdf-download-signup';
import { useRegion } from '@/components/region-selector';
import { Mail, CheckCircle, Users, Globe, BookOpen } from 'lucide-react';

const newsletterSEO = {
  title: "Free Weekly Financial Tips Newsletter | Budget Survival Skills",
  description: "Subscribe to our weekly newsletter for region-specific financial tips, emergency fund strategies, and money-saving advice for US, UK, Australia, and Canada.",
  ogTitle: "Join Our Financial Newsletter Community",
  ogDescription: "Get weekly financial tips and free resources to build your emergency fund and improve your financial security.",
  ogType: "website" as const,
  canonicalUrl: "https://budgetsurvivalskills.com/newsletter",
};

export default function Newsletter() {
  const { selectedRegion } = useRegion();

  return (
    <>
      <MetaTags seo={newsletterSEO} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl p-8 mb-8">
              <div className="text-center">
                <Mail className="w-16 h-16 mx-auto mb-4 text-blue-200" />
                <h1 className="text-4xl font-bold mb-4">Join Our Financial Community</h1>
                <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
                  Get weekly financial tips, emergency fund strategies, and money-saving advice delivered straight to your inbox. Plus, receive your free region-specific Budget Survival Guide.
                </p>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What You'll Get</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Weekly Financial Tips</h3>
                    <p className="text-gray-600">Actionable advice you can implement immediately to improve your financial situation.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Region-Specific Content</h3>
                    <p className="text-gray-600">Tailored advice for US, UK, Australia, and Canada with local resources and opportunities.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-full p-3 flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Exclusive Resources</h3>
                    <p className="text-gray-600">Free downloadable guides, calculators, and templates not available anywhere else.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-3 flex-shrink-0">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Access</h3>
                    <p className="text-gray-600">Join thousands of families building financial resilience together.</p>
                  </div>
                </div>
              </div>

              {/* Recent Newsletter Topics */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Newsletter Topics</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-gray-700">
                    <li>• Building a £1,000 emergency fund in 30 days</li>
                    <li>• Side hustles that actually work in 2024</li>
                    <li>• Credit score improvement strategies</li>
                    <li>• Government benefits you might be missing</li>
                  </ul>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Investment basics for beginners</li>
                    <li>• Debt payoff methods that work</li>
                    <li>• Money-saving meal planning tips</li>
                    <li>• Emergency preparedness on a budget</li>
                  </ul>
                </div>
              </div>

              {/* Free Guide Preview */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Free Welcome Gift</h3>
                <p className="text-gray-700 mb-4">
                  When you subscribe, you'll immediately receive our comprehensive Budget Survival Skills Guide tailored to your region:
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">🇺🇸 United States Edition</h4>
                    <ul className="space-y-1">
                      <li>• Credit building strategies</li>
                      <li>• Tax refund optimization</li>
                      <li>• Social Security benefits</li>
                      <li>• SNAP and government assistance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">🇬🇧 United Kingdom Edition</h4>
                    <ul className="space-y-1">
                      <li>• ISA maximization strategies</li>
                      <li>• Universal Credit optimization</li>
                      <li>• Energy bill reduction tips</li>
                      <li>• Buy-to-let investment basics</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">🇦🇺 Australia Edition</h4>
                    <ul className="space-y-1">
                      <li>• Superannuation optimization</li>
                      <li>• Centrelink benefits guide</li>
                      <li>• Property investment strategies</li>
                      <li>• Tax return maximization</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">🇨🇦 Canada Edition</h4>
                    <ul className="space-y-1">
                      <li>• RRSP and TFSA strategies</li>
                      <li>• Child benefit optimization</li>
                      <li>• Mortgage and real estate tips</li>
                      <li>• Employment insurance benefits</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="text-center">
              <PDFDownloadSignup selectedRegion={selectedRegion} />
            </div>

            {/* Privacy and Unsubscribe */}
            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Privacy Matters</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>✓ <strong>No spam ever</strong> - We send one valuable email per week, that's it</p>
                <p>✓ <strong>Easy unsubscribe</strong> - One-click unsubscribe link in every email</p>
                <p>✓ <strong>Your data is safe</strong> - We never sell or share your information</p>
                <p>✓ <strong>Quality content</strong> - Every email provides genuine value, not sales pitches</p>
              </div>
            </div>
          </div>
          
          <Sidebar />
        </div>
      </div>
    </>
  );
}