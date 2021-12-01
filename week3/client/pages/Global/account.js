import styles from '../../styles/dashbroad.module.css'
export default function Account() {
    return (
        <div className={styles.account}>
            <p className={styles.p}>Welcome John<i id={styles["i"]} class="material-icons">account_circle</i></p>
        </div>
    )
}