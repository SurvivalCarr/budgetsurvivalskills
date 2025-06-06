import { users, type User, type InsertUser, categories, type Category, type InsertCategory, posts, type Post, type InsertPost, type PostWithCategory, subscribers, type Subscriber, type InsertSubscriber } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, or, ilike, sql } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategoryPostCount(categoryId: number, increment: number): Promise<void>;

  // Posts
  getPosts(options?: { limit?: number; categoryId?: number; featured?: boolean; region?: string }): Promise<PostWithCategory[]>;
  getPost(id: number): Promise<PostWithCategory | undefined>;
  getPostBySlug(slug: string): Promise<PostWithCategory | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post | undefined>;
  incrementPostViews(id: number): Promise<void>;
  searchPosts(query: string): Promise<PostWithCategory[]>;

  // Subscribers
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriber(email: string): Promise<Subscriber | undefined>;
  updateSubscriberPdfSent(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    this.initializeData().catch(console.error);
  }

  private async initializeData() {
    try {
      const existingCategories = await db.select().from(categories).limit(1);
      if (existingCategories.length > 0) {
        return;
      }

      const categoriesData = [
        { name: "Emergency Fund", slug: "emergency-fund", description: "Building and managing emergency savings" },
        { name: "Frugal Living", slug: "frugal-living", description: "Money-saving tips and strategies" },
        { name: "Meal Planning", slug: "meal-planning", description: "Budget-friendly meal planning and cooking" },
        { name: "Preparedness", slug: "preparedness", description: "Emergency preparedness and survival skills" },
        { name: "Side Hustles", slug: "side-hustles", description: "Extra income opportunities" },
        { name: "Debt Payoff", slug: "debt-payoff", description: "Strategies for paying off debt" },
      ];

      const insertedCategories = await db.insert(categories).values(categoriesData).returning();
      
      const postsData = [
        // US Region Articles
        {
          title: "How to Build a $1,000 Emergency Fund in Just 30 Days",
          slug: "how-to-build-1000-emergency-fund-in-30-days",
          excerpt: "Discover the exact step-by-step system that helped over 10,000 families build their first emergency fund quickly. Includes printable budget worksheets, side hustle ideas, and money-saving challenges.",
          content: "Building your first emergency fund can feel overwhelming, but with the right strategy, you can save $1,000 in just 30 days. This comprehensive guide will show you exactly how to do it...",
          metaDescription: "Learn how to build a $1000 emergency fund in 30 days with proven strategies, side hustles, and money-saving tips. Start your financial security today.",
          keywords: "emergency fund, save money fast, financial security, budget",
          categoryId: 1,
          imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          imageAlt: "Person organizing budget spreadsheet with emergency supplies",
          readTime: 8,
          views: 2847,
          featured: true,
          published: true,
          region: "us",
        },
        // UK Region Articles
        {
          title: "How to Build a £1,000 Emergency Fund in Just 30 Days",
          slug: "how-to-build-1000-pound-emergency-fund-in-30-days-uk",
          excerpt: "Discover the exact step-by-step system that helped over 10,000 British families build their first emergency fund quickly. Includes budget worksheets, side hustle ideas, and money-saving challenges using ISAs and UK banks.",
          content: "Building your first emergency fund can feel overwhelming, especially with rising costs in the UK. With the right strategy, you can save £1,000 in just 30 days using UK-specific methods. This guide shows you how to maximize UK savings accounts, ISAs, and cash back schemes. Week 1-4: Set up a high-interest instant access savings account or Cash ISA. Week 5-8: Use UK budgeting apps like Monzo or Starling Bank's built-in tools. Week 9-12: Start UK-specific side hustles like delivery driving or online tutoring. Week 13-16: Take advantage of UK cashback apps like TopCashback and Airtime Rewards. Week 17-20: Sell items on Vinted, Depop, or Facebook Marketplace. Week 21-24: Optimize your savings with premium bonds and high-yield accounts. This system works with UK banking and takes advantage of British financial products.",
          metaDescription: "Learn how to build a £1000 emergency fund in 30 days with UK-specific strategies, ISAs, side hustles, and money-saving tips for British families.",
          keywords: "emergency fund UK, save money UK, ISA savings, British financial security",
          categoryId: 1,
          imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          imageAlt: "British person organizing budget spreadsheet with emergency supplies",
          readTime: 8,
          views: 1847,
          featured: true,
          published: true,
          region: "uk",
        },
        // Australian Region Articles  
        {
          title: "How to Build a $1,500 Emergency Fund in Just 30 Days (Australia)",
          slug: "how-to-build-1500-dollar-emergency-fund-in-30-days-australia",
          excerpt: "Discover the exact step-by-step system that helped over 10,000 Aussie families build their first emergency fund quickly. Includes budget worksheets, side hustle ideas, and money-saving challenges using Australian banks and government programs.",
          content: "Building your first emergency fund can feel overwhelming, especially with Australia's high cost of living. With the right strategy, you can save $1,500 AUD in just 30 days using Australia-specific methods. This guide shows you how to maximize Australian savings accounts, government benefits, and local opportunities. Week 1-4: Set up a high-interest savings account with banks like ING, UBank, or Westpac. Week 5-8: Use Australian budgeting apps like Pocketbook or Up Bank. Week 9-12: Start Aussie-specific side hustles like Airtasker, food delivery, or online tutoring. Week 13-16: Take advantage of Australian cashback through Cashrewards and ShopBack. Week 17-20: Sell items on Gumtree, Facebook Marketplace, or Depop. Week 21-24: Optimize your savings with term deposits and government co-contribution schemes. This system works with Australian banking regulations and takes advantage of local financial products.",
          metaDescription: "Learn how to build a $1500 AUD emergency fund in 30 days with Australia-specific strategies, high-interest accounts, and money-saving tips for Aussie families.",
          keywords: "emergency fund Australia, save money Australia, Australian banks, financial security AUD",
          categoryId: 1,
          imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          imageAlt: "Australian person organizing budget spreadsheet with emergency supplies",
          readTime: 8,
          views: 1647,
          featured: true,
          published: true,
          region: "au",
        },
        // Canadian Region Articles
        {
          title: "How to Build a $1,400 Emergency Fund in Just 30 Days (Canada)",
          slug: "how-to-build-1400-dollar-emergency-fund-in-30-days-canada",
          excerpt: "Discover the exact step-by-step system that helped over 10,000 Canadian families build their first emergency fund quickly. Includes budget worksheets, side hustle ideas, and money-saving challenges using TFSAs and Canadian banks.",
          content: "Building your first emergency fund can feel overwhelming, especially with Canada's rising costs. With the right strategy, you can save $1,400 CAD in just 30 days using Canada-specific methods. This guide shows you how to maximize Canadian savings accounts, TFSAs, and government programs. Week 1-4: Set up a high-interest TFSA with Tangerine, Simplii Financial, or EQ Bank. Week 5-8: Use Canadian budgeting apps like Mint or YNAB with CAD support. Week 9-12: Start Canadian side hustles like Uber, DoorDash, or online tutoring. Week 13-16: Take advantage of Canadian cashback through Rakuten Canada and PC Optimum. Week 17-20: Sell items on Kijiji, Facebook Marketplace, or Poshmark. Week 21-24: Optimize your savings with GICs and maximize TFSA contributions. This system works with Canadian banking regulations and takes advantage of tax-free savings opportunities.",
          metaDescription: "Learn how to build a $1400 CAD emergency fund in 30 days with Canada-specific strategies, TFSAs, side hustles, and money-saving tips for Canadian families.",
          keywords: "emergency fund Canada, save money Canada, TFSA savings, Canadian financial security",
          categoryId: 1,
          imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          imageAlt: "Canadian person organizing budget spreadsheet with emergency supplies",
          readTime: 8,
          views: 1547,
          featured: true,
          published: true,
          region: "ca",
        },
        {
          title: "How to Feed a Family of 4 for $50 Per Week",
          slug: "feed-family-of-4-for-50-dollars-per-week",
          excerpt: "Complete meal planning system with shopping lists, batch cooking tips, and 28 budget-friendly recipes that will transform your grocery budget.",
          content: "Feeding a family on a tight budget doesn't mean sacrificing nutrition or taste. Here's how to create delicious, healthy meals for just $50 per week...",
          metaDescription: "Feed your family of 4 for only $50 per week with our complete meal planning guide, shopping lists, and budget-friendly recipes.",
          keywords: "meal planning, budget meals, cheap family meals, grocery budget",
          categoryId: 3,
          imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
          imageAlt: "Budget meal prep with affordable ingredients",
          readTime: 6,
          views: 1823,
          featured: false,
          published: true,
          region: "us",
        },
        // UK Meal Planning
        {
          title: "How to Feed a Family of 4 for £35 Per Week (UK)",
          slug: "feed-family-of-4-for-35-pounds-per-week-uk",
          excerpt: "Complete UK meal planning system using Tesco, ASDA, and Lidl. Includes shopping lists, batch cooking tips, and 28 British budget-friendly recipes.",
          content: "Feeding a family on a tight budget in the UK doesn't mean sacrificing nutrition. Here's how to create delicious meals for just £35 per week using UK supermarkets. Focus on UK staples like potatoes, carrots, onions, and seasonal vegetables from Lidl and Aldi. Use Tesco Clubcard prices and ASDA rollbacks. Plan meals around reduced sections and yellow sticker items. Include British favorites like shepherd's pie, bangers and mash, and hearty soups. Use apps like Too Good To Go for discounted food near expiry. Shop at markets for fresh produce and bulk buy frozen vegetables when on offer.",
          metaDescription: "Feed your family of 4 for only £35 per week with UK-specific meal planning, Tesco deals, and British budget-friendly recipes.",
          keywords: "meal planning UK, budget meals Britain, cheap family meals UK, Tesco budget",
          categoryId: 3,
          imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
          imageAlt: "UK budget meal prep with British ingredients",
          readTime: 6,
          views: 1523,
          featured: false,
          published: true,
          region: "uk",
        },
        // Australian Meal Planning
        {
          title: "How to Feed a Family of 4 for $75 AUD Per Week (Australia)",
          slug: "feed-family-of-4-for-75-dollars-aud-per-week-australia",
          excerpt: "Complete Australian meal planning system using Coles, Woolworths, and ALDI. Includes shopping lists, batch cooking tips, and 28 Aussie budget-friendly recipes.",
          content: "Feeding a family on a tight budget in Australia requires smart shopping strategies. Here's how to create nutritious meals for $75 AUD per week using Australian supermarkets. Take advantage of Coles and Woolworths weekly specials, ALDI Special Buys, and seasonal Australian produce. Focus on mince, chicken thighs, eggs, and local vegetables. Include Aussie favorites like meat pies, sausage rolls, and hearty casseroles. Use apps like Flybuys and Everyday Rewards for extra savings. Shop at local markets and consider bulk buying from wholesale stores.",
          metaDescription: "Feed your family of 4 for only $75 AUD per week with Australia-specific meal planning, Coles deals, and Aussie budget-friendly recipes.",
          keywords: "meal planning Australia, budget meals AUD, cheap family meals Australia, Coles Woolworths budget",
          categoryId: 3,
          imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
          imageAlt: "Australian budget meal prep with local ingredients",
          readTime: 6,
          views: 1423,
          featured: false,
          published: true,
          region: "au",
        },
        // Canadian Meal Planning
        {
          title: "How to Feed a Family of 4 for $70 CAD Per Week (Canada)",
          slug: "feed-family-of-4-for-70-dollars-cad-per-week-canada",
          excerpt: "Complete Canadian meal planning system using Loblaws, Metro, and No Frills. Includes shopping lists, batch cooking tips, and 28 Canadian budget-friendly recipes.",
          content: "Feeding a family on a tight budget in Canada requires strategic planning due to higher food costs. Here's how to create nutritious meals for $70 CAD per week using Canadian supermarkets. Take advantage of PC Optimum points, Loblaws sales, and No Frills pricing. Focus on ground beef, chicken, lentils, and seasonal Canadian produce. Include Canadian favorites like tourtière, poutine, and hearty stews. Use Flipp app to compare prices across stores. Shop at Costco for bulk items and consider frozen vegetables during winter months.",
          metaDescription: "Feed your family of 4 for only $70 CAD per week with Canada-specific meal planning, Loblaws deals, and Canadian budget-friendly recipes.",
          keywords: "meal planning Canada, budget meals CAD, cheap family meals Canada, Loblaws PC Optimum budget",
          categoryId: 3,
          imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
          imageAlt: "Canadian budget meal prep with local ingredients",
          readTime: 6,
          views: 1323,
          featured: false,
          published: true,
          region: "ca",
        },
        {
          title: "Extreme Couponing for Beginners: Save $200+ Monthly",
          slug: "extreme-couponing-beginners-guide-2024",
          excerpt: "Master the art of strategic couponing with apps, store policies, and stacking techniques that actually work in 2024.",
          content: "Extreme couponing isn't just for TV shows. With the right strategy, you can save hundreds every month on groceries and household items...",
          metaDescription: "Learn extreme couponing strategies for beginners and save $200+ monthly with apps, store policies, and proven stacking techniques.",
          keywords: "extreme couponing, save money shopping, coupon apps, grocery savings",
          categoryId: 2,
          imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
          imageAlt: "Smart shopping with coupons and price comparison",
          readTime: 7,
          views: 1542,
          featured: false,
          published: true,
          region: "us",
        },
        {
          title: "Build a 72-Hour Emergency Kit for Under $100",
          slug: "72-hour-emergency-kit-under-100-dollars",
          excerpt: "Essential items checklist, where to buy them cheap, and how to organize your emergency supplies for maximum effectiveness.",
          content: "A well-prepared 72-hour emergency kit doesn't have to break the bank. Here's how to build one for under $100 that will keep your family safe...",
          metaDescription: "Build a complete 72-hour emergency kit for under $100. Includes essential items checklist and money-saving tips for emergency preparedness.",
          keywords: "emergency kit, disaster preparedness, survival supplies, emergency planning",
          categoryId: 4,
          imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
          imageAlt: "Well-organized emergency supply kit on shelves",
          readTime: 5,
          views: 982,
          featured: false,
          published: true,
        },
        {
          title: "15 Side Hustles That Can Earn You $500+ Monthly",
          slug: "15-side-hustles-earn-500-extra-monthly",
          excerpt: "Proven side hustle ideas that require minimal startup costs but can generate substantial extra income for your emergency fund.",
          content: "Building your emergency fund faster requires extra income. These 15 side hustles can help you earn $500 or more each month...",
          metaDescription: "Discover 15 proven side hustles that can earn you $500+ monthly. Low startup costs, high earning potential for building your emergency fund.",
          keywords: "side hustles, extra income, make money online, passive income",
          categoryId: 5,
          imageUrl: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
          imageAlt: "Person working on side hustle from home office",
          readTime: 9,
          views: 2156,
          featured: false,
          published: true,
        },
        {
          title: "How to Save $5,000 in 6 Months: The Complete Action Plan",
          slug: "save-5000-dollars-in-6-months-action-plan",
          excerpt: "Follow this proven 6-month savings challenge with weekly goals, expense-cutting strategies, and income-boosting tactics that helped 500+ families save $5,000 fast.",
          content: "Saving $5,000 in just 6 months might seem impossible, but with the right strategy and commitment, it's absolutely achievable. This comprehensive plan breaks down exactly how to save $833 per month through a combination of expense reduction and income increase...",
          metaDescription: "Save $5,000 in 6 months with this proven action plan. Weekly goals, expense-cutting strategies, and income-boosting tactics that actually work.",
          keywords: "save money fast, 6 month savings challenge, emergency fund, financial goals",
          categoryId: 1,
          imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
          imageAlt: "Calculator and savings tracker showing financial progress",
          readTime: 10,
          views: 1245,
          featured: false,
          published: true,
        },
        {
          title: "The $20 Weekly Grocery Budget: Complete Shopping Guide + Meal Plans",
          slug: "20-dollar-weekly-grocery-budget-meal-plans",
          excerpt: "Feed yourself nutritiously on just $20 per week with strategic shopping lists, bulk cooking methods, and 21 filling meals that cost under $3 each.",
          content: "Living on a $20 weekly grocery budget requires strategic planning, but it's completely doable with the right approach...",
          metaDescription: "Learn how to eat well on just $20 per week with strategic meal plans, shopping lists, and budget-friendly recipes under $3 per serving.",
          keywords: "cheap groceries, budget meal planning, $20 grocery budget, frugal meals",
          categoryId: 3,
          imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
          imageAlt: "Budget grocery shopping cart with affordable healthy foods",
          readTime: 8,
          views: 987,
          featured: false,
          published: true,
        },
        {
          title: "Free Money: 25 Government Programs That Put Cash in Your Pocket",
          slug: "25-government-programs-free-money-assistance",
          excerpt: "Discover 25 legitimate government programs offering cash assistance, utility help, food benefits, and emergency aid that most people don't know about.",
          content: "Government assistance programs provide billions in support annually, but many eligible people never apply because they don't know these programs exist...",
          metaDescription: "25 legitimate government programs offering cash assistance, utility help, and emergency aid. Find out which programs you qualify for today.",
          keywords: "government assistance, emergency financial help, free money programs, social services",
          categoryId: 1,
          imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
          imageAlt: "Government building representing financial assistance programs",
          readTime: 12,
          views: 2134,
          featured: false,
          published: true,
        },
        {
          title: "Zero-Waste Living on a Budget: Save $300+ Monthly Going Green",
          slug: "zero-waste-living-budget-save-money-green",
          excerpt: "Cut your monthly expenses by $300+ with zero-waste strategies that reduce trash, eliminate single-use items, and create sustainable savings habits.",
          content: "Zero-waste living isn't just good for the environment—it's incredibly budget-friendly...",
          metaDescription: "Save $300+ monthly with zero-waste living strategies. Reduce expenses while helping the environment with practical money-saving tips.",
          keywords: "zero waste budget, save money going green, frugal sustainable living, eco-friendly savings",
          categoryId: 2,
          imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
          imageAlt: "Reusable containers and eco-friendly products for zero waste living",
          readTime: 9,
          views: 876,
          featured: false,
          published: true,
        },
        {
          title: "DIY Home Security System for Under $200: Protect Your Family Cheaply",
          slug: "diy-home-security-system-under-200-dollars",
          excerpt: "Build a comprehensive home security system for under $200 using smart technology, motion sensors, cameras, and deterrent strategies that rival expensive systems.",
          content: "Professional home security systems cost $500+ to install plus monthly fees, but you can create an equally effective system for under $200...",
          metaDescription: "Build an effective home security system for under $200. Smart cameras, sensors, and deterrents that protect your family without monthly fees.",
          keywords: "DIY home security, cheap security system, home protection budget, security cameras",
          categoryId: 4,
          imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
          imageAlt: "DIY security camera and smart home protection setup",
          readTime: 11,
          views: 1432,
          featured: false,
          published: true,
        },
        {
          title: "Flip Thrift Store Finds for $500+ Monthly Profit: Complete Guide",
          slug: "flip-thrift-store-finds-500-monthly-profit",
          excerpt: "Turn thrift shopping into a profitable side hustle earning $500+ monthly. Learn what to buy, where to sell, and how to spot valuable items others miss.",
          content: "Thrift store flipping has become a legitimate side hustle earning many people $500-2000+ monthly...",
          metaDescription: "Make $500+ monthly flipping thrift store finds. Complete guide to profitable reselling with tips on what to buy and where to sell.",
          keywords: "thrift store flipping, reselling for profit, side hustle income, thrift shopping tips",
          categoryId: 5,
          imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
          imageAlt: "Thrift store clothing racks with vintage items for resale",
          readTime: 13,
          views: 1876,
          featured: false,
          published: true,
        },
        {
          title: "Pay Off $10K Debt in 12 Months: The Aggressive Payoff Strategy",
          slug: "pay-off-10k-debt-in-12-months-strategy",
          excerpt: "Eliminate $10,000 in debt within 12 months using the aggressive payoff method, debt consolidation strategies, and income maximization techniques.",
          content: "Paying off $10,000 in debt requires paying approximately $833 per month, but strategic approaches can make this achievable even on modest incomes...",
          metaDescription: "Pay off $10,000 debt in 12 months with aggressive strategies, debt consolidation tips, and income maximization techniques that work.",
          keywords: "debt payoff, eliminate debt fast, debt snowball, debt consolidation strategies",
          categoryId: 6,
          imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
          imageAlt: "Person cutting up credit cards and planning debt payoff strategy",
          readTime: 9,
          views: 2187,
          featured: false,
          published: true,
        },
        {
          title: "Free and Cheap Date Ideas: 50 Ways to Have Fun on Any Budget",
          slug: "free-cheap-date-ideas-50-budget-friendly",
          excerpt: "Enjoy romance without breaking the bank with 50 creative date ideas that cost nothing to under $20. Build relationships while staying financially responsible.",
          content: "Dating doesn't have to drain your budget. These 50 date ideas prove you can have meaningful experiences for free or under $20...",
          metaDescription: "50 free and cheap date ideas under $20. Enjoy romance and build relationships without breaking your budget with creative, fun activities.",
          keywords: "cheap date ideas, free date activities, budget dating, frugal romance",
          categoryId: 2,
          imageUrl: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
          imageAlt: "Couple having a picnic in the park for a budget-friendly date",
          readTime: 7,
          views: 1345,
          featured: false,
          published: true,
        },
        {
          title: "Emergency Car Kit Essentials: 30 Items That Could Save Your Life",
          slug: "emergency-car-kit-essentials-30-items-safety",
          excerpt: "Build a comprehensive emergency car kit with 30 essential items that could save your life during breakdowns, accidents, or severe weather emergencies.",
          content: "A well-stocked emergency car kit can mean the difference between a minor inconvenience and a life-threatening situation...",
          metaDescription: "Build a life-saving emergency car kit with 30 essential items. Be prepared for breakdowns, accidents, and severe weather emergencies.",
          keywords: "emergency car kit, roadside emergency, car safety supplies, emergency preparedness",
          categoryId: 4,
          imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
          imageAlt: "Emergency car kit supplies laid out including first aid and safety items",
          readTime: 8,
          views: 1123,
          featured: false,
          published: true,
        },
        {
          title: "Cashback Credit Card Strategy: Earn $1,000+ Annually Without Debt",
          slug: "cashback-credit-card-strategy-earn-1000-annually",
          excerpt: "Master the cashback credit card game to earn $1,000+ annually through strategic spending, bonus categories, and sign-up rewards while avoiding debt traps.",
          content: "Credit card cashback rewards can generate $1,000+ annually when used strategically, but only if you pay balances in full monthly...",
          metaDescription: "Earn $1,000+ annually with strategic cashback credit card use. Maximize rewards while avoiding debt with proven strategies and tips.",
          keywords: "credit card cashback, credit card rewards, earn money cashback, credit card strategy",
          categoryId: 5,
          imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
          imageAlt: "Credit cards and calculator showing cashback rewards strategy",
          readTime: 10,
          views: 1678,
          featured: false,
          published: true,
        },
      ];

      await db.insert(posts).values(postsData);

      // Update category post counts
      await db.execute(sql`
        UPDATE ${categories} 
        SET post_count = (
          SELECT COUNT(*) 
          FROM ${posts} 
          WHERE ${posts.categoryId} = ${categories.id} 
          AND ${posts.published} = true
        )
      `);
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category || undefined;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category || undefined;
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db.insert(categories).values(insertCategory).returning();
    return category;
  }

  async updateCategoryPostCount(categoryId: number, increment: number): Promise<void> {
    await db.execute(sql`
      UPDATE ${categories} 
      SET post_count = COALESCE(post_count, 0) + ${increment}
      WHERE id = ${categoryId}
    `);
  }

  async getPosts(options: { limit?: number; categoryId?: number; featured?: boolean; region?: string } = {}): Promise<PostWithCategory[]> {
    const conditions = [eq(posts.published, true)];
    
    if (options.categoryId) {
      conditions.push(eq(posts.categoryId, options.categoryId));
    }

    if (options.featured !== undefined) {
      conditions.push(eq(posts.featured, options.featured));
    }

    if (options.region) {
      conditions.push(eq(posts.region, options.region));
    }

    let query = db.select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      content: posts.content,
      metaDescription: posts.metaDescription,
      keywords: posts.keywords,
      categoryId: posts.categoryId,
      imageUrl: posts.imageUrl,
      imageAlt: posts.imageAlt,
      readTime: posts.readTime,
      views: posts.views,
      featured: posts.featured,
      published: posts.published,
      publishedAt: posts.publishedAt,
      region: posts.region,
      category: {
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
        postCount: categories.postCount,
      }
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(and(...conditions))
    .orderBy(desc(posts.publishedAt));

    if (options.limit) {
      query = query.limit(options.limit) as typeof query;
    }

    const results = await query;
    return results.map(row => ({
      ...row,
      category: row.category?.id ? row.category : undefined
    })) as PostWithCategory[];
  }

  async getPost(id: number): Promise<PostWithCategory | undefined> {
    const [result] = await db.select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      content: posts.content,
      metaDescription: posts.metaDescription,
      keywords: posts.keywords,
      categoryId: posts.categoryId,
      imageUrl: posts.imageUrl,
      imageAlt: posts.imageAlt,
      readTime: posts.readTime,
      views: posts.views,
      featured: posts.featured,
      published: posts.published,
      publishedAt: posts.publishedAt,
      region: posts.region,
      category: {
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
        postCount: categories.postCount,
      }
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(eq(posts.id, id));

    if (!result) return undefined;

    return {
      ...result,
      category: result.category?.id ? result.category : undefined
    };
  }

  async getPostBySlug(slug: string): Promise<PostWithCategory | undefined> {
    const [result] = await db.select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      content: posts.content,
      metaDescription: posts.metaDescription,
      keywords: posts.keywords,
      categoryId: posts.categoryId,
      imageUrl: posts.imageUrl,
      imageAlt: posts.imageAlt,
      readTime: posts.readTime,
      views: posts.views,
      featured: posts.featured,
      published: posts.published,
      publishedAt: posts.publishedAt,
      region: posts.region,
      category: {
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
        postCount: categories.postCount,
      }
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(eq(posts.slug, slug));

    if (!result) return undefined;

    return {
      ...result,
      category: result.category?.id ? result.category : undefined
    } as PostWithCategory;
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const [post] = await db.insert(posts).values(insertPost).returning();
    
    if (post.categoryId) {
      await this.updateCategoryPostCount(post.categoryId, 1);
    }
    
    return post;
  }

  async updatePost(id: number, updateData: Partial<InsertPost>): Promise<Post | undefined> {
    const [post] = await db.update(posts).set(updateData).where(eq(posts.id, id)).returning();
    return post || undefined;
  }

  async incrementPostViews(id: number): Promise<void> {
    await db.execute(sql`
      UPDATE ${posts} 
      SET views = COALESCE(views, 0) + 1 
      WHERE id = ${id}
    `);
  }

  async searchPosts(query: string): Promise<PostWithCategory[]> {
    const searchTerm = `%${query.toLowerCase()}%`;
    
    const results = await db.select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      content: posts.content,
      metaDescription: posts.metaDescription,
      keywords: posts.keywords,
      categoryId: posts.categoryId,
      imageUrl: posts.imageUrl,
      imageAlt: posts.imageAlt,
      readTime: posts.readTime,
      views: posts.views,
      featured: posts.featured,
      published: posts.published,
      publishedAt: posts.publishedAt,
      region: posts.region,
      category: {
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
        postCount: categories.postCount,
      }
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(
      and(
        eq(posts.published, true),
        or(
          ilike(posts.title, searchTerm),
          ilike(posts.excerpt, searchTerm),
          ilike(posts.content, searchTerm)
        )
      )
    )
    .orderBy(desc(posts.publishedAt));

    return results.map(row => ({
      ...row,
      category: row.category?.id ? row.category : undefined
    })) as PostWithCategory[];
  }

  // Subscriber methods
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const [subscriber] = await db
      .insert(subscribers)
      .values(insertSubscriber)
      .returning();
    return subscriber;
  }

  async getSubscriber(email: string): Promise<Subscriber | undefined> {
    const [subscriber] = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email))
      .limit(1);
    return subscriber;
  }

  async updateSubscriberPdfSent(id: number): Promise<void> {
    await db
      .update(subscribers)
      .set({ pdfSent: true })
      .where(eq(subscribers.id, id));
  }
}

export const storage = new DatabaseStorage();