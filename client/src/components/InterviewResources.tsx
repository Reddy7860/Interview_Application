import { useState, useEffect } from 'react';
import axios from 'axios';
import './InterviewResources.css';

interface InterviewResourcesProps {
  targetCompany: string;
}

interface CompanyValues {
  name: string;
  principles: string[];
  tip?: string;
}

function InterviewResources({ targetCompany }: InterviewResourcesProps) {
  const [companyValues, setCompanyValues] = useState<CompanyValues | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyValues = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/data/company-values/${encodeURIComponent(targetCompany)}`);
        setCompanyValues(response.data);
      } catch (error) {
        console.error('Error fetching company values:', error);
        setCompanyValues(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyValues();
  }, [targetCompany]);

  if (loading) {
    return (
      <section className="interview-resources">
        <div className="loading">Loading...</div>
      </section>
    );
  }

  if (!companyValues) {
    return null;
  }

  return (
    <section className="interview-resources">
      <h2 className="section-title">Interview Resources</h2>
      <div className="resources-content">
        <div className="company-values">
          <button
            type="button"
            className="values-header"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span>Company Values Reference</span>
            <span className="dropdown-arrow">{isExpanded ? '▼' : '▶'}</span>
          </button>
          {isExpanded && (
            <div className="values-content">
              <div className="company-name">{companyValues.name} - Key Values</div>
              <ul className="principles-list">
                {companyValues.principles.map((principle, index) => (
                  <li key={index}>{principle}</li>
                ))}
              </ul>
              {companyValues.tip && (
                <div className="values-tip">{companyValues.tip}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default InterviewResources;

