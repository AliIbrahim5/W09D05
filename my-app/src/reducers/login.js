// const initialState = {
//     role: "",
//     token: "",
//   };
  
//   const Login = (state = initialState, action) => {
//     const { type, payload } = action;
  
//     switch (type) {
//       case "LOGIN":
//         const { role, token } = payload;
//         localStorage.setItem("token", token);
//         localStorage.setItem("role", role);
//         return { role, token };
//       case "LOGOUT":
//         localStorage.removeItem("token");
//         localStorage.removeItem("role");
//         return { role: "", token: "" };
//       default:
//         const tokenStorge = localStorage.getItem("token");
//         const roleStorge = localStorage.getItem("role");
//         if (tokenStorge && roleStorge)
//           return { role: roleStorge, token: tokenStorge };
//         else return state;
//     }
//   };
  
//   export default Login;
  
//   export const userLogin = (data) => {
//     return {
//       type: "LOGIN",
//       payload: data,
//     };
//   };
  
//   export const userLogout = (data) => {
//     return {
//       type: "LOGOUT",
//       payload: data,
//     };
//   };

const insitialState = {
  user: [],
  token: "",
};

const signIn = (state = insitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      // eslint-disable-next-line
      const { user, token } = payload;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return { user, token };

    case "LOGOUT":
      localStorage.clear();
      return { user: null, token: "" };

    default:
      const tokenStorage = localStorage.getItem("token");
      const userStorage = JSON.parse(localStorage.getItem("user"));
      if (tokenStorage) {
        return { token: tokenStorage, user: userStorage };
      } else {
        return state;
      }
  }
};

export default signIn;

export const login_reducser = (data) => {
  return {
    type: "LOGIN",
    payload: data.data,
  };
};

export const logout = (data) => {
  return {
    type: "LOGOUT",
    payload: data,
  };
};

  