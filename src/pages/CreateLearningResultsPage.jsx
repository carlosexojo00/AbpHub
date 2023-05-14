import CreateLearningResultsForm from "../components/CreateLearningResultsForm";
import UserNavbar from "../components/UserNavbar";

function CreateLearningResultsPage() {
  return (
    <div>
      <div className="min-h-screen flex flex-col px-10">
        <UserNavbar></UserNavbar>
        <CreateLearningResultsForm></CreateLearningResultsForm>
      </div>
    </div>
  );
}

export default CreateLearningResultsPage;
