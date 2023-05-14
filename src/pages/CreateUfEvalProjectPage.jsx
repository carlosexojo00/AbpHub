import FormativeCiclesList from "../components/FormativeCiclesList";
import Stepper from "../components/Stepper";

function CreateUfEvalProjectPage() {
  return (
    <div>
      <h1>Crea un entorno de evaluación para tu Unidad Formativa</h1>
      <p>
        En primer lugar, debes seleccionar el ciclo de la uf que quieres
        evaluar. En segundo lugar, selecciona el módulo y por último la uf
      </p>
      <Stepper></Stepper>
    </div>
  );
}

export default CreateUfEvalProjectPage;
