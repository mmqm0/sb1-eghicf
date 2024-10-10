import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, HeadingLevel } from 'docx';

interface ProjectData {
  projectName: string;
  location: string;
  installedCapacity: number;
  startDate: string;
}

interface ReportGeneratorProps {
  projectData: ProjectData;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ projectData }) => {
  const [reportContent, setReportContent] = useState<string[]>([]);
  const [isExpanding, setIsExpanding] = useState(false);

  const generateInitialReport = () => {
    const initialContent = [
      "1. Executive Summary",
      "2. Project Overview",
      "3. Market Analysis",
      "4. Technical Feasibility",
      "5. Financial Analysis",
      "6. Environmental Impact",
      "7. Risk Assessment",
      "8. Conclusion and Recommendations"
    ];
    setReportContent(initialContent);
  };

  const expandReport = async () => {
    setIsExpanding(true);
    let expandedContent = [...reportContent];

    for (let i = 0; i < 4; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      expandedContent = expandedContent.flatMap(section => {
        if (!section.includes('.')) {
          return [
            section,
            `${section}.1 Subsection`,
            `${section}.2 Subsection`,
            `${section}.3 Subsection`
          ];
        }
        return section;
      });
    }

    setReportContent(expandedContent);
    setIsExpanding(false);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    let yOffset = 10;

    doc.setFontSize(20);
    doc.text("Feasibility Study Report", 105, yOffset, { align: "center" });
    yOffset += 10;

    doc.setFontSize(12);
    reportContent.forEach((section, index) => {
      if (yOffset > 280) {
        doc.addPage();
        yOffset = 10;
      }
      doc.text(section, 10, yOffset);
      yOffset += 7;
    });

    doc.save(`${projectData.projectName}_Feasibility_Study.pdf`);
  };

  const exportToWord = () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: "Feasibility Study Report",
            heading: HeadingLevel.TITLE,
          }),
          ...reportContent.map(section => 
            new Paragraph({
              text: section,
              heading: section.split('.').length > 1 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_1,
            })
          ),
        ],
      }],
    });

    Packer.toBlob(doc).then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      a.href = url;
      a.download = `${projectData.projectName}_Feasibility_Study.docx`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <FileText className="mr-2" />
        Report Content
      </h3>
      {reportContent.length === 0 ? (
        <button
          onClick={generateInitialReport}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Generate Initial Report
        </button>
      ) : (
        <>
          <ul className="list-disc pl-5 mb-4">
            {reportContent.map((section, index) => (
              <li key={index} className="mb-1">{section}</li>
            ))}
          </ul>
          <div className="flex space-x-4 mb-4">
            <button
              onClick={expandReport}
              disabled={isExpanding}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isExpanding ? 'Expanding...' : 'Expand Report'}
            </button>
            <button
              onClick={exportToPDF}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            >
              <Download className="mr-2" size={16} />
              Export to PDF
            </button>
            <button
              onClick={exportToWord}
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            >
              <Download className="mr-2" size={16} />
              Export to Word
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportGenerator;