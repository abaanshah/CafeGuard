import { Routes, Route } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/login";
import AdminAuth from "../pages/AdminAuth/AdminAuth";
import AdminDashboard from "../pages/Admin/AdminDashboard";

function AppRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/adminlogin" element={<AdminAuth />} />    
        <Route path="/admin/dashboard" element={<AdminDashboard />} />  
          
      </Routes>
    </MainLayout>
  );
}

export default AppRoutes;