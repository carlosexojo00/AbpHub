import { useParams, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase/client";
import { useState } from "react";

function CreateEvalutationCriteriaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [evalCriterias, setEvalCriterias] = useState(
    state.evaluationCriteria || []
  );
  const [newEvalCriterias, setNewEvalCriterias] = useState([]);
  const [totalEvaluated, setTotalEvaluated] = useState(state.totalWeight || 0);
  const [error, setError] = useState(null);
  // const [evalCriteriaChange, setEvalCriteriaChange] = useState(false); Queda pendiente

  const handleEvalCriteriaCreation = async (event) => {
    event.preventDefault();
    setError(null);
    const { name, description, weight } = event.target.elements;
    if (totalEvaluated + parseInt(weight.value) > 100) {
      setError("El peso total no puede ser mayor a 100%");
      return;
    }
    if (!name.value || !weight.value) {
      setError("Tanto el nombre como el peso son campos son obligatorios");
      return;
    }
    setNewEvalCriterias([
      ...newEvalCriterias,
      {
        name: name.value,
        description: description.value,
        weight: parseInt(weight.value),
        projectId: id,
      },
    ]);
    setEvalCriterias([
      ...evalCriterias,
      {
        name: name.value,
        description: description.value,
        weight: parseInt(weight.value),
        projectId: id,
      },
    ]);
    setTotalEvaluated(totalEvaluated + parseInt(weight.value));
    event.target.reset();

    // const { data, error } = await supabase
    //   .from("ProjectEvaluationCriteria")
    //   .insert([
    //     {
    //       name: name.value,
    //       description: description.value,
    //       weight: weight.value,
    //       projectId: id,
    //     },
    //   ]);
    // if (error) {
    //   console.log("error", error);
    // } else {
    //   console.log("data", data);
    // }
  };

  const insertEvalCriterias = async () => {
    const { data, error } = await supabase
      .from("ProjectEvaluationCriteria")
      .insert(newEvalCriterias);
    if (error) {
      console.log("error", error);
    } else {
      console.log("data", data);
      navigate(`/teachershome/project/${id}`);
    }
  };

  return (
    <div className="flex-grow flex flex-col md:flex-row items-center justify-center md:items-start md:px-20  md:mt-20">
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold text-center tracking-tight mt-8 md:text-left">
          Criterios de evaluación para el proyecto
        </h1>
        <h3 className="text-2xl font-bold text-center tracking-tight mt-8 md:text-left">
          Total ponderado:{" "}
          <div className="text-gray-500 text-6xl">{totalEvaluated}%</div>
        </h3>
        <h3 className="text-2xl font-bold text-center tracking-tight mt-8 md:text-left">
          Listado de criterios creados:
        </h3>
        {evalCriterias
          ? evalCriterias.map((evalCriteria) => (
              <p
                key={evalCriteria.id}
                className="w-full p-2 px-4 bg-[#466FA6] mt-4 rounded text-white font-semibold"
              >
                {evalCriteria.name} {"·"} {evalCriteria.weight}%
              </p>
            ))
          : null}
      </div>
      <div className="flex w-full my-8 md:mt-0 md:mb-8 md:mx-8 md:w-auto md:self-stretch">
        <div className="h-[1px] w-full md:h-auto md:w-[1px] bg-gray-300"></div>
      </div>
      <form
        onSubmit={handleEvalCriteriaCreation}
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
          ></textarea>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-2 mt-4 md:items-start">
          <label
            htmlFor="weight"
            className="text-gray-500 font-semibold text-lg"
          >
            Peso &#40;%&#41;
          </label>
          <input
            type="number"
            name="weight"
            className="border-2 border-gray-500 p-2 w-full"
          ></input>
          <button
            type="submit"
            className="bg-[#466FA6] hover:bg-[#2C4F7B] text-white font-bold py-2 px-4 rounded mt-4 w-full"
          >
            Guardar Criterio de Avaliación
          </button>
          <button
            type="button"
            onClick={insertEvalCriterias}
            className="border-2 text-gray-500 font-bold py-2 px-4 rounded mt-4 w-full"
          >
            Finalizar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEvalutationCriteriaForm;
