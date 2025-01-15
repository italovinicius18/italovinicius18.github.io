// Project.tsx

import React from 'react';
import type { ProjectType } from '../types';

interface ProjectProps {
  project: ProjectType;
  language: 'en' | 'pt';
}

const Project: React.FC<ProjectProps> = ({ project, language }) => {
  const { title, description, tags } = project;

  return (
    <div className="project">
      <h4>{title[language]}</h4>
      <p>{description[language]}</p>

      {tags && tags.length > 0 && (
        <p style={{ fontStyle: 'italic', color: '#ccc' }}>
          Tags: {tags.join(', ')}
        </p>
      )}
    </div>
  );
};

export default Project;
