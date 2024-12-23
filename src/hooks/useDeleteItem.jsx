export const useDeleteItem = ({ setIsLoading, refreshTodoList, setRefreshTodoList }) => {
	const deleteItem = (id) => {
		setIsLoading(true);

		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
		}).then(() => setRefreshTodoList(!refreshTodoList));
	};

	return { deleteItem };
};
