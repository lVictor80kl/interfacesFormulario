export interface Form {
    id: number;
    name: string;
    lastname: string;
    CI: string;
    phone: string;
    email: string;
    country: string;
    city: string;
    state: string;
    laboralExperiences: string[]; // Arreglo de strings
    languages: string[];          // Arreglo de strings
    academyFormations: string[];  // Arreglo de strings
    skills: string[];             // Arreglo de strings
    softSkills: string[];         // Arreglo de strings
    userId: number;
  }