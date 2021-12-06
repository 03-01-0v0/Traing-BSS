import styles from '../../styles/table_log.module.css'
export default function TableLog(props) {
    const data = props.data;
    var total = 0;
    return (
        <table id={styles["tb"]}> 
        <tr className={styles.tr_h}>
            <th className={styles.tag_th}>Device ID</th>
            <th className={styles.tag_th}>Name</th>
            <th className={styles.tag_th}>Action</th>
            <th className={styles.tag_th}>Date</th>
        </tr>
        {
            data.map((user) => (
            ++total,
            <tr className={styles.tag_tr}>
                <td className={styles.tag_td}>{user.DeviceId}</td>
                <td className={styles.tag_td}>{user.Name}</td> 
                <td className={styles.tag_td}>{user.Action}</td> 
                <td className={styles.tag_td}>{user.Date}</td>
            </tr>
        ))}
        <tr className={[styles.total, styles.tag_tr].join(" ")}>
            <td className={styles.tag_td} colSpan={3}><b>Total</b></td>
            <td className={styles.tag_td}>{total}</td>
         </tr>
        </table>
    )
}