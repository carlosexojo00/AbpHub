import { useEffect, useState } from "react";
import NoProjectsAlert from "./NoProjectsAlert";

function GradesTable(props) {
  const [tableData, setTableData] = useState([]);
  const [selectedCriterionIndex, setSelectedCriterionIndex] = useState(null);

  const hola = () => {
    let newData = [];
    props.evalCriteria.map((evalCriterion) => {
      const test = props.StudEvalCriGrades.find(
        (studentEvalCriteriaGrade) =>
          studentEvalCriteriaGrade.evalCriteriaId === evalCriterion.id
      );
      if (test) {
        newData.push({
          evalCriteriaName: evalCriterion.name,
          weight: evalCriterion.weight,
          grade: test.grade,
          description: evalCriterion.description,
        });
      } else {
        newData.push({
          evalCriteriaName: evalCriterion.name,
          weight: evalCriterion.weight,
          grade: "",
          description: evalCriterion.description,
        });
      }
    });
    setTableData(newData);
    props.calculaNotaProyecto(tableData);
  };

  const handleButtonClick = (index) => {
    setSelectedCriterionIndex(index);
  };

  useEffect(() => {
    hola();
  }, [props.evalCriteria, props.StudEvalCriGrades]);

  return (
    <>
      <div className="relative overflow-x-auto w-full border border-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Criterio de avaluación
              </th>
              <th scope="col" className="px-6 py-3 text-center w-1/4">
                Metodo de evaluación
              </th>
              <th scope="col" className="px-6 py-3 text-center w-1/4">
                Peso
              </th>
              <th scope="col" className="px-6 py-3 text-center w-1/4">
                Descripción
              </th>
              <th scope="col" className="px-6 py-3 text-center w-1/4">
                Nota
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((evalCriterion, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 max-h-4">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {evalCriterion.evalCriteriaName}
                </th>
                <td className="px-6 py-4 text-center w-1/4">Númerico</td>
                <td className="px-6 py-4 text-center w-1/4">
                  {evalCriterion.weight}%
                </td>
                <td className="py-4 text-center w-1/4 max-h-[50px] overflow-y-auto ">
                  {evalCriterion.description}
                </td>
                <td className="px-6 py-4 text-center w-1/4">
                  {evalCriterion.grade}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default GradesTable;
