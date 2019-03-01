import withCallingApi from "../src/components/with-calling-api";
import { apiTmdb } from "../src/services/apis";
import Seasons from "../src/components/Seasons";

export default withCallingApi({
  apiCall: ({ id, language }) => apiTmdb().tv(id, { language }),
  namespaces: "movie",
  namespacesRequired: ["movie", "common"]
})(Seasons);
