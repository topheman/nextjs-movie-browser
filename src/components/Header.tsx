import Link from "next/link";

export default () => (
  <>
    <h1>{process.env.NEXTJS_APP_CLIENT_TITLE}</h1>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About</a>
        </Link>
      </li>
    </ul>
  </>
);
