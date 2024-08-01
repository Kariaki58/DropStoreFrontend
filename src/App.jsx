import { Route, Routes, useParams } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/authentication/Login"
import Register from "./pages/authentication/Register"
import ComfirmToken from "./pages/authentication/Comfirm-Token"
import Navigation from './components/navigation/Navigation'
import Settings from "./pages/dashboard/settings/Settings"
import Dashboard from "./pages/dashboard/Dashboard"
import CustomizedStore from "./pages/dashboard/sellers/CustomizedStore"
import Orders from "./pages/dashboard/sellers/Orders"
import Stats from "./pages/dashboard/sellers/Stats"
import Store from './pages/dashboard/sellers/Store'
import Carts from "./pages/cart/Carts"
import ProductsInStore from "./pages/dashboard/sellers/ProductsInStore"
import UploadProductForm from './pages/dashboard/sellers/UploadProductForm';
import StoreProducts from "./pages/dashboard/sellers/StoreProducts"
import ProtectedRoute from "./components/ProtectedRoute"
import SuccessPage from "./pages/payment/SuccessPage"
import CancelPage from "./pages/payment/CancelPage"
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
// import Products from "./components/Products"
import ProductPage from './pages/dashboard/sellers/ProductPage'
import ResetPassword from "./pages/authentication/ResetPassword"
import ForgetPassword from "./pages/authentication/ForgetPassword"


function App() {
  return (
    <div className="bg-gray-100">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/api/auth/login" element={<Login />} />
        <Route path="/api/auth/sign-up" element={<Register />} />
        <Route path="/api/auth/comfirm-token" element={<ComfirmToken />} />
        <Route path="/api/:storeId/products" element={<StoreProducts />} />
        <Route path="/api/auth/reset-password" element={<ResetPassword />} />
        <Route path="/api/auth/forget-password" element={<ForgetPassword />} />


        {/* Protected Routes */}
        <Route path="/api/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/api/store" element={<ProtectedRoute><Store /></ProtectedRoute>} />
        <Route path="/api/carts" element={<ProtectedRoute><Carts /></ProtectedRoute>} />
        <Route path="/payment/sucess" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
        <Route path="/payment/cancel" element={<ProtectedRoute><CancelPage /></ProtectedRoute>} />

        {/* AuthOutlet for additional protection */}
        <Route element={<AuthOutlet fallbackPath='/api/auth/login' />}>
          <Route path="/api/customize/store" element={<ProtectedRoute><CustomizedStore /></ProtectedRoute>} >
            <Route index element={<ProtectedRoute><ProductsInStore /></ProtectedRoute>} />
            <Route path="upload" element={<ProtectedRoute><UploadProductForm /></ProtectedRoute>} />
          </Route>
          <Route path="/api/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} >
            <Route index element={<ProtectedRoute><Stats /></ProtectedRoute>} />
            <Route path="products" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
            <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
