import './App.css';
import React from "react";
import Layout from './components/Layout';
import Home from './pages/Home';
import Record from './pages/Record';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Hospitals from './pages/Hospitals';
import HospitalDetail from './pages/HospitalDetail.jsx';
import Blog from './pages/Blogs';
import BlogDetail from "./pages/BlogDetail.jsx";
import About from './pages/About';
import VerifyEmail from './pages/VerifyEmail';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

/**
 * Router configuration
 * Defines the routes and their corresponding components for the application.
 */
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="records" element={<PrivateRoute><Record /></PrivateRoute>} />
      <Route path="login" element={<Login />} /> 
      <Route path='signup' element={<Signup/>} />
      <Route path='hospitals' element={<PrivateRoute><Hospitals /></PrivateRoute>} />
      <Route path='hospital/:id' element={<PrivateRoute><HospitalDetail /></PrivateRoute>} />
      <Route path='community' element={<PrivateRoute><Blog /></PrivateRoute>} />
      <Route path="blog/:slug" element={<PrivateRoute><BlogDetail /></PrivateRoute>} />
      <Route path='about' element={<PrivateRoute><About/></PrivateRoute>} />
      <Route path="verify-email" element={<VerifyEmail />} />
      <Route path="*" element={<div>🚫 Page Does Not Exist! 😭</div>} />
    </Route>
  )
);

/**
 * App component
 * The main component that wraps the application with the AuthProvider and RouterProvider.
 * @returns {JSX.Element} - The rendered component.
 */
function App() {
  return (
    <AuthProvider>
      <div> 
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;