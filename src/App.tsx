// App.tsx

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Header from './components/Header';
import Experience from './components/Experience';
import Project from './components/Project';
import Certification from './components/Certification';

import type {
  DataJson,
  CertificationType,
  ExperienceType,
  ProjectType
} from './types';

import './styles.css';

function App() {
  // 1) Tipar o estado `data` como `DataJson | null`
  const [data, setData] = useState<DataJson | null>(null);

  // 2) Tipar o estado `currentLanguage` mais estritamente
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'pt'>('en');

  // 3) `filterTag` pode ser string ou null
  const [filterTag, setFilterTag] = useState<string | null>(null);
  // "data-engineer", "software-engineer" ou null

  useEffect(() => {
    fetch('/content/data.json')
      .then((res) => res.json())
      .then((jsonData: DataJson) => {
        // Garante que jsonData é do tipo DataJson
        setData(jsonData);
      })
      .catch((err) => console.error('Erro ao carregar data.json', err));
  }, []);

  // Alterna idioma
  const toggleLanguage = () => {
    setCurrentLanguage((prev) => (prev === 'en' ? 'pt' : 'en'));
  };

  /**
   * Filtra um array (ExperienceType[] | ProjectType[] | CertificationType[]) 
   * com base na `filterTag`, preservando o tipo dos itens.
   */
  function filterByTag<T extends { tags: string[] }>(items: T[]): T[] {
    if (!filterTag) return items; // Se não há filtro, retorna tudo
    return items.filter((item) => item.tags.includes(filterTag));
  }

  if (!data) {
    return <div className="loading">Carregando...</div>;
  }

  // Desestrutura os campos de data, que agora tem tipo `DataJson`
  const { info, experiences, certifications, projects } = data;

  // Aplica o filtro
  const filteredExperiences: ExperienceType[] = filterByTag(experiences);
  const filteredCertifications: CertificationType[] = filterByTag(certifications);
  const filteredProjects: ProjectType[] = filterByTag(projects);

  return (
    <div className="App">
      <Helmet>
        <meta charSet="UTF-8" />
        {/* Se data.info.name existir, adicionamos no título. Senão, fallback */}
        <title>{info.name ? `${info.name} Resume` : 'Resume'}</title>
        <link
          rel="icon"
          type="image/png"
          href={info.logo ? `content/${info.logo}` : 'favicon.ico'}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Outras meta tags podem ser adicionadas aqui conforme necessário */}
      </Helmet>

      <header>
        {/* Passa info (do tipo Info) e currentLanguage ('en' | 'pt') para o Header */}
        <Header info={info} language={currentLanguage} />

        <button onClick={toggleLanguage} style={{ marginLeft: '1rem' }}>
          {currentLanguage === 'en' ? 'PT' : 'EN'}
        </button>

        {/* Botões de filtro */}
        <div style={{ marginTop: '1rem' }}>
          <button onClick={() => setFilterTag('data-engineer')}>
            {currentLanguage === 'en' ? 'Data Engineer' : 'Engenheiro de Dados'}
          </button>

          <button onClick={() => setFilterTag('software-engineer')} style={{ marginLeft: '0.5rem' }}>
            {currentLanguage === 'en' ? 'Software Engineer' : 'Engenheiro de Software'}
          </button>

          <button onClick={() => setFilterTag(null)} style={{ marginLeft: '0.5rem' }}>
            {currentLanguage === 'en' ? 'Show All' : 'Mostrar Todos'}
          </button>
        </div>
      </header>

      <main>
        {/* EXPERIENCES */}
        <section>
          <h2>
            {currentLanguage === 'en' ? 'Experiences' : 'Experiências'}
          </h2>
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
            <Project
              key={index}
              project={proj}
              language={currentLanguage}
            />
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
