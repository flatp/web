
// react-router-domのインポートを追加
import { Routes, Route } from "react-router-dom";

import { Home } from "./home.tsx";
import { Hub } from "./hub.tsx";
import { Shop } from "./shop.tsx";

export const App = () => {
  return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/profile" element={<Hub />} />
      </Routes>
  )
}
