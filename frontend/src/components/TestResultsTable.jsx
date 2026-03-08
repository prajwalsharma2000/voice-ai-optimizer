import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { FlaskConical, Info } from "lucide-react";

export default function TestResultsTable({ results }) {
  if (!results || results.length === 0) return null;

  return (
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
        <ScrollArea className="max-h-[400px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="w-[30%] text-xs font-semibold uppercase tracking-wider pl-6">Scenario</TableHead>
                <TableHead className="w-[10%] text-xs font-semibold uppercase tracking-wider text-center">Status</TableHead>
                <TableHead className="w-[30%] text-xs font-semibold uppercase tracking-wider">Agent Response</TableHead>
                <TableHead className="w-[30%] text-xs font-semibold uppercase tracking-wider pr-6">Evaluation Reason</TableHead>
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
                    {result.scenario}
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
                  <TableCell className="text-sm text-muted-foreground max-w-[280px]">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="truncate cursor-help">{result.agent_response}</p>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="max-w-sm bg-secondary text-white p-3 text-xs">
                          {result.agent_response}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="pr-6 text-sm text-muted-foreground max-w-[280px]">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-start gap-1.5 cursor-help">
                            <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-muted-foreground/60" />
                            <p className="truncate">{result.evaluation_reason}</p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="max-w-sm bg-secondary text-white p-3 text-xs">
                          {result.evaluation_reason}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
