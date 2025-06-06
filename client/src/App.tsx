import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Home from "@/pages/home";
import Post from "@/pages/post";
import CategoryPage from "@/pages/category";
import AllArticles from "@/pages/all-articles";
import StartHere from "@/pages/start-here";
import EmergencyFundGuide from "@/pages/emergency-fund-guide";
import Newsletter from "@/pages/newsletter";
import CalculatorTools from "@/pages/calculator-tools";
import FreeResources from "@/pages/free-resources";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import Disclaimer from "@/pages/disclaimer";
import Sitemap from "@/pages/sitemap";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import FinancialServices from "@/pages/financial-services";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/posts/:slug" component={Post} />
      <Route path="/category/:slug" component={CategoryPage} />
      <Route path="/all-articles" component={AllArticles} />
      <Route path="/start-here" component={StartHere} />
      <Route path="/emergency-fund-guide" component={EmergencyFundGuide} />
      <Route path="/newsletter" component={Newsletter} />
      <Route path="/calculator-tools" component={CalculatorTools} />
      <Route path="/free-resources" component={FreeResources} />
      <Route path="/financial-services" component={FinancialServices} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/sitemap" component={Sitemap} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50">
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1" role="main" tabIndex={-1}>
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
