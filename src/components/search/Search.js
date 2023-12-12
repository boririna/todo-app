// usf create useState
// enf create export named function
// edf create export default function

import styles from './Search.module.css';

export const Search = ({ onChange, searchValue }) => {
	return (
		<div className={styles.search}>
			<input
				className={styles.inputField}
				type="text"
				value={searchValue}
				onChange={onChange}
			/>
		</div>
	);
};
