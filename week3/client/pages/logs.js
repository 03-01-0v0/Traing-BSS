import Head from 'next/head'
import React, {useCallback, useEffect, useState} from 'react';
import Menu from './Components/menu'
import Account from './Components/account'
import Search from './Components/search';
import styles from '../styles/logs.module.css'
import Table from   './Components/table_logs'
import Page from './Components/pagination'

export default function Logs(props) {
    const [dataLog, SetDataLog] = useState(props.data);
    return (
        <body>
        <div class="flex-container">
            <Menu></Menu>
            <div class="main">
                <Account></Account>
                <div className={styles.data}>
                    <div className={styles.data_header}>
                        <h3 class="tag_h3">Action Logs</h3>
                        <Search></Search>
                    </div>
                    <div className={styles.data_footer}>
                        <Table data={dataLog}/>
                    </div>
                    <div class ="page">
                        <Page data={dataLog}></Page>
                    </div>
                </div>
            </div>
        </div>
    </body>
    );
}

Logs.getInitialProps = async function () {
    const res = await fetch('http://localhost:3002/logs')
    const data = await res.json()
    return {
        data: data
    }
}