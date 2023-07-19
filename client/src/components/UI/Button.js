const Button = (props) => {
  return (
    <button style={{ backgroundColor: "blue" }} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Button;
