import "./CreateProject.css";
import AddItemStepper from "../../Components/Stepper";

function CreateProject() {
  const steps = ["Add Project Details", "Assign Roles", "Review/Add Project"];

  function firstStep() {
    return <div>one</div>;
  }

  function secondStep() {
    return <div>two</div>;
  }
  function thirdStep() {
    return <div>three</div>;
  }
  return (
    <div>
      <AddItemStepper
        steps={steps}
        stepOneContent={firstStep}
        stepTwoContent={secondStep}
        stepThreeContent={thirdStep}
      />
    </div>
  );
}

export default CreateProject;
