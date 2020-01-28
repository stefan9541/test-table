import TableApi from "../api/table-api";
import { message } from "antd";

const {
  getDataTable,
  postNewArticle,
  updateOrDeleteArticleById
} = new TableApi();

const tableDataRequest = () => {
  return {
    type: "TABLE_DATA_REQUEST"
  };
};
const tableDataSuccess = data => {
  return {
    type: "TABLE_DATA_SUCCESS",
    payload: data
  };
};
const tableDataFailure = error => {
  return {
    type: "TABLE_DATA_FAILURE",
    payload: error
  };
};

export const getData = () => dispatch => {
  dispatch(tableDataRequest());
  getDataTable()
    .then(({ data }) => {
      dispatch(tableDataSuccess(data));
    })
    .catch(err => {
      dispatch(tableDataFailure(err));
      message.error("need authenticate");
    });
};

export const editKey = id => {
  return {
    type: "EDIT_KEY",
    payload: id
  };
};

export const updateItem = (row, id) => {
  return {
    type: "UPDATE_ITEM",
    payload: { row, id }
  };
};

export const deleteItem = id => {
  return {
    type: "DELETE_ITEM",
    payload: id
  };
};

const newArticle = article => {
  return {
    type: "ADD_NEW_ARTICLE",
    payload: article
  };
};

export const addNewArticle = article => async dispatch => {
  try {
    const { data } = await postNewArticle(article);
    dispatch(newArticle(data));
  } catch (err) {
    return message.error("Smth get wrong");
  }
};

export const updateArticle = (id, article, status) => async dispatch => {
  try {
    const { data } = await updateOrDeleteArticleById(id, article, status);
    console.log(data);
    if (data.status === 10) {
      return dispatch(updateItem(data, id));
    }
    dispatch(deleteItem(id));
  } catch (error) {
    return message.error("Smth get wrong");
  }
};
