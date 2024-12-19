import { useEffect, useState } from 'react';
import React from 'react'
import { getUserPosts } from './api';

export const Timeline = () => {
    const [posts, setPosts] = useState([]);
    
      const fetchPosts = async () => {
        try {
          const response = await getUserPosts(1); 
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching user posts:', error);
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
          fetchPosts();
        }, []);

    return (
        <ul className="todo-list">
            {posts.map((post:any) => {
                const todoDate = id_to_date(post.id);
            return (
                <React.Fragment key={post.id}>
                <li className="todo-item"> 
                <div className="post_top">
                <div className="todo-user">{post.user.name}</div>
                <div className="todo-date2">{todoDate}</div>
                </div> 
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
    )
}