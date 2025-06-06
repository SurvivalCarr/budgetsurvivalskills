import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { FolderOpen, Flame, Lock, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NewsletterSignup } from '@/components/blog/newsletter-signup';
import { useRegion } from '@/components/region-selector';
import type { Category, PostWithCategory } from '@shared/schema';

export function Sidebar() {
  const { selectedRegion } = useRegion();
  
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: popularPosts = [] } = useQuery<PostWithCategory[]>({
    queryKey: ['/api/posts', { limit: 3, region: selectedRegion }],
  });

  return (
    <aside className="space-y-8">
      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Categories */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <FolderOpen className="mr-2 h-5 w-5 text-primary" />
            Categories
          </h3>
          
          <nav className="space-y-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="flex items-center justify-between text-gray-700 hover:text-primary hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <span>{category.name}</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {category.postCount}
                </span>
              </Link>
            ))}
          </nav>
        </CardContent>
      </Card>

      {/* Popular Posts */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Flame className="mr-2 h-5 w-5 text-accent" />
            Most Popular
          </h3>
          
          <div className="space-y-4">
            {popularPosts.map((post, index) => (
              <article key={post.id} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                    index === 0 ? 'bg-accent' : 'bg-gray-400'
                  }`}>
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1 hover:text-primary transition-colors">
                    <Link href={`/posts/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-gray-500">
                    {new Date(post.publishedAt!).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })} • {post.readTime} min read
                  </p>
                </div>
              </article>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
