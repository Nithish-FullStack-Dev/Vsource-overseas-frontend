export const COUNTRIES = ["USA", "UK", "Canada", "Ireland", "France"] as const;
export type Country = (typeof COUNTRIES)[number];

export interface University {
  id: string;
  name: string;
  logo: string;
  country: Country;
  campus: string;
  website: string;
}

// Sample data
export const UNIVERSITIES: University[] = [
  {
    id: "harvard",
    name: "Harvard University",
    logo: "/logos/harvard.png",
    country: "USA",
    campus: "Cambridge, MA",
    website: "https://www.harvard.edu",
  },
  {
    id: "mit",
    name: "MIT",
    logo: "/logos/mit.png",
    country: "USA",
    campus: "Cambridge, MA",
    website: "https://www.mit.edu",
  },
  {
    id: "oxford",
    name: "Oxford University",
    logo: "/logos/oxford.png",
    country: "UK",
    campus: "Oxford",
    website: "https://www.ox.ac.uk",
  },
  {
    id: "cambridge",
    name: "Cambridge University",
    logo: "/logos/cambridge.png",
    country: "UK",
    campus: "Cambridge",
    website: "https://www.cam.ac.uk",
  },
  {
    id: "toronto",
    name: "University of Toronto",
    logo: "/logos/toronto.png",
    country: "Canada",
    campus: "Toronto",
    website: "https://www.utoronto.ca",
  },
  {
    id: "mcgill",
    name: "McGill University",
    logo: "/logos/mcgill.png",
    country: "Canada",
    campus: "Montreal",
    website: "https://www.mcgill.ca",
  },
  {
    id: "trinity",
    name: "Trinity College Dublin",
    logo: "/logos/trinity.png",
    country: "Ireland",
    campus: "Dublin",
    website: "https://www.tcd.ie",
  },
  {
    id: "sorbonne",
    name: "Sorbonne University",
    logo: "/logos/sorbonne.png",
    country: "France",
    campus: "Paris",
    website: "https://www.sorbonne-universite.fr",
  },
];
