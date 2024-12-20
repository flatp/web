import { useEffect, useState } from 'react';
import React from 'react'
import { getLikePosts, unlikePost } from './api';

export const Fav = () => {
    const [posts, setPosts] = useState([]);
    
    const fetchLikePosts = async () => {
      try {
        const response = await getLikePosts(1);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching following posts:', error);
      }
    };

    const handleUnlike = async (postId:number, userId:number) => {
      try {
        await unlikePost(postId, userId);
        await fetchLikePosts();
      } catch (error) {
        console.error('Error unliking post:', error);
      }
    };

    const id_to_date = (id: number) => {
      const date = new Date(id);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return year + "年" + month + "月" + day + "日"
    };

    useEffect(() => {
      fetchLikePosts();
      }, []);

    return (
        <ul className="todo-list">
            {posts.map((post:any) => {
                const todoDate = id_to_date(post.id);
            return (
                <React.Fragment key={String(post.id)}>
                <li className="todo-item"> 
                <div className="post_top">
                <div className="todo-user">{post.user.name}</div>
                <div className="todo-date2">{todoDate}</div>
                </div> 
                <div className="todo-details">            
                <h3>{post.name}</h3>
                <h4>{post.shop.name}</h4>
                <div className="todo-date">{post.memo}</div>
                <button className="fav-button" onClick={() => handleUnlike(post.id, 1)}>❤</button>
                </div>  
                </li>
                </React.Fragment>
            );
            })}
        </ul>
    )
}