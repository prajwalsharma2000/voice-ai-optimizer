
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { FileText, Clock, AlertCircle, Calendar, ArrowRight } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { useOptimizer } from "../context/OptimizerContext";

export default function PromptVersions() {
  const { promptVersions } = useOptimizer();

  return (
    <div data-testid="prompt-versions-page" className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-display font-bold tracking-tight text-secondary">Prompt Versions</h1>
        <p className="text-sm text-muted-foreground mt-1">Track and compare different versions of your optimized prompts</p>
      </div>

      {promptVersions.length === 0 ? (
        <>
          <Card className="border border-border" data-testid="prompt-versions-empty-state">
            <CardContent className="py-16 flex flex-col items-center justify-center text-center">
              <div className="p-4 rounded-full bg-primary/10 mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-base font-semibold font-display text-secondary mb-1">No Prompt Versions Yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Optimized prompt versions will appear here after you run the AI copilot. Compare original and improved prompts side by side.
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>Versions are stored in-session only</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-muted-foreground" />
                Version Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Each time you run the AI optimization pipeline, the original and optimized prompts are captured as a version pair. Navigate to the Voice AI Optimizer to create your first optimization.
              </p>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="space-y-4">
          {promptVersions.map((version) => (
            <Card key={version.id} className="border border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <CardTitle className="text-sm font-display">Prompt Version</CardTitle>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(version.timestamp).toLocaleString()}
                    </Badge>
                    {version.expectedImprovement && (
                      <Badge className="text-xs bg-accent/10 text-accent border-accent/20">
                        {version.expectedImprovement}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {version.changes && version.changes.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Changes Applied</p>
                    <div className="flex flex-wrap gap-2">
                      {version.changes.map((change, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-primary/5 text-primary border-primary/15">
                          {change.description}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Original</p>
                    </div>
                    <ScrollArea className="h-[200px] rounded-lg border border-border bg-muted/30 p-3">
                      <pre className="text-xs font-code text-foreground whitespace-pre-wrap">{version.original}</pre>
                    </ScrollArea>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ArrowRight className="w-3 h-3 text-accent" />
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent">Optimized</p>
                    </div>
                    <ScrollArea className="h-[200px] rounded-lg border border-accent/20 bg-accent/5 p-3">
                      <pre className="text-xs font-code text-foreground whitespace-pre-wrap">{version.optimized}</pre>
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
