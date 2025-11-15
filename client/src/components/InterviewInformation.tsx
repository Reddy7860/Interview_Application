import { useState, useEffect } from 'react';
import axios from 'axios';
import './InterviewInformation.css';

interface InterviewInformationProps {
  targetRole: string;
  setTargetRole: (role: string) => void;
  targetCompany: string;
  setTargetCompany: (company: string) => void;
  experienceLevel: string;
  setExperienceLevel: (level: string) => void;
}

function InterviewInformation({
  targetRole,
  setTargetRole,
  targetCompany,
  setTargetCompany,
  experienceLevel,
  setExperienceLevel,
}: InterviewInformationProps) {
  const [roles, setRoles] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [experienceLevels, setExperienceLevels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rolesRes, companiesRes, levelsRes] = await Promise.all([
          axios.get('/api/data/roles'),
          axios.get('/api/data/companies'),
          axios.get('/api/data/experience-levels'),
        ]);

        setRoles(rolesRes.data);
        setCompanies(companiesRes.data);
        setExperienceLevels(levelsRes.data);

        if (rolesRes.data.length > 0 && !targetRole) {
          setTargetRole(rolesRes.data[0]);
        }
        if (companiesRes.data.length > 0 && !targetCompany) {
          setTargetCompany(companiesRes.data[0]);
        }
        if (levelsRes.data.length > 0 && !experienceLevel) {
          setExperienceLevel(levelsRes.data[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="interview-info loading">Loading...</div>;
  }

  return (
    <section className="interview-info">
      <h2 className="section-title">Your Interview Information</h2>
      <div className="info-grid">
        <div className="info-field">
          <label htmlFor="target-role">Target Role</label>
          <p className="field-instruction">Select the role you're interviewing for</p>
          <select
            id="target-role"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="select-input"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className="info-field">
          <label htmlFor="target-company">Target Company</label>
          <p className="field-instruction">Select the company</p>
          <select
            id="target-company"
            value={targetCompany}
            onChange={(e) => setTargetCompany(e.target.value)}
            className="select-input"
          >
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        <div className="info-field">
          <label htmlFor="experience-level">Experience Level</label>
          <p className="field-instruction">Your current experience level</p>
          <select
            id="experience-level"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="select-input"
          >
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}

export default InterviewInformation;

