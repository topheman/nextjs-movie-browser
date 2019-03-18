import React from "react";
import PersonPreview from "./PersonPreview";
import PersonContent from "./PersonContent";
import MetaTags, {
  commonMetaTagsExtractProps,
  PropsMetaTags,
  makeImageTmdbUrl
} from "./MetaTags";
import { TmdbPersonEntity, PageRootComponent } from "../@types";

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

const Person: React.FunctionComponent<PageRootComponent<TmdbPersonEntity>> = ({
  basePath,
  pathname,
  data: tmdbPersonEntity
}) => {
  return (
    <>
      <MetaTags
        {...commonMetaTagsExtractProps({ basePath, pathname })}
        {...personMetaTagsExtractProps(tmdbPersonEntity)}
      />
      <PersonPreview data={tmdbPersonEntity} />
      <PersonContent data={tmdbPersonEntity} />
    </>
  );
};

export default Person;
