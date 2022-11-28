import React, { useEffect } from "react";
import styles from "../Todo/Todo.module.css";
import { DeleteOutlined, ScissorOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTodo,
  getTodos,
  todosSelector,
  changeTodo,
} from "../../Store/Reduces/TodoSlice";

const Todo = () => {
  const todos = useSelector(todosSelector);

  const dispatch = useDispatch();
  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };
  const handleChangeTodo = (e) => {
    dispatch(
      changeTodo({
        id: e.id,
        title: e.title,
        userId: e.userId,
        body: e.body,
      })
    );
  };

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
  return (
    <div className={styles.Todo}>
      <ul>
        {todos.map((e) => {
          return (
            <li key={e.id}>
              <div>
                <h3>{e.title}</h3>
                <span>{e.body}</span>
              </div>

              <div className={styles.todoIcon}>
                <button
                  className={styles.btnChange}
                  onClick={() => {
                    handleChangeTodo(e);
                  }}
                >
                  <ScissorOutlined />
                </button>
                <button
                  className={styles.btnDelete}
                  onClick={() => {
                    handleDeleteTodo(e.id);
                  }}
                >
                  <DeleteOutlined />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div></div>
    </div>
  );
};

export default Todo;
