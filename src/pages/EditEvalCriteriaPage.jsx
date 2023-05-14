import EvaluationCriteriaEditForm from "../components/EvalaluationCriteriaEditForm";
import UserNavbar from "../components/UserNavbar";

function EditEvalCriteriaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <UserNavbar></UserNavbar>
      <div className="flex-grow mx-20 mt-10">
        <EvaluationCriteriaEditForm></EvaluationCriteriaEditForm>
      </div>
    </div>
  );
}

export default EditEvalCriteriaPage;
