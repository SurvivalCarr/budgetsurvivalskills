import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { MetaTags } from '@/components/seo/meta-tags';
import { FeaturedPost } from '@/components/blog/featured-post';
import { PostCard } from '@/components/blog/post-card';
import { AffiliateShowcase } from '@/components/affiliate-showcase';
import { Sidebar } from '@/components/layout/sidebar';
import { useRegion } from '@/components/region-selector';
import { defaultSEO } from '@/lib/seo';
import { getRegionClasses } from '@/lib/region-themes';
import type { PostWithCategory } from '@shared/schema';

export default function Home() {
  const { selectedRegion } = useRegion();
  const queryClient = useQueryClient();
  const regionClasses = getRegionClasses(selectedRegion);

  // Invalidate cache when region changes
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
    queryClient.refetchQueries({ queryKey: ['/api/posts'] });
  }, [selectedRegion, queryClient]);

  const { data: featuredPosts = [] } = useQuery<PostWithCategory[]>({
    queryKey: ['/api/posts', { featured: true, limit: 1, region: selectedRegion }],
    staleTime: 0,
  });

  const { data: recentPosts = [] } = useQuery<PostWithCategory[]>({
    queryKey: ['/api/posts', { limit: 4, region: selectedRegion }],
    staleTime: 0,
  });

  const featuredPost = featuredPosts[0];

  return (
    <>
      <MetaTags seo={defaultSEO} />
      
      {/* Hero Section */}
      <section className={`${regionClasses.gradientBg} text-white py-16 relative`}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
                Master Your Money {regionClasses.flag}
                <span className="text-yellow-300 drop-shadow-lg"> Survive Any Crisis</span>
              </h1>
              <p className="text-xl mb-8 text-white drop-shadow-lg leading-relaxed">
                Learn proven strategies for building emergency funds, living frugally, and preparing for financial uncertainty. Join thousands in {selectedRegion === 'us' ? 'the United States' : selectedRegion === 'uk' ? 'the United Kingdom' : selectedRegion === 'au' ? 'Australia' : 'Canada'} who've transformed their financial resilience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className={`${regionClasses.primaryButton} text-white`}>
                  <a href="#featured-posts">Start Learning Now</a>
                </Button>
                <Button asChild size="lg" className={`${regionClasses.secondaryButton} text-white`}>
                  <Link href="/newsletter">Get Weekly Tips</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Family planning budget and emergency preparedness"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Featured Post */}
            {featuredPost && (
              <div id="featured-posts">
                <FeaturedPost post={featuredPost} />
              </div>
            )}

            {/* Financial Services */}
            <section className="mb-12">
              <AffiliateShowcase featured={true} limit={6} />
            </section>

            {/* Recent Posts Grid */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {recentPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button asChild size="lg">
                  <Link href="/all-articles">
                    View All Articles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </>
  );
}
