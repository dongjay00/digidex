export interface Digimon {
  id: number;
  name: string;
  xAntibody: boolean;
  images: {
    href: string;
    transparent: boolean;
  }[];
  levels: {
    id: number;
    level: string;
  }[];
  types: {
    id: number;
    type: string;
  }[];
  attributes: {
    id: number;
    attribute: string;
  }[];
  fields: {
    id: number;
    field: string;
    image: string;
  }[];
  releaseDate: string;
  descriptions: {
    origin: string;
    language: string;
    description: string;
  }[];
  skills: Array<Skill & { id: number }>;
  priorEvolutions: {
    id: number;
    digimon: string;
    condition: string;
    image: string;
    url: string;
  }[];
  nextEvolutions: {
    id: number;
    digimon: string;
    condition: string;
    image: string;
    url: string;
  }[];
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
  translation: string;
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
