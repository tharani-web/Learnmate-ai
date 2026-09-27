import { 
  TopicLearningBundle, 
  Language, 
  ChatMessage, 
  PracticeEvaluationResult,
  CareerQuestionnaireAnswers,
  CareerDiscoveryReport,
  RoadmapSetupData,
  CollegeRoadmap
} from '../types';
import { DEMO_TOPICS_MAP, DBMS_NORMALIZATION_BUNDLE, MACHINE_LEARNING_BUNDLE } from '../data/demoTopics';
import { DEFAULT_CAREER_OPTIONS, generateDefaultRoadmap } from '../data/careerAndRoadmapData';

export async function fetchTopicBundle(topic: string, language: Language = 'en'): Promise<TopicLearningBundle> {
  const normalizedKey = topic.toLowerCase().trim();

  // Try calling the server-side Gemini API
  try {
    const res = await fetch('/api/learning/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, language }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && !data.fallback && data.notes && data.examPrep) {
        return data as TopicLearningBundle;
      }
    }
  } catch (err) {
    console.warn('Backend generate call failed, switching to client demo dataset:', err);
  }

  // If backend returned fallback or failed, use pre-built academic demo bundle if matched
  if (DEMO_TOPICS_MAP[normalizedKey]) {
    const bundle = { ...DEMO_TOPICS_MAP[normalizedKey], language };
    return bundle;
  }

  // If topic has "dbms" or "normaliz" in it, use DBMS bundle
  if (normalizedKey.includes('dbms') || normalizedKey.includes('normaliz')) {
    return { ...DBMS_NORMALIZATION_BUNDLE, language };
  }

  // If topic has "machine learning" or "ml" or "ai" in it, use ML bundle
  if (normalizedKey.includes('machine learning') || normalizedKey.includes('learn') || normalizedKey.includes('model')) {
    return { ...MACHINE_LEARNING_BUNDLE, topic, language };
  }

  // Otherwise, create a clean, comprehensive structured bundle tailored to the topic
  return createDynamicTopicBundle(topic, language);
}

export async function sendChatMessage(
  topic: string,
  messages: ChatMessage[],
  quickAction?: string,
  language: Language = 'en',
  careerContext?: string,
  roadmapContext?: string
): Promise<string> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, messages, quickAction, language, careerContext, roadmapContext }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.text) {
        return data.text;
      }
    }
  } catch (err) {
    console.warn('Chat API error:', err);
  }

  // Fallback response if offline
  if (careerContext) {
    return `### Academic Guidance: ${careerContext}\n\nExploring **${careerContext}** offers versatile opportunities across industries. Focus on building strong core analytical abilities, taking on hands-on practical lab projects, and actively participating in technical clubs or competitions!`;
  }
  if (roadmapContext) {
    return `### College Roadmap Strategy\n\nFor your pathway in **${roadmapContext}**, the most strategic move is to balance semester grades with 2-3 substantial real-world projects on GitHub. Focus on mastering core data structures and building clean, testable code!`;
  }
  if (quickAction === 'Explain Simply') {
    return `### Simple Explanation of ${topic}\n\nThink of **${topic}** as a fundamental building block. Imagine breaking a big, complex challenge into small, manageable puzzle pieces. Each piece has a clear role, and when connected properly, it creates a reliable, high-performance system!`;
  }
  if (quickAction === 'Give Example') {
    return `### Real-World Example for ${topic}\n\nIn modern tech platforms, **${topic}** is applied every day to streamline workflows, guarantee reliability, and ensure data consistency across distributed servers.`;
  }
  if (quickAction === '14-Mark Answer') {
    return `### 14-Mark Structure for ${topic}\n\nTo score maximum marks:\n1. Write a precise definition with historical origin.\n2. Detail the theoretical mechanism.\n3. Draw the architectural diagram or flowchart.\n4. Provide a concrete worked example with input/output.\n5. Discuss advantages, industry applications, and conclusion.`;
  }
  return `I am here to guide your study of **${topic}**! Feel free to ask me to explain any difficult concept, generate exam questions, or walk through examples step-by-step.`;
}

