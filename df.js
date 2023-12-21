alert("hello");
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var currentLevel = 0;

$(document).keypress(function (){
if (!started){
$("#title").text("level "+level)
    nextSequence();
    started = true;
}
})

function nextSequence(){
    level++
    $("#title").text("LEVEL" +level);
    var randomnumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomnumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});




function playSound(name){
    var audio = new Audio("sounds/" +name + ".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function(){$("#"+ currentColour ).removeClass("pressed")} ,100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              userClickedPattern = [];
              nextSequence();
            }, 1000);
          }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");

        $("h1").text("GAME OVER ,TAP ANY KEY TO RESTART THE GAME");

        setTimeout (function()  {
            $("body").removeClass("game-over")
        },200)
        startOver();
    }

}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern = [];
}

