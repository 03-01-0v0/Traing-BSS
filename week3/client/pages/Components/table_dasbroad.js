import React, {useState, useEffect} from "react";
import styles from '../../styles/table.module.css'
export default function Table_dashbroad(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(props.data);
    },[props.data])
    var total = 0;
    return (
        <table id={styles["tb"]}>
            <thead>
            <tr key="tr_header">
                <th key="th_devices" className={styles.tag_th}>Devices</th>
                <th key="th_address" className={styles.tag_th}>MAC Address</th>
                <th key="th_IP" className={styles.tag_th}>IP</th>
                <th key="th_date" className={styles.tag_th}>Created Date</th>
                <th key="th_power" className={styles.tag_th}>Power Comsumption(Kw/H)</th>
            </tr>
            </thead>
            <tbody>
            {
                data.map((user) => (
                    total += parseInt(user.Power),
                    <tr key={"tr" + total} className={styles.tag_tr}>
                        <td key={user.device} className={styles.tag_td}>{user.device}</td>
                        <td key={user.Address} className={styles.tag_td}>{user.Address}</td> 
                        <td key={user["IP"]} className={styles.tag_td}>{user["IP"]}</td>
                        <td key={user.Date} className={styles.tag_td}>{user.Date}</td> 
                        <td key={user.Power} className={styles.tag_td}>{user.Power}</td>
                    </tr>
                ))
            }
            </tbody>
            <tfoot>
            <tr key="tr_footer" className={[styles.total, styles.tag_tr].join(" ")}>
                <td key="td_total" className={styles.tag_td} colSpan={4}><b>Total</b></td>
                <td key="td_sum" className={styles.tag_td}>{total}</td>
            </tr>
            </tfoot>
        </table>
    );
}