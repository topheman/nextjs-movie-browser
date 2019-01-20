import Header from "./Header";

export default props => (
  <>
    <Header />
    <main>{props.children}</main>
  </>
);
