

    var debug = true;

    var companyName="";
    var frontEndReq = 0;
    var clientReq = 0;
    var serverReq = 0;
    var randomNumber = function(min, max){
        return Math.floor(Math.random()*(1 + max - min) + min);
    };

    var team = [];
    var objSkillBoxArray = {
        "skills": ["Front End","Clientside Logic", "Serverside Logic"]
    }

    function createCompanyName(){

        //set string to empty
        companyName="";

        var alphabet="abcdefghijklmnopqrstuvwxyz";

        for(i=0;i<randomNumber(0,6);i++){
            companyName+=alphabet.charAt(randomNumber(0,25))
        }

        companyName+="ion";
        companyName=companyName[0].toUpperCase()+companyName.slice(1);

        console.log(companyName);

    }




$(document).ready(function(){

    //prevent form submission
    $("#projectForm").on("submit", function(event){
    event.preventDefault();

    })

    //initialize();
    $('.project').on('click', '.make-project', makeProject);
    $('.employees-container').on('click', '.add-employee', addNewEmployee);
    $('.company-name').on('click', '.assign-staff', assignStaff);


})

function addNewEmployee() {
  // $('.employees-container').last().empty();
  console.log("Add new employee called");
  addGuyWithAjax(objSkillBoxArray);

}

function calcSprint(){
  var sprintsToFinish;
  var totalFront = 0;
  var totalClient = 0;
  var totalServer = 0;

  for(var i=0; i<team.length;i++){
    if(team[i].skill=="Front End"){
      totalFront=totalFront + team[i].scrumNum;

    }else if(team[i].skill=="Clientside Logic"){
      totalClient=totalClient + team[i].scrumNum;
    }else if(team[i].skill=="Serverside Logic"){
      totalServer=totalServer + team[i].scrumNum;

    }

  }
  totalClient = clientReq/totalClient;
  totalFront = frontEndReq/totalFront;
  totalServer = serverReq/totalServer;

  sprintsToFinish = Math.max(totalFront, totalClient, totalServer);
  $('.sprints').html('<p>Total Sprints to finish project is: ' + Math.ceil(sprintsToFinish) +'</p>');
}

function addGuyWithAjax (skills){
  $.ajax({
      type: "POST",
      url: "/emps",
      data: skills,
      success: function(data){
          team.push(data);
          console.log(team);

          $('.employees-container').append('<div class="employee"></div>');
          var $el = $('.employees-container').children().last();
          $el.append('<p>' + data.name +' have skills ' + data.skill + ' and scrum number ' + data.scrumNum + '</p>');
          calcSprint();
      }
  });

}
function postWithAjax(objSkillBox){
  $.ajax({
      type: "POST",
      url: "/emps",
      data: objSkillBox,
      success: function(data){
          team.push(data);
          console.log(team);


          $('.employees-container').append('<div class="employee"></div>');
          var $el = $('.employees-container').children().last();
          $el.append('<p>' + data.name +' have skills ' + data.skill + ' and scrum number ' + data.scrumNum + '</p>');

          for (var i=0; i<objSkillBox.skills.length; i++){
              if(data.skill == objSkillBox.skills[i]){
                  objSkillBox.skills.splice(i,1);

                  if(objSkillBox.skills.length>0){
                    postWithAjax(objSkillBox);
                  }else if(objSkillBox.skills.length==0){

                    calcSprint();
                    $('.employees-container').append('<button class="add-employee">Add new staff</button>');
                  }
              }
          }
      }
  });
}
function assignStaff(){
    $('.employees-container').empty();
    team=[];
    var objSkillBox = {
        "skills": ["Front End","Clientside Logic", "Serverside Logic"]
    }
    postWithAjax(objSkillBox);
}

function listEmps(data){
    // we can do stuff with returned object
    console.log("we are client side looking at returned data",data.name);
}

function initialize(){

    createListeners();


}
function makeProject(){
    team = [];
    $('.employees-container').empty();
    $('.sprints').empty();
    console.log("we are in make project");
    createCompanyName();
    setRequirements();

    //after we have all the project bits
    displayProject();
    addStaffButton();
    //addStaffListener();


}
function addStaffListener(){

    $('.company-name').on('click', '.assign-staff', assignStaff);



}
function addStaffButton(){

    $('.company-name').append('<button class="assign-staff">Assign Staff</button>');

}
function setRequirements(){

    frontEndReq = 0;
    clientReq = 0;
    serverReq = 0;
    frontEndReq = randomNumber(10,60);
    clientReq = randomNumber(10,60);
    serverReq = randomNumber(10,60);



}

function displayProject(){

    //display the project on the screen
    $('.company-name').empty();

    $('.company-name').append('<p>Company Name:  ' + companyName + '</p>');

    $('.company-name').append('<p>Front End Requirements:  ' + frontEndReq + '</p>');

    $('.company-name').append('<p>Clientside Logic Requirements:  ' + clientReq + '</p>');
    $('.company-name').append('<p>Serverside Logic Requirements:  ' + serverReq + '</p>');


}

// function createListeners(){
//
//     $('.project').on('click', '.make-project', makeProject);
//
// }

    //---------------



// $(document).ready(function(){
//
//     //--------------
//     //listcats here test
//     listCats();
//     //-----------
//     //on submit, prevent page refresh.
//     $("#catForm").on("submit", function(event){
//     event.preventDefault();
//
//     //initialize variables
//     var values = {};
//     var empData = false;
//     var strCheck = "";
//
//     //fetch form values by stepping through the form object, storing each key value
//     // pair in an object.
//     $.each($("#catForm").serializeArray(), function(i, field){
//         values[field.name] = field.value;
//     });
//
//     if (debug){
//         console.log("local log",values.catName);
//     }
//     var objCat = {
//         "catName" : values.catName
//     }
//
//     //do a get call with values.catname
//     $.ajax({
//         type: "POST",
//         url: "/cats",
//         data: objCat,
//         success: function(data){
//
//             if (debug){
//             console.log("Hey we got some data", data);
//             }
//             // try and retreive cats
//             listCats()
//
//         }
//     });
//   });
// });
//
// function listCats(){
//     // let the cats out
//     $('.cat-container').empty();
//     // clear the input
//     $('#catName').val("");
//
//     // send a get to the server saying hey we want all the cats in the db
//
//     $.ajax({
//         type: "GET",
//         url: "/cats",
//         // it worked list the cats
//
//
//         /// TODO here I would like to experiment with popping this object into an array
//
//
//         success: function(data){
//
//             // loop through the data object. This looks teribble I want a better way
//             // to step through the result. getRows?
//             $.each(data, function(key, value) {
//                     // console.log(key, value);
//                     if (debug){
//                         console.log(value.name);
//                     }
//                     $('.cat-container').append("<p>Cat Name:   " + value.name + "</p>");
//             });
//         }
//     });
// }
// --------------------- old code for reference
// var app = angular.module('app', []);
//
// app.controller("IndexController", ['$scope', '$http', function($scope, $http){
//     $scope.cat = {};
//     $scope.cats = [];
//
//     $scope.scott = {};
//
//     var fetchCats = function(){
//       $http.get("/cats").then(function(response){
//           $scope.cats = response.data;
//           $scope.cat = {};
//       });
//     };
//
//     $scope.add = function(kitty){
//         return $http.post("/cats", kitty).then(fetchCats());
//     };
//
//     fetchCats();
// }]);

// $.ajax({
//     type: "POST",
//     url: "/data",
//     data: kitty,
//     success: function(data){
//
//     }
// });
