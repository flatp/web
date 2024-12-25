// PostCard.tsx
import React from 'react';

interface PostProps {
  post: any;
  onLike: (postId: number, userId: number) => void;
  onUnlike: (postId: number, userId: number) => void;
}

const PostCard: React.FC<PostProps> = ({ post, onLike, onUnlike }) => {
  const id_to_date = (id: number) => {
    const date = new Date(id);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
  };

  const date = id_to_date(post.id);

  return (
    <li className="todo-item">
      <div className="post_top">
        <div className="todo-user">{post.user.name}</div>
        <div className="todo-date2">{date}</div>
      </div>
      <div className="todo-details">
        <h3>{post.name}</h3>
        <h4>{post.shop.name}</h4>
        <div className="todo-date">{post.memo}</div>
        <div className="fav">
        {!post.liked.includes(1) ? (
          <button className="fav-button" onClick={() => onLike(post.id, 1)}>
            ♡
          </button>
        ) : (
          <button className="fav-button" onClick={() => onUnlike(post.id, 1)}>
            ❤
          </button>
        )}
        {post.liked.length}
        </div>
      </div>
    </li>
  );
};

export default PostCard;
