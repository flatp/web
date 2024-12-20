import { useEffect, useState } from 'react';
import React from 'react'
import { createPost, getUserPosts, getShops } from './api';

export const Profile = () => {

  const handleCreatePost = async () => {
    try {
      const postData = {
        id: new Date().getTime(),
        userid: 1, // 投稿者のID
        name: text,
        shopid: selectedOption, // 店舗ID
        memo: memo,
      };
      const response = await createPost(postData);
      console.log('Post created:', response.data);
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

  const [shops, setShops] = useState([]);

  const fetchShops = async () => {
    try {
      const response = await getShops(); 
      setShops(response.data);
    } catch (error) {
      console.error('Error fetching shops:', error);
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

  const [detail, setDetail] = useState<Boolean>(false);

  const handleSubmit = async () => {
    if (!text) {alert('フレーバーを入力してください'); return;}
    if(selectedOption === 0) {alert('店舗を選択してください'); return;}

    await handleCreatePost();
    await fetchUserPosts();
    setText("");
    setMemo("");
    setDetail(false);
  };

  const id_to_date = (id: number) => {
    const date = new Date(id);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + "年" + month + "月" + day + "日"
  };

  const [selectedOption, setSelectedOption] = useState(0);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(Number(e.target.value));
  };

  useEffect(() => {
    fetchUserPosts();
    fetchShops();
  }, []);

  return (
    <div>
        <form
            className="profile-form"
            onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}>
            <div>フレーバー</div>
            <input type="text" value={text} className="input-text" onChange={(e) => handleChange(e)} />
            <div>店舗</div>
            <select value={selectedOption} className="select-dropdown" onChange={(e) => handleSelectChange(e)}>
              <option value="0">店舗を選択してください</option>
              {shops.map((shop: any) => (
              <option key={shop.id} value={String(shop.id)}>
                  {shop.name}
              </option>
              ))}
            </select>
            {!detail && 
              <button type="submit" className="detail-button" onClick={() => setDetail(!detail)}>▼</button>
            }
            {detail &&
            <>
            <div>メモ</div>
            <input type="text" value={memo} className="input-text" onChange={(e) => handleChange2(e)} />
            <button type="submit" className="detail-button" onClick={() => setDetail(!detail)}>▲</button>
            </>
            }
            
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
                </li>
                </React.Fragment>
            );
            })}
        </ul>
    </div>
  );
};