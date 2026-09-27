import { TopicLearningBundle } from '../types';

export const DBMS_NORMALIZATION_BUNDLE: TopicLearningBundle = {
  topic: 'DBMS Normalization',
  language: 'en',
  notes: {
    topic: 'DBMS Normalization',
    subject: 'Database Management Systems',
    introduction: 'Normalization is a systematic technique of organizing data in a relational database to reduce redundancy and improve data integrity. It decomposes tables with redundant information into smaller, well-structured tables linked by relationships.',
    definition: 'Normalization is the formal process of decomposing complex relational schemas into smaller, higher-normal-form relations according to a series of normal forms (1NF, 2NF, 3NF, BCNF) to eliminate insertion, update, and deletion anomalies while ensuring lossless join and dependency preservation.',
    keyConcepts: [
      {
        title: 'Data Redundancy',
        explanation: 'Unnecessary repetition of data across multiple rows, leading to bloated storage and increased risk of inconsistencies.'
      },
      {
        title: 'Database Anomalies',
        explanation: 'Undesirable side-effects when modifying tables: Insertion Anomaly (cannot insert without missing keys), Deletion Anomaly (deleting one item inadvertently deletes other facts), and Update Anomaly (modifying data requires updating multiple redundant rows).'
      },
      {
        title: 'Functional Dependency (FD)',
        explanation: 'A relationship between attributes: X → Y indicates that attribute X uniquely determines the value of attribute Y.'
      },
      {
        title: 'Lossless Decomposition',
        explanation: 'Splitting a table such that when a natural join is performed on the decomposed tables, no spurious or missing tuples are produced.'
      }
    ],
    detailedExplanation: [
      {
        stepNumber: 1,
        title: 'First Normal Form (1NF) - Atomicity',
        details: 'Each column must contain only atomic (indivisible) values. No repeating groups, arrays, or comma-separated lists inside a single attribute. A primary key must uniquely identify each record.'
      },
      {
        stepNumber: 2,
        title: 'Second Normal Form (2NF) - No Partial Dependency',
        details: 'The table must be in 1NF, and every non-prime attribute must be fully functionally dependent on the entire primary key. Partial dependencies (where an attribute depends on only part of a composite primary key) are removed by splitting into separate tables.'
      },
      {
        stepNumber: 3,
        title: 'Third Normal Form (3NF) - No Transitive Dependency',
        details: 'The table must be in 2NF, and no non-prime attribute should transitively depend on the primary key (X → Y and Y → Z where Z is non-prime). Formally, for any FD X → A, either X is a superkey or A is a prime attribute.'
      },
      {
        stepNumber: 4,
        title: 'Boyce-Codd Normal Form (BCNF) - Strict Determinant Rule',
        details: 'A stricter version of 3NF. For every non-trivial functional dependency X → A, X MUST be a candidate/super key. BCNF resolves anomalies arising when multiple overlapping candidate keys exist.'
      }
    ],
    examples: {
      academic: 'Student_Course_Enrollment(StudentID, CourseID, StudentName, Instructor, Room). StudentID determines StudentName (Partial dependency on composite key {StudentID, CourseID}). Normalized into Student(StudentID, StudentName) and Enrollment(StudentID, CourseID, Instructor, Room).',
      realWorld: 'An e-commerce order table storing CustomerAddress and CustomerPhone redundantly for every order. If the customer changes their phone number, an update anomaly occurs if some order records are missed. Normalizing splits Customers from Orders.'
    },
    advantages: [
      'Eliminates data redundancy and reduces disk storage overhead.',
      'Prevents insertion, update, and deletion anomalies.',
      'Enforces data consistency across concurrent transactions.',
      'Simplifies database maintenance and schema evolution.'
    ],
    disadvantages: [
      'Requires SQL JOIN operations across multiple tables, which can reduce read/query speed.',
      'Slightly higher query complexity for reporting and analytical dashboards.',
      'Over-normalization can lead to excessive table fragmentation.'
    ],
    applications: [
      'OLTP (Online Transaction Processing) systems: Banking, ERP, CRM, and inventory management where write consistency is critical.',
      'Academic student record management and university examination portals.'
    ],
    importantPoints: [
      'Remember: 1NF = Atomic values; 2NF = 1NF + No partial dependencies; 3NF = 2NF + No transitive dependencies; BCNF = Every determinant is a candidate key.',
      'Lossless-join property is MANDATORY; Dependency preservation is desirable (3NF guarantees both, BCNF guarantees lossless-join but may sacrifice dependency preservation).'
    ],
    summary: 'Normalization cleanses relational schemas step-by-step from 1NF to BCNF, balancing data consistency and redundancy elimination.',
    codeSnippet: {
      language: 'sql',
      code: `-- Unnormalized Table with 1NF & 2NF violation
-- Violates 2NF: StudentName depends only on StudentID, not composite key (StudentID, CourseID)

-- 1. Create Student Table (2NF & 3NF compliant)
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    StudentName VARCHAR(100) NOT NULL,
    Department VARCHAR(50)
);

-- 2. Create Courses Table
CREATE TABLE Courses (
    CourseID VARCHAR(10) PRIMARY KEY,
    CourseTitle VARCHAR(100) NOT NULL,
    Credits INT CHECK (Credits > 0)
);

-- 3. Create Enrollment Table (Relational Junction)
CREATE TABLE Enrollments (
    StudentID INT,
    CourseID VARCHAR(10),
    Semester VARCHAR(15),
    Grade CHAR(2),
    PRIMARY KEY (StudentID, CourseID),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);`,
      explanation: 'Decomposing the unnormalized relation into Students, Courses, and Enrollments removes partial dependency, satisfying 2NF and 3NF.',
      output: 'Tables created successfully with foreign key constraints enforcing referential integrity.',
      commonMistakes: [
        'Confusing 2NF with 3NF: 2NF only applies when candidate keys are COMPOSITE.',
        'Assuming normalization always improves query performance (it improves write integrity, but joins can slow reads).'
      ]
    },
    diagramSuggestion: {
      title: 'Normalization Hierarchy (1NF → 2NF → 3NF → BCNF)',
      type: 'flowchart',
      description: 'Progressive levels of data integrity enforcement',
      nodes: [
        { id: '1', label: 'Unnormalized Data', subtext: 'Repeating groups & non-atomic values' },
        { id: '2', label: '1NF', subtext: 'Atomic values + primary key defined' },
        { id: '3', label: '2NF', subtext: 'Remove partial dependencies on composite keys' },
        { id: '4', label: '3NF', subtext: 'Remove transitive dependencies (non-prime to non-prime)' },
        { id: '5', label: 'BCNF', subtext: 'Every determinant is a super key' }
      ]
    }
  },
  examPrep: {
    topic: 'DBMS Normalization',
    strategyAdvice: 'In university and college exams, questions on normalization are very frequent. Always provide the formal definition, state the functional dependency conditions mathematically, draw a clear table example showing Before and After, and mention the anomaly resolved.',
    commonKeywords: ['Atomic values', 'Functional Dependency', 'Candidate Key', 'Partial Dependency', 'Transitive Dependency', 'BCNF Determinant', 'Lossless Join', 'Decomposition'],
    examTips: [
      'For 2-mark questions: Give a precise 2-sentence definition and one bullet condition.',
      'For 5-mark questions: Explain the specific normal form with an example table.',
      'For 14-mark questions: Follow the standard 9-part structure with introduction, definitions, all 4 normal forms, examples, diagrams, advantages, and conclusion.'
    ],
    twoMarkQuestions: [
      {
        id: 'q2-1',
        marks: 2,
        question: 'What is Normalization in DBMS?',
        answer: 'Normalization is a systematic process of organizing data in a relational database to minimize data redundancy and eliminate anomalies (insertion, deletion, and update), ensuring data consistency through decomposed relations.',
        keywords: ['Systematic process', 'Reduce redundancy', 'Eliminate anomalies', 'Data consistency']
      },
      {
        id: 'q2-2',
        marks: 2,
        question: 'Define First Normal Form (1NF).',
        answer: 'A relation is in 1NF if and only if all domain values are atomic (indivisible) and there are no repeating groups or multivalued attributes within any tuple.',
        keywords: ['Atomic values', 'No repeating groups', 'Indivisible domains']
      },
      {
        id: 'q2-3',
        marks: 2,
        question: 'What is a Transitive Dependency?',
        answer: 'A transitive dependency occurs in a relation when a non-prime attribute is functionally dependent on another non-prime attribute via the primary key (i.e., X → Y and Y → Z where Z is non-prime and Y is not a candidate key).',
        keywords: ['Non-prime attribute', 'Indirect dependency', 'X → Y and Y → Z']
      }
    ],
    fiveMarkQuestions: [
      {
        id: 'q5-1',
        marks: 5,
        question: 'Explain Second Normal Form (2NF) with an illustrative example.',
        answer: `Definition: A relation is in 2NF if:
1. It is already in 1NF.
2. No non-prime attribute is partially dependent on any candidate key (full functional dependency).

Example:
Consider relation R(StudentID, CourseID, StudentName, CourseFee).
Candidate Key: {StudentID, CourseID}.
Dependencies:
- {StudentID, CourseID} → CourseFee (Full)
- StudentID → StudentName (Partial Dependency - depends only on StudentID).

Anomaly: Redundant storage of StudentName for every course enrolled.
Solution: Decompose R into:
- R1(StudentID, StudentName) - Key: StudentID
- R2(StudentID, CourseID, CourseFee) - Key: {StudentID, CourseID}.
Both relations are now in 2NF.`,
        keywords: ['Full functional dependency', 'Composite primary key', 'Partial dependency removal', 'Decomposition']
      },
      {
        id: 'q5-2',
        marks: 5,
        question: 'Differentiate between 3NF and BCNF.',
        answer: `Key Differences between 3NF and BCNF:
1. Determinant Condition:
   - In 3NF: For every X → A, either X is a Superkey OR A is a Prime attribute.
   - In BCNF: For every X → A, X MUST be a Superkey (strictly no exception for prime attributes).
2. Strictness: BCNF is strictly stronger than 3NF. Every BCNF schema is in 3NF, but not every 3NF schema is in BCNF.
3. Functional Dependency Preservation: 3NF always guarantees dependency preservation with lossless join; BCNF guarantees lossless join but may not preserve all functional dependencies.
4. Applicability: BCNF is specifically relevant when relations have multiple overlapping composite candidate keys.`,
        keywords: ['Superkey', 'Prime attribute', 'Dependency preservation', 'Overlapping keys']
      }
    ],
    tenMarkQuestions: [
      {
        id: 'q10-1',
        marks: 10,
        question: 'Discuss the various database anomalies that necessitate Normalization. How does normalization resolve them?',
        answer: `1. INTRODUCTION & NEED:
When database relations are not properly normalized, redundant data is stored. This leads to severe anomalies during data manipulation operations:

2. THREE MAJOR ANOMALIES:
a) Insertion Anomaly:
- Occurrence: Inability to insert a record into the database without the presence of an unrelated attribute.
- Example: If Faculty details are stored in the Student_Course relation where StudentID is part of the primary key, a newly hired faculty member cannot be entered until at least one student enrolls in their course.

b) Deletion Anomaly:
- Occurrence: Deleting one piece of information unintentionally deletes completely unrelated facts.
- Example: If the only student taking "Advanced Algorithms" drops the course, deleting that student's record deletes the entire record of the course and its syllabus.

c) Update (Modification) Anomaly:
- Occurrence: Modifying a piece of data requires updating numerous redundant rows. If any row is omitted, inconsistent data results.
- Example: If a student changes their contact address and it is duplicated across 10 course rows, failing to update all 10 creates contradictory address entries.

3. RESOLUTION THROUGH DECOMPOSITION:
Normalization resolves these issues by applying functional dependency theory to decompose bloated relations into independent entities with foreign key relationships, guaranteeing:
- Lossless Join Property (R1 ⋈ R2 = R)
- Dependency Preservation (F1 ∪ F2)⁺ = F⁺
- Single-point updates and atomic insertions.`,
        keywords: ['Insertion anomaly', 'Deletion anomaly', 'Update anomaly', 'Decomposition', 'Data integrity']
      }
    ],
    fourteenMarkQuestions: [
      {
        id: 'q14-1',
        marks: 14,
        question: 'Explain the concept of Normalization in Relational Database Management Systems. Describe 1NF, 2NF, 3NF, and BCNF with suitable schemas, functional dependencies, and diagrams.',
        answer: 'Comprehensive 14-mark academic response detailing definitions, anomalies, stepwise decomposition (1NF to BCNF), lossless-join theorems, and practical schema transformations.',
        keywords: ['1NF', '2NF', '3NF', 'BCNF', 'Lossless decomposition', 'Dependency preservation', 'Functional dependency', 'Armstrong axioms'],
        examTip: 'Structure this answer with clear numbered headings. Draw the before and after table decomposition boxes, underline candidate keys, and write the mathematical condition X → Y for each normal form.',
        structured14Mark: {
          introduction: 'Normalization is a foundational theory in Relational Database Design formulated by E.F. Codd. It provides a formal framework to design database relations that are free from data redundancy and modification anomalies, ensuring optimal storage and transactional consistency.',
          definition: 'A relation schema R is normalized through a progression of normal forms (1NF, 2NF, 3NF, BCNF) wherein each subsequent form imposes tighter constraints on allowable functional dependencies (FDs), guaranteeing lossless join decomposition and dependency preservation.',
          mainConcept: 'The core mechanism of normalization relies on Functional Dependencies (X → Y). When an attribute Y is determined by an improper determinant X (which is neither a superkey nor fully prime), anomalies occur. Normalization identifies these improper determinants and isolates them into dedicated relations.',
          detailedExplanation: `Step-by-step Normal Forms:

1. FIRST NORMAL FORM (1NF):
- Rule: A relation R is in 1NF if and only if all underlying attribute domains contain only atomic (single, indivisible) values.
- Violation: Multi-valued fields (e.g. PhoneNumbers = '98401..., 98402...').
- Resolution: Create a separate row for each phone number or isolate into a separate Phone table.

2. SECOND NORMAL FORM (2NF):
- Rule: R is in 2NF if it is in 1NF and no non-prime attribute is partially dependent on any candidate key.
- Condition: If candidate key is {A, B}, any non-prime attribute C must depend on {A, B} jointly, not on A or B individually.
- Resolution: Split the relation into R1(A, non-prime) and R2(A, B, other-attributes).

3. THIRD NORMAL FORM (3NF):
- Rule: R is in 3NF if it is in 2NF and no non-prime attribute is transitively dependent on the primary key.
- Mathematical Condition: For every non-trivial FD X → A:
  * Either X is a Superkey, OR
  * A is a Prime Attribute (member of some candidate key).
- Resolution: For X → Y where Y is non-prime and X is not superkey, decompose into R1(X, Y) and R2(R - Y).

4. BOYCE-CODD NORMAL FORM (BCNF):
- Rule: R is in BCNF if for every non-trivial FD X → A, X is strictly a Superkey.
- Significance: Eliminates anomalies when multiple candidate keys exist that are composite and overlap.`,
          diagramFlowchart: `Decomposition Workflow:
Unnormalized Schema (UNF)
       │ (Remove multi-valued & composite attributes)
       ▼
   [ 1NF ] ─── (Remove Partial Dependencies) ───► [ 2NF ]
                                                    │
                                                    ▼ (Remove Transitive Dependencies)
                                                 [ 3NF ]
                                                    │
                                                    ▼ (Ensure all determinants are superkeys)
                                                 [ BCNF ]`,
          example: `Practical Demonstration:
Given unnormalized schema:
STUDENT_COURSE_FACULTY(StudentID, CourseID, StudentName, CourseName, FacultyID, FacultyName, FacultyOffice)

- Composite Candidate Key: {StudentID, CourseID}
- Dependencies:
  1. StudentID → StudentName (Partial - violates 2NF)
  2. CourseID → CourseName, FacultyID (Partial - violates 2NF)
  3. FacultyID → FacultyName, FacultyOffice (Transitive - violates 3NF)

Final Normalized Relations (BCNF):
- STUDENTS (StudentID [PK], StudentName)
- COURSES (CourseID [PK], CourseName, FacultyID [FK])
- FACULTY (FacultyID [PK], FacultyName, FacultyOffice)
- ENROLLMENTS (StudentID [FK], CourseID [FK], Semester, Grade)`,
          advantages: [
            'Dramatically decreases duplicate data across millions of records.',
            'Ensures atomic writes and eliminates synchronization bugs in high-concurrency systems.',
            'Facilitates straightforward database schema updates without ripple effects.'
          ],
          applications: [
            'Banking transaction ledgers (Core Banking Systems).',
            'Airline reservation systems (GDS).',
            'Healthcare Electronic Medical Record (EMR) architectures.'
          ],
          conclusion: 'In summary, Normalization is an indispensable database engineering principle. While OLTP systems prioritize 3NF/BCNF for data integrity, read-heavy analytical data warehouses may intentionally denormalize (Star/Snowflake schema) to optimize complex query performance.'
        }
      }
    ]
  },
  videos: [
    {
      id: 'v-1',
      title: 'Database Normalization Explained - 1NF, 2NF, 3NF with Real Examples',
      channelName: 'Gate Smashers / NPTEL Computer Science',
      shortDescription: 'Clear breakdown of 1NF, 2NF, and 3NF with easy-to-follow university exam problems and table decomposition steps.',
      difficulty: 'Beginner',
      duration: '18:42',
      youtubeSearchQuery: 'database normalization 1NF 2NF 3NF gate smashers'
    },
    {
      id: 'v-2',
      title: 'Boyce-Codd Normal Form (BCNF) vs 3NF with Practice Questions',
      channelName: 'Knowledge Gate',
      shortDescription: 'In-depth comparison of 3NF and BCNF, overlapping candidate keys, and dependency preservation test cases.',
      difficulty: 'Intermediate',
      duration: '22:15',
      youtubeSearchQuery: 'BCNF vs 3NF solved questions dbms'
    },
    {
      id: 'v-3',
      title: 'Lossless Join Decomposition & Minimal Cover Algorithm',
      channelName: 'MIT OpenCourseWare / Stanford Database Systems',
      shortDescription: 'Rigorous mathematical proof of Chase algorithm for lossless join and finding minimal canonical covers of functional dependencies.',
      difficulty: 'Advanced',
      duration: '31:05',
      youtubeSearchQuery: 'lossless join decomposition chase algorithm dbms'
    }
  ],
  quiz: [
    {
      id: 'qz-1',
      question: 'Which of the following normal forms requires all column values to be atomic with no repeating groups?',
      options: ['1NF', '2NF', '3NF', 'BCNF'],
      correctAnswerIndex: 0,
      explanation: 'First Normal Form (1NF) mandates that the values in each column must be atomic (indivisible) and each record must have a unique identifier.',
      type: 'mcq',
      difficulty: 'Easy'
    },
    {
      id: 'qz-2',
      question: 'A table is in 2NF if it is in 1NF and does NOT contain any:',
      options: ['Transitive dependencies', 'Partial functional dependencies', 'Foreign keys', 'Composite primary keys'],
      correctAnswerIndex: 1,
      explanation: 'Second Normal Form (2NF) requires that all non-prime attributes are fully functionally dependent on the entire primary key, eliminating partial dependencies.',
      type: 'mcq',
      difficulty: 'Easy'
    },
    {
      id: 'qz-3',
      question: 'In 3NF, for any non-trivial functional dependency X → A, which condition must hold true?',
      options: [
        'X must be a superkey OR A must be a prime attribute',
        'X and A must both be prime attributes',
        'X must strictly be a foreign key',
        'A must be a superkey'
      ],
      correctAnswerIndex: 0,
      explanation: 'The formal definition of 3NF specifies that for every FD X → A, either X is a superkey OR A is a prime attribute (part of some candidate key).',
      type: 'mcq',
      difficulty: 'Medium'
    },
    {
      id: 'qz-4',
      question: 'True or False: Every relation that is in BCNF is guaranteed to be in 3NF.',
      options: ['True', 'False'],
      correctAnswerIndex: 0,
      explanation: 'True. BCNF is a stricter version of 3NF. Since BCNF eliminates the relaxation where A is a prime attribute, any relation in BCNF automatically satisfies 3NF.',
      type: 'true_false',
      difficulty: 'Easy'
    },
    {
      id: 'qz-5',
      question: 'Which anomaly occurs when deleting one piece of data inadvertently deletes completely unrelated facts?',
      options: ['Update anomaly', 'Insertion anomaly', 'Deletion anomaly', 'Lossless anomaly'],
      correctAnswerIndex: 2,
      explanation: 'A deletion anomaly occurs when deleting a specific record leads to the unintended permanent loss of another unrelated fact stored in the same table.',
      type: 'mcq',
      difficulty: 'Easy'
    },
    {
      id: 'qz-6',
      question: 'Consider relation R(A, B, C, D) with candidate key {A, B} and FD B → C. Which normal form is violated?',
      options: ['1NF', '2NF', '3NF', 'None, it is in BCNF'],
      correctAnswerIndex: 1,
      explanation: 'Since {A, B} is the candidate key and non-prime attribute C depends on B (a proper subset of the key), this is a partial dependency violating 2NF.',
      type: 'mcq',
      difficulty: 'Medium'
    },
    {
      id: 'qz-7',
      question: 'What is the key disadvantage of over-normalizing a database schema?',
      options: [
        'Decreases data redundancy',
        'Degrades read performance due to multiple table JOIN operations',
        'Causes insertion anomalies',
        'Increases disk space utilization'
      ],
      correctAnswerIndex: 1,
      explanation: 'Splitting data into numerous small tables requires multiple SQL JOINs to reconstruct queries, increasing latency for read-heavy operations.',
      type: 'mcq',
      difficulty: 'Medium'
    },
    {
      id: 'qz-8',
      question: 'True or False: BCNF decomposition always preserves all functional dependencies.',
      options: ['True', 'False'],
      correctAnswerIndex: 1,
      explanation: 'False! While 3NF synthesis guarantees both lossless-join and dependency preservation, BCNF decomposition can sometimes fail to preserve functional dependencies.',
      type: 'true_false',
      difficulty: 'Hard'
    },
    {
      id: 'qz-9',
      question: 'If X → Y and Y → Z hold, and Z is a non-prime attribute, this relationship is called:',
      options: ['Partial dependency', 'Trivial dependency', 'Transitive dependency', 'Multivalued dependency'],
      correctAnswerIndex: 2,
      explanation: 'A non-prime attribute depending indirectly on the candidate key via another non-prime attribute forms a transitive dependency (X → Y and Y → Z).',
      type: 'mcq',
      difficulty: 'Medium'
    },
    {
      id: 'qz-10',
      question: 'Which testing algorithm determines whether a relation decomposition is lossless?',
      options: ['Chase algorithm / Tableau method', 'Dijkstra algorithm', 'Bellman-Ford method', 'Huffman coding'],
      correctAnswerIndex: 0,
      explanation: 'The Chase algorithm (or tableau method) systematically verifies whether a set of decomposed relations can be naturally joined without producing spurious tuples.',
      type: 'mcq',
      difficulty: 'Hard'
    }
  ],
  practice: [
    {
      id: 'p-1',
      title: 'Identify Normal Form and Anomaly in Course Table',
      category: 'Concept Questions',
      difficulty: 'Easy',
      prompt: 'A university stores enrollment records in a table: ENROLL(StudentID, CourseID, Grade, CourseName, InstructorName). Given candidate key is {StudentID, CourseID}, and CourseID → CourseName, identify the highest normal form of this table and explain why.',
      hint: 'Check if CourseName depends on the entire candidate key or only a part of it.',
      modelSolution: 'The highest normal form is 1NF. The table violates 2NF because CourseName is functionally dependent on CourseID, which is only a subset of the composite candidate key {StudentID, CourseID}. This represents a partial dependency.'
    },
    {
      id: 'p-2',
      title: 'Design 3NF Decomposition for Library System',
      category: 'Problem Solving',
      difficulty: 'Medium',
      prompt: 'Given relation BOOK_LOAN(BorrowerID, BookID, BorrowerName, BookTitle, DueDate) with Candidate Key {BorrowerID, BookID} and functional dependencies: BorrowerID → BorrowerName, BookID → BookTitle. Decompose this relation into 3NF relations with designated primary and foreign keys.',
      hint: 'Remove the partial dependencies by creating distinct tables for Borrowers and Books, maintaining a linking table for Loans.',
      modelSolution: `Decomposed 3NF Schemas:
1. BORROWERS (BorrowerID [PK], BorrowerName)
2. BOOKS (BookID [PK], BookTitle)
3. BOOK_LOANS (BorrowerID [FK], BookID [FK], DueDate) - PK: {BorrowerID, BookID}

This eliminates partial dependencies and satisfies 3NF.`
    },
    {
      id: 'p-3',
      title: 'SQL Normalization: Refactoring Customer Orders',
      category: 'Coding Practice',
      difficulty: 'Medium',
      prompt: 'Given an unnormalized schema Orders, write SQL DDL statements to decompose it into 3NF normalized tables.',
      isCoding: true,
      starterCode: `-- Given an unnormalized schema:
-- Orders(OrderID, CustomerID, CustomerName, CustomerCity, OrderDate, ItemID, ItemName, Quantity, UnitPrice)
-- Write SQL DDL statements to decompose this into 3NF normalized tables.

CREATE TABLE Customers (
    -- Fill in columns and primary key
);

CREATE TABLE Items (
    -- Fill in columns and primary key
);

CREATE TABLE Orders (
    -- Fill in columns and primary/foreign keys
);

CREATE TABLE OrderDetails (
    -- Fill in junction table with composite key
);`,
      expectedOutput: 'Four clean 3NF tables with appropriate PK and FK constraints.',
      testCases: [
        { input: 'Schema validation', expected: 'Customers, Items, Orders, OrderDetails properly partitioned' }
      ],
      hint: 'Remember to separate the order header (OrderDate, Customer) from line items (Quantity, UnitPrice).',
      modelSolution: `CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(100) NOT NULL,
    CustomerCity VARCHAR(100)
);

CREATE TABLE Items (
    ItemID INT PRIMARY KEY,
    ItemName VARCHAR(100) NOT NULL,
    UnitPrice DECIMAL(10,2) NOT NULL
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT NOT NULL,
    OrderDate DATE NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE OrderDetails (
    OrderID INT,
    ItemID INT,
    Quantity INT CHECK (Quantity > 0),
    PRIMARY KEY (OrderID, ItemID),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ItemID) REFERENCES Items(ItemID)
);`
    },
    {
      id: 'p-4',
      title: 'Analyze Overlapping Candidate Keys in BCNF',
      category: 'Previous-style Exam Questions',
      difficulty: 'Hard',
      prompt: 'Consider relation R(A, B, C) with FDs: AB → C and C → B. (a) Find all candidate keys of R. (b) What is the highest normal form of R? (c) If it violates BCNF, decompose it into BCNF.',
      hint: 'Compute closures of AB and AC.',
      modelSolution: `(a) Candidate Keys:
- (AB)⁺ = {A, B, C} => AB is a candidate key.
- Since C → B, (AC)⁺ = {A, C, B} => AC is also a candidate key.
Candidate keys are AB and AC. Prime attributes are A, B, C.

(b) Highest Normal Form:
- 1NF: Satisfied.
- 2NF: Non-prime attributes? None (all attributes are prime!). Hence 2NF is satisfied.
- 3NF: For AB → C, AB is superkey. For C → B, B is a prime attribute! Hence 3NF is satisfied.
- BCNF: In C → B, C is NOT a superkey (only AC and AB are superkeys). Thus, BCNF is VIOLATED. Highest normal form is 3NF.

(c) BCNF Decomposition:
Decompose using violating FD C → B:
- R1(C, B) with key C
- R2(A, C) with key AC.
Both R1 and R2 are now in BCNF.`
    }
  ],
  learningPath: {
    topic: 'DBMS Normalization',
    prerequisites: ['Relational Model Basics', 'Relational Algebra', 'Keys (Primary, Candidate, Superkey)'],
    currentTopic: 'DBMS Normalization (1NF to BCNF)',
    whatToLearnNext: ['Lossless Join & Dependency Preservation Proofs', 'Multi-valued Dependencies (4NF)', 'Join Dependencies (5NF)', 'Denormalization Strategies in Data Warehouses'],
    practiceRecommendations: ['Solve 10 university past exam questions on BCNF decomposition', 'Complete the SQL schema refactoring exercise', 'Take the 10-question evaluation quiz'],
    steps: [
      {
        stepNumber: 1,
        stage: 'Prerequisite',
        title: 'Master Candidate Keys & Functional Dependencies',
        description: 'Understand how attribute closures are computed using Armstrong axioms (Reflexivity, Augmentation, Transitivity).',
        recommendedAction: 'Practice computing closures like (AB)⁺ from a given set of FDs.'
      },
      {
        stepNumber: 2,
        stage: 'Current Focus',
        title: 'Learn 1NF and 2NF (Eliminate Partial Dependencies)',
        description: 'Ensure atomic data domains and remove partial dependencies on composite primary keys.',
        recommendedAction: 'Review the Full Notes and study the 2-mark and 5-mark answer templates.'
      },
      {
        stepNumber: 3,
        stage: 'Current Focus',
        title: 'Master 3NF and BCNF (Transitive Dependencies & Determinants)',
        description: 'Understand why BCNF is stricter and how to identify whether a determinant is a superkey.',
        recommendedAction: 'Inspect the 14-mark structured exam answer and memorize the comparison table.'
      },
      {
        stepNumber: 4,
        stage: 'Next Step',
        title: 'Decomposition Theorems (Lossless Join & Dependency Preservation)',
        description: 'Learn why 3NF always preserves dependencies while BCNF sometimes requires a trade-off.',
        recommendedAction: 'Watch the intermediate and advanced video lectures in the Learning Videos tab.'
      },
      {
        stepNumber: 5,
        stage: 'Advanced Practice',
        title: 'Practical Hands-on SQL & Exam Mock Test',
        description: 'Execute DDL normalization scripts and complete the practice problem solving section.',
        recommendedAction: 'Achieve at least 80% on the 10-question quiz and submit answers in the Practice tab.'
      }
    ]
  }
};

