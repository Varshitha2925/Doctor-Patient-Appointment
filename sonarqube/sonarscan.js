const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl: 'http://localhost:9000',
        token: "sqp_b0b8782da652f3106005905a196bce166073b7c9",
        options: {
            'sonar.projectName': 'Doctor-Patient-Appointment',
            'sonar.projectDescription': 'Here I can add a description of my project',
            'sonar.projectKey': 'Doctor-Patient-Appointment',
            'sonar.projectVersion': '0.0.1',
            'sonar.exclusions': '',
            'sonar.sourceEncoding': 'UTF-8',
        }
    },
    () => process.exit()
)
