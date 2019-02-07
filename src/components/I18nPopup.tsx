import { useState } from "react";

import { LanguageList } from "../@types";
import SwitchLanguage from "./SwitchLanguage";
import { LanguageManagerConsumer } from "../services/i18n/LanguageManager";

interface II18nPopupProps {
  defaultLanguages: LanguageList;
  translationLanguages: LanguageList;
}

const I18nPopup: React.ComponentType<II18nPopupProps> = ({
  defaultLanguages,
  translationLanguages
}) => {
  const [open, toggleOpen] = useState(false);
  return (
    <LanguageManagerConsumer>
      {({ defaultLanguageFullCode, translationLanguageFullCode }) => (
        <>
          <button onClick={() => toggleOpen(!open)}>
            {translationLanguageFullCode || defaultLanguageFullCode}
          </button>
          <div style={{ display: open ? "initial" : "none" }}>
            <SwitchLanguage
              defaultLanguages={defaultLanguages}
              translationLanguages={translationLanguages}
            />
          </div>
        </>
      )}
    </LanguageManagerConsumer>
  );
};

export default I18nPopup;
