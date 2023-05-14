import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./supabase/client";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import TeachersHomePage from "./pages/TeachersHomePage.jsx";
import CreateUfEvalProjectPage from "./pages/CreateUfEvalProjectPage.jsx";
import CreateProjectPage from "./pages/CreateProjectPage";
import ProjectPage from "./pages/ProjectPage";
import ProjectEvaluationPage from "./pages/ProjectEvaluationPage";
import CreateEvalutationCriteriaForm from "./components/CreateEvalutationCriteriaForm";
import StudentsHomePage from "./pages/StudentsHomePage";
import ProjectGradesPage from "./pages/ProjectGradesPage";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Nav from "./components/Navbar";
import AboutABPPage from "./pages/AboutABPPage";
import CreateEvalCriteriasPage from "./pages/CreateEvalCriteriasPage";
import EvaluationCriteriaEditForm from "./components/EvalaluationCriteriaEditForm";
import EditEvalCriteriaPage from "./pages/EditEvalCriteriaPage";
import EmailConfirmationPage from "./pages/EmailConfirmationPage";
import CreateLearningResultsPage from "./pages/CreateLearningResultsPage";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     (event, session) => {
  //       if (session) {
  //         if (session.user.user_metadata.role === "Student")
  //           navigate("/teachershome");
  //         else navigate("/teachershome");
  //       } else navigate("/register");
  //     }
  //   );
  // }, []);
  // const getCurrentUser = async () => {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  //   if (user) {
  //     console.log(user);
  //     setUser(user);
  //   } else {
  //     console.log("No user");
  //     setUser(null);
  //   }
  // };

  // useEffect(() => {
  //   getCurrentUser();
  // }, []);

  return (
    <div className="App">
      <CurrentUserProvider>
        {/* <Nav></Nav> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/emailconfirmation"
            element={<EmailConfirmationPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutABPPage />} />
          <Route path="/teachershome" element={<TeachersHomePage />} />
          <Route path="/createproject" element={<CreateProjectPage />} />
          {/*Editat la ruta de createproject */}
          <Route path="teachershome/project/:id" element={<ProjectPage />} />
          <Route
            path="teachershome/project/:id/evaluate"
            element={<ProjectEvaluationPage />}
          />
          <Route
            path="teachershome/project/:id/createlearningresults"
            element={<CreateLearningResultsPage />}
          />
          <Route
            //path="teachershome/project/:id/evaluation-criteria/create"
            path="/teachershome/project/:id/createevaluationcriteria"
            element={<CreateEvalCriteriasPage />}
          />
          <Route
            path="/teachershome/project/:id/evaluationcriteria/:id/edit"
            element={<EditEvalCriteriaPage />}
          />
          <Route
            path="/createufevalproject"
            element={<CreateUfEvalProjectPage />}
          />
          <Route path="/studentshome" element={<StudentsHomePage />} />
          <Route
            path="/studentshome/project/:id"
            element={<ProjectGradesPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
