'use client';

import styles from "@/app/Header.module.css";

export default function ErrorMessage({error}: {error: Error}){
return(
    <div className={styles.container}>
        <h1 className={styles.title}>You have an error: {error.message}</h1>
    </div>

)
}