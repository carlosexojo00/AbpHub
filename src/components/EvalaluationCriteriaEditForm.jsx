import { useState } from "react";
import { supabase } from "../supabase/client";
import { useParams, useLocation, useNavigate } from "react-router-dom";
function EvaluationCriteriaEditForm() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const editEvalCriteria = async (event) => {
    event.preventDefault();
    const { name, description, weight } = event.target.elements;
    if (
      state.totalWeight - state.evalCriteria.weight + parseInt(weight.value) >
      100
    ) {
      setError("El peso total no puede ser mayor a 100%");
      return;
    }
    if (!name.value || !weight.value) {
      setError("Tanto el nombre como el peso son campos son obligatorios");
      return;
    }
    const { data, error } = await supabase
      .from("ProjectEvaluationCriteria")
      .update({
        name: name.value,
        description: description.value,
        weight: parseInt(weight.value),
      })
      .eq("id", state.evalCriteria.id);
    if (error) {
      console.log("error", error);
    } else {
      console.log("data", data);
      navigate(`/teachershome/project/${state.evalCriteria.projectId}`);
    }
  };

  return (
    <form
      onSubmit={editEvalCriteria}
      className="flex flex-col items-center justify-center w-full mb-8"
    >
      {error ? (
        <p className="text-red-500 font-semibold text-lg mb-4">{error}</p>
      ) : null}
      <div className="flex flex-col items-center justify-center w-full gap-2 md:items-start">
        <label
          htmlFor="name"
          className="text-gray-500 font-semibold text-lg  text-left"
        >
          Nombre del criterio de evaluación
        </label>
        <input
          type="text"
          name="name"
          className="border-2 border-gray-500 p-2 w-full"
          defaultValue={state.evalCriteria.name}
        ></input>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-2 mt-4 md:items-start">
        <label
          htmlFor="description"
          className="text-gray-500 font-semibold text-lg"
        >
          Descripción del criterio de evaluación
        </label>
        <textarea
          name="description"
          className="border-2 border-gray-500 p-2 w-full h-32"
          defaultValue={state.evalCriteria.description}
        ></textarea>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-2 mt-4 md:items-start">
        <label htmlFor="weight" className="text-gray-500 font-semibold text-lg">
          Peso &#40;%&#41;
        </label>
        <input
          type="number"
          name="weight"
          className="border-2 border-gray-500 p-2 w-full"
          defaultValue={state.evalCriteria.weight}
        ></input>
        <button
          type="submit"
          className="bg-[#466FA6] hover:bg-[#2C4F7B] text-white font-bold py-2 px-4 rounded mt-4 w-full"
        >
          Guardar Criterio de Avaluación
        </button>
      </div>
    </form>
  );
}

export default EvaluationCriteriaEditForm;
