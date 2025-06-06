import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPostSchema, insertCategorySchema, insertSubscriberSchema } from "@shared/schema";
import { z } from "zod";
import { forwardSubscriberEmail, sendPDFToSubscriber, sendContactFormEmail } from "./email";
import { generatePDFContent, textToPDFBase64 } from "./pdf-generator";

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories
  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedData);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid category data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create category" });
    }
  });

  // Posts
  app.get("/api/posts", async (req, res) => {
    try {
      const { limit, categoryId, featured, region } = req.query;
      const options: any = {};
      
      if (limit) options.limit = parseInt(limit as string);
      if (categoryId) options.categoryId = parseInt(categoryId as string);
      if (featured !== undefined) options.featured = featured === 'true';
      if (region) options.region = region as string;
      
      const posts = await storage.getPosts(options);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const posts = await storage.searchPosts(q);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to search posts" });
    }
  });

  app.get("/api/posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getPostBySlug(slug);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      // Increment view count
      await storage.incrementPostViews(post.id);
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  app.post("/api/posts", async (req, res) => {
    try {
      const validatedData = insertPostSchema.parse(req.body);
      const post = await storage.createPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid post data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  // PDF Download subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscriber = await storage.getSubscriber(validatedData.email);
      if (existingSubscriber) {
        return res.status(400).json({ message: "Email already subscribed" });
      }

      // Create subscriber
      const subscriber = await storage.createSubscriber(validatedData);
      
      // Generate region-specific PDF content
      const pdfTextContent = generatePDFContent(validatedData.region);
      const pdfBase64 = textToPDFBase64(pdfTextContent);
      
      // Send PDF to subscriber
      const emailSent = await sendPDFToSubscriber(
        validatedData.email,
        validatedData.name,
        validatedData.region,
        pdfBase64
      );

      // Forward subscriber info to owner
      if (emailSent) {
        await forwardSubscriberEmail(
          validatedData.email,
          validatedData.name,
          validatedData.region
        );
        
        // Mark PDF as sent
        await storage.updateSubscriberPdfSent(subscriber.id);
      }

      res.json({ 
        message: "Successfully subscribed! Check your email for the PDF guide.",
        success: emailSent
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid subscription data", errors: error.errors });
      }
      console.error('Subscription error:', error);
      res.status(500).json({ message: "Failed to process subscription" });
    }
  });

  // Contact Form
  const contactFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Valid email is required"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(5, "Message must be at least 5 characters")
  });

  app.post("/api/contact", async (req, res) => {
    try {
      console.log('Contact form request body:', req.body);
      const contactData = contactFormSchema.parse(req.body);
      console.log('Parsed contact data:', contactData);
      
      const emailSent = await sendContactFormEmail(contactData);
      
      if (emailSent) {
        res.json({ success: true, message: "Message sent successfully!" });
      } else {
        res.status(500).json({ success: false, message: "Failed to send message. Please try again." });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation errors:', error.errors);
        return res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      console.error('Contact form error:', error);
      res.status(500).json({ success: false, message: "Failed to send message. Please try again." });
    }
  });

  // RSS Feed
  app.get("/api/rss", async (_req, res) => {
    try {
      const posts = await storage.getPosts({ limit: 20 });
      
      const rssItems = posts.map(post => `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <description><![CDATA[${post.excerpt}]]></description>
          <link>https://budgetsurvivalskills.com/posts/${post.slug}</link>
          <guid>https://budgetsurvivalskills.com/posts/${post.slug}</guid>
          <pubDate>${new Date(post.publishedAt!).toUTCString()}</pubDate>
        </item>
      `).join('');

      const rss = `<?xml version="1.0" encoding="UTF-8"?>
        <rss version="2.0">
          <channel>
            <title>Budget Survival Skills</title>
            <description>Expert tips for budget survival, emergency preparedness, and frugal living</description>
            <link>https://budgetsurvivalskills.com</link>
            <language>en-us</language>
            <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
            ${rssItems}
          </channel>
        </rss>`;

      res.set('Content-Type', 'application/rss+xml');
      res.send(rss);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate RSS feed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