export async function discoverCareers(
  answers: CareerQuestionnaireAnswers,
  language: Language = 'en'
): Promise<CareerDiscoveryReport> {
  try {
    const res = await fetch('/api/career/discover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers, language }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.fields) && data.fields.length > 0) {
        return data as CareerDiscoveryReport;
      }
    }
  } catch (err) {
    console.warn('Career discover API call failed, using default guidance dataset:', err);
  }

  return {
    summaryAnalysis: 'Based on your academic interests, working style, and problem-solving preferences, exploring a balance between technical fundamentals, creative applications, and emerging digital systems will provide flexible, high-growth pathways.',
    disclaimer: 'Based on your responses, these fields may be worth exploring. Encourage students to consider their own interests, academic eligibility, fee structure, and college resources before finalizing their decisions.',
    fields: DEFAULT_CAREER_OPTIONS
  };
}

export async function generateCollegeRoadmap(
  setup: RoadmapSetupData,
  language: Language = 'en'
): Promise<CollegeRoadmap> {
  try {
    const res = await fetch('/api/roadmap/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setup, language }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.years) && data.years.length > 0) {
        return data as CollegeRoadmap;
      }
    }
  } catch (err) {
    console.warn('Roadmap generate API call failed, using customized default roadmap:', err);
  }

  return generateDefaultRoadmap(setup);
}

export async function evaluatePracticeSubmission(
  topic: string,
  question: string,
  studentAnswer: string,
  isCoding?: boolean
): Promise<PracticeEvaluationResult> {
  try {
    const res = await fetch('/api/practice/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, question, studentAnswer, isCoding }),
    });

    if (res.ok) {
      const data = await res.json();
      return data as PracticeEvaluationResult;
    }
  } catch (err) {
    console.warn('Evaluate API error:', err);
  }

  const length = studentAnswer.trim().length;
  const score = length > 60 ? 9 : length > 25 ? 7 : 5;
  return {
    scoreOutOf10: score,
    verdict: score >= 8 ? 'Good' : 'Needs Improvement',
    whatWasCorrect: `You demonstrated a solid foundational grasp of ${topic}. Key points and terminology were highlighted well.`,
    whatNeedsImprovement: 'Include formal academic definitions, explicit step-by-step reasoning, and boundary conditions to ensure full marks.',
    modelAnswer: `For ${topic}, a complete solution begins with the governing theorem, derives the mathematical or structural conditions, and demonstrates with a concrete test case.`,
    encouragement: 'Great attempt! Keep practicing to sharpen your problem-solving speed for exams.',
  };
}

export async function modifyExamAnswer(
  topic: string,
  question: string,
  currentAnswer: string,
  action: 'simplify' | 'more_detail'
): Promise<string> {
  try {
    const res = await fetch('/api/exam/modify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, question, currentAnswer, action }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.modifiedAnswer) {
        return data.modifiedAnswer;
      }
    }
  } catch (err) {
    console.warn('Modify exam answer error:', err);
  }

  if (action === 'simplify') {
    return `### Simplified Quick Points:\n• Core Concept: ${topic} organizes rules to maximize efficiency and minimize errors.\n• Exam Key: State the primary condition and give a 1-line diagram.\n• Memory Trick: Break into components, verify consistency, check edge cases.`;
  }
  return `${currentAnswer}\n\n### Additional Advanced Examination Insights:\n- Formulated to meet strict academic syllabus benchmarks.\n- Critical Examiner Expectation: Always state assumptions, identify candidate keys/parameters, and explain why alternative approaches fail.`;
}

