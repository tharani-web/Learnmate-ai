import { 
  CareerOption, 
  CareerDiscoveryReport, 
  CollegeRoadmap, 
  CareerQuestionnaireAnswers, 
  RoadmapSetupData 
} from '../types';

export const DEFAULT_CAREER_OPTIONS: CareerOption[] = [
  {
    id: 'cs-it',
    title: 'Computer Science & Information Technology',
    category: 'Software & Technology',
    badge: 'High Industry Demand',
    matchReason: 'Aligns closely with interests in problem solving, technology, and building software solutions.',
    whatYouWillStudy: [
      'Data Structures and Algorithms (DSA)',
      'Object-Oriented Programming (Java, C++, Python)',
      'Database Management Systems (SQL & NoSQL)',
      'Computer Networks, Cloud & Operating Systems',
      'Full-Stack Web & Mobile Application Development',
      'Software Engineering Principles & System Design'
    ],
    skillsCommonlyUsed: [
      'Algorithmic Problem Solving',
      'Backend & Frontend Coding',
      'System Architecture Design',
      'Debugging & Performance Optimization',
      'Version Control (Git/GitHub)',
      'Cloud Deployment & CI/CD'
    ],
    exampleCareerAreas: [
      'Full-Stack Software Engineer',
      'Cloud & DevOps Architect',
      'Mobile App Developer (iOS/Android)',
      'Systems & Infrastructure Engineer',
      'Cybersecurity Specialist',
      'Product Manager / Tech Lead'
    ],
    beginnerSkillsToExplore: [
      'Learn Python or JavaScript syntax basics',
      'Write simple interactive programs (calculator, to-do app)',
      'Solve basic logic puzzles on platforms like LeetCode or HackerRank',
      'Understand how the internet and web browsers exchange data'
    ],
    questionsToAskBeforeChoosing: [
      'Do you enjoy sitting at a computer solving persistent logical puzzles and bugs?',
      'Are you excited about continuously learning new programming languages and frameworks?',
      'Do you prefer building user-facing apps or working on behind-the-scenes systems and infrastructure?'
    ],
    mathInvolvement: 'Medium',
    techInvolvement: 'High',
    creativityInvolvement: 'Medium',
    practicalWork: 'High',
    suggestedBeginnerResources: [
      { title: 'CS50: Introduction to Computer Science', type: 'Course', urlQuery: 'CS50 introduction to computer science Harvard' },
      { title: 'Learn Python for Beginners', type: 'Video Tutorial', urlQuery: 'Python for beginners full course freeCodeCamp' },
      { title: 'How Web Applications Work (Frontend vs Backend)', type: 'Guide', urlQuery: 'how web applications work frontend backend explained' }
    ]
  },
  {
    id: 'ai-data',
    title: 'Artificial Intelligence & Data Science',
    category: 'AI & Data',
    badge: 'Rapid Innovation',
    matchReason: 'Great fit for students enthusiastic about data analysis, predictive models, machine learning, and automation.',
    whatYouWillStudy: [
      'Linear Algebra, Calculus & Applied Statistics',
      'Machine Learning Algorithms (Supervised, Unsupervised)',
      'Deep Learning & Neural Network Architectures',
      'Natural Language Processing (NLP) & Computer Vision',
      'Data Wrangling, Feature Engineering & Pandas/NumPy',
      'Big Data Frameworks & Generative AI Systems'
    ],
    skillsCommonlyUsed: [
      'Statistical Reasoning & Hypothesis Testing',
      'Data Visualization & Exploratory Data Analysis',
      'Model Training, Validation & Hyperparameter Tuning',
      'Python (PyTorch, TensorFlow, Scikit-learn)',
      'SQL for Complex Analytical Querying',
      'API Integration for Generative AI Models'
    ],
    exampleCareerAreas: [
      'Machine Learning Engineer',
      'Data Scientist / Quantitative Analyst',
      'AI Research Associate',
      'Business Intelligence Analyst',
      'Computer Vision / NLP Specialist',
      'Prompt & Applied AI Systems Engineer'
    ],
    beginnerSkillsToExplore: [
      'Learn Python with Pandas and Matplotlib',
      'Analyze a simple real-world dataset (e.g. Titanic or Spotify songs on Kaggle)',
      'Understand mean, median, standard deviation, and correlation',
      'Experiment with pre-trained AI APIs and Hugging Face models'
    ],
    questionsToAskBeforeChoosing: [
      'Do you enjoy mathematics, probability, and discovering hidden patterns in datasets?',
      'Are you comfortable with experimentation, where models require iterative tuning rather than immediate right/wrong answers?',
      'Does understanding how smart recommendations (Netflix, Spotify, ChatGPT) work fascinate you?'
    ],
    mathInvolvement: 'High',
    techInvolvement: 'High',
    creativityInvolvement: 'Medium',
    practicalWork: 'High',
    suggestedBeginnerResources: [
      { title: 'Machine Learning for Everybody', type: 'Video Course', urlQuery: 'Machine learning for everybody freeCodeCamp' },
      { title: 'Kaggle Python & Data Science Micro-Courses', type: 'Interactive Tutorial', urlQuery: 'Kaggle learn python data science tutorial' },
      { title: '3Blue1Brown Neural Networks Series', type: 'Visual Guide', urlQuery: '3blue1brown neural networks essence of linear algebra' }
    ]
  },
  {
    id: 'arch-design',
    title: 'Architecture & Digital Design',
    category: 'Architecture & Design',
    badge: 'Creative & Spatial',
    matchReason: 'Balances creative artistic expression, spatial visualization, human psychology, and modern CAD/UI design technologies.',
    whatYouWillStudy: [
      'Architectural Design Studio & Spatial Planning',
      'Building Construction Materials & Structural Mechanics',
      'History of World Architecture & Urban Planning',
      'CAD Drafting, 3D Modeling (Rhino, Revit, SketchUp)',
      'UI/UX Design Systems, Wireframing & User Research',
      'Sustainable Green Building & Environmental Systems'
    ],
    skillsCommonlyUsed: [
      'Freehand Sketching & Concept Visualization',
      'Digital 3D Rendering & Physical Model Making',
      'Human-Centered Design Thinking',
      'Spatial Proportions & Aesthetic Ergonomics',
      'Design Presentation & Visual Storytelling',
      'Figma, Adobe Creative Suite & CAD Software'
    ],
    exampleCareerAreas: [
      'Licensed Architect / Urban Planner',
      'UI/UX Product Designer',
      'Interior Designer / Spatial Concept Artist',
      'Landscape Architect',
      'Design Consultant / Visualizer',
      'Game Environment & 3D Asset Designer'
    ],
    beginnerSkillsToExplore: [
      'Keep a daily visual sketchbook of buildings, spaces, or mobile app layouts',
      'Experiment with free design tools like Figma or SketchUp Free',
      'Redesign a real-world object or favorite app with improved usability',
      'Explore famous architects (Zaha Hadid, Frank Lloyd Wright, Geoffrey Bawa)'
    ],
    questionsToAskBeforeChoosing: [
      'Do you enjoy expressing your ideas through drawings, models, visual concepts, or design software?',
      'Are you prepared for studio-based learning where critique and iterative refinement are standard?',
      'Do you care deeply about how spaces, buildings, or digital apps make people feel and function?'
    ],
    mathInvolvement: 'Medium',
    techInvolvement: 'Medium',
    creativityInvolvement: 'High',
    practicalWork: 'High',
    suggestedBeginnerResources: [
      { title: 'Introduction to Architectural Design & Sketching', type: 'Video Guide', urlQuery: 'architectural design sketching for beginners' },
      { title: 'Figma UI/UX Design Fundamentals', type: 'Tutorial', urlQuery: 'Figma UI UX design fundamentals tutorial freeCodeCamp' },
      { title: 'The Design of Everyday Things by Don Norman', type: 'Book Summary', urlQuery: 'design of everyday things book summary' }
    ]
  },
  {
    id: 'engineering-branches',
    title: 'Multidisciplinary Engineering',
    category: 'Engineering',
    badge: 'Foundational Problem Solving',
    matchReason: 'Ideal for students who enjoy physical sciences, mechanics, electronics, and applying mathematics to physical systems.',
    whatYouWillStudy: [
      'Engineering Mathematics & Physics Foundations',
      'Core Discipline Mechanics (Circuits, Thermodynamics, or Structures)',
      'Instrumentation, Microcontrollers & Embedded Systems',
      'Engineering Drawing & Computer-Aided Manufacturing (CAM)',
      'Materials Science & Renewable Energy Technologies',
      'Industrial Automation, Robotics & Quality Control'
    ],
    skillsCommonlyUsed: [
      'Physical Prototyping & Lab Testing',
      'Schematic Analysis & Circuit Simulation',
      'Diagnostic Troubleshooting & Safety Compliance',
      'Cross-Disciplinary Team Project Coordination',
      'MATLAB, Simulink & SolidWorks'
    ],
    exampleCareerAreas: [
      'Embedded Systems & IoT Engineer',
      'Robotics & Automation Specialist',
      'Renewable Energy Systems Designer',
      'Automotive / Aerospace Systems Engineer',
      'Project & Operations Manager',
      'Research & Development Scientist'
    ],
    beginnerSkillsToExplore: [
      'Tinker with an Arduino or Raspberry Pi kit',
      'Learn basic electronics principles (Ohm’s law, transistors, sensors)',
      'Follow DIY engineering build channels (Mark Rober, Veritasium)',
      'Try simple 3D modeling on Tinkercad'
    ],
    questionsToAskBeforeChoosing: [
      'Do you find hands-on experimentation with physical components or hardware exciting?',
      'Are you curious about how machines, chips, electric vehicles, and bridges are built to withstand real-world forces?',
      'Are you open to exploring the convergence of hardware with smart software?'
    ],
    mathInvolvement: 'High',
    techInvolvement: 'High',
    creativityInvolvement: 'Medium',
    practicalWork: 'High',
    engineeringBranches: [
      { name: 'Computer Science (CSE)', focus: 'Software, algorithms, operating systems, networks', potentialRoles: 'Software Architect, Web/Mobile Developer' },
      { name: 'AI & Data Science (AIDS)', focus: 'Machine learning, statistics, big data pipelines', potentialRoles: 'ML Engineer, Data Scientist' },
      { name: 'Electronics & Communication (ECE)', focus: 'VLSI microchips, signal processing, IoT, communication', potentialRoles: 'VLSI Engineer, Embedded Systems Developer' },
      { name: 'Electrical & Electronics (EEE)', focus: 'Power systems, electric vehicles, motors, control systems', potentialRoles: 'EV Specialist, Power Grid Engineer' },
      { name: 'Mechanical Engineering (MECH)', focus: 'Thermodynamics, robotics, automotive, CAD/CAM design', potentialRoles: 'Robotics Engineer, Automotive Designer' },
      { name: 'Civil & Environmental Engineering (CIVIL)', focus: 'Structural mechanics, geotechnical, green infrastructure', potentialRoles: 'Structural Engineer, Urban Infrastructure Planner' }
    ],
    suggestedBeginnerResources: [
      { title: 'Arduino Basics for Beginners', type: 'Hands-on Guide', urlQuery: 'Arduino basics tutorial for beginners electronics' },
      { title: 'The Map of Engineering', type: 'Educational Video', urlQuery: 'Domain of Science map of engineering branches' },
      { title: 'Physics and Mechanics in Real-World Systems', type: 'Video Series', urlQuery: 'fundamentals of engineering mechanics physics' }
    ]
  },
  {
    id: 'business-analytics',
    title: 'Business Analytics & FinTech',
    category: 'Business & Management',
    badge: 'High Strategic Impact',
    matchReason: 'Combines commercial acumen, business strategy, communication, and modern data-driven decision making.',
    whatYouWillStudy: [
      'Financial Accounting & Corporate Valuation',
      'Business Statistics & Predictive Modeling',
      'Market Research & Consumer Psychology',
      'Supply Chain & Operations Optimization',
      'Product Management & Startup Entrepreneurship',
      'Data Analytics tools (Power BI, Tableau, Advanced Excel)'
    ],
    skillsCommonlyUsed: [
      'Financial Modeling & Forecasting',
      'Data Storytelling & Executive Presentations',
      'Negotiation & Stakeholder Management',
      'Business Process Automation',
      'Strategic Decision Analysis'
    ],
    exampleCareerAreas: [
      'Business Intelligence Analyst',
      'Product Manager / Growth Strategist',
      'Management Consultant',
      'Financial Risk Analyst / FinTech Associate',
      'Startup Founder / Venture Associate',
      'Operations & Supply Chain Analyst'
    ],
    beginnerSkillsToExplore: [
      'Master Excel formulas (XLOOKUP, Pivot Tables, SUMIFS)',
      'Read business case studies (e.g. how Netflix pivoted to streaming)',
      'Build a simple interactive dashboard in Google Looker Studio or Power BI',
      'Learn the basics of financial statements (Income Statement, Balance Sheet)'
    ],
    questionsToAskBeforeChoosing: [
      'Are you interested in understanding what makes companies grow, profit, and scale?',
      'Do you enjoy communicating insights and leading teams toward practical business solutions?',
      'Do you like combining numerical analysis with persuasive presentations?'
    ],
    mathInvolvement: 'Medium',
    techInvolvement: 'Medium',
    creativityInvolvement: 'Medium',
    practicalWork: 'High',
    suggestedBeginnerResources: [
      { title: 'Excel for Business Data Analytics', type: 'Tutorial', urlQuery: 'Excel for business data analysis freeCodeCamp' },
      { title: 'Introduction to Business Strategy & Case Studies', type: 'Video Guide', urlQuery: 'introduction to business strategy case analysis' },
      { title: 'How Startups Work by Paul Graham', type: 'Essays', urlQuery: 'Paul Graham how to get startup ideas essay' }
    ]
  }
];

