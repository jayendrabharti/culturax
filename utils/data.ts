export const appName = "CultraX";

// Fest Information
export const festInfo = {
  name: "CultraX",
  tagline: "Where Culture Meets Competition",
  description: "A dynamic journey from action-packed sports to intense E-sports, vibrant cultural events, and an unforgettable EDM night. Experience the ultimate college fest celebration!",
  dates: {
    start: "September 10, 2025",
    end: "September 30, 2025",
    duration: "21 Days"
  },
  venue: "LPU Campus",
  organizer: {
    name: "Iqlipse",
    type: "Student Club"
  },
  supervisor: "DSO",
  sponsor: "Loovert",
  collaborator: "CollegeEye",
  helpDeskStart: "September 1, 2025",
  prizeWorth: "₹1,70,000+"
};

// Navigation links
export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#schedule", label: "Schedule" },
  { href: "#registration", label: "Registration" },
  { href: "#contact", label: "Contact" }
];

// Event Categories with detailed information
export const eventCategories = [
  {
    id: "sports",
    name: "Sports",
    description: "High-energy competitive sports events",
    icon: "🏆",
    color: "from-orange-500 to-red-500",
    events: [
      { 
        name: "Cricket", 
        fee: "₹649", 
        type: "Team (6+1)", 
        description: "Tennis ball cricket, knockout format",
        venue: "Helipad Ground"
      },
      { 
        name: "Basketball", 
        fee: "₹499", 
        type: "Team (3+2)", 
        description: "3x3 half-court format",
        venue: "BH-4 Basketball Court"
      },
      { 
        name: "Volleyball", 
        fee: "₹599", 
        type: "Team (6+3)", 
        description: "Standard volleyball rules",
        venue: "BH-4 Volleyball Court"
      },
      { 
        name: "Badminton Solo", 
        fee: "₹99", 
        type: "Individual", 
        description: "Knockout format, 21 points",
        venue: "Block-13 Badminton Court"
      },
      { 
        name: "Badminton Doubles", 
        fee: "₹179", 
        type: "Team (2)", 
        description: "Knockout format",
        venue: "Block-13 Badminton Court"
      },
      { 
        name: "Tug of War", 
        fee: "₹649", 
        type: "Team (Max 800kg)", 
        description: "Best of three pulls",
        venue: "BH-4 Kho-Kho Ground"
      },
      { 
        name: "Kabaddi", 
        fee: "₹699", 
        type: "Team (7+3)", 
        description: "Two halves of 10 minutes",
        venue: "Uni-Polis"
      },
      { 
        name: "Arm Wrestling", 
        fee: "₹89", 
        type: "Individual", 
        description: "Weight category based",
        venue: "Front of DSW"
      }
    ]
  },
  {
    id: "esports",
    name: "E-Sports",
    description: "Digital gaming tournaments in virtual arena",
    icon: "�",
    color: "from-blue-500 to-cyan-500",
    events: [
      { 
        name: "Free Fire", 
        fee: "₹399", 
        type: "Team (4)", 
        description: "Mobile gaming tournament",
        venue: "Block-14 Seminar Hall"
      },
      { 
        name: "Smash Karts", 
        fee: "₹99", 
        type: "Individual", 
        description: "Online racing game",
        venue: "Block-14 Seminar Hall"
      }
    ]
  },
  {
    id: "cultural",
    name: "Cultural",
    description: "Showcase your creativity and artistic talents",
    icon: "🎭",
    color: "from-purple-500 to-pink-500",
    events: [
      { 
        name: "Dance Solo", 
        fee: "₹89", 
        type: "Individual", 
        description: "Max 3 minutes performance",
        venue: "Uni-Auditorium or SDMA"
      },
      { 
        name: "Dance Group", 
        fee: "₹459", 
        type: "Group (Max 5)", 
        description: "Max 5 minutes performance",
        venue: "Uni-Auditorium or SDMA"
      },
      { 
        name: "Singing Solo", 
        fee: "₹69", 
        type: "Individual", 
        description: "Max 3 minutes",
        venue: "Uni-Auditorium or SDMA"
      },
      { 
        name: "Singing Group", 
        fee: "₹349", 
        type: "Group (Max 4)", 
        description: "Max 5 minutes",
        venue: "Uni-Auditorium or SDMA"
      },
      { 
        name: "Fashion Show", 
        fee: "₹249", 
        type: "Individual", 
        description: "2 minutes walk time",
        venue: "Uni-Auditorium or SDMA"
      },
      { 
        name: "Musical Night", 
        fee: "Free", 
        type: "All", 
        description: "Grand finale celebration",
        venue: "Uni-Polis"
      }
    ]
  },
  {
    id: "art",
    name: "Art & Literature",
    description: "Express your creativity through various mediums",
    icon: "🎨",
    color: "from-green-500 to-emerald-500",
    events: [
      { 
        name: "Debate", 
        fee: "₹99", 
        type: "Individual", 
        description: "3 min speech + 2 min rebuttal",
        venue: "Block-14 Seminar Hall"
      },
      { 
        name: "Poetry", 
        fee: "₹59", 
        type: "Individual", 
        description: "Max 3 minutes",
        venue: "Block-14 Seminar Hall"
      },
      { 
        name: "Spot Painting", 
        fee: "₹59", 
        type: "Individual", 
        description: "60 minutes time limit",
        venue: "Helipad or Shed Beside Uni-Polis"
      },
      { 
        name: "Photography", 
        fee: "Free", 
        type: "Individual", 
        description: "Theme-based, 2 hours submission",
        venue: "Campus Wide"
      },
      { 
        name: "Reels Making", 
        fee: "Free", 
        type: "Individual", 
        description: "Max 90 seconds, 3 hours submission",
        venue: "Campus Wide"
      }
    ]
  }
];

