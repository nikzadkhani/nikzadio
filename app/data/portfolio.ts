export interface Experience {
    company: string
    title: string
    start: Date
    end?: Date
    location: string
    description?: string | string[]
    skills?: string[]
}

export interface Education {
    school: string
    degree: string
    start: Date
    end?: Date
}

export interface Publication {
    title: string
    conference: string
    date: Date
    description: string | string[]
    link?: string
    skills?: string[]
}

export const EXPERIENCE: Experience[] = [
    {
        company: 'Verily',
        title: 'Senior Software Engineer',
        start: new Date('2025-05-01'),
        location: 'Boston, MA',
        description: [
            'Engineered and launched two distinct LLM-powered features for the Verily Me mobile application, enabling users to query personal healthcare data via natural language and receive AI-driven health coaching.',
            'Architected and deployed scalable, agentic AI models to production on Google Kubernetes Engine (GKE), leveraging GCP Vertex AI and LangGraph to serve live mobile traffic.',
        ],
        skills: ['Python', 'Go', 'Typescript', 'React', 'GCP', 'Terraform', 'Kubernetes', 'LLMs', 'LangGraph', 'Vertex AI', 'Docker'],
    },
    {
        company: 'Verily',
        title: 'Software Engineer III',
        start: new Date('2023-07-01'),
        end: new Date('2025-05-01'),
        location: 'Boston, MA',
        description: [
            'Built and orchestrated robust data pipelines with Airflow, processing hundreds of thousands of FHIR records daily into BigQuery, which significantly simplified data access for the business analytics team.',
            'Developed a full-stack microservice using gRPC and React to provide embedded Looker dashboards, creating a self-service analytics portal for internal stakeholders.',
            'Automated the deployment of all GCP-based infrastructure using Terraform and configured GitHub workflows for CI/CD, enhancing deployment velocity and reliability.',
        ],
        skills: ['Python', 'Go', 'Typescript', 'React', 'GCP', 'Terraform', 'Airflow', 'BigQuery', 'SQL', 'gRPC', 'Looker', 'Docker', 'LangGraph'],
    },
    {
        company: 'PathAI',
        title: 'Software Engineer I',
        start: new Date('2021-12-01'),
        end: new Date('2023-06-01'),
        location: 'Boston, MA',
        description: [
            'Developed and implemented full stack solutions using Vue.js for frontend and Django for backend, resulting in the successful release of a major software update deployed in AWS.',
            'Built infrastructure to manage ELT pipelines to aggregate data from APIs/databases to Snowflake data warehouse for business analytics.',
        ],
        skills: ['Python', 'Vue.js', 'Typescript', 'Django', 'AWS', 'Terraform', 'Snowflake', 'SQL', 'Docker'],
    },
    {
        company: 'AI4ALL',
        title: 'Researcher and Coordinator',
        start: new Date('2020-07-01'),
        end: new Date('2020-08-01'),
        location: 'Boston, MA',
        description: [
            'Contributed to adding additional up-sampling functionality to a custom modular parameter sharing neural network architecture in PyTorch.',
            'Coordinated and taught AI classes using Jupyter notebooks.',
        ],
        skills: ['Python', 'PyTorch', 'Jupyter'],
    },
    {
        company: 'SenseTime 商汤科技',
        title: 'Research Intern',
        start: new Date('2018-06-01'),
        end: new Date('2018-08-01'),
        location: 'Shenzhen, China',
        description: [
            'Collected data on Smartphone camera image quality as a function of smartphone camera settings such as exposure and ISO values.',
            'Developed a predictive model for the amount of noise in smartphone camera when given camera settings, for use to assist in noise reduction in MATLAB.',
        ],
        skills: ['MATLAB', 'Computer Vision'],
    },
]

export const EDUCATION: Education[] = [
    {
        school: 'Boston University',
        degree: 'Bachelor of Arts in Computer Science',
        start: new Date('2017-09-01'),
        end: new Date('2021-09-01'),
    },
]

export const PUBLICATIONS: Publication[] = [
    {
        title:
            'An Exploration of Deep Reinforcement Learning Methods in Hungry Geese',
        conference: 'ArXiv',
        date: new Date('2021-09-01'),
        description: [
            'Explored the effectiveness of using Deep Q-Networks with various architectures in a stochastic multiplayer snake environment.',
            'Showed how optimizations to feature engineering could make DQNs more effective, although they are outperformed by Proximal Policy Optimization-based methods.',
        ],
        skills: ['Python', 'Reinforcement Learning', 'PyTorch'],
    },
    {
        title:
            'Cultural and Geographical Influences on Image Translatability of Words across Languages',
        conference: 'NAACL',
        date: new Date('2021-06-01'),
        description: [
            'Developed two metrics to show when images could be useful for machine translation.',
            'Concluded that when speakers of two languages share culture, images are more likely to be useful for machine translation compared to shared Geography or language families.',
        ],
        skills: ['Python', 'NLP', 'Data Analysis'],
    },
]

export const SKILLS = {
    Languages: [
        'Python',
        'Go',
        'Typescript',
    ],
    'Frontend & Frameworks': [
        'React',
        'Vue.js',
        'Django',
    ],
    'Cloud & Infrastructure': [
        'AWS',
        'GCP',
        'Kubernetes',
        'Docker',
        'Terraform',
        'Github CI/CD',
        'Gitlab CI/CD',
    ],
    'Data & AI': [
        'PyTorch',
        'Tensorflow',
        'Pandas',
        'LangGraph',
    ],
}
