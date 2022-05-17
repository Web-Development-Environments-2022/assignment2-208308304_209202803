$(document).ready(function(){
    $("#registerScreen").hide();
    $("#registerMenu").click(showRegisterScreen);
    $("#registerButton").click(showRegisterScreen);


    $(document).on('click', '.toggle-password', function() {
        $(this).toggleClass("fa-eye fa-eye-slash");   
        var input = $("#passwordRegister");
        input.attr('type') === 'password' ? input.attr('type','text') : input.attr('type','password')
    });
});


function showRegisterScreen(){
    $("#welcomeScreen").hide();
    $("#loginScreen").hide();
    $("#settingScreen").hide();
    $("#registerForm")[0].reset();
    $("#registerScreen").show();
    $("#userText").hide();
}

function registerSubmit(){
    var $inputs = $('#registerForm :input');
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });

    createUser(values["userName"],values["password"],values["fullName"],values["email"],values["dateOfBirth"]);
    showLoginScreen();
}