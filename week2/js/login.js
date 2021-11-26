function isSuccessLogin() 
{

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username + " " + password);
    if (username == "John" && password == "1234")
        {
            alert("Đăng nhập thành công");
            window.location.href = ("http://127.0.0.1:5500/week2/html/dashbroad.html");
        }
    else
        {
            document.getElementById("demo").innerHTML = "<p>" + "User name or password invalid" + "</p>";
            document.getElementById("demo").style.color = "red";
        }
}