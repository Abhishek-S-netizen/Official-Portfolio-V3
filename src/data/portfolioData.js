export const profileData = {
  firstName: "Abhishek",
  lastName: "Subramanian",
  initials: "A.S.",
  roles: [
    "Aspiring web developer",
    "Aspiring data analyst",
    "Car enthusiast",
    "CS undergrad & builder"
  ],
  bio: "I'm a third-year Computer Science student with a passion for building web applications that are both functional and enjoyable to use. I enjoy turning ideas into real products with a particular focus on creating clean, intuitive experiences that don't feel overcomplicated — a philosophy inspired by Porsche's minimalist approach to design and engineering, favoring simplicity, functionality and purpose.",
  github: "https://github.com/Abhishek-S-netizen",
  linkedin: "https://www.linkedin.com/in/abhishek-subramanian-64811b31a/",
  email: "abhisheksubramanian06@gmail.com",
  resumeUrl: "/Abhishek_Subramanian.pdf"
};

export const educationData = [
  {
    id: "bachelors",
    level: "B.SC. (HONS.) • CS & DATA ANALYTICS",
    institution: "Rajagiri College of Social Sciences",
    current: true,
  },
  {
    id: "12th",
    level: "HIGHER SECONDARY EDUCATION",
    institution: "Naipunya Public School Kochi",
    current: false,
  },
  {
    id: "10th",
    level: "SECONDARY EDUCATION",
    institution: "Naipunya Public School Kochi",
    current: false,
  },
];

export const technologiesData = [
  {
    category: "FRONTEND",
    items: [
      { name: "HTML5", iconClass: "devicon-html5-plain colored" },
      { name: "CSS3", iconClass: "devicon-css3-plain colored" },
      { name: "JAVASCRIPT", iconClass: "devicon-javascript-plain colored" },
      { name: "REACT", iconClass: "devicon-react-original colored" },
      { name: "BOOTSTRAP", iconClass: "devicon-bootstrap-plain", colorClass: "text-[#B57BFF]" },
    ]
  },
  {
    category: "BACKEND & LANGUAGES",
    items: [
      { name: "LARAVEL", iconClass: "devicon-laravel-original", colorClass: "text-[#FF5A4E]" },
      { name: "PHP", iconClass: "devicon-php-plain", colorClass: "text-[#93C5FD]" },
      { name: "PYTHON", iconClass: "devicon-python-plain colored" },
      { name: "JAVA", iconClass: "devicon-java-plain", colorClass: "text-[#FB923C]" },
      { name: "C", iconClass: "devicon-c-plain colored" },
      { name: "POSTGRESQL", iconClass: "devicon-postgresql-plain colored" },
    ]
  },
  {
    category: "TOOLS & PLATFORMS",
    items: [
      { name: "GIT", iconClass: "devicon-git-plain colored" },
      { name: "GITHUB", iconClass: "devicon-github-original" },
      { name: "VS CODE", customSvg: "vscode" },
      { name: "TABLEAU", customSvg: "tableau" },
    ]
  }
];

