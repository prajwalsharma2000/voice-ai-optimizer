import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { OptimizerProvider } from "./context/OptimizerContext";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Optimizer from "./components/Optimizer";
import TestRuns from "./components/TestRuns";
import PromptVersions from "./components/PromptVersions";
import Settings from "./components/Settings";

function App() {
  return (
    <OptimizerProvider>
      <BrowserRouter>
        <Toaster position="top-right" richColors />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/optimizer" element={<Optimizer />} />
            <Route path="/test-runs" element={<TestRuns />} />
            <Route path="/prompt-versions" element={<PromptVersions />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </OptimizerProvider>
  );
}

export default App;
