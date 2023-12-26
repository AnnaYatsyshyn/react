import styles from './Header.module.css';
import Link from 'next/link';
function Header()
{
    return(
    <header className={styles.header}>
    <div className={styles['site-title']}>
        <h1>Дзюбанчук</h1>
    </div>
    <nav>
    <ul className={styles['nav-links']}>
            <li>
                <Link href="/home">
                    <div>Домівка</div>
                </Link>
            </li><li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
            <li>
                <Link href="/about">
                    <div>Ебаут</div>
                </Link>
            </li><li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
            <li>
                <Link href="/catalog">
                    <div>Каталоги</div>
                </Link>
            </li><li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
        </ul>
    </nav>
</header>
)
}
export default Header;