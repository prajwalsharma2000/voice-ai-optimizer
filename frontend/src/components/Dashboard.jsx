import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, Mic2, FlaskConical, TrendingUp, Zap, Shield, Target } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Card, CardContent } from "./ui/card";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div data-testid="dashboard-page" className="space-y-8 max-w-5xl">
      {/* Hero section */}
      <div className="space-y-3 bg-card border border-border rounded-2xl p-8">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold px-2.5">
            AI-Powered
          </Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Voice AI Performance Optimizer
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          Analyze, test, and optimize your Voice AI agent prompts with our AI copilot. 
          Run automated test scenarios, evaluate performance, and get an optimized prompt in seconds.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <Button
            data-testid="get-started-btn"
            onClick={() => navigate("/optimizer")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 h-10 rounded-lg shadow-lg"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Start Optimizing
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <Separator className="bg-border" />

      {/* How it works */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Mic2,
              title: "1. Paste Your Prompt",
              description: "Enter your Voice AI agent prompt to begin the optimization process.",
            },
            {
              icon: FlaskConical,
              title: "2. AI Runs Tests",
              description: "Our AI generates test scenarios, simulates conversations, and evaluates results.",
            },
            {
              icon: TrendingUp,
              title: "3. Get Optimized",
              description: "Receive an optimized prompt with highlighted improvements and success metrics.",
            },
          ].map((step, i) => (
            <Card key={i} data-testid={`how-it-works-step-${i}`} className="bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-5">
                <div className="p-2.5 rounded-lg bg-primary/10 w-fit mb-3">
                  <step.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: Zap, title: "Real-Time Pipeline", desc: "Watch the AI analyze and optimize in real-time with live progress visualization." },
            { icon: Shield, title: "Comprehensive Testing", desc: "Auto-generated test scenarios covering edge cases, FAQs, and complex interactions." },
            { icon: Target, title: "Performance Metrics", desc: "Track success rates, pass/fail ratios, and identify improvement areas." },
            { icon: Sparkles, title: "Smart Optimization", desc: "AI-powered prompt improvements with side-by-side comparison view." },
          ].map((feature, i) => (
            <Card key={i} data-testid={`feature-card-${i}`} className="bg-card border border-border hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-4 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                  <feature.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{feature.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
