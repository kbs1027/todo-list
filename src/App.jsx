import React from 'react';

function App() {
  // 'todo'와 'setTodo'는 하나의 할 일을 관리하는 state와 그 state를 업데이트하는 함수입니다.
  // 'todoList'와 'setTodoList'는 전체 할 일 목록을 관리하는 state와 그 state를 업데이트하는 함수입니다.
  const [todo, setTodo] = React.useState('');
  const [todoList, setTodoList] = React.useState([]);

  const [editingId, setEditingId] = React.useState(null);
  const [editingText, setEditingText] = React.useState('');

  const handleForm = (e) => {
    e.preventDefault();
    // 빈 문자열이면 추가하지 않습니다.
    if (todo.trim() === '') {
      return;
    }
    setTodoList([...todoList, { id: new Date().getTime(), todoName: todo }]);
    setTodo('');
  };

  const handleEditForm = (e) => {
    e.preventDefault();
    // 빈 문자열이면 업데이트하지 않습니다.
    if (editingText.trim() === '') {
      alert('Todo cannot be empty!');
      return;
    }
    // 기존의 할 일 목록에서 편집된 항목을 찾아 업데이트합니다.
    const newTodoList = todoList.map((singleTodo) =>
      singleTodo.id === editingId ? { ...singleTodo, todoName: editingText } : singleTodo,
    );
    setTodoList(newTodoList);
    setEditingId(null); // 편집 모드 종료
  };

  // 'deleteTodo' 함수는 할 일을 삭제할 때 호출됩니다.
  const deleteTodo = (deleteId) => {
    // 'deleteId'와 일치하지 않는 할 일만을 남기고 새로운 배열을 생성합니다.
    const newTodoList = todoList.filter((singleTodo) => {
      return singleTodo.id !== deleteId;
    });
    setTodoList(newTodoList); // 'todoList' state를 업데이트합니다.
  };

  return (
    <div className="bg-gray-200 w-full min-h-screen p-5">
      <h1 className="text-5xl font-bold text-center mb-8">TodoList</h1>
      <div className="overflow-y-auto mb-16 max-h-[calc(100vh-200px)]">
        <ul>
          {todoList.map((singleTodo) => (
            <li
              key={singleTodo.id}
              className="bg-black flex justify-between text-white py-5 px-5 rounded-lg text-3xl mb-5"
            >
              {editingId === singleTodo.id ? (
                // 편집 모드: 입력 필드를 보여줍니다.
                <form onSubmit={handleEditForm}>
                  <input
                    className="border-2 border-black w-full p-5  mb-7 text-black text-center placeholder:text-gray-500 rounded-lg"
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                </form>
              ) : (
                // 일반 모드: 할 일 텍스트를 보여줍니다.
                <span
                  onClick={() => {
                    setEditingId(singleTodo.id);
                    setEditingText(singleTodo.todoName);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setEditingId(singleTodo.id);
                      setEditingText(singleTodo.todoName);
                    }
                  }}
                >
                  {singleTodo.todoName}
                </span>
              )}
              <button
                type="submit"
                className="text-red-600 text-3xl cursor-pointer "
                onClick={() => deleteTodo(singleTodo.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* 이 부분은 푸터로 이동합니다. */}
      <form onSubmit={handleForm} className="fixed bottom-0 text-center left-0 w-full bg-white p-5">
        <input
          className="border-2 border-black w-full p-5 mb-7 text-black text-center placeholder:gray-500 rounded-lg"
          type="text"
          placeholder="Add Todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit" className="bg-red-600 text-white  py-3 px-8 rounded-lg mb-5">
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default App;
