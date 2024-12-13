import styles from './TodoSearch.module.css';

export const TodoSearch = ({
	isLoading,
	isSearching,
	setIsSearching,
	searchTerm,
	setSearchTerm,
}) => {
	const toggleSearch = () => {
		setIsSearching(!isSearching);

		if (isSearching) {
			setSearchTerm('');
		}
	};

	return (
		<div className={styles.searchContainer}>
			<button
				className={styles.searchButton}
				onClick={toggleSearch}
				disabled={isLoading}
			>
				Поиск
			</button>
			<input
				name="searchInput"
				className={styles.searchInput}
				type="text"
				value={searchTerm}
				hidden={!isSearching}
				onChange={(event) => setSearchTerm(event.target.value)}
			/>
		</div>
	);
};
