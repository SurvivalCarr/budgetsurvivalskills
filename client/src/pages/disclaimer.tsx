import { MetaTags } from '@/components/seo/meta-tags';

export default function Disclaimer() {
  const seoData = {
    title: 'Disclaimer - Budget Survival Skills',
    description: 'Important disclaimers regarding financial advice, affiliate relationships, and information accuracy on Budget Survival Skills.',
    canonicalUrl: '/disclaimer'
  };

  return (
    <>
      <MetaTags seo={seoData} />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Disclaimer</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 prose prose-lg max-w-none">
            <h2>Financial Information Disclaimer</h2>
            <p>
              The information provided on Budget Survival Skills is for educational and informational 
              purposes only. It should not be considered as professional financial advice, investment 
              guidance, or a recommendation to buy or sell any financial products.
            </p>

            <h2>Not Professional Advice</h2>
            <p>
              Budget Survival Skills is not a licensed financial advisor, certified financial planner, 
              or investment advisor. The content on this website represents personal opinions and 
              experiences, not professional financial advice.
            </p>

            <h2>Individual Results May Vary</h2>
            <p>
              The strategies, tips, and advice shared on this website may not be suitable for everyone. 
              Your financial situation is unique, and what works for one person may not work for another. 
              Always consider your individual circumstances before implementing any financial strategies.
            </p>

            <h2>Affiliate Disclosure</h2>
            <p>
              Budget Survival Skills participates in affiliate marketing programs. This means we may 
              receive compensation when you click on links to products or services and make a purchase. 
              These affiliate relationships do not influence our editorial content or recommendations.
            </p>

            <h2>Accuracy of Information</h2>
            <p>
              While we strive to provide accurate and up-to-date information, we cannot guarantee the 
              completeness, accuracy, or timeliness of all content. Financial regulations, product 
              offerings, and market conditions change frequently.
            </p>

            <h2>Regional Information</h2>
            <p>
              Our content is tailored for residents of the United States, United Kingdom, Australia, 
              and Canada. Financial products, regulations, and strategies may vary significantly 
              between regions. Always verify information applies to your specific location.
            </p>

            <h2>Risk Warning</h2>
            <p>
              All financial decisions carry risk. Past performance does not guarantee future results. 
              You should carefully consider your financial situation and consult with qualified 
              professionals before making any financial decisions.
            </p>

            <h2>External Links</h2>
            <p>
              Our website contains links to external websites. We are not responsible for the content, 
              accuracy, or practices of these third-party sites. Use of external links is at your 
              own risk.
            </p>

            <h2>Changes to Content</h2>
            <p>
              Financial information and recommendations may become outdated. We reserve the right to 
              modify, update, or remove content without notice. Always verify current information 
              before taking action.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              Budget Survival Skills and its authors shall not be liable for any financial losses, 
              damages, or consequences resulting from the use of information provided on this website.
            </p>

            <p className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
              <strong>Important:</strong> Always consult with qualified financial professionals, 
              tax advisors, or legal experts before making significant financial decisions. This 
              website is a starting point for education, not a substitute for professional advice.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}