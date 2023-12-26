import styles from '../Header.module.css';
export  default function LoadingProducts(){
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Загрузка...</h1>
        </div>

    )
}