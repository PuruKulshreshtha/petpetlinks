// import { categories } from "./Action/categoryAction";
// import { comment } from "./Action/commentAction";
import { singlePost, filterfunc } from "./Action/postAction";
import store from "./store";
// import { get } from "lodash";
import callApi from "../api";
import config from "../config";
const { ROUTES } = config;
// let isLoading = false;

// export const loadMorePosts = ({
//   postBy = {},
//   skipCount = 0,
//   limitCount = 6
//   // categoryId = this.props.categoryId
// }) => {
//   if (isLoading) {
//     return;
//   }
//   let postCounts = 0;

//   // console.log(postBy, skipCount, limitCount);
//   isLoading = true;
//   callApi({ url: ROUTES.POST_COUNT, method: "POST", data: postBy }).then(
//     resp => {
//       postCounts = resp.data.count;
//       // console.log(">>>>>>>>>>>..post count", postCounts);
//       if (skipCount > postCounts) {
//         // console.log("qqqqqqqqqq");

//         isLoading = false;
//         store.dispatch(post([], postCounts, skipCount, false, postBy));
//         return;
//       } else {
//         let data = {
//           skipCount: skipCount,
//           limitCount: limitCount,
//           categoryId: get(postBy, "categoryId", null)
//         };
//         callApi({ url: ROUTES.ALL_POSTS, method: "POST", data: data }).then(
//           response => {
//             const content = response.data.dataFromDatabase;
//             // console.log(content);
//             isLoading = false;
//             store.dispatch(post(content, postCounts, skipCount, true, postBy));
//           }
//         );
//       }
//     }
//   );
// };

// export const defaultCategory = () => {
//   callApi({ url: ROUTES.DEFAULT_CATEGORY }).then(response => {
//     let c_status = response.data.status;
//     const categoryArr = response.data.dataFromDatabase;

//     store.dispatch(categories(categoryArr, c_status));
//   });
// };

// export const defaultComments = id => {
//   callApi({
//     method: "POST",
//     data: id,
//     url: ROUTES.DEFAULT_COMMENTS
//   }).then(response => {
//     store.dispatch(comment(response.data.dataFromDatabase));
//     // console.log(">>>>>>>>>>.... default comments", this.props.commentArr);
//   });
// };

export const posts = id => {
  // const id = this.props.match.params;
  callApi({ method: "POST", data: id, url: ROUTES.SINGLE_POST }).then(
    response => {
      store.dispatch(singlePost(response.data));
    }
  );
};

export const categoryUploadHandler = e => {
  e.preventDefault();
  const data = {
    cname: e.target.newCategory.value
  };
  // console.log("hello", data);
  callApi({ method: "POST", url: ROUTES.CATEGORY_UPLOAD, data: data })
    .then(response => {
      store.dispatch({ type: "defaultCategory" });
      //defaultCategory();

      alert(response.data.status);
    })
    .catch(err => {
      if (err.message === "Network Error") {
        this.props.history.push("/err");
      }
    });
};

export const getFileExtension = filename => {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
};

export const logout = () => {
  localStorage.removeItem("ID");
  localStorage.removeItem("email");
  localStorage.removeItem("username");
};

export const latest_first = data => {
  callApi({ url: ROUTES.FILTER, data: data, method: "POST" }).then(res => {
    store.dispatch(filterfunc(res.data));
    // console.log(res);
  });
};
