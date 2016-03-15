
firstName=["Bob","Peter","Sam","Cheesehead","Jennifer", "Adele", "Mike", "Atom", "Java", "America", "Pilot",
  "Scott"];//12
lastName=["Peterson", "Jackson", "Hackson", "Dudeman","Codeson", "Codeman", "Scriptson", "Syberson", "Bachman",
  "Dover", "Anderson", "Andersen"];//12

var randomNumber = function(min, max){
  return Math.floor(Math.random()*(1 + max - min) + min);
};

var createName = function(){
  var name=firstName[randomNumber(0,11)]+' '+lastName[randomNumber(0,11)];
  return name;
}

module.exports=createName;
