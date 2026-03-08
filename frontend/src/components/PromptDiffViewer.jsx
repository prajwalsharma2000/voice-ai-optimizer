import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Wand2, FileText, ArrowRight, Plus } from "lucide-react";

export default function PromptDiffViewer({ originalPrompt, optimization }) {
  if (!optimization) return null;

  const optimizedPrompt = optimization.optimized_prompt || "";
  const changes = optimization.changes || [];
  const expectedImprovement = optimization.expected_improvement || "";

  return (
    <Card data-testid="prompt-diff-viewer" className="border border-border animate-slide-in-up overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-primary" />
            <CardTitle className="text-base font-display">Prompt Optimization</CardTitle>
          </div>
          {expectedImprovement && (
            <Badge
              data-testid="improvement-badge"
              className="bg-accent/10 text-accent border-accent/20 text-xs"
              variant="outline"
            >
              {expectedImprovement}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {/* Changes summary */}
        {changes.length > 0 && (
          <div className="px-6 pb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Changes Applied</p>
            <div className="flex flex-wrap gap-2">
              {changes.map((change, i) => (
                <div
                  key={i}
                  data-testid={`change-badge-${i}`}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent/5 border border-accent/10 text-xs text-accent"
                >
                  <Plus className="w-3 h-3" />
                  {change.description}
                </div>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Side by side diff */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-x divide-border">
          {/* Original */}
          <div>
            <div className="px-4 py-2.5 bg-destructive/5 border-b border-border flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-destructive/70" />
              <span className="text-xs font-semibold text-destructive/80 uppercase tracking-wider">Original Prompt</span>
            </div>
            <ScrollArea className="h-[320px]">
              <pre
                data-testid="original-prompt-display"
                className="p-4 text-sm font-code leading-relaxed text-foreground/80 whitespace-pre-wrap break-words"
              >
                {originalPrompt}
              </pre>
            </ScrollArea>
          </div>

          {/* Optimized */}
          <div>
            <div className="px-4 py-2.5 bg-accent/5 border-b border-border flex items-center gap-2">
              <Wand2 className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">Optimized Prompt</span>
              <ArrowRight className="w-3 h-3 text-accent ml-auto" />
            </div>
            <ScrollArea className="h-[320px]">
              <pre
                data-testid="optimized-prompt-display"
                className="p-4 text-sm font-code leading-relaxed text-foreground/80 whitespace-pre-wrap break-words"
              >
                {optimizedPrompt}
              </pre>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
