var gamePattern = [];
var userClickedPattern = [];
  var level=0;
  var started = false;
  var lastIndex=0;
buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence(){
  level=level+1;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour =buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

$(".btn").click(function(event){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour){
    $("."+currentColour).click(function(){
        $("."+currentColour).addClass("pressed");
    });
    setTimeout(function(){
      $("."+currentColour).removeClass("pressed");
    },100);
}
$(document).on("keydown",function(){
  if(!started){$("h1").text("Level "+level);
    nextSequence();
    started=true;
  }
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
if(userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
      nextSequence();
      userClickedPattern.length=0;
    },1000);
  }
  }
  else{
    console.log("wrong");
    var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("h1").text("Game Over, Press Any Key to Restart");
  startOver();
  }

}
function startOver(){
started = false;
  level=0;
  gamePattern=[];
  userClickedPattern=[];
}
