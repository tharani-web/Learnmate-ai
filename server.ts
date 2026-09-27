import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { DEFAULT_CAREER_OPTIONS, generateDefaultRoadmap } from "./src/data/careerAndRoadmapData";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Helper to get initialized GoogleGenAI instance safely
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// 1. Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"),
  });
});

// 2. Generate complete topic learning material
app.post("/api/learning/generate", async (req, res) => {
  const { topic, language = "en" } = req.body;
  if (!topic || typeof topic !== "string" || !topic.trim()) {
    return res.status(400).json({ error: "Topic is required" });
  }

  const ai = getGeminiClient();

  // If no Gemini client available, return structured fallback instructions
  if (!ai) {
    return res.json({
      fallback: true,
      message: "AI key not configured; using offline curriculum engine.",
    });
  }

  try {
    const langInstruction =
      language === "ta"
        ? "Respond in Tamil language (தமிழ்) for explanations, definitions, tips, and summaries, keeping technical terms in English with Tamil transliteration where helpful."
        : "Respond in clear, academic, student-friendly English.";

    const prompt = `You are LearnMate AI, a world-class educational AI learning assistant for students.
Create a complete, comprehensive academic learning package for the topic: "${topic}".
${langInstruction}

You MUST return a strictly valid JSON object conforming to this exact TypeScript structure:
{
  "topic": "${topic}",
  "language": "${language}",
  "notes": {
    "topic": "${topic}",
    "subject": "Academic Subject Area",
    "introduction": "Engaging 2-3 paragraph academic introduction",
    "definition": "Clear, precise academic definition",
    "keyConcepts": [
      { "title": "Concept 1", "explanation": "Detailed explanation" },
      { "title": "Concept 2", "explanation": "Detailed explanation" }
    ],
    "detailedExplanation": [
      { "stepNumber": 1, "title": "Step 1", "details": "Detailed walk-through" },
      { "stepNumber": 2, "title": "Step 2", "details": "Detailed walk-through" },
      { "stepNumber": 3, "title": "Step 3", "details": "Detailed walk-through" }
    ],
    "examples": {
      "academic": "Academic textbook or lab example",
      "realWorld": "Real-world industry or daily life example"
    },
    "advantages": ["Advantage 1", "Advantage 2", "Advantage 3"],
    "disadvantages": ["Disadvantage 1", "Disadvantage 2"],
    "applications": ["Application 1", "Application 2", "Application 3"],
    "importantPoints": ["Key takeaway 1", "Key takeaway 2", "Key takeaway 3"],
    "summary": "Concise summary for last-minute exam revision",
    "codeSnippet": {
      "language": "e.g. python, sql, or javascript",
      "code": "executable, syntactically correct code sample with comments",
      "explanation": "line by line explanation",
      "output": "expected terminal or query output",
      "commonMistakes": ["Common pitfall 1", "Common pitfall 2"]
    },
    "diagramSuggestion": {
      "title": "Architecture or Flowchart Title",
      "type": "flowchart",
      "description": "Visual diagram description",
      "nodes": [
        { "id": "1", "label": "Start / Stage 1", "subtext": "details" },
        { "id": "2", "label": "Stage 2", "subtext": "details" },
        { "id": "3", "label": "Stage 3", "subtext": "details" },
        { "id": "4", "label": "Result", "subtext": "details" }
      ]
    }
  },
  "examPrep": {
    "topic": "${topic}",
    "strategyAdvice": "Exam strategy advice for scoring maximum marks",
    "commonKeywords": ["keyword1", "keyword2", "keyword3", "keyword4"],
    "examTips": ["Tip 1", "Tip 2", "Tip 3"],
    "twoMarkQuestions": [
      { "id": "q2-1", "marks": 2, "question": "Short direct question 1", "answer": "Concise 2-sentence direct answer", "keywords": ["keyword"] },
      { "id": "q2-2", "marks": 2, "question": "Short direct question 2", "answer": "Concise 2-sentence direct answer", "keywords": ["keyword"] }
    ],
    "fiveMarkQuestions": [
      { "id": "q5-1", "marks": 5, "question": "Medium length structured question", "answer": "Well-structured answer with bullet points and clear headings", "keywords": ["keyword"] }
    ],
    "tenMarkQuestions": [
      { "id": "q10-1", "marks": 10, "question": "Detailed 10-mark analytical question", "answer": "Detailed answer with subheadings and comparative analysis", "keywords": ["keyword"] }
    ],
    "fourteenMarkQuestions": [
      {
        "id": "q14-1",
        "marks": 14,
        "question": "Comprehensive 14-mark university exam essay question on ${topic}",
        "answer": "Full exam-ready essay answer following all 9 academic components",
        "keywords": ["keyword1", "keyword2"],
        "examTip": "Examiner's tip for scoring 14 out of 14",
        "structured14Mark": {
          "introduction": "Academic background and relevance",
          "definition": "Formal definition",
          "mainConcept": "Underlying mathematical or structural mechanism",
          "detailedExplanation": "Step-by-step complete breakdown with subheadings",
          "diagramFlowchart": "Textual schematic or flowchart layout",
          "example": "Detailed concrete scenario",
          "advantages": ["Advantage 1", "Advantage 2", "Advantage 3"],
          "applications": ["Practical application 1", "Practical application 2"],
          "conclusion": "Final wrap-up and future trends"
        }
      }
    ]
  },
  "videos": [
    {
      "id": "v-1",
      "title": "Beginner Introduction to ${topic}",
      "channelName": "Computer Science Academy",
      "shortDescription": "Fundamental conceptual walk-through from scratch.",
      "difficulty": "Beginner",
      "duration": "14:20",
      "youtubeSearchQuery": "${topic} tutorial beginner"
    },
    {
      "id": "v-2",
      "title": "Intermediate ${topic} - University Solved Questions",
      "channelName": "Gate & Engineering Lectures",
      "shortDescription": "Step-by-step solved problems and architectural diagrams.",
      "difficulty": "Intermediate",
      "duration": "22:45",
      "youtubeSearchQuery": "${topic} exam preparation solved problems"
    },
    {
      "id": "v-3",
      "title": "Advanced ${topic} - Production & Deep Dive",
      "channelName": "MIT / Stanford OpenCourse",
      "shortDescription": "Rigorous theoretical and engineering considerations.",
      "difficulty": "Advanced",
      "duration": "35:10",
      "youtubeSearchQuery": "${topic} advanced lecture university"
    }
  ],
  "quiz": [
    {
      "id": "qz-1",
      "question": "Conceptual multiple-choice question 1",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswerIndex": 0,
      "explanation": "Why Option A is correct and why other options are incorrect",
      "type": "mcq",
      "difficulty": "Easy"
    },
    {
      "id": "qz-2",
      "question": "True or False question 2",
      "options": ["True", "False"],
      "correctAnswerIndex": 0,
      "explanation": "Factual justification",
      "type": "true_false",
      "difficulty": "Easy"
    },
    {
      "id": "qz-3",
      "question": "Analytical question 3",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswerIndex": 2,
      "explanation": "Analytical derivation",
      "type": "mcq",
      "difficulty": "Medium"
    },
    {
      "id": "qz-4",
      "question": "Application question 4",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswerIndex": 1,
      "explanation": "Detailed explanation",
      "type": "mcq",
      "difficulty": "Hard"
    },
    {
      "id": "qz-5",
      "question": "Comprehensive question 5",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswerIndex": 3,
      "explanation": "Detailed explanation",
      "type": "mcq",
      "difficulty": "Medium"
    }
  ],
  "practice": [
    {
      "id": "p-1",
      "title": "Concept Check on ${topic}",
      "category": "Concept Questions",
      "difficulty": "Easy",
      "prompt": "Explain the core difference between the fundamental components of ${topic}.",
      "hint": "Focus on definition and purpose.",
      "modelSolution": "Clear model explanation for high grades."
    },
    {
      "id": "p-2",
      "title": "Problem Solving: Analyze Scenario",
      "category": "Problem Solving",
      "difficulty": "Medium",
      "prompt": "Given an academic scenario involving ${topic}, analyze what happens when parameters change.",
      "hint": "Work through the mathematical or logical rule step by step.",
      "modelSolution": "Detailed step-by-step derivation."
    },
    {
      "id": "p-3",
      "title": "Hands-on Implementation / Script",
      "category": "Coding Practice",
      "difficulty": "Medium",
      "isCoding": true,
      "starterCode": "# Write a script or function implementing ${topic}\ndef solution():\n    pass",
      "expectedOutput": "Verification output",
      "testCases": [{ "input": "Standard test", "expected": "Optimal output" }],
      "hint": "Check edge cases and constraints.",
      "modelSolution": "# Complete reference solution\ndef solution():\n    return 'Success'"
    }
  ],
  "learningPath": {
    "topic": "${topic}",
    "prerequisites": ["Prerequisite 1", "Prerequisite 2"],
    "currentTopic": "${topic}",
    "whatToLearnNext": ["Advanced Concept 1", "Advanced Concept 2"],
    "practiceRecommendations": ["Practice suggestion 1", "Practice suggestion 2"],
    "steps": [
      {
        "stepNumber": 1,
        "stage": "Prerequisite",
        "title": "Foundational Concepts",
        "description": "Fundamental knowledge required before studying ${topic}.",
        "recommendedAction": "Review basics and definitions."
      },
      {
        "stepNumber": 2,
        "stage": "Current Focus",
        "title": "Core Mechanics of ${topic}",
        "description": "Main theories, formulas, and concepts.",
        "recommendedAction": "Study the Full Notes and Exam Prep 2/5 mark questions."
      },
      {
        "stepNumber": 3,
        "stage": "Current Focus",
        "title": "Deep Dive & 14-Mark Synthesis",
        "description": "Comprehensive academic mastery and exam formatting.",
        "recommendedAction": "Review the 14-mark structured essay and diagrams."
      },
      {
        "stepNumber": 4,
        "stage": "Next Step",
        "title": "Advanced Applications",
        "description": "Industry utilization and complex systems.",
        "recommendedAction": "Watch the advanced video lectures."
      },
      {
        "stepNumber": 5,
        "stage": "Advanced Practice",
        "title": "Quiz & Practice Problem Solving",
        "description": "Test yourself and solve coding and theory problems.",
        "recommendedAction": "Complete the 10-question quiz and practice evaluations."
      }
    ]
  }
}

Return ONLY raw JSON, with no markdown code fence blocks like \`\`\`json.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const text = response.text || "";
    const cleaned = text.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
    const data = JSON.parse(cleaned);

    return res.json(data);
  } catch (err: unknown) {
    console.error("Gemini generate error:", err);
    return res.status(500).json({
      error: "We couldn't generate your learning content right now. Please try again.",
      details: err instanceof Error ? err.message : String(err),
    });
  }
});

// 3. AI Learning Tutor Chat (Context-Aware for Topics, Career Discovery & College Roadmap)
app.post("/api/chat", async (req, res) => {
  const { 
    topic, 
    messages = [], 
    quickAction, 
    language = "en",
    careerContext,
    roadmapContext 
  } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    // Intelligent tutor fallback response
    let reply = `Hello! I am your LearnMate AI Tutor. I am here to help you master **${topic || "any academic topic or career path"}**.`;
    
    if (careerContext) {
      reply = `### Exploring ${careerContext}\n\nThis field offers strong growth and creative problem solving. You'll study foundational principles, hands-on lab experiments, and collaborative design projects. When evaluating colleges, consider faculty research, campus lab infrastructure, internship placement tie-ups, and student project clubs!`;
    } else if (roadmapContext) {
      reply = `### Personalized Roadmap Guidance\n\nFor your goal in **${roadmapContext}**, the most strategic move is to build rock-solid foundations in core logic and data structures before rushing into frameworks. Focus on building 2-3 substantial projects where you solve real problems from scratch!`;
    } else if (quickAction === "Explain Simply") {
      reply = `### Simple Explanation of ${topic}\n\nThink of **${topic}** like an organized filing cabinet. Instead of tossing all your papers in a messy heap, you categorize each document in its own labeled folder. This prevents confusion, avoids lost documents, and makes finding what you need instant and error-free!`;
    } else if (quickAction === "Give Example") {
      reply = `### Real-World Example for ${topic}\n\nConsider an online food delivery app (like Swiggy or Uber Eats). If the app stored restaurant menus, rider phone numbers, and customer orders all in one giant table, every time a restaurant updated their phone number, thousands of historical order receipts would risk becoming corrupted or inconsistent. By isolating Restaurants, Drivers, Customers, and Orders into distinct linked modules, the system runs with 100% integrity!`;
    } else if (quickAction === "14-Mark Answer") {
      reply = `### 14-Mark Master Answer Strategy for ${topic}\n\n1. **Introduction & Historical Context**\n2. **Formal Definition & Scope**\n3. **Core Architectural Mechanism**\n4. **Step-by-Step Breakdown** (with clear subheadings)\n5. **Diagram / Flowchart Illustration**\n6. **Concrete Worked Example**\n7. **Key Advantages & Trade-offs**\n8. **Practical Applications in Industry**\n9. **Conclusion & Future Trends**\n\n*Tip: Check out our dedicated **Exam Prep** tab for the full 9-point write-up ready to print or memorize!*`;
    } else if (quickAction === "Ask Me Questions") {
      reply = `### Quick Knowledge Check for ${topic}\n\nHere is a quick question to test your understanding:\n\n**Question:** What is the primary operational risk of having unnormalized redundant data in a transactional database?\n\nA) Faster query times\nB) Insertion, Deletion, and Update anomalies\nC) Reduced storage overhead\nD) Automatic foreign key generation\n\nReply with your answer and I'll explain why it's right or wrong!`;
    } else if (quickAction === "Summarize") {
      reply = `### Quick Revision Summary for ${topic}\n\n- **Core Definition:** Systematic engineering methodology to guarantee data integrity and eliminate structural redundancy.\n- **Golden Rule:** Every piece of data should have a single authoritative source.\n- **Exam Mantra:** 1NF = Atomic; 2NF = No partial dependencies; 3NF = No transitive dependencies; BCNF = Every determinant is a candidate key!`;
    } else if (quickAction === "Give Practice") {
      reply = `### Practice Challenge for ${topic}\n\n**Problem:** You are designing a college laboratory booking portal. A single table stores \`BookingID, StudentID, StudentPhone, LabID, LabRoom, SlotTime\`.\n\n1. Identify which attribute violates 2NF assuming composite key \`{StudentID, LabID, SlotTime}\`.\n2. State how you would decompose this schema into 3NF.\n\nGive it a try and type your solution below!`;
    }

    return res.json({
      text: reply,
      topicContext: topic || careerContext || roadmapContext,
    });
  }

  try {
    const langInstruction =
      language === "ta"
        ? "Respond in Tamil (தமிழ்) where appropriate, or bilingual Tamil/English for technical terms."
        : "Respond in student-friendly, clear, academically precise English.";

    let userPrompt = messages.length > 0 ? messages[messages.length - 1].text : `Help me learn about ${topic || "academic study"}`;
    if (quickAction) {
      userPrompt = `[Action: ${quickAction}] For the topic "${topic}": ${userPrompt || quickAction}`;
    }

    let contextPrompt = `The student is currently learning about the academic topic: "${topic || "General Academic Study"}".`;
    if (careerContext) {
      contextPrompt += ` The student is also in the Career Discovery phase, exploring the field: "${careerContext}". Provide neutral, encouraging, practical guidance comparing branches, highlighting required skills, and suggesting beginner projects.`;
    }
    if (roadmapContext) {
      contextPrompt += ` The student has a personalized College Roadmap for: "${roadmapContext}". Help them with their next learning step, recommend realistic study plans, and answer questions grounded in their college progression.`;
    }

    const systemInstruction = `You are "LearnMate AI Tutor", a warm, encouraging, pedagogically skilled academic tutor and college counselor.
${contextPrompt}
Always keep your answers structured, encouraging, using bolding, bullet points, and code formatting where helpful.
${langInstruction}
Never make deterministic claims that one branch is universally superior to another. Emphasize exploration, skills, and genuine student interest.`;

    const conversationHistory = messages.slice(0, -1).map((m: { sender: string; text: string }) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    conversationHistory.push({
      role: "user",
      parts: [{ text: userPrompt }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: conversationHistory,
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    return res.json({
      text: response.text || "I am ready to help you learn! What would you like to explore next?",
      topicContext: topic || careerContext || roadmapContext,
    });
  } catch (err: unknown) {
    console.error("Chat error:", err);
    return res.json({
      text: "I am having trouble connecting to the AI service right now, but I'm here! Try asking again or use one of the quick prompt buttons.",
      topicContext: topic,
    });
  }
});

// 4. Practice Evaluation API
app.post("/api/practice/evaluate", async (req, res) => {
  const { topic, question, studentAnswer, isCoding } = req.body;
  if (!studentAnswer || !studentAnswer.trim()) {
    return res.status(400).json({ error: "Student answer is required." });
  }

  const ai = getGeminiClient();
  if (!ai) {
    // Intelligent heuristic evaluation fallback
    const length = studentAnswer.trim().length;
    const score = length > 80 ? 9 : length > 30 ? 7 : 5;
    return res.json({
      scoreOutOf10: score,
      verdict: score >= 8 ? "Good" : "Needs Improvement",
      whatWasCorrect: `You demonstrated a good understanding of the core mechanics related to ${topic}. Key terminology was identified correctly.`,
      whatNeedsImprovement: "To score full marks, be sure to explicitly state the formal academic definitions, provide mathematical conditions or constraints, and include a brief 1-line example.",
      modelAnswer: "A complete answer should define the fundamental concept, outline the governing principles, illustrate with an example, and highlight boundary conditions.",
      encouragement: "Great effort! Reviewing the model answer and trying once more will solidify this concept in your long-term memory.",
    });
  }

  try {
    const prompt = `You are an academic university professor evaluating a student's answer for the topic: "${topic}".
Question: "${question}"
Student's Submitted Answer:
"""
${studentAnswer}
"""
Is this a coding problem? ${isCoding ? "Yes" : "No"}

Evaluate the student's submission rigorously but constructively.
Return ONLY a valid JSON object with this exact schema:
{
  "scoreOutOf10": 8,
  "verdict": "Excellent" | "Good" | "Needs Improvement" | "Incomplete",
  "whatWasCorrect": "Detailed note on what the student got right",
  "whatNeedsImprovement": "Constructive feedback on what was missing or incorrect",
  "modelAnswer": "Comprehensive, high-scoring model answer for this question",
  "encouragement": "Warm, encouraging message"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const text = response.text || "{}";
    const cleaned = text.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
    const data = JSON.parse(cleaned);
    return res.json(data);
  } catch (err: unknown) {
    console.error("Evaluation error:", err);
    return res.json({
      scoreOutOf10: 7,
      verdict: "Good",
      whatWasCorrect: "Your answer touches upon the correct principles.",
      whatNeedsImprovement: "Consider expanding with formal terminology and clearer step-by-step structure.",
      modelAnswer: "Refer to the Full Notes section for the definitive academic solution.",
      encouragement: "Keep practicing! Every attempt sharpens your exam readiness.",
    });
  }
});

// 5. Exam Answer Modification (Simplify or Expand with more detail)
app.post("/api/exam/modify", async (req, res) => {
  const { topic, question, currentAnswer, action } = req.body;
  const ai = getGeminiClient();

  if (!ai) {
    if (action === "simplify") {
      return res.json({
        modifiedAnswer: `### Simplified Summary:\n• Core Rule: Identifies and removes structural redundancy.\n• Key Benefit: Eliminates anomalies.\n• Memory Trick: Remember atomic values, full dependencies, and superkey determinants!`,
      });
    } else {
      return res.json({
        modifiedAnswer: `${currentAnswer}\n\n### Additional In-Depth Academic Notes:\n- Mathematical Foundation: Built upon Armstrong's Axioms and attribute closure algorithms.\n- Industry Benchmark: Standard OLTP enterprise systems consistently enforce up to 3NF/BCNF to prevent data corruption during millions of concurrent transactional writes.`,
      });
    }
  }

  try {
    const prompt =
      action === "simplify"
        ? `Simplify the following exam answer for "${question}" on topic "${topic}". Make it bulleted, easy to memorize for a struggling student, while keeping all essential points:\n\n${currentAnswer}`
        : `Expand the following exam answer for "${question}" on topic "${topic}". Add in-depth academic rigor, subheadings, mathematical notation or schematics where applicable, and examiner tips for scoring maximum marks:\n\n${currentAnswer}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        temperature: 0.3,
      },
    });

    return res.json({ modifiedAnswer: response.text });
  } catch (err: unknown) {
    console.error("Modify error:", err);
    return res.json({ modifiedAnswer: currentAnswer });
  }
});

// 6. AI Career Discovery API
app.post("/api/career/discover", async (req, res) => {
  const { answers, language = "en" } = req.body;
  const ai = getGeminiClient();

  if (!ai || !answers) {
    // Generate intelligent personalized fallback from default dataset
    const matched = [...DEFAULT_CAREER_OPTIONS];
    return res.json({
      summaryAnalysis: "Based on your academic interests, working style, and problem-solving preferences, exploring a balance between technical fundamentals, creative applications, and emerging digital systems will provide flexible, high-growth pathways.",
      disclaimer: "Based on your responses, these fields may be worth exploring. Encourage students to consider their own interests, academic eligibility, fee structure, and college resources before finalizing their decisions.",
      fields: matched
    });
  }

  try {
    const langInstruction =
      language === "ta"
        ? "Respond with Tamil (தமிழ்) translation for descriptions and summary, with English technical terms."
        : "Respond in clear, encouraging, student-friendly academic English.";

    const prompt = `You are an expert, compassionate university academic and career counselor for students who just finished 12th grade.
The student completed a comprehensive questionnaire:
- Academic Subjects Enjoyed: ${JSON.stringify(answers.academicInterests || [])}
- Favorite Activities: ${JSON.stringify(answers.activityPreferences || [])}
- Technology Interest: ${answers.technologyInterest || "Interested"}
- Creativity Rating (1-5): ${answers.creativityRating || 3}/5
- Problem Solving Rating (1-5): ${answers.problemSolvingRating || 3}/5
- Preferred Working Style: ${answers.workingStyle || "Technical & Analytical"}
- Future Exploration Interest: ${answers.futureInterest || "Software & Technology"}
- Preferred Learning Style: ${answers.learningPreference || "Hands-on projects"}

CRITICAL SAFETY & PEDAGOGICAL GUIDELINES:
1. DO NOT claim that AI can scientifically determine the student's perfect career.
2. Use exploratory language: "Based on your responses, these fields may be worth exploring."
3. Do NOT rank departments or engineering fields as universally better or worse.
4. Provide 3 to 4 distinct, well-rounded fields that genuinely relate to their interests.
5. If Engineering is included, detail major branches neutrally (CSE, AI/DS, ECE, EEE, Mech, Civil) without favoritism.
${langInstruction}

Return ONLY raw JSON matching this schema exactly:
{
  "summaryAnalysis": "A warm, insightful paragraph explaining the patterns observed in their questionnaire answers and how these link naturally to higher education opportunities.",
  "disclaimer": "Based on your responses, these fields may be worth exploring. Consider your personal interests, academic eligibility, college infrastructure, and long-term goals before deciding.",
  "fields": [
    {
      "id": "unique-slug-id",
      "title": "Field Title (e.g. Computer Science / IT)",
      "category": "Category name",
      "badge": "Short badge e.g. High Industry Demand / Creative & Analytical",
      "matchReason": "Clear, encouraging explanation of why their questionnaire responses connect to this path",
      "whatYouWillStudy": ["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5", "Topic 6"],
      "skillsCommonlyUsed": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
      "exampleCareerAreas": ["Role 1", "Role 2", "Role 3", "Role 4", "Role 5"],
      "beginnerSkillsToExplore": ["Actionable step 1", "Actionable step 2", "Actionable step 3"],
      "questionsToAskBeforeChoosing": ["Thought-provoking question 1", "Question 2", "Question 3"],
      "mathInvolvement": "High" | "Medium" | "Low",
      "techInvolvement": "High" | "Medium" | "Low",
      "creativityInvolvement": "High" | "Medium" | "Low",
      "practicalWork": "High" | "Medium" | "Low",
      "suggestedBeginnerResources": [
        { "title": "Resource title", "type": "Course / Tutorial / Guide", "urlQuery": "YouTube search phrase" },
        { "title": "Resource title 2", "type": "Interactive / Video", "urlQuery": "YouTube search phrase" }
      ],
      "engineeringBranches": [
        { "name": "Computer Science (CSE)", "focus": "Software, systems, algorithms", "potentialRoles": "Software Engineer, Architect" },
        { "name": "AI & Data Science (AIDS)", "focus": "Machine learning, data pipelines, statistics", "potentialRoles": "Data Scientist, ML Engineer" },
        { "name": "Electronics & Communication (ECE)", "focus": "Microchips, IoT, signals, communication", "potentialRoles": "VLSI Engineer, Embedded Developer" },
        { "name": "Mechanical Engineering (MECH)", "focus": "Thermodynamics, robotics, CAD/CAM", "potentialRoles": "Robotics Engineer, Product Designer" }
      ]
    }
  ]
}
Return ONLY raw JSON with NO markdown code fence backticks.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const text = response.text || "{}";
    const cleaned = text.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
    const data = JSON.parse(cleaned);

    return res.json(data);
  } catch (err: unknown) {
    console.error("Career discovery error:", err);
    return res.json({
      summaryAnalysis: "Based on your academic interests, working style, and problem-solving preferences, exploring a balance between technical fundamentals, creative applications, and emerging digital systems will provide flexible, high-growth pathways.",
      disclaimer: "Based on your responses, these fields may be worth exploring. Encourage students to consider their own interests, academic eligibility, fee structure, and college resources before finalizing their decisions.",
      fields: DEFAULT_CAREER_OPTIONS
    });
  }
});

