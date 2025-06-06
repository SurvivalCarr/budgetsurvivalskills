import { Link } from 'wouter';
import { Shield, Facebook, Twitter, Rss } from 'lucide-react';
import { SiPinterest } from 'react-icons/si';

const quickLinks = [
  { name: 'Start Here', href: '/start-here' },
  { name: 'Emergency Fund Guide', href: '/emergency-fund-guide' },
  { name: 'Meal Planning 101', href: '/meal-planning-101' },
  { name: 'Free Resources', href: '/free-resources' },
  { name: 'Calculator Tools', href: '/calculator-tools' },
];

const categories = [
  { name: 'Emergency Fund', href: '/category/emergency-fund' },
  { name: 'Frugal Living', href: '/category/frugal-living' },
  { name: 'Preparedness', href: '/category/preparedness' },
  { name: 'Meal Planning', href: '/category/meal-planning' },
  { name: 'Side Hustles', href: '/category/side-hustles' },
];

const legal = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
  { name: 'Sitemap', href: '/sitemap' },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Shield className="text-primary text-2xl mr-2 h-6 w-6" />
              <span className="text-white text-xl font-bold">Budget Survival Skills</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering families with practical financial survival skills and emergency preparedness strategies.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/budgetsurvivalskills" 
                className="text-gray-400 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/budgetsurvival" 
                className="text-gray-400 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://pinterest.com/budgetsurvival" 
                className="text-gray-400 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiPinterest className="h-5 w-5" />
              </a>
              <Link href="/rss" className="text-gray-400 hover:text-primary transition-colors">
                <Rss className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link href={category.href} className="hover:text-primary transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Budget Survival Skills. All rights reserved.
            <span className="mx-2">•</span>
            <Link href="/disclaimer" className="hover:text-primary transition-colors">
              Disclaimer
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
