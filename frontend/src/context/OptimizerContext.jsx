import { createContext, useContext, useState } from "react";

const OptimizerContext = createContext();

export const useOptimizer = () => {
  const context = useContext(OptimizerContext);
  if (!context) {
    throw new Error("useOptimizer must be used within OptimizerProvider");
  }
  return context;
};

export const OptimizerProvider = ({ children }) => {
  const [testRuns, setTestRuns] = useState([]);
  const [promptVersions, setPromptVersions] = useState([]);

  const addTestRun = (testRun) => {
    console.log('addTestRun called:', testRun);
    setTestRuns((prev) => {
      const updated = [testRun, ...prev];
      console.log('Updated testRuns:', updated);
      return updated;
    });
  };

  const addPromptVersion = (version) => {
    console.log('addPromptVersion called:', version);
    setPromptVersions((prev) => {
      const updated = [version, ...prev];
      console.log('Updated promptVersions:', updated);
      return updated;
    });
  };

  return (
    <OptimizerContext.Provider
      value={{
        testRuns,
        promptVersions,
        addTestRun,
        addPromptVersion,
      }}
    >
      {children}
    </OptimizerContext.Provider>
  );
};
