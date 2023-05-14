import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import StudentInfo from "./StudentInfo";
import LoadingSpinner from "./LoadingSpinner";
import NoProjectsAlert from "./NoProjectsAlert";

function ProjectStudentsList(props) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProjectStudents();
  }, []);

  const getProjectStudents = async () => {
    setLoading(true);
    const { data: Students, error } = await supabase
      .from("ProjectStudents")
      .select("studentId")
      .eq("projectId", props.projectId);
    if (error) {
      console.log("error", error);
    } else {
      getStudents(Students);
    }
  };

  const getStudents = async (studentsids) => {
    const { data, error } = await supabase
      .from("Students")
      .select()
      .in(
        "id",
        studentsids.map((student) => student.studentId)
      );
    if (error) {
      console.log("error", error);
    } else {
      setStudents(data);
      props.upLiftStudents(data);
    }
    setLoading(false);
  };

  const deleteStudent = async (id) => {
    const { data, error } = await supabase
      .from("ProjectStudents")
      .delete()
      .eq("studentId", id)
      .eq("projectId", props.projectId);
    if (error) {
      console.log("error", error);
    } else {
      getProjectStudents();
    }
  };

  return (
    <div className="flex flex-grow">
      {loading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : students.length === 0 ? (
        <NoProjectsAlert
          title="Ningún alumno ha introducido aún el código del proyecto"
          message="Compartelo con tus alumnos para empezar a evaluar"
        ></NoProjectsAlert>
      ) : (
        <div className="w-full">
          {students.map((student) => (
            <div key={student.id} className="w-full">
              <StudentInfo
                studentInformation={student}
                deleteStud={deleteStudent}
              ></StudentInfo>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectStudentsList;
