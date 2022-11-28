import {
  createAsyncThunk,
  createSlice,

  nanoid,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getTodos = createAsyncThunk("todos/todoFetch", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  return response.data;
});

export const deleteTodo = createAsyncThunk(
  "todo/DeleteTodo",
  async (todoId) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
    return todoId;
  }
);
export const changeNewTodo = createAsyncThunk(
  "todo/changeTodo",
  async (todoId) => {
    await axios.put(`https://jsonplaceholder.typicode.com/todos/${todoId.id}`);
    return todoId;
  }
);

export const addTodo = createAsyncThunk("todo/addTodo", async (title) => {
  const newTodo = {
    id: nanoid(),
    userId: nanoid(),
    title: title,
    completed: false,
  };
  await axios.post("https://jsonplaceholder.typicode.com/todos", newTodo);

  return newTodo;
});

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    updateNewTodo: {},
    allTodos: [],
  },
  reducers: {
    changeTodo: {
      reducer(state, action) {
        state.updateNewTodo = action.payload;
        // console.log("state", state.allTodos);
      },
    },
    // UpdateTodo(state, action) {
    //   console.log("action", action);
    //   state.allTodos = [...state.allTodos].filter(
    //     (todo) => todo.id !== action.payload.id
    //   );
    // },
  },
  extraReducers: {
    [getTodos.pending]: (state, action) => {
      console.log("dang lay du lieu");
    },
    [getTodos.fulfilled]: (state, action) => {
      console.log("Done");
      state.allTodos = action.payload;
    },
    [getTodos.rejected]: (state, action) => {
      console.log("Failed get todos");
    },

    [deleteTodo.pending]: (state, action) => {
      console.log("delete");
    },
    [deleteTodo.fulfilled]: (state, action) => {
      console.log(action.payload);
      const todoId = action.payload;
      state.allTodos = state.allTodos.filter((todo) => todo.id !== todoId);
    },
    [changeNewTodo.pending]: (state, action) => {
      console.log("dang sua", state);
    },
    [changeNewTodo.fulfilled]: (state, action) => {
      // console.log("🚀 ~ file: TodoSlice.js ~ line 82 ~ state", current(state));
      console.log("action.payload", action.payload);
      // const todoId = action.payload;
      // let filterTodo = [...state.allTodos].filter((todo) => {
      //   return todo.id !== action.payload.id;
      // });
      // var filterTodo = [...state.allTodos].find(function (element) {
      //   return element.id === action.payload.id;
      // });
      // console.log(
      //   "🚀 ~ file: TodoSlice.js ~ line 94 ~ filterTodo ~ filterTodo",
      //   current(filterTodo)
      // );

      // let updateDataTodo = [...filterTodo, action.payload];
      // console.log(
      //   "🚀 ~ file: TodoSlice.js ~ line 103 ~ updateDataTodo",
      //   updateDataTodo
      // );
      // state.allTodos = updateDataTodo;
      var filterTodo = [...state.allTodos].map((e, i) => {
        if (e.id === action.payload.id) {
          return [e, action.payload];
        }
      });

      console.log(
        "🚀 ~ file: TodoSlice.js ~ line 110 ~ filterTodo ~ filterTodo",
        filterTodo
      );
    },

    [addTodo.pending]: (state, action) => {
      console.log("fetching addtodo");
    },
    [addTodo.fulfilled]: (state, action) => {
      state.allTodos.unshift(action.payload);
    },
  },
});

// Reducer
const todosReducer = todosSlice.reducer;

// Selector
export const todosSelector = (state) => state.todosReducer.allTodos;
export const { UpdateTodo, changeTodo } = todosSlice.actions;
// Export reducer
export default todosReducer;
