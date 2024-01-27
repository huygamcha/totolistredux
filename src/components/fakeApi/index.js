import { createServer, Model } from "miragejs";

// cấu hình fake api
const setupServer = () => {
  createServer({
    models: {
      todos: Model,
      filters: Model,
    },
    seeds(server) {
      server.create("todo", {
        id: 1,
        name: "learn java",
        completed: false,
        priority: "High",
      });
      server.create("filter", {
        search: "",
        status: "All",
        priority: [],
      });
    },

    routes() {
      this.get("/api/todos", (schema) => {
        return schema.todos.all();
      });

      this.post("/api/todos", (schema, request) => {
        const payload = JSON.parse(request.requestBody);
        return schema.todos.create(payload);
      });

      this.post("/api/updateTodo", (schema, request) => {
        const id = JSON.parse(request.requestBody);
        const currentTodo = schema.todos.find(id);
        currentTodo.completed = !currentTodo.completed;
        return currentTodo;
      });

      // filter

      this.get("/api/filters", (schema, request) => {
        return schema.filters.all();
      });
      this.post("api/searchText", (schema, request) => {
        const text = JSON.parse(request.requestBody);
        const data = schema.filters.find(1);
        data.update({ search: text });
        console.log("««««« text »»»»»", text);
        return data;
      });

      this.post("api/searchPriority", (schema, request) => {
        const priority = JSON.parse(request.requestBody);
        const data = schema.filters.find(1);
        data.update({ priority: priority });
        console.log("««««« searchPriority »»»»»", priority);
        return data;
      });

      this.post("api/searchStatus", (schema, request) => {
        const status = JSON.parse(request.requestBody);
        const data = schema.filters.find(1);
        data.update({ status: status });
        console.log("««««« searchStatus »»»»»", status);
        return data;
      });
    },
  });
};

export default setupServer;
