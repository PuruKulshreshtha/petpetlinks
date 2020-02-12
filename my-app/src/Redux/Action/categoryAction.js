import { DefaultCategory } from "../Constant";

export const categories = (categoriesData, categoryStatus) => {
  return {
    type: DefaultCategory,
    categoriesData: categoriesData,
    categoryStatus: categoryStatus
  };
};
