import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ListProducts from "./Components/ListProducts";  
import EditProduct from "./Components/EditProduct";   
import ProductForm from "./Components/ProductForm";    
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Cadastro from "./Components/Cadastro";
import Home from "./Components/Home";
import PrivateRoute from "./auth/PrivateRoute.jsx";

import { AuthProvider } from "./auth/AuthContext.jsx";
import ViewProduct from "./Components/ViewProduct.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          {/* Lista de produtos acessível por todos (usuários logados ou não) */}
          <Route path="/listar-produtos" element={<ListProducts />} />
          <Route path="/produto/:id" element={<ViewProduct />} />
          {/* Rotas protegidas para administradores */}
          <Route 
            path="/adicionar-produto" 
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/editar-produto/:id" 
            element={
              <PrivateRoute>
                <EditProduct />
              </PrivateRoute>
            } 
          />

          {/* Redirecionamento para Home caso a rota não seja encontrada */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
