$(document).ready(function(){
    $("#loginScreen").hide();
    $("#loginMenu").click(showLoginScreen);
    $("#loginButton").click(showLoginScreen);
    $("#submitLogin").click(loginSubmit);
});

function showLoginScreen(){
    $("#welcomeScreen").hide();
    $("#registerScreen").hide();
    $("#settingScreen").hide();
    $("#loginForm")[0].reset();
    $("#loginScreen").show();
    $("#userText").hide();
    $("#gameOverDialog").hide();
}

function showUsername(){
    $("#userText").show();
    $("#userText").text("Online User: " + loggedInUser);
}

function loginSubmit(){
    var $inputs = $('#loginForm :input');
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    if(verifyUser(values["userName"],values["password"])){
        loggedInUser = values["userName"];
        showUsername();
        showSettingScreen();
        $("#loginMenu").hide();
        $("#logoutMenu").show();
        $("#settingMenu").show();
        $("#registerMenu").hide();
    }
    else {
        alert("The username or password is incorrect");
        showLoginScreen();
    }
}