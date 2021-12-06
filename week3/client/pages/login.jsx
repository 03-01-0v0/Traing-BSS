import styles from '../styles/login.module.css'
import Link from 'next/link'
export default function Login() {
    return (
        <body className={styles.body}>
        <div className={styles.login}>
            <h3 className={styles.h3}>Login Page</h3>
            <form action="" name="form-login">
                <input type="text" className={styles.account} name="username" id="username" placeholder="username" required
                    oninvalid="this.setCustomValidity('Please, enter user name here')" oninput="this.setCustomValidity('')">
                </input>
                <input type="password" className={styles.account} name="password" id="password" placeholder="password" required
                    oninvalid="this.setCustomValidity('Please, enter password here')" oninput="this.setCustomValidity('')">
                </input>
                <p id="demo"></p>
                <button type="button" onclick="isSuccessLogin()" className={[styles.btn, styles.btn_login].join(" ")}>Login</button>
                <Link href="../logs"><a className={styles.a}>Forgot Password?</a></Link>
                <a className={styles.a} href="#">Create new account</a>
                <button className={[styles.btn, styles.btn_login_google].join(" ")}>
                    <span>Login with google account </span>
                </button>
                <button className={[styles.btn, styles.btn_login_fb].join(" ")}>
                    <span>Login with facebook account </span>
                </button>
            </form>
        </div>
        </body>
    );
}