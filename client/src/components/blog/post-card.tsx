import { Link } from 'wouter';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { PostWithCategory } from '@shared/schema';

interface PostCardProps {
  post: PostWithCategory;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
      <article>
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.imageAlt || post.title}
            className="w-full h-48 sm:h-52 object-cover"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        )}
        {!post.imageUrl && (
          <div className="w-full h-48 sm:h-52 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium">{post.category?.name || 'Financial Guide'}</div>
            </div>
          </div>
        )}
        
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 mb-3">
            {post.category && (
              <Badge variant="secondary" className="text-xs mr-0 sm:mr-3 w-fit">
                {post.category.name}
              </Badge>
            )}
            <time 
              className="text-gray-500 text-sm"
              dateTime={new Date(post.publishedAt!).toISOString()}
            >
              {new Date(post.publishedAt!).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </time>
          </div>
          
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 leading-tight">
            <Link 
              href={`/posts/${post.slug}`}
              className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-describedby={`excerpt-${post.id}`}
            >
              {post.title}
            </Link>
          </h3>
          
          <p 
            id={`excerpt-${post.id}`}
            className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-3"
          >
            {post.excerpt.length > 120 ? `${post.excerpt.slice(0, 120)}...` : post.excerpt}
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center" aria-label={`${post.readTime} minute read`}>
              <Clock className="mr-1 h-3 w-3" aria-hidden="true" />
              {post.readTime} min read
            </span>
            <Link
              href={`/posts/${post.slug}`}
              className="text-primary hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1"
              aria-label={`Read more about ${post.title}`}
            >
              Read More
            </Link>
          </div>
        </CardContent>
      </article>
    </Card>
  );
}
