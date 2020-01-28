const initialState = {
  data: [],
  loading: true,
  editingKey: "",
  error: null
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TABLE_DATA_REQUEST":
      return {
        data: [],
        loading: true,
        error: null
      };
    case "TABLE_DATA_SUCCESS":
      return {
        data: action.payload,
        loading: false,
        error: null
      };

    case "TABLE_DATA_FAILURE":
      return {
        data: [],
        loading: false,
        error: action.payload
      };
    case "EDIT_KEY":
      return {
        ...state,
        editingKey: action.payload
      };
    case "UPDATE_ITEM": {
      const { id, row } = action.payload;
      const newData = [...state.data];
      const index = newData.findIndex(item => id === item.id);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row
      });
      return {
        ...state,
        editingKey: "",
        data: newData
      };
    }
    case "DELETE_ITEM":
      const id = action.payload;
      return {
        ...state,
        data: state.data.filter(item => item.id !== id)
      };
    case "ADD_NEW_ARTICLE":
      return {
        ...state,
        data: [action.payload, ...state.data]
      };
    default:
      return state;
  }
};

export default tableReducer;
