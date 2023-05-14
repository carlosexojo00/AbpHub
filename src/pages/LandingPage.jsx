import { Link } from "react-router-dom";
import Nav from "../components/Navbar";
import Landing from "../assets/landing";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav></Nav>
      <div className="w-full flex flex-col md:flex-row flex-grow justify-center items-center p-20">
        <section className="lg:flex-1">
          <div className="max-w-screen-lg text-center py-8 px-4 mx-auto lg:py-16">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white  mx-auto lg:text-left">
              Evalua proyectos mediante la metodología ABP.
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mx-auto lg:mx-0 lg:text-left max-w-xl ">
              Crea proyectos, une a tus alumnos y evalúalos siguiendo las
              directrices de las nuevas metodologías de aprendizaje.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row justify-center lg:justify-start sm:space-y-0 sm:space-x-4 lg:mr-auto">
              <Link
                to="/register"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-[#466fa6] hover:bg-[#2C4F7B] focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                Empieza ahora
                <svg
                  aria-hidden="true"
                  className="ml-2 -mr-1 w-5 h-5"
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
              <Link
                to={"/about"}
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Aprende más
              </Link>
            </div>
          </div>
        </section>
        <div className="hidden lg:block flex-1">
          <Landing></Landing>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
