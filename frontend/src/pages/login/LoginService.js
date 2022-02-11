import axios from "axios";
import myAppConfig from "../../config";

const postLogin = (send) => {
  return axios
    .post(myAppConfig.api.ENDPOINT + "/api/v1/login/get-access-token", send)
    .then((response) => {
      return response;
    });
};

const DataService = {
  postLogin,
};

export default DataService;
