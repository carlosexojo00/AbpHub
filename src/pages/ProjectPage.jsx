import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import EvaluationCriteriaList from "../components/EvalutationCriteriaList";
import ProjectStudentsList from "../components/ProjectStudentsList";
import { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import { supabase } from "../supabase/client";
import Alert from "../components/Alert";
import CreateLearningResults from "../components/LearningResultsList";

function ProjectPage() {
  const { id } = useParams();
  const [studentsList, setStudentsList] = useState([]);
  const [evaluationCriteriaList, setEvaluationCriteriaList] = useState([]);
  const [currentTab, setCurrentTab] = useState("evaluationCriteria");
  const [currentProject, setCurrentProject] = useState({});
  let { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    getCurrentProject();
  }, []);

  const handleUpLiftStudents = (students) => {
    setStudentsList(students);
  };

  const handleUpLiftEvaluationCriteria = (evaluationCriteria) => {
    setEvaluationCriteriaList(evaluationCriteria);
  };

  const handleUpLiftTotalWeight = (totalWeight) => {
    setCurrentProject({ ...currentProject, totalWeight: totalWeight });
  };

  const getCurrentProject = async () => {
    const { data, error } = await supabase
      .from("Projects")
      .select("*")
      .eq("id", id);
    if (error) {
      console.log("error", error);
    } else {
      setCurrentProject(data[0]);
      getProjectStudents(data[0].id);
    }
  };

  const getProjectStudents = async (projId) => {
    const { data: Students, error } = await supabase
      .from("ProjectStudents")
      .select("studentId")
      .eq("projectId", projId);
    if (error) {
      console.log("error", error);
    } else {
      getStudents(Students);
    }
  };

  const getStudents = async (studentsids) => {
    const { data, error } = await supabase
      .from("Students")
      .select()
      .in(
        "id",
        studentsids.map((student) => student.studentId)
      );
    if (error) {
      console.log("error", error);
    } else {
      setStudentsList(data);
    }
  };

  const handleCloseProject = async () => {
    const { data, error } = await supabase
      .from("Projects")
      .update({ status: "closed" })
      .eq("id", id);
    if (error) {
      console.log("error", error);
    } else {
      navigate("/teachershome");
    }
  };

  return (
    // <div>
    //   <h1>Project Page {id}</h1>
    //   <Link
    //     to={`evaluate`}
    //     state={{
    //       students: { studentsList },
    //       evaluationCriteria: { evaluationCriteriaList },
    //     }}
    //   >
    //     Evaluar Proyecto
    //   </Link>
    //   <h2>Students</h2>
    //   <ProjectStudentsList
    //     projectId={id}
    //     upLiftStudents={handleUpLiftStudents}
    //   ></ProjectStudentsList>
    //   <Link to={`evaluation-criteria/create`}>
    //     Crear Criterios de Evaluacion
    //   </Link>
    //   <EvaluationCriteriaList
    //     projectId={id}
    //     upLiftEvaluationCriteria={handleUpLiftEvaluationCriteria}
    //   ></EvaluationCriteriaList>
    // </div>
    <div className="min-h-screen flex flex-col">
      <UserNavbar></UserNavbar>
      <div className="flex-grow flex flex-col items-center md:justify-center md:items-start py-12 px-4 gap-4">
        {currentProject &&
        currentProject.totalWeight > 0 &&
        currentProject.totalWeight < 100 ? (
          <Alert
            color="yellow"
            title="Este pryecto no esta evaluado sobre el 100 por 100"
            message="El peso total de los criterios de evaluación no suma 100"
          ></Alert>
        ) : null}
        <div className="flex flex-col md:flex-row gap-6 w-full md:justify-between px-20 items-center mb-4">
          <div className="flex flex-col gap-4 w-full md:w-auto md:max-w-1/2 overflow-auto">
            {currentProject && (
              <div className="text-center text-3xl font-bold md:text-left">
                {currentProject.name}
              </div>
            )}
            {currentProject && (
              <div className="text-center text-lg font-semibold text-gray-400 md:text-left max-h-20 md:max-h-55">
                {currentProject.description}
              </div>
            )}
          </div>
          {currentProject && (
            <div className="text-center text-2xl font-semibold md:text-left text-gray-400 flex flex-col xl:flex-row gap-4">
              <div>
                <p>Key del proyecto:</p>
                <p className="text-4xl text-black">
                  {currentProject.projectKey}
                </p>
              </div>
              <div>
                <p>Total Ponderado:</p>
                <p className="text-4xl text-black">
                  {currentProject.totalWeight}%
                </p>
              </div>
            </div>
          )}
          <Link
            className="px-8 py-2 bg-[#466FA6] rounded-md text-white font-bold text-xl hover:bg-[#2D4E7C] my-auto"
            to={`evaluate`}
            state={{
              students: { studentsList },
              evaluationCriteria: { evaluationCriteriaList },
            }}
          >
            Evaluar
          </Link>
        </div>
        <div className="px-20 w-full">
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 w-full">
            <li className="mr-2">
              <a
                onClick={() => {
                  setCurrentTab("evaluationCriteria");
                }}
                aria-current="page"
                className={`inline-block p-4 rounded-t-lg ${
                  currentTab === "evaluationCriteria"
                    ? "bg-gray-100 text-blue-600"
                    : ""
                } hover:text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-blue-500 cursor-pointer transition duration-300`}
              >
                Criterios de evalución
              </a>
            </li>
            <li className="mr-2">
              <a
                onClick={() => {
                  setCurrentTab("students");
                }}
                className={`inline-block p-4 rounded-t-lg ${
                  currentTab === "students" ? "bg-gray-100 text-blue-600" : ""
                } hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 cursor-pointer transition duration-300`}
              >
                Alumnos
              </a>
            </li>
            <li className="mr-2">
              <a
                onClick={() => {
                  setCurrentTab("projectLearningResults");
                }}
                aria-current="page"
                className={`inline-block p-4 rounded-t-lg ${
                  currentTab === "projectLearningResults"
                    ? "bg-gray-100 text-blue-600"
                    : ""
                } hover:text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-blue-500 cursor-pointer transition duration-300`}
              >
                Resultados de aprendizaje
              </a>
            </li>
            <li className="mr-2">
              <a
                onClick={() => {
                  setCurrentTab("projectInfo");
                }}
                aria-current="page"
                className={`inline-block p-4 rounded-t-lg ${
                  currentTab === "projectInfo"
                    ? "bg-gray-100 text-blue-600"
                    : ""
                } hover:text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-blue-500 cursor-pointer transition duration-300`}
              >
                Información del proyecto
              </a>
            </li>
          </ul>
        </div>
        <div className="px-20 w-full flex flex-grow items-start">
          {currentTab === "evaluationCriteria" && (
            <EvaluationCriteriaList
              projectId={id}
              upLiftEvaluationCriteria={handleUpLiftEvaluationCriteria}
              upLiftTotalWeight={handleUpLiftTotalWeight}
            ></EvaluationCriteriaList>
          )}
          {currentTab === "students" && (
            <ProjectStudentsList
              projectId={id}
              upLiftStudents={handleUpLiftStudents}
            ></ProjectStudentsList>
          )}
          {currentTab === "projectLearningResults" && (
            <CreateLearningResults projectId={id}></CreateLearningResults>
          )}
          {currentTab === "projectInfo" && (
            <div className="flex flex-col gap-4">
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
                onClick={handleCloseProject}
              >
                Cerrar proyecto
              </button>
            </div>
          )}
        </div>
        <Link
          to={`/teachershome`}
          className="bg-[#466FA6] text-white p-2 px-4 hover:bg-[#2D4E7C] font-semibold rounded-md disabled:opacity-50 md:mx-20 md:my-4"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

export default ProjectPage;
