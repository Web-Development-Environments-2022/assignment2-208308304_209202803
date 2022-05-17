$(document).ready(function(){
    $("#aboutDialog").hide();
    $("#aboutMenu").click(function(){
        $("#aboutDialog").show();
    });
    $("#closeAbout").click(function(){
        $("#aboutDialog").hide();
    })
});


// close the about dialog by click on esc
document.addEventListener('keyup', function (event) {
    if ( event.keyCode == 27 )   {
        $("#aboutDialog").hide();  
    }
  })

$(document).mouseup(function(event) {
    var dialog = $("#aboutDialog");
    if (!dialog.is(event.target) && dialog.has(event.target).length === 0) 
        dialog.hide();
});
