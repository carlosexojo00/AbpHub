import { useState } from "react";
import { supabase } from "../supabase/client";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import HorizontalLinearStepper from "./Stepper";
import Alert from "./Alert";
import { Link, useNavigate } from "react-router-dom";

function CreateProjectForm() {
  const [project, setProject] = useState({
    name: "",
    description: "",
    status: "Open",
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({});

  const { currentUser } = useCurrentUser();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => {
      return {
        ...prevProject,
        [name]: value,
      };
    });
  };

  const randomProjectKey = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const insertProject = async () => {
    const { data, error } = await supabase
      .from("Projects")
      .insert(project)
      .select();
    if (error) {
      console.log("error", error);
      return;
    }
    navigate(`/teachershome/project/${data[0].id}`, {
      state: { project: data[0] },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = checkErros();
    if (hasErrors) return;
    project.teacherId = currentUser.id;
    const projectKey = randomProjectKey();
    project.projectKey = projectKey;
    project.created_at = new Date();
    insertProject();
  };

  const checkErros = () => {
    let errors = {};
    if (!project.name) {
      errors.name = "El nombre del proyecto es requerido";
    }
    if (!project.startDate) {
      errors.startDate = "La fecha de inicio es requerida";
    } else {
      const today = new Date();
      const startDate = new Date(project.startDate);
      if (startDate < today)
        errors.startDate =
          "La fecha de inicio debe ser mayor a la fecha actual";
    }
    if (!project.endDate) {
      errors.endDate = "La fecha de finalización es requerida";
    } else {
      const endDate = new Date(project.endDate);
      const startDate = new Date(project.startDate);
      if (endDate < startDate) {
        errors.endDate =
          "La fecha de finalización debe ser mayor a la fecha actual";
      }
    }
    setErrors(errors);
    if (Object.keys(errors).length > 0) return true;
    return false;
  };

  return (
    <div className="flex-grow flex flex-col justify-start items-center mt-8 md:px-20 md:max-w-6xl">
      <h1 className="w-full text-3xl font-bold text-center md:text-left tracking-tight">
        Crear un proyecto
      </h1>
      <div className="w-full text-center mt-4">
        <HorizontalLinearStepper></HorizontalLinearStepper>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 w-full">
        {errors.name && <Alert message={errors.name}></Alert>}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-500 font-semibold text-lg">
            Nombre del proyecto
          </label>
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            className="border-2 border-gray-500 p-2"
          ></input>
        </div>
        <div className="flex flex-col mt-4">
          <label
            htmlFor="description"
            className="text-gray-500 font-semibold text-lg"
          >
            Descripción del proyecto
          </label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            className="border-2 border-gray-500 p-2 h-40 mb-4"
          ></textarea>
        </div>
        {errors.startDate && <Alert message={errors.startDate}></Alert>}
        <div className="flex flex-col mt-4">
          <label
            htmlFor="startDate"
            className="text-gray-500 font-semibold text-lg"
          >
            Fecha de inicio
          </label>
          <input
            type="date"
            name="startDate"
            value={project.startDate}
            onChange={handleChange}
            className="border-2 border-gray-500 p-2 text-gray-500 mb-4"
          ></input>
        </div>
        {errors.endDate && <Alert message={errors.endDate}></Alert>}
        <div className="flex flex-col mt-4">
          <label
            htmlFor="endDate"
            className="text-gray-500 font-semibold text-lg"
          >
            Fecha de finalización
          </label>
          <input
            type="date"
            name="endDate"
            value={project.endDate}
            onChange={handleChange}
            className="border-2 border-gray-500 p-2 text-gray-500"
          ></input>
        </div>
        <button
          type="submit"
          className="w-full bg-[#466FA6] text-white font-semibold text-lg p-2 mt-4 hover:bg-[#2C4F7B]"
        >
          Crear Proyecto
        </button>
      </form>
    </div>
  );
}

export default CreateProjectForm;
