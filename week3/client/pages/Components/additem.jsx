import styles from '../../styles/additem.module.css'
export default function addItem(props) {
    return (
        <form action="" id={styles["input_item"]}>
            <input type="text" className={styles.new_item} name="nameitem" id="nameitem" placeholder="name" required
                oninvalid="this.setCustomValidity('Please, enter name here')"
                oninput="this.setCustomValidity('')"/>
            <input type="text" className={styles.new_item} name="IP" id="IP" placeholder="IP" required
                oninvalid="this.setCustomValidity('Please, enter IP here')"
                oninput="this.setCustomValidity('')"/>
            <button type="button" onclick="addItem()" className={styles.btn_add}>ADD DEVICE</button>
        </form>
    );
}