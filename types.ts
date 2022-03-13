export interface EducationType {
  id: string;
  title: string;
  duration: string;
  location: string;
  cover_image: {
    publicUrl: string;
  };
}

export interface ExperienceType {
  id: string;
  title: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  technologies: Array<TechnologyType>;
  cover_image: {
    publicUrl: string;
  };
}

export interface TechnologyType {
  name: string;
  id: string;
}
