import Head from "next/head";

import PersonPreview from "./PersonPreview";
import PersonCredits from "./PersonCredits";
import { TmdbPersonEntity } from "../@types";

const Person = (props: TmdbPersonEntity) => {
  return (
    <>
      <Head>
        <meta name="description" content={props.biography} />
      </Head>
      <PersonPreview {...props} />
      <PersonCredits {...props} />
    </>
  );
};

export default Person;
