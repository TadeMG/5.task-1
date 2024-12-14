import styles from './TodoSearch.module.css';

export const TodoSearch = ({ onSearch, searchValue }) => {
	const handleChange = (event) => onSearch(event.target.value);

	return (
		<input
			name="searchInput"
			className={styles.searchInput}
			type="text"
			placeholder="Поиск"
			value={searchValue}
			onChange={handleChange}
		/>
	);
};
