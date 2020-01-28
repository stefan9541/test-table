import React from "react";
import { Col, Button, Popover, Icon, Tooltip } from "antd";
import NewArticleForm from "../new-article-form/new-article-form";

const NewArcticle = () => {
  return (
    <Col style={{ marginRight: "20px" }}>
      <Tooltip placement="topLeft" title="Добавить задачу">
        <Popover
          placement="leftBottom"
          content={<NewArticleForm />}
          title="Новая задача"
          trigger="click"
          overlayStyle={{ width: "300px" }}
        >
          <Button type="primary">
            <Icon type="plus" />
          </Button>
        </Popover>
      </Tooltip>
    </Col>
  );
};

export default NewArcticle;
