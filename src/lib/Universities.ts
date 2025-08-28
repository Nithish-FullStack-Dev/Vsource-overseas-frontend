export const COUNTRIES = ["USA", "UK", "Canada", "Ireland", "France"] as const;
export type Country = (typeof COUNTRIES)[number];

export interface University {
  id?: string;
  key: string;
  name: string;
  logo: string;
  banner: string;
  country: Country;
  campus: string;
  website: string;

  overview: string[];
  stats: {
    acceptanceRate: string;
    intlStudents: string;
    ratio: string;
    placement: string;
  };
  rankings: {
    description: string[];
    items: Array<{
      rank: string;
      source: string;
    }>;
  };
  intakes: {
    text?: string[];
    month?: string;
    dropText?: string;
  }[];
  courses: {
    description: string[];
    items: Array<{
      study: string;
      cost: string;
    }>;
  };
  cost: {
    text?: string[];
    tableData?: Array<{
      type: string;
      cost: string;
    }>;
  }[];
  Scholarships: {
    description: string[];
    items: Array<{
      name: string;
      amount: string;
      type: string;
      level: string;
      eligibility: string;
    }>;
  };
  gallery: string[];
}
export interface Tab {
  id?: string;
  key: string;
  label: string;
}
export const UNIVERSITIES: University[] = [
  {

    key: "coventry-university",
    name: "Coventry University",
   logo: "/assets/images/university-banners/uk-banner/Coventry-University-logo.webp",
    banner:
      "/assets/images/university-banners/uk-banner/Coventry_University.webp",
    country: "UK",
    campus: "Coventry Campus, London Campus",
    website: "https://www.coventry.ac.uk",

    overview: [
      "Known as the ‘UK City of Culture,’ Coventry is home to one of the fastest-growing universities in United Kingdom. Established in 1843, Coventry University has a rich history of excellence in teaching and research. Its main campus is located in Coventry, with additional campuses in London, Scarborough, and even internationally in Wroclaw, Poland and Kazakhstan.",

      "Coventry University welcomes over 13,000 international students, with an impressive 50% being female, showcasing its commitment to diversity and equality. Its motto, Arte et Industria (By Art and Industry), highlights a forward-thinking blend of creativity and practical expertise. With over 11 research centers, the university is actively contributing to advancements in various fields.",

      "Ranked among the top universities in UK, Coventry University is affiliated with prestigious organizations like the Association of Commonwealth Universities, Universities UK, and the European University Association. Plus, Coventry University acceptance rate exceeds 70% making it an accessible option for many aspiring learners worldwide.",
    ],
    stats: {
      acceptanceRate: "79%",
      intlStudents: "4244+",
      ratio: "18:1",
      placement: "94%",
    },

    rankings: {
      description: [
        "With over 2,000 expert teaching staff and state-of-the-art facilities, Coventry University is committed to putting students first.This dedication has earned it a strong reputation and rising rankings worldwide.Notably, Coventry University has achieved its highest - ever placement by moving up in global rankings.",
        "The university’s commitment to teaching quality is further highlighted by its awards in various ranking frameworks, recognizing exceptional student experiences and outcomes. This growth is due to continual investment in facilities and a supportive environment designed to help students reach their potential.",
      ],
      items: [
        { rank: "#651–700", source: "QS World University Rankings" },
        { rank: "#601–800", source: "Times Higher Education" },
        { rank: "#50", source: "Guardian University Guide (UK)" }
      ]
    },

    intakes: [
      {
        text: ["Coventry University offers unmatched flexibility with its multiple intake periods, making it convenient for students to start their courses. Coventry University intake has over seven intakes throughout the year. However, the three primary intakes are the most popular, as they host the majority of master’s and bachelor’s programs.",
          "For other intake periods, the university provides options like short-term courses, diplomas, and other specific programs. As Coventry University intakes for some programs are exclusively available during that specific time, it is essential to verify the intake period for the preferred course in advance."]
      },
      { month: "September", dropText: "Over 85 postgraduate and few undergraduate programs are available in this winter intake." },
      { month: "January", dropText: "A selection of postgraduate and undergraduate courses is offered during this spring intake." },
      { month: "May", dropText: "This fall intake is the major one in which all of the undergraduate and postgraduate courses are offered." },
    ],

    courses: {
      description: [
        "Coventry University is well-known for offering many courses at undergraduate and postgraduate levels to students from all over the world. Among these, the Coventry University postgraduate courses are very popular. There are more than 230+ undergraduate and post-graduate courses that help students gain advanced knowledge in areas like Business & Management, Engineering & Technology, Health & Life Sciences, and Arts & Humanities.",
        "The university teaches students through four main schools: the College of Arts and Society, the College of Engineering, Environment, and Science, the School of Health and Care, and the College of Business and Law. Coventry is also one of the largest universities in Europe for business-related courses.",
        "Some postgraduate courses, such as MSc programs, also offer the chance to do Extended Professional Practice. This gives students real-world experience while they study. Besides this, Coventry University courses also include short programs in over 20 languages. The university is ranked 1st for Skills Development in the Postgraduate Taught Experience Survey (PTES) 2024, showing its strong focus on preparing students for success.",
      ],
      items: [
        { study: "MBA Global Business", cost: "£20,350.00" },
        { study: "MBA Master of Business Administration", cost: "£20,350.00" },
        { study: "MSc Business Analytics", cost: "£20,050.00" },
        { study: "MSc International Business Management", cost: "£20,050.00" },
        { study: "MSc Computer Science", cost: "£20,050.00" },
        { study: "MSc Data Science", cost: "£20,050.00" },
        { study: "MSc Data Science and Computational Intelligence", cost: "£20,050.00" },
        { study: "MSc Artificial Intelligence and Human Factors", cost: "£18,600.00" },
        { study: "MSc Cyber Security", cost: "£20,050.00" },
        { study: "MSc Advanced Mechanical Engineering", cost: "£20,050.00" },

      ],
    },
    cost: [
      {
        text: ["When it comes to Coventry University tuition fees for international students, affordability is a key factor to consider. Coventry City itself has been ranked as one of the top five student-friendly cities in the UK for affordability, as per the QS Best Student Cities Index 2024. This means students can expect reasonable living expenses while enjoying a vibrant student life.",
          "In addition, Coventry University fees for both undergraduate and postgraduate programs are among the most competitive in the UK. Specifically, Coventry University fees for Indian students are designed to be manageable, with the university offering flexible payment installment plans for self-funded students.",

        ]
      },
      {
        tableData: [
          { type: "Annual PG Tuition fee", cost: "20–22 Lakhs" },
          { type: "Annual UG Tuition fee", cost: "18–22 Lakhs" },
          { type: "Annual Accommodation & food expenses", cost: "12–15 Lakhs" },
        ],
      },
    ],

  Scholarships: {
     description: [
        "There are several Coventry University scholarships for international students. The university has also expanded its range of international scholarships and discounts for the January and May 2025 intakes. Unlike many other universities, there is no separate application process for Coventry University scholarships. Eligible students who meet the criteria will automatically receive the award after successfully completing the enrolment process as stated in their offer letter.",
        "However, it is important to note that Coventry University scholarships for undergraduate students are not currently available.",
      ],
       items: [
        {
          name: "Vice-Chancellor's International Scholarship",
          amount: "£3,000",
          type: "Merit-based",
          level: "Postgraduate",
          eligibility: "Available to high-achieving international students enrolling in postgraduate taught courses."
        },
        {
          name: "Excellence Scholarship",
          amount: "£2,000",
          type: "Merit-based",
          level: "Postgraduate",
          eligibility: "Awarded to international students with outstanding academic records enrolling in postgraduate taught courses."
        },
        {
          name: " Ambassador Scholarship",
          amount: "£1,500",
          type: "Merit-based",
          level: "Postgraduate",
          eligibility: "Given to international students who demonstrate leadership qualities and contribute to the university community."
        },
        {
          name: "Alumni Discount",
          amount: "10% tuition fee reduction",
          type: "Alumni-based",
          level: "Postgraduate",
          eligibility: "Available to former Coventry University students enrolling in postgraduate taught courses."
        },
      ],
    },
      gallery: [
        "/assets/images/university-gallery/coventry/1.jpg",
        "/assets/images/university-gallery/coventry/2.jpg",
        "/assets/images/university-gallery/coventry/3.jpg",
      ],
    },
  // {
  //   id: "University of East London",
  //   name: "University of East London",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (17).png",
  //   country: "UK",
  //   campus: "London Campus",
  //   website: "coventryacuk.co"

  // },
  // {
  //   id: "University of Hertfordshire",
  //   name: "University of Hertfordshire",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University_of_Hertfordshire.webp",
  //   country: "UK",
  //   campus: "Hatfield Campus",
  //   website: "coventryacuk.co"

  // },
  // {
  //   id: "Aston University",
  //   name: "Aston University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/AU_Birmingham_logo_Purple_RGB.png",
  //   country: "UK",
  //   campus: "London Campus, Birmingham Campus",
  //   website: "coventryacuk.co"

  // },
  // {
  //   id: "University of Greenwich",
  //   name: "University of Greenwich",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University of Greenwich.png",
  //   country: "UK",
  //   campus: "London Campus",
  //   website: "coventryacuk.co"

  // },
  // {
  //   id: "Anglia Ruskin University",
  //   name: "Anglia Ruskin University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/ARU-logo-1440x1080-1-1-1024x768.jpg",
  //   country: "UK",
  //   campus: "chelmsford Campus, Cambridge Campus, Peterborough",
  //   website: "coventryacuk.co"

  // },
  // {
  //   id: "Northumbria University",
  //   name: "Northumbria University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Northumbria_University_Logo.png",
  //   country: "UK",
  //   campus: "New Castle Campus, London Campus",
  //   website: "www.herts.ac.uk"
  // },
  // {
  //   id: "Edinburgh Napier University",
  //   name: "Edinburgh Napier University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Edinburgh Napier University.png",
  //   country: "UK",
  //   campus: "Edinburgh Campus",
  //   website: "www.napier.ac.uk"
  // },
  // {
  //   id: "Teesside University",
  //   name: "Teesside University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/TU.png",
  //   country: "UK",
  //   campus: "Middlesbrough, London Campus",
  //   website: "www.tees.ac.uk"
  // },
  //  {
  //   id: "Sheffield Hallam University",
  //   name: "Sheffield Hallam University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Sheffield Hallam University.png",
  //   country: "UK",
  //   campus: "Sheffiled",
  //   website: "www.shu.ac.uk"
  // },
  //  {
  //   id: "University of Essex",
  //   name: "University of Essex",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University_of_Essex_logo-removebg-preview.png",
  //   country: "UK",
  //   campus: "Colchester",
  //   website: "www.essex.ac.uk"
  // },
  //  {
  //   id: "Nottingham Trent University",
  //   name: "Nottingham Trent University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/nottingham-trent-university-logo-square.png",
  //   country: "UK",
  //   campus: "Nottingham",
  //   website: "www.truestudent.com"
  // },
  //  {
  //   id: "Cardiff Metropolitan University",
  //   name: "Cardiff Metropolitan University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/cardiff-university.png",
  //   country: "UK",
  //   campus: "Llandaff Campus",
  //   website: "www.cardiffmet.ac.uk"
  // },
  //  {
  //   id: "Heriot Watt University",
  //   name: "Heriot Watt University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Heriot-Watt_University_logo.svg-removebg-preview.png",
  //   country: "UK",
  //   campus: "Edinburgh Campus",
  //   website: "www.hw.ac.uk"
  // },
  //  {
  //   id: "Ravensbourne University",
  //   name: "Ravensbourne University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Ravensbourne University.png",
  //   country: "UK",
  //   campus: "London Campus",
  //   website: "www.ravensbourne.ac.uk"
  // },
  //  {
  //   id: "BPP University",
  //   name: "BPP University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/logo-bpp-university.png",
  //   country: "UK",
  //   campus: "London Campus, Manchester Campus",
  //   website: "www.bpp.com"
  // },
  //  {
  //   id: "University of Roehampton",
  //   name: "University of Roehampton",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University_of_Roehampton_logo.png",
  //   country: "UK",
  //   campus: "London Campus",
  //   website: "www.roehampton.ac.uk"
  // },
  //  {
  //   id: "De Mont Fort University",
  //   name: "De Mont Fort University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (1).png",
  //   country: "UK",
  //   campus: "Liecester Campus",
  //   website: "www.dmu.ac.uk"
  // },
  //  {
  //   id: "London Metropolitan University",
  //   name: "London Metropolitan University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/London Metropolitan University.svg",
  //   country: "UK",
  //   campus: "Liecester Campus, London Moorgate Campus",
  //   website: "www.dmu.ac.uk"
  // },
  //  {
  //   id: "Birmingham City University",
  //   name: "Birmingham City University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/bcu-birmingham-city-university5078.jpg",
  //   country: "UK",
  //   campus: "Birmingham Campus",
  //   website: "www.bcu.ac.uk"
  // },
  //  {
  //   id: "Middlesex University",
  //   name: "Middlesex University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Middlesex University.png",
  //   country: "UK",
  //   campus: "London Campus",
  //   website: "www.mdx.ac.uk"
  // },
  //  {
  //   id: "University of Liecester",
  //   name: "University of Liecester",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University_of_Leicester_logo_pillars.jpg",
  //   country: "UK",
  //   campus: "Liecester Campus",
  //   website: "www.prospects.ac.uk"
  // },
  //  {
  //   id: "University of Portsmouth",
  //   name: "University of Portsmouth",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/university-of-portsmouth.png",
  //   country: "UK",
  //   campus: "Portsmouth Campus",
  //   website: "www.port.ac.uk"
  // },

  //  {
  //   id: "University of Maryland Baltimore county",
  //   name: "University of Maryland Baltimore county",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/UMBC-logo-with-honors-tagline.png",
  //   country: "USA",
  //   campus: "Baltimore, Maryland",
  //   website: "www.umbc.edu"
  // },
  //  {
  //   id: "Arizona State University",
  //   name: "Arizona State University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/arizona-state-university.webp",
  //   country: "USA",
  //   campus: "Tempe, Polytechnic, Tempe, West",
  //   website: "www.asu.edu"
  // },
  //  {
  //   id: "California State University",
  //   name: "California State University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/california-state-university-long-beach2264-removebg-preview.png",
  //   country: "USA",
  //   campus: "Long Beach, Fullerton, San Bernardino, Chico, East Bay, Sacaramento, Los Angeles",
  //   website: "www.csulb.edu"
  // },
  //  {
  //   id: "University of North Texas",
  //   name: "University of North Texas",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/University of North Texas.svg",
  //   country: "USA",
  //   campus: "Long Beach, Fullerton, San Bernardino, Chico, East Bay, Sacaramento, Los Angeles",
  //   website: "www.unt.edu"
  // },
  //  {
  //   id: "University of Cincinnati",
  //   name: "University of Cincinnati",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/University of Cincinnati.png",
  //   country: "USA",
  //   campus: "West campus, Cincinnati, Ohio",
  //   website: "www.unt.edu"
  // },
  //  {
  //   id: "University of Missouri",
  //   name: "University of Missouri",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/University-of-Missouri-Logo.png",
  //   country: "USA",
  //   campus: "Saint Louis, Missouri",
  //   website: "www.missouri.edu"
  // },
  //  {
  //   id: "Northwest Missouri State University",
  //   name: "Northwest Missouri State University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/Northwest Missouri State University.png",
  //   country: "USA",
  //   campus: "Maryville, Missouri",
  //   website: "www.nwmissouri.edu"
  // },
  //  {
  //   id: "George Mason University",
  //   name: "George Mason University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/George_Mason_University_logo.svg.png",
  //   country: "USA",
  //   campus: "Fairfax, Virginia",
  //   website: "www.gmu.edu"
  // },
  //  {
  //   id: "University of Alabama at Birmingham",
  //   name: "University of Alabama at Birmingham",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/UAB-color-with-R-standard_FullColor.png",
  //   country: "USA",
  //   campus: "Birmingham, Alabama",
  //   website: "www.uab.edu"
  // },
  //  {
  //   id: "Oregon State University",
  //   name: "Oregon State University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/Oregon State University.svg",
  //   country: "USA",
  //   campus: "Corvallis, Oregon",
  //   website: "www.oregonstate.edu"
  // },
  //  {
  //   id: "University of Central Florida",
  //   name: "University of Central Florida",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/UCF-Logo.png",
  //   country: "USA",
  //   campus: "Orlando, Florida",
  //   website: "www.ucf.edu"
  // },
  //  {
  //   id: "Florida Atlantic University",
  //   name: "Florida Atlantic University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/florida-atlantic-logo-wordmark.png",
  //   country: "USA",
  //   campus: "Orlando, Florida",
  //   website: "www.fau.edu"
  // },
  //  {
  //   id: "University of Oklahoma",
  //   name: "University of Oklahoma",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/Oklahoma_City_University_logo.svg.png",
  //   country: "USA",
  //   campus: "Norman, Oklahoma",
  //   website: "www.ou.edu"
  // },
  //  {
  //   id: "Webster University",
  //   name: "Webster University",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/Webster University.png",
  //   country: "USA",
  //   campus: "St. Louis, Missouri & San Antonio Texas",
  //   website: "www.webster.edu"
  // },
  //  {
  //   id: "University of Illinois Spring Field",
  //   name: "University of Illinois Spring Field",
  //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/images (27).png",
  //   country: "USA",
  //   campus: "Springfield, Illinois",
  //   website: "www.uis.edu"
  // },
];
