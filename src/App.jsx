import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

const API_KEY_STORAGE_KEY = 'echoForgeApiKey';
const PROFILE_STORAGE_KEY = 'echoForgeProfile';
const CHAT_STORAGE_KEY = 'echoForgeChatHistory';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_API_VERSION = '2023-06-01';
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

const defaultProfile = {
  name: '',
  linkedIn: '',
  resumeSummary: '',
  skills: '',
  experiences: '',
  preferences: '',
  other: '',
};

// Complete portfolio data
const portfolioData = {
    personalInfo: {
      name: "Anjan Diyora",
      location: "Plano, TX",
      address: "300 Legacy Dr, Plano, Texas 75023",
      phone: "(628) 287-5770",
      email: "diyoraanjan@gmail.com",
      website: "anjanbio.vercel.app",
      photo: "https://raw.githubusercontent.com/Anjan50/Anjan50/refs/heads/main/anjan-folio-imgs/1741324175139.jpeg",
      visaStatus: "F1 OPT Student",
      gender: "Male",
      ethnicity: "Asian",
      nationality: "Indian",
      ethereumAddress: "0x524948A4334193fc453640172cd70224d5A81622",
      ensDomain: "anjan.eth",
      about: {
        title: "Software Engineer",
        status: "Seeking Full-time SDE Role",
        description: "Software Engineer with 3+ years building scalable microservices and cloud-native products across React/Next.js, Spring Boot/Node.js, and Python. Experienced in blockchain development with hands-on work on DEX platforms, smart contracts, and decentralized applications. Ship to AWS/GCP with Docker/Kubernetes, Terraform, and CI/CD. Hands-on in HIPAA healthcare claims portals and fintech risk analytics; LLM/RAG systems using LangChain, PyTorch, SageMaker, and Vertex AI. Strengths in performance tuning, observability, and data pipelines (Kafka/Redis), plus pragmatic cost optimization and product focus. Experienced in networking and distributed systems—packet analysis (Wireshark/tcpdump), performance benchmarking (iPerf3), socket programming, and Kubernetes overlay optimizations (RPS/RFS).",
        highlights: [
          "Harmonizing full-stack realms with React, Node.js, and Spring Boot",
          "Orchestrating cloud symphonies and DevOps flows with AWS",
          "Architecting microservices as distributed dances of data",
          "Building blockchain applications with Solidity, EVM, and Web3 technologies",
          "Embracing Agile as the rhythm of collective creation"
        ]
      },
      socialLinks: {
        linkedin: "https://linkedin.com/in/anjandiyora",
        github: "https://github.com/Anjan50",
        twitter: "https://twitter.com/diyoraanjan",
        leetcode: "https://leetcode.com/u/an_diyora/"
      }
    },
  education: [
    {
      school: "North Carolina State University",
      degree: "Master of Science, Computer Science & Networking",
      duration: "Jan 2024 – May 2025",
      location: "Raleigh, NC",
      gpa: "3.5/4.0 GPA",
      courseTags: [
        "Design and Analysis of Algorithms",
        "Distributed Systems",
        "Cloud Computing",
        "Software Engineering",
        "Project Management",
        "Computer Networks",
        "Object Oriented Design"
      ],
      highlights: [
        "Excelling in advanced algorithms and distributed systems",
        "Leading research in cloud computing and networking",
        "Maintaining academic excellence with strong GPA"
      ]
    },
    {
      school: "Parul Institute of Engineering & Technology",
      degree: "Bachelor of Technology, Computer Science & Engineering",
      duration: "Aug 2019 – Apr 2023",
      location: "Gujarat, India",
      gpa: "8.2/10 CGPA",
      courseTags: [
        "Data Structures & Algorithms",
        "Cloud Computing",
        "Machine Learning",
        "Software Engineering",
        "Database Systems",
        "Computer Networks",
        "Operating Systems",
        "Web Programming",
        "Cryptography",
        "Python Programming"
      ],
      highlights: [
        "Delved deeply into the essence of Data Structures and Algorithms",
        "Mastered the architecture of Computer Organization",
        "Excelled in the arts of Software Engineering and Cloud Computing"
      ]
    }
  ],
  skills: {
    Languages: [
      "Java",
      "Python", 
      "JavaScript",
      "TypeScript",
      "C++",
      "Go",
      "SQL",
      "Bash",
      "HTML/CSS"
    ],
    "Frontend Development": [
      "Spring Boot",
      "Angular",
      "React",
      "Node.js",
      "Flask",
      "Next.js",
      "Tailwind CSS",
      "PyTorch",
      "Inngest",
      "Stripe",
      "Express.js",
      "D3.js",
      "GraphQL",
      "RESTful APIs",
      "Responsive Design"
    ],
    "Backend & Cloud": [
      "AWS (EC2, S3, Lambda, SageMaker, Auto-Scaling)",
      "GCP (Vertex AI, Cloud Functions, Compute Engine)",
      "Kubernetes",
      "Docker",
      "CI/CD",
      "Git",
      "Distributed Systems",
      "Microservices",
      "Containerization",
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "GraphQL",
      "VectorDB",
      "Oracle",
      "Redis",
      "DynamoDB",
      "Vector Databases (FAISS, Pinecone)"
    ],
    "Network & Infrastructure": [
      "Wireshark",
      "tcpdump",
      "iPerf3",
      "Ansible",
      "Bash",
      "Socket Programming",
      "VXLAN",
      "Calico",
      "TCP/IP",
      "PCAP Analysis",
      "tshark",
      "ns-3 Network Simulator",
      "Network Simulation",
      "Congestion Control",
      "RPS/RFS",
      "3GPP",
      "Google Analytics",
      "SSL",
      "REST",
      "gRPC",
      "BitTorrent Protocol",
      "n8n (automation)"
    ],
    "Data & Analytics": [
      "TensorFlow",
      "Scikit-learn",
      "LLMs (LangChain, LLaMA, Mistral, GPT-3, GPT-4)",
      "Polar",
      "Machine Learning",
      "Neural Networks",
      "LLM Fine-Tuning",
      "RAG (Retrieval-Augmented Generation)",
      "Multi-Agent Systems",
      "Generative AI",
      "Data Visualization",
      "Performance Analysis",
      "Predictive Analytics",
      "Real-time Tracking",
      "Columnar Storage",
      "Data Partitioning",
      "Multiprocessing"
    ],
    "DevOps & Tools": [
      "Performance Benchmarking",
      "Automated Testing",
      "Fault Tolerance",
      "Retry Mechanisms"
    ],
    "Security & Protocols": [
      "SSL/TLS",
      "ECN",
      "Network Security",
      "Packet Debugging",
      "Testbed Validation"
    ],
    "Blockchain & Web3": [
      "Solidity",
      "Ethereum",
      "EVM",
      "Smart Contracts",
      "Web3.js",
      "ethers.js",
      "The Graph",
      "Hardhat",
      "Truffle",
      "IPFS",
      "Decentralized Applications (DApps)",
      "On-chain Orderbooks",
      "AMM (Automated Market Maker)",
      "Cross-chain Bridges",
      "ENS Domains",
      "Token Standards (ERC-20, ERC-721, BEP-20)",
      "DeFi Protocols",
      "Blockchain Analytics"
    ]
  },
  experience: [
    {
      company: "SVTronics, Inc.",
      role: "Software Analyst",
      duration: "Jun 2025 – Current",
      location: "Dallas, TX",
      responsibilities: [
        "Developed automated Python scripts for PCB circuit validation, integrating real-time test results with internal ERP system; reduced manual testing time by 40% and improved overall hardware debugging accuracy.",
        "Led end-to-end web and mobile development for a Smart Ring diagnostics platform using React, Node.js, and Firebase, enabling QA teams to remotely trigger test scripts and monitor live performance metrics via dashboards.",
        "Created data pipelines using Python (Pandas, NumPy) to preprocess sensor data and push metrics into PowerBI dashboard.",
        "Built automated test suites in Python to simulate edge-case circuit behavior, improving firmware QA reliability by 30%.",
        "Collaborated on predictive failure modeling using regression analysis and trained supervised models using scikit-learn."
      ]
    },
    {
      company: "Orusha LLC",
      role: "Software Developer Intern",
      duration: "Jan 2025 – May 2025",
      location: "Cary, NC",
      responsibilities: [
        "Gathered and clarified requirements for a healthcare patient portal; defined specs for COBRA plans, XML, JSON, flat files with special separators, and fixed-length layouts aligned to HIPAA X12.",
        "Designed workflow tests and Python validators for X12 837/835; generated EDI claim files and guides; verified loops, segments, and code sets vs payer rules, logging each bug and trace in Jira.",
        "Checked data integrity using Hadoop on GCP Dataproc; built Test and Traceability Matrices to detect gaps, reconcile patient IDs, and confirm HIPPA/HIPAA compliance across interfaces and data.",
        "Scripted pytest/pydantic checks; shipped CI on GitHub Actions with Docker."
      ]
    },
    {
      company: "North Carolina State University",
      role: "Software Engineer (RA)",
      duration: "Jan 2024 – Nov 2024",
      location: "Raleigh, NC",
      responsibilities: [
        "Built a risk-analysis web app for fintech loans at NCSU's financial markets lab; integrated Bloomberg API with Python, Django, PostgreSQL, and LangChain for LLM insights, deployed on AWS EC2 with Nginx.",
        "Implemented PyTorch models on AWS SageMaker and GCP Vertex AI for credit risk and time-series; automated features with Pandas/Airflow, tracked runs in MLflow, and maintained model cards.",
        "Provisioned infra on AWS S3, RDS, EKS; codified VPC/IAM with Terraform; added Prometheus/Grafana dashboards/alerts, plus OpenTelemetry traces across services and FastAPI jobs.",
        "Automated workflows with n8n and REST; integrated MongoDB, Redis, and Kafka for event pipelines.",
        "Set up CI/CD on GitHub Actions; containerized services with Docker/Helm for Kubernetes."
      ]
    },
    {
      company: "Azillik",
      role: "Full Stack Developer",
      duration: "Jun 2023 – Jun 2024",
      location: "India",
      responsibilities: [
        "Led UI in Next.js with TypeScript and Tailwind CSS for a color psychology app; integrated REST APIs, built an accessible gradient picker, and codified a design system from Figma tokens in SB.",
        "Implemented LLM personalization via LangChain with OpenAI/Azure OpenAI; stored preferences in MongoDB, added Redis caching, and enforced consent controls with CSP and OWASP.",
        "Built npm UI component packages to an internal registry; added serverless endpoints on AWS Lambda/API Gateway, integrated Datadog, and delivered cost optimization with batching and caching.",
        "Integrated Microsoft Clarity, Amplitude, and SEO meta for UX insights and discoverability.",
        "Deployed on Vercel with CI/CD gates, Playwright e2e tests, and ESLint/Prettier."
      ]
    },
    {
      company: "Hexotix",
      role: "Software Engineer",
      duration: "Apr 2022 – Jan 2023",
      location: "India",
      responsibilities: [
        "Developed a URL shortener with React, Node.js, Express; persisted in MongoDB, added analytics, QR, and ratelimiting; containerized with Docker and deployed via AWS CloudFormation.",
        "Hardened security with ACM TLS via Route 53/CloudFront; malicious URL checks using VirusTotal API and heuristics; JWT auth, OWASP headers, and alerts via CloudWatch/SNS.",
        "Integrated payments with Stripe and Pabbly via webhooks; built serverless workers on AWS Lambda, added SQS/SNS for async jobs, and shipped OpenAPI specs and Postman tests.",
        "Shipped CI/CD with GitHub Actions, Dockerized builds, and IaC reviews."
      ]
    },
    {
      company: "Parul University",
      role: "Teaching Assistant - DBMS Lab",
      duration: "Nov 2021 – April 2022",
      location: "Parul University, India",
      responsibilities: [
        "Illumined paths in C Programming and Database Mysteries for aspiring minds.",
        "Resolved enigmas in practical realms, guiding seekers through experimental odysseys.",
        "Evaluated quests and bestowed insights to elevate understanding.",
        "Allied with elders to refine lab scriptures and enrich curricular tapestries.",
        "Convened wisdom circles and crafted auxiliary artifacts to kindle learning flames."
      ]
    },
    {
      company: "AIESEC",
      role: "Technical Lead - Leadership Development",
      duration: "Sep 2022 – Jul 2023",
      location: "Gujarat, India",
      responsibilities: [
        "Led eight digital artisans to fortify organizational auras, swelling online harmonies by 65%.",
        "Deployed data-driven enchantments with analytic tools, amplifying campaign potencies by 50%.",
        "Birthed automated chronicles, slashing manual labors by 70% and sharpening decisional blades.",
        "Forged alliances with five tech titans, birthing sponsored convergences for youthful spirits."
      ]
    },
    {
      company: "Google Developer Student Clubs",
      role: "Technical Campaign Manager",
      duration: "Sep 2020 – Jul 2021",
      location: "Parul University",
      responsibilities: [
        "Orchestrated technical symposia and coding rites, tripling fellowship and igniting tech passions.",
        "Executed over ten campaigns touching a thousand souls, centered on emergent wonders.",
        "Established mentorship bridges linking fifty seekers to industry sages, yielding fifteen apprenticeships.",
        "Instated efficacy oracles for workshops, harvesting 90% affirmative echoes."
      ]
    }
  ],
  projects: {
    "AI/ML": [
      {
        name: "AI Cover Letter Generator",
        demoLink: "https://coverai.sutralink.com/",
        summary: "AI-powered cover letter generator with multi-AI integration (ChatGPT, Gemini, Claude) for transforming resumes into professional cover letters using advanced RAG techniques."
      },
      {
        name: "ResAI - AI-Powered Resume Builder",
        demoLink: "https://resai.sutralink.com/",
        summary: "Next.js-powered resume builder with multi-AI integration (Gemini, Claude, ChatGPT) for precision-crafted resumes that bridge opportunity gaps."
      },
      {
        name: "Sutralink - AI Agent Platform",
        demoLink: "https://sutralink.com",
        summary: "Autonomous AI agents that orchestrate workflows with unseen elegance, weaving intelligence into the fabric of existence."
      },
      {
        name: "Psicota GPT",
        demoLink: "https://psicota-gpt.vercel.app/",
        sourceCode: "https://github.com/Anjan50/psicota-gpt",
        summary: "AI-powered marketing analytics tool using machine learning and natural language processing for actionable insights."
      }
    ],
    "Software": [
      {
        name: "GitHub Contribution Analyzer",
        demoLink: "https://youtu.be/71kupocbLWg?si=IeWOfykkLjSN1TCN",
        githubLink: "https://github.com/Anjan50/GitHub_Contribution_Analyzer",
        sourceCode: "https://github.com/Anjan50/github-contribution-analyzer",
        summary: "Full-stack analytics platform for processing GitHub data and visualizing contribution patterns with real-time insights."
      },
      {
        name: "BankGuard",
        sourceCode: "https://github.com/Anjan50/bankguard",
        summary: "Secure banking platform with user registration, PIN management, cash transactions, and comprehensive financial services."
      },
      {
        name: "English Dictionary App",
        demoLink: "https://dictionary-english.vercel.app/",
        sourceCode: "https://github.com/Anjan50/english-dictionary-app",
        summary: "User-friendly English dictionary application with fast search functionality and comprehensive word definitions."
      },
      {
        name: "3D Portfolio",
        demoLink: "https://anjan-portfolio.vercel.app/",
        sourceCode: "https://github.com/Anjan50/3d-portfolio",
        summary: "Minimalist portfolio website showcasing 3D models and animations with interactive viewer and modern design."
      },
      {
        name: "Go Feature Flag Service",
        summary: "High-performance feature flag service built with Go, featuring gRPC/REST APIs, real-time propagation, and comprehensive monitoring capabilities."
      }
    ],
    "Blockchain": [
      {
        name: "UltraX DEX Platform",
        summary: "Advanced decentralized exchange platform with on-chain orderbook, AMM functionality, real-time price APIs, and multi-chain bridge capabilities. Set up price APIs and built real-time graphs for token trading views, pulling data for current prices, volumes, and 24-hour highs and lows. Made the on-chain orderbook smooth and user-friendly, tying into EVM chains and Bitcoin bridges.",
        technologies: ["Solidity", "EVM", "React/Next.js", "TypeScript", "ethers.js", "The Graph", "TradingView", "AWS/GCP", "Hardhat", "Smart Contracts", "Cross-chain Bridge", "Orderbook DEX", "Real-time APIs", "Web3 Integration"]
      },
      {
        name: "ENS Domain Dashboard",
        demoLink: "https://ens-test-dashboard.vercel.app/recent-sale",
        summary: "Dashboard providing insights into ENS domains with historical usage, SEO metrics, and backlink analysis for informed domain valuation decisions."
      },
      {
        name: "Varnatva - Decentralized Commenting",
        demoLink: "https://blockchain-comment.vercel.app/",
        summary: "Blockchain-powered decentralized commenting system enabling secure and verifiable engagement across the web with unified reputation and transparency."
      },
      {
        name: "WebThreeter",
        demoLink: "http://web-threeter.vercel.app/",
        summary: "Web3 decentralized Twitter concept leveraging blockchain technology for secure, censorship-resistant microblogging with data ownership features."
      },
      {
        name: "BlockChain Medical Data Sharing",
        demoLink: "https://blockchain-medical-history.vercel.app/",
        summary: "Decentralized healthcare platform integrating blockchain technology for secure patient medical history management."
      },
      {
        name: "Crypto Merch Store",
        demoLink: "http://crypto-merchs.vercel.app/",
        summary: "Online marketplace for cryptocurrency-themed merchandise with secure payment processing, inventory management, and crypto payment integration."
      },
      {
        name: "Crickwitter",
        demoLink: "https://crickwitter.vercel.app/",
        summary: "Blockchain-powered social media platform for cricket enabling text-based posts and real-time match analysis with decentralized interactions."
      }
    ],
    "Network": [
      {
        name: "Network Protocols Experimentation Project",
        githubLink: "https://github.com/Anjan50/multi-protocol-file-transfer",
        summary: "Comprehensive analysis of network protocols including HTTP/1.1, HTTP/2, gRPC, and BitTorrent for performance evaluation."
      },
      {
        name: "Kubernetes Overlay Network Performance Optimization",
        summary: "Research on performance optimizations in Kubernetes overlay networks using RPS and RFS for VXLAN-based Calico networks."
      },
      {
        name: "TCP Cubic vs DCTCP: Evaluating Congestion Control",
        summary: "Comprehensive analysis of TCP Cubic and DCTCP congestion control algorithms using ns-3 network simulator."
      }
    ]
  },
  achievements: [
    {
      text: "Attained a pinnacle rating of 1782 on LeetCode (elite 2%), unraveling 500+ enigmas with unwavering contest devotion.",
      link: "https://leetcode.com/u/an_diyora/"
    },
    {
      text: "Unveiled a treatise on 'Blockchain: Universal Medical Datacare with Personal Healthcare Identity' in Researchgate's halls (October 2022), echoing through 150+ citations.",
      link: "https://www.researchgate.net/profile/Urmilkumar-Bhavsar/publication/364695214_Blockchain_Universal_Medical_Datacare_with_Personal_Healthcare_Identity/links/635799508d4484154a31beef/Blockchain-Universal-Medical-Datacare-with-Personal-Healthcare-Identity.pdf"
    },
    {
      text: "Guided kin to ICC Global Hackathon finals, birthing 'FanFin'—a fintech symphony for sports communion, offered to ICC elders."
    },
    {
      text: "Claimed supremacy in university coding arenas, dissolving algorithmic veils with optimal revelations."
    }
  ],
  certifications: [
    {
      name: "Google Cloud Essentials",
      issuer: "Google",
      description: "Comprehensive understanding of Google Cloud Platform fundamentals, including compute, storage, networking, and security services."
    },
    {
      name: "Google IT Support",
      issuer: "Google",
      description: "Professional IT support certification covering troubleshooting, customer service, networking, operating systems, and system administration."
    },
    {
      name: "Bits and Bytes of Computer Networking",
      issuer: "Google",
      description: "In-depth knowledge of computer networking principles, protocols, and infrastructure design for modern IT environments."
    },
    {
      name: "System Administration and IT Infrastructure Services",
      issuer: "Google",
      description: "Advanced system administration skills including infrastructure management, security implementation, and service optimization."
    }
  ]
};

function App() {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [hasValidKey, setHasValidKey] = useState(false);
  const [testingKey, setTestingKey] = useState(false);
  const [apiKeyError, setApiKeyError] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // 'chat' or 'profile' - default to profile

  const [profile, setProfile] = useState(defaultProfile);
  const [chatMode, setChatMode] = useState('information'); // 'information' or 'questions'
  const [informationMessages, setInformationMessages] = useState([]);
  const [questionsMessages, setQuestionsMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [attachedImages, setAttachedImages] = useState([]);

  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load stored values on first render
  useEffect(() => {
    try {
      const storedKey = window.localStorage.getItem(API_KEY_STORAGE_KEY);
      if (storedKey) {
        setApiKeyInput(storedKey);
        setHasValidKey(true);
      }
    } catch {
      // ignore
    }

    try {
      const storedProfile = window.localStorage.getItem(PROFILE_STORAGE_KEY);
      if (storedProfile) {
        const parsed = JSON.parse(storedProfile);
        setProfile({ ...defaultProfile, ...parsed });
      }
    } catch {
      // fall back to default profile
    }

    try {
      const storedChat = window.localStorage.getItem(CHAT_STORAGE_KEY);
      if (storedChat) {
        const parsed = JSON.parse(storedChat);
        if (parsed && typeof parsed === 'object') {
          if (parsed.information && Array.isArray(parsed.information)) {
            setInformationMessages(parsed.information);
          }
          if (parsed.questions && Array.isArray(parsed.questions)) {
            setQuestionsMessages(parsed.questions);
          }
          if (parsed.jobDescription) {
            setJobDescription(parsed.jobDescription);
          }
        } else if (Array.isArray(parsed) && parsed.length > 0) {
          // Legacy format - migrate to new format
          setInformationMessages(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist profile whenever it changes
  useEffect(() => {
    try {
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  // Persist chat history
  useEffect(() => {
    try {
      const chatData = {
        information: informationMessages,
        questions: questionsMessages,
        jobDescription: jobDescription,
      };
      window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatData));
    } catch {
      // ignore
    }
  }, [informationMessages, questionsMessages, jobDescription]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [informationMessages, questionsMessages, chatLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [chatInput, attachedImages]);

  // Handle image paste
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf('image') !== -1) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) {
            handleImageFile(file);
          }
          break;
        }
      }
    };

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('paste', handlePaste);
      return () => textarea.removeEventListener('paste', handlePaste);
    }
  }, []);

  const handleImageFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      const imageData = {
        id: Date.now(),
        data: base64,
        type: file.type,
        name: file.name,
      };
      setAttachedImages(prev => [...prev, imageData]);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
    e.target.value = '';
  };

  const removeImage = (id) => {
    setAttachedImages(prev => prev.filter(img => img.id !== id));
  };

  const handleTestKey = async () => {
    setTestingKey(true);
    setApiKeyError('');
    try {
      const res = await fetch(CLAUDE_API_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKeyInput.trim(),
          'anthropic-version': CLAUDE_API_VERSION,
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: CLAUDE_MODEL,
          max_tokens: 10,
          system: 'You are a personal oracle verifying the presence of a valid key. Reply with a brief greeting.',
          messages: [
            {
              role: 'user',
              content: 'Say hello',
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error('Invalid API key');
      }

      const data = await res.json();
      if (!data || !Array.isArray(data.content)) {
        throw new Error('Unexpected response');
      }

      window.localStorage.setItem(API_KEY_STORAGE_KEY, apiKeyInput.trim());
      setHasValidKey(true);
      setApiKeyError('');
      setShowSidebar(false);
    } catch (err) {
      console.error(err);
      setHasValidKey(false);
      setApiKeyError('Invalid API key. Please check and try again.');
    } finally {
      setTestingKey(false);
    }
  };

  const getStoredApiKey = () => {
    try {
      return window.localStorage.getItem(API_KEY_STORAGE_KEY);
    } catch {
      return null;
    }
  };

  const callClaude = async ({ system, messages, maxTokens }) => {
    const key = getStoredApiKey();
    if (!key) {
      throw new Error('No API key available');
    }

    const res = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': CLAUDE_API_VERSION,
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: maxTokens,
        system,
        messages,
      }),
    });

    if (!res.ok) {
      let errorMessage = `API error: ${res.status}`;
      try {
        const errorData = await res.json();
        if (errorData?.error?.message) {
          errorMessage = errorData.error.message;
        }
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }

    return res.json();
  };

  const handleChatSubmit = async (e) => {
    e?.preventDefault();
    const text = chatInput.trim();
    if ((!text && attachedImages.length === 0) || chatLoading) return;

    // Get current messages based on mode
    const currentMessages = chatMode === 'information' ? informationMessages : questionsMessages;
    const setCurrentMessages = chatMode === 'information' ? setInformationMessages : setQuestionsMessages;

    // Build message content - can include text and images
    const messageContent = [];
    if (text) {
      messageContent.push({ type: 'text', text });
    }
    attachedImages.forEach(img => {
      // Extract base64 data (remove data:image/...;base64, prefix)
      const base64Data = img.data.split(',')[1];
      const mediaType = img.type || 'image/png';
      messageContent.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: mediaType,
          data: base64Data,
        },
      });
    });

    const newUserMessage = {
      role: 'user',
      content: messageContent.length === 1 && messageContent[0].type === 'text'
        ? text // Simple text message
        : messageContent, // Multi-part message with images
      images: attachedImages, // Store for display
    };

    const updatedMessages = [...currentMessages, newUserMessage];
    setCurrentMessages(updatedMessages);
    setChatInput('');
    setAttachedImages([]);
    setChatLoading(true);

    const hasImages = attachedImages.length > 0;

    let systemPrompt = '';
    let apiMessages = [];

    // Build the user message for API
    const userMessageContent = [];
    if (text) {
      if (chatMode === 'information') {
        // Information mode - simple, just answer the question
        userMessageContent.push({
          type: 'text',
          text: `${text}\n\nPORTFOLIO DATA:\n${JSON.stringify(portfolioData, null, 2)}`,
        });
      } else {
        // Questions mode - structured with job description
        const jobContext = jobDescription.trim()
          ? `\n\nCRITICAL: A job description has been provided. You MUST tailor your answer specifically to this job description. Match the requirements, skills, and responsibilities mentioned in the job description with Anjan's experience and skills. Always align your response to show how Anjan fits this specific role.\n\nJOB DESCRIPTION:\n${jobDescription}`
          : '';

        userMessageContent.push({
          type: 'text',
          text: `${text}\n\nPORTFOLIO DATA:\n${JSON.stringify(portfolioData, null, 2)}${jobContext}`,
        });
      }
    }

    // Add images to message content
    attachedImages.forEach(img => {
      const base64Data = img.data.split(',')[1];
      const mediaType = img.type || 'image/png';
      userMessageContent.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: mediaType,
          data: base64Data,
        },
      });
    });

    if (chatMode === 'information') {
      // Information mode - simple, straightforward answers
      systemPrompt = `You are EchoForge, an assistant providing information about Anjan Diyora's portfolio and background.

RESPONSE STYLE:
- Provide clear, direct answers to questions
- Use simple, readable formatting
- Use **bold** for emphasis when needed
- Use bullet points (-) for lists
- Keep responses informative and concise
- Reference the portfolio data provided

PORTFOLIO DATA:
${JSON.stringify(portfolioData, null, 2)}

${hasImages ? 'The user has shared an image. Analyze it carefully and provide relevant information based on what you see.' : ''}

Answer the question directly and clearly. Use normal formatting - no excessive markdown structure.`;

      apiMessages = [
        ...updatedMessages.slice(0, -1).map(m => {
          if (typeof m.content === 'string') {
            return { role: m.role, content: m.content };
          }
          return { role: m.role, content: m.content };
        }),
        {
          role: 'user',
          content: userMessageContent.length === 1 && userMessageContent[0].type === 'text'
            ? userMessageContent[0].text
            : userMessageContent,
        },
      ];
    } else {
      // Questions mode - structured, professional responses
      const jobDescContext = jobDescription.trim() 
        ? `\n\nCRITICAL: A job description has been provided. You MUST tailor your answer specifically to this job description. Match the requirements, skills, and responsibilities mentioned in the job description with Anjan's experience and skills. Always align your response to show how Anjan fits this specific role.\n\nJOB DESCRIPTION:\n${jobDescription}`
        : '';

      systemPrompt = `You are EchoForge, a professional assistant crafting job application responses for Anjan Diyora.

RESPONSE FORMATTING RULES - USE PROPER MARKDOWN STRUCTURE:
- ALWAYS structure responses with clear markdown formatting:
  * Use # for main headings, ## for subheadings, ### for sub-sections
  * Use **bold** for emphasis and important points
  * Use *italic* for subtle emphasis
  * Use bullet points (-) or numbered lists (1. 2. 3.) for multiple items
  * Use > for block quotes when appropriate
  * Use \`code\` for technical terms, technologies, or code snippets
  * Use \`\`\`code blocks\`\`\` for multi-line code or structured data
  * Use proper line breaks (double newline) between sections
  * Use horizontal rules (---) to separate major sections when needed

STRUCTURE YOUR RESPONSES:
- Start with a clear heading if the response has multiple sections
- Use subheadings to organize different topics
- Group related information together
- Use lists for enumerations (skills, projects, achievements, etc.)
- Use paragraphs for narrative content
- End with a clear conclusion or summary when appropriate

ANSWER LENGTH GUIDELINES:
- For application questions (Why this company? Tell us about yourself? etc.): Keep concise, 2-3 paragraphs (100-150 words)
- For informational questions (What projects have you worked on? What are your skills? etc.): Provide FULL details with all relevant information, use headings and lists
- For form-filling questions: Format as a clean list or table. Use bullet points with **Field Name:** followed by the answer on the same line, OR use a two-column format. Make it easy to scan and copy.
- Always match the depth required by the question type

FORM RESPONSE FORMATTING:
- When filling out forms, use this format:
  * **Field Name:** Answer value
  * Each field on its own line
  * Group related fields together with a heading if needed
  * Use bullet points (-) for lists of fields
  * Keep formatting clean and scannable

CONTENT REQUIREMENTS:
- Be specific and concrete - mention actual projects, technologies, and experiences from the portfolio
- Start directly with the answer - no unnecessary filler phrases
- Connect ideas naturally with smooth transitions
- Write as if Anjan is speaking directly and professionally
- Use concrete examples, not vague statements
- Show alignment with job requirements through specific experiences when relevant
- Format technical terms, company names, and technologies with \`backticks\` for clarity
- Make content smart and insightful - show understanding of the role and how Anjan fits

PORTFOLIO DATA:
${JSON.stringify(portfolioData, null, 2)}
${jobDescContext}

${hasImages ? 'The user has shared an image. Analyze it carefully and provide relevant insights based on what you see.' : ''}

IMPORTANT: Always format your response using proper markdown structure with headings, lists, bold text, and code formatting. Make it visually organized and easy to scan. Structure information hierarchically with clear sections. Craft smart, insightful responses that demonstrate understanding.`;

      apiMessages = [
        ...updatedMessages.slice(0, -1).map(m => {
          if (typeof m.content === 'string') {
            return { role: m.role, content: m.content };
          }
          return { role: m.role, content: m.content };
        }),
        {
          role: 'user',
          content: userMessageContent.length === 1 && userMessageContent[0].type === 'text'
            ? userMessageContent[0].text
            : userMessageContent,
        },
      ];
    }

    try {
      const data = await callClaude({
        system: systemPrompt,
        messages: apiMessages,
        maxTokens: 2000,
      });

      let responseText =
        data &&
        Array.isArray(data.content) &&
        data.content[0] &&
        typeof data.content[0].text === 'string'
          ? data.content[0].text
          : 'Sorry, I could not generate a response.';

      // Clean response: preserve markdown formatting but clean up excessive whitespace
      responseText = responseText
        .replace(/\n{4,}/g, '\n\n\n') // Limit excessive newlines to max 3
        .replace(/^\s+|\s+$/gm, '') // Trim each line
        .trim();

      // Extra formatting for form-style answers (common in Questions tab)
      // If we detect multiple bold fields in a row, rebuild that block
      const boldMatches = [...responseText.matchAll(/\*\*[^*]+\*\*/g)];
      if (boldMatches.length >= 3 && !responseText.includes('\n- **')) {
        let rebuilt = '';
        let lastIndex = 0;

        for (let i = 0; i < boldMatches.length; i++) {
          const match = boldMatches[i];
          const nextMatch = boldMatches[i + 1];

          // Intro text before the first bold stays as-is
          if (i === 0 && match.index > 0) {
            rebuilt += responseText.slice(0, match.index).trim() + '\n\n';
          }

          const fieldLabel = match[0]; // e.g. **First Name**
          const valueStart = match.index + match[0].length;
          const valueEnd = nextMatch ? nextMatch.index : responseText.length;
          const rawValue = responseText.slice(valueStart, valueEnd).trim();

          // Build clean bullet line: "- **Field Name** value"
          rebuilt += `- ${fieldLabel}${rawValue ? ' ' + rawValue : ''}\n`;

          lastIndex = valueEnd;
        }

        // Append any trailing text after the last bold block
        if (lastIndex < responseText.length) {
          const tail = responseText.slice(lastIndex).trim();
          if (tail) {
            rebuilt += '\n' + tail;
          }
        }

        responseText = rebuilt.trim();
      }

      setCurrentMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `Sorry, I encountered an error: ${err.message}. Please check your API key and try again.`,
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleNewChat = () => {
    if (chatMode === 'information') {
      setInformationMessages([]);
    } else {
      setQuestionsMessages([]);
    }
  };

  const handleClearProfile = () => {
    if (confirm('Clear all profile data? This cannot be undone.')) {
      setProfile(defaultProfile);
      setInformationMessages([]);
      setQuestionsMessages([]);
      setJobDescription('');
      try {
        window.localStorage.removeItem(PROFILE_STORAGE_KEY);
        window.localStorage.removeItem(CHAT_STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  };

  const handleExportProfile = () => {
    try {
      const payload = {
        profile,
        chatHistory: {
          information: informationMessages,
          questions: questionsMessages,
        },
        jobDescription,
        exportedAt: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'echoForge-export.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to export data');
    }
  };

  const handleImportProfile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        const parsed = JSON.parse(text);
        if (parsed.profile) {
          setProfile({ ...defaultProfile, ...parsed.profile });
        }
        if (parsed.chatHistory) {
          if (parsed.chatHistory.information && Array.isArray(parsed.chatHistory.information)) {
            setInformationMessages(parsed.chatHistory.information);
          }
          if (parsed.chatHistory.questions && Array.isArray(parsed.chatHistory.questions)) {
            setQuestionsMessages(parsed.chatHistory.questions);
          }
          // Legacy format support
          if (Array.isArray(parsed.chatHistory)) {
            setInformationMessages(parsed.chatHistory);
          }
        }
        if (parsed.jobDescription) {
          setJobDescription(parsed.jobDescription);
        }
        alert('Data imported successfully!');
      } catch (err) {
        alert('Failed to import data. Invalid file format.');
      } finally {
        event.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  const handleResetKey = () => {
    try {
      window.localStorage.removeItem(API_KEY_STORAGE_KEY);
    } catch {
      // ignore
    }
    setApiKeyInput('');
    setHasValidKey(false);
    setApiKeyError('');
  };

  if (!hasValidKey) {
    return (
      <div className="app-container">
        <div className="auth-screen">
          <div className="auth-card">
            <h1 className="auth-title">EchoForge</h1>
            <p className="auth-subtitle">Your personal job application assistant</p>
            
            <div className="auth-form">
              <label className="auth-label">Enter your Claude API Key</label>
              <input
                type="password"
                className="auth-input"
                placeholder="sk-ant-..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTestKey()}
              />
              {apiKeyError && <p className="auth-error">{apiKeyError}</p>}
              <button
                className="auth-button"
                onClick={handleTestKey}
                disabled={!apiKeyInput.trim() || testingKey}
              >
                {testingKey ? 'Testing...' : 'Continue'}
              </button>
              <p className="auth-note">
                Your API key is stored locally and never sent to any server except Claude's API.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className={`sidebar ${showSidebar ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <button className="sidebar-new-chat" onClick={handleNewChat}>
            <span>+</span> New Chat
          </button>
          <button className="sidebar-close" onClick={() => setShowSidebar(false)}>
            ×
          </button>
        </div>

        <div className="sidebar-content">
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">Navigation</h3>
            <button 
              className={`sidebar-button ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => { setActiveTab('chat'); setShowSidebar(false); }}
            >
              💬 Chat
            </button>
            <button 
              className={`sidebar-button ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => { setActiveTab('profile'); setShowSidebar(false); }}
            >
              👤 My Profile
            </button>
          </div>
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">Settings</h3>
            <button className="sidebar-button" onClick={() => setShowSidebar(false)}>
              API Key Settings
            </button>
            <button className="sidebar-button" onClick={handleExportProfile}>
              Export Data
            </button>
            <label className="sidebar-button">
              Import Data
              <input
                type="file"
                accept="application/json"
                onChange={handleImportProfile}
                style={{ display: 'none' }}
              />
            </label>
            <button className="sidebar-button" onClick={handleClearProfile}>
              Clear All Data
            </button>
            <button className="sidebar-button" onClick={handleResetKey}>
              Change API Key
            </button>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Header */}
        <div className="chat-header">
          <button className="menu-button" onClick={() => setShowSidebar(true)}>
            ☰
          </button>
          <div className="header-tabs">
            <button
              className={`header-tab ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              Chat
            </button>
            <button
              className={`header-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              My Profile
            </button>
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="profile-tab-content">
            <div className="profile-container">
              {/* Personal Info */}
              <section className="profile-section">
                <h2 className="profile-section-title">Personal Information</h2>
                <div className="profile-info-grid">
                  <div className="profile-info-item">
                    <strong>Name:</strong> {portfolioData.personalInfo.name}
                  </div>
                  <div className="profile-info-item">
                    <strong>Location:</strong> {portfolioData.personalInfo.location}
                  </div>
                  {portfolioData.personalInfo.address && (
                    <div className="profile-info-item">
                      <strong>Address:</strong> {portfolioData.personalInfo.address}
                    </div>
                  )}
                  <div className="profile-info-item">
                    <strong>Email:</strong> <a href={`mailto:${portfolioData.personalInfo.email}`}>{portfolioData.personalInfo.email}</a>
                  </div>
                  {portfolioData.personalInfo.emailAlt && (
                    <div className="profile-info-item">
                      <strong>Email (Alt):</strong> <a href={`mailto:${portfolioData.personalInfo.emailAlt}`}>{portfolioData.personalInfo.emailAlt}</a>
                  </div>
                  )}
                  <div className="profile-info-item">
                    <strong>Phone:</strong> {portfolioData.personalInfo.phone}
                  </div>
                  {portfolioData.personalInfo.website && (
                    <div className="profile-info-item">
                      <strong>Website:</strong> <a href={`https://${portfolioData.personalInfo.website}`} target="_blank" rel="noopener noreferrer">{portfolioData.personalInfo.website}</a>
                    </div>
                  )}
                  <div className="profile-info-item">
                    <strong>Visa Status:</strong> {portfolioData.personalInfo.visaStatus}
                  </div>
                  <div className="profile-info-item">
                    <strong>Status:</strong> {portfolioData.personalInfo.about.status}
                  </div>
                  {portfolioData.personalInfo.ethereumAddress && (
                    <div className="profile-info-item">
                      <strong>Ethereum Address:</strong> <a href={`https://etherscan.io/address/${portfolioData.personalInfo.ethereumAddress}`} target="_blank" rel="noopener noreferrer">{portfolioData.personalInfo.ethereumAddress}</a>
                    </div>
                  )}
                  {portfolioData.personalInfo.ensDomain && (
                    <div className="profile-info-item">
                      <strong>ENS Domain:</strong> {portfolioData.personalInfo.ensDomain}
                    </div>
                  )}
                </div>
                <div className="profile-links">
                  <a href={portfolioData.personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href={portfolioData.personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href={portfolioData.personalInfo.socialLinks.leetcode} target="_blank" rel="noopener noreferrer">LeetCode</a>
                  <a href={portfolioData.personalInfo.socialLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
                <p className="profile-description">{portfolioData.personalInfo.about.description}</p>
              </section>

              {/* Education */}
              <section className="profile-section">
                <h2 className="profile-section-title">Education</h2>
                {portfolioData.education.map((edu, idx) => (
                  <div key={idx} className="education-item">
                    <h3>{edu.degree}</h3>
                    <p className="education-school">{edu.school}</p>
                    <p className="education-details">{edu.duration} • {edu.location} • {edu.gpa}</p>
                  </div>
                ))}
              </section>

              {/* Experience */}
              <section className="profile-section">
                <h2 className="profile-section-title">Experience</h2>
                {portfolioData.experience.map((exp, idx) => (
                  <div key={idx} className="experience-item">
                    <div className="experience-header">
                      <h3>{exp.role}</h3>
                      <span className="experience-company">{exp.company}</span>
                      <span className="experience-duration">{exp.duration}</span>
                      <span className="experience-location">{exp.location}</span>
                    </div>
                    <ul className="experience-responsibilities">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              {/* Skills */}
              <section className="profile-section">
                <h2 className="profile-section-title">Skills</h2>
                {Object.entries(portfolioData.skills).map(([category, skills]) => (
                  <div key={category} className="skills-category">
                    <h3>{category}</h3>
                    <div className="skills-list">
                      {skills.map((skill, idx) => (
                        <span key={idx} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>

              {/* Projects */}
              <section className="profile-section">
                <h2 className="profile-section-title">Projects</h2>
                {Object.entries(portfolioData.projects).map(([category, projects]) => (
                  <div key={category} className="projects-category">
                    <h3>{category}</h3>
                    {projects.map((project, idx) => (
                      <div key={idx} className="project-item">
                        <h4>{project.name}</h4>
                        <p>{project.summary}</p>
                        <div className="project-links">
                          {project.demoLink && <a href={project.demoLink} target="_blank" rel="noopener noreferrer">Demo</a>}
                          {project.sourceCode && <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">Source</a>}
                          {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </section>

              {/* Achievements */}
              <section className="profile-section">
                <h2 className="profile-section-title">Achievements</h2>
                <ul className="achievements-list">
                  {portfolioData.achievements.map((ach, idx) => (
                    <li key={idx}>
                      {ach.link ? <a href={ach.link} target="_blank" rel="noopener noreferrer">{ach.text}</a> : ach.text}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Certifications */}
              <section className="profile-section">
                <h2 className="profile-section-title">Certifications</h2>
                {portfolioData.certifications.map((cert, idx) => (
                  <div key={idx} className="certification-item">
                    <h4>{cert.name}</h4>
                    <p className="cert-issuer">{cert.issuer}</p>
                    <p>{cert.description}</p>
                  </div>
                ))}
              </section>
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <>
            {/* Chat Mode Tabs */}
            <div className="chat-mode-tabs">
              <button
                className={`chat-mode-tab ${chatMode === 'information' ? 'active' : ''}`}
                onClick={() => setChatMode('information')}
              >
                📋 Information
              </button>
              <button
                className={`chat-mode-tab ${chatMode === 'questions' ? 'active' : ''}`}
                onClick={() => setChatMode('questions')}
              >
                ❓ Questions
              </button>
            </div>

            {/* Job Description Input - Only in Questions mode */}
            {chatMode === 'questions' && (
              <div className="job-description-section">
                <label className="job-description-label">
                  Job Description (Optional - will be used to tailor responses)
                </label>
                <textarea
                  className="job-description-input"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste job description here... (Press Enter in chat to use this description)"
                  rows={4}
                />
              </div>
            )}

            {/* Messages */}
            <div className={`chat-messages ${chatMode === 'information' ? 'information-mode' : 'questions-mode'}`}>
              {(chatMode === 'information' ? informationMessages : questionsMessages).length === 0 ? (
                <div className="chat-welcome">
                  <h2>Welcome to EchoForge</h2>
                  {chatMode === 'information' ? (
                    <>
                      <p>Ask me anything about Anjan's portfolio, experience, skills, or projects.</p>
                      <ul>
                        <li>What projects have you worked on?</li>
                        <li>What are your skills?</li>
                        <li>Tell me about your experience</li>
                        <li>What technologies do you know?</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p>I can help you craft professional job application responses.</p>
                      <ul>
                        <li>Why this company?</li>
                        <li>Tell us about yourself</li>
                        <li>Why are you interested in this role?</li>
                        <li>What makes you a good fit?</li>
                      </ul>
                      <p className="chat-welcome-hint">
                        {jobDescription.trim() 
                          ? 'Job description is set! Ask questions and I\'ll tailor responses accordingly.'
                          : 'Add a job description above to get tailored responses!'}
                      </p>
                    </>
                  )}
                </div>
              ) : (
                (chatMode === 'information' ? informationMessages : questionsMessages).map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="message-content">
                  {/* Display images if present */}
                  {msg.images && msg.images.length > 0 && (
                    <div className="message-images">
                      {msg.images.map((img) => (
                        <div key={img.id} className="message-image-wrapper">
                          <img
                            src={img.data}
                            alt={img.name || 'Attached image'}
                            className="message-image"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Display text content with full markdown support */}
                  {typeof msg.content === 'string' ? (
                    <ReactMarkdown
                      components={{
                        p: ({node, ...props}) => <p style={{margin: '8px 0', lineHeight: '1.8'}} {...props} />,
                        ul: ({node, ...props}) => <ul style={{margin: '12px 0', paddingLeft: '24px'}} {...props} />,
                        li: ({node, ...props}) => <li style={{margin: '6px 0', lineHeight: '1.7'}} {...props} />,
                        strong: ({node, ...props}) => <strong style={{color: '#10a37f', fontWeight: 600}} {...props} />,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    // Multi-part content (text + images)
                    msg.content?.map((part, partIdx) => {
                      if (part.type === 'text') {
                        return (
                          <ReactMarkdown
                            key={partIdx}
                            components={{
                              p: ({node, ...props}) => <p style={{margin: '8px 0', lineHeight: '1.8'}} {...props} />,
                              ul: ({node, ...props}) => <ul style={{margin: '12px 0', paddingLeft: '24px'}} {...props} />,
                              li: ({node, ...props}) => <li style={{margin: '6px 0', lineHeight: '1.7'}} {...props} />,
                              strong: ({node, ...props}) => <strong style={{color: '#10a37f', fontWeight: 600}} {...props} />,
                            }}
                          >
                            {part.text}
                          </ReactMarkdown>
                        );
                      }
                      return null;
                    })
                  )}
                </div>
              </div>
                ))
              )}
              {chatLoading && (
                <div className="message assistant">
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </>
        )}

        {/* Input Area - Only show in chat tab */}
        {activeTab === 'chat' && (
        <div className="chat-input-container">
          {attachedImages.length > 0 && (
            <div className="attached-images">
              {attachedImages.map((img) => (
                <div key={img.id} className="attached-image-preview">
                  <img src={img.data} alt={img.name || 'Preview'} />
                  <button
                    type="button"
                    className="remove-image-button"
                    onClick={() => removeImage(img.id)}
                    title="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <form onSubmit={handleChatSubmit} className="chat-input-form">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              className="chat-attach-button"
              onClick={() => fileInputRef.current?.click()}
              title="Attach image (or paste screenshot)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
              </svg>
            </button>
            <textarea
              ref={textareaRef}
              className="chat-input"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleChatSubmit();
                }
              }}
              placeholder="Type your message, paste your resume, or paste a screenshot..."
              rows={1}
            />
            <button
              type="submit"
              className="chat-send-button"
              disabled={(!chatInput.trim() && attachedImages.length === 0) || chatLoading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 11L12 6L17 11M12 18V7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
          <p className="chat-footer-note">
            You can paste images or upload screenshots. EchoForge can make mistakes. Verify important information.
          </p>
        </div>
        )}
      </div>

      {/* Sidebar Overlay */}
      {showSidebar && (
        <div className="sidebar-overlay" onClick={() => setShowSidebar(false)} />
      )}
    </div>
  );
}

export default App;
