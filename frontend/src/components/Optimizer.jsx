import { useState, useCallback, useEffect } from "react";
import { useOptimizer } from "../context/OptimizerContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";
import { Sparkles, Play, Loader2, RotateCcw, Copy, CheckCircle2 } from "lucide-react";
import PipelineVisualizer from "./PipelineVisualizer";
import StatCards from "./StatCards";
import TestResultsTable from "./TestResultsTable";
import PromptDiffViewer from "./PromptDiffViewer";

const API = `${'https://voice-ai-optimizer-api.onrender.com' || 'http://localhost:5000'}/api`;

const SAMPLE_PROMPT = `You are a customer support AI for TechCorp.

Answer questions about products.
Help with billing.
Schedule appointments.

Be helpful.`;

export default function Optimizer() {
  const { addTestRun, addPromptVersion } = useOptimizer();
  const [prompt, setPrompt] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [stepStatuses, setStepStatuses] = useState({});
  const [currentStep, setCurrentStep] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [tests, setTests] = useState(null);
  const [results, setResults] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [optimization, setOptimization] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (evaluation && optimization && !isRunning) {
      console.log('Auto-saving to history via useEffect');
      addTestRun({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        prompt,
        evaluation,
        results,
      });
      addPromptVersion({
        id: Date.now() + 1,
        timestamp: new Date().toISOString(),
        original: prompt,
        optimized: optimization.optimized_prompt,
        changes: optimization.changes,
        expectedImprovement: optimization.expected_improvement,
      });
    }
  }, [evaluation, optimization, isRunning]);

const resetState = useCallback(() => {
    setStepStatuses({});
    setCurrentStep(null);
    setAnalysis(null);
    setTests(null);
    setResults(null);
    setEvaluation(null);
    setOptimization(null);
  }, []);

  const runPipeline = useCallback(async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a Voice AI agent prompt");
      return;
    }

    setIsRunning(true);
    resetState();
    toast.info("Starting AI optimization pipeline...");

    try {
      const response = await fetch(`${API}/run-copilot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!response.ok) {
        throw new Error(`Pipeline request failed with status ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let pipelineFailed = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const event = JSON.parse(line.slice(6));
              const { step, status, data, error } = event;

              console.log('SSE Event:', { step, status, data, error });

              if (status === "running") {
                setCurrentStep(step);
                setStepStatuses((prev) => ({ ...prev, [step]: "running" }));
              }

              if (status === "completed") {
                setStepStatuses((prev) => ({ ...prev, [step]: "completed" }));

                switch (step) {
                  case "analyze":
                    setAnalysis(data);
                    break;
                  case "generate":
                    setTests(data);
                    break;
                  case "simulate":
                    setResults(data);
                    break;
                  case "evaluate":
                    setEvaluation(data);
                    break;
                  case "optimize":
                    setOptimization(data);
                    break;
                  case "complete":
                    toast.success("AI optimization pipeline complete!");
                    break;
                  default:
                    break;
                }
              }

              if (status === "failed") {
                pipelineFailed = true;
                setStepStatuses((prev) => ({ ...prev, [step]: "failed" }));
                setCurrentStep(null);
                toast.error(error || `Pipeline failed at ${step} stage`);
                console.error(`Pipeline failed at ${step}:`, error);
                break;
              }
            } catch (e) {
              console.error('Failed to parse SSE event:', line, e);
            }
          }
        }

        if (pipelineFailed) {
          break;
        }
      }

      if (pipelineFailed) {
        toast.error("Pipeline execution failed. Please try again.");
      }
    } catch (err) {
      toast.error("Pipeline failed. Please check your connection and try again.");
      console.error('Pipeline error:', err);
      setStepStatuses({});
      setCurrentStep(null);
    } finally {
      setIsRunning(false);
    }
  }, [prompt, resetState]);

  const handleCopyOptimized = useCallback(() => {
    if (optimization?.optimized_prompt) {
      navigator.clipboard.writeText(optimization.optimized_prompt);
      setCopied(true);
      toast.success("Optimized prompt copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  }, [optimization]);

  const handleReset = useCallback(() => {
    setPrompt("");
    resetState();
    setIsRunning(false);
  }, [resetState]);

  const loadSample = useCallback(() => {
    setPrompt(SAMPLE_PROMPT);
    toast.info("Sample prompt loaded");
  }, []);

  const hasResults = evaluation || results;

  return (
    <div data-testid="optimizer-page" className="space-y-6 max-w-5xl">
      {/* Prompt Input */}
      <Card className="border border-border" data-testid="prompt-input-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Voice AI Agent Prompt
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                Paste your Voice AI agent prompt below to analyze and optimize it
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={loadSample}
              data-testid="load-sample-btn"
              className="text-xs text-primary hover:text-primary hover:bg-primary/10"
            >
              Load Sample
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            data-testid="prompt-textarea"
            placeholder="Enter your Voice AI agent prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[180px] font-code text-sm resize-y bg-muted/30 border-border focus:ring-primary/30"
          />
          <div className="flex items-center gap-3">
            <Button
              data-testid="run-pipeline-btn"
              onClick={runPipeline}
              disabled={isRunning || !prompt.trim()}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 h-10 rounded-lg"
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Running Pipeline...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run AI Copilot
                </>
              )}
            </Button>
            {hasResults && (
              <Button
                data-testid="reset-btn"
                variant="outline"
                onClick={handleReset}
                className="h-10"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            )}
            {optimization && (
              <Button
                data-testid="copy-optimized-btn"
                variant="outline"
                onClick={handleCopyOptimized}
                className="h-10 ml-auto text-accent border-accent/20 hover:bg-accent/10 hover:text-accent"
              >
                {copied ? (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {copied ? "Copied!" : "Copy Optimized Prompt"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Visualization */}
      {(isRunning || Object.keys(stepStatuses).length > 0) && (
        <Card className="border border-border" data-testid="pipeline-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display">AI Optimization Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <PipelineVisualizer currentStep={currentStep} stepStatuses={stepStatuses} />
          </CardContent>
        </Card>
      )}

      {/* Analysis summary */}
      {analysis && (
        <Card className="border border-border animate-slide-in-up" data-testid="analysis-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display">Prompt Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Purpose</p>
                <p className="text-sm text-foreground">{analysis.purpose}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tone</p>
                <p className="text-sm text-foreground">{analysis.tone}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Capabilities</p>
                <div className="flex flex-wrap gap-1.5">
                  {(analysis.capabilities || []).map((cap, i) => (
                    <Badge key={i} variant="outline" className="text-[11px] bg-primary/5 text-primary border-primary/15">
                      {cap}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Improvement Areas</p>
                <div className="flex flex-wrap gap-1.5">
                  {(analysis.improvement_areas || []).map((area, i) => (
                    <Badge key={i} variant="outline" className="text-[11px] bg-destructive/5 text-destructive border-destructive/15">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            {(analysis.riskFactors?.length > 0 || analysis.complianceIssues?.length > 0) && (
              <>
                <Separator className="my-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.riskFactors?.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Risk Factors</p>
                      <div className="space-y-1.5">
                        {analysis.riskFactors.map((risk, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0 mt-1" />
                            {risk}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {analysis.complianceIssues?.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Compliance Issues</p>
                      <div className="space-y-1.5">
                        {analysis.complianceIssues.map((issue, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0 mt-1" />
                            {issue}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Results section */}
      {hasResults && (
        <div className="space-y-6">
          <Separator />

          <Tabs defaultValue="overview" className="w-full" data-testid="results-tabs">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
              <TabsTrigger value="results" data-testid="tab-results">Test Results</TabsTrigger>
              <TabsTrigger value="optimization" data-testid="tab-optimization">Optimization</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-4">
              <StatCards evaluation={evaluation} />
              {evaluation?.summary && (
                <Card className="border border-border" data-testid="summary-card">
                  <CardContent className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Summary</p>
                    <p className="text-sm text-foreground">{evaluation.summary}</p>
                    {evaluation.key_findings && evaluation.key_findings.length > 0 && (
                      <div className="mt-3 space-y-1.5">
                        {evaluation.key_findings.map((finding, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {finding}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
              {(evaluation?.critical_failures > 0 || evaluation?.security_issues_count > 0 || evaluation?.compliance_issues_count > 0) && (
                <Card className="border border-destructive/30 bg-destructive/5" data-testid="critical-issues-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-display text-destructive">Critical Issues Detected</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3">
                      {evaluation.critical_failures > 0 && (
                        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                          <p className="text-xs text-muted-foreground">Critical Failures</p>
                          <p className="text-2xl font-bold text-destructive">{evaluation.critical_failures}</p>
                        </div>
                      )}
                      {evaluation.security_issues_count > 0 && (
                        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                          <p className="text-xs text-muted-foreground">Security Issues</p>
                          <p className="text-2xl font-bold text-destructive">{evaluation.security_issues_count}</p>
                        </div>
                      )}
                      {evaluation.compliance_issues_count > 0 && (
                        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                          <p className="text-xs text-muted-foreground">Compliance Issues</p>
                          <p className="text-2xl font-bold text-destructive">{evaluation.compliance_issues_count}</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 p-3 rounded-lg bg-muted/30">
                      <p className="text-xs text-muted-foreground">
                        <strong>Production Readiness:</strong> {evaluation.production_readiness === "READY" ? "✅ Ready" : "❌ Not Ready"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="results" className="mt-4">
              <TestResultsTable results={evaluation?.evaluations || results} />
            </TabsContent>

            <TabsContent value="optimization" className="mt-4">
              <PromptDiffViewer originalPrompt={prompt} optimization={optimization} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
