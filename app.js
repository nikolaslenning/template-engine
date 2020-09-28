const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { choices } = require("yargs");
const { resolveSoa } = require("dns");

const objectArray = []

// Write code to use inquirer to gather information about the development team members,


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

function memberType() {
    inquirer.prompt(memberTypeQ).then(answer => {
        switch (answer.role) {
            case 'Engineer':
                inquirer.prompt(engineerQuestions)
                    .then(engineerAnswers => {
                        const engineerData = new Engineer(
                            engineerAnswers.engineerName,
                            engineerAnswers.engineerID,
                            engineerAnswers.engineerEmail,
                            engineerAnswers.engineerGithub,
                            engineerAnswers.role
                        );
                        objectArray.push(engineerData);
                        console.log(objectArray);                       
                        memberType();
                    });
                break;
            case 'Intern':
                inquirer.prompt(internQuestions)
                    .then(internAnswers => {
                        const internData = new Intern(
                            internAnswers.internName,
                            internAnswers.internID,
                            internAnswers.internEmail,
                            internAnswers.internSchool,
                            internAnswers.role
                        );
                        objectArray.push(internData);
                        console.log(objectArray);
                        memberType();
                    });
                break;
            case 'None' :
                break;

        }
    }).catch(function (error) {
        console.log(error);
    });
};


function init() {
    inquirer.prompt(managerQuestions)
        .then((response) => {
            const managerData = new Manager(
                response.managerName,
                response.managerID,
                response.managerEmail,
                response.managerNumber
            )
            objectArray.push(managerData)            
            console.log("managerData")
            console.log(managerData)
            switch (response.role) {
                case 'Engineer':
                    inquirer.prompt(engineerQuestions)
                        .then(engineerAnswers => {
                            const engineerData = new Engineer(
                                engineerAnswers.engineerName,
                                engineerAnswers.engineerID,
                                engineerAnswers.engineerEmail,
                                engineerAnswers.engineerGithub

                            );
                            objectArray.push(engineerData)
                            console.log(objectArray);
                            memberType();
                        });
                    break;
                case 'Intern':
                    inquirer.prompt(internQuestions)
                        .then(internAnswers => {
                            const internData = new Intern(
                                internAnswers.internName,
                                internAnswers.internID,
                                internAnswers.internEmail,
                                internAnswers.internSchool,
                                internAnswers.role
                            );
                            objectArray.push(internData);
                            console.log(objectArray);
                            memberType();
                        });
                    break;

                case 'None':
                  
                    break;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};



init();

// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
