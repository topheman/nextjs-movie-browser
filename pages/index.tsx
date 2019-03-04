import withCallingApi from "../src/components/with-calling-api";
import { apiTmdb } from "../src/services/apis";
import Home from "../src/components/Home";

export default withCallingApi({
  apiCall: ({ language }) => apiTmdb().trending("all", "week", { language }),
  namespaces: "home",
  namespacesRequired: ["home", "common"]
})(Home);
