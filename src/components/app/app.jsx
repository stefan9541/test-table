import React from "react";
import EditableTable from "../table/editable-table";
import { Row, Col } from "antd";

import "antd/dist/antd.css";
import LoginButton from "../login-button/login-button";
import NewArcticle from "../new-article/new-article";

const App = () => {
  return (
    <Row type="flex" justify="center">
      <Col span={15}>
        <Col style={{ display: "flex", marginTop: "20px" }}>
          <NewArcticle />
          <LoginButton />
        </Col>
        <EditableTable />
      </Col>
    </Row>
  );
};

export default App;
