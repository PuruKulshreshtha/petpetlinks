import axios from 'axios'
import config from './config'
import isEmpty from "lodash/isEmpty"
//import { createBrowserHistory } from 'history';
//import history from "./history.js";
//const history = createBrowserHistory();
const callApi = ({
    method = 'get',
    url,
    data = {},
    headers = {
      'content-type': 'application/json',
      Accept: 'application/json'
    }
}) => {
    return new Promise((resolve, reject)=> {
     // console.log('data is#######', url, data);
      //console.log("HIstory",history);
      if (method === 'get' && !isEmpty(data)) {
        let queryParams = encodeURI(JSON.stringify(data));
        url = `${config.SERVER_URL}/${url}?params=${queryParams}`;
      } else {
        url = `${config.SERVER_URL}/${url}`;
      }
      
      
      let options = {
        method,
        url,
        data,
        headers,
       
        timeout: 1000 * 10
      };
      if (method === 'get') {
        delete options['data'];
      }
      axios({
        ...options
      })
        .then(response => {
           // console.log("api response",response);
          return resolve(response);

        })
        .catch(err => {
           // history.push("/err");
            //console.log("RAjat  dff",err.message);
            if(err.message==='timeout of 10000ms exceeded' || err.message==='Network Error'){
                console.log("Time of exceed");
                
              // history.push("/err");
            }
            //console.log("djjfjfjfjjjf",err.response)
          return reject(err);
        });
    });
  };
  export default callApi;