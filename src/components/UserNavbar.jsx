import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

function UserNavbar() {
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const { clearCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("error", error);
      return;
    }
    clearCurrentUser();
    navigate("/");
  };

  const getUserInfo = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUserName(user.user_metadata.first_name);
    setUserLastName(user.user_metadata.last_name);
    setUserEmail(user.email);
    setUserRole(user.user_metadata.role);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleHome = () => {
    if (userRole === "Teacher") {
      navigate("/teachershome");
    }
    if (userRole === "Student") {
      navigate("/studentshome");
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="w-full md:px-20 flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span
            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white cursor-pointer"
            onClick={handleHome}
          >
            AbpHub
          </span>
        </div>
        <div className="flex items-center md:order-2">
          <div className="relative">
            <button
              type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded={isMenuExpanded}
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
              onClick={() => setIsMenuExpanded(!isMenuExpanded)}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                alt="user photo"
              ></img>
            </button>
            <div
              className={`z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute mt-2 right-0 ${
                isMenuExpanded ? "" : "hidden"
              }`}
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {userName ? userName : ""} {userLastName ? userLastName : ""}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {userEmail ? userEmail : ""}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Ajustes
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => handleLogOut()}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                  >
                    Cerrar Sesión
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
