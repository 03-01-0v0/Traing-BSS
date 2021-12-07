import React, {useCallback, useEffect, useState} from 'react';
import styles from '../../styles/pagination.module.css'

export default function Page(props) {
    const [dataLog, setDataLog] = useState(props.data)
    console.log(dataLog)
    var cnt = Math.ceil(10 / 10);
    const page = [];
    for (var i = 1; i <= 5; i++)
        page.push(i);
    console.log("page", page);
    function nextpage(idx)
    {

    }
    return (
        <form action="" id="form-page">
        {
            page.map((i) => {
                <button className={styles.tag_button} onClick={nextpage(i)} type='button'><b>{i}</b> </button>
            })
        }
        </form>
    );
}