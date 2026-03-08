
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Settings as SettingsIcon, Cpu, Key, Globe, Info } from "lucide-react";

export default function Settings() {
  return (
    <div data-testid="settings-page" className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-display font-bold tracking-tight text-secondary">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure your Voice AI Performance Optimizer</p>
      </div>

      {/* AI Model */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm font-display">AI Model Configuration</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-foreground">Model Provider</p>
              <p className="text-xs text-muted-foreground">AI inference engine</p>
            </div>
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/15 font-code text-xs" data-testid="model-provider-badge">
              Groq
            </Badge>
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-foreground">Model</p>
              <p className="text-xs text-muted-foreground">LLM used for analysis and optimization</p>
            </div>
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/15 font-code text-xs" data-testid="model-name-badge">
              llama-3.3-70b-versatile
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* API Key */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm font-display">API Key Status</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-foreground">GROQ_API_KEY</p>
              <p className="text-xs text-muted-foreground">Required for AI pipeline execution</p>
            </div>
            <Badge
              data-testid="api-key-status"
              variant="outline"
              className="bg-muted/50 text-muted-foreground border-border text-xs"
            >
              Configured via .env
            </Badge>
          </div>
          <div className="mt-3 p-3 rounded-lg bg-muted/30 border border-border">
            <div className="flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                If no API key is configured, the application will use mock data to demonstrate the pipeline flow. 
                Add your Groq API key to the backend <code className="font-code bg-muted px-1 rounded">.env</code> file for live AI responses.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Info */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm font-display">HighLevel Integration</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-foreground">Marketplace App</p>
              <p className="text-xs text-muted-foreground">Voice AI Performance Optimizer</p>
            </div>
            <Badge
              variant="outline"
              className="bg-accent/10 text-accent border-accent/20 text-xs"
            >
              Active
            </Badge>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-foreground">Data Persistence</p>
              <p className="text-xs text-muted-foreground">Session-based (no database)</p>
            </div>
            <Badge variant="outline" className="text-xs">
              In-Memory
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
