// import React, { useState } from "react";
// import Input from "../Components/Input";
// import Titulo from "../Components/Titulo";
// import Botao from "../Components/Botao";
// import {
//   faLock,
//   faUser,
//   faUserCircle,
// } from "@fortawesome/free-solid-svg-icons";

// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="App">
//       <div className="caixa-login">
//         <form>
//           <Titulo Icone={faUserCircle} />
//           <br />
//           <Input
//             nome={"Nome do Usuário:"}
//             tipo={"text"}
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             Icone={faUser}
//           />
//           <br />
//           <Input
//             nome={"Digite uma Senha:"}
//             tipo={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             Icone={faLock}
//           />
//           <br />
//           <div className="mostrar_senha">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={showPassword}
//                 onChange={togglePasswordVisibility}
//               />
//               Mostrar Senha
//             </label>
//           </div>
//           <Botao />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
