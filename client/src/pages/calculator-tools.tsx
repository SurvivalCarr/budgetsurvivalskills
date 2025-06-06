import { useState } from 'react';
import { MetaTags } from '@/components/seo/meta-tags';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, DollarSign, TrendingUp, PiggyBank, Clock } from 'lucide-react';

const calculatorSEO = {
  title: "Free Financial Calculator Tools | Budget Survival Skills",
  description: "Free financial calculators for emergency funds, debt payoff, savings goals, and budget planning. Region-specific tools for US, UK, Australia, and Canada.",
  ogTitle: "Free Financial Calculator Tools",
  ogDescription: "Calculate emergency fund needs, debt payoff times, and savings goals with our free financial calculators.",
  ogType: "website" as const,
  canonicalUrl: "https://budgetsurvivalskills.com/calculator-tools",
};

export default function CalculatorTools() {
  const [selectedCalculator, setSelectedCalculator] = useState("emergency-fund");

  // Emergency Fund Calculator
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [targetMonths, setTargetMonths] = useState("3");
  const [currentSavings, setCurrentSavings] = useState("");

  // Debt Payoff Calculator
  const [debtBalance, setDebtBalance] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");

  // Savings Goal Calculator
  const [savingsGoal, setSavingsGoal] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");

  const calculateEmergencyFund = () => {
    const expenses = parseFloat(monthlyExpenses);
    const months = parseInt(targetMonths);
    const current = parseFloat(currentSavings) || 0;
    
    if (!expenses || !months) return null;
    
    const targetAmount = expenses * months;
    const remainingAmount = Math.max(0, targetAmount - current);
    
    return {
      targetAmount,
      currentAmount: current,
      remainingAmount,
      percentComplete: (current / targetAmount) * 100
    };
  };

  const calculateDebtPayoff = () => {
    const balance = parseFloat(debtBalance);
    const rate = parseFloat(interestRate) / 100 / 12;
    const payment = parseFloat(monthlyPayment);
    
    if (!balance || !rate || !payment) return null;
    
    if (payment <= balance * rate) {
      return { error: "Payment too small to cover interest" };
    }
    
    const months = Math.ceil(-Math.log(1 - (balance * rate) / payment) / Math.log(1 + rate));
    const totalPaid = payment * months;
    const totalInterest = totalPaid - balance;
    
    return {
      months,
      years: Math.floor(months / 12),
      remainingMonths: months % 12,
      totalPaid,
      totalInterest
    };
  };

  const calculateSavingsGoal = () => {
    const goal = parseFloat(savingsGoal);
    const months = parseInt(timeframe);
    const current = parseFloat(currentAmount) || 0;
    
    if (!goal || !months) return null;
    
    const remainingAmount = Math.max(0, goal - current);
    const monthlyRequired = remainingAmount / months;
    
    return {
      goalAmount: goal,
      currentAmount: current,
      remainingAmount,
      monthlyRequired,
      timeframeMonths: months
    };
  };

  const emergencyFundResult = calculateEmergencyFund();
  const debtPayoffResult = calculateDebtPayoff();
  const savingsGoalResult = calculateSavingsGoal();

  return (
    <>
      <MetaTags seo={calculatorSEO} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="text-center mb-8">
              <Calculator className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Financial Calculator Tools</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Free financial calculators to help you plan your emergency fund, pay off debt, and reach your savings goals.
              </p>
            </div>

            {/* Calculator Selector */}
            <div className="mb-8">
              <Label htmlFor="calculator-select" className="text-lg font-semibold mb-3 block">
                Choose a Calculator
              </Label>
              <Select value={selectedCalculator} onValueChange={setSelectedCalculator}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a calculator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency-fund">Emergency Fund Calculator</SelectItem>
                  <SelectItem value="debt-payoff">Debt Payoff Calculator</SelectItem>
                  <SelectItem value="savings-goal">Savings Goal Calculator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Emergency Fund Calculator */}
            {selectedCalculator === "emergency-fund" && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PiggyBank className="w-6 h-6 text-primary mr-2" />
                    Emergency Fund Calculator
                  </CardTitle>
                  <CardDescription>
                    Calculate how much you need for your emergency fund and track your progress.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="monthly-expenses">Monthly Expenses</Label>
                      <Input
                        id="monthly-expenses"
                        type="number"
                        placeholder="3000"
                        value={monthlyExpenses}
                        onChange={(e) => setMonthlyExpenses(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="target-months">Target Months</Label>
                      <Select value={targetMonths} onValueChange={setTargetMonths}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 months</SelectItem>
                          <SelectItem value="6">6 months</SelectItem>
                          <SelectItem value="9">9 months</SelectItem>
                          <SelectItem value="12">12 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="current-savings">Current Emergency Savings (Optional)</Label>
                    <Input
                      id="current-savings"
                      type="number"
                      placeholder="500"
                      value={currentSavings}
                      onChange={(e) => setCurrentSavings(e.target.value)}
                    />
                  </div>

                  {emergencyFundResult && (
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Your Emergency Fund Plan</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Target Amount</p>
                          <p className="text-2xl font-bold text-blue-600">
                            ${emergencyFundResult.targetAmount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Amount Needed</p>
                          <p className="text-2xl font-bold text-green-600">
                            ${emergencyFundResult.remainingAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{emergencyFundResult.percentComplete.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${Math.min(100, emergencyFundResult.percentComplete)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Debt Payoff Calculator */}
            {selectedCalculator === "debt-payoff" && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-6 h-6 text-primary mr-2" />
                    Debt Payoff Calculator
                  </CardTitle>
                  <CardDescription>
                    Calculate how long it will take to pay off your debt with fixed monthly payments.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="debt-balance">Total Debt Balance</Label>
                      <Input
                        id="debt-balance"
                        type="number"
                        placeholder="5000"
                        value={debtBalance}
                        onChange={(e) => setDebtBalance(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="interest-rate">Annual Interest Rate (%)</Label>
                      <Input
                        id="interest-rate"
                        type="number"
                        placeholder="18.5"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthly-payment">Monthly Payment</Label>
                      <Input
                        id="monthly-payment"
                        type="number"
                        placeholder="200"
                        value={monthlyPayment}
                        onChange={(e) => setMonthlyPayment(e.target.value)}
                      />
                    </div>
                  </div>

                  {debtPayoffResult && (
                    <div className="bg-green-50 p-6 rounded-lg">
                      {debtPayoffResult.error ? (
                        <div className="text-red-600">
                          <p className="font-semibold">Error: {debtPayoffResult.error}</p>
                          <p className="text-sm mt-1">Your monthly payment must be higher than the monthly interest charge.</p>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-lg font-semibold mb-4">Debt Payoff Timeline</h3>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">Time to Pay Off</p>
                              <p className="text-2xl font-bold text-green-600">
                                {debtPayoffResult.years > 0 && `${debtPayoffResult.years}y `}
                                {debtPayoffResult.remainingMonths}m
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Total Interest Paid</p>
                              <p className="text-2xl font-bold text-red-600">
                                ${debtPayoffResult.totalInterest.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Total Amount Paid</p>
                              <p className="text-2xl font-bold text-blue-600">
                                ${debtPayoffResult.totalPaid.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Savings Goal Calculator */}
            {selectedCalculator === "savings-goal" && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-6 h-6 text-primary mr-2" />
                    Savings Goal Calculator
                  </CardTitle>
                  <CardDescription>
                    Calculate how much you need to save monthly to reach your financial goal.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="savings-goal">Savings Goal</Label>
                      <Input
                        id="savings-goal"
                        type="number"
                        placeholder="10000"
                        value={savingsGoal}
                        onChange={(e) => setSavingsGoal(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="timeframe">Timeframe (Months)</Label>
                      <Input
                        id="timeframe"
                        type="number"
                        placeholder="12"
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="current-amount">Current Amount Saved</Label>
                      <Input
                        id="current-amount"
                        type="number"
                        placeholder="1000"
                        value={currentAmount}
                        onChange={(e) => setCurrentAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  {savingsGoalResult && (
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Your Savings Plan</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Monthly Savings Required</p>
                          <p className="text-3xl font-bold text-purple-600">
                            ${savingsGoalResult.monthlyRequired.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Amount Still Needed</p>
                          <p className="text-2xl font-bold text-orange-600">
                            ${savingsGoalResult.remainingAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-white rounded">
                        <p className="text-sm text-gray-700">
                          <Clock className="w-4 h-4 inline mr-2" />
                          To reach your goal of <strong>${savingsGoalResult.goalAmount.toLocaleString()}</strong> in{" "}
                          <strong>{savingsGoalResult.timeframeMonths} months</strong>, you need to save{" "}
                          <strong>${savingsGoalResult.monthlyRequired.toFixed(2)} per month</strong>.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Tips Section */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Planning Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Emergency Fund Tips</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Start with a $1,000 starter emergency fund</li>
                      <li>• Aim for 3-6 months of expenses eventually</li>
                      <li>• Keep funds in a high-yield savings account</li>
                      <li>• Automate transfers to build consistently</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Debt Payoff Strategies</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Consider the debt snowball method</li>
                      <li>• Pay more than the minimum when possible</li>
                      <li>• Look into debt consolidation options</li>
                      <li>• Avoid taking on new debt while paying off existing debt</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Sidebar />
        </div>
      </div>
    </>
  );
}