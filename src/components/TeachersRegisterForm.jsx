import { useState } from "react";
import Alert from "@mui/material/Alert";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

function TeachersRegisterForm() {
  const [role, setRole] = useState("Student");
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const checkErrors = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "El nombre es obligatorio";
    else if (form.name.length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres";
    }
    if (!form.lastName) newErrors.lastName = "El apellido es obligatorio";
    else if (form.lastName.length < 3) {
      newErrors.lastName = "El apellido debe tener al menos 3 caracteres";
    }
    if (!form.email) newErrors.email = "El email es obligatorio";
    else if (!form.email.includes("@")) {
      newErrors.email = "El email debe tener un @";
    }
    if (!form.password) newErrors.password = "La contraseña es obligatoria";
    else if (form.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }
    if (!form.password_confirmation)
      newErrors.password_confirmation =
        "La confirmación de la contraseña es obligatoria";
    else if (form.password_confirmation !== form.password) {
      newErrors.password_confirmation =
        "La confirmación de la contraseña debe ser igual a la contraseña";
    }
    if (Object.keys(newErrors).length === 0) {
      addUser();
    } else {
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkErrors();
  };

  const addUser = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          first_name: form.name,
          last_name: form.lastName,
          role: role,
        },
      },
    });
    if (error) {
      console.log("Error", error);
      if (error.message.includes("User already registered")) {
        setErrors({ email: "El email ya está en uso" });
      }
    } else {
      console.log("Usuario creado", data);
      if (role === "Teacher") addTeacher(data.user.id);
      if (role === "Student") addStudent(data.user.id);
    }
  };

  const addTeacher = async (userId) => {
    const { data, error } = await supabase.from("Teachers").insert({
      id: userId,
      name: form.name,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    });
    if (error) {
      console.log("Error", error);
    } else {
      console.log("Profesor creado", data);
      navigate("/teachershome");
    }
  };

  const addStudent = async (userId) => {
    const { data, error } = await supabase.from("Students").insert({
      id: userId,
      name: form.name,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    });
    if (error) {
      console.log("Error", error);
    } else {
      console.log("Estudiante creado", data);
      navigate("/studentshome");
    }
  };

  return (
    <>
      <select
        id="roles"
        className="border border-2 border-[#707070] text-gray-500 text-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={role}
        onChange={(e) => {
          setRole(e.target.value);
        }}
      >
        <option value="Student">Estudiante</option>
        <option value="Teacher">Profesor</option>
      </select>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-full mt-2 gap-2 md:flex-row">
          <div className="flex flex-col w-full gap-2">
            {errors.name ? <Alert severity="error">{errors.name}</Alert> : null}
            <input
              className="flex-1 px-4 py-2 border border-2 border-[#707070] text-gray-900 text-md"
              placeholder="Nombre"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            ></input>
          </div>
          <div className="flex flex-col w-full gap-2">
            {errors.lastName ? (
              <Alert severity="error">{errors.lastName}</Alert>
            ) : null}
            <input
              className="flex-1 px-4 py-2 border border-2 border-[#707070] text-gray-900 text-md"
              placeholder="Apellido"
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className="mt-2">
          {errors.email ? <Alert severity="error">{errors.email}</Alert> : null}
        </div>
        <input
          className="w-full px-4 py-2 border border-2 border-[#707070] text-gray-900 text-md mt-2"
          placeholder="Correo Electrónico"
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
        ></input>
        <div className="mt-2">
          {errors.password ? (
            <Alert severity="error">{errors.password}</Alert>
          ) : null}
        </div>
        <input
          className="w-full px-4 py-2 border border-2 border-[#707070] text-gray-900 text-md mt-2"
          placeholder="Contraseña"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        ></input>
        <div className="mt-2">
          {errors.password_confirmation ? (
            <Alert severity="error">{errors.password_confirmation}</Alert>
          ) : null}
        </div>
        <input
          className="w-full px-4 py-2 border border-2 border-[#707070] text-gray-900 text-md mt-2"
          placeholder="Confirmar Contraseña"
          type="password"
          name="password_confirmation"
          value={form.password_confirmation}
          onChange={handleChange}
        ></input>
        <button
          className="w-full px-4 py-4 text-white font-semibold text-md mt-2 bg-[#3C3C3C] hover:bg-[#707070]"
          type="submit"
        >
          Registrate
        </button>
      </form>
    </>
  );
}

export default TeachersRegisterForm;
