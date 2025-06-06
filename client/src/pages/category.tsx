import { useQuery } from '@tanstack/react-query';
import { useParams } from 'wouter';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MetaTags } from '@/components/seo/meta-tags';
import { PostCard } from '@/components/blog/post-card';
import { Sidebar } from '@/components/layout/sidebar';
import { useRegion } from '@/components/region-selector';
import { generateCategorySEO } from '@/lib/seo';
import type { Category, PostWithCategory } from '@shared/schema';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { selectedRegion } = useRegion();
  
  const { data: category, isLoading: categoryLoading } = useQuery<Category>({
    queryKey: [`/api/categories/${slug}`],
    enabled: !!slug,
  });

  const { data: posts = [], isLoading: postsLoading } = useQuery<PostWithCategory[]>({
    queryKey: ['/api/posts', { categoryId: category?.id, region: selectedRegion }],
    enabled: !!category?.id,
  });

  if (categoryLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const seo = generateCategorySEO(category);

  return (
    <>
      <MetaTags seo={seo} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>

            {/* Category Header */}
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-xl text-gray-600 leading-relaxed">
                  {category.description}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-4">
                {posts.length} {posts.length === 1 ? 'article' : 'articles'} for {selectedRegion.toUpperCase()}
              </p>
            </header>

            {/* Posts Grid */}
            {postsLoading ? (
              <div className="grid md:grid-cols-2 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="animate-pulse">
                      <div className="bg-gray-300 h-48"></div>
                      <div className="p-6">
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-6 bg-gray-300 rounded mb-3"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles yet</h3>
                <p className="text-gray-600">Check back soon for new content in this category.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </>
  );
}
