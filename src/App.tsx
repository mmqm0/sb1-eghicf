import React, { useState } from 'react';
import { Sun, Wind, Zap } from 'lucide-react';
import ProjectForm from './components/ProjectForm';
import ReportGenerator from './components/ReportGenerator';
import FinancialProjections from './components/FinancialProjections';

const App: React.FC = () => {
  const [projectData, setProjectData] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <Sun className="mr-2 text-yellow-500" />
            PV Feasibility Study Generator
          </h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#project-form" className="text-blue-600 hover:text-blue-800">New Project</a></li>
              <li><a href="#report" className="text-blue-600 hover:text-blue-800">Generate Report</a></li>
              <li><a href="#financials" className="text-blue-600 hover:text-blue-800">Financial Projections</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section id="project-form" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Wind className="mr-2 text-blue-500" />
            Project Information
          </h2>
          <ProjectForm onSubmit={setProjectData} />
        </section>

        {projectData && (
          <>
            <section id="report" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Zap className="mr-2 text-yellow-500" />
                Feasibility Study Report
              </h2>
              <ReportGenerator projectData={projectData} />
            </section>

            <section id="financials" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Zap className="mr-2 text-green-500" />
                Financial Projections
              </h2>
              <FinancialProjections projectData={projectData} />
            </section>
          </>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          &copy; 2024 PV Feasibility Study Generator. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;