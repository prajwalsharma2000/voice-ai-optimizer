
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { FlaskConical, Clock, AlertCircle, Calendar, TrendingUp } from "lucide-react";
import { useOptimizer } from "../context/OptimizerContext";

export default function TestRuns() {
  const { testRuns } = useOptimizer();

  return (
    <div data-testid="test-runs-page" className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-display font-bold tracking-tight text-secondary">Test Runs</h1>
        <p className="text-sm text-muted-foreground mt-1">View history of your AI optimization test runs</p>
      </div>

      {testRuns.length === 0 ? (
        <>
          <Card className="border border-border" data-testid="test-runs-empty-state">  
            <CardContent className="py-16 flex flex-col items-center justify-center text-center">
              <div className="p-4 rounded-full bg-primary/10 mb-4">
                <FlaskConical className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-base font-semibold font-display text-secondary mb-1">No Test Runs Yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Your test run history will appear here after you run the AI optimization pipeline on the Voice AI Optimizer page.
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>Test runs are stored in-session only</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-sm font-display flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-muted-foreground" />
                About Test Persistence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This application operates as a temporary AI analysis session. Test results are maintained during your current session and will reset when you refresh the page. For persistent test history, consider integrating with your HighLevel CRM data store.
              </p>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="space-y-4">
          {testRuns.map((run) => (
            <Card key={run.id} className="border border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-primary" />
                    <CardTitle className="text-sm font-display">Test Run</CardTitle>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(run.timestamp).toLocaleString()}
                    </Badge>
                    <Badge className="text-xs bg-accent/10 text-accent border-accent/20">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {run.evaluation.success_rate}% Success
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Prompt</p>
                  <p className="text-sm text-foreground line-clamp-2">{run.prompt}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Total Tests</p>
                    <p className="text-lg font-bold text-foreground">{run.evaluation.total_tests}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-accent/10">
                    <p className="text-xs text-muted-foreground">Passed</p>
                    <p className="text-lg font-bold text-accent">{run.evaluation.passed}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-destructive/10">
                    <p className="text-xs text-muted-foreground">Failed</p>
                    <p className="text-lg font-bold text-destructive">{run.evaluation.failed}</p>
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
