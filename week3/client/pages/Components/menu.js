import styles from '../../styles/menu.module.css'
export default function Menu() {
    return (
        <nav className={styles.tag_nav} role="navigation">
        <div id={styles["menuToggle"]}>
            <input className={styles.tag_input} type="checkbox" />
            <span className={styles.tag_span}></span>
            <span className={styles.tag_span}></span>
            <span className={styles.tag_span}></span>
            <ul className={styles.tag_ul}>
                <li className={[styles.repon_account, styles.tag_li].join(" ")}><i class="material-icons">account_circle</i><a href="../html/dashbroad.html" className={styles.hover_nactive}>Welcom John</a></li>
                <li className={[styles.device_manager, styles.tag_li].join(" ")}><i class="material-icons">devices</i><a className={styles.hover_nactive} href="#">Device Manager</a></li>
                <li clasName={styles.tag_li}><i class="material-icons">devices_other</i><a href="../html/dashbroad.html" class="active">Dashbroad</a></li>
                <li clasName={styles.tag_li}><i class="material-icons">history</i><a href="../html/log.html">Logs</a></li>
                <li clasName={styles.tag_li}><i class="material-icons">settings</i><a href="#">Settings</a></li>
            </ul>
        </div>
        </nav>
    );
}