import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import NoProjectsAlert from "./NoProjectsAlert";

function StudentsProjectsList(props) {
  const [projects, setProjects] = useState([]);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      await getStudentProjectsIds();
    })();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    getStudentProjectsIds();
  }, [props.updateList]);

  const getStudentProjectsIds = async () => {
    const { data, error } = await supabase
      .from("ProjectStudents")
      .select("projectId")
      .eq("studentId", currentUser.id);
    if (error) {
      console.log("error", error);
      return;
    }
    const projectsIds = data.map((project) => project.projectId);
    getStudentProjects(projectsIds);
  };

  const getStudentProjects = async (projectsIds) => {
    const { data, error } = await supabase
      .from("Projects")
      .select("*")
      .in("id", projectsIds);
    if (error) {
      console.log("error", error);
      return;
    }
    setProjects(data);
  };

  return (
    <div className="flex flex-col w-full items-center md:items-start px-20 gap-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center md:text-left"
        >
          <div className="flex flex-col gap-4 md:gap-0 items-center justify-between md:flex-row">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {project.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {project.description}
              </p>
              <Link
                to={`project/${project.id}`}
                state={{ prjct: { project }, user: currentUser.id }}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#466FA6] rounded-lg hover:bg-[#2C4F7B] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Ver mis notas
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}
      {projects.length === 0 && (
        <NoProjectsAlert
          title={"No tienes proyectos asignados"}
          message={
            "Introduce la clave de proyecto proporcionada por tu profesor"
          }
        ></NoProjectsAlert>
      )}
    </div>
  );
}

export default StudentsProjectsList;
