import React from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import styled from "styled-components";

import { LanguageList } from "../@types";
import SelectLanguage from "./SelectLanguage";
import { LanguageManagerConsumer } from "../services/i18n/LanguageManager";
import TranslationsStore from "../stores/TranslationsStore";
import { filterHtmlProps } from "../utils/helpers";

interface ITranslationPickerProps extends React.HTMLAttributes<HTMLElement> {
  defaultLanguages: LanguageList;
  translationsStore?: TranslationsStore;
  popupOpen: boolean;
  togglePopupOpen: (open: boolean) => void;
  className?: string;
}

const PickerButton = styled.button`
  border: 2px solid white;
  color: white;
  background: none;
  border-radius: 0.25rem;
  transition: background 0.3s, color 0.3s;
  position: relative;
  cursor: pointer;
  :hover {
    background: white;
    color: black;
  }
`;

const PickerWrapper = styled.div<{ popupOpen: boolean }>`
  display: ${props => (props.popupOpen ? "initial" : "none")};
  z-index: 999;
  position: absolute;
  top: 25px;
  right: 0px;
  border-radius: 0.25rem;
  padding: 0.5rem;
  background-color: #ff8686;
  color: black;
`;

/**
 * Language codes using a combination of ISO_639-1 and ISO_3166-1
 * Locale translations (stored in /static/locales) are identified only by ISO_639-1 code (like "fr", "en" ...)
 * The api uses both ISO_639-1 and ISO_3166-1 (like "fr-FR", "en-US", "pt-BR" ...)
 * See https://developers.themoviedb.org/3/getting-started/languages
 */

const TranslationPicker: React.FunctionComponent<ITranslationPickerProps> = ({
  defaultLanguages,
  translationsStore,
  popupOpen,
  togglePopupOpen,
  className,
  ...remainingProps
}) => {
  const translationLanguages = translationsStore!.availableLanguages;
  return (
    <div className={classNames(className)} {...filterHtmlProps(remainingProps)}>
      <LanguageManagerConsumer>
        {({
          translationLanguageFullCode,
          defaultLanguageFullCode,
          switchDefaultLanguage,
          switchTranslationLanguage,
          resetTranslationLanguage
        }) => {
          /**
           * `false` if no translation available corresponding to:
           *   - `translationLanguageFullCode` if set
           *   - or `defaultLanguageFullCode` in fallback
           */
          const languageOK =
            translationLanguages.length > 0
              ? translationLanguageFullCode
                ? translationLanguages.find(
                    language => language.code === translationLanguageFullCode
                  )
                : translationLanguages.find(
                    language => language.code === defaultLanguageFullCode
                  )
              : true;
          return (
            <>
              <PickerButton
                onClick={() => togglePopupOpen(!popupOpen)}
                style={{ color: (!languageOK && "darkorange") || undefined }}
                data-testid="translation-picker-btn"
              >
                {translationLanguageFullCode || defaultLanguageFullCode}
              </PickerButton>
              <PickerWrapper popupOpen={popupOpen}>
                {translationLanguages && translationLanguages.length > 0 && (
                  <SelectLanguage
                    style={{ display: "block", whiteSpace: "nowrap" }}
                    label="Translation language"
                    languagesList={[
                      { code: "", label: "Choose your language" }
                    ].concat(translationLanguages)}
                    onLanguageChange={languageCode => {
                      if (languageCode === "") {
                        return resetTranslationLanguage();
                      }
                      return switchTranslationLanguage(languageCode);
                    }}
                    value={translationLanguageFullCode}
                    data-testid="switch-translation-language"
                  />
                )}
                <SelectLanguage
                  style={{ display: "block", whiteSpace: "nowrap" }}
                  label="Default language"
                  languagesList={defaultLanguages}
                  onLanguageChange={languageCode =>
                    switchDefaultLanguage(languageCode)
                  }
                  value={defaultLanguageFullCode}
                  data-testid="switch-default-language"
                />
              </PickerWrapper>
            </>
          );
        }}
      </LanguageManagerConsumer>
    </div>
  );
};

export default inject("translationsStore")(observer(TranslationPicker));