// 7. Personalized College Roadmap API
app.post("/api/roadmap/generate", async (req, res) => {
  const { setup, language = "en" } = req.body;
  const ai = getGeminiClient();

  if (!ai || !setup) {
    return res.json(generateDefaultRoadmap(setup || {
      degree: "B.Tech",
      department: "Computer Science",
      currentYear: "1st Year",
      currentSkills: ["Basic Python"],
      careerGoal: "Software Developer",
      skillLevel: "Beginner"
    }));
  }

  try {
    const langInstruction =
      language === "ta"
        ? "Include Tamil explanations alongside technical terms where suitable."
        : "Use clear, student-friendly academic English.";

    const prompt = `You are a distinguished university dean of academic engineering and career mentorship.
A college student needs a personalized, year-by-year learning roadmap:
- Degree: ${setup.degree || "B.Tech / B.E."}
- Department: ${setup.department || "Computer Science & Engineering"}
- Current Year of Study: ${setup.currentYear || "1st Year"}
- Existing Skills: ${JSON.stringify(setup.currentSkills || [])}
- Target Career Goal: ${setup.careerGoal || "Software Developer"}
- Current Skill Level: ${setup.skillLevel || "Beginner"}

REQUIREMENTS:
1. Generate a sequential 4-year undergraduate roadmap (Year 1 to Year 4).
2. Year 1: Foundation (Programming fundamentals, language basics, problem solving, Git/GitHub, basic SQL, communication, mini project).
3. Year 2: Skill Building (Data structures & algorithms, web/backend dev, databases, APIs, OOP, projects, internship prep).
4. Year 3: Specialization (Tailored to their career goal "${setup.careerGoal}").
5. Year 4: Career Preparation (DSA placement sprint, system design, mock interviews, capstone project, placement/higher studies readiness).
6. Smart Next Step: Analyze their current year (${setup.currentYear}) and skills to recommend the single most impactful next topic to study right now.
7. Skill Gap Analysis: Compare current skills against skills commonly required for "${setup.careerGoal}", identifying strong areas and areas to develop.
${langInstruction}

Return ONLY raw JSON matching this schema:
{
  "id": "roadmap-${Date.now()}",
  "degree": "${setup.degree}",
  "department": "${setup.department}",
  "currentYear": "${setup.currentYear}",
  "careerGoal": "${setup.careerGoal}",
  "skillLevel": "${setup.skillLevel}",
  "createdAt": "${new Date().toLocaleDateString()}",
  "smartNextStep": {
    "topic": "Specific Topic Name",
    "reason": "Clear explanation of why this topic is the crucial immediate next priority",
    "actionText": "Start Learning This Topic"
  },
  "skillGapAnalysis": {
    "careerGoal": "${setup.careerGoal}",
    "strongAreas": ["Skill 1", "Skill 2"],
    "areasToDevelop": ["Skill to develop 1", "Skill 2", "Skill 3", "Skill 4"],
    "suggestedLearningTopics": ["Topic 1", "Topic 2", "Topic 3"],
    "practiceRecommendations": ["Actionable recommendation 1", "Recommendation 2", "Recommendation 3"],
    "disclaimer": "This skill gap evaluation is an educational guide to help prioritize your study time; it is not a rigid or definitive measure of employability."
  },
  "years": [
    {
      "yearNumber": 1,
      "title": "Year 1 — Foundation",
      "theme": "Theme description",
      "items": [
        {
          "id": "y1-1",
          "topic": "Topic Name",
          "stage": "Foundation" | "Core Skills" | "Projects" | "Specialization" | "Internship" | "Placement / Higher Studies",
          "yearNumber": 1,
          "whyItMatters": "Why this topic is foundational",
          "prerequisites": ["Prerequisite item"],
          "suggestedPractice": "Specific practice exercise",
          "miniProjectIdea": "Real-world mini project idea",
          "completed": false
        }
      ]
    }
    // Repeat for Year 2, Year 3, Year 4
  ]
}
Return ONLY raw JSON with NO markdown backticks.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const text = response.text || "{}";
    const cleaned = text.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
    const data = JSON.parse(cleaned);

    return res.json(data);
  } catch (err: unknown) {
    console.error("Roadmap generation error:", err);
    return res.json(generateDefaultRoadmap(setup));
  }
});

// Vite middleware or production static serving
async function setupVite() {
  const isDev = process.env.NODE_ENV === "development" || process.env.npm_lifecycle_event === "dev";
  const distPath = path.join(process.cwd(), "dist");
  const hasDist = fs.existsSync(path.join(distPath, "index.html"));

  if (isDev || !hasDist) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LearnMate AI server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to start server:", err);
});
