import styles from './TodoSort.module.css';

export const TodoSort = ({ isSorted, setIsSorted }) => {
	const toggleSort = () => {
		setIsSorted(!isSorted);
	};

	return (
		<button className={styles.sortButton} onClick={toggleSort}>
			{isSorted ? 'Сбросить сортировку' : 'Сортировать'}
		</button>
	);
};
