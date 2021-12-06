import styles from '../../styles/search.module.css';
export default function Search() {
    return (
        <div id={styles["search"]}>
        <form action="" className={styles.form_search}>
            <input type="search" name="" id={styles["input_search"]} placeholder="name" aria-label="Search"/>
            <button className={styles.btn_search} type="button" onclick="return searchItem()">Search</button>
        </form>
    </div>
    )
}