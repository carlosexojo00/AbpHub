import TeachersProjectsList from "../components/TeachersProjectsList";
import { supabase } from "../supabase/client";
import { Link } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";

function TeachersHomePage() {
  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <div>
      <UserNavbar></UserNavbar>
      <div className="flex flex-col items-center mx-auto mt-12 gap-4 md:items-start px-20">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:w-full md:items-center md:mb-4">
          <h1 className="text-center text-3xl font-bold">Projectos</h1>
          <button className="bg-[#466fa6] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#2C4F7B]">
            <Link to={`/createproject`}>Crear Projecto</Link>
          </button>
        </div>
        <TeachersProjectsList></TeachersProjectsList>
        {/* <button
          onClick={handleLogOut}
          className="px-4 py-2 bg-[#466fa6] text-white font-semibold rounded-md"
        >
          Log Out
        </button> */}
      </div>
    </div>
  );
}

export default TeachersHomePage;
