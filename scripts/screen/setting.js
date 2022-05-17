var keyCodeDict;

$(document).ready(function(){
    $("#settingScreen").hide();
    $("#settingMenu").click(showSettingScreen);

    $("#randomButton").click(randomSettings); 

    $("#upKey").keydown(function(event) {
        keyPressedEvent(event,"#upKey");
        }  
    );
    $( "#downKey").keydown(function(event) {
        keyPressedEvent(event,"#downKey");
        }  
    );
    $( "#leftKey").keydown(function(event) {
        keyPressedEvent(event,"#leftKey");
        }  
    );
    $( "#rightKey").keydown(function(event) {
        keyPressedEvent(event,"#rightKey");
        }  
    );

    keyCodeDict = {"#leftKey": 37,"#upKey": 38,"#rightKey": 39,"#downKey": 40};
});

function showSettingScreen(){
    $("#settingForm")[0].reset();
	$("#settingScreen").show();
    $("#welcomeScreen").hide();
    $("#registerScreen").hide();
    $("#loginScreen").hide();
    $("#gameScreen").hide();
    setDefaultSettings();

}

function settingSubmit(){
    if(  validateKeys()){
        var $inputs = $('#settingForm :input');
        var values = {};
        $inputs.each(function() {
            values[this.name] = $(this).val();
        });
        setSettings(
            keyCodeDict["#upKey"],keyCodeDict["#downKey"], keyCodeDict["#leftKey"], keyCodeDict["#rightKey"],
            values["numOfBalls"], values["smallBallColor"], values["mediumBallColor"],
            values["bigBallColor"], values["gameTime"], values["numOfMonsters"]
        );
        showGameScreen();
    }
}



function setDefaultSettings(){
    $("#upKey").val("ArrowUp");
    $("#downKey").val("ArrowDown");
    $("#leftKey").val("ArrowLeft");
    $("#rightKey").val("ArrowRight");
    $("#numOfBalls").val(50);
    $("#bigBallColor").val("#9999ff");
    $("#mediumBallColor").val("#ff9966");
    $("#smallBallColor").val("#66ffcc");
    $("#gameTime").val(60);
    $("#numOfMonsters").val(2);
}

function randomSettings() {
    $("#upKey").val("ArrowUp");
    $("#downKey").val("ArrowDown");
    $("#leftKey").val("ArrowLeft");
    $("#rightKey").val("ArrowRight");
    $("#numOfBalls").val(generateRandomInt(50,90));
    $("#bigBallColor").val(generateRandomColor);
    $("#mediumBallColor").val(generateRandomColor);
    $("#smallBallColor").val(generateRandomColor);
    $("#gameTime").val(generateRandomInt(60,100));
    $("#numOfMonsters").val(generateRandomInt(1,4));
}

function keyPressedEvent(event, KeyType){
    $(KeyType).val(event.key);
    keyCodeDict[KeyType] = event.keyCode;  
}

function generateRandomInt(min , max ) {
    let difference = max - min + 1;
    let rand = Math.random();
    rand = Math.floor( rand * difference); 
    rand = rand + min;
    return rand;
}

function generateRandomColor(){
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#"+randomColor
}

function validateKeys(){
    if($('#settingForm').valid()){
        let upKeyValue = keyCodeDict["#upKey"];
        let downKeyValue = keyCodeDict["#downKey"];
        let leftKeyValue = keyCodeDict["#leftKey"];
        let rightKeyValue = keyCodeDict["#rightKey"];    
        if((upKeyValue === downKeyValue) || (upKeyValue === leftKeyValue) || (upKeyValue === rightKeyValue) ||(downKeyValue === leftKeyValue) || (downKeyValue === rightKeyValue) || (leftKeyValue === rightKeyValue)){
            alert("Please select different keys");
            return false;
        }  
        return true;         
    } 
    return false;   
}