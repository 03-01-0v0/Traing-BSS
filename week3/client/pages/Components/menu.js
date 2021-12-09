import styles from '../../styles/menu.module.css'
import React, {useState, useCallback, useEffect} from 'react'
import { useRouter } from 'next/router';
export default function Menu(props) {

    const router = useRouter();
    function handleClick(e)  {
        e.preventDefault();
        router.push(e.target.href);
    }
    
    return (
        <nav className={styles.tag_nav} role="navigation">
        <div id={styles["menuToggle"]}>
            <input className={styles.tag_input} type="checkbox" />
            <span className={styles.tag_span}></span>
            <span className={styles.tag_span}></span>
            <span className={styles.tag_span}></span>
            <ul className={styles.tag_ul}>
                <li className={[styles.repon_account, styles.tag_li].join(" ")}><i class="material-icons">account_circle</i><a className={[styles.hover_nactive, styles.tag_a].join(" ")}>Welcom John</a></li>
                <li className={[styles.device_manager, styles.tag_li].join(" ")}><i class="material-icons">devices</i><a className={[styles.hover_nactive, styles.tag_a].join(" ")} href="#">Device Manager</a></li>
                <li clasName={styles.tag_li}><i class="material-icons">devices_other</i><a href="dashbroad" onClick={handleClick} className ={[props.active === "dashbroad" ? styles.active : '', styles.tag_a].join(" ")}>Dashbroad</a></li>
                <li clasName={styles.tag_li}><i class="material-icons">history</i><a href="logs" onClick={handleClick} className ={props.active === "logs" ? styles.active : ''}>Logs</a></li>
                <li clasName={styles.tag_li}><i class="material-icons">settings</i><a href="#">Settings</a></li>
            </ul>
        </div>
        </nav>
    );
}