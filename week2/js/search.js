function searchItem() {
    var name = document.getElementById("input-search").value;
    console.log(name);
    if (name.length == 0) {
        current_obj = full_list;
        count_page(full_list.length);
        alert("Vui lòng nhập tên muốn tìm kiếm");
        return false;
    }
    name = name.toLowerCase();
    var len = full_list.length;
    var myObj = [];
    full_list.forEach(e => {
        var s = e.Name.toLowerCase();
        if (s.indexOf(name) != -1)
            myObj.push(e);
    });
    console.log(full_list);
    console.log(myObj);
    current_obj = myObj;
    count_page(current_obj.length);
}