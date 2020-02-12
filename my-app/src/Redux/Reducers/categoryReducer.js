import { DefaultCategory } from "../Constant";

const initialState = {
  categoriesData: [],
  categoryStatus: ""
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case DefaultCategory:
      return {
        ...state,
        categoriesData: action.categoriesData,
        categoryStatus: action.categoryStatus
      };

    default:
      return state;
  }
};

export default categoryReducer;
