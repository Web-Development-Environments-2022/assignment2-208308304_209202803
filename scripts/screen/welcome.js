$(document).ready(function(){
    showWelcomeScreen();
    $("#welcomeMenu").click(showWelcomeScreen);
    $("#logoutMenu").click(showWelcomeScreen);
});

function showWelcomeScreen(){
    $("#welcomeScreen").show();
    $("#logoutMenu").hide();
    $("#settingMenu").hide();
    $("#loginMenu").show();
    $("#registerMenu").show();
    $("#registerScreen").hide();
    $("#loginScreen").hide();
    $("#settingScreen").hide();
    $("#gameScreen").hide();
    $("#userText").hide();
    $("#gameOverDialog").hide();
    if(pause_game == false){
        pauseGame();
     }
}