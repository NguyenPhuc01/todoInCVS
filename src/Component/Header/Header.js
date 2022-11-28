import { Col, Row } from "antd";
import React from "react";
import styles from "../Header/Header.module.css";
const Header = () => {
  return (
    <Row className={styles.header}>
      <Col md="24">
        <div>
          <h1 className={styles.textHeader}>React Todo App</h1>
        </div>
      </Col>
    </Row>
  );
};

export default Header;
