const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Questions = require("./lib/Questions")
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { choices } = require("yargs");
const { resolveSoa } = require("dns");

const objectArray = []

function init() {
    inquirer.prompt(Questions.managerQuestions)
        .then((response) => {
            const managerData = new Manager(
                response.managerName,
                response.managerID,
                response.managerEmail,
                response.managerNumber
            )            
            objectArray.push(managerData)            
            
            switch (response.role) {
                case 'Engineer':
                    inquirer.prompt(Questions.engineerQuestions)
                        .then(engineerAnswers => {
                            const engineerData = new Engineer(
                                engineerAnswers.engineerName,
                                engineerAnswers.engineerID,
                                engineerAnswers.engineerEmail,
                                engineerAnswers.engineerGithub

                            );
                            objectArray.push(engineerData)                            
                            memberType();
                        });
                    break;

                case 'Intern':
                    inquirer.prompt(Questions.internQuestions)
                        .then(internAnswers => {
                            const internData = new Intern(
                                internAnswers.internName,
                                internAnswers.internID,
                                internAnswers.internEmail,
                                internAnswers.internSchool,
                                internAnswers.role
                            );
                            objectArray.push(internData);                            
                            memberType();
                        });
                    break;

                case 'None':
                  fs.writeFile('./output/team.html', render(objectArray), function(error){
                      if (error) {
                          return console.log(error);
                      } 
                      console.log('Success!');
                  });
                    break;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

function memberType() {
    inquirer.prompt(Questions.memberTypeQ).then(answer => {
        switch (answer.role) {
            case 'Engineer':
                inquirer.prompt(Questions.engineerQuestions)
                    .then(engineerAnswers => {
                        const engineerData = new Engineer(
                            engineerAnswers.engineerName,
                            engineerAnswers.engineerID,
                            engineerAnswers.engineerEmail,
                            engineerAnswers.engineerGithub,
                            engineerAnswers.role
                        );
                        objectArray.push(engineerData);                                              
                        memberType();
                    });
                break;
            case 'Intern':
                inquirer.prompt(Questions.internQuestions)
                    .then(internAnswers => {
                        const internData = new Intern(
                            internAnswers.internName,
                            internAnswers.internID,
                            internAnswers.internEmail,
                            internAnswers.internSchool,
                            internAnswers.role
                        );
                        objectArray.push(internData);
                        memberType();
                    });
                break;
            case 'None':
                fs.writeFile('./output/team.html', render(objectArray), function(error){
                    if (error) {
                        return console.log(error);
                    } 
                    console.log('Success!');
                });
                break;

        }
    }).catch(function (error) {
        console.log(error);
    });
};

init();