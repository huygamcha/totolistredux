import { Typography, Divider } from "antd";
import "./App.css";
import TodoList from "./components/TodoList";
import Filters from "./components/Filters";
import setupServer from "./components/fakeApi";
import { useEffect } from "react";

setupServer();

const { Title } = Typography;

function App() {
  // useEffect(() => {
  //   fetch("api/todos", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       id: 3,
  //       name: "learn yoga",
  //       completed: false,
  //       priority: "Low",
  //     }),
  //   }).then((res) =>
  //     fetch("/api/todos")
  //       .then((res) => res.json())
  //       .then((res) =>
  //         fetch("/api/updateTodo", {
  //           method: "POST",
  //           body: JSON.stringify({
  //             id: 3,
  //             name: "learn abc",
  //             completed: true,
  //             priority: "Low",
  //           }),
  //         }).then((res) =>
  //           fetch("/api/todos")
  //             .then((res) => res.json())
  //             .then((res) => console.log("««««« res »»»»", res))
  //         )
  //       )
  //   );
  // });
  return (
    <div
      style={{
        width: 500,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: 20,
        boxShadow: "0 0 10px 4px #bfbfbf",
        borderRadius: 5,
        height: "90vh",
      }}
    >
      <Title style={{ textAlign: "center" }}>TODO APP with REDUX</Title>
      <Filters />
      <Divider />
      <TodoList />
    </div>
  );
}

export default App;
