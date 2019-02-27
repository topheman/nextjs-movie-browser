import withCallingApi from "../src/components/with-calling-api";
import { apiTmdb } from "../src/services/apis";
import { makeCast } from "../src/components/Cast";

export default withCallingApi({
  apiCall: ({ id, language }) => apiTmdb().movie(id, { language }),
  namespaces: "movie",
  namespacesRequired: ["movie", "common"]
})(makeCast({ media_type: "movie" }));
