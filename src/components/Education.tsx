// Education.tsx

import React from 'react';
import type { EducationType } from '../types/types';

interface EducationProps {
  education: EducationType;
  language: 'en' | 'pt';
}

const Education: React.FC<EducationProps> = ({ education, language }) => {
  const { course, kind, company, logoUrl, startDate, endDate, current } =
    education;

  // Format startDate and endDate as locale monthName-year

  const startDateString = new Date(startDate).toLocaleDateString(language, {
    month: 'long',
    year: 'numeric',
  });

  const endDateString = !current
    ? new Date(endDate).toLocaleDateString(language, {
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <div className="education">
      {/* Exibição do logo e título alinhados */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {logoUrl && (
          <img
            src={`content/images/${logoUrl}`}
            alt={company}
            style={{ width: '50px', height: '50px', objectFit: 'contain' }}
          />
        )}
        <div>
          <h4 style={{ margin: 0 }}>{course[language]} - {kind[language]}</h4>
          <h5 style={{ margin: 0 }}>{company}</h5>
        </div>
      </div>
      <p>
        {startDateString} -{' '}
        {current ? (language === 'en' ? 'Current' : 'Atual') : endDateString}
      </p>
    </div>
  );
};

export default Education;
