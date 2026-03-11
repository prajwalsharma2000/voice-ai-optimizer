import { Search, FlaskConical, Play, BarChart3, Wand2, Check, Loader2, X } from "lucide-react";

const STEPS = [
  { key: "analyze", label: "Analyze Prompt", icon: Search },
  { key: "generate", label: "Generate Tests", icon: FlaskConical },
  { key: "simulate", label: "Run Tests", icon: Play },
  { key: "evaluate", label: "Evaluate Results", icon: BarChart3 },
  { key: "optimize", label: "Optimize Prompt", icon: Wand2 },
];

export default function PipelineVisualizer({ currentStep, stepStatuses }) {
  return (
    <div data-testid="pipeline-visualizer" className="w-full">
      <div className="flex items-center justify-between relative">
        {STEPS.map((step, index) => {
          const status = stepStatuses[step.key] || "pending";
          const Icon = step.icon;

          const isCompleted = status === "completed";
          const isRunning = status === "running";
          const isFailed = status === "failed";
          const isPending = !isCompleted && !isRunning && !isFailed;

          return (
            <div key={step.key} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2 relative z-10">
                <div
                  data-testid={`pipeline-step-${step.key}`}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isCompleted
                      ? "bg-accent text-white ring-4 ring-accent/20"
                      : isRunning
                      ? "bg-primary text-white ring-4 ring-primary/20 animate-pulse-ring"
                      : isFailed
                      ? "bg-destructive text-white ring-4 ring-destructive/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : isRunning ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : isFailed ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`text-xs font-medium text-center whitespace-nowrap transition-colors duration-300 ${
                    isCompleted
                      ? "text-accent"
                      : isRunning
                      ? "text-primary font-semibold"
                      : isFailed
                      ? "text-destructive font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index < STEPS.length - 1 && (
                <div className="flex-1 h-[2px] bg-muted mx-3 mt-[-20px] relative overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 transition-all duration-700 ease-out ${
                      isCompleted ? "w-full bg-accent" : isRunning ? "w-1/2 bg-primary animate-shimmer" : isFailed ? "w-full bg-destructive" : "w-0"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { STEPS };
