import Link from "next/link";

const films = [["Fight Club", 550], ["Pulp Fiction", 680], ["Star Wars", 11]];

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
    <ul>
      {films.map(([title, id]) => (
        <li key={id}>
          <Link
            href={{ pathname: `/movie`, query: { id } }}
            as={`/movie/${id}`}
          >
            <a>{title}</a>
          </Link>{" "}
          /{" "}
          <Link
            href={{ pathname: `/movie`, query: { id } }}
            as={`/movie/${id}-${(title as string)
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            <a>{title}</a>
          </Link>
        </li>
      ))}
    </ul>
  </>
);
