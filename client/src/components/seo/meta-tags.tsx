import { useEffect } from 'react';
import type { SEOData } from '@/lib/seo';

interface MetaTagsProps {
  seo: SEOData;
}

export function MetaTags({ seo }: MetaTagsProps) {
  useEffect(() => {
    // Update document title
    document.title = seo.title;

    // Update meta tags
    updateMetaTag('description', seo.description);
    if (seo.keywords) updateMetaTag('keywords', seo.keywords);
    
    // Update Open Graph tags
    updateMetaTag('og:title', seo.ogTitle || seo.title, 'property');
    updateMetaTag('og:description', seo.ogDescription || seo.description, 'property');
    if (seo.ogType) updateMetaTag('og:type', seo.ogType, 'property');
    if (seo.ogUrl) updateMetaTag('og:url', seo.ogUrl, 'property');
    if (seo.ogImage) updateMetaTag('og:image', seo.ogImage, 'property');

    // Update canonical URL
    if (seo.canonicalUrl) {
      updateLinkTag('canonical', seo.canonicalUrl);
    }

    // Update structured data
    if (seo.structuredData) {
      updateStructuredData(seo.structuredData);
    }
  }, [seo]);

  return null;
}

function updateMetaTag(name: string, content: string, attribute: string = 'name') {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  
  meta.content = content;
}

function updateLinkTag(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  
  link.href = href;
}

function updateStructuredData(data: object) {
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}
