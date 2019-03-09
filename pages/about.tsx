import withCallingApi from "../src/components/with-calling-api";
import About from "../src/components/About";

// not passing apiCall is allowed
export default withCallingApi({
  namespaces: "about",
  namespacesRequired: ["about", "common"]
})(About);
