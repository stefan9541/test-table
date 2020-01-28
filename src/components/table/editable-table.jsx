/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import EditableCell from "../editable-cell/editable-cell";
import { Table, Form, Popconfirm } from "antd";
import { EditableContextProvider } from "../../context/form-context";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as tableActions from "../../actions/table-actions";

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "name",
        dataIndex: "name",
        width: "25%",
        editable: true
      },
      {
        title: "description",
        dataIndex: "description",
        width: "15%",
        editable: true
      },
      {
        title: "price",
        dataIndex: "price",
        width: "40%",
        editable: true
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) => {
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <a
                onClick={() => this.save(record.id)}
                style={{ marginRight: 8 }}
              >
                Save
              </a>
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => this.cancel(record.id)}
              >
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <React.Fragment>
              <a
                style={{ marginRight: "8px" }}
                onClick={() => this.edit(record.id)}
              >
                Edit
              </a>
              <Popconfirm
                onConfirm={() => this.props.updateArticle(record.id, null, 0)}
                title="Are u sure???"
              >
                <a>Delete</a>
              </Popconfirm>
            </React.Fragment>
          );
        }
      }
    ];
  }

  componentDidMount() {
    this.props.getData();
  }

  isEditing = record => record.id === this.props.editingKey;

  cancel = () => {
    this.props.editKey("");
  };

  save(id) {
    const { form, updateArticle } = this.props;
    form.validateFields((error, row) => {
      console.log(row);
      if (error) {
        return;
      }
      updateArticle(id, row, 10);
    });
  }

  edit(id) {
    this.props.editKey(id);
  }

  render() {
    const { tableData, loading } = this.props;
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputtype: col.dataIndex === "price" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <EditableContextProvider value={this.props.form}>
        <Table
          components={components}
          bordered
          loading={loading}
          rowKey={record => record.id}
          dataSource={tableData}
          columns={columns}
          rowClassName="editable-row"
          pagination={false}
        />
      </EditableContextProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    tableData: state.data,
    editingKey: state.editingKey,
    loading: state.loading
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...tableActions }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(EditableTable));
