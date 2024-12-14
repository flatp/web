
// react-router-domのインポートを追加
import { Routes, Route } from "react-router-dom";

import { Home } from "./home.tsx";
import { Profile } from "./profile.tsx";

export const App = () => {
  return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
      </Routes>
  )
}
