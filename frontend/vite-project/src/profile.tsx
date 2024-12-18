import { useEffect, useState } from 'react';
import React from 'react'
import { createPost, getUserPosts } from './api';

type Todo = {
  value: string;
  shop: string;
  memo: string;
  readonly id: number;
  checked: boolean;
};

export const Profile = () => {

  const handleCreatePost = async () => {
    try {
      const postData = {
        id: new Date().getTime(),
        userid: 1, // 投稿者のID
        name: text,
        shopid: 1, // 店舗ID
        memo: memo,
      };
      const response = await createPost(postData);
      console.log('Post created:', response.data);
      alert('投稿が作成されました');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const [userPosts, setUserPosts] = useState([]);

  const fetchUserPosts = async () => {
    try {
      const response = await getUserPosts(1); 
      setUserPosts(response.data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const [memo, setMemo] = useState('');

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value);
  };

  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = async () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      shop: selectedOption,
      memo: memo,
      id: new Date().getTime(),
      checked: false,
    };

    setTodos((todos) => [newTodo, ...todos]);
    await handleCreatePost();
    await fetchUserPosts();
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

  useEffect(() => {
    fetchUserPosts();
  }, []);

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
            {userPosts.map((post: any) => {
                const todoDate = id_to_date(post.id);
            return (
                <React.Fragment key={post.id}>
                
                <li className="todo-item">  
                <div className="todo-date">{todoDate}</div>
                <div className="todo-details">            
                <h3>{post.name}</h3>
                <h4>{post.shop.name}</h4>
                <div className="todo-date">{post.memo}</div>
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