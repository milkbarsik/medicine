import type { InputHTMLAttributes } from 'react';
import styles from './myInput.module.css';

const MyInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<input className={styles.input} {...props} />
	)
}

export default MyInput;