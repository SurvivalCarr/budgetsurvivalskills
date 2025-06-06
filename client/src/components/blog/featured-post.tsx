import { Link } from 'wouter';
import { Calendar, Clock, Eye, ArrowRight, Flame } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { PostWithCategory } from '@shared/schema';

interface FeaturedPostProps {
  post: PostWithCategory;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Featured Article</h2>
        <Badge variant="destructive" className="bg-accent text-white">
          <Flame className="mr-1 h-3 w-3" />
          Trending
        </Badge>
      </div>
      
      <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <img
          src={post.imageUrl}
          alt={post.imageAlt || post.title}
          className="w-full h-64 object-cover"
        />
        
        <div className="p-8">
          <div className="flex items-center mb-4">
            {post.category && (
              <Badge className="bg-secondary text-white mr-3">
                {post.category.name}
              </Badge>
            )}
            <span className="text-gray-500 text-sm flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              {new Date(post.publishedAt!).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-primary transition-colors">
            <Link href={`/posts/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
          
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <span className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                {post.readTime} min read
              </span>
              <span className="flex items-center">
                <Eye className="mr-1 h-3 w-3" />
                {post.views.toLocaleString()} views
              </span>
            </div>
            <Link
              href={`/posts/${post.slug}`}
              className="text-primary hover:text-blue-700 font-semibold flex items-center"
            >
              Read More
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
