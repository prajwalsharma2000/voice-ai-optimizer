import { Badge } from "./ui/badge"

export default function ResultsTable({ evaluations }) {

  if (!evaluations) return null

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">

      <h2 className="text-lg font-semibold mb-4">
        Test Results
      </h2>

      <table className="w-full text-left">

        <thead className="text-gray-400">
          <tr>
            <th>Scenario</th>
            <th>Status</th>
            <th>Reason</th>
          </tr>
        </thead>

        <tbody>

          {evaluations.map((test, i) => (
            <tr key={i} className="border-t border-white/10 hover:bg-white/5 transition">

              <td className="py-3">{test.scenario}</td>

              <td>
                <Badge
                  variant={test.status === "PASS" ? "default" : "destructive"}
                >
                  {test.status}
                </Badge>
              </td>

              <td>{test.reason}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}