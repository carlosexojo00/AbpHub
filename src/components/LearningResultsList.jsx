import LoadingSpinner from "./LoadingSpinner";
import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { Link, useNavigate } from "react-router-dom";
import { data } from "autoprefixer";

function LearningResultsList(props) {
  const [loading, setLoading] = useState(false);
  const [learningResults, setLearningResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getLearningResults();
  }, []);

  const getLearningResults = async () => {
    const projId = parseInt(props.projectId);
    console.log("projId", projId);
    const { data, error } = await supabase
      .from("LearningResults")
      .select("*")
      .eq("projectId", projId);
    if (error) {
      console.log(error);
    } else {
      console.log("learningResults", data);
      setLearningResults(data);
      setLoading(false);
    }
  };

  const navigateToLearningResultsForm = () => {
    navigate(`/teachershome/project/${props.projectId}/createlearningresults`);
  };

  return (
    <div className="flex flex-grow">
      {loading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <div className="flex flex-col w-full gap-4">
          <button
            className="bg-[#466FA6] text-white p-2 px-4 hover:bg-[#2D4E7C] font-semibold rounded-md disabled:opacity-50"
            onClick={navigateToLearningResultsForm}
          >
            Crear Resultados de Aprendizaje
          </button>
          {learningResults.map((learningResult) => (
            <div
              className="flex flex-col md:flex-row md:justify-between md:items-center w-full border border-1 rounded-md p-4 shadow-md gap-4"
              key={learningResult.id}
            >
              <div className="flex flex-col">
                <div className="text-xl font-bold">{learningResult.name}</div>
                <div className="text-sm">{learningResult.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LearningResultsList;
