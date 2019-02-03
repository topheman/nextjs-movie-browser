import { useState } from "react";

import { LanguageList } from "../@types";
import SwitchLanguage from "./SwitchLanguage";
import { LanguageManagerConsumer } from "../services/i18n/LanguageManager";

interface II18nPopupProps {
  allLanguages: LanguageList;
}

const I18nPopup: React.ComponentType<II18nPopupProps> = ({ allLanguages }) => {
  const [open, toggleOpen] = useState(false);
  return (
    <LanguageManagerConsumer>
      {({ languageOverrideFull }) => (
        <>
          <button onClick={() => toggleOpen(!open)}>
            {languageOverrideFull}
          </button>
          <div style={{ display: open ? "initial" : "none" }}>
            <SwitchLanguage
              languages={allLanguages}
              data-testid="switch-language"
            />
          </div>
        </>
      )}
    </LanguageManagerConsumer>
  );
};

export default I18nPopup;
