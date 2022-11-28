import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, changeNewTodo } from "../../Store/Reduces/TodoSlice";
import styles from "../TodoForm/TodoForm.module.css";
import Todo from "../Todo/Todo";

const TodoForm = () => {
  const dispatch = useDispatch();
  const todoUpdate = useSelector((state) => state);
  //   console.log("random", Math.floor(Math.random() * 1000));
  const [updateTitle, setUpdateTitle] = useState({});
  const [updateDescription, setUpdateDescription] = useState({});

  const [todo, setTodo] = useState("");

  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const handleUpdateTodo = () => {
    const data = {
      id: updateTitle.id,
      title: updateTitle.title,
      body: updateDescription.body,
      userId: updateTitle.userId,
    };

    dispatch(changeNewTodo(data));
    setUpdateDescription("");
    setUpdateTitle("");
  };
  useEffect(() => {
    setUpdateTitle(todoUpdate.todosReducer.updateNewTodo);
    setUpdateDescription(todoUpdate.todosReducer.updateNewTodo);
  }, [todoUpdate.todosReducer.updateNewTodo]);
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const onFinish = () => {
    // setTodo(values.todo);
    dispatch(addTodo(todo));
    setTodo("");
  };

  return (
    <Row className="">
      <Col md={6} className=""></Col>
      <Col md={12} className="">
        <div className={styles.update}>
          <Form.Item
            label="title"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input
              value={updateTitle.title}
              onChange={(e) => {
                setUpdateTitle({
                  id: updateTitle.id,
                  title: e.target.value,
                  userId: updateTitle.userId,
                  body: updateTitle.body,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input
              value={updateDescription.body}
              onChange={(e) => {
                setUpdateDescription({
                  id: updateDescription.id,
                  title: updateDescription.title,
                  userId: updateDescription.userId,
                  body: e.target.value,
                });
              }}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 11,
            }}
          >
            <Button type="primary" onClick={handleUpdateTodo}>
              update
            </Button>
          </Form.Item>
        </div>

        <div className="">
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                value={todo}
                onChange={(e) => {
                  setTodo(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                ...layout.wrapperCol,
                offset: 11,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Todo />
      </Col>
      <Col md={6} className=""></Col>
    </Row>
  );
};

export default TodoForm;
