import { LinkProps } from "next/link";

import { normalizeString } from "../utils/helpers";
import { LinkWithLanguage } from "../services/i18n/LanguageManager";

interface TmdbEntityMinimum {
  id: number;
  media_type: "movie" | "person" | "tv";
  original_name?: string;
  original_title?: string;
  name?: string;
}

interface AppLinkProps extends LinkProps {
  tmdbEntity?: TmdbEntityMinimum;
}

export const makeSlug = normalizeString;

interface IResultMakeLinkProps {
  href: {
    pathname: string;
    query: {
      id: string | number;
    };
  };
  as: string;
}

/**
 *
 * @param tmdbEntity
 * @param translationLanguageFullCode Use it when calling programmatically from router
 */
export const makeLinkProps = (
  tmdbEntity?: TmdbEntityMinimum,
  translationLanguageFullCode?: string
): IResultMakeLinkProps | any => {
  let props;
  if (tmdbEntity) {
    props = {
      href: {
        pathname: `/${tmdbEntity.media_type}`,
        query: {
          id: tmdbEntity.id
        }
      },
      as: `/${tmdbEntity.media_type}/${tmdbEntity.id}-${makeSlug(
        tmdbEntity.original_name ||
          tmdbEntity.original_title ||
          tmdbEntity.name ||
          ""
      )}`
    };
    if (translationLanguageFullCode) {
      (props.href
        .query as any).translationLanguageFullCode = translationLanguageFullCode;
      props.as += `?translationLanguageFullCode=${translationLanguageFullCode}`;
    }
    return props;
  }
  return {};
};

const Link = ({ tmdbEntity, children, ...props }: AppLinkProps) => {
  return (
    <LinkWithLanguage {...makeLinkProps(tmdbEntity)} {...props}>
      {children}
    </LinkWithLanguage>
  );
};

export default Link;
