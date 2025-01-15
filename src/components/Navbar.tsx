// src/components/Navbar.tsx

import React, { useState } from 'react';

interface NavbarProps {
  currentLanguage: 'en' | 'pt';
  toggleLanguage: () => void;
  setFilterTag: (tag: string | null) => void;
  handlePrint: () => void; // Adicionando a função de impressão como prop
  filterTag: string | null; // Para exibir o filtro atual, se necessário
}

const Navbar: React.FC<NavbarProps> = ({ currentLanguage, toggleLanguage, setFilterTag, handlePrint, filterTag }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleFilter = (tag: string | null) => {
    setFilterTag(tag);
    setIsMenuOpen(false); // Fecha o menu após selecionar um filtro
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>{currentLanguage === 'en' ? 'Currículo' : 'Resume'}</h2>
      </div>
      
      <div className={`navbar-buttons ${isMenuOpen ? 'active' : ''}`}>
        {/* Botão de Alternância de Idioma */}
        <button onClick={toggleLanguage} className="language-button">
          {currentLanguage === 'en' ? 'PT' : 'EN'}
        </button>

        {/* Botões de Filtro */}
        <button onClick={() => handleFilter('data-engineer')} className="filter-button">
          {currentLanguage === 'en' ? 'Data Engineer' : 'Engenheiro de Dados'}
        </button>
        <button onClick={() => handleFilter('software-engineer')} className="filter-button">
          {currentLanguage === 'en' ? 'Software Engineer' : 'Engenheiro de Software'}
        </button>
        <button onClick={() => handleFilter(null)} className="filter-button">
          {currentLanguage === 'en' ? 'Show All' : 'Mostrar Todos'}
        </button>

        {/* Botão de Impressão */}
        <button onClick={handlePrint} className="print-button">
          {currentLanguage === 'en' ? 'Print CV' : 'Imprimir CV'}
        </button>
      </div>

      {/* Menu Hamburger */}
      <div
        className="navbar-hamburger"
        onClick={handleMenuToggle}
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleMenuToggle();
          }
        }}
      >
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
