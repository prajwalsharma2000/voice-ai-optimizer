export default function PromptDiff({ original, optimized }) {

  if (!optimized) return null

  const originalLines = original.split("\n")
  const optimizedLines = optimized.split("\n")

  return (

    <div className="grid grid-cols-2 gap-6">

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">

        <h3 className="text-gray-400 mb-4">
          Original Prompt
        </h3>

        <pre className="text-sm whitespace-pre-wrap">
          {originalLines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </pre>

      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">

        <h3 className="text-green-400 mb-4">
          Optimized Prompt
        </h3>

        <pre className="text-sm whitespace-pre-wrap">

          {optimizedLines.map((line, i) => {

            const isNew = !original.includes(line)

            return (
              <div
                key={i}
                className={isNew ? "text-green-400" : ""}
              >
                {isNew ? "+ " : ""}{line}
              </div>
            )

          })}

        </pre>

      </div>

    </div>

  )
}