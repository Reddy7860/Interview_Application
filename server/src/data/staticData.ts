export interface CompanyValues {
  name: string;
  principles: string[];
  tip?: string;
}

export function getRoles(): string[] {
  return [
    'AI/ML Engineer',
    'Product Manager',
    'Technical Product Manager',
    'Engineering Manager',
    'Software Engineer',
    'Data Scientist',
    'Data Engineer',
    'DevOps Engineer',
    'Frontend Engineer',
    'Backend Engineer',
    'Full Stack Engineer',
    'QA Engineer',
    'Security Engineer',
    'Solutions Architect',
    'Technical Program Manager'
  ];
}

export function getCompanies(): string[] {
  return [
    'Amazon',
    'Google',
    'Microsoft',
    'Meta',
    'Apple',
    'Netflix',
    'Uber',
    'Airbnb',
    'Salesforce',
    'Oracle',
    'IBM',
    'Adobe',
    'LinkedIn',
    'Twitter',
    'Tesla'
  ];
}

export function getExperienceLevels(): string[] {
  return [
    'Junior (0-2 years)',
    'Mid-level (3-5 years)',
    'Senior (6-10 years)',
    'Staff/Principal (10+ years)',
    'Manager/Lead'
  ];
}

export function getQuestions(role?: string): string[] {
  const generalQuestions = [
    'Tell me about a time when you received harsh feedback about your work. How did you respond and improve?',
    'Share a time when you took ownership of a failing project and delivered results.',
    'Tell me about a time when you encountered an unexpected, significant roadblock when working on a large initiative.',
    'Describe a situation where you had to resolve a conflict between two high-performing team members with opposing views on a technical direction.',
    'Tell me about a time you successfully scaled a system, process, or product to meet significant growth or demand.',
    'Describe a project where requirements were unclear or constantly changing—how did you move forward?',
    'Share an example of introducing a new tool, process, or feature under tight time or budget constraints.',
    'Tell me about a time when you had to present bad news to senior leadership—how did you approach it?',
    'Describe a situation where you developed a junior team member into a high-impact contributor.',
    'Tell me about a time you were given feedback that was constructive.',
    'Tell me about a time you had to step up and take responsibility for others.',
    'What is your proudest project, and why?',
    'Describe a time when you had to communicate complex technical findings to a non-technical audience. How did you ensure effective communication?',
    'Describe a situation where you had to prioritize multiple projects simultaneously. How did you manage your time and resources?',
    'Tell me about a time you struggled to work with one of your colleagues on a technical project.',
    'Tell me about a time you had to resolve a conflict in a team.'
  ];

  const mlQuestions = [
    'Tell me about yourself and your experience with machine learning.',
    'Give me an example of a project where you used data and machine learning.',
    'Tell me about a time you faced an obstacle in an ML project and how did you resolve it?',
    'Tell me about a recent/favorite ML project and some of the difficulties you had.',
    'Tell me about a time when your model didn\'t perform as expected. How did you debug and improve it?',
    'Describe a time when you had to make a trade-off between model accuracy and inference time/computational cost.',
    'Tell me about a time when you had to work with engineers to deploy a model into production. What challenges did you face?',
    'Give an example of how you\'ve handled ambiguous requirements in an AI/ML project.',
    'Tell me about a time you maintained an end-to-end ML pipeline in production. Describe your role and what you learned from it.',
    'Tell me about a project where you had to stay up-to-date with the latest developments in ML/AI. How did you keep your skills current?',
    'Describe a time when you had to deal with missing or imbalanced data in your analysis. How did you handle it?',
    'Describe a challenging situation where you had to explain the limitations of a machine learning model to stakeholders.',
    'Give an example of a project where you applied statistical hypothesis testing to draw meaningful conclusions.',
    'Tell me about the greatest accomplishment of your career in AI/ML.'
  ];

  if (role && role.toLowerCase().includes('ml') || role && role.toLowerCase().includes('ai')) {
    return [...generalQuestions, ...mlQuestions];
  }

  return generalQuestions;
}

export function getCompanyValues(company: string): CompanyValues | null {
  const values: Record<string, CompanyValues> = {
    'Amazon': {
      name: 'Amazon',
      principles: [
        'Customer Obsession',
        'Ownership',
        'Invent and Simplify',
        'Are Right, A Lot',
        'Learn and Be Curious',
        'Hire and Develop the Best',
        'Insist on the Highest Standards',
        'Think Big',
        'Bias for Action',
        'Frugality',
        'Earn Trust',
        'Dive Deep',
        'Have Backbone; Disagree and Commit',
        'Deliver Results',
        'Strive to be Earth\'s Best Employer',
        'Success and Scale Bring Broad Responsibility'
      ],
      tip: 'Demonstrate 2-3 leadership principles per answer with specific examples.'
    },
    'Google': {
      name: 'Google',
      principles: [
        'Focus on the user and all else will follow',
        'It\'s best to do one thing really, really well',
        'Fast is better than slow',
        'Democracy on the web works',
        'You don\'t need to be at your desk to need an answer',
        'You can make money without doing evil',
        'There\'s always more information out there',
        'The need for information crosses all borders',
        'You can be serious without a suit',
        'Great just isn\'t good enough'
      ],
      tip: 'Emphasize user-centric thinking, innovation, and technical excellence.'
    },
    'Microsoft': {
      name: 'Microsoft',
      principles: [
        'Innovation',
        'Diversity and Inclusion',
        'Corporate Social Responsibility',
        'Environmental Sustainability',
        'Trust and Integrity',
        'Growth Mindset',
        'Customer Obsession',
        'One Microsoft'
      ],
      tip: 'Highlight innovation, growth mindset, and customer focus.'
    },
    'Meta': {
      name: 'Meta',
      principles: [
        'Move Fast',
        'Be Bold',
        'Focus on Impact',
        'Build Social Value',
        'Be Open',
        'Build Awesome Things'
      ],
      tip: 'Show how you move fast, take risks, and create impact.'
    },
    'Apple': {
      name: 'Apple',
      principles: [
        'Innovation',
        'Simplicity',
        'Attention to Detail',
        'User Experience',
        'Privacy',
        'Environmental Responsibility'
      ],
      tip: 'Emphasize innovation, simplicity, and attention to detail.'
    }
  };

  return values[company] || null;
}

