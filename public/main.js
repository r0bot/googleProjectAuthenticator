$(function () {
    console.log("ready!");
    $(".authenticateButton", document.body).click(function (event) {
        console.log('Authenticate button clicked!');
        event.stopPropagation();
        $.get("/getAuthenticationUrl", function (data, statusCode) {
            console.log('Obtain authentication URL request returned status code ' + statusCode);
            window.location.href = data;
        });
    });
});