export default [
    {
        name: 'IllnessAnalysis',
        path: '/illness-analysis',
        component: () => import('@/pages/IllnessAnalysis'),
        meta: {
            title: '心理诊断',
            isNavShow: true,
            introduction: '心理诊断板块中提供了大量可信的心理诊断或链接测试供您或您的家人朋友进行测试及诊断。',
            imgURL: 'assets/image/nav/illness-analysis.png',
            top: 28,
            left: 20
        }
    },

    {
        name: 'NormalIllness',
        path: '/normal-illness',
        component: () => import('@/pages/NormalIllness'),
        meta: {
            title: '常见疾病',
            isNavShow: true,
            introduction: '常见疾病板块中有部分常见疾病的详略介绍，包括但不限于对疾病总类及各个子类疾病的基本定义、诊断方法、社会背景、形成理论、治疗方法、亲友做法等等的介绍。',
            imgURL: 'assets/image/nav/normal-illness.png',
            top: 40,
            left: 47
        }
    },
    {
        name: 'SearchIllness',
        path: '/search-illness',
        component: () => import('@/pages/SearchIllness'),
        meta: {
            title: '搜索疾病',
            isNavShow: true,
            introduction: '搜索疾病板块中具有搜索疾病的功能，您可以通过输入疾病名称对该疾病进行更为详尽的了解。',
            imgURL: 'assets/image/nav/search-illness.png',
            top: 55,
            left: 7
        }
    },
    {
        name: 'ScreenData',
        path: '/screen-data',
        component: () => import('@/pages/ScreenData'),
        meta: {
            title: '数据可视化',
            isNavShow: true,
            introduction: '数据可视化板块中有有关心理数据的可视化功能，包括但不限于统计分析、数据可视化、数据可视化报表等等。',
            imgURL: 'assets/image/nav/screen-data.png',
            top: 70,
            left: 65
        }
    },
    {
        name: 'FunctionIntroduction',
        path: '/function-introduction',
        component: () => import('@/pages/FunctionIntroduction'),
        meta: {
            isNavShow: true,
        }
    },
    {
        name: 'PsychologyKnowledge',
        path: '/psychology-knowledge',
        component: () => import('@/pages/PsychologyKnowledge'),
        meta: {
            title: '心理小知识',
            isNavShow: true,
            introduction: '心理小知识板块为您提供相关心理学的知识，包括但不限于心理学相关的文章，心理学相关的科普性知识等等。',
            imgURL: 'assets/image/nav/psychology-knowledge.png',
            top: 53,
            left: 88
        }
    },
]