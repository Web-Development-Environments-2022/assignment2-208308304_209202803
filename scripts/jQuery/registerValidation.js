
$().ready(function() {
    $("#registerForm").validate({
        rules: {
            userName: {
                required: true,
                noSpace: true
            },
            password: { 
                required: true,
                minlength: 6,
                alphaNumeric: true,
            },
            fullName: {
                required: true,
                lettersOnly: true
            },
            email: {
                required: true,
                customEmail: true
            },
            dateOfBirth: {
                required: true,
            },
        },
        messages: {
            userName: {
                required: "Username is missing",
            },
            password: {
                required: "Password is missing",
                minlength: "Must be at least 6 characters",
            },
            fullName: {
                required: "Full name is missing",
            },
            email: {
                required: "Email is missing",
            },
            dateOfBirth: {
                required: "Date of birth is missing"
            }
        },
        errorPlacement: function(label, element) {
            label.addClass('errorMessage');
            label.insertAfter(element);
          },
          wrapper: 'span',

        submitHandler: function(event){
            registerSubmit();
          }

    });
});

$.validator.addMethod("noSpace", function(value, element) { 
    return value.indexOf(" ") < 0 && value != ""; 
}, "Space is not allowed");


$.validator.addMethod("customEmail", function(value, element) { 
  return this.optional( element ) || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test( value ); 
}, "Email is not valid");

$.validator.addMethod("alphaNumeric",function(value) {
    return /^[A-z0-9\d=!\-@._*]*$/.test(value) && /[A-z]/.test(value) && /\d/.test(value);
}, "Must contain letters and numbers");

$.validator.addMethod("lettersOnly", function(value, element) {
    return this.optional(element) || /^[a-z ]+$/i.test(value);
}, "Must contain only letters");


