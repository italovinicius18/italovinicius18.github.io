// src/App.tsx

import { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import html2pdf from 'html2pdf.js';

import Navbar from './components/Navbar';
import Header from './components/Header';
import Experience from './components/Experience';
import Education from './components/Education';
import Project from './components/Project';
import Certification from './components/Certification';

import type {
  DataJson,
  CertificationType,
  ExperienceType,
  ProjectType,
} from './types/types';

import './styles.css';

function App() {
  const [data, setData] = useState<DataJson | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'pt'>('en');
  const [filterTag, setFilterTag] = useState<string | null>(null);

  // Referência ao conteúdo principal para impressão
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/content/data.json')
      .then((res) => res.json())
      .then((jsonData: DataJson) => {
        setData(jsonData);
      })
      .catch((err) => console.error('Erro ao carregar data.json', err));
  }, []);

  const toggleLanguage = () => {
    setCurrentLanguage((prev) => (prev === 'en' ? 'pt' : 'en'));
  };

  /**
   * Filtra um array baseado na `filterTag`, preservando o tipo dos itens.
   */
  function filterByTag<T extends { tags: string[] }>(items: T[]): T[] {
    if (!filterTag) return items; // Se não há filtro, retorna tudo
    return items.filter((item) => item.tags.includes(filterTag));
  }

  if (!data) {
    return <div className="loading">Carregando...</div>;
  }

  const { info, experiences, educations, certifications, projects } = data;

  const filteredExperiences: ExperienceType[] = filterByTag(experiences);
  const filteredCertifications: CertificationType[] =
    filterByTag(certifications);
  const filteredProjects: ProjectType[] = filterByTag(projects);

  /**
   * Função para imprimir o conteúdo da página excluindo a Navbar.
   */
  const handlePrint = () => {
    if (printRef.current) {
      const element = printRef.current;

      // Definir as opções do html2pdf
      const opt = {
        margin: [10, 10, 10, 10], // top, left, bottom, right em mm
        filename: getFilename(),
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, useCORS: true }, // Aumentar a escala para melhor qualidade
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }, // Evitar quebras de página dentro de elementos
      };

      // Gerar o PDF
      html2pdf().set(opt).from(element).save();
    }
  };

  /**
   * Função para gerar o nome do arquivo baseado no filtro e idioma.
   */
  const getFilename = (): string => {
    const tag = filterTag ? filterTag : 'all';
    const lang = currentLanguage.toUpperCase();
    return `CV-${tag}-${lang}.pdf`;
  };

  return (
    <div className="App">
      <Helmet>
        <meta charSet="UTF-8" />
        <title>{info.name ? `${info.name} Resume` : 'Resume'}</title>
        <link
          rel="icon"
          type="image/png"
          href={info.logo ? `content/${info.logo}` : 'favicon.ico'}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      {/* Navbar */}
      <Navbar
        currentLanguage={currentLanguage}
        toggleLanguage={toggleLanguage}
        setFilterTag={setFilterTag}
        handlePrint={handlePrint} // Passando a função de impressão
        filterTag={filterTag} // Passando o filtro atual para exibir na Navbar
      />

      <main ref={printRef}>
        {/* Header */}
        <Header info={info} language={currentLanguage} />

        {/* EXPERIENCES */}
        <section>
          <h2>{currentLanguage === 'en' ? 'Experiences' : 'Experiências'}</h2>
          {filteredExperiences.map((exp, index) => (
            <Experience
              key={index}
              experience={exp}
              language={currentLanguage}
            />
          ))}
        </section>

        {/* Education */}
        <section>
          <h2>{currentLanguage === 'en' ? 'Education' : 'Educação'}</h2>
          {educations.map((edu, index) => (
            <Education key={index} education={edu} language={currentLanguage} />
          ))}
        </section>

        {/* PROJECTS */}
        <section>
          <h2>{currentLanguage === 'en' ? 'Projects' : 'Projetos'}</h2>
          {filteredProjects.map((proj, index) => (
            <Project key={index} project={proj} language={currentLanguage} />
          ))}
        </section>

        {/* CERTIFICATIONS */}
        <section>
          <h2>
            {currentLanguage === 'en' ? 'Certifications' : 'Certificações'}
          </h2>
          {filteredCertifications.map((cert, index) => (
            <Certification
              key={index}
              certification={cert}
              language={currentLanguage}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
