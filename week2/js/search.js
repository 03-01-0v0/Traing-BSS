function searchItem() {
    var name = document.getElementById("input-search").value;
    if (name.length == 0) {
        current_obj = full_list;
        count_page(full_list.logs.length);
        alert("Vui lòng nhập tên muốn tìm kiếm");
        return false;
    }
    name = name.toLowerCase();
    var len = full_list.logs.length;
    var myObj = {
        logs: []
    };
    full_list.logs.forEach(e => {
        var s = e.Name.toLowerCase();
        if (s.indexOf(name) != -1)
            myObj.logs.push(e);
    });
    console.log(full_list);
    console.log(myObj);
    current_obj = myObj;
    count_page(current_obj.logs.length);
}