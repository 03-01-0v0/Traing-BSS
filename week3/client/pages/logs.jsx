import Head from 'next/head'
import React, {useCallback, useEffect, useState} from 'react';
import Menu from './Components/menu'
import Account from './Components/account'
import Search from './Components/search';
import styles from '../styles/logs.module.css'
import Table from   './Components/table_logs'
import Page from './Components/pagination'

export default function Logs() {
    const data = [
        {
            DeviceId: "101",
            Name: "TV",
            Action: "TurnOn",
            Date: "124689"
        },
        {
            DeviceId: "102",
            Name: "Washer",
            Action: "TurnOn",
            Date: "124589"
        },
        {
            DeviceId: "103",
            Name: "Selling Fan",
            Action: "TurnOff",
            Date: "124689"
        },
        {
            DeviceId: "104",
            Name: "Refrigerator",
            Action: "TurnOff",
            Date: "225689"
        },
        {
            DeviceId: "105",
            Name: "TV",
            Action: "TurnOn",
            Date: "904689"
        },
        {
            DeviceId: "106",
            Name: "Play station",
            Action: "TurnOff",
            Date: "199999"
        },
        {
            DeviceId: "107",
            Name: "Washer",
            Action: "TurnOn",
            Date: "126739"
        },
        {
            DeviceId: "108",
            Name: "Refrigerator",
            Action: "TurnOff",
            Date: "231789"
        },
        {
            DeviceId: "109",
            Name: "TV",
            Action: "TurnOn",
            Date: "124689"
        },
        {
            DeviceId: "111",
            Name: "TV",
            Action: "TurnOn",
            Date: "183289"
        },
        {
            DeviceId: "112",
            Name: "TV",
            Action: "TurnOff",
            Date: "131372"
        },
        {
            DeviceId: "113",
            Name: "Play station",
            Action: "TurnOff",
            Date: "142387"
        },
        {
            DeviceId: "114",
            Name: "Selling Fan",
            Action: "TurnOn",
            Date: "987655"
        }
    ]
    return (
        <body>
        <div class="flex-container">
            <Menu></Menu>
            <div class="main">
                <Account></Account>
                <div className={styles.data}>
                    <div className={styles.data_header}>
                        <h3>Action Logs</h3>
                        <Search></Search>
                    </div>
                    <div className={styles.data_footer}>
                        <Table data={data}/>
                    </div>
                    <div class ="page">
                        <Page></Page>
                    </div>
                </div>
            </div>
        </div>
    </body>
    );
}