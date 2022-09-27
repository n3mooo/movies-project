import produce from "immer";
const initialState = {
  userList: null,
  userTypes: null,
  selectedUser: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "user/GET_USER_LIST":
      return produce(state, (draft) => {
        draft.userList = action.payload;
      });
    case "user/GET_LOAI_NGUOI_DUNG":
      return produce(state, (draft) => {
        draft.userTypes = action.payload;
      });
      case "user/GET_USER_DETAIL":
      return produce(state, (draft) => {
        draft.selectedUser = action.payload;
      });
    default:
      return state;
  }
};
export default reducer;
