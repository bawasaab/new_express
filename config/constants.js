const mongodbUrl = "test";
let basePath = 'https://mongodb-app-2.herokuapp.com';
module.exports = {
    mongodbUrl: mongodbUrl,
    basePath: basePath,
    patientsImagePath: basePath +'/images/uploads/patients/',
    doctorsImagePath: basePath +'/images/uploads/doctors/',
    JWT_SECRET: 'SuperSecRetKey'
}