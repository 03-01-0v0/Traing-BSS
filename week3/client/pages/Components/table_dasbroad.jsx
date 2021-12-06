import React, {useState} from "react";
import styles from '../../styles/table.module.css'
export default function Table_dashbroad(props) {
    const data = props.data;
    var total = 0;
    return (
        <table id={styles["tb"]}>
            <tr>
                <th className={styles.tag_th}>Devices</th>
                <th className={styles.tag_th}>MAC Address</th>
                <th className={styles.tag_th}>IP</th>
                <th className={styles.tag_th}>Created Date</th>
                <th className={styles.tag_th}>Power Comsumption(Kw/H)</th>
            </tr>
            {
                data.map((user) => (
                    total += parseInt(user.Power),
                    <tr className={styles.tag_tr}>
                        <td className={styles.tag_td}>{user.device}</td>
                        <td className={styles.tag_td}>{user.Address}</td> 
                        <td className={styles.tag_td}>{user["IP"]}</td>
                        <td className={styles.tag_td}>{user.Date}</td> 
                        <td className={styles.tag_td}>{user.Power}</td>
                    </tr>
                ))
            }
            <tr className={[styles.total, styles.tag_tr].join(" ")}>
                <td className={styles.tag_td} colSpan={4}><b>Total</b></td>
                <td className={styles.tag_td}>{total}</td>
            </tr>
        </table>
    );
}