export interface Experience {
    company: string
    title: string
    period: string
    location: string
    description?: string | string[]
}

export interface Education {
    school: string
    degree: string
    period: string
}

export interface Publication {
    title: string
    conference: string
    date: string
    description: string | string[]
    link?: string
}

export const EXPERIENCE: Experience[] = [
    {
        company: 'Verily',
        title: 'Senior Software Engineer',
        period: 'May 2025 - Present',
        location: 'Boston, MA',
        description: [
            'Engineered and launched two distinct LLM-powered features for the Verily Me mobile application, enabling users to query personal healthcare data via natural language and receive AI-driven health coaching.',
            'Architected and deployed scalable, agentic AI models to production on Google Kubernetes Engine (GKE), leveraging GCP Vertex AI and LangGraph to serve live mobile traffic.',
        ],
    },
    {
        company: 'Verily',
        title: 'Software Engineer III',
        period: 'July 2023 - May 2025',
        location: 'Boston, MA',
        description: [
            'Built and orchestrated robust data pipelines with Airflow, processing hundreds of thousands of FHIR records daily into BigQuery, which significantly simplified data access for the business analytics team.',
            'Developed a full-stack microservice using gRPC and React to provide embedded Looker dashboards, creating a self-service analytics portal for internal stakeholders.',
            'Automated the deployment of all GCP-based infrastructure using Terraform and configured GitHub workflows for CI/CD, enhancing deployment velocity and reliability.',
        ],
    },
    {
        company: 'PathAI',
        title: 'Software Engineer I',
        period: 'December 2021 - June 2023',
        location: 'Boston, MA',
        description: [
            'Developed and implemented full stack solutions using Vue.js for frontend and Django for backend, resulting in the successful release of a major software update deployed in AWS.',
            'Built infrastructure to manage ELT pipelines to aggregate data from APIs/databases to Snowflake data warehouse for business analytics.',
        ],
    },
    {
        company: 'AI4ALL',
        title: 'Researcher and Coordinator',
        period: 'July 2020 - August 2020',
        location: 'Boston, MA',
        description: [
            'Contributed to adding additional up-sampling functionality to a custom modular parameter sharing neural network architecture in PyTorch.',
            'Coordinated and taught AI classes using Jupyter notebooks.',
        ],
    },
    {
        company: 'SenseTime 商汤科技',
        title: 'Research Intern',
        period: 'June 2018 - August 2018',
        location: 'Shenzhen, China',
        description: [
            'Collected data on Smartphone camera image quality as a function of smartphone camera settings such as exposure and ISO values.',
            'Developed a predictive model for the amount of noise in smartphone camera when given camera settings, for use to assist in noise reduction in MATLAB.',
        ],
    },
]

export const EDUCATION: Education[] = [
    {
        school: 'Boston University',
        degree: 'Bachelor of Arts in Computer Science',
        period: 'September 2021',
    },
]

export const PUBLICATIONS: Publication[] = [
    {
        title:
            'An Exploration of Deep Reinforcement Learning Methods in Hungry Geese',
        conference: 'ArXiv',
        date: 'September 2021',
        description: [
            'Explored the effectiveness of using Deep Q-Networks with various architectures in a stochastic multiplayer snake environment.',
            'Showed how optimizations to feature engineering could make DQNs more effective, although they are outperformed by Proximal Policy Optimization-based methods.',
        ],
    },
    {
        title:
            'Cultural and Geographical Influences on Image Translatability of Words across Languages',
        conference: 'NAACL',
        date: 'June 2021',
        description: [
            'Developed two metrics to show when images could be useful for machine translation.',
            'Concluded that when speakers of two languages share culture, images are more likely to be useful for machine translation compared to shared Geography or language families.',
        ],
    },
]

export const SKILLS = {
    Languages: [
        'Python',
        'Go',
        'Typescript',
        'Terraform',
        'HTML/CSS',
        'Java',
        'Swift',
    ],
    'Technologies/Frameworks': [
        'React',
        'Django',
        'Vue.js',
        'Gitlab CI/CD',
        'Kubernetes',
        'Docker',
        'AWS',
        'Tensorflow',
        'PyTorch',
        'Pandas',
        'Sci-kit Learn',
        'Github',
    ],
}
