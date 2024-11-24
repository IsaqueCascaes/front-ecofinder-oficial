import { NavBar } from "../Components/Navbar.jsx";
import { ProductForm } from "../Components/ProductForm.jsx";
import "../Css/Produtos.module.css";


function AdicionarProdutos() {
  return (
    <>
      <NavBar />
      <ProductForm />
    </>
  );
}

export default AdicionarProdutos;
