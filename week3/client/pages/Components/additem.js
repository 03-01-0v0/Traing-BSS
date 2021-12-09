import { useCallback, useState } from 'react';
import styles from '../../styles/additem.module.css'
export default function addItem(props) {
    const [addError, setAddError] = useState('');
    const [nameDevice, setNameDevice] = useState('');
    const [IP, setIP] = useState('');

    const addItem =  useCallback(async() => {
         const res = await fetch('http://localhost:3002/devices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                device: nameDevice,
                ip: IP
            }),
        })
            .then((r) => {
                console.log(r)
                return r;
            })
            .then((data) => {
                if (data && data.status === 404) {
                    setAddError('Please try again');
                } else {
                    props.getData()
                }
            });
    }, [nameDevice, IP])

    return (
        <form action="" id={styles["input_item"]}>
            <input type="text" className={styles.new_item} name="nameitem" id="nameitem" placeholder="name" required
                onInvalid ={e => e.target.setCustomValidity('Please, Enter Name Here')} onInput={e => e.target.setCustomValidity('')} onChange={(e) => setNameDevice(e.target.value)} />
            <input type="text" className={styles.new_item} name="IP" id="IP" placeholder="IP" required
                 onInvalid ={e => e.target.setCustomValidity('Please, Enter IP Here')} onInput={e => e.target.setCustomValidity('')} onChange={(e) => setIP(e.target.value)} />
            <button type="button" onClick={addItem} className={styles.btn_add}>ADD DEVICE</button>
        </form>
    );
}