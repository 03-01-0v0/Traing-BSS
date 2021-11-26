function addItem() { 
    // if curren_list empty then load
    if(!loaded){
        return ;
    }
    var name_device = document.getElementById("nameitem").value;
    var val_IP = document.getElementById("IP").value;
    if (name_device.length == 0 || val_IP == 0) {
        alert("Name or IP invalid");
    } else {
        sum += 30;
        const d = new Date();
        var item = "<tr>";
        var date_now = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        item += "<td>" + name_device + "</td>" + "<td>" + "00:1B:44:11:3A:B7" + "</td>" + "<td>" + val_IP + "</td>" +
            "<td>" + date_now + "</td>" +
            "<td>" + "30" + "</td>";
        item += "</tr>";
        current_list += item;
        current_Obj.devices.push({"device":name_device, "Address": "00:1B:44:11:3A:B7", "IP":val_IP, "Date":date_now, "Power":50});
        document.getElementById("tb").innerHTML = current_header + current_list + (current_footer + sum + "</tr>");
        document.getElementById("nameitem").value = "";
        document.getElementById("IP").value = "";
        loadChart();
    }
}