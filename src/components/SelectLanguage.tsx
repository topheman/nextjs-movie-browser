import React from "react";

import { LanguageList } from "../@types";
import { filterHtmlProps } from "../utils/helpers";

const SelectLanguage: React.FunctionComponent<
  {
    languagesList: LanguageList;
    label: React.ReactNode;
    onLanguageChange: (languageCode: string) => void;
    value: string | undefined;
    "data-testid": string;
  } & React.HTMLAttributes<HTMLLabelElement>
> = ({
  languagesList,
  label,
  onLanguageChange,
  value,
  "data-testid": dataTestid,
  ...remainingProps
}) => {
  return (
    <label {...filterHtmlProps(remainingProps)}>
      <span>{label}</span>
      <select
        data-testid={dataTestid}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          return onLanguageChange(e.target.value);
        }}
        value={value}
      >
        {languagesList.map(({ code, label: languageLabel }) => {
          return (
            <option key={code} value={code}>
              {languageLabel}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default SelectLanguage;
