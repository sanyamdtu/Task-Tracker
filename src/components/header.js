import Button from "./button";
const header = ({ title, onAdd, showAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        onClick={onAdd}
        color={!showAdd ? "green" : "red"}
        text={!showAdd ? "Add" : "Close"}
      ></Button>
    </header>
  );
};

export default header;
