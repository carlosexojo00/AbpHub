import { useLocation, useParams, Link } from "react-router-dom";
import { supabase } from "../supabase/client";
import { useState, useEffect } from "react";
import GradesTable from "../components/GradesTable";
import Nav from "../components/Navbar";
import UserNavbar from "../components/UserNavbar";

function ProjectGradesPage() {
  const { id } = useParams();
  let { state } = useLocation();

  const [ProjectEvaluationCriteria, setProjectEvaluationCriteria] = useState(
    []
  );
  const [StudentEvalCriteriaGrades, setStudentEvalCriteriaGrades] = useState(
    []
  );
  const [notaProyecto, setNotaProyecto] = useState(0);

  useEffect(() => {
    getProjectEvaluationCriteria();
  }, []);

  const getProjectEvaluationCriteria = async () => {
    const { data, error } = await supabase
      .from("ProjectEvaluationCriteria")
      .select("*")
      .eq("projectId", id);
    if (error) {
      console.log("error", error);
      return;
    }
    const projectEvaluationCriteria = data.map(
      (projectEvaluationCriteria) => projectEvaluationCriteria.id
    );
    console.log("projectEvaluationCriteria", data);
    setProjectEvaluationCriteria(data);
    getStudentGrades(projectEvaluationCriteria);
  };

  const getStudentGrades = async (projectEvaluationCriteria) => {
    const { data, error } = await supabase
      .from("StudentEvalCriteriaGrades")
      .select("*")
      .in("evalCriteriaId", projectEvaluationCriteria)
      .eq("studentId", state.user);
    if (error) {
      console.log("error", error);
      return;
    }
    setStudentEvalCriteriaGrades(data);
  };

  const handleNotaProyecto = (notas) => {
    let notaTotal = 0;
    let pesoTotal = 0;

    notas.forEach((evalCriterion) => {
      const peso = evalCriterion.weight;
      const nota = evalCriterion.grade;
      pesoTotal += peso;
      console.log("peso", peso);
      console.log("nota", nota);
      notaTotal += (peso / 100) * nota;
      console.log("notaTotal", notaTotal);
    });

    const notaProyecto = notaTotal /*/pesoTotal */
      .toFixed(2);
    setNotaProyecto(notaProyecto);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <UserNavbar></UserNavbar>
      <div className="flex-grow w-full flex flex-col items-center gap-2 md:items-start md:justify-start px-20 pt-10">
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            {state.prjct.project.name}
          </h1>
          {state.prjct.project.status === "Open" ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 text-center md:mx-0 md:my-auto">
              Open
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 mx-auto md:mx-0  md:my-auto">
              Closed
            </span>
          )}
        </div>
        <p className="text-xl font-bold text-center md:text-left text-gray-600 dark:text-white mb-6">
          {state.prjct.project.description}
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <h1 className="text-xl font-bold text-center text-gray-600 dark:text-white">
            Desde: {state.prjct.project.startDate}
          </h1>
          <h1 className="text-xl font-bold text-center text-gray-600 dark:text-white mb-8">
            Hasta: {state.prjct.project.endDate}
          </h1>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Mis Notas
        </h1>
        <GradesTable
          evalCriteria={ProjectEvaluationCriteria}
          StudEvalCriGrades={StudentEvalCriteriaGrades}
          calculaNotaProyecto={(notas) => handleNotaProyecto(notas)}
        ></GradesTable>
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mt-6">
          Nota Final: {notaProyecto}
        </h1>
        <Link
          to={`/studentshome`}
          className="mx-auto px-8 py-2 bg-[#466FA6] hover:bg-[#2C4F7B] rounded font-semibold text-white md:mx-0 md:mr-auto md:mt-6"
        >
          Volver
        </Link>
      </div>
    </div>
  );
}

export default ProjectGradesPage;
