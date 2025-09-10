export interface AboutUs {
  id: number;
  title: string;
  SubTitle_1: string;
  SubTitle_2: string;
  SubTitle_3: string;
  about_list: AboutList[];
  About_us_count: AboutUsCount[];
  chairmanImage: Image;
}

export interface AboutList {
  id: number;
  about_text: string;
  bold_text: string;
  Image_or_gif: Image;
}

export interface AboutUsCount {
  id: number;
  About_text: string;
  count: string;
  image_or_gif: Image;
}

export interface Image {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
}

//! Cources Section

export interface Courses {
  id: number;
  title: string;
  description: string;
  study_cards: StudyCards[];
}

export interface StudyCards {
  id: number;
  tag: string;
  country: string;
  image: Image;
  descriptions: Description[];
  url?: string;
}

export interface Description {
  id: number;
  description: string;
}

//! Comprehensive

export interface Comprehensive {
  id: number;
  title: string;
  description: string;
  cards: ComprehensiveCard[];
}

export interface ComprehensiveCard {
  id: number;
  title: string;
  description: string;
  external_url: string;
  image: Image;
  logo: Image;
}
