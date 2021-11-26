function loadChart() {
    const fill_device = new Set();
    var xValues = [];
    var yValues = [];
    var barColors = [
        "#1abc9c",
        "#2ecc71",
        "#3498db",
        "#9b59b6",
        "#34495e",
        "#f1c40f",
        "#e67e22",
        "#e74c3c",
        "#ecf0f1",
        "#95a5a6",
        "#ff7979",
        "#c7ecee",
        "#ffbe76",
        "#535c68"
    ];
    
    current_Obj.devices.forEach(element => {
        for (var x in element)
            if (x == "device")
                fill_device.add(element[x]);
    });
    
    console.log(fill_device);
    fill_device.forEach(e => {
        var cnt = 0;
        current_Obj.devices.forEach(i => {
            for (var x in i)
                if (i[x] == e)
                    ++cnt;
        });
        xValues.push(e);
        yValues.push(cnt);
    });
    console.log(xValues);
    console.log(yValues);
    
    
    new Chart("myChart", {
        type: "doughnut",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: "Devices Chart"
            },
            maintainAspectRatio: false
        }
    });
}
