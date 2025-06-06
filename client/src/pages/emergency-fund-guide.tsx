import { Link } from 'wouter';
import { MetaTags } from '@/components/seo/meta-tags';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, Target, DollarSign, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export default function EmergencyFundGuide() {
  const seoData = {
    title: 'Complete Emergency Fund Guide - Start Your Financial Safety Net',
    description: 'Step-by-step guide to building your emergency fund from $0 to 6 months of expenses. Includes savings strategies, account recommendations, and common mistakes to avoid.',
    canonicalUrl: '/emergency-fund-guide'
  };

  const milestones = [
    { amount: 500, description: "Covers minor emergencies like car repairs" },
    { amount: 1000, description: "Breaks the paycheck-to-paycheck cycle" },
    { amount: 2500, description: "Handles major unexpected expenses" },
    { amount: 5000, description: "Provides 1-2 months of basic living expenses" },
    { amount: 10000, description: "Full 3-6 months emergency fund for most families" }
  ];

  const savingStrategies = [
    {
      title: "Automate Your Savings",
      description: "Set up automatic transfers to your emergency fund every payday",
      icon: Target,
      tips: ["Start with $25-50 per week", "Use a separate high-yield savings account", "Treat it like a non-negotiable bill"]
    },
    {
      title: "Use Windfalls Wisely",
      description: "Direct unexpected money straight to your emergency fund",
      icon: TrendingUp,
      tips: ["Tax refunds", "Work bonuses", "Cash gifts", "Side hustle earnings"]
    },
    {
      title: "Cut Expenses Temporarily",
      description: "Reduce spending for 3-6 months to fast-track your fund",
      icon: DollarSign,
      tips: ["Cancel unused subscriptions", "Eat out less frequently", "Delay major purchases", "Use generic brands"]
    }
  ];

  return (
    <>
      <MetaTags seo={seoData} />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 rounded-full p-4">
                <Shield className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Complete Emergency Fund Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build your financial safety net step-by-step. This guide will take you from $0 to a fully-funded emergency account that protects your family from unexpected expenses.
            </p>
          </div>

          {/* Why You Need an Emergency Fund */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                Why Emergency Funds Matter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Without an Emergency Fund:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Credit card debt from unexpected expenses</li>
                    <li>• Stress and anxiety about money</li>
                    <li>• Borrowing from family or friends</li>
                    <li>• Raiding retirement accounts</li>
                    <li>• Taking high-interest loans</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">With an Emergency Fund:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Peace of mind during crises</li>
                    <li>• No new debt from emergencies</li>
                    <li>• Financial independence</li>
                    <li>• Ability to take calculated risks</li>
                    <li>• Protection of long-term investments</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Savings Milestones */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Emergency Fund Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={milestone.amount} className="flex items-center gap-4">
                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">${milestone.amount.toLocaleString()}</span>
                        <span className="text-sm text-gray-600">{milestone.description}</span>
                      </div>
                      <Progress value={(index + 1) * 20} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Saving Strategies */}
          <div className="grid gap-8 mb-12">
            {savingStrategies.map((strategy) => {
              const IconComponent = strategy.icon;
              return (
                <Card key={strategy.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <IconComponent className="h-6 w-6 text-primary" />
                      {strategy.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{strategy.description}</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {strategy.tips.map((tip, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Where to Keep Your Emergency Fund */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Where to Keep Your Emergency Fund</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-green-600 font-bold text-2xl mb-2">✓</div>
                  <h3 className="font-semibold mb-2">High-Yield Savings</h3>
                  <p className="text-sm text-gray-600">Easy access with better interest rates than traditional savings</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-green-600 font-bold text-2xl mb-2">✓</div>
                  <h3 className="font-semibold mb-2">Money Market Account</h3>
                  <p className="text-sm text-gray-600">Higher interest with limited check-writing ability</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-red-600 font-bold text-2xl mb-2">✗</div>
                  <h3 className="font-semibold mb-2">Checking Account</h3>
                  <p className="text-sm text-gray-600">Too easy to spend accidentally</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Mistakes */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-red-600">Common Emergency Fund Mistakes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-red-400 pl-4">
                  <h3 className="font-semibold">Using it for non-emergencies</h3>
                  <p className="text-gray-700">Vacations, holiday gifts, or "good deals" are not emergencies</p>
                </div>
                <div className="border-l-4 border-red-400 pl-4">
                  <h3 className="font-semibold">Keeping it too accessible</h3>
                  <p className="text-gray-700">Don't link it to your debit card or keep it in checking</p>
                </div>
                <div className="border-l-4 border-red-400 pl-4">
                  <h3 className="font-semibold">Not replacing what you use</h3>
                  <p className="text-gray-700">Replenish your fund immediately after using it</p>
                </div>
                <div className="border-l-4 border-red-400 pl-4">
                  <h3 className="font-semibold">Waiting for the "perfect" amount</h3>
                  <p className="text-gray-700">Start with $100. Something is better than nothing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Building Your Emergency Fund?</h2>
            <p className="text-gray-700 mb-6">
              The best time to start was yesterday. The second best time is today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/category/emergency-fund">Read Emergency Fund Articles</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/start-here">Back to Start Here Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}