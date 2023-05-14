import * as React from "react";
import Table from "@mui/joy/Table";
import { useLocation } from "react-router-dom";
import { supabase } from "../supabase/client";
import { useState, useEffect } from "react";

function EvaluationMatrix() {
  const { state } = useLocation();
  const [currentGrades, setCurrentGrades] = useState({});

  const fetchGrades = async () => {
    const newGrades = {};
    for (const criteria of state.evaluationCriteria.evaluationCriteriaList) {
      for (const student of state.students.studentsList) {
        const grade = await getCurrentStudentGrades(student.id, criteria.id);
        if (grade !== null) newGrades[`${student.id}_${criteria.id}`] = grade;
      }
    }
    setCurrentGrades(newGrades);
  };

  const getColumnSum = (colIndex) => {
    let sum = 0;
    for (const criteria of state.evaluationCriteria.evaluationCriteriaList) {
      const grade =
        currentGrades[
          `${state.students.studentsList[colIndex].id}_${criteria.id}`
        ];
      if (grade !== undefined)
        sum += parseFloat(grade) * (criteria.weight / 100);
    }
    return sum.toFixed(2);
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  const handleCellBlur = (event, rowIndex, colIndex) => {
    const criteriaToEvaluate =
      state.evaluationCriteria.evaluationCriteriaList[rowIndex].id;
    const studentToEvaluate = state.students.studentsList[colIndex].id;
    const grade = event.target.value;
    addStudentEvaluation(criteriaToEvaluate, studentToEvaluate, grade);
  };

  const addStudentEvaluation = async (criteria, student, value) => {
    const { data, error } = await supabase
      .from("StudentEvalCriteriaGrades")
      .upsert(
        [
          {
            studentId: student,
            evalCriteriaId: criteria,
            grade: value,
          },
        ],
        {
          onConflict: "studentId, evalCriteriaId",
        }
      );
    if (error) {
      console.log("error", error);
    } else {
      console.log("data", data);
    }
  };

  const getCurrentStudentGrades = async (student, criteria) => {
    const { data, error } = await supabase
      .from("StudentEvalCriteriaGrades")
      .select("grade")
      .eq("studentId", student)
      .eq("evalCriteriaId", criteria);
    if (error) {
      console.log("error", error);
    } else {
      if (data.length === 0) return null;
      return data[0].grade;
    }
  };

  return (
    <div className="px-20">
      <div className="w-full overflow-x-auto">
        <div class="relative overflow-x-auto my-10">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 sticky left-0 z-10 bg-gray-50"
                ></th>
                {state.students.studentsList.map((student, index) => (
                  <th key={index} className="text-center">
                    {student.name} {student.lastName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.evaluationCriteria.evaluationCriteriaList.map(
                (criteria, rowIndex) => (
                  <tr
                    key={rowIndex}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td
                      scope="row"
                      class="sticky left-0 z-10 bg-white text-lg px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {criteria.name} · <b>{criteria.weight}%</b>
                    </td>
                    {state.students.studentsList.map((student, colIndex) => (
                      <td key={colIndex} class="px-6 py-4 text-center">
                        <div>
                          <input
                            type="number"
                            onBlur={(event) =>
                              handleCellBlur(event, rowIndex, colIndex)
                            }
                            className="w-20 text-center"
                            defaultValue={
                              currentGrades[`${student.id}_${criteria.id}`] ||
                              ""
                            }
                          ></input>
                        </div>
                      </td>
                    ))}
                  </tr>
                )
              )}
              <tr>
                <td className="px-6 py-4 text-xl font-semibold sticky left-0 z-10 bg-white">
                  Total
                </td>
                {state.students.studentsList.map((student, index) => (
                  <td
                    key={index}
                    class="px-6 py-4 text-xl font-semibold text-center"
                  >
                    {getColumnSum(index)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EvaluationMatrix;
