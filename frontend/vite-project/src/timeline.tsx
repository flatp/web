import { useEffect, useState } from 'react';
import React from 'react'
import { getFollowingPosts, likePost, unlikePost } from './api';

export const Timeline = () => {
    const [posts, setPosts] = useState([]);
    
    const fetchFollowingPosts = async () => {
      try {
        const response = await getFollowingPosts(1);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching following posts:', error);
      }
    };

    const handleLike = async (postId:number, userId:number) => {
      try {
        await likePost(postId, userId);
        await fetchFollowingPosts();
      } catch (error) {
        console.error('Error liking post:', error);
      }
    };

    const handleUnlike = async (postId:number, userId:number) => {
      try {
        await unlikePost(postId, userId);
        await fetchFollowingPosts();
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
      fetchFollowingPosts();
      }, []);

    const post_user_like = (likeds:number) => {
      if(1 == likeds) return true;
      return false;
    }

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
                { !post_user_like(post.liked) && <button className="fav-button" onClick={() => handleLike(post.id, 1)}>♡</button>}
                { post_user_like(post.liked) && <button className="fav-button" onClick={() => handleUnlike(post.id, 1)}>❤</button>}
                </div>  
                </li>
                </React.Fragment>
            );
            })}
        </ul>
    )
}