export function generateDefaultRoadmap(setup: RoadmapSetupData): CollegeRoadmap {
  const isAI = setup.careerGoal.toLowerCase().includes('ai') || setup.department.toLowerCase().includes('ai');
  const isWeb = setup.careerGoal.toLowerCase().includes('software') || setup.careerGoal.toLowerCase().includes('web') || setup.careerGoal.toLowerCase().includes('developer');

  return {
    id: `roadmap-${Date.now()}`,
    degree: setup.degree || 'B.Tech',
    department: setup.department || 'Computer Science & Engineering',
    currentYear: setup.currentYear || '1st Year',
    careerGoal: setup.careerGoal || 'Software Developer',
    skillLevel: setup.skillLevel || 'Beginner',
    createdAt: new Date().toLocaleDateString(),
    smartNextStep: {
      topic: setup.currentYear === '1st Year' ? 'Programming Fundamentals & Problem Solving' : 'Data Structures & Algorithms in Depth',
      reason: `Based on your goal of becoming a ${setup.careerGoal}, establishing unbreakable mastery in core logic and algorithms will accelerate all subsequent coursework.`,
      actionText: 'Start Learning This Topic'
    },
    skillGapAnalysis: {
      careerGoal: setup.careerGoal || 'Software Developer',
      strongAreas: setup.currentSkills.length > 0 ? setup.currentSkills : ['Academic Foundation', 'Basic Computing Literacy'],
      areasToDevelop: isAI 
        ? ['Linear Algebra & Probability', 'Pandas & Data Manipulation', 'Model Training with PyTorch', 'Feature Engineering']
        : ['Data Structures & Algorithms', 'Relational Database Design (SQL)', 'RESTful API Engineering', 'Modern Frontend (React/TypeScript)'],
      suggestedLearningTopics: isAI
        ? ['Python for Data Science', 'Applied Statistics', 'Supervised Learning', 'Neural Network Architectures']
        : ['Clean Code Principles', 'Object-Oriented Design', 'Database Normalization', 'Full-Stack Architecture'],
      practiceRecommendations: [
        'Solve 2 algorithmic practice challenges weekly on Arrays and HashMaps',
        'Build a standalone mini-project and publish the code to GitHub with a descriptive README',
        'Take module quizzes to solidify theoretical definitions and exam keywords'
      ],
      disclaimer: 'This skill gap evaluation is an educational guide to help prioritize your study time; it is not a rigid or definitive measure of employability.'
    },
    years: [
      {
        yearNumber: 1,
        title: 'Year 1 — Foundation & Computational Thinking',
        theme: 'Establish core programming fluency, academic grounding, and problem-solving habits.',
        items: [
          {
            id: 'y1-1',
            topic: 'Programming Fundamentals (Python / C / Java)',
            stage: 'Foundation',
            yearNumber: 1,
            whyItMatters: 'Forms the bedrock syntax, control structures, and memory models required for all future engineering subjects.',
            prerequisites: ['Basic high school algebra and logical reasoning'],
            suggestedPractice: 'Solve 20 basic logic puzzles: loops, conditional branches, array searches, and string manipulation.',
            miniProjectIdea: 'Build an interactive console-based Student Grade or Expense Tracker with input validation.',
            completed: false
          },
          {
            id: 'y1-2',
            topic: 'Mathematical Foundations for Computing',
            stage: 'Foundation',
            yearNumber: 1,
            whyItMatters: 'Discrete mathematics, matrices, and basic calculus power algorithm complexity analysis and computer graphics.',
            prerequisites: ['12th grade mathematics'],
            suggestedPractice: 'Practice truth tables, set theory proofs, and matrix multiplication by hand and in code.',
            miniProjectIdea: 'Write a matrix operations library supporting determinant and inverse calculations.',
            completed: false
          },
          {
            id: 'y1-3',
            topic: 'Version Control with Git & GitHub',
            stage: 'Core Skills',
            yearNumber: 1,
            whyItMatters: 'Every modern technology company relies on Git for tracking changes, branch collaboration, and code reviews.',
            prerequisites: ['Basic terminal/command line navigation'],
            suggestedPractice: 'Create a GitHub account, set up SSH keys, clone repositories, and practice commit/push workflows.',
            miniProjectIdea: 'Publish your Year 1 lab exercise assignments as an open-source GitHub portfolio repository.',
            completed: false
          },
          {
            id: 'y1-4',
            topic: 'Basic Relational Databases & SQL',
            stage: 'Core Skills',
            yearNumber: 1,
            whyItMatters: 'Applications must store, query, and structure data reliably without redundancy or data loss.',
            prerequisites: ['Basic understanding of tables, rows, and columns'],
            suggestedPractice: 'Write queries using SELECT, WHERE, GROUP BY, HAVING, and INNER/LEFT JOIN.',
            miniProjectIdea: 'Design an unnormalized table for a college library and write SQL scripts to normalize it into 3NF.',
            completed: false
          },
          {
            id: 'y1-5',
            topic: 'Technical Communication & Presentation',
            stage: 'Foundation',
            yearNumber: 1,
            whyItMatters: 'Engineers who communicate technical ideas clearly in speech and documentation advance rapidly in academia and industry.',
            prerequisites: ['Willingness to explain concepts to peers'],
            suggestedPractice: 'Write clear README files for your code projects and give a 5-minute technical presentation in class.',
            miniProjectIdea: 'Author a well-documented technical tutorial explaining how a loop or recursion works.',
            completed: false
          }
        ]
      },
      {
        yearNumber: 2,
        title: 'Year 2 — Core Engineering & Skill Building',
        theme: 'Deepen algorithmic rigor, system architectures, and full-stack software development.',
        items: [
          {
            id: 'y2-1',
            topic: 'Data Structures & Algorithms (DSA)',
            stage: 'Core Skills',
            yearNumber: 2,
            whyItMatters: 'Crucial for software performance optimization and the primary benchmark tested in technical campus placements.',
            prerequisites: ['Programming Fundamentals', 'Basic recursion and pointers/references'],
            suggestedPractice: 'Implement Stacks, Queues, Linked Lists, Binary Trees, and Hash Maps from scratch.',
            miniProjectIdea: 'Build a pathfinding visualizer demonstrating Breadth-First Search (BFS) and Dijkstra’s algorithm on a grid.',
            completed: false
          },
          {
            id: 'y2-2',
            topic: 'Object-Oriented Design & Design Patterns',
            stage: 'Core Skills',
            yearNumber: 2,
            whyItMatters: 'Enables writing clean, maintainable, extensible enterprise code that multiple engineers can work on concurrently.',
            prerequisites: ['Basic class and object syntax'],
            suggestedPractice: 'Refactor procedural code using Inheritance, Interfaces, Polymorphism, and Singleton/Factory patterns.',
            miniProjectIdea: 'Design a simulation of a Bank Account or Ride-Sharing system with abstract classes and role permissions.',
            completed: false
          },
          {
            id: 'y2-3',
            topic: 'Web Development & RESTful APIs',
            stage: 'Projects',
            yearNumber: 2,
            whyItMatters: 'Connects user-facing graphical interfaces with backend servers and cloud databases.',
            prerequisites: ['Basic HTML/CSS, JavaScript/TypeScript, and HTTP methods (GET/POST)'],
            suggestedPractice: 'Build a backend Express or FastAPI server that serves structured JSON data with query parameters.',
            miniProjectIdea: 'Build an authenticated Academic Notes Sharing web app with CRUD operations and search filters.',
            completed: false
          },
          {
            id: 'y2-4',
            topic: 'Operating Systems & Computer Architecture',
            stage: 'Core Skills',
            yearNumber: 2,
            whyItMatters: 'Understanding memory management, CPU scheduling, threads, and I/O prevents subtle concurrency bugs.',
            prerequisites: ['C or C++ basics'],
            suggestedPractice: 'Implement round-robin and shortest-job-first CPU scheduling algorithms in code.',
            miniProjectIdea: 'Write a basic multi-threaded simulation demonstrating the Producer-Consumer problem with semaphores.',
            completed: false
          }
        ]
      },
      {
        yearNumber: 3,
        title: 'Year 3 — Specialization & Real-World Projects',
        theme: 'Hone deep domain specialization, build a standout portfolio, and secure an industry internship.',
        items: isAI ? [
          {
            id: 'y3-ai-1',
            topic: 'Applied Machine Learning & Scikit-Learn',
            stage: 'Specialization',
            yearNumber: 3,
            whyItMatters: 'Enables systems to discover patterns in historical data and make automated predictive decisions.',
            prerequisites: ['Python, Pandas, NumPy, Linear Algebra'],
            suggestedPractice: 'Train classification and regression models, evaluating Precision, Recall, and ROC-AUC curves.',
            miniProjectIdea: 'Predict student academic exam outcomes using real demographic and study habit datasets.',
            completed: false
          },
          {
            id: 'y3-ai-2',
            topic: 'Deep Learning & Neural Architectures (PyTorch)',
            stage: 'Specialization',
            yearNumber: 3,
            whyItMatters: 'Powers state-of-the-art breakthroughs in Computer Vision, Speech Processing, and Large Language Models.',
            prerequisites: ['Calculus gradients, Multivariable calculus, Backpropagation concept'],
            suggestedPractice: 'Build a Convolutional Neural Network (CNN) to classify images and visualize feature maps.',
            miniProjectIdea: 'Develop a plant leaf disease detection model with a web UI for agricultural diagnosis.',
            completed: false
          },
          {
            id: 'y3-ai-3',
            topic: 'Applied Generative AI & Vector Search',
            stage: 'Projects',
            yearNumber: 3,
            whyItMatters: 'Organizations are rapidly integrating LLMs, semantic retrieval, and agentic workflows into products.',
            prerequisites: ['API integration, Embeddings concepts'],
            suggestedPractice: 'Build a Retrieval-Augmented Generation (RAG) system using vector databases like Chroma or Pinecone.',
            miniProjectIdea: 'Build an AI College Syllabus Assistant that answers questions grounded strictly in uploaded course PDFs.',
            completed: false
          },
          {
            id: 'y3-ai-4',
            topic: 'Summer Internship & Portfolio Polish',
            stage: 'Internship',
            yearNumber: 3,
            whyItMatters: 'Real-world industry experience bridges academic theory and collaborative engineering workflows.',
            prerequisites: ['At least 2 substantial GitHub projects, polished LinkedIn profile and resume'],
            suggestedPractice: 'Apply to summer internships via campus drives, angel networks, and faculty research labs.',
            miniProjectIdea: 'Host a live demo on Hugging Face Spaces or Cloud Run with an interactive portfolio write-up.',
            completed: false
          }
        ] : [
          {
            id: 'y3-swe-1',
            topic: 'Modern Frontend (React, TypeScript, Tailwind)',
            stage: 'Specialization',
            yearNumber: 3,
            whyItMatters: 'Modern web applications require responsive, type-safe, componentized reactive architectures.',
            prerequisites: ['Modern JavaScript (ES6+), CSS Grid/Flexbox'],
            suggestedPractice: 'Build reusable UI component design systems with state management and error boundary guards.',
            miniProjectIdea: 'Develop an interactive collaborative Kanban board or Study Planner with local persistence.',
            completed: false
          },
          {
            id: 'y3-swe-2',
            topic: 'Backend Architecture & Database Optimization',
            stage: 'Specialization',
            yearNumber: 3,
            whyItMatters: 'Handling scale requires indexing, caching (Redis), rate-limiting, and microservices concepts.',
            prerequisites: ['Relational databases, Node.js or Python backend frameworks'],
            suggestedPractice: 'Optimize slow SQL queries using EXPLAIN ANALYZE, B-Tree indexes, and caching strategies.',
            miniProjectIdea: 'Build a high-performance URL shortener with rate limiting and analytics click-tracking.',
            completed: false
          },
          {
            id: 'y3-swe-3',
            topic: 'Cloud Infrastructure, Containers (Docker) & CI/CD',
            stage: 'Projects',
            yearNumber: 3,
            whyItMatters: 'Deploying and scaling production systems reliably using containerization and automated test pipelines.',
            prerequisites: ['Linux command line, Git'],
            suggestedPractice: 'Containerize a full-stack web application using Docker and deploy to Cloud Run or AWS ECS.',
            miniProjectIdea: 'Configure a GitHub Actions pipeline that automatically tests, lints, and deploys your web app on push.',
            completed: false
          },
          {
            id: 'y3-swe-4',
            topic: 'Pre-Final Year Internship',
            stage: 'Internship',
            yearNumber: 3,
            whyItMatters: 'Direct hands-on experience contributing to production codebases and agile sprints.',
            prerequisites: ['Complete resume, active GitHub profile with deployed projects'],
            suggestedPractice: 'Participate in open source contributions and apply for tech summer internships.',
            miniProjectIdea: 'Contribute a bug fix or feature enhancement to an open-source library on GitHub.',
            completed: false
          }
        ]
      },
      {
        yearNumber: 4,
        title: 'Year 4 — Career Launch & Placement Readiness',
        theme: 'Master technical interviews, complete a capstone project, and transition smoothly into career or higher studies.',
        items: [
          {
            id: 'y4-1',
            topic: 'Algorithmic Placement Sprint (DSA Revision)',
            stage: 'Placement / Higher Studies',
            yearNumber: 4,
            whyItMatters: 'Refreshes problem-solving speed under timed constraints for campus recruitment coding rounds.',
            prerequisites: ['Year 2 DSA mastery'],
            suggestedPractice: 'Practice 100 high-frequency placement questions on Dynamic Programming, Graphs, and Trees.',
            miniProjectIdea: 'Document your solved problem patterns and complexity trade-offs in a personal interview prep wiki.',
            completed: false
          },
          {
            id: 'y4-2',
            topic: 'System Design & Architecture Fundamentals',
            stage: 'Placement / Higher Studies',
            yearNumber: 4,
            whyItMatters: 'Demonstrates to senior interviewers that you think in terms of scalability, tradeoffs, and system boundaries.',
            prerequisites: ['Databases, Operating Systems, Networks, Cloud basics'],
            suggestedPractice: 'Practice designing Twitter, WhatsApp, or Netflix: identify throughput, storage, and bottleneck constraints.',
            miniProjectIdea: 'Draft an architectural whitepaper for a distributed campus notification system.',
            completed: false
          },
          {
            id: 'y4-3',
            topic: 'Final Year Capstone Project',
            stage: 'Projects',
            yearNumber: 4,
            whyItMatters: 'The crowning centerpiece of your university degree proving your capability to build a comprehensive real-world system.',
            prerequisites: ['All 3 years of accumulated technical competencies'],
            suggestedPractice: 'Work in a team following agile sprints, maintain comprehensive documentation and user testing.',
            miniProjectIdea: 'Build a smart campus automation portal or an AI-guided student diagnostic tutor with live users.',
            completed: false
          },
          {
            id: 'y4-4',
            topic: 'Mock Interviews, Resume Fine-Tuning & Career Launch',
            stage: 'Placement / Higher Studies',
            yearNumber: 4,
            whyItMatters: 'Translates your hard work into successful job offers or top graduate school admissions.',
            prerequisites: ['Updated resume with quantified impact metrics (e.g., improved speed by 30%)'],
            suggestedPractice: 'Conduct peer mock technical interviews, behavioral STAR-method rehearsals, and salary negotiations.',
            miniProjectIdea: 'Launch a sleek personal portfolio website showcasing your capstone, GitHub, and academic publications.',
            completed: false
          }
        ]
      }
    ]
  };
}
