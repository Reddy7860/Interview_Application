"""
Static data for roles, companies, questions, and company values.
"""

def get_roles():
    """Get list of available roles."""
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
    ]


def get_companies():
    """Get list of available companies."""
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
    ]


def get_experience_levels():
    """Get list of experience levels."""
    return [
        'Junior (0-2 years)',
        'Mid-level (3-5 years)',
        'Senior (6-10 years)',
        'Staff/Principal (10+ years)',
        'Manager/Lead'
    ]


def get_questions(role=None):
    """Get list of interview questions, optionally filtered by role."""
    
    # General behavioral questions (apply to all roles)
    general_questions = [
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
    ]

    # AI/ML Engineer specific questions
    ml_questions = [
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
    ]

    # Product Manager specific questions
    product_manager_questions = [
        'Tell me about a time when you had to prioritize features with competing stakeholder interests.',
        'Describe a situation where you had to make a product decision with incomplete data.',
        'Tell me about a time you had to say no to a feature request from an important stakeholder.',
        'Share an example of how you validated a product hypothesis before building it.',
        'Describe a time when you had to pivot a product strategy based on user feedback.',
        'Tell me about a product launch that didn\'t go as planned. What did you learn?',
        'Give an example of how you balanced user needs with business objectives.',
        'Describe a time when you had to work with engineering to scope down a feature to meet a deadline.',
        'Tell me about a time you used data to influence a product decision.',
        'Share an example of how you handled conflicting feedback from different user segments.'
    ]

    # Technical Product Manager specific questions
    technical_pm_questions = [
        'Tell me about a time when you had to translate technical constraints into product requirements.',
        'Describe a situation where you had to balance technical debt with new feature development.',
        'Tell me about a time you worked with engineering to solve a complex technical problem.',
        'Share an example of how you evaluated technical trade-offs for a product decision.',
        'Describe a time when you had to communicate technical architecture decisions to non-technical stakeholders.',
        'Tell me about a time you had to make a product decision that required deep technical understanding.',
        'Give an example of how you balanced scalability concerns with time-to-market.',
        'Describe a situation where you had to choose between building vs. buying a technical solution.'
    ]

    # Engineering Manager specific questions
    engineering_manager_questions = [
        'Tell me about a time when you had to manage a team through a difficult technical transition.',
        'Describe a situation where you had to balance individual career growth with team needs.',
        'Tell me about a time you had to make a difficult decision about a team member\'s performance.',
        'Share an example of how you built trust with a new team.',
        'Describe a time when you had to manage conflicting priorities across multiple teams.',
        'Tell me about a time you had to advocate for your team\'s needs to upper management.',
        'Give an example of how you handled a situation where team members had conflicting technical opinions.',
        'Describe a time when you had to scale your team quickly while maintaining quality.',
        'Tell me about a time you had to make a decision that was unpopular with your team but necessary for the business.'
    ]

    # Software Engineer specific questions
    software_engineer_questions = [
        'Tell me about a time when you had to refactor legacy code under time pressure.',
        'Describe a situation where you had to debug a complex production issue.',
        'Tell me about a time you had to learn a new technology quickly for a project.',
        'Share an example of how you improved code quality or performance in a system.',
        'Describe a time when you had to work with a codebase you weren\'t familiar with.',
        'Tell me about a time you had to make a technical decision that affected multiple teams.',
        'Give an example of how you handled a situation where your code broke in production.',
        'Describe a time when you had to balance code quality with delivery speed.'
    ]

    # Data Scientist specific questions
    data_scientist_questions = [
        'Tell me about a time when you had to work with messy or incomplete data.',
        'Describe a situation where your analysis led to an unexpected business insight.',
        'Tell me about a time you had to explain a complex statistical concept to non-technical stakeholders.',
        'Share an example of how you validated the accuracy of your data analysis.',
        'Describe a time when you had to choose between different analytical approaches.',
        'Tell me about a project where you had to work with data at scale.',
        'Give an example of how you handled bias in your data or analysis.',
        'Describe a time when you had to communicate data limitations to stakeholders.'
    ]

    # Data Engineer specific questions
    data_engineer_questions = [
        'Tell me about a time when you had to design a data pipeline for a new use case.',
        'Describe a situation where you had to optimize a slow-running data process.',
        'Tell me about a time you had to handle a data pipeline failure in production.',
        'Share an example of how you ensured data quality in a pipeline.',
        'Describe a time when you had to work with data from multiple sources.',
        'Tell me about a time you had to scale a data infrastructure to handle increased load.',
        'Give an example of how you handled data privacy or security requirements.',
        'Describe a situation where you had to balance data freshness with system performance.'
    ]

    # DevOps Engineer specific questions
    devops_questions = [
        'Tell me about a time when you had to fix a critical production outage.',
        'Describe a situation where you had to automate a manual process.',
        'Tell me about a time you had to improve system reliability or uptime.',
        'Share an example of how you handled a security incident.',
        'Describe a time when you had to migrate infrastructure with zero downtime.',
        'Tell me about a time you had to optimize system costs without sacrificing performance.',
        'Give an example of how you implemented CI/CD for a complex system.',
        'Describe a situation where you had to balance security requirements with developer productivity.'
    ]

    # QA Engineer specific questions
    qa_questions = [
        'Tell me about a time when you found a critical bug that others missed.',
        'Describe a situation where you had to test a system with limited documentation.',
        'Tell me about a time you had to balance thorough testing with release deadlines.',
        'Share an example of how you improved the testing process for your team.',
        'Describe a time when you had to test a complex system integration.',
        'Tell me about a time you had to advocate for quality when under time pressure.',
        'Give an example of how you automated manual testing processes.',
        'Describe a situation where you had to test a feature with ambiguous requirements.'
    ]

    # Security Engineer specific questions
    security_questions = [
        'Tell me about a time when you discovered a security vulnerability.',
        'Describe a situation where you had to balance security with usability.',
        'Tell me about a time you had to respond to a security incident.',
        'Share an example of how you implemented security best practices in a system.',
        'Describe a time when you had to communicate security risks to non-technical stakeholders.',
        'Tell me about a time you had to make a security decision under time pressure.',
        'Give an example of how you handled a situation where security requirements conflicted with business needs.'
    ]

    # Solutions Architect specific questions
    solutions_architect_questions = [
        'Tell me about a time when you had to design a system architecture for a complex requirement.',
        'Describe a situation where you had to choose between different architectural patterns.',
        'Tell me about a time you had to redesign a system to improve scalability.',
        'Share an example of how you balanced technical requirements with business constraints.',
        'Describe a time when you had to communicate architectural decisions to multiple stakeholders.',
        'Tell me about a time you had to make an architectural decision with long-term implications.',
        'Give an example of how you handled technical debt in an architecture design.'
    ]

    # Technical Program Manager specific questions
    tpm_questions = [
        'Tell me about a time when you had to coordinate work across multiple teams.',
        'Describe a situation where you had to manage a program with changing requirements.',
        'Tell me about a time you had to remove blockers for a team or project.',
        'Share an example of how you tracked and reported on program progress.',
        'Describe a time when you had to make a decision to keep a program on track.',
        'Tell me about a time you had to balance competing priorities across multiple programs.',
        'Give an example of how you handled a situation where a program was at risk of missing its deadline.'
    ]

    # Role-based question mapping
    role_question_map = {
        'ai/ml engineer': ml_questions,
        'product manager': product_manager_questions,
        'technical product manager': technical_pm_questions,
        'engineering manager': engineering_manager_questions,
        'software engineer': software_engineer_questions,
        'data scientist': data_scientist_questions,
        'data engineer': data_engineer_questions,
        'devops engineer': devops_questions,
        'qa engineer': qa_questions,
        'security engineer': security_questions,
        'solutions architect': solutions_architect_questions,
        'technical program manager': tpm_questions,
        'frontend engineer': software_engineer_questions,
        'backend engineer': software_engineer_questions,
        'full stack engineer': software_engineer_questions
    }

    # Get role-specific questions
    role_lower = role.lower() if role else ''
    role_questions = []
    
    # Find matching role questions
    for role_key, questions in role_question_map.items():
        if role_key in role_lower:
            role_questions = questions
            break

    # Combine general and role-specific questions, removing duplicates
    all_questions = general_questions.copy()
    
    # Add role-specific questions, avoiding duplicates
    for question in role_questions:
        if question not in all_questions:
            all_questions.append(question)
    
    return all_questions


