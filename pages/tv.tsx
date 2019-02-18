import withCallingApi from "../src/components/with-calling-api";
import { apiTmdb } from "../src/services/apis";
import Tv from "../src/components/Tv";

export default withCallingApi({
  apiCall: ({ id, language }) => apiTmdb().tv(id, { language }),
  namespaces: "movie",
  namespacesRequired: ["movie", "common"]
})(Tv);
