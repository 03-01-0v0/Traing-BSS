import Styles from '../../styles/menu.module.css'
// import Repons from '../../styles/reponsive.module.css'
export default function Menu() {
    return (
        <nav className={Styles.nav} role="navigation">
        <div id={Styles["menuToggle"]}>
            <input className={Styles.input} type="checkbox" />
            <span className={Styles.span}></span>
            <span className={Styles.span}></span>
            <span className={Styles.span}></span>
            <ul id="menu"> 
                <li className={[Styles.repon_account, Styles.li].join(" ")}><i id ={Styles["i"]} class="material-icons">account_circle</i><a className={[Styles.a, Styles.hover_nactive].join(" ")} href="../html/dashbroad.html">Welcom John</a></li>
                <li className={[Styles.device_manager, Styles.li].join(" ")}><i id ={Styles["i"]} class="material-icons">devices</i><a className={[Styles.a, Styles.hover_nactive].join(" ")}href="#">Device Manager</a></li>
                <li className={Styles.li}><i id ={Styles["i"]} class="material-icons">devices_other</i><a className={[Styles.a, Styles.active].join(" ")} href="../html/dashbroad.html">Dashbroad</a></li>
                <li className={Styles.li}><i id ={Styles["i"]} class="material-icons">history</i><a className={Styles.a} href="../html/log.html">Logs</a></li>
                <li className={Styles.li}><i id ={Styles["i"]} class="material-icons">settings</i><a className={Styles.a} href="#">Settings</a></li>
            </ul>
        </div>
        </nav>
    );
}