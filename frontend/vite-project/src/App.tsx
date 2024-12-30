
// react-router-domのインポートを追加
import { Routes, Route } from "react-router-dom";

import { Home } from "./home.tsx";
import { Hub } from "./hub.tsx";
import { Shop } from "./shop.tsx";
import { Shoppage } from "./shoppage.tsx";
import { PostShop } from "./postshop.tsx";
import { ProtectedRoute } from "./protected";
import Login from "./login";
import { AuthProvider } from "./auth";

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop/:id"
          element={
            <ProtectedRoute>
              <Shoppage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/postShop"
          element={
            <ProtectedRoute>
              <PostShop />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Hub />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
      // <Routes>
      //     <Route path="/" element={<Home />} />
      //     <Route path="/shop" element={<Shop />} />
      //     <Route path="/shop/:id" element={<Shoppage />} />
      //     <Route path="/postShop/" element={<PostShop />} />
      //     <Route path="/profile" element={<Hub />} />
      // </Routes>
  )
}
