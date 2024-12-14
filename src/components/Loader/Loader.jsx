import styles from './Loader.module.css';

export const Loader = ({ visible }) => {
	return (
		visible && (
			<>
				<div className={styles.overlay}></div>
				<div className={styles.loader}></div>
			</>
		)
	);
};
