import { CheckCircle, Loader } from "lucide-react"

export default function PipelineStatus({ loading }) {

  const steps = [
    { name: "Analyze Prompt", icon: "🔍" },
    { name: "Generate Test Cases", icon: "📝" },
    { name: "Run Tests", icon: "⚡" },
    { name: "Optimize Prompt", icon: "✨" }
  ]

  if (!loading) return null

  return (

    <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 shadow-2xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">

      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Loader className="w-5 h-5 animate-spin"/>
        </div>
        <h2 className="text-xl font-bold">
          AI Copilot Pipeline
        </h2>
      </div>

      <div className="space-y-4">

        {steps.map((s, i) => (

          <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">

            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
                <Loader className="w-5 h-5 animate-spin text-blue-400"/>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">{s.icon}</span>
                <span className="font-medium">{s.name}</span>
              </div>
              <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" style={{width: '60%'}}></div>
              </div>
            </div>

          </div>

        ))}

      </div>

    </div>

  )
}