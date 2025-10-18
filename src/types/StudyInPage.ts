import { Image } from "./LandingPage";

export interface StudyIn {
  id: number;
  title: string;
  banner: Banner;
  overview: Overview;
  whyStudyin: WhyStudyin;
  Living_Cost_Tuition_Fee: Living_Cost_Tuition_Fee;
  admissions: Admissions;
  visa_requirements: Visa_requirements;
  students_expriences: Students_expriences;
}

export interface Banner {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string;
}

export interface Overview {
  id: number;
  title?: string;
  highlights: Highlights[];
}

export interface Highlights {
  id: number;
  label: string;
  value: string;
}

export interface WhyStudyin {
  id: number;
  title: string;
  description: string;
  highlights_points: Description[];
  whyStudyin_cards: WhyStudyin_cards[];
}

export interface WhyStudyin_cards {
  id: number;
  title: string;
  description: string;
}

export interface Description {
  id: number;
  description: string;
}

export interface Living_Cost_Tuition_Fee {
  id: number;
  title?: string;
  cities: Cities[];
}

export interface Cities {
  id: number;
  city: string;
  description: string;
  image: Image;
  tables: Tables[];
}

export interface Tables {
  id: number;
  title: string;
  label_values: Label_values[];
}

export interface Label_values {
  id: number;
  label: string;
  value: string;
}

export interface Admissions {
  id: number;
  title: string;
  subheading1: string;
  subheading2: string;
  description: string;
  checklist: Checklist;
}

export interface Checklist {
  note: string;
  texts: Texts[];
}

export interface Texts {
  id: number;
  lists: string;
}

export interface Text {
  id: number;
  lists: string;
}

export interface Visa_requirements {
  id: number;
  title: string;
  subheading: string;
  details: Text[];
}

export interface Students_expriences {
  id: number;
  title: string;
  subheading: string;
  images: Image[];
}