export const projectsData = [
  {
    id: "autoverse",
    title: "AutoVerse",
    subtitle: "Full-Stack Automotive Platform",
    shortDesc: "A full-stack automotive platform to explore vehicle reviews, compare models, manage wishlists, and rent cars. Built using Laravel, PHP and PostgreSQL.",
    image: "/images/AutoVerse.png",
    imageClass: "object-cover object-center",
    tech: ["Laravel", "PHP", "PostgreSQL", "Bootstrap", "JavaScript", "HTML5/CSS3"],
    status: "Source Available",
    githubUrl: "https://github.com/Abhishek-S-netizen/AutoVerse",
    liveUrl: null
  },
  {
    id: "cinemax",
    title: "CineMax",
    subtitle: "Concurrent Movie Booking System",
    shortDesc: "A full-stack movie booking app with 5-minute MongoDB TTL seat locks and client-side QR and PDF tickets. Built using React and Node.js",
    image: "/images/CineMax.png",
    imageClass: "object-cover object-center",
    tech: ["React", "Node.js", "Express", "MongoDB TTL", "PDF & QR Gen"],
    status: "Full-Stack",
    githubUrl: "https://github.com/Abhishek-S-netizen/movie-ticket-booking-system",
    liveUrl: "https://cinemax-xi.vercel.app/"
  },
  /* {
    id: "porsche",
    title: "Porsche 911 GT3 S/C",
    subtitle: "Porsche Digital Experience",
    shortDesc: "Immersive automotive web platform inspired by Porsche's minimalist digital experience.",
    fullDesc: "A Porsche-inspired web platform built using Laravel, PHP, PostgreSQL, and Cloudinary. The project combines dynamic vehicle content, custom content management, and immersive frontend animations to recreate selected aspects of the Porsche digital experience. Developed as a personal portfolio project inspired by the official Porsche website, it showcases both modern frontend development and scalable backend architecture.",
    image: "/images/Porsche.png",
    imageClass: "object-cover object-[82%_center]",
    tech: ["Laravel", "PHP", "PostgreSQL", "Cloudinary", "Animations"],
    status: "Work in Progress",
    githubUrl: "https://github.com",
    liveUrl: null
  }, */
  {
    id: "ppe-detection",
    title: "PPE Compliance Detection",
    subtitle: "Computer Vision Safety Monitor",
    shortDesc: "A real-time computer vision model with YOLOv8 & OpenCV detection for construction helmets, safety vests, and compliance.",
    image: "/images/PPE_Detection.png",
    imageClass: "object-cover object-left-top",
    tech: ["Python", "YOLOv8", "OpenCV", "Streamlit", "Deep Learning"],
    status: "AI / CV",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: "predictive-maintenance",
    title: "Predictive Maintenance",
    subtitle: "Equipment RUL & Failure Forecasting",
    shortDesc: "A machine learning system built with Python, XGBoost and Streamlit UI to predict industrial equipment failure and Remaining Useful Life.",
    image: "/images/Predictive_Maintenance.png",
    imageClass: "object-cover object-left-top",
    tech: ["Python", "Scikit-Learn", "XGBoost", "SHAP", "Streamlit"],
    status: "Data & ML",
    githubUrl: "https://github.com/Abhishek-S-netizen/Predictive-Maintenance",
    liveUrl: "https://predictive-maintenance-y7yvnhdeih7i624baocrwp.streamlit.app/"
  },
  {
    id: "transaction-fraud-detection",
    title: "Transaction Fraud Detection",
    subtitle: "Classification Pipeline",
    shortDesc: "An interactive classification pipeline built using Python, Pandas and XGBoost for identifying fraudulent transactions.",
    image: "/images/Transaction_Fraud_Detection.png",
    imageClass: "object-cover object-left-top",
    tech: ["Python", "Scikit-Learn", "Pandas", "XGboost", "Classification"],
    status: "Data & ML",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com"
  },
  {
    id: "ibm-attrition",
    title: "IBM Employee Attrition",
    subtitle: "HR Analytics & Classification Model",
    shortDesc: "An end-to-end workforce attrition prediction and analysis model with visual insights, built using Python, Pandas, Scikit-Learn and Streamlit.",
    image: "/images/IBM_Employee_Attrition.png",
    imageClass: "object-cover object-left-top",
    tech: ["Python", "Pandas", "Scikit-Learn", "Streamlit", "Data Viz"],
    status: "Data & ML",
    githubUrl: "https://github.com/Abhishek-S-netizen/Employee_Attrition_Model",
    liveUrl: "https://employeeattritionmodel-4ydjb9yfhahfpmegpvpbmo.streamlit.app/"
  },
];

export const explainersData = [
  {
    id: "pwa",
    number: "01",
    title: "Progressive Web Applications",
    description: "A basic, interactive write-up on PWAs and their working",
    badge: "Interactive Guide",
    link: "/writings/progressive-web-applications",
    available: true
  },
  {
    id: "computer-networks",
    number: "02",
    title: "Computer Networks & Architecture",
    description: "An interactive, four-chapter, foundational walkthrough of core computer networking concepts, protocols and architecture.",
    badge: "Interactive Hub",
    link: "/writings/computer-networks-and-architecture-basics",
    available: true
  }
];

export const certificationsData = [
  {
    id: 1,
    number: "01",
    title: "Introduction to Deep Learning and Computer Vision",
    issuer: "Grant Thornton Bharat",
    date: "September 2026",
    credentialUrl: null
  },
  {
    id: 2,
    number: "02",
    title: "Machine Learning for Business Intelligence & Decision Systems",
    issuer: "Grant Thornton Bharat",
    date: "February 2026",
    credentialUrl: null
  },
  {
    id: 3,
    number: "03",
    title: "Foundations of Data Science, Artificial Intelligence, and Machine Learning with Python",
    issuer: "Grant Thornton Bharat",
    date: "November 2025",
    credentialUrl: null
  },
  {
    id: 4,
    number: "04",
    title: "Python 101 for Data Science",
    issuer: "Cognitive Class",
    date: "November 2025",
    credentialUrl: "https://courses.cognitiveclass.ai/certificates/c9bb963a393e4955a0aa4b3b01d85c39"
  },
  {
    id: 5,
    number: "05",
    title: "Introduction to HTML, CSS, & JavaScript",
    issuer: "IBM",
    date: "May 2025",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/B8JPGWB3S26A"
  },
  {
    id: 6,
    number: "06",
    title: "Python for Data Science, AI & Development",
    issuer: "IBM",
    date: "June 2024",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/ZXBERQTPK4FL"
  }
];
