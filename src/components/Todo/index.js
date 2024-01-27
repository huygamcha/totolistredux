import { Row, Tag, Checkbox } from "antd";
import { useDispatch } from "react-redux";
// import { toggleTodo } from "../../redux/action";
import todoSlice, { addTodoThunk, updateTodo } from "../TodoList/TodoSlice";

const priorityColorMapping = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};

export default function Todo({ name, priority, check, id }) {
  const dispatch = useDispatch();

  const toggleCheckbox = () => {
    // dispatch(todoSlice.actions.toggleTodo(id));
    dispatch(updateTodo(id));
  };
  return (
    <Row
      justify="space-between"
      style={{
        marginBottom: 3,
        ...(check ? { opacity: 0.5, textDecoration: "line-through" } : {}),
      }}
    >
      <Checkbox checked={check} onChange={toggleCheckbox}>
        {name}
      </Checkbox>
      <Tag color={priorityColorMapping[priority]} style={{ margin: 0 }}>
        {priority}
      </Tag>
    </Row>
  );
}
