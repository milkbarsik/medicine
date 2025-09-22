import { Link } from 'react-router-dom'
import styles from './header.module.css'

const Header = () => {
	return (
		<header className={styles.wrapper}>
			<div className={styles.mainBlock}>
				<Link to='/reception'>Начать прием</Link>
				<Link to='/medicines'>Лекарства</Link>
				<Link to='/diseases'>Болезни</Link>
			</div>
				<Link to='/'>Главная</Link>
		</header>
	)
}

export default Header;