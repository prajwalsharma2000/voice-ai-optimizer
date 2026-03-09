import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { FlaskConical, Eye, Star, Shield, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function TestResultsTable({ results }) {
  const [selectedResult, setSelectedResult] = useState(null);

  if (!results || results.length === 0) return null;

  return (
    <>
      <Card data-testid="test-results-table" className="border border-border animate-slide-in-up">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-primary" />
            <CardTitle className="text-base font-display">Test Results</CardTitle>
            <Badge variant="outline" className="ml-auto text-xs">
              {results.length} scenarios
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="w-[25%] text-xs font-semibold uppercase tracking-wider pl-6">Scenario</TableHead>
                  <TableHead className="w-[10%] text-xs font-semibold uppercase tracking-wider text-center">Category</TableHead>
                  <TableHead className="w-[8%] text-xs font-semibold uppercase tracking-wider text-center">Status</TableHead>
                  <TableHead className="w-[8%] text-xs font-semibold uppercase tracking-wider text-center">Quality</TableHead>
                  <TableHead className="w-[25%] text-xs font-semibold uppercase tracking-wider">Agent Response</TableHead>
                  <TableHead className="w-[24%] text-xs font-semibold uppercase tracking-wider pr-6 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow
                    key={result.id || index}
                    data-testid={`test-result-row-${index}`}
                    className={`animate-slide-in-up stagger-${Math.min(index + 1, 6)}`}
                  >
                    <TableCell className="pl-6 font-medium text-sm text-foreground">
                      <div>
                        <p className="font-semibold">{result.scenario}</p>
                        {result.risk_level && (
                          <Badge variant="outline" className={`mt-1 text-[10px] ${
                            result.risk_level === "critical" || result.risk_level === "high" 
                              ? "bg-destructive/10 text-destructive border-destructive/20"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {result.risk_level} risk
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/15">
                        {result.category || "general"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        data-testid={`test-status-${index}`}
                        className={`text-[11px] font-bold px-2.5 py-0.5 ${
                          result.status === "PASS"
                            ? "bg-accent/10 text-accent border-accent/20 hover:bg-accent/15"
                            : "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/15"
                        }`}
                        variant="outline"
                      >
                        {result.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-3 h-3 text-primary fill-primary" />
                        <span className="text-sm font-semibold text-foreground">{result.quality_score || 0}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[200px]">
                      <p className="truncate">{result.agent_response}</p>
                    </TableCell>
                    <TableCell className="pr-6">
                      <div className="flex items-center justify-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="flex items-center gap-1 px-2 py-1 text-xs text-primary hover:bg-primary/10 rounded transition-colors">
                              <Eye className="w-3 h-3" />
                              Response
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-base">Agent Response</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3">
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground mb-1">Scenario:</p>
                                <p className="text-sm text-foreground">{result.scenario}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground mb-1">User Input:</p>
                                <p className="text-sm text-foreground italic">"{result.userInput}"</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-muted-foreground mb-1">Agent Response:</p>
                                <div className="p-3 rounded-lg bg-muted/30 border border-border">
                                  <p className="text-sm text-foreground whitespace-pre-wrap">{result.agent_response}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                          <DialogTrigger asChild>
                            <button 
                              onClick={() => setSelectedResult(result)}
                              className="flex items-center gap-1 px-2 py-1 text-xs text-accent hover:bg-accent/10 rounded transition-colors"
                            >
                              <Eye className="w-3 h-3" />
                              Details
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-base">Test Result Details</DialogTitle>
                            </DialogHeader>
                            {selectedResult && (
                              <div className="space-y-4">
                                <div>
                                  <p className="text-xs font-semibold text-muted-foreground mb-1">Scenario:</p>
                                  <p className="text-sm text-foreground">{selectedResult.scenario}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-muted-foreground mb-1">Evaluation:</p>
                                  <p className="text-sm text-foreground">{selectedResult.evaluation_reason}</p>
                                </div>
                                {selectedResult.strengths?.length > 0 && (
                                  <div>
                                    <p className="text-xs font-semibold text-accent mb-2">Strengths:</p>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                      {selectedResult.strengths.map((s, i) => <li key={i}>{s}</li>)}
                                    </ul>
                                  </div>
                                )}
                                {selectedResult.weaknesses?.length > 0 && (
                                  <div>
                                    <p className="text-xs font-semibold text-destructive mb-2">Weaknesses:</p>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                      {selectedResult.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                                    </ul>
                                  </div>
                                )}
                                {selectedResult.security_issues?.length > 0 && (
                                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Shield className="w-4 h-4 text-destructive" />
                                      <p className="text-xs font-semibold text-destructive">Security Issues:</p>
                                    </div>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                      {selectedResult.security_issues.map((s, i) => <li key={i}>{s}</li>)}
                                    </ul>
                                  </div>
                                )}
                                {selectedResult.compliance_issues?.length > 0 && (
                                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                                    <div className="flex items-center gap-2 mb-2">
                                      <AlertTriangle className="w-4 h-4 text-destructive" />
                                      <p className="text-xs font-semibold text-destructive">Compliance Issues:</p>
                                    </div>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                      {selectedResult.compliance_issues.map((c, i) => <li key={i}>{c}</li>)}
                                    </ul>
                                  </div>
                                )}
                                {selectedResult.recommendations?.length > 0 && (
                                  <div>
                                    <p className="text-xs font-semibold text-primary mb-2">Recommendations:</p>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                      {selectedResult.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}
