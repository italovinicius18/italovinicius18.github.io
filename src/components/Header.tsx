// Header.tsx

import React from 'react';
import type { InfoType } from '../types';

interface HeaderProps {
  info: InfoType;
  language: 'en' | 'pt';
}

const Header: React.FC<HeaderProps> = ({ info, language }) => {
  const { name, title, location, email, linkedin, github } = info;

  return (
    <header className="header">
      <h1 className="header-title">{name}</h1>
      <p className="header-subtitle">{title[language]}</p>
      <p className="header-location">{location[language]}</p>
      <p className="header-contact">
        <a href={`mailto:${email}`} className="header-link">
          Mail
        </a>
        {' • '}
        <a
          href={`https://${linkedin}`}
          className="header-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        {' • '}
        <a
          href={`https://${github}`}
          className="header-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
    </header>
  );
};

export default Header;
