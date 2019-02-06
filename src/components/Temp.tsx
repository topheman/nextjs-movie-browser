import { useEffect, useState } from "react";

import { apiTmdb } from "../services/apis";
import { TmdbMovieEntity } from "../@types";

const Temp = () => {
  const [result, setResult] = useState<TmdbMovieEntity | null>(null);
  useEffect(() => {
    apiTmdb()
      .movie(12, { language: "en" })
      .then(data => {
        console.log("unmocked then");
        setResult(data);
      })
      .catch(() => {
        console.log("unmocked catch");
      });
  });
  return <div>{result}</div>;
};

export default Temp;
