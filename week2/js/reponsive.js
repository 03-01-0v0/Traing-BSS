function myFunction() {
    var x = document.getElementById("repon-menu");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }