import { useState, useEffect } from 'react';
import styles from '../../styles/table_log.module.css'
export default function TableLog(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(props.data);
    },[props.data])
    var total = 0;
    return (
        <table id={styles["tb"]}>
            <thead>
        <tr key="tr_header" className={styles.tr_h}>
            <th className={styles.tag_th}>Device ID</th>
            <th className={styles.tag_th}>Name</th>
            <th className={styles.tag_th}>Action</th>
            <th className={styles.tag_th}>Date</th>
        </tr>
        </thead> 
        <tbody>
        {
            data.map((user) => (
                ++total,
            <tr key={"tr" + total} className={styles.tag_tr}>
                <td key={user.DeviceId} className={styles.tag_td}>{user.DeviceId}</td>
                <td key={user.Name} className={styles.tag_td}>{user.Name}</td> 
                <td key={user.Action} className={styles.tag_td}>{user.Action}</td> 
                <td key={user.Date} className={styles.tag_td}>{user.Date}</td>
            </tr>
        ))}
        </tbody>
        <tfoot>
        <tr key="tr_footer" className={[styles.total, styles.tag_tr].join(" ")}>
            <td key="td_total" className={styles.tag_td} colSpan={3}><b>Total</b></td>
            <td key="td_sum" className={styles.tag_td}>{data.length}</td>
         </tr>
         </tfoot>
        </table>
        
    )
}