

export default function PromptInput({ prompt, setPrompt, onRun, loading }) {

  return (

    <div className="
      bg-white/5
      border border-white/10
      rounded-xl
      p-6
      shadow-lg
    ">

      <h2 className="text-lg font-semibold mb-4">
        Agent Prompt
      </h2>

      <Textarea
        placeholder="Paste Voice AI agent prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="
          bg-black/20
          border-white/10
          text-white
        "
      />

      <Button
        onClick={onRun}
        disabled={loading}
        className="
          mt-4
          bg-brand-blue
          hover:bg-brand-blue/80
          shadow-glow
        "
      >
        {loading ? "Running Copilot..." : "Run AI Copilot"}
      </Button>

    </div>

  )
}