export const MACHINE_LEARNING_BUNDLE: TopicLearningBundle = {
  topic: 'Machine Learning',
  language: 'en',
  notes: {
    topic: 'Machine Learning',
    subject: 'Artificial Intelligence & Computer Science',
    introduction: 'Machine Learning (ML) is a branch of artificial intelligence (AI) and computer science focused on building algorithms that learn patterns from data and improve their performance on tasks over time without being explicitly programmed.',
    definition: 'According to Tom Mitchell (1997): "A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E."',
    keyConcepts: [
      {
        title: 'Supervised Learning',
        explanation: 'Learning a mapping function from input features to labeled targets (Classification for discrete labels, Regression for continuous numeric values).'
      },
      {
        title: 'Unsupervised Learning',
        explanation: 'Discovering latent patterns, groupings, and structures in unlabeled data (Clustering like K-Means, Dimensionality Reduction like PCA).'
      },
      {
        title: 'Reinforcement Learning',
        explanation: 'An agent interacts with an environment through trials and errors, receiving scalar rewards or penalties to learn an optimal policy.'
      },
      {
        title: 'Bias-Variance Tradeoff',
        explanation: 'Underfitting (high bias, model too simplistic) versus Overfitting (high variance, model memorizes training noise and fails to generalize to test data).'
      }
    ],
    detailedExplanation: [
      {
        stepNumber: 1,
        title: 'Problem Formulation & Data Collection',
        details: 'Define the objective (e.g. predict house prices), identify target variables, collect tabular/image/text data from reliable sources.'
      },
      {
        stepNumber: 2,
        title: 'Data Preprocessing & Feature Engineering',
        details: 'Handle missing values, encode categorical variables, normalize/standardize numerical scales, extract salient domain features, and split into Train/Validation/Test sets.'
      },
      {
        stepNumber: 3,
        title: 'Model Selection & Training',
        details: 'Choose appropriate algorithms (Linear Regression, Decision Trees, Random Forests, Support Vector Machines, Neural Networks) and optimize loss functions using gradient descent.'
      },
      {
        stepNumber: 4,
        title: 'Evaluation & Hyperparameter Tuning',
        details: 'Measure generalization using cross-validation and metrics (Accuracy, Precision, Recall, F1-Score, ROC-AUC, RMSE). Tune parameters with GridSearch or Bayesian Optimization.'
      }
    ],
    examples: {
      academic: 'Predicting student semester GPA based on previous semester grades, lecture attendance percentage, and weekly study hours using Multiple Linear Regression.',
      realWorld: 'Email spam filtering (e.g. Gmail detecting phishing emails using Naive Bayes / BERT classifiers) and recommendation engines (e.g. Netflix / Spotify collaborative filtering).'
    },
    advantages: [
      'Discovers complex, non-linear relationships that are impossible to hardcode manually.',
      'Continuously adapts to changing environments as new data arrives.',
      'Automates high-volume classification and decision-making workflows at scale.'
    ],
    disadvantages: [
      'Requires large quantities of clean, representative training data.',
      'Black-box models (deep neural nets) lack interpretability in high-stakes fields like healthcare or criminal justice.',
      'Vulnerable to algorithmic bias and distribution shifts.'
    ],
    applications: [
      'Healthcare: Early disease diagnosis and tumor segmentation in medical imaging.',
      'Finance: Real-time fraud detection and automated algorithmic trading.',
      'Autonomous Systems: Self-driving perception, robotics, and drone navigation.'
    ],
    importantPoints: [
      'Golden Rule: Never evaluate your final model on training data; always reserve a clean test set to measure true generalization.',
      'Data quality beats algorithmic complexity: Garbage in, garbage out.'
    ],
    summary: 'Machine learning extracts predictive models from data across supervised, unsupervised, and reinforcement learning paradigms, balancing bias and variance.',
    codeSnippet: {
      language: 'python',
      code: `# Train a Random Forest Classifier with scikit-learn
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# 1. Load dataset
data = load_iris()
X, y = data.data, data.target

# 2. Train-Test Split (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 3. Instantiate and train model
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# 4. Predict and evaluate
y_pred = clf.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred) * 100:.2f}%")
print(classification_report(y_test, y_pred, target_names=data.target_names))`,
      explanation: 'Loads the Iris flower dataset, partitions into train and test splits, trains a 100-tree Random Forest, and prints accuracy and F1 score.',
      output: 'Accuracy: 96.67%\n              precision    recall  f1-score   support\n      setosa       1.00      1.00      1.00        10\n  versicolor       0.90      1.00      0.95        10\n   virginica       1.00      0.90      0.95        10',
      commonMistakes: [
        'Data Leakage: Preprocessing (e.g. scaling) the entire dataset before splitting instead of fitting scalers on train set only.',
        'Evaluating an imbalanced dataset solely on accuracy instead of Precision, Recall, and ROC-AUC.'
      ]
    },
    diagramSuggestion: {
      title: 'Machine Learning Workflow Pipeline',
      type: 'flowchart',
      description: 'End-to-end steps from raw data ingestion to production model inference',
      nodes: [
        { id: '1', label: 'Data Collection', subtext: 'Tabular, images, audio, or logs' },
        { id: '2', label: 'Feature Engineering', subtext: 'Imputation, scaling, train/test split' },
        { id: '3', label: 'Model Training', subtext: 'Loss function & gradient descent' },
        { id: '4', label: 'Validation & Metrics', subtext: 'Precision, Recall, F1, ROC-AUC' },
        { id: '5', label: 'Deployment & Monitoring', subtext: 'API endpoint & drift detection' }
      ]
    }
  },
  examPrep: {
    topic: 'Machine Learning',
    strategyAdvice: 'Highlight Tom Mitchell\'s definition of ML (Task, Performance, Experience). Always draw a comparison table for Supervised vs Unsupervised learning, illustrate the Bias-Variance tradeoff curve, and write the mathematical loss functions where appropriate.',
    commonKeywords: ['Supervised Learning', 'Unsupervised Learning', 'Bias-Variance Tradeoff', 'Overfitting', 'Cross-Validation', 'Gradient Descent', 'Hyperparameters', 'Confusion Matrix'],
    examTips: [
      'For 2-mark questions: State Tom Mitchell\'s formal definition or give a direct 2-line distinction.',
      'For 5-mark questions: Draw a 4-column comparison table (Supervised vs Unsupervised vs Reinforcement).',
      'For 14-mark questions: Follow the 9-part structured answer covering definitions, taxonomy, mathematics, bias-variance curves, algorithms, and real-world applications.'
    ],
    twoMarkQuestions: [
      {
        id: 'ml-2-1',
        marks: 2,
        question: 'Define Machine Learning according to Tom Mitchell.',
        answer: 'Tom Mitchell defined ML as: A computer program learns from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E.',
        keywords: ['Task T', 'Performance P', 'Experience E', 'Tom Mitchell']
      },
      {
        id: 'ml-2-2',
        marks: 2,
        question: 'What is the difference between Classification and Regression?',
        answer: 'In supervised learning, Classification predicts a discrete categorical label (e.g., Spam or Not Spam), whereas Regression predicts a continuous numerical quantity (e.g., predicting house prices).',
        keywords: ['Discrete label', 'Continuous numeric value', 'Supervised learning']
      },
      {
        id: 'ml-2-3',
        marks: 2,
        question: 'What is Overfitting and how can it be prevented?',
        answer: 'Overfitting occurs when a model learns training data noise too closely and fails to generalize to unseen test data. It is mitigated by regularization (L1/L2), cross-validation, pruning, and dropout.',
        keywords: ['High variance', 'Training noise', 'Regularization', 'Cross-validation']
      }
    ],
    fiveMarkQuestions: [
      {
        id: 'ml-5-1',
        marks: 5,
        question: 'Explain the Bias-Variance Tradeoff with a sketch/explanation.',
        answer: `Bias-Variance Tradeoff is the fundamental tension between model simplicity and flexibility:

1. Bias (Underfitting): Error caused by erroneous assumptions in the learning algorithm. High bias models (e.g., simple linear regression on non-linear data) underfit, performing poorly on both training and test data.
2. Variance (Overfitting): Error from sensitivity to small fluctuations in the training set. High variance models (e.g., deep unpruned decision trees) memorize noise, scoring 100% on training but failing on testing.
3. Total Expected Error = (Bias)² + Variance + Irreducible Error.
4. Goal: Find the optimal model complexity that minimizes the combined sum of squared bias and variance.`,
        keywords: ['Bias', 'Variance', 'Underfitting', 'Overfitting', 'Irreducible error', 'Optimal complexity']
      },
      {
        id: 'ml-5-2',
        marks: 5,
        question: 'Compare Supervised, Unsupervised, and Reinforcement Learning.',
        answer: `Parameter Comparison:
1. Training Data:
   - Supervised: Labeled input-output pairs (X, Y).
   - Unsupervised: Unlabeled data only (X).
   - Reinforcement: State-action trajectories with environmental rewards.
2. Core Objective:
   - Supervised: Predict labels or continuous outputs for unseen inputs.
   - Unsupervised: Discover hidden patterns, clusters, or lower-dimensional representations.
   - Reinforcement: Maximize cumulative scalar rewards over time via optimal policy.
3. Common Algorithms:
   - Supervised: Logistic Regression, Random Forest, SVM, XGBoost.
   - Unsupervised: K-Means, Hierarchical Clustering, PCA, Autoencoders.
   - Reinforcement: Q-Learning, SARSA, Deep Q-Networks (DQN), PPO.`,
        keywords: ['Labeled data', 'Unlabeled data', 'Policy optimization', 'Reward signal']
      }
    ],
    tenMarkQuestions: [
      {
        id: 'ml-10-1',
        marks: 10,
        question: 'Describe the complete lifecycle of a Machine Learning project from problem inception to production monitoring.',
        answer: `A robust machine learning engineering lifecycle consists of six interdependent stages:

1. Business Understanding & Problem Definition:
   - Formulate business goals into mathematical ML tasks (e.g. binary classification, ranking).
   - Establish baseline performance metrics (e.g., minimum acceptable 95% recall).

2. Data Ingestion & Exploratory Data Analysis (EDA):
   - Gather raw historical logs, databases, and streaming feeds.
   - Inspect distributions, handle skewness, outliers, and assess feature correlations.

3. Data Preparation & Feature Engineering:
   - Handle missing data via mean/median/KNN imputation.
   - One-hot / target encode categorical features.
   - Scale numeric columns via MinMax or StandardScaler.
   - Guard against data leakage across train/validation splits.

4. Model Architecture Selection & Training:
   - Benchmark simpler models (Logistic Regression) before complex ensembles (Gradient Boosting, Deep Neural Networks).
   - Define objective loss function (Cross-Entropy, MSE).
   - Optimize weights via Stochastic Gradient Descent (SGD) or Adam.

5. Model Evaluation & Validation:
   - Employ K-Fold Stratified Cross-Validation.
   - Analyze confusion matrices, Precision-Recall AUC curves, and error distributions.

6. Deployment, Serving & Drift Monitoring:
   - Containerize model inference in a microservice (FastAPI/Docker).
   - Monitor for Concept Drift (target distribution changes) and Data Drift (input distribution changes).`,
        keywords: ['EDA', 'Feature engineering', 'Data leakage', 'Cross-validation', 'Concept drift']
      }
    ],
    fourteenMarkQuestions: [
      {
        id: 'ml-14-1',
        marks: 14,
        question: 'Provide an exhaustive academic analysis of Machine Learning paradigms. Detail Supervised, Unsupervised, and Reinforcement learning architectures, mathematical foundations of optimization, evaluation metrics, and real-world deployment challenges.',
        answer: 'Comprehensive 14-mark academic response detailing definitions, taxonomy, mathematical optimization (Gradient Descent), bias-variance decomposition, evaluation metrics, and applications.',
        keywords: ['Supervised', 'Unsupervised', 'Reinforcement', 'Gradient Descent', 'Bias-Variance', 'Confusion Matrix', 'Regularization'],
        examTip: 'Structure into 9 distinct sections. Include the mathematical formulation of Mean Squared Error, draw the Bias-Variance tradeoff graph, and detail the confusion matrix formula for Precision, Recall, and F1.',
        structured14Mark: {
          introduction: 'Machine Learning (ML) represents a paradigm shift in computer science from deductive programming (writing rules manually) to inductive learning (algorithms extracting predictive rules from data). It is the primary engine behind modern artificial intelligence systems.',
          definition: 'Formal Definition: A computer program is said to learn from experience E with respect to task class T and performance measure P, if its performance P at tasks in T improves monotonically with experience E (Tom Mitchell, 1997).',
          mainConcept: 'At its mathematical core, Machine Learning is a function approximation problem. Given an input space X and output space Y, the objective is to find a hypothesis function h_theta(X) parameterized by theta that minimizes an empirical risk (loss) function L(Y, h_theta(X)) over a probability distribution.',
          detailedExplanation: `Three Primary Learning Paradigms:

1. SUPERVISED LEARNING:
- Given training dataset D = {(x_i, y_i)}_{i=1}^N.
- Tasks:
  a) Classification: Discrete target y in {0, 1, ..., K}. Evaluated using Cross-Entropy Loss: L = -sum(y_i * log(p_i)).
  b) Regression: Continuous target y in Real Numbers. Evaluated using Mean Squared Error: MSE = (1/N) * sum((y_i - y_hat_i)^2).
- Key Algorithms: Linear & Logistic Regression, Support Vector Machines (SVM with Kernel trick), Decision Trees, Random Forests, Gradient Boosted Trees (XGBoost).

2. UNSUPERVISED LEARNING:
- Given unlabelled training dataset D = {x_i}_{i=1}^N.
- Tasks:
  a) Clustering: Partitioning points into k cohesive clusters (K-Means minimizing within-cluster sum of squares, DBSCAN density clustering).
  b) Dimensionality Reduction: Projecting high-dimensional data into lower orthogonal dimensions while preserving maximum variance (Principal Component Analysis - PCA via eigendecomposition of covariance matrix).

3. REINFORCEMENT LEARNING (RL):
- Formulated as a Markov Decision Process (MDP) tuple (S, A, P, R, gamma).
- Agent observes state s_t, executes action a_t, receives reward r_t, transitions to s_{t+1}.
- Objective: Find policy pi(a|s) that maximizes expected cumulative discounted reward: G_t = sum_{k=0}^infinity gamma^k * r_{t+k+1}.

4. OPTIMIZATION VIA GRADIENT DESCENT:
- Parameters are updated iteratively against the negative gradient of the loss surface:
  theta_{t+1} = theta_t - alpha * grad_theta L(theta_t)
  where alpha is the learning rate. Variants include SGD, Momentum, and Adam.`,
          diagramFlowchart: `Machine Learning Taxonomy & Pipeline:
                       [ Machine Learning ]
            ┌───────────────────┼──────────────────┐
            ▼                   ▼                  ▼
     [ Supervised ]      [ Unsupervised ]   [ Reinforcement ]
      ├── Classification  ├── Clustering     ├── Policy Iteration
      └── Regression      └── Dim. Reduction └── Q-Learning

Pipeline:
Raw Data ──► Preprocessing ──► Train/Test Split ──► Optimization ──► Evaluation ──► Production`,
          example: `Concrete End-to-End Example (Credit Card Fraud Detection):
1. Input Features X: Transaction amount, geographic distance from last purchase, merchant category, time of day.
2. Label Y: 0 (Legitimate) or 1 (Fraudulent).
3. Challenge: Extreme class imbalance (99.9% legitimate, 0.1% fraud).
4. Solution: Apply SMOTE (Synthetic Minority Over-sampling Technique), train an XGBoost classifier with focal loss, and evaluate using Precision-Recall AUC rather than standard accuracy.`,
          advantages: [
            'Handles high-dimensional complex data where human heuristics fail.',
            'Continuous learning capability with online streaming model updates.',
            'Enables automated real-time personalization across millions of users.'
          ],
          applications: [
            'Autonomous vehicles (object detection, path planning).',
            'Natural Language Processing (Large Language Models, machine translation).',
            'Precision medicine and genomic sequence classification.'
          ],
          conclusion: 'In conclusion, Machine Learning bridges statistical mathematics and computational computer science. Success requires careful mitigation of overfitting through regularization, strict cross-validation protocols, and continuous monitoring against real-world data drift.'
        }
      }
    ]
  },
  videos: [
    {
      id: 'ml-v-1',
      title: 'Machine Learning Course for Beginners - Complete Roadmap',
      channelName: 'freeCodeCamp.org / Andrew Ng',
      shortDescription: 'Core concepts of supervised and unsupervised learning, gradient descent intuition, and foundational mathematics.',
      difficulty: 'Beginner',
      duration: '38:15',
      youtubeSearchQuery: 'machine learning for beginners full course freecodecamp'
    },
    {
      id: 'ml-v-2',
      title: 'Bias-Variance Tradeoff & Model Evaluation Metrics Explained',
      channelName: 'StatQuest with Josh Starmer',
      shortDescription: 'Visual, step-by-step breakdown of overfitting, underfitting, cross-validation, and confusion matrices.',
      difficulty: 'Intermediate',
      duration: '16:40',
      youtubeSearchQuery: 'statquest bias variance tradeoff machine learning'
    },
    {
      id: 'ml-v-3',
      title: 'Deep Dive: Optimization Algorithms (SGD, Momentum, Adam)',
      channelName: 'Stanford CS231n / 3Blue1Brown',
      shortDescription: 'Mathematical intuition behind stochastic gradient descent, loss landscapes, and adaptive learning rate optimizers.',
      difficulty: 'Advanced',
      duration: '27:50',
      youtubeSearchQuery: 'gradient descent optimization algorithms machine learning 3blue1brown'
    }
  ],
  quiz: [
    {
      id: 'ml-qz-1',
      question: 'Which of the following is an example of Supervised Learning?',
      options: [
        'Predicting whether an email is spam based on labeled emails',
        'Grouping news articles into clusters without predefined categories',
        'Teaching a robot to balance on a pole using reward penalties',
        'Compressing high-resolution images using PCA'
      ],
      correctAnswerIndex: 0,
      explanation: 'Supervised learning requires labeled training data where each input is mapped to a known target output (e.g. spam / not spam).',
      type: 'mcq',
      difficulty: 'Easy'
    },
    {
      id: 'ml-qz-2',
      question: 'A model with High Bias and Low Variance is typically suffering from:',
      options: ['Underfitting', 'Overfitting', 'Data leakage', 'Excessive training epochs'],
      correctAnswerIndex: 0,
      explanation: 'High bias indicates that the model makes strong overly simplistic assumptions and fails to capture the underlying patterns, leading to underfitting.',
      type: 'mcq',
      difficulty: 'Easy'
    },
    {
      id: 'ml-qz-3',
      question: 'Which evaluation metric is defined as True Positives / (True Positives + False Positives)?',
      options: ['Recall', 'Precision', 'Accuracy', 'Specificity'],
      correctAnswerIndex: 1,
      explanation: 'Precision measures the proportion of predicted positive instances that were genuinely correct: TP / (TP + FP).',
      type: 'mcq',
      difficulty: 'Medium'
    },
    {
      id: 'ml-qz-4',
      question: 'True or False: K-Means is a supervised classification algorithm.',
      options: ['True', 'False'],
      correctAnswerIndex: 1,
      explanation: 'False! K-Means is an unsupervised clustering algorithm that partitions unlabeled data points into k clusters based on distance metrics.',
      type: 'true_false',
      difficulty: 'Easy'
    },
    {
      id: 'ml-qz-5',
      question: 'What technique adds a penalty proportional to the magnitude of coefficients to prevent overfitting?',
      options: ['Regularization (L1 / L2)', 'Gradient Boosting', 'One-Hot Encoding', 'Principal Component Analysis'],
      correctAnswerIndex: 0,
      explanation: 'Regularization (such as L1 Lasso or L2 Ridge) penalizes large weight coefficients in the loss function to constrain model complexity and combat overfitting.',
      type: 'mcq',
      difficulty: 'Medium'
    }
  ],
  practice: [
    {
      id: 'ml-p-1',
      title: 'Calculate Confusion Matrix Metrics',
      category: 'Problem Solving',
      difficulty: 'Medium',
      prompt: 'A cancer detection model is evaluated on 100 patients. It results in: True Positives (TP) = 18, False Positives (FP) = 6, False Negatives (FN) = 2, True Negatives (TN) = 74. Calculate the model\'s (a) Accuracy, (b) Precision, and (c) Recall.',
      hint: 'Recall = TP / (TP + FN); Precision = TP / (TP + FP); Accuracy = (TP + TN) / Total.',
      modelSolution: `Calculations:
(a) Accuracy = (TP + TN) / Total = (18 + 74) / 100 = 92/100 = 92.0%
(b) Precision = TP / (TP + FP) = 18 / (18 + 6) = 18 / 24 = 75.0%
(c) Recall = TP / (TP + FN) = 18 / (18 + 2) = 18 / 20 = 90.0%

In medical diagnostics, high Recall (90%) is crucial to minimize dangerous false negatives.`
    },
    {
      id: 'ml-p-2',
      title: 'Implement Train-Test Split & Normalization in Python',
      category: 'Coding Practice',
      difficulty: 'Easy',
      prompt: 'Implement a function to scale train and test features to the [0, 1] range without data leakage.',
      isCoding: true,
      starterCode: `import numpy as np

def min_max_scaler(train_data, test_data):
    """
    Scale train and test features to [0, 1] range WITHOUT data leakage.
    Remember to compute min and max ONLY on train_data!
    """
    # Compute min and max on train_data
    # Scale train_data and test_data
    # Return scaled_train, scaled_test
    pass`,
      expectedOutput: 'Scaled NumPy arrays between 0 and 1 without data leakage.',
      testCases: [
        { input: 'train=[10, 20, 30], test=[15, 25]', expected: 'train_scaled=[0, 0.5, 1.0], test_scaled=[0.25, 0.75]' }
      ],
      hint: 'Fit on train, transform on both train and test to prevent data leakage.',
      modelSolution: `import numpy as np

def min_max_scaler(train_data, test_data):
    # Calculate min and max strictly on train_data
    d_min = np.min(train_data, axis=0)
    d_max = np.max(train_data, axis=0)
    
    # Avoid zero division
    denominator = np.where(d_max - d_min == 0, 1.0, d_max - d_min)
    
    scaled_train = (train_data - d_min) / denominator
    scaled_test = (test_data - d_min) / denominator
    
    return scaled_train, scaled_test`
    }
  ],
  learningPath: {
    topic: 'Machine Learning',
    prerequisites: ['Linear Algebra & Matrices', 'Calculus (Partial Derivatives)', 'Probability & Statistics', 'Python Programming (NumPy & Pandas)'],
    currentTopic: 'Core Machine Learning (Supervised & Unsupervised)',
    whatToLearnNext: ['Deep Learning & Neural Networks', 'Convolutional Neural Networks (CNNs)', 'Transformers & Large Language Models (LLMs)', 'MLOps & CI/CD for Machine Learning'],
    practiceRecommendations: ['Implement Linear & Logistic Regression from scratch', 'Train a Random Forest classifier on tabular data', 'Achieve 100% on the Machine Learning evaluation quiz'],
    steps: [
      {
        stepNumber: 1,
        stage: 'Prerequisite',
        title: 'Mathematics for Machine Learning',
        description: 'Review vectors, matrix multiplication, gradients, and Bayes theorem.',
        recommendedAction: 'Brush up on 3Blue1Brown linear algebra and calculus series.'
      },
      {
        stepNumber: 2,
        stage: 'Current Focus',
        title: 'Supervised Learning & Regression / Classification',
        description: 'Understand cost functions, gradient descent, decision boundaries, and scikit-learn models.',
        recommendedAction: 'Study the Full Notes and practice the coding question in the Practice tab.'
      },
      {
        stepNumber: 3,
        stage: 'Current Focus',
        title: 'Model Evaluation & Bias-Variance Tradeoff',
        description: 'Master Precision, Recall, F1 score, ROC curves, and cross-validation techniques.',
        recommendedAction: 'Review the 5-mark and 14-mark structured answers in Exam Prep.'
      },
      {
        stepNumber: 4,
        stage: 'Next Step',
        title: 'Unsupervised Learning & Clustering',
        description: 'Explore K-Means, hierarchical clustering, and PCA dimensionality reduction.',
        recommendedAction: 'Watch the intermediate video lecture in the Learning Videos tab.'
      },
      {
        stepNumber: 5,
        stage: 'Advanced Practice',
        title: 'Deep Learning & Neural Networks',
        description: 'Transition into multi-layer perceptrons, backpropagation, and PyTorch / TensorFlow.',
        recommendedAction: 'Take the practice quiz and ask the AI Tutor for advanced challenge problems.'
      }
    ]
  }
};

export const DEMO_TOPICS_MAP: Record<string, TopicLearningBundle> = {
  'dbms normalization': DBMS_NORMALIZATION_BUNDLE,
  'normalization': DBMS_NORMALIZATION_BUNDLE,
  'machine learning': MACHINE_LEARNING_BUNDLE,
  'ml': MACHINE_LEARNING_BUNDLE
};
