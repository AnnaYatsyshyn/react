// Home.tsx
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../Header.module.css';
import Header from '../header';

function Home ()  {
    return (
<div>
        <Header/>
            <div className={styles.container}>
                <h2 className={styles['title']} >Лабораторна №6 Домівка</h2>
            </div>
        </div>
    );
};

export default Home;
