import i18next from "i18next";
import Link from "next/link";

import { withNamespaces } from "../../i18n";
import SwitchLanguage from "./SwitchLanguage";

const films = [["Fight Club", 550], ["Pulp Fiction", 680], ["Star Wars", 11]];

const Header = ({ t }: { t: i18next.TranslationFunction }) => (
  <>
    <h1>{process.env.NEXTJS_APP_CLIENT_TITLE}</h1>
    <SwitchLanguage data-testid="switch-language" />
    <ul>
      <li>
        <Link href="/">
          <a>{t("common-label-home")}</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>{t("common-label-about")}</a>
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

export default withNamespaces("common")(Header);
