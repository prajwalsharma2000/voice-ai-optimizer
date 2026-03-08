import { useState } from "react"
import { runCopilot } from "../services/api"

import PromptInput from "../components/PromptInput"
import PipelineStatus from "../components/PipelineStatus"
import ResultsDashboard from "../components/ResultsDashboard"
import ResultsTable from "../components/ResultsTable"
import PromptDiff from "../components/PromptDiff"

export default function OptimizerDashboard() {

  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleRunCopilot = async () => {

    try {

      setLoading(true)

      const res = await runCopilot(prompt)

      setResult(res.data)

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Voice AI Optimizer
            </h1>
          </div>
          <span className="text-sm text-gray-400 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            HighLevel AI Copilot
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-8 py-10 space-y-8">

        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          onRun={handleRunCopilot}
          loading={loading}
        />

        <PipelineStatus loading={loading}/>

        <ResultsDashboard summary={result?.summary}/>

        <ResultsTable evaluations={result?.evaluations}/>

        <PromptDiff
          original={prompt}
          optimized={result?.optimizedPrompt}
        />

      </main>

    </div>

  )
}