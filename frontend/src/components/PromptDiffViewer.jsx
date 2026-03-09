import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Wand2, FileText, ArrowRight, Plus, Shield, AlertTriangle, TrendingUp } from "lucide-react";

export default function PromptDiffViewer({ originalPrompt, optimization }) {
  if (!optimization) return null;

  const optimizedPrompt = optimization.optimized_prompt || "";
  const changes = optimization.changes || [];
  const expectedImprovement = optimization.expected_improvement || "";
  const confidenceScore = optimization.confidence_score || 0;
  const productionReady = optimization.production_ready;
  const remainingRisks = optimization.remaining_risks || [];

  return (
    <Card data-testid="prompt-diff-viewer" className="border border-border animate-slide-in-up overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-primary" />
            <CardTitle className="text-base font-display">Prompt Optimization</CardTitle>
          </div>
        </div>
        <div className="flex items-center gap-2">
            {confidenceScore > 0 && (
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/15 text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                {confidenceScore}/10 Confidence
              </Badge>
            )}
            {productionReady !== undefined && (
              <Badge
                className={`text-xs ${
                  productionReady
                    ? "bg-accent/10 text-accent border-accent/20"
                    : "bg-destructive/10 text-destructive border-destructive/20"
                }`}
                variant="outline"
              >
                <Shield className="w-3 h-3 mr-1" />
                {productionReady ? "Production Ready" : "Not Ready"}
              </Badge>
            )}
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
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Changes Applied</p>
            <Accordion type="single" collapsible className="w-full space-y-2">
              {changes.map((change, i) => (
                <AccordionItem key={i} value={`change-${i}`} className="border border-border rounded-lg px-3">
                  <AccordionTrigger className="py-2 text-xs hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Plus className="w-3 h-3 text-accent" />
                      <span className="text-accent font-medium">{change.description}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs space-y-2 pb-3">
                    {change.reason && (
                      <div>
                        <p className="font-semibold text-muted-foreground mb-1">Reason:</p>
                        <p className="text-foreground">{change.reason}</p>
                      </div>
                    )}
                    {change.addresses && (
                      <div>
                        <p className="font-semibold text-muted-foreground mb-1">Addresses:</p>
                        <p className="text-foreground">{change.addresses}</p>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {remainingRisks.length > 0 && (
          <div className="px-6 pb-4">
            <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <p className="text-xs font-semibold text-destructive">Remaining Risks</p>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
                {remainingRisks.map((risk, i) => (
                  <li key={i}>{risk}</li>
                ))}
              </ul>
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
