const xmlhttp = new XMLHttpRequest();
let current_list, current_header, current_footer, current_Obj, sum;
let loaded = 0;

xmlhttp.onload = function () {
    const myObj = JSON.parse(this.responseText);
    var total = 0;
    var header = "<tr class=\"tr-h\">" +
        "<th>Devices</th>" +
        "<th>MAC Address</th>" +
        "<th>IP</th>" +
        "<th>Created Date</th>" +
        "<th>Power Comsumption(Kw/H)</th>" +
        "</tr>";
    var data = "";
    myObj.devices.forEach(e => {
        var item = "<tr>";
        for (var x in e) {
            if (x == "Power") total += parseInt(e[x]);
            item += "<td>" + e[x] + "</td>";
        }
        item += "</tr>";
        data += item;
    });
    var footer = "<tr class=\"total\">" +
        "<td colspan=\"4\"><b>Total</b></td>" +
        "<td>" + total + "</td>" +
        "</tr>";
    current_Obj = myObj;
    current_list = data;
    current_header = header;
    current_footer = "<tr class=\"total\">" +
        "<td colspan=\"4\"><b>Total</b></td>" +
        "<td>";
    sum = total;
    loaded = true;
    loadChart();
    document.getElementById("tb").innerHTML = header + data + footer;
};

xmlhttp.open("GET", "http://127.0.0.1:5500/week2/database/devices.json");
xmlhttp.send();