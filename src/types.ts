/**
 * Definições de tipos para o JSON dado.
 * Salve como `types.ts` ou um nome similar,
 * e importe em seu projeto onde precisar.
 */

/**
 * Representa um campo bilíngue (inglês e português).
 */
export interface I18nString {
  en: string;
  pt: string;
}

/**
 * Informações básicas do usuário.
 */
export interface InfoType {
  name: string; // ex: "Ítalo Guimarães"
  title: I18nString; // ex: { en: "Data Engineering...", pt: "Engenharia de Dados..." }
  logo: string; // ex: "i.ico"
  location: I18nString; // ex: { en: "Brasília, DF, Brazil", pt: "Brasília, DF, Brasil" }
  email: string; // ex: "italovinicius19981998@gmail.com"
  linkedin: string; // ex: "linkedin.com/in/italovinicius18"
  github: string; // ex: "github.com/italovinicius18"
}

/**
 * Representa um item de descrição, também bilíngue.
 */
export interface I18nDescription {
  en: string;
  pt: string;
}

/**
 * Estrutura de cada experiência profissional (dentro de experiences).
 */
export interface ExperienceType {
  companyName: string; // ex: "TRACTIAN"
  logoUrl: string; // ex: "tractian.png"
  role: I18nString; // ex: { en: "Analytics Engineer", pt: "Engenheiro(a)..." }
  employmentType: I18nString;
  startDate: I18nString;
  endDate: I18nString;
  duration: I18nString;
  location: I18nString;
  /**
   * Lista de descrições (cada item é um objeto com { en, pt }).
   * Ex: [
   *   { en: "Implementation of...", pt: "Implementação de..." },
   *   { en: "Development of...", pt: "Desenvolvimento de..." }
   * ]
   */
  description: I18nDescription[];
  /**
   * Tags usadas para filtrar (ex.: "data-engineer", "software-engineer", etc.)
   */
  tags: string[];
}

/**
 * Estrutura de cada certificado (dentro de certifications).
 */
export interface CertificationType {
  name: I18nString; // ex: { en: "AWS Certified Cloud Practitioner", pt: "AWS Certified Cloud Practitioner" }
  issuer: I18nString; // ex: { en: "Amazon Web Services (AWS)", pt: "Amazon Web Services (AWS)" }
  tags: string[]; // ex: ["data-engineer", "software-engineer"]
}

/**
 * Estrutura de cada projeto (dentro de projects).
 */
export interface ProjectType {
  title: I18nString; // ex: { en: "A3Data - Hypofarma Client", pt: "A3Data - Cliente Hypofarma" }
  description: I18nString; // ex: { en: "Data architecture...", pt: "Arquitetura de dados..." }
  tags: string[];
}

/**
 * Tipo raiz (root) que representa todo o JSON.
 */
export interface DataJson {
  info: InfoType;
  experiences: ExperienceType[];
  certifications: CertificationType[];
  projects: ProjectType[];
}
