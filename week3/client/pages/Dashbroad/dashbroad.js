import Menu from '../Global/menu'
import Acount from '../Global/account'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/dashbroad.module.css'


export default function Dashbroad() {
    return (
        <div>
            <Head>
                <meta charset="UTF-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Document</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            </Head>
            <body className={styles.body}>
                <div className={styles.flex_container}>
                    <Menu>

                    </Menu>
                    <div className={styles.main}>
                        <Acount>
                        </Acount>
                        <div className={styles.data}>

                        </div>
                    </div>

                </div>
            </body>
        
        </div>
    );
}