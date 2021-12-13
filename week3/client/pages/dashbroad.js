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
    const [mounted, setMounted] = useState(false);

    useEffect(async() => {
        await setMounted(true);
    }, [])

    async function addItem() {
        const res = await fetch('http://localhost:3002/devices');
        const data = await res.json();
        setDataDevice(data);
    }
    return ( mounted &&
        <body>
            <div className="flex-container">
                <Menu active="dashbroad"></Menu>
                <div className="main">
                    <Account></Account>
                    <div className="data">
                        <div className="data-header">
                            <Table data ={dataDevice}></Table>
                        </div>
                        <div className="data-footer">
                            <div className="chart">
                                <Chart id="myChart" data={dataDevice}></Chart>
                            </div>
                            <Additem getData={addItem}></Additem>
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