import { useState } from 'react';
import React from 'react'

type Post = {
    user_id: string;
    value: string;
    shop: string;
    memo: string;
    readonly id: number;
};

export const Timeline = () => {
    const [postlist, sstPostlist] = useState<Post[]>([
        {
            user_id: "unayama",
            value: "森林浴",
            shop: "SHISHA CAFE VELVET KYOTO",
            memo: "",
            id: 100000000000,
        },
        {
            user_id: "bismuth",
            value: "チャイナタウン",
            shop: "SHISHA CAFE VELVET KYOTO",
            memo: "",
            id: 0,
        },
        {
            user_id: "str314",
            value: "スイカ",
            shop: "SHISHA CAFE VELVET KYOTO",
            memo: "",
            id: 0,
        },
        {
            user_id: "arakaze",
            value: "ヒノキ",
            shop: "SHISHA CAFE VELVET KYOTO",
            memo: "",
            id: 0,
        },
        {
            user_id: "852",
            value: "森林浴",
            shop: "SHISHA CAFE VELVET KYOTO",
            memo: "",
            id: 0,
        },
        {
            user_id: "bi",
            value: "チャイナタウン",
            shop: "SHISHA CAFE VELVET KYOTO",
            memo: "",
            id: 0,
        },
        {
            user_id: "hoge",
            value: "スイカ",
            shop: "SHISHA CAFE VELVET KYOTO",
            memo: "甘すぎ",
            id: 0,
        },
        {
            user_id: "hoge",
            value: "ヒノキ",
            shop: "SHISHA CAFE VELVET KYOTO",
            memo: "",
            id: 0,
        }
    ])

    const id_to_date = (id: number) => {
        const date = new Date(id);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return year + "年" + month + "月" + day + "日"
      };

    return (
        <ul className="todo-list">
            {postlist.map((post) => {
                const todoDate = id_to_date(post.id);
            return (
                <React.Fragment key={post.id}>
                <li className="todo-item"> 
                <div className="post_top">
                <div className="todo-user">{post.user_id}</div>
                <div className="todo-date2">{todoDate}</div>
                </div> 
                <div className="todo-details">            
                <h3>{post.value}</h3>
                <h4>{post.shop}</h4>
                <div className="todo-date">{post.memo}</div>
                </div>  
                </li>
                </React.Fragment>
            );
            })}
        </ul>
    )
}