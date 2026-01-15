export interface Experience {
    company: string;
    title: string;
    period: string;
    location: string;
    description?: string;
}

export interface Education {
    school: string;
    degree: string;
    period: string;
}

export interface Publication {
    title: string;
    conference: string;
    date: string;
    description: string;
    link?: string;
}

export const EXPERIENCE: Experience[] = [
    {
        company: 'Verily',
        title: 'Senior Software Engineer',
        period: 'May 2025 - Present',
        location: 'Boston, Massachusetts, United States',
        description: 'Go, Python, and others. Hybrid role.'
    },
    {
        company: 'Verily',
        title: 'Software Engineer',
        period: 'Jul 2023 - May 2025',
        location: 'Boston, Massachusetts, United States',
        description: 'Go, Python, and others.'
    },
    {
        company: 'PathAI',
        title: 'Software Engineer I',
        period: 'Dec 2021 - Jul 2023',
        location: 'Boston, Massachusetts, United States',
        description: 'Kubernetes, Python, and others.'
    },
    {
        company: 'AI4ALL',
        title: 'Researcher and Coordinator',
        period: 'Jul 2020 - Aug 2020',
        location: 'Boston, Massachusetts, United States',
    },
    {
        company: 'SenseTime 商汤科技',
        title: 'Machine Learning Intern',
        period: 'Jul 2018 - Aug 2018',
        location: 'Shenzhen, Guangdong, China',
        description: 'Helped model the noise produced by a Qualcomm smartphone and was introduced to machine learning algorithms.'
    },
    {
        company: 'Kitchen Brains',
        title: 'Intern',
        period: 'Jun 2016 - Aug 2016',
        location: 'Stratford, CT',
    }
];

export const EDUCATION: Education[] = [
    {
        school: 'Boston University',
        degree: "Bachelor's degree, Computer Science",
        period: 'Sep 2017 – 2021'
    }
];

export const PUBLICATIONS: Publication[] = [
    {
        title: 'An Exploration of Deep Reinforcement Learning Methods in Hungry Geese',
        conference: 'ArXiv',
        date: 'Sep 6, 2021',
        description: 'Hungry Geese is a n-player variation of the popular game snake. This paper looks at state of the art Deep Reinforcement Learning Value Methods.'
    },
    {
        title: 'Cultural and Geographical Influences on Image Translatability of Words across Languages',
        conference: 'NAACL',
        date: 'Jun 6, 2021',
        description: 'Neural Machine Translation (NMT) models have been observed to produce poor translations when there are few/no parallel sentences to train the models.'
    }
];
