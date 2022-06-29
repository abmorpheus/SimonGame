var buttonColours = ["red", "blue", "green", "yellow"];
var randomColourChosen;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = true;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    randomColourChosen = buttonColours[randomNumber];
    gamePattern.push(randomColourChosen);
    $("#" + randomColourChosen).fadeOut(100).fadeIn(100);
    playSound(randomColourChosen);
    // console.log(randomColourChosen);
}

$(".btn").click(
    function () {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        // console.log(userClickedPattern);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }
);

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(
        function () {
            $("#" + currentColour).removeClass("pressed");
        }, 100);
}

// $(document).one("keypress", function () {    // only executes once
//     nextSequence();
// });

$(document).keypress(
    function () {
        if (started == true) {
            started = false;
            setTimeout(
                function () {
                    nextSequence();
                }
                , 1000);
        }
    }
)

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("yes");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        // console.log("no");
        var wrongAnswer = new Audio("sounds/wrong.mp3");
        wrongAnswer.play();
        $("body").addClass("game-over");
        setTimeout(
            function () {
                $("body").removeClass("game-over");
            }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = true;
}