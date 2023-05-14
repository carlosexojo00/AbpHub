import { useState, useEffect } from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { supabase } from "../supabase/client";
import { Link } from "react-router-dom";
import DeleteProjectModal from "./DeleteProjectModal";
import NoProjectsAlert from "./NoProjectsAlert";

function TeachersProjectsList() {
  const [projects, setProjects] = useState([]);
  const { currentUser } = useCurrentUser();
  const [ProjectAboutToDelete, setProjectAboutToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      await getProjects();
    })();
  }, [currentUser]);

  const getProjects = async () => {
    setLoading(true);
    const { data: Projects, error } = await supabase
      .from("Projects")
      .select("*")
      .eq("teacherId", currentUser.id);
    if (error) {
      console.log("error", error);
    } else {
      setProjects(Projects);
    }
    setLoading(false);
  };

  return (
    <>
      {projects.length === 0 && !loading ? (
        <NoProjectsAlert
          message={"Crea un proyecto para empezar a evaluar"}
        ></NoProjectsAlert>
      ) : (
        <div className="w-full">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-center">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre del proyecto
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Key del proyecto
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fecha de inicio
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fecha de finalización
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={project.id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {project.name}
                    </th>
                    <td className="px-6 py-4">
                      {project.status === "Open" ? (
                        <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                          {project.status}
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                          Closed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">{project.projectKey}</td>
                    <td className="px-6 py-4">{project.startDate}</td>
                    <td className="px-6 py-4">{project.endDate}</td>
                    <td className="px-6 py-4 min-w-[200px]">
                      <Link
                        to={`project/${project.id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        state={{ project: project }}
                      >
                        Ver
                      </Link>
                      <span className="mx-2">|</span>
                      <DeleteProjectModal
                        projectId={project.id}
                        onProjectDeleted={getProjects}
                      ></DeleteProjectModal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default TeachersProjectsList;
