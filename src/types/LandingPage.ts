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

export interface AboutUsCounts {
  id: number;
  count: string;
  image: Image;
  text: string;
}

export interface Image {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  name?: string;
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

//! Company Video

export interface Company {
  title: string;
  description: string;
  thumbnail: Image;
  video: Image;
}

//*ABOUT US

//! BANNER

export interface AboutUsBanner {
  id: number;
  title: string;
  description: string;
  banner: Image;
}

export interface InnerAboutUs {
  id: number;
  title: string;
  description: string;
  subheadings: Description[];
  about_cards: AboutUsCounts[];
  chairman: Image;
}

export interface AboutSectionProps {
  aboutData: InnerAboutUs;
  isLoading: boolean;
  isError: boolean;
  error: any;
}

export interface Members {
  id: number;
  title: string;
  description: string;
  members: Member[];
}

export interface Member {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: Image;
}

//! Testimonials

export interface Testimonials {
  id: number;
  title: string;
  description: string;
  testimonials: Testimonial[];
}

export interface Testimonial {
  id: number;
  name: string;
  feedback: string;
  image: Image;
}

//! Service

export interface Service {
  id: number;
  title: string;
  services_list: Services_list[];
}

export interface Services_list {
  id: number;
  title: string;
  description: string;
  image: Image;
}
