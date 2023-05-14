import EvaluationMatrix from "../components/EvalutationMatrix";
import UserNavbar from "../components/UserNavbar";
import { Link } from "react-router-dom";

function ProjectEvaluationPage() {
  return (
    <div className="min-h-screen flex flex-col gap-4">
      <UserNavbar></UserNavbar>
      <h1 className="text-3xl font-bold px-20">Evaluación del proyecto</h1>
      <EvaluationMatrix></EvaluationMatrix>
      <Link
        to={`/teachershome`}
        className="mx-auto px-8 py-2 bg-[#466FA6] hover:bg-[#2C4F7B] rounded font-semibold text-white md:mx-0 md:ml-20 md:mr-auto"
      >
        Volver
      </Link>
    </div>
  );
}

export default ProjectEvaluationPage;
