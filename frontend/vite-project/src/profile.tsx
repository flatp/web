import { useState } from 'react';
import React from 'react'

type Todo = {
  value: string;
  shop: string;
  memo: string;
  readonly id: number;
  checked: boolean;
};

export const Profile = () => {
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const [memo, setMemo] = useState('');

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value);
  };

  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      shop: selectedOption,
      memo: memo,
      id: new Date().getTime(),
      checked: false,
    };

    setTodos((todos) => [newTodo, ...todos]);
    setText("");
    setMemo("");
  };

  const id_to_date = (id: number) => {
    const date = new Date(id);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + "年" + month + "月" + day + "日"
  };

  const [selectedOption, setSelectedOption] = useState("SHISHA CAFE VELVET KYOTO");

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };

  return (
    <div>
        <form
            className="profile-form"
            onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}>
            <div>フレーバー名</div>
            <input type="text" value={text} className="input-text" onChange={(e) => handleChange(e)} />
            <div>店名</div>
            <select value={selectedOption} className="select-dropdown" onChange={(e) => handleSelectChange(e)}>
                <option value="SHISHA CAFE VELVET KYOTO">SHISHA CAFE VELVET KYOTO</option>
                <option value="水たばこ喫茶ソワカ">水たばこ喫茶ソワカ</option>
                <option value="SHEESHA CAFE Moch Pit">SHEESHA CAFE Moch Pit</option>
                <option value="Shisha cafe & bar home is">Shisha cafe & bar home is</option>
            </select>
            <div>メモ</div>
            <input type="text" value={memo} className="input-text" onChange={(e) => handleChange2(e)} />
            <input
                type="submit"
                value="追加"
                className="submit-button"
                onSubmit={handleSubmit}
            />
        </form>
        <ul className="todo-list">
            {todos.map((todo) => {
                const todoDate = id_to_date(todo.id);
            return (
                <React.Fragment key={todo.id}>
                
                <li className="todo-item">  
                <div className="todo-date">{todoDate}</div>
                <div className="todo-details">            
                <h3>{todo.value}</h3>
                <h4>{todo.shop}</h4>
                <div className="todo-date">{todo.memo}</div>
                </div>  
                <button className="rank-button" onClick={() => console.log('removed!')}>投稿</button>
                </li>
                </React.Fragment>
            );
            })}
        </ul>
    </div>
  );
};