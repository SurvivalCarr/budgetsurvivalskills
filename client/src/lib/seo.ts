export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export const defaultSEO: SEOData = {
  title: "Budget Survival Skills - Master Your Money & Emergency Preparedness",
  description: "Learn essential budget survival skills, emergency preparedness, and frugal living strategies. Expert tips for building emergency funds, meal planning, and financial resilience.",
  keywords: "budget survival, emergency fund, frugal living, financial preparedness, money saving tips",
  ogTitle: "Budget Survival Skills - Master Your Money & Emergency Preparedness",
  ogDescription: "Learn essential budget survival skills, emergency preparedness, and frugal living strategies.",
  ogType: "website",
  ogUrl: "https://budgetsurvivalskills.com",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Budget Survival Skills",
    "description": "Expert tips for budget survival, emergency preparedness, and frugal living",
    "url": "https://budgetsurvivalskills.com"
  }
};

export function generatePostSEO(post: any): SEOData {
  return {
    title: `${post.title} | Budget Survival Skills`,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords,
    ogTitle: post.title,
    ogDescription: post.excerpt,
    ogType: "article",
    ogUrl: `https://budgetsurvivalskills.com/posts/${post.slug}`,
    ogImage: post.imageUrl,
    canonicalUrl: `https://budgetsurvivalskills.com/posts/${post.slug}`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.imageUrl,
      "author": {
        "@type": "Organization",
        "name": "Budget Survival Skills"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Budget Survival Skills",
        "logo": {
          "@type": "ImageObject",
          "url": "https://budgetsurvivalskills.com/logo.png"
        }
      },
      "datePublished": post.publishedAt,
      "dateModified": post.publishedAt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://budgetsurvivalskills.com/posts/${post.slug}`
      }
    }
  };
}

export function generateCategorySEO(category: any): SEOData {
  return {
    title: `${category.name} Tips & Strategies | Budget Survival Skills`,
    description: `${category.description}. Expert advice and practical tips for ${category.name.toLowerCase()}.`,
    ogTitle: `${category.name} Tips & Strategies`,
    ogDescription: `${category.description}. Expert advice and practical tips for ${category.name.toLowerCase()}.`,
    ogType: "website",
    ogUrl: `https://budgetsurvivalskills.com/category/${category.slug}`,
    canonicalUrl: `https://budgetsurvivalskills.com/category/${category.slug}`,
  };
}
