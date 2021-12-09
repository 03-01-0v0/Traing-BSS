import React, {useCallback, useEffect, useState} from 'react';
import styles from '../../styles/pagination.module.css'

export default function Page(props) {
    var cnt = Math.ceil(props.data.length / 10);
    const page = [];
    for (var i = 1; i <= cnt; i++)
        page.push(i);
    function nextpage(idx)
    {

    }
    return (
        <form action="" id={styles["form-page"]}>
        {
            page.map((i) => (
                <button className={styles.tag_button} onClick={nextpage(i)} type='button'><b>{i}</b> </button>
            ))
        }
        </form>
    );
}