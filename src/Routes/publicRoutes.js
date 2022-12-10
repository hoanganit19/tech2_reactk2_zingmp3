//Cấu hình public route
import { Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Categories from "../Pages/Categories/Categories";
export const publicRoutes = (
  <>
    <Route path="/" element={<Home />} end />
    <Route path="/the-loai" element={<Categories />} />
  </>
);
