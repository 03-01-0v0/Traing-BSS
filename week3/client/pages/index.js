import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router';
import React, {useCallback, useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import styles from '../styles/login.module.css'
import Link from 'next/link'


export default function Home() {
    const [logError, setLogError] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(async() => {
        await setMounted(true);
    }, [])

    async function isSuccessLogin(e) {
        e.preventDefault();
        const res = await fetch('http://localhost:3002/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userName,
                password: password
            }),
        })
            .then((data) => {
                if (data && data.status === 404) {
                    setLogError('Username or password invalid');
                } else {
                    Router.push('dashbroad');
                }
            });
    }

    return ( mounted &&
        <body className={styles.body}>
            <Head>
                <meta name="description" content="Generated by create next app" />
                <meta charset="UTF-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Login Page</title>
            </Head>
            
                <div className={styles.login}>
                    <h3 className={styles.h3}>Login Page</h3>
                    <form classame="form-login">
                        <input type="text" className={styles.account} value={userName} name="username" id="username" placeholder="username" required
                            onInvalid ={e => e.target.setCustomValidity('Please, Enter User Name Here')} onInput={e => e.target.setCustomValidity('')} onChange={(e) => setUserName(e.target.value)}>
                        </input>
                        <input type="password" className={styles.account} value={password} name="password" id="password" placeholder="password" required
                            onInvalid ={e => e.target.setCustomValidity('Please, Enter Password Here')} onInput={e => e.target.setCustomValidity('')} onChange={(e) => setPassword(e.target.value)}    >
                        </input>
                        {logError && <span className={styles.danger}>{logError}</span>}
                        <button type="button"onClick={isSuccessLogin} className={[styles.btn, styles.btn_login].join(" ")}>Login</button>
                        <a className={styles.a}>Forgot Password?</a>
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