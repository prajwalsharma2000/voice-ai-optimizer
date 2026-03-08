

export default function ResultsDashboard({ summary }) {

  if (!summary) return null

  return (

    <div className="grid grid-cols-4 gap-4">

      <Card className="
        bg-white/5
        backdrop-blur
        border border-white/10
        rounded-xl
        p-6
        shadow-lg
        "
      >
        <p className="text-gray-400 text-sm">
          Success Rate
        </p>
        <p className="text-2xl font-bold text-indigo-400">
          {summary.successRate}%
        </p>
      </Card>

      <Card className="
        bg-white/5
        backdrop-blur
        border border-white/10
        rounded-xl
        p-6
        shadow-lg
        "
      >
        <p className="text-gray-400 text-sm">
          Total Tests
        </p>
        <p className="text-2xl font-bold">
          {summary.totalTests}
        </p>
      </Card>

      <Card className="
        bg-white/5
        backdrop-blur
        border border-white/10
        rounded-xl
        p-6
        shadow-lg
        "
      >
        <p className="text-gray-400 text-sm">
          Passed
        </p>
        <p className="text-2xl font-bold text-green-400">
          {summary.passed}
        </p>
      </Card>

      <Card className="
        bg-white/5
        backdrop-blur
        border border-white/10
        rounded-xl
        p-6
        shadow-lg
        "
      >
        <p className="text-gray-400 text-sm">
          Failed
        </p>
        <p className="text-2xl font-bold text-red-400">
          {summary.failed}
        </p>
      </Card>

    </div>

  )
}