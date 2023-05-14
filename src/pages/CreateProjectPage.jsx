import CreateProjectForm from "../components/CreateProjectForm";
import UserNavbar from "../components/UserNavbar";

function CreateProjectPage() {
  return (
    <div className="min-h-screen flex flex-col px-10">
      <UserNavbar></UserNavbar>
      <CreateProjectForm></CreateProjectForm>
    </div>
  );
}

export default CreateProjectPage;
