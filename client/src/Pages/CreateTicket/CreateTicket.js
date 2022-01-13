import "./CreateTicket.css";
import AddItemStepper from "../../Components/Stepper";

function CreateTicket() {
  const steps = [
    "Add Ticket Description",
    "Add Ticket Details",
    "Review/Submit Ticket",
  ];

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

export default CreateTicket;
