import React from 'react';

function App() {
  // 'todo'와 'setTodo'는 하나의 할 일을 관리하는 state와 그 state를 업데이트하는 함수입니다.
  // 'todoList'와 'setTodoList'는 전체 할 일 목록을 관리하는 state와 그 state를 업데이트하는 함수입니다.
  const [todo, setTodo] = React.useState('');
  const [todoList, setTodoList] = React.useState([]);

  // 'handleForm' 함수는 폼이 제출될 때 호출됩니다.
  const handleForm = (e) => {
    e.preventDefault(); // 폼 제출에 의한 페이지 리로딩을 방지합니다.
    // 새로운 할 일을 'todoList' state에 추가합니다.
    setTodoList([...todoList, { id: new Date().getTime(), todoName: todo }]);
    setTodo(''); // 'todo' state를 초기화하여 입력 필드를 비웁니다.
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
    // bg는 background, w는 width, h는 height flex는 display: flex, items-center는 align-items: center
    <div className="bg-gray-300 w-full h-screen">
      {/* w-[500px]는 width: 500px, mx-auto는 margin: 0 auto p는 padding */}
      <div className="w-[500px] mx-auto text-center bg-white p-5 bg-gray-300">
        <h1 className="text-5xlxw font-bold text-center mb-8">TodoList</h1>
        <div>
          <ul>
            {todoList.map((singleTodo) => (
              <li
                key={singleTodo.id}
                className="bg-black flex justify-between text-white py-5 px-5 rounded-lg text-3xl mb-5"
              >
                {singleTodo.todoName}
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
        <form onSubmit={handleForm}>
          <input
            // border는 테두리 2px, border-color는 테두리 색상, w-full은 width: 100%, p는 padding, mb는 margin-bottom
            className="border-2 border-black w-full p-5  mb-7
            text-black text-center placeholder:text-gray-500 rounded-lg"
            type="text"
            placeholder="Add Todo"
            value={todo}
            // onChange는 입력 필드에 입력된 값이 변경될 때마다 호출되는 함수입니다.
            onChange={(e) => setTodo(e.target.value)}
          />
          {/* submit은 type="submit"인 버튼을 눌렀을 때 실행되는 함수 py는 padding-y, px는 padding-x */}
          <button type="submit" className="bg-red-600 text-white py-3 px-8 rounded-lg mb-5">
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
