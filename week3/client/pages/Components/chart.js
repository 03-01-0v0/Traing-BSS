// import { Title } from 'chart.js';
import React, {useCallback, useEffect, useState} from 'react';
import { Doughnut } from 'react-chartjs-2';
import styles from '../../styles/chart.module.css'
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  } from 'chart.js';
  
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  );

export default function myChart(props) {
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
    props.data.map((e) => (
        fill_device.add(e.device)
    ))
    fill_device.forEach(e => {
        var cnt = 0;
        props.data.forEach(i => {
            if (i.device == e)
                ++cnt;
        })
        xValues.push(e);
        yValues.push(cnt);
    })
    const data = {
        labels: xValues,
        datasets: [{
            data: yValues,
            backgroundColor: barColors,
        }]
    };
    return (
            <Doughnut
                data={data}
                options = {
                    {
                        title : {
                            display : true,
                            text : "Devices Chart"
                        },
                        maintainAspectRatio: false
                    }
                }
            />
    );
}