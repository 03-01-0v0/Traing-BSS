import Head from 'next/head'
import React, {useCallback, useEffect, useState} from 'react';
import Menu from './Components/menu'
import Account from './Components/account'
import styles from '../styles/logs.module.css'
import Table from   './Components/table_logs'
import Page from './Components/pagination'
import stylesSearch from '../styles/search.module.css';

export default function Logs(props) {
    const [dataLog, setDataLog] = useState(props.data);
    const [search, setSearch] = useState('');

    async function searchItem()
    {
        const res = await fetch('http://localhost:3002/logs?search=' + search)
        const data = await res.json();
        setDataLog(data)
    }
    return (
        <body>
        <div class="flex-container">
            <Menu active="logs"></Menu>
            <div class="main">
                <Account></Account>
                <div className={styles.data}>
                    <div className={styles.data_header}>
                        <h3 class="tag_h3">Action Logs</h3>
                        <div id={stylesSearch["search"]}>
                            <form action="" className={stylesSearch.form_search}>
                                <input type="search" name="" id={stylesSearch["input_search"]} onChange={(e) => setSearch(e.target.value)} placeholder="name" aria-label="Search"/>
                                <button className={stylesSearch.btn_search} type="button" onClick={searchItem}>Search</button>
                            </form>
                        </div>
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