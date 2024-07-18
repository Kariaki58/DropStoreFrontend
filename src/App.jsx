import { Route, Routes, useParams } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ComfirmToken from "./pages/Comfirm-Token"
import Navigation from './pages/Navigation'
import Settings from "./pages/Settings"
import Dashboard from "./pages/Dashboard"
import CustomizedStore from "./pages/CustomizedStore"
import Orders from "./pages/Orders"
import Stats from "./pages/Stats"
import Store from './pages/Store'
import Carts from "./pages/Carts"
import ProductsInStore from "./pages/ProductsInStore"
import UploadProductForm from './pages/UploadProductForm';
import StoreProducts from "./pages/StoreProducts"
import ProtectedRoute from "./components/ProtectedRoute"
import SuccessPage from "./pages/SuccessPage"
import CancelPage from "./pages/CancelPage"
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import Products from "./components/Products"


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
            <Route path="products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
