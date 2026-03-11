export const personalInfo = {
  name: 'Kajuluri Sathwik Akash Reddy',
  shortName: 'Sathwik Akash',
  tagline: 'Computer Science Student | Blockchain & Security Enthusiast',
  roles: ['Low Level Programmer', 'Smart Contract Developer', 'Reverse Engineering Learner', 'Systems Programmer'],
  email: 'sathwikreddy962@gmail.com',
  github: 'https://github.com/0xfroOty',
  linkedin: 'https://www.linkedin.com/in/sathwikreddyk',
  phone: '+91-9121915193',
  about: `I'm a Computer Science student at Lovely Professional University with a deep passion for understanding how systems work at the lowest level. My journey spans blockchain development, cybersecurity, and reverse engineering — areas where curiosity meets technical precision.

I love peeling back abstraction layers: whether that's analyzing ELF binaries, writing Solidity smart contracts, or tracing program execution at the assembly level. Security isn't just a field to me — it's a mindset that shapes how I approach every problem.

Currently diving deep into x86 architecture, binary exploitation, and static/dynamic analysis while building real projects that challenge my understanding of systems from the ground up.`,
};

export const stats = [
  { label: 'Projects',       value: 2,  suffix: ''  },
  { label: 'Certifications', value: 3,  suffix: ''  },
  { label: 'Skills',         value: 25, suffix: '+' },
];

export const learningTopics = [
  'x86 Architecture & Assembly',
  'ELF Binary Structure',
  'Static Binary Analysis',
  'Dynamic Analysis & Debugging',
  'Binary Exploitation',
  'Program Internals',
];

export const education = [
  {
    institution: 'Lovely Professional University',
    degree: 'Bachelor of Technology – Computer Science and Engineering',
    period: 'Aug 2023 – Present',
    year: '2023',
    location: 'Punjab, India',
    current: true,
  },
  {
    institution: 'Narayana Junior College',
    degree: 'Intermediate – PCM',
    period: 'Jul 2021 – Mar 2023',
    year: '2021',
    location: 'Andhra Pradesh, India',
    current: false,
  },
  {
    institution: 'APSP EM School',
    degree: 'Secondary School',
    period: 'Graduated 2021',
    year: '2018',
    location: 'Andhra Pradesh, India',
    current: false,
  },
];

export const skillCategories = [
  {
    title: 'Programming Languages',
    color: '#00FF41',
    skills: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
      { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Solidity', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg' },
      { name: 'Assembly', icon: null },
    ],
  },
  {
    title: 'Blockchain & Web3',
    color: '#FF6B35',
    skills: [
      { name: 'Hardhat', icon: null },
      { name: 'Truffle', icon: null },
      { name: 'Remix IDE', icon: null },
      { name: 'Bitcoin Scripting', icon: null },
      { name: 'Foundry', icon: null },
    ],
  },
  {
    title: 'Security & RE Tools',
    color: '#0D7377',
    skills: [
      { name: 'Ghidra', icon: null },
      { name: 'Radare2', icon: null },
      { name: 'Binary Ninja', icon: null },
      { name: 'IDA Free', icon: null },
      { name: 'GDB', icon: null },
      { name: 'Pwndbg', icon: null },
      { name: 'Burp Suite', icon: null },
      { name: 'Metasploit', icon: null },
      { name: 'Objdump', icon: null },
      { name: 'Strace', icon: null },
    ],
  },
  {
    title: 'Tools & Platforms',
    color: '#a78bfa',
    skills: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
      { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    ],
  },
];

export const softSkills = ['Curious', 'Analytical', 'Creative', 'Open-Minded', 'Persistent'];

export const projects = [
  {
    id: 'bytetrace',
    title: 'ByteTrace',
    featured: true,
    description: 'A reverse engineering exploration project focused on understanding compiled binaries, control flow, and low-level program behavior. Studies executable structure, analyzes control flow graphs, and explores how programs behave internally at the assembly level.',
    longDescription: 'ByteTrace dives deep into the internals of compiled programs — tracing execution paths, analyzing ELF structure, and mapping control flow graphs to understand how high-level code becomes machine instructions.',
    tags: ['Assembly', 'Binary Analysis', 'Reverse Engineering', 'Linux Internals'],
    github: 'https://github.com/0xfroOty/ByteTrace',
    focus: [
      'Binary structure exploration',
      'Control Flow Graph analysis',
      'Assembly-level understanding',
      'Executable behavior tracing',
    ],
    color: '#00FF41',
  },
  {
    id: 'scheduler',
    title: 'Adaptive OS Scheduler',
    featured: false,
    description: 'Implemented an adaptive scheduling algorithm to prioritize real-time tasks based on deadlines, execution time, and system load. Optimizes CPU and memory utilization under dynamic workloads.',
    longDescription: 'A real-time task scheduler built in C++ that dynamically adjusts task priority based on system metrics, ensuring deadline-sensitive processes get the resources they need.',
    tags: ['C++', 'Operating Systems', 'Systems Programming'],
    github: null,
    focus: [
      'Real-time task prioritization',
      'System load monitoring',
      'CPU and memory optimization',
    ],
    color: '#FF6B35',
  },
];

export const certifications = [
  {
    title: 'CompTIA Network+',
    issuer: 'CompTIA',
    icon: '🔐',
    color: '#FF6B35',
    description: 'Networking fundamentals, infrastructure, and security protocols.',
  },
  {
    title: 'QuickHeal DFIR',
    issuer: 'QuickHeal',
    icon: '🔍',
    color: '#00FF41',
    description: 'Digital Forensics and Incident Response methodologies.',
  },
  {
    title: 'CompTIA Security+',
    issuer: 'CompTIA',
    icon: '🛡️',
    color: '#0D7377',
    description: 'Core cybersecurity concepts, threats, and defensive strategies.',
  },
];
