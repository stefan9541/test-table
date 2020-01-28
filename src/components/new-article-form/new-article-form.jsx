import React from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { connect } from "react-redux";
import { addNewArticle } from "../../actions/table-actions";
import { bindActionCreators } from "redux";

const { TextArea } = Input;
const formItems = [
  { inputName: "name" },
  { inputName: "description", inputType: "textArea" },
  { inputName: "price", inputType: "number" }
];

const NewArticleForm = props => {
  const getInput = inputType => {
    if (inputType === "number") {
      return <InputNumber />;
    } else if (inputType === "textArea") {
      return <TextArea />;
    }
    return <Input />;
  };

  const handleSubmit = e => {
    const { validateFields, resetFields } = props.form;
    e.preventDefault();
    validateFields(async (err, values) => {
      if (err) {
        return;
      }
      await props.addNewArticle(values);
      resetFields();
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <Form onSubmit={handleSubmit}>
      {formItems.map(({ inputName, inputType }) => {
        return (
          <Form.Item key={inputName} style={{ margin: 0 }}>
            {getFieldDecorator(inputName, {
              rules: [{ required: true, message: `Please input ${inputName}` }]
            })(getInput(inputType))}
          </Form.Item>
        );
      })}
      <Button htmlType="submit" type="primary" style={{ marginTop: "5px" }}>
        добавить
      </Button>
    </Form>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addNewArticle }, dispatch);
};

export default connect(null, mapDispatchToProps)(Form.create()(NewArticleForm));
