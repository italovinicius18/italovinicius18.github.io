// Experience.tsx

import React from 'react';
import type { ExperienceType } from '../types';

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
    duration,
    location,
    description,
    tags,
  } = experience;

  return (
    <div className="experience">
      {/* Exibição do logo e título alinhados */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {logoUrl && (
          <img
            src={`content/${logoUrl}`}
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
        {startDate[language]} - {endDate[language]} · {duration[language]}
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
