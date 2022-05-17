$(document).ready(function(){
    showWelcomeScreen();
    $("#welcomeMenu").click(showWelcomeScreen);
    $("#logoutMenu").click(showWelcomeScreen);
});


function showWelcomeScreen(){
    $("#welcomeScreen").show();
    $("#logoutMenu").hide();
    $("#addMenu").hide();
    $("#loginMenu").show();
    $("#registerMenu").show();
    $("#registerScreen").hide();
    $("#loginScreen").hide();
    $("#settingScreen").hide();
    $("#gameScreen").hide();
    $("#userText").hide();
    //onlineUser = null;
    //$("#onlineUserText").text("Online User: ");
    //if(pause_game == false){
    //    pauseGame();
    //}
   }

