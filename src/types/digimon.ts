export interface Digimon {
  id: number;
  name: string;
  xAntibody: boolean;
  image: string;
  level: string;
  type: string;
  attribute: string;
  fields: string[];
  releaseDate: string;
  description: string;
  skills: Skill[];
  priorEvolutions: string[];
  nextEvolutions: string[];
}

export interface DigimonListItem {
  id: number;
  name: string;
  href: string;
  image: string;
}

export interface Skill {
  skill: string;
  description: string;
}

export interface Attribute {
  id: number;
  name: string;
  description: string;
}

export interface Field {
  id: number;
  name: string;
  description: string;
  href: string;
}

export interface Level {
  id: number;
  name: string;
  description: string;
}

export interface Pageable {
  currentPage: number;
  elementsOnPage: number;
  totalElements: number;
  totalPages: number;
  previousPage: string;
  nextPage: string;
}

export interface DigimonListResponse {
  content: DigimonListItem[];
  pageable: Pageable;
}

export interface AttributeListResponse {
  content: {
    name: string;
    description: string;
    fields: {
      id: number;
      name: string;
      href: string;
    }[];
  };
  pageable: Pageable;
}

export interface FieldListResponse {
  content: {
    name: string;
    description: string;
    fields: {
      id: number;
      name: string;
      href: string;
    }[];
  };
  pageable: Pageable;
}

export interface SkillListResponse {
  content: {
    name: string;
    description: string;
    fields: {
      id: number;
      name: string;
      href: string;
    }[];
  };
  pageable: Pageable;
}

export interface LevelListResponse {
  content: {
    name: string;
    description: string;
    fields: {
      id: number;
      name: string;
      href: string;
    }[];
  };
  pageable: Pageable;
}
