// src/App.tsx

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Navbar from './components/Navbar';
import Header from './components/Header';
import Experience from './components/Experience';
import Project from './components/Project';
import Certification from './components/Certification';

import type {
  DataJson,
  CertificationType,
  ExperienceType,
  ProjectType,
} from './types';

import './styles.css';

function App() {
  // Tipagem do estado `data` como `DataJson | null`
  const [data, setData] = useState<DataJson | null>(null);

  // Tipagem do estado `currentLanguage` como 'en' | 'pt'
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'pt'>('en');

  // Tipagem de `filterTag` como string ou null
  const [filterTag, setFilterTag] = useState<string | null>(null);
  // "data-engineer", "software-engineer" ou null

  useEffect(() => {
    fetch('/content/data.json')
      .then((res) => res.json())
      .then((jsonData: DataJson) => {
        setData(jsonData);
      })
      .catch((err) => console.error('Erro ao carregar data.json', err));
  }, []);

  // Alterna idioma
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

  // Desestrutura os campos de data, que agora têm tipo `DataJson`
  const { info, experiences, certifications, projects } = data;

  // Aplica o filtro
  const filteredExperiences: ExperienceType[] = filterByTag(experiences);
  const filteredCertifications: CertificationType[] =
    filterByTag(certifications);
  const filteredProjects: ProjectType[] = filterByTag(projects);

  return (
    <div className="App">
      <Helmet>
        <meta charSet="UTF-8" />
        {/* Define o título da aba com base no nome */}
        <title>{info.name ? `${info.name} Resume` : 'Resume'}</title>
        {/* Define o favicon */}
        <link
          rel="icon"
          type="image/png"
          href={info.logo ? `content/${info.logo}` : 'favicon.ico'}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Outras meta tags podem ser adicionadas aqui conforme necessário */}
      </Helmet>

      {/* Navbar */}
      <Navbar
        currentLanguage={currentLanguage}
        toggleLanguage={toggleLanguage}
        setFilterTag={setFilterTag}
      />

      {/* Header */}
      <Header info={info} language={currentLanguage} />

      <main>
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
