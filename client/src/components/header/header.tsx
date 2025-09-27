import { Link } from 'react-router-dom'
import styles from './header.module.css'
import { useAuth } from '../../store/userStore'

const Header = () => {

	const {logOut} = useAuth();

	return (
		<header className={styles.wrapper}>
			<div className={styles.mainBlock}>
				<Link to='/reception'>Начать прием</Link>
				<Link to='/medicines'>Лекарства</Link>
				<Link to='/diseases'>Болезни</Link>
				<Link to='/patients'>Пациенты</Link>
			</div>
			<div className={styles.sideBlock}>
				<Link to='/'>Главная</Link>
				<Link to='/' onClick={() => {logOut()}}>Выйти</Link>
			</div>
		</header>
	)
}

export default Header;