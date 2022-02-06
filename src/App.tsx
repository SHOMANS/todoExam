import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";

interface toDo {
  title: string;
  id: number;
  body: string;
}

const initialState = { title: "", body: "", id: 0 };

function App() {
  const [toDoList, setToDoList] = useState<toDo[]>([]);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [data, setData] = useState<toDo>(initialState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.body !== "" || data.title !== "") {
      if (isEditing) {
        // console.log(toDoList.findIndex((item) => item.id === data.id));
        const _toDoList: toDo[] = [...toDoList];
        _toDoList[toDoList.findIndex((item) => item.id === data.id)] = data;
        setToDoList(_toDoList);
        setIsEditing(false);
      } else {
        setToDoList([
          ...toDoList,
          { title: data.title, body: data.body, id: Math.random() },
        ]);
      }
    }

    setData(initialState);
  };

  const handleChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleDeleteToDoItem = (id: number) => {
    setToDoList(toDoList.filter((item) => item.id !== id));
  };
  const handleEditToDoItem = (data: toDo) => {
    setData(data);
    setIsEditing(true);
  };

  return (
    <div className="App">
      <h1>My List</h1>
      <ul>
        {toDoList.map((toDoItem) => (
          <li>
            <h3>{toDoItem.title}</h3>
            <p>{toDoItem.body}</p>
            <button onClick={() => handleDeleteToDoItem(toDoItem.id)}>
              delete
            </button>
            <button onClick={() => handleEditToDoItem(toDoItem)}>Edit</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleChangeInputs}
          value={data.title}
        />
        <label htmlFor="body">Body</label>
        <input
          type="text"
          name="body"
          id="body"
          onChange={handleChangeInputs}
          value={data.body}
        />
        <button type="submit">
          {isEditing ? "Edit Item" : "Add New To Do"}
        </button>
      </form>
    </div>
  );
}

export default App;
