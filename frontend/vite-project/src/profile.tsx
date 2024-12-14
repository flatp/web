import { useState } from 'react';
import React from 'react'

type Todo = {
  value: string;
  shop: string
  readonly id: number;
  checked: boolean;
};

export const Profile = () => {
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      shop: selectedOption,
      id: new Date().getTime(),
      checked: false,
    };

    setTodos((todos) => [newTodo, ...todos]);
    setText('');
  };

  const id_to_date = (id: number) => {
    const date = new Date(id);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + "年" + month + "月" + day + "日"
  };

  const [selectedOption, setSelectedOption] = useState("");

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };

  return (
    <div>
        <p>フレーバー</p>
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}>
            <input type="text" value={text} onChange={(e) => handleChange(e)} />
            <select value={selectedOption} onChange={(e) => handleSelectChange(e)}>
                <option value="SHISHA CAFE VELVET KYOTO">SHISHA CAFE VELVET KYOTO</option>
                <option value="水たばこ喫茶ソワカ">水たばこ喫茶ソワカ</option>
                <option value="SHEESHA CAFE Moch Pit">SHEESHA CAFE Moch Pit</option>
                <option value="Shisha cafe & bar home is">Shisha cafe & bar home is</option>
            </select>
            <input
                type="submit"
                value="追加"
                onSubmit={handleSubmit}
            />
        </form>
        <ul>
            {todos.map((todo) => {
                const todoDate = id_to_date(todo.id);
            return (
                <React.Fragment key={todo.id}>
                <div>{todoDate}</div>
                <li>                
                <h3>{todo.value}</h3>
                <h4>{todo.shop}</h4>
                <button onClick={() => console.log('removed!')}>ランキングに追加</button>
                </li>
                </React.Fragment>
            );
            })}
        </ul>
    </div>
  );
};