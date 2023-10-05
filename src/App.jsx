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
    <div className="bg-black w-full min-h-screen p-5">
      {/* 배경색 검정, 너비 100%, 최소 높이 화면 높이, 패딩 전체 방향 1.25rem */}
      <h1 className="text-2xl font-bold text-center mb-8 text-white">TodoList</h1>
      {/* 텍스트 크기 2xl, 굵은 글씨체, 텍스트 가운데 정렬, 마진 하단 2rem, 텍스트 색상 흰색 */}
      <div className="overflow-y-auto mb-16 max-h-[calc(100vh-200px)] md:w-1/2 mx-auto">
        {/* 세로 스크롤이 필요할 때 자동으로 스크롤바 생성, 마진 하단 4rem, 최대 높이는 화면 높이에서 200px 뺀 값,
        중간 사이즈 화면에서 너비 50%, 좌우 마진 자동(가운데 정렬) */}
        <ul>
          {todoList.map((singleTodo) => (
            <li key={singleTodo.id} className="flex justify-between text-white py-5 px-5 rounded-lg text-2xl mb-5">
              {/* 플렉스박스 레이아웃, 플렉스 아이템들은 최대한 양 끝으로 배치, 텍스트 색상 흰색,
              상하 패딩 1.25rem, 좌우 패딩 1.25rem, 모서리 약간 둥글게, 텍스트 크기 2xl, 마진 하단 1.25rem */}
              {editingId === singleTodo.id ? (
                <form onSubmit={handleEditForm}>
                  <input
                    className="w-full p-5 mb-7 text-black text-center placeholder:gray-500 rounded-lg"
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    placeholder="Edit Todo"
                  />
                  {/* 테두리 두께 2, 테두리 색상 검정, 너비 100%, 패딩 전체 방향 1.25rem, 마진 하단 1.75rem,
                  텍스트 색상 검정, 텍스트 가운데 정렬, 플레이스홀더 색상 회색, 모서리 약간 둥글게 */}
                </form>
              ) : (
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
                className="text-red-600 text-2xl cursor-pointer "
                onClick={() => deleteTodo(singleTodo.id)}
              >
                {/* 텍스트 색상 레드, 텍스트 크기 2xl, 커서 포인터 */}
                Finish
              </button>
            </li>
          ))}
        </ul>
      </div>
      <form
        onSubmit={handleForm}
        className="fixed bottom-0 left-1/2 text-center transform -translate-x-1/2 w-screen md:w-2/3 bg-black p-5 "
      >
        {/* 포지션 fixed, 하단 정렬, left는 가운데 정렬, 너비 100%, 중간 사이즈 화면에서 너비 66.6667% */}
        <input
          className="w-full p-5 mb-7 text-black text-center placeholder:gray-500 rounded-lg"
          type="text"
          placeholder="Add Todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        {/* 동일한 스타일이 위의 input과 중복 */}
        <button type="submit" className="bg-red-600 text-white text-center py-3 px-8 rounded-lg mb-5">
          {/* 배경색 레드, 텍스트 색상 흰색, 상하 패딩 0.75rem, 좌우 패딩 2rem, 모서리 약간 둥글게, 마진 하단 1.25rem */}
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default App;
