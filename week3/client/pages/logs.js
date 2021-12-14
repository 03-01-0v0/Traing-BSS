import Head from 'next/head'
import React, {useCallback, useEffect, useState} from 'react';
import Menu from './Components/menu'
import Account from './Components/account'
import styles from '../styles/logs.module.css'
import Table from   './Components/table_logs'
import stylesSearch from '../styles/search.module.css';
import stylesPagi from '../styles/pagination.module.css'

export default function Logs(props) {
    const [dataLog, setDataLog] = useState(props.data);
    const [dataNumber, setDataNumber] = useState(props.data);
    const [search, setSearch] = useState('');
    const [idx, setIndex] = useState(1);
    const [mounted, setMounted] = useState(false);

    useEffect(async() => {
        await setMounted(true);
    }, [])
    var page = [];

    function countpage()
    {   
        page = []
        var cnt = Math.ceil(dataNumber.length / 10);
        for (var i = 1; i <= cnt; i++)
            page.push(i);
    }
    countpage()
    async function searchItem()
    {
        const res = await fetch('http://localhost:3002/logs?search=' + search)
        const data = await res.json();
        const arr = []
        var idx = 1;
        var k = (idx - 1) * 10;
        for(var i = k; i < Math.min(k + 10, data.length); i++)
            arr.push(data[i]);
        setDataLog(arr)
        setDataNumber(data);
        countpage()
        setIndex(1)
    }

    
    const nexpage =  useEffect(() => {
        const arr = []
        if (idx == '')
            idx = 1;
        var k = (idx - 1) * 10;
        for(var i = k; i < Math.min(k + 10, dataNumber.length); i++)
            arr.push(dataNumber[i]);
        setDataLog(arr);
   }, [idx])

    return ( mounted && 
        <body>
        <div className="flex-container">
            <Menu active="logs"></Menu>
            <div className="main">
                <Account></Account>
                <div className={styles.data}>
                    <div className={styles.data_header}>
                        <h3 className={styles.tag_h3}>Action Logs</h3>
                        <div id={stylesSearch["search"]}>
                            <form action="" className={stylesSearch.form_search}>
                                <input type="search" name="" id={stylesSearch["input_search"]} onChange={(e) => setSearch(e.target.value)} placeholder="name" aria-label="Search"/>
                                <button key="btn_click" className={stylesSearch.btn_search} type="button" onClick={searchItem }>Search</button>
                            </form>
                        </div>
                    </div>
                    <div className={styles.data_footer}>
                        <Table data={dataLog}/>
                    </div>
                    <div className ="page">
                        <form action="" id={stylesPagi["form-page"]}>
                        {
                            page.map((i) => (
                                <button key={i} className={[stylesPagi.tag_button, i == idx ? stylesPagi.page_active : ''].join(" ")} onClick={() => setIndex(i)} type='button'><b>{i}</b> </button>
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