import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Menu, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { RegionSelector, useRegion } from '@/components/region-selector';
import { useQueryClient } from '@tanstack/react-query';
import { getRegionClasses } from '@/lib/region-themes';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Emergency Fund', href: '/category/emergency-fund' },
  { name: 'Frugal Living', href: '/category/frugal-living' },
  { name: 'Financial Services', href: '/financial-services' },
  { name: 'Calculator Tools', href: '/calculator-tools' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { selectedRegion, setSelectedRegion } = useRegion();
  const queryClient = useQueryClient();
  const regionClasses = getRegionClasses(selectedRegion);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleRefreshPosts = async () => {
    // Clear all post-related cache completely
    await queryClient.cancelQueries({ queryKey: ['/api/posts'] });
    queryClient.removeQueries({ queryKey: ['/api/posts'] });
    queryClient.clear();
    // Force fresh fetch with current region - use setTimeout to ensure cache is cleared
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50" role="banner">
      {/* Region Color Bar */}
      <div className={`h-2 ${regionClasses.gradientBg}`}></div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-xl sm:text-2xl font-bold text-primary flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md p-1"
              aria-label="Budget Survival Skills - Home"
            >
              <Shield className="mr-2 h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              <span className="hidden sm:inline">Budget Survival Skills</span>
              <span className="sm:hidden">BSS</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-colors ${
                    location === item.href
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Region Selector & Search */}
          <div className="hidden md:flex items-center gap-4">
            <RegionSelector 
              selectedRegion={selectedRegion} 
              onRegionChange={setSelectedRegion}
              onRefresh={handleRefreshPosts}
            />
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </form>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  aria-label="Open navigation menu"
                  className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-6">
                  {/* Region Selector */}
                  <div className="pb-4 border-b">
                    <RegionSelector 
                      selectedRegion={selectedRegion} 
                      onRegionChange={setSelectedRegion}
                      onRefresh={handleRefreshPosts}
                    />
                  </div>
                  
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <Input
                      type="search"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </form>
                  
                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`font-medium p-2 rounded transition-colors ${
                          location === item.href
                            ? 'text-primary bg-primary/10'
                            : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
