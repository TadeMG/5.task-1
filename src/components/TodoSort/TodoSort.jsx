import styles from './TodoSort.module.css';

export const TodoSort = ({ isLoading, isSorted, setIsSorted }) => {
	const toggleSort = () => {
		setIsSorted(!isSorted);
	};

	return (
		<button className={styles.sortButton} onClick={toggleSort} disabled={isLoading}>
			{isSorted ? 'Сбросить сортировку' : 'Сортировать'}
		</button>
	);
};
