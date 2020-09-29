
const managerQuestions = [
    {
        type: 'input',
        name: 'managerName',
        message: 'What is your manager`s Name?'
    },
    {
        type: 'input',
        name: 'managerID',
        message: 'What is your manager`s id?'
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: 'What is your manager`s email?'
    },
    {
        type: 'input',
        name: 'managerNumber',
        message: 'What is your manager`s office number?'
    },
    {
        type: 'list',
        name: 'role',
        message: 'What type of team member would you like to add?',
        choices: ['Engineer', 'Intern', 'None']
    }
];

const engineerQuestions = [
    {
        type: 'input',
        name: 'engineerName',
        message: 'What is your engineer`s Name?'
    },
    {
        type: 'input',
        name: 'engineerID',
        message: 'What is your engineer`s id?'
    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: 'What is your engineer`s email?'
    },
    {
        type: 'input',
        name: 'engineerGithub',
        message: 'What is your engineer`s github username?'
    }
];

const internQuestions = [
    {
        type: 'input',
        name: 'internName',
        message: 'What is your intern`s Name?'
    },
    {
        type: 'input',
        name: 'internID',
        message: 'What is your intern`s id?'
    },
    {
        type: 'input',
        name: 'internEmail',
        message: 'What is your intern`s email?'
    },
    {
        type: 'input',
        name: 'internSchool',
        message: 'What is your intern`s school?'
    }
];

const memberTypeQ = [
    {
        type: 'list',
        name: 'role',
        message: 'What type of team member would you like to add?',
        choices: ['Engineer', 'Intern', 'None']
    }
]

module.exports = {
    memberTypeQ,
    internQuestions,
    engineerQuestions,
    managerQuestions
};