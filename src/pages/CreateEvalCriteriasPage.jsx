import UserNavbar from "../components/UserNavbar";
import CreateEvalutationCriteriaForm from "../components/CreateEvalutationCriteriaForm";

function CreateEvalCriteriasPage() {
  return (
    <div className="min-h-screen flex flex-col px-10">
      <UserNavbar></UserNavbar>
      <CreateEvalutationCriteriaForm></CreateEvalutationCriteriaForm>
    </div>
  );
}

export default CreateEvalCriteriasPage;
