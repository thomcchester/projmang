

var randomNumber = function(min, max){
  return Math.floor(Math.random()*(1 + max - min) + min);
};

function scrumNum(){
    return randomNumber(1,9);
}


module.exports=scrumNum;
