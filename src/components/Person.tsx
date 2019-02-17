import PersonPreview from "./PersonPreview";
import PersonCredits from "./PersonCredits";
import MetaTags, { personMetaTagsExtractProps } from "./MetaTags";
import { TmdbPersonEntity } from "../@types";

interface PersonProps extends TmdbPersonEntity {
  basePath: string;
  pathname: string;
}

const Person = ({ basePath, pathname, ...personProps }: PersonProps) => {
  return (
    <>
      <MetaTags
        {...personMetaTagsExtractProps(personProps, { basePath, pathname })}
      />
      <PersonPreview {...personProps} />
      <PersonCredits {...personProps} />
    </>
  );
};

export default Person;