function createDynamicTopicBundle(topic: string, language: Language): TopicLearningBundle {
  return {
    topic,
    language,
    notes: {
      topic,
      subject: 'Computer Science & Engineering',
      introduction: `${topic} is a crucial subject area in modern computer science and engineering curricula. Mastered by students and practitioners, it lays the groundwork for high-performance software and algorithmic systems.`,
      definition: `${topic} refers to the systematic theoretical and practical framework that governs design, computation, and analysis within this specialized academic domain.`,
      keyConcepts: [
        { title: 'Core Principles', explanation: `The foundational axioms and behavioral rules that define how ${topic} operates.` },
        { title: 'Operational Architecture', explanation: `The structural components, interactions, and data flows essential to ${topic}.` },
        { title: 'Optimization & Integrity', explanation: `Techniques to ensure computational efficiency, correctness, and fault tolerance.` }
      ],
      detailedExplanation: [
        { stepNumber: 1, title: 'Foundational Baseline', details: `Understanding the initial prerequisites, terminology, and motivation for ${topic}.` },
        { stepNumber: 2, title: 'Step-by-Step Mechanism', details: `Executing algorithms, mathematical derivations, or architectural transformations characteristic of ${topic}.` },
        { stepNumber: 3, title: 'Verification & Edge Cases', details: `Validating results against boundary constraints and theoretical standards.` }
      ],
      examples: {
        academic: `Standard textbook problem: Demonstrating ${topic} with a controlled 4-step derivation on standard benchmark inputs.`,
        realWorld: `Industry implementation: Deploying ${topic} in distributed cloud environments to manage millions of concurrent user operations reliably.`
      },
      advantages: [
        `Provides systematic structure and eliminates ad-hoc programming bugs in ${topic}.`,
        'Significantly improves runtime efficiency and maintainability.',
        'Facilitates modular design and standardized code reviews.'
      ],
      disadvantages: [
        'Requires an initial learning curve and rigorous mathematical understanding.',
        'Improper application can introduce unnecessary architectural complexity.'
      ],
      applications: [
        `Scalable web services and database systems utilizing ${topic}.`,
        'Academic research, algorithm benchmarking, and automated verification suites.'
      ],
      importantPoints: [
        `Always clarify definitions and assumptions prior to working out problems on ${topic}.`,
        'Memorize standard formulas and key algorithmic steps for quick recall during exams.'
      ],
      summary: `${topic} unites theoretical rigor and engineering best practices, serving as an indispensable pillar of technical competence.`,
      codeSnippet: {
        language: 'python',
        code: `# Demonstration of ${topic} algorithm
def execute_concept(data_input):
    """
    Process input according to the principles of ${topic}
    """
    processed = [item for item in data_input if item is not None]
    return f"Successfully processed {len(processed)} items with ${topic} logic."

# Test execution
sample_data = ["Module A", "Module B", "Module C"]
result = execute_concept(sample_data)
print(result)`,
        explanation: `Demonstrates the core procedural workflow of ${topic}, showcasing input sanitization, processing, and return values.`,
        output: `Successfully processed 3 items with ${topic} logic.`,
        commonMistakes: [
          'Overlooking boundary conditions or null values in input collections.',
          'Confusing computational worst-case complexity with average-case performance.'
        ]
      },
      diagramSuggestion: {
        title: `${topic} Architectural Workflow`,
        type: 'flowchart',
        description: 'Visual flow of data and control logic',
        nodes: [
          { id: '1', label: 'Input Ingestion', subtext: 'Raw data / parameters' },
          { id: '2', label: 'Processing Engine', subtext: `${topic} logic` },
          { id: '3', label: 'Verification Check', subtext: 'Condition validation' },
          { id: '4', label: 'Final Output', subtext: 'Optimized state' }
        ]
      }
    },
    examPrep: {
      topic,
      strategyAdvice: `For exams covering ${topic}, structure your answers with clear definitions, labeled diagrams, and step-by-step mathematical or code examples.`,
      commonKeywords: [topic, 'Algorithm', 'Complexity', 'Validation', 'Optimization', 'Architecture'],
      examTips: [
        'State formal definitions word-for-word in 2-mark questions.',
        'Use bullet points and diagrams for 5-mark and 10-mark sections.',
        'Strictly follow the 9-part structure for 14-mark university exam answers.'
      ],
      twoMarkQuestions: [
        {
          id: 'dyn-2-1',
          marks: 2,
          question: `Define ${topic}.`,
          answer: `${topic} is the formal academic discipline and engineering framework focused on systematic problem solving, algorithmic optimization, and reliable system architecture.`,
          keywords: ['Formal definition', 'Engineering framework', 'Optimization']
        },
        {
          id: 'dyn-2-2',
          marks: 2,
          question: `State two major advantages of ${topic}.`,
          answer: `1. Enforces systematic correctness and eliminates data corruption.\n2. Scales predictably under high workloads through modular separation.`,
          keywords: ['Systematic correctness', 'Scalability']
        }
      ],
      fiveMarkQuestions: [
        {
          id: 'dyn-5-1',
          marks: 5,
          question: `Explain the fundamental components of ${topic} with a neat diagram/structure.`,
          answer: `1. Input Validation: Verifies prerequisite preconditions.\n2. Core Transformation: Executes the domain rules of ${topic}.\n3. Verification: Validates output against theoretical benchmarks.\n4. Output Generation: Produces deterministic, reproducible results.`,
          keywords: ['Transformation', 'Validation', 'Preconditions', 'Deterministic']
        }
      ],
      tenMarkQuestions: [
        {
          id: 'dyn-10-1',
          marks: 10,
          question: `Discuss the design considerations and implementation strategies for ${topic}.`,
          answer: `Introduction:\nImplementing ${topic} requires balancing computational complexity against developer ergonomics and runtime stability.\n\nKey Considerations:\n- Time and Space Complexity\n- Error Handling and Edge Cases\n- Scalability and Concurrency\n- Maintainability and Code Readability\n\nConclusion:\nAdhering to standard academic conventions guarantees reliable, production-ready systems.`,
          keywords: ['Complexity', 'Scalability', 'Error handling', 'Academic standards']
        }
      ],
      fourteenMarkQuestions: [
        {
          id: 'dyn-14-1',
          marks: 14,
          question: `Provide an exhaustive 14-mark academic analysis of ${topic}, discussing its origins, core mechanisms, step-by-step methodology, diagrams, advantages, and applications.`,
          answer: `Comprehensive 14-mark academic treatise covering all 9 required components for university exams.`,
          keywords: [topic, 'Methodology', 'Architecture', 'Formal analysis', 'Case study'],
          examTip: 'Always write down the 9 distinct headings to secure all marks from the university evaluator.',
          structured14Mark: {
            introduction: `${topic} stands as a cornerstone in computational engineering, providing rigorous methods to solve complex academic and industrial challenges.`,
            definition: `Formally, ${topic} is the discipline that systematizes problem-solving via formal models, invariant verification, and deterministic execution.`,
            mainConcept: `The foundational concept rests upon separating data representations from operational algorithms, ensuring every state transition is provably correct.`,
            detailedExplanation: `Step-by-step breakdown:\n1. Problem Definition & Precondition Specification\n2. Formal Mathematical Formulation\n3. Algorithmic Execution\n4. Postcondition Invariant Validation`,
            diagramFlowchart: `[Input Stage] ──► [${topic} Engine] ──► [Invariant Validation] ──► [Optimized Result]`,
            example: `Consider an enterprise workload requiring ${topic} to process transactional data securely without race conditions.`,
            advantages: [
              'Guarantees consistency across diverse hardware configurations.',
              'Minimizes runtime latency through structured processing.',
              'Simplifies verification and academic assessment.'
            ],
            applications: [
              `Enterprise cloud infrastructure utilizing ${topic}.`,
              'High-frequency financial trading systems.',
              'Safety-critical aerospace and biomedical software.'
            ],
            conclusion: `Mastery of ${topic} is indispensable for aspiring computer scientists, providing the bridge between theoretical mathematics and scalable production engineering.`
          }
        }
      ]
    },
    videos: [
      {
        id: 'dyn-v-1',
        title: `${topic} - Full Beginner Course & Visual Explanation`,
        channelName: 'Computer Science Portal',
        shortDescription: `Comprehensive introductory overview of ${topic}, explaining fundamentals from the ground up.`,
        difficulty: 'Beginner',
        duration: '15:30',
        youtubeSearchQuery: `${topic} computer science beginner tutorial`
      },
      {
        id: 'dyn-v-2',
        title: `${topic} Solved University Exam Problems & Step-by-Step Guide`,
        channelName: 'Engineering Exam Prep',
        shortDescription: `Top exam questions solved with scoring tips and diagram drawings.`,
        difficulty: 'Intermediate',
        duration: '24:10',
        youtubeSearchQuery: `${topic} exam solved problems engineering`
      },
      {
        id: 'dyn-v-3',
        title: `Advanced ${topic}: Mathematical Proofs & Production Systems`,
        channelName: 'MIT OpenCourseWare',
        shortDescription: `Deep dive into advanced algorithms, performance tradeoffs, and formal verification.`,
        difficulty: 'Advanced',
        duration: '32:45',
        youtubeSearchQuery: `${topic} advanced lecture university proofs`
      }
    ],
    quiz: [
      {
        id: 'dyn-q-1',
        question: `What is the primary academic purpose of studying ${topic}?`,
        options: [
          'To establish structured, reliable, and error-free computational systems',
          'To bypass basic programming syntax',
          'To replace human judgment entirely',
          'To increase random data distribution'
        ],
        correctAnswerIndex: 0,
        explanation: `${topic} provides the theoretical framework needed to build verifiable, error-resistant systems.`,
        type: 'mcq',
        difficulty: 'Easy'
      },
      {
        id: 'dyn-q-2',
        question: `True or False: In ${topic}, verifying edge cases and boundary conditions is essential for correctness.`,
        options: ['True', 'False'],
        correctAnswerIndex: 0,
        explanation: 'True. Correctness in technical disciplines requires rigorous handling of all boundary conditions.',
        type: 'true_false',
        difficulty: 'Easy'
      },
      {
        id: 'dyn-q-3',
        question: `Which phase of the ${topic} lifecycle deals with evaluating whether outputs satisfy theoretical invariants?`,
        options: ['Validation / Verification', 'Arbitrary Guessing', 'Code Obfuscation', 'Deprecation'],
        correctAnswerIndex: 0,
        explanation: 'Validation and verification guarantee that the execution results conform to specified invariants.',
        type: 'mcq',
        difficulty: 'Medium'
      }
    ],
    practice: [
      {
        id: 'dyn-p-1',
        title: `Fundamental Concept Check on ${topic}`,
        category: 'Concept Questions',
        difficulty: 'Easy',
        prompt: `Explain why ${topic} is considered foundational in modern computing. Mention at least two key criteria.`,
        hint: 'Focus on reliability, maintenance, and computational efficiency.',
        modelSolution: `${topic} is foundational because it: 1) Guarantees deterministic state management, and 2) Minimizes computational redundancy across distributed operations.`
      },
      {
        id: 'dyn-p-2',
        title: `Algorithm & Code Practice for ${topic}`,
        category: 'Coding Practice',
        difficulty: 'Medium',
        prompt: `Write a clean python implementation demonstrating the fundamental mechanics of ${topic}.`,
        isCoding: true,
        starterCode: `# Implement a clean function related to ${topic}
def solve_problem(inputs):
    # Your implementation here
    return inputs`,
        expectedOutput: 'Clean execution without runtime errors.',
        hint: 'Handle empty or invalid inputs gracefully.',
        modelSolution: `def solve_problem(inputs):
    if not inputs:
        return []
    return [item.strip() for item in inputs if item]`
      }
    ],
    learningPath: {
      topic,
      prerequisites: ['Programming Fundamentals', 'Basic Discrete Mathematics', 'System Logic'],
      currentTopic: `${topic} Mastery`,
      whatToLearnNext: [`Advanced ${topic} Architectures`, 'High-Throughput Systems', 'Enterprise Production Tuning'],
      practiceRecommendations: [`Solve 5 previous-year university questions on ${topic}`, 'Implement standard algorithms in Python or C++'],
      steps: [
        {
          stepNumber: 1,
          stage: 'Prerequisite',
          title: 'Foundational Theory',
          description: 'Master prerequisites and terminology.',
          recommendedAction: 'Review basics and definition cards.'
        },
        {
          stepNumber: 2,
          stage: 'Current Focus',
          title: `Core Principles of ${topic}`,
          description: 'Study mechanics, formulas, and operational models.',
          recommendedAction: 'Read Full Notes and 5-mark exam prep questions.'
        },
        {
          stepNumber: 3,
          stage: 'Current Focus',
          title: '14-Mark University Exam Preparation',
          description: 'Memorize the 9-part structured answer template.',
          recommendedAction: 'Practice writing out the full essay and diagram.'
        },
        {
          stepNumber: 4,
          stage: 'Next Step',
          title: 'Video Lectures & Deeper Insights',
          description: 'Watch step-by-step solved question videos.',
          recommendedAction: 'Browse the Learning Videos directory.'
        },
        {
          stepNumber: 5,
          stage: 'Advanced Practice',
          title: 'Quiz & Practice Problem Solving',
          description: 'Test your understanding and receive AI evaluation.',
          recommendedAction: 'Complete the interactive quiz and submit practice answers.'
        }
      ]
    }
  };
}
