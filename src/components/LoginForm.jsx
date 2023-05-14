import { supabase } from "../supabase/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    checkLocalStorage();
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    supabaseLogin(email.value, password.value);
  };

  const supabaseLogin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (rememberMe) {
      localStorage.setItem("supabaseSession", JSON.stringify(data));
    }
    if (error) {
      if (error.message === "Invalid login credentials") {
        setError("Crendenciales de inicio de sesión inválidas");
      }
    } else {
      console.log(data.user.user_metadata.role);
      if (data.user.user_metadata.role === "Student") {
        navigate("/studentshome");
      } else if (data.user.user_metadata.role === "Teacher") {
        navigate("/teachershome");
      }
    }
  };

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

  const checkLocalStorage = () => {
    const supabaseSession = localStorage.getItem("supabaseSession");
    if (supabaseSession) {
      const session = JSON.parse(supabaseSession);
      supabase.auth.setSession(session);
      if (session.user.user_metadata.role === "Student") {
        navigate("/studentshome");
      } else if (session.user.user_metadata.role === "Teacher") {
        navigate("/teachershome");
      }
    }
  };

  return (
    <>
      {/* {error ? (
        <Alert severity="error" sx={{ width: "90%" }}>
          {error}
        </Alert>
      ) : null}
      <form onSubmit={handleLogin}>
        <TextField
          id="email"
          label="Correo electrónico"
          fullWidth
          margin="normal"
          autoFocus
          name="email"
          {...(error && { error: true })}
        />
        <TextField
          id="password"
          label="Contraseña"
          fullWidth
          margin="normal"
          autoFocus
          name="password"
          type="password"
          {...(error && { error: true })}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Iniciar sesión
        </Button>
      </form> */}
      {error ? (
        <Alert severity="error" sx={{ width: "90%" }}>
          {error}
        </Alert>
      ) : null}
      <form onSubmit={handleLogin}>
        <input
          className="w-full px-4 py-2 border border-2 border-[#707070] text-gray-900 text-md mt-2"
          placeholder="Correo electrónico"
          id="email"
          label="Correo electrónico"
          name="email"
          type="email"
          autoComplete="off"
          {...(error && { error: true })}
        ></input>
        <input
          className="w-full px-4 py-2 border border-2 border-[#707070] text-gray-900 text-md mt-2"
          placeholder="Contraseña"
          id="password"
          label="Contraseña"
          name="password"
          type="password"
          autoComplete="off"
          {...(error && { error: true })}
        ></input>
        <div className="flex items-center my-4">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            label="Mantén mi sesión iniciada"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
            onChange={handleRememberMe}
          ></input>
          <label
            htmlFor="default-checkbox"
            className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Mantén mi sesión iniciada
          </label>
        </div>
        <button
          className="w-full px-4 py-4 text-white font-semibold text-md mt-2 bg-[#3C3C3C] hover:bg-[#707070] mb-2"
          type="submit"
        >
          Iniciar Sesión
        </button>
      </form>
    </>
  );
}

export default LoginForm;
