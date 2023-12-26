import styles from '../Header.module.css';
import Header from '../header';

function About ()  {
    return (

        <div>
            <Header/>
            <div className={styles.container}>
                <h1>Лабораторна №6 Ебаут</h1>
            </div>
        </div>
    );
};

export default About;
