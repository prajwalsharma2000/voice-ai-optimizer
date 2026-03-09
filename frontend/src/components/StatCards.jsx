import { Card, CardContent } from "./ui/card";
import { TrendingUp, FlaskConical, CheckCircle2, XCircle, Star, Shield } from "lucide-react";

const STAT_CONFIG = [
  {
    key: "success_rate",
    label: "Success Rate",
    icon: TrendingUp,
    format: (v) => `${v}%`,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    key: "total_tests",
    label: "Total Tests",
    icon: FlaskConical,
    format: (v) => v,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    key: "passed",
    label: "Passed Tests",
    icon: CheckCircle2,
    format: (v) => v,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    key: "failed",
    label: "Failed Tests",
    icon: XCircle,
    format: (v) => v,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    key: "average_quality_score",
    label: "Quality Score",
    icon: Star,
    format: (v) => `${v}/10`,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    key: "production_readiness",
    label: "Production Ready",
    icon: Shield,
    format: (v) => v === "READY" ? "Yes" : "No",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

export default function StatCards({ evaluation }) {
  return (
    <div data-testid="stat-cards" className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {STAT_CONFIG.map((stat, index) => {
        const Icon = stat.icon;
        const value = evaluation ? evaluation[stat.key] : "--";
        return (
          <Card
            key={stat.key}
            data-testid={`stat-card-${stat.key}`}
            className={`border border-border hover:shadow-md transition-shadow duration-200 ${
              evaluation ? `animate-slide-in-up stagger-${index + 1}` : ""
            }`}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <p className={`text-2xl font-bold font-display tracking-tight ${stat.color} ${evaluation ? "animate-count-up" : ""}`}>
                {evaluation ? stat.format(value) : "--"}
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
