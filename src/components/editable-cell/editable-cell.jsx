import React from "react";
import { Form, InputNumber, Input } from "antd";
import { EditableContextConsumer } from "../../context/form-context";

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputtype === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      record,
      children,
      ...restProps
    } = this.props;
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
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContextConsumer>{this.renderCell}</EditableContextConsumer>;
  }
}

export default EditableCell;
