import PersonPreview from "./PersonPreview";
import PersonCredits from "./PersonCredits";
import { TmdbPersonEntity } from "../@types";

const Person = (props: TmdbPersonEntity) => {
  return (
    <>
      <PersonPreview {...props} />
      <PersonCredits {...props} />
    </>
  );
};

export default Person;
