import { useQuery } from '@tanstack/react-query';
import { useParams } from 'wouter';
import { Calendar, Clock, Eye, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MetaTags } from '@/components/seo/meta-tags';
import { Sidebar } from '@/components/layout/sidebar';
import { generatePostSEO } from '@/lib/seo';
import type { PostWithCategory } from '@shared/schema';

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: post, isLoading, error } = useQuery<PostWithCategory>({
    queryKey: [`/api/posts/${slug}`],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const seo = generatePostSEO(post);

  return (
    <>
      <MetaTags seo={seo} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-2">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Articles
              </Link>
            </Button>

            {/* Post Header */}
            <header className="mb-8">
              {post.category && (
                <Badge className="bg-secondary text-white mb-4">
                  {post.category.name}
                </Badge>
              )}
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex items-center text-gray-500 text-sm space-x-6 mb-6">
                <span className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(post.publishedAt!).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <span className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {post.readTime} min read
                </span>
                <span className="flex items-center">
                  <Eye className="mr-2 h-4 w-4" />
                  {post.views.toLocaleString()} views
                </span>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>
            </header>

            {/* Featured Image */}
            {post.imageUrl && (
              <div className="mb-8">
                <img
                  src={post.imageUrl}
                  alt={post.imageAlt || post.title}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              </div>
            )}

            {/* Post Content */}
            <div className="prose prose-lg max-w-none blog-content">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {post.content}
              </div>
            </div>

            {/* Social Sharing */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    const text = encodeURIComponent(post.title);
                    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
                  }}
                >
                  Share on Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                  }}
                >
                  Share on Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    const description = encodeURIComponent(post.excerpt);
                    window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${description}`, '_blank');
                  }}
                >
                  Save to Pinterest
                </Button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </>
  );
}
