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

    const [dataDevice, setDataDevice] = useState(props.data);
    return (
        <body>
            <div class="flex-container">
                <Menu></Menu>
                <div class="main">
                    <Account></Account>
                    <div class="data">
                        <div class="data-header">
                            <Table data ={dataDevice}></Table>
                        </div>
                        <div class="data-footer">
                            <div class="chart">
                                <Chart id="myChart" data={dataDevice}></Chart>
                            </div>
                            <Additem></Additem>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

Dashbroad.getInitialProps = async function () {
    const res = await fetch('http://localhost:3002/devices')
    const data = await res.json()
    return {
        data: data
    }
}