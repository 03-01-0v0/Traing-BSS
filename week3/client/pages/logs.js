import Head from 'next/head'
import React, {useCallback, useEffect, useState} from 'react';
import Menu from './Components/menu'
import Account from './Components/account'
import styles from '../styles/logs.module.css'
import Table from   './Components/table_logs'
import Page from './Components/pagination'
import stylesSearch from '../styles/search.module.css';
import stylesPagi from '../styles/pagination.module.css'

export default function Logs(props) {
    const [dataLog, setDataLog] = useState(props.data);
    const [dataNumber, setDataNumber] = useState(props.data);
    const [search, setSearch] = useState('');
    const [idx, setIndex] = useState(1);
    var page = [];

    function countpage()
    {   
        page = []
        var cnt = Math.ceil(dataNumber.length / 10);
        for (var i = 1; i <= cnt; i++)
            page.push(i);
        console.log("cnt", cnt);
    }
    countpage()
    async function searchItem()
    {
        const res = await fetch('http://localhost:3002/logs?search=' + search)
        const data = await res.json();
        const arr = []
        setDataNumber(data);
        setIndex(1)
        setDataNumber(data);
        countpage()
    }
    
    const nexpage =  useEffect(async() => {
        const data = dataNumber;
        const arr = []
        if (idx == '')
            idx = 1;
        var k = (idx - 1) * 10;
        for(var i = k; i < Math.min(k + 10, data.length); i++)
            arr.push(data[i]);
        setDataLog(arr);
   }, [idx])

    return (
        <body>
        <div class="flex-container">
            <Menu active="logs"></Menu>
            <div class="main">
                <Account></Account>
                <div className={styles.data}>
                    <div className={styles.data_header}>
                        <h3 className={styles.tag_h3}>Action Logs</h3>
                        <div id={stylesSearch["search"]}>
                            <form action="" className={stylesSearch.form_search}>
                                <input type="search" name="" id={stylesSearch["input_search"]} onChange={(e) => setSearch(e.target.value)} placeholder="name" aria-label="Search"/>
                                <button className={stylesSearch.btn_search} type="button" onClick={searchItem }>Search</button>
                            </form>
                        </div>
                    </div>
                    <div className={styles.data_footer}>
                        <Table data={dataLog}/>
                    </div>
                    <div class ="page">
                        <form action="" id={stylesPagi["form-page"]}>
                        {
                            page.map((i) => (
                                <button className={[stylesPagi.tag_button, i == idx ? stylesPagi.page_active : ''].join(" ")} onClick={() => setIndex(i)} type='button'><b>{i}</b> </button>
                            ))
                        }
                        </form>
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