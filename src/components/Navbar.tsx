// src/components/Navbar.tsx

import React from 'react';

interface NavbarProps {
  currentLanguage: 'en' | 'pt';
  toggleLanguage: () => void;
  setFilterTag: (tag: string | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  toggleLanguage,
  setFilterTag,
}) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Você pode substituir por uma logo ou manter o nome */}
        <h2>{currentLanguage === 'en' ? 'Currículo' : 'Resume'}</h2>
      </div>

      <div className="navbar-buttons">
        {/* Botão de Alternância de Idioma */}
        <button onClick={toggleLanguage} className="language-button">
          {currentLanguage === 'en' ? 'PT' : 'EN'}
        </button>

        {/* Botões de Filtro */}
        <button
          onClick={() => setFilterTag('data-engineer')}
          className="filter-button"
        >
          {currentLanguage === 'en' ? 'Data Engineer' : 'Engenheiro de Dados'}
        </button>
        <button
          onClick={() => setFilterTag('software-engineer')}
          className="filter-button"
        >
          {currentLanguage === 'en'
            ? 'Software Engineer'
            : 'Engenheiro de Software'}
        </button>
        <button onClick={() => setFilterTag(null)} className="filter-button">
          {currentLanguage === 'en' ? 'Show All' : 'Mostrar Todos'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
