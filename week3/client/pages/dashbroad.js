import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/dashbroad.module.css'
import Menu from './Components/menu'
import Account from './Components/account'
import Chart from './Components/chart';


export default function Dashbroad() {
    return (
        <body>
            <div class="flex-container">
                <Menu></Menu>
                <div class="main">
                    <Account></Account>
                    <div class="data">
                        <div class="data-header">

                        </div>
                        <div class="footer">
                            <div class="chart">
                                <Chart></Chart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}