export const useChangeItem = ({ setIsLoading, refreshTodoList, setRefreshTodoList }) => {
	const changeItem = ({ id, title, completed }) => {
		setIsLoading(true);

		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				id,
				title,
				completed,
			}),
		}).then(() => setRefreshTodoList(!refreshTodoList));
	};

	return { changeItem };
};
