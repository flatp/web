// components/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import { login } from './api';

const LoginPage: React.FC = () => {
  const { login_token } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Mock: バックエンドAPIと通信してトークンを取得
      const data = await login(email, password);
      login_token(data.access);
      navigate("/"); // ログイン後にホーム画面へリダイレクト
    } catch (error) {
      console.error("ログイン失敗:", error);
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default LoginPage;
