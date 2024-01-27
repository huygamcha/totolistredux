import { todosRemainingSelector } from "../../redux/selector";
import { Col, Row, Input, Button, Select, Tag } from "antd";
import Todo from "../Todo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addTodo } from "../../redux/action";
import { v4 as uuidv4 } from "uuid";
import todoSlice, { addTodoThunk, fetchTodo } from "./TodoSlice";

export default function TodoList() {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("High");

  const dispatch = useDispatch();
  let todoList;

  // sử dụng selector để lấy được state ở kho chung, với đây là lấy todoList
  todoList = useSelector(todosRemainingSelector);

  const handlePriority = (value) => {
    setPriority(value);
  };

  const handleAdd = () => {
    dispatch(
      addTodoThunk({
        id: 0,
        name: name,
        priority: priority,
        completed: false,
      })
    );
    setName(" ");
    setPriority("High");
  };

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        {todoList
          ? todoList.map((value, index) => (
              <Todo
                check={value.completed}
                key={index}
                name={value.name}
                priority={value.priority}
                id={value.id}
              ></Todo>
            ))
          : ""}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: "flex" }} compact>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Select
            value={priority}
            onChange={handlePriority}
            defaultValue="Medium"
          >
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button onClick={handleAdd} type="primary">
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
