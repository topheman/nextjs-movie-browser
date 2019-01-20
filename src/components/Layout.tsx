import Header from "./Header";

export default (props: any) => (
  <>
    <Header />
    <main>{props.children}</main>
  </>
);
