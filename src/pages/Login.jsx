// import React, { useState } from "react";
// import Input from "../Components/Input";
// import Titulo from "../Components/Titulo";
// import Botao from "../Components/Botao";
// import {
//   faLock,
//   faUser,
//   faUserCircle,
// } from "@fortawesome/free-solid-svg-icons";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <div className="App">
//       <div className="caixa-login">
//         <form>
//           <Titulo Icone={faUserCircle} />
//           <br />
//           <Input
//             nome={"Usuário:"}
//             tipo={"text"}
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             Icone={faUser}
//           />
//           <br />
//           <Input
//             nome={"Senha:"}
//             tipo={"password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             Icone={faLock}
//           />
//           <br />
//           <Botao />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
