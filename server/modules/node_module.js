var empName = require("../modules/moduleOne.js");
var empSkill = require("../modules/moduleTwo.js");
var empScrum = require("../modules/moduleThree.js");

function makeEmployee(array) {
    var emp = {};
    emp.name = empName();
    emp.skill = empSkill(array);
    emp.scrumNum = empScrum();
    return emp;
}
module.exports = makeEmployee;
