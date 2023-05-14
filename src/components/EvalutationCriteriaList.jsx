import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

function EvaluationCriteriaList(props) {
  const [evaluationCriteria, setEvaluationCriteria] = useState([]);
  const [totalWeight, setTotalWeight] = useState(0); // [0, 100]
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sumWeights = evaluationCriteria.reduce(
      (acc, evaluationCriterion) => acc + evaluationCriterion.weight,
      0
    );
    setTotalWeight(sumWeights);
    props.upLiftTotalWeight(sumWeights);
  }, [evaluationCriteria]);

  useEffect(() => {
    getEvaluationCriteria();
  }, []);

  const getEvaluationCriteria = async () => {
    setLoading(true);
    const { data: EvaluationCriteria, error } = await supabase
      .from("ProjectEvaluationCriteria")
      .select()
      .eq("projectId", props.projectId)
      .order("id", { ascending: true });
    if (error) {
      console.log("error", error);
    } else {
      setEvaluationCriteria(EvaluationCriteria);
      props.upLiftEvaluationCriteria(EvaluationCriteria);
    }
    setLoading(false);
  };

  const deleteEvaluationCriteria = async (id) => {
    const { error } = await supabase
      .from("ProjectEvaluationCriteria")
      .delete()
      .eq("id", id);
    if (error) {
      console.log("error", error);
    } else {
      getEvaluationCriteria();
    }
  };

  const navigateToEvalCriteriaForm = () => {
    navigate(
      `/teachershome/project/${props.projectId}/createevaluationcriteria`,
      {
        state: {
          projectId: props.projectId,
          evaluationCriteria: evaluationCriteria,
          totalWeight: totalWeight,
        },
      }
    );
  };

  return (
    <div className="flex flex-grow">
      {loading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <div className="flex flex-col w-full gap-4">
          <button
            className="bg-[#466FA6] text-white p-2 px-4 hover:bg-[#2D4E7C] font-semibold rounded-md disabled:opacity-50"
            onClick={navigateToEvalCriteriaForm}
            disabled={totalWeight >= 100}
          >
            Crear criterios de evaluación
          </button>
          {evaluationCriteria.map((evaluationCriterion) => (
            // <div key={evaluationCriterion.id}>
            //   <h3>{evaluationCriterion.name}</h3>
            //   <p>{evaluationCriterion.description}</p>
            //   <p>{evaluationCriterion.weight}</p>
            // </div>
            <div
              className="flex flex-col md:flex-row md:justify-between md:items-center w-full border border-1 rounded-md p-4 shadow-md gap-4"
              key={evaluationCriterion.id}
            >
              <div className="flex flex-col">
                <div className="text-xl font-bold">
                  {evaluationCriterion.name} · {evaluationCriterion.weight}%{" "}
                </div>
                <div className="text-sm">{evaluationCriterion.description}</div>
              </div>
              <div className="min-w-[120px] text-center">
                <Link
                  to={`/teachershome/project/${props.projectId}/evaluationcriteria/${evaluationCriterion.id}/edit`}
                  state={{
                    evalCriteria: evaluationCriterion,
                    totalWeight: totalWeight,
                  }}
                  className="text-sm font-semibold text-blue-500 hover:text-blue-700 pr-2"
                >
                  Editar
                </Link>
                |
                <button
                  className="text-sm font-semibold text-red-500 hover:text-red-700 px-2 "
                  onClick={() =>
                    deleteEvaluationCriteria(evaluationCriterion.id)
                  }
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EvaluationCriteriaList;
