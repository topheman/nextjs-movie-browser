import PersonPreview from "./PersonPreview";
import PersonCredits from "./PersonCredits";
import MetaTags, {
  commonMetaTagsExtractProps,
  PropsMetaTags,
  makeImageTmdbUrl
} from "./MetaTags";
import { TmdbPersonEntity } from "../@types";

const personMetaTagsExtractProps = (
  tmdbPersonEntity: TmdbPersonEntity
): PropsMetaTags => {
  return {
    type: "person",
    title: (tmdbPersonEntity && tmdbPersonEntity.name) || undefined,
    description: (tmdbPersonEntity && tmdbPersonEntity.biography) || undefined,
    image: makeImageTmdbUrl(tmdbPersonEntity.profile_path, "w780")
  };
};

interface PersonProps extends TmdbPersonEntity {
  basePath: string;
  pathname: string;
}

const Person = ({ basePath, pathname, ...personProps }: PersonProps) => {
  return (
    <>
      <MetaTags
        {...commonMetaTagsExtractProps({ basePath, pathname })}
        {...personMetaTagsExtractProps(personProps)}
      />
      <PersonPreview {...personProps} />
      <PersonCredits {...personProps} />
    </>
  );
};

export default Person;
