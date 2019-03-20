import withCallingApi from "../src/components/with-calling-api";
import Qrcode from "../src/components/Qrcode";

// not passing apiCall is allowed
export default withCallingApi({
  namespaces: "common",
  namespacesRequired: ["common"]
})(Qrcode);
