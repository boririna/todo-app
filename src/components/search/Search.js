// usf create useState
// enf create export named function
// edf create export default function
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Search.module.css';

export const Search = ({ onChange, searchValue }) => {
	return (
		<div className={styles.search}>
			<div className={styles.icon}>
				<FontAwesomeIcon icon="magnifying-glass" size="lg" />
			</div>

			<input
				className={styles.inputField}
				type="text"
				value={searchValue}
				onChange={onChange}
			/>
		</div>
	);
};
