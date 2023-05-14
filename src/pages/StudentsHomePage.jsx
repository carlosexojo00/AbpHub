import { useEffect, useState } from "react";
import ProjectSubscriber from "../components/ProjectSubscriber";
import StudentsProjectsList from "../components/StudentsProjectsList";
import UserNavbar from "../components/UserNavbar";
import { useCurrentUser } from "../contexts/CurrentUserContext";

function StudentsHomePage() {
  const [updateStudentsProjectsList, setUpdateStudentsProjectsList] =
    useState(false);
  const [currentUsrName, setCurrentUsrName] = useState(""); // [1
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    console.log("currentUser", currentUser);
    if (currentUser && currentUser.user_metadata) {
      setCurrentUsrName(currentUser.user_metadata.first_name);
    }
  }, [currentUser]);

  return (
    <div className="min-h-screen flex flex-col">
      <UserNavbar></UserNavbar>
      <div className="flex-grow flex flex-col items-center gap-8 mt-20 md:justify-start md:items-start md:mt-0">
        <ProjectSubscriber
          onUpdateList={() =>
            setUpdateStudentsProjectsList(!updateStudentsProjectsList)
          }
        ></ProjectSubscriber>
        {currentUsrName && (
          <h1 className="text-4xl px-20 font-bold text-center">
            ¡Bienvenido, {currentUsrName}!
          </h1>
        )}
        <h1 className="text-4xl px-20 font-bold">Mis proyectos</h1>
        <StudentsProjectsList
          updateList={updateStudentsProjectsList}
        ></StudentsProjectsList>
      </div>
    </div>
  );
}

export default StudentsHomePage;
