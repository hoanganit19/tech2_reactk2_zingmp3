import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isLogin = false;

export default function AuthMiddleware() {
  return isLogin ? <Outlet /> : <Navigate to={"/login"} />;
}
