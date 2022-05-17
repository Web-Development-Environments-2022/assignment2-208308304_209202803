$().ready(function() {
    $("#settingForm").validate({
        rules: {
            upKey: {
                required: true
            },
            downKey: {
                required: true
            },
            leftKey: {
                required: true
            },
            rightKey: {
                required: true
            },
            numOfBalls: {
                required: true
            },
            smallBallColor: {
                required: true
            },
            mediumBallColor: {
                required: true
            },
            bigBallColor: {
                required: true
            },
            gameTime: { 
                required: true
            },
            nunOfMonsters: { 
                required: true
            },
        },
        messages: {
            upKey: {
                required: "required"
            },
            downKey: {
                required: "required"
            },
            leftKey: {
                required: "required"
            },
            rightKey: {
                required: "required"
            },
            numOfBalls: {
                required: "required"

            },
            smallBallColor: {
                required: "required"
            },
            mediumBallColor: {
                required: "required"
            },
            bigBallColor: {
                required: "required"
            },
            gameTime: { 
                required: "required"
            },
            numOfMonsters: { 
                required: "required"

            },  
        },
        errorPlacement: function(label, element) {
            label.addClass('errorMessage');
            label.insertAfter(element);
          },
          wrapper: 'span',

        submitHandler: function(event){
            settingSubmit();
        }
        

    });
});