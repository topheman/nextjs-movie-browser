import React from "react";

import { LanguageList } from "../@types";

const SelectLanguage: React.SFC<
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
    <label {...remainingProps}>
      <span>{label}</span>
      <select
        data-testid={dataTestid}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          if (e.target.value) {
            onLanguageChange(e.target.value);
          }
        }}
        value={value}
      >
        {languagesList.map(({ code, label }) => {
          return (
            <option key={code} value={code}>
              {label}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default SelectLanguage;
