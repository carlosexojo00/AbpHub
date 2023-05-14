import { supabase } from "../supabase/client";
import { useState } from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";

function ProjectSubscriber(props) {
  const [error, setError] = useState("");
  const { currentUser } = useCurrentUser();

  const handleSubmitSubscription = (event) => {
    event.preventDefault();
    const projectKey = event.target.projectKey.value;
    if (projectKey === "") setError("La key del proyecto no puede estar vacía");
    else {
      checkProjectExists(projectKey);
      event.target.reset();
    }
  };

  const checkProjectExists = async (projectKey) => {
    const { data, error } = await supabase
      .from("Projects")
      .select()
      .eq("projectKey", projectKey);
    if (error) {
      console.log(error);
    } else {
      if (data.length === 0) {
        setError("No existe ningún proyecto con la key introducida");
      } else {
        setError("");
        subscribeToProject(data[0].id);
      }
    }
  };

  const subscribeToProject = async (id) => {
    console.log(id, currentUser.id);
    const { data, error } = await supabase
      .from("ProjectStudents")
      .insert({ projectId: id, studentId: currentUser.id });
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      props.onUpdateList();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitSubscription}>
        <div className="flex flex-col items-center justify-center gap-4 w-full md:items-start md:px-10 md:pt-8">
          <div className="text-center text-2xl font-bold px-10">
            Introduce la Key del proyecto
          </div>
          {error ? (
            <div
              className="flex p-4 mx-10 text-sm text-red-800 border border-red-300 bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
              role="alert"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 inline w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">{error}</span>
              </div>
            </div>
          ) : null}
          <div className="px-10 space-y-2 w-full md:max-w-xl md:flex md:space-y-0 md:space-x-2">
            <input
              className="w-full px-4 py-2 border border-2 border-[#] text-gray-900 text-md flex-2"
              type="text"
              name="projectKey"
            ></input>
            <button
              className="w-full px-4 py-2 bg-[#466FA6] text-white text-md font-bold flex-1 hover:bg-[#2C4F7B]"
              type="submit"
            >
              Inscribeme
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProjectSubscriber;
