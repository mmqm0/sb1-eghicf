import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign } from 'lucide-react';

interface ProjectData {
  projectName: string;
  location: string;
  installedCapacity: number;
  startDate: string;
}

interface FinancialProjectionsProps {
  projectData: ProjectData;
}

const FinancialProjections: React.FC<FinancialProjectionsProps> = ({ projectData }) => {
  const [financialData, setFinancialData] = useState<any[]>([]);

  useEffect(() => {
    const generateFinancialData = () => {
      const data = [];
      const years = 25; // Typical lifespan of a PV project
      const initialInvestment = projectData.installedCapacity * 1000000; // Assume $1M per MW
      const annualRevenue = projectData.installedCapacity * 150000; // Assume $150k per MW per year
      const annualOpex = projectData.installedCapacity * 20000; // Assume $20k per MW per year

      for (let i = 0; i <= years; i++) {
        data.push({
          year: i,
          cumulativeRevenue: i * annualRevenue,
          cumulativeCosts: initialInvestment + i * annualOpex,
          netCashFlow: i * annualRevenue - (initialInvestment + i * annualOpex),
        });
      }

      setFinancialData(data);
    };

    generateFinancialData();
  }, [projectData]);

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <DollarSign className="mr-2" />
        Financial Projections
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={financialData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }}
          />
          <YAxis label={{ value: 'USD', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cumulativeRevenue" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="cumulativeCosts" stroke="#82ca9d" />
          <Line type="monotone" dataKey="netCashFlow" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4">
        <h4 className="font-semibold">Key Financial Indicators:</h4>
        <ul className="list-disc pl-5 mt-2">
          <li>Initial Investment: ${(projectData.installedCapacity * 1000000).toLocaleString()}</li>
          <li>Estimated Annual Revenue: ${(projectData.installedCapacity * 150000).toLocaleString()}</li>
          <li>Estimated Annual OPEX: ${(projectData.installedCapacity * 20000).toLocaleString()}</li>
          <li>Payback Period: {Math.ceil((projectData.installedCapacity * 1000000) / (projectData.installedCapacity * 130000))} years</li>
        </ul>
      </div>
    </div>
  );
};

export default FinancialProjections;