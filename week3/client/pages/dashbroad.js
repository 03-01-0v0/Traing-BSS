import Head from 'next/head'
import Image from 'next/image'
import React, {useCallback, useEffect, useState} from 'react';
import Link from 'next/link'
import styles from '../styles/dashbroad.module.css'
import Menu from './Components/menu'
import Account from './Components/account'
import Chart from './Components/chart';
import Table from './Components/table_dasbroad';
import Additem from './Components/additem';


export default function Dashbroad(props) {
    const data = [
        {
            device: "Washer",
            Address: "00:1B:44:11:3A:B7",
            IP: "127.0.0.2",
            Date: "2021-05-31",
            Power: "50"
        },
        {
            device: "Refrigerator",
            Address: "00:1B:44:11:3A:B7",
            IP: "127.0.1.2",
            Date: "2021-06-31",
            Power: "50"
        },
        {
            device: "Selling Fan",
            Address: "00:1B:44:11:3A:B7",
            IP: "127.0.1.3",
            Date: "2021-07-31",
            Power: "50"
        },
        {
            device: "TV",
            Address: "00:1B:44:11:3A:B7",
            IP: "127.0.2.2",
            Date: "2021-08-31",
            Power: "50"
        },
        {
            device: "Play station",
            Address: "00:1B:44:11:3A:B7",
            IP: "127.3.4.5",
            Date: "2021-09-31",
            Power: "50"
        },
        {
            device: "Washer",
            Address: "00:1B:44:11:3A:B7",
            IP: "127.0.0.2",
            Date: "2021-05-31",
            Power: "50"
        }
    ];

    // const [dataDevice, setDataDevice] = useState(props.data);
    // setDataDevice(data);
    return (
        <body>
            <div class="flex-container">
                <Menu></Menu>
                <div class="main">
                    <Account></Account>
                    <div class="data">
                        <div class="data-header">
                            <Table data ={data}></Table>
                        </div>
                        <div class="data-footer">
                            <div class="chart">
                                <Chart data={data}></Chart>
                            </div>
                            <Additem></Additem>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}