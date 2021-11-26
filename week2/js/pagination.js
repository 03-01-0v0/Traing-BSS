let cnt = 0;
function count_page(len) {

    cnt = Math.ceil(len / 10);
    var txt = "";
    for (var i = 1; i <= cnt; i++)
    {
       var item = "<button id=\"btn-" + i + "\" onclick=\"nextpage("+ i + ")\"" + "type=\"button\"><b>" + i + "</b></button>";
        txt += item;
    }
    document.getElementById("form-page").innerHTML = txt;
    nextpage(1, cnt);
}

function nextpage(idx)
{
    const myObj = current_obj;
    var total = 0;
    var data = "";
    var save = idx;
    var idx = (idx - 1) * 10;
    for (var i = idx; i < Math.min(idx + 10, myObj.logs.length); i++) {
        ++total;
        var item = "<tr>";
        for (var x in myObj.logs[i]) {
            item += "<td>" + myObj.logs[i][x] + "</td>";
        }
        item += "</tr>";
        data += item;
    }

    document.getElementById("tb").innerHTML = current_header + data + current_footer + total + "</tr>";
    for (var i = 1; i <= cnt; i++)
    {
        document.getElementById("btn-" + i).style.backgroundColor = "#00a8ff";
        document.getElementById("btn-" + i).style.color = "white";
    }
    document.getElementById("btn-" + save).style.backgroundColor = "white";
    document.getElementById("btn-" + save).style.color = "black";
}