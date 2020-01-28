import React from "react";
import { Form, InputNumber, Input } from "antd";
import { EditableContextConsumer } from "../../context/form-context";

const EditableCell = props => {
  const getInput = () => {
    if (props.inputtype === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };

  const renderCell = ({ getFieldDecorator }) => {
    const { editing, dataIndex, title, record, children, ...restProps } = props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  return <EditableContextConsumer>{renderCell}</EditableContextConsumer>;
};

export default EditableCell;