def get_company_values(company):
    """Get company values and leadership principles for a specific company."""
    values_map = {
        'Amazon': {
            'name': 'Amazon',
            'principles': [
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
            'tip': 'Demonstrate 2-3 leadership principles per answer with specific examples.'
        },
        'Google': {
            'name': 'Google',
            'principles': [
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
            'tip': 'Emphasize user-centric thinking, innovation, and technical excellence.'
        },
        'Microsoft': {
            'name': 'Microsoft',
            'principles': [
                'Innovation',
                'Diversity and Inclusion',
                'Corporate Social Responsibility',
                'Environmental Sustainability',
                'Trust and Integrity',
                'Growth Mindset',
                'Customer Obsession',
                'One Microsoft'
            ],
            'tip': 'Highlight innovation, growth mindset, and customer focus.'
        },
        'Meta': {
            'name': 'Meta',
            'principles': [
                'Move Fast',
                'Be Bold',
                'Focus on Impact',
                'Build Social Value',
                'Be Open',
                'Build Awesome Things'
            ],
            'tip': 'Show how you move fast, take risks, and create impact.'
        },
        'Apple': {
            'name': 'Apple',
            'principles': [
                'Innovation',
                'Simplicity',
                'Attention to Detail',
                'User Experience',
                'Privacy',
                'Environmental Responsibility'
            ],
            'tip': 'Emphasize innovation, simplicity, and attention to detail.'
        }
    }

    return values_map.get(company, None)

