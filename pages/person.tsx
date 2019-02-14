import withCallingApi from "../src/utils/with-calling-api";
import { apiTmdb } from "../src/services/apis";
import Person from "../src/components/Person";

export default withCallingApi({
  apiCall: ({ id, language }) => apiTmdb().person(id, { language }),
  namespaces: "person",
  namespacesRequired: ["person", "common"]
})(Person);
