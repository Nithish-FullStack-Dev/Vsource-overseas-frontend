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
    id: "coventry university",
    name: "Coventry University",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/coventry-university-logo-scaled.jpg",
    country: "UK",
    campus: "Coventry Campus, London Campus",
    website: "coventryacuk.co"

  },
  {
    id: "University of East London",
    name: "University of East London",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (17).png",
    country: "UK",
    campus: "London Campus",
    website: "coventryacuk.co"

  },
  {
    id: "University of Hertfordshire",
    name: "University of Hertfordshire",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University_of_Hertfordshire.webp",
    country: "UK",
    campus: "Hatfield Campus",
    website: "coventryacuk.co"

  },
  {
    id: "Aston University",
    name: "Aston University",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/AU_Birmingham_logo_Purple_RGB.png",
    country: "UK",
    campus: "London Campus, Birmingham Campus",
    website: "coventryacuk.co"

  },
  {
    id: "University of Greenwich",
    name: "University of Greenwich",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University of Greenwich.png",
    country: "UK",
    campus: "London Campus",
    website: "coventryacuk.co"

  },
  {
    id: "Anglia Ruskin University",
    name: "Anglia Ruskin University",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/ARU-logo-1440x1080-1-1-1024x768.jpg",
    country: "UK",
    campus: "chelmsford Campus, Cambridge Campus, Peterborough",
    website: "coventryacuk.co"

  },
  {
    id: "Northumbria University",
    name: "Northumbria University",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Northumbria_University_Logo.png",
    country: "UK",
    campus: "New Castle Campus, London Campus",
    website: "www.herts.ac.uk"
  },
  {
    id: "Edinburgh Napier University",
    name: "Edinburgh Napier University",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Edinburgh Napier University.png",
    country: "UK",
    campus: "Edinburgh Campus",
    website: "www.napier.ac.uk"
  },
  {
    id: "Teesside University",
    name: "Teesside University",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/TU.png",
    country: "UK",
    campus: "Middlesbrough, London Campus",
    website: "www.tees.ac.uk"
  },
   {
    id: "Sheffield Hallam University",
    name: "Sheffield Hallam University",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Sheffield Hallam University.png",
    country: "UK",
    campus: "Sheffiled",
    website: "www.shu.ac.uk"
  },
   {
    id: "University of Essex",
    name: "University of Essex",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University_of_Essex_logo-removebg-preview.png",
    country: "UK",
    campus: "Colchester",
    website: "www.essex.ac.uk"
  },
   {
    id: "Nottingham Trent University",
    name: "Nottingham Trent University",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/nottingham-trent-university-logo-square.png",
    country: "UK",
    campus: "Nottingham",
    website: "www.truestudent.com"
  },
   {
    id: "Cardiff Metropolitan University",
    name: "Cardiff Metropolitan University",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/cardiff-university.png",
    country: "UK",
    campus: "Llandaff Campus",
    website: "www.cardiffmet.ac.uk"
  },
   {
    id: "Heriot Watt University",
    name: "Heriot Watt University",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Heriot-Watt_University_logo.svg-removebg-preview.png",
    country: "UK",
    campus: "Edinburgh Campus",
    website: "www.hw.ac.uk"
  },
   {
    id: "Ravensbourne University",
    name: "Ravensbourne University",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Ravensbourne University.png",
    country: "UK",
    campus: "London Campus",
    website: "www.ravensbourne.ac.uk"
  },
   {
    id: "BPP University",
    name: "BPP University",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/logo-bpp-university.png",
    country: "UK",
    campus: "London Campus, Manchester Campus",
    website: "www.bpp.com"
  },
   {
    id: "University of Roehampton",
    name: "University of Roehampton",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University_of_Roehampton_logo.png",
    country: "UK",
    campus: "London Campus",
    website: "www.roehampton.ac.uk"
  },
   {
    id: "De Mont Fort University",
    name: "De Mont Fort University",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (1).png",
    country: "UK",
    campus: "Liecester Campus",
    website: "www.dmu.ac.uk"
  },
   {
    id: "London Metropolitan University",
    name: "London Metropolitan University",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/London Metropolitan University.svg",
    country: "UK",
    campus: "Liecester Campus, London Moorgate Campus",
    website: "www.dmu.ac.uk"
  },
   {
    id: "Birmingham City University",
    name: "Birmingham City University",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/bcu-birmingham-city-university5078.jpg",
    country: "UK",
    campus: "Birmingham Campus",
    website: "www.bcu.ac.uk"
  },
   {
    id: "Middlesex University",
    name: "Middlesex University",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Middlesex University.png",
    country: "UK",
    campus: "London Campus",
    website: "www.mdx.ac.uk"
  },
   {
    id: "University of Liecester",
    name: "University of Liecester",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University_of_Leicester_logo_pillars.jpg",
    country: "UK",
    campus: "Liecester Campus",
    website: "www.prospects.ac.uk"
  },
   {
    id: "University of Portsmouth",
    name: "University of Portsmouth",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/university-of-portsmouth.png",
    country: "UK",
    campus: "Portsmouth Campus",
    website: "www.port.ac.uk"
  },
  
   {
    id: "University of Maryland Baltimore county",
    name: "University of Maryland Baltimore county",
    logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/UMBC-logo-with-honors-tagline.png",
    country: "USA",
    campus: "Baltimore, Maryland",
    website: "www.umbc.edu"
  },
   {
    id: "Arizona State University",
    name: "Arizona State University",
    logo: "public\assets\images\LOGOS OF COUNTRIES WISE UNIVERSITIES\USA Universities Logos\arizona-state-university.webp",
    country: "USA",
    campus: "Tempe, Polytechnic, Tempe, West",
    website: "www.asu.edu"
  },
];