// Schedule highlights
export const scheduleHighlights = [
  {
    day: "Sept 10-14",
    date: "Week 1",
    events: ["Sports Preliminaries", "Kabaddi & Arm Wrestling", "Cricket & Badminton"]
  },
  {
    day: "Sept 16-21", 
    date: "Week 2",
    events: ["Sports Quarters & Semis", "E-Sports Tournaments", "Free Fire & Smash Karts"]
  },
  {
    day: "Sept 23-28",
    date: "Week 3",
    events: ["Cultural Events", "Art Competitions", "Literary Events"]
  },
  {
    day: "Sept 29-30",
    date: "Grand Finale",
    events: ["Finals", "Musical Night", "Prize Distribution"]
  }
];

// Detailed Schedule
export const detailedSchedule = [
  {
    date: "Sept 10 (Wed)",
    events: [
      { time: "TBD", event: "Kabaddi Preliminaries", venue: "Uni-Polis" },
      { time: "TBD", event: "Arm Wrestling Qualifiers", venue: "Front of DSW" }
    ]
  },
  {
    date: "Sept 11 (Thu)", 
    events: [
      { time: "TBD", event: "Volleyball Preliminaries", venue: "BH-4 Volleyball Court" },
      { time: "TBD", event: "Basketball Preliminaries", venue: "BH-4 Basketball Court" }
    ]
  },
  {
    date: "Sept 13-14 (Weekend)",
    events: [
      { time: "TBD", event: "Cricket Matches", venue: "Helipad Ground" },
      { time: "TBD", event: "Tug of War", venue: "BH-4 Kho-Kho Ground" },
      { time: "TBD", event: "Badminton Tournaments", venue: "Block-13 Badminton Court" }
    ]
  },
  {
    date: "Sept 20-21 (Weekend)",
    events: [
      { time: "TBD", event: "E-Sports Tournaments", venue: "Block-14 Seminar Hall" },
      { time: "TBD", event: "Free Fire & Smash Karts", venue: "Block-14 Seminar Hall" }
    ]
  },
  {
    date: "Sept 27-28 (Weekend)",
    events: [
      { time: "TBD", event: "Cultural Events", venue: "Uni-Auditorium" },
      { time: "TBD", event: "Art Competitions", venue: "Various Venues" }
    ]
  },
  {
    date: "Sept 30 (Tue)",
    events: [
      { time: "Evening", event: "Musical Night", venue: "Uni-Polis" },
      { time: "TBD", event: "Prize Distribution", venue: "Uni-Polis" },
      { time: "TBD", event: "Closing Ceremony", venue: "Uni-Polis" }
    ]
  }
];

// Sponsors and Partners
export const sponsors = [
  {
    name: "Loovert",
    type: "Title Sponsor",
    logo: "/images/loovert_black_logo.png",
    logoDark: "/images/loovert_white_logo.png"
  }
];

export const partners = [
  {
    name: "CollegeEye",
    type: "Collaborating Club",
    logo: "/images/collegeeye_black_logo.png",
    logoDark: "/images/collegeeye_white_logo.png"
  },
  {
    name: "Iqlipse",
    type: "Organizing Club",
    logo: "/images/iqlipse_logo.png"
  }
];

// Contact Information
export const contactInfo = {
  helpDesk: {
    name: "Bibekananda Behera",
    phone: "7847952501",
    role: "Help Desk"
  },
  registration: {
    name: "Jayendra Bharti", 
    phone: "8800534849",
    role: "Registration"
  },
  coordinator: {
    name: "Agman Yadav",
    phone: "9368172591",
    role: "Event Coordinator"
  }
};

// Statistics
export const festStats = [
  { label: "Total Events", value: "25+" },
  { label: "Days", value: "21" },
  { label: "Prizes Worth", value: "₹1.7L+" },
  { label: "Expected Participants", value: "1000+" }
];
