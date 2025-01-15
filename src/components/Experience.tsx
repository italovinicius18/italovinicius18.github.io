// Experience.tsx

import React from 'react';
import type { ExperienceType } from '../types/types';

interface ExperienceProps {
  experience: ExperienceType;
  language: 'en' | 'pt';
}

const Experience: React.FC<ExperienceProps> = ({ experience, language }) => {
  const {
    companyName,
    logoUrl,
    role,
    employmentType,
    startDate,
    endDate,
    current,
    location,
    description,
    tags,
  } = experience;

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
    <div className="experience">
      {/* Exibição do logo e título alinhados */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {logoUrl && (
          <img
            src={`content/images/${logoUrl}`}
            alt={companyName}
            style={{ width: '50px', height: '50px', objectFit: 'contain' }}
          />
        )}
        <div>
          <h4 style={{ margin: 0 }}>{role[language]}</h4>
          <h5 style={{ margin: 0 }}>{companyName}</h5>
        </div>
      </div>

      <p>{employmentType[language]}</p>
      <p>
        {startDateString} -{' '}
        {current ? (language === 'en' ? 'Current' : 'Atual') : endDateString}
      </p>
      <p>{location[language]}</p>

      {description && description.length > 0 && (
        <ul>
          {description.map((descItem, idx) => (
            <li key={idx}>{descItem[language]}</li>
          ))}
        </ul>
      )}

      {/* Exibir as tags, se existirem */}
      {tags && tags.length > 0 && (
        <p style={{ fontStyle: 'italic', color: '#ccc' }}>
          Tags: {tags.join(', ')}
        </p>
      )}
    </div>
  );
};

export default Experience;
