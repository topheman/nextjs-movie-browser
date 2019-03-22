import React from "react";
import i18next from "i18next";
import { inject, observer } from "mobx-react";
import styled from "styled-components";

import { LanguageList } from "../@types";
import { withNamespaces } from "../../i18n";
import CloseOnEscape from "./CloseOnEscape";
import SelectLanguage from "./SelectLanguage";
import { LanguageManagerConsumer } from "../services/i18n/LanguageManager";
import TranslationsStore from "../stores/TranslationsStore";
import { filterHtmlProps } from "../utils/helpers";

const HighLight = styled.span`
  @keyframes example {
    from {
      margin-right: 5px;
    }
    to {
      margin-right: 15px;
    }
  }
  animation-name: example;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
`;

const PickerButton = styled.button`
  border: 2px solid white;
  color: white;
  background: none;
  border-radius: 0.25rem;
  transition: background 0.3s, color 0.3s;
  position: relative;
  height: 35px;
  cursor: pointer;
  :hover {
    background: white;
    color: black;
  }
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin: 0.5em 0;
  white-space: nowrap;
  span {
    color: gray;
    font-size: 0.8em;
  }
`;

const PickerWrapper = styled.div<{ popupOpen: boolean }>`
  display: ${props => (props.popupOpen ? "initial" : "none")};
  z-index: 999;
  position: absolute;
  top: 38px;
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

export interface TranslationPickerProps
  extends React.HTMLAttributes<HTMLElement> {
  t: i18next.TranslationFunction;
  defaultLanguages: LanguageList;
  translationsStore?: TranslationsStore;
  className?: string;
}

interface TranslationPickerState {
  popupOpen: boolean;
}

class TranslationPickerClass extends React.Component<
  TranslationPickerProps,
  TranslationPickerState
> {
  wrapperRef = React.createRef<HTMLDivElement>();
  state = {
    popupOpen: false
  };

  handleClickOutside = (event: any) => {
    const current = this.wrapperRef.current;
    if (current && !current.contains(event.target)) {
      this.togglePopupOpen(false);
    }
  };

  togglePopupOpen = (popupOpen: boolean) => {
    this.setState({ popupOpen });
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, false);
    document.addEventListener("touchstart", this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.addEventListener("click", this.handleClickOutside, false);
    document.addEventListener("touchstart", this.handleClickOutside, false);
  }

  render() {
    const {
      t,
      defaultLanguages,
      translationsStore,
      ...remainingProps
    } = this.props;
    const { popupOpen } = this.state;
    const translationLanguages = translationsStore!.availableLanguages;
    return (
      <div {...filterHtmlProps(remainingProps)} ref={this.wrapperRef}>
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
                {translationLanguages &&
                  translationLanguages.length > 0 &&
                  !translationLanguageFullCode && <HighLight>👉</HighLight>}
                <PickerButton
                  onClick={() => this.togglePopupOpen(!popupOpen)}
                  style={{ color: (!languageOK && "darkorange") || undefined }}
                  data-testid="translation-picker-btn"
                >
                  {translationLanguageFullCode || defaultLanguageFullCode}
                </PickerButton>
                <CloseOnEscape onEscape={() => this.togglePopupOpen(false)}>
                  <PickerWrapper
                    popupOpen={popupOpen}
                    data-testid="translation-picker-modal"
                  >
                    <Title>
                      {t("common-translation-picker-translations")}
                      {translationLanguages &&
                        translationLanguages.length > 0 && (
                          <span> {translationLanguages.length}</span>
                        )}
                    </Title>
                    {translationLanguages &&
                      translationLanguages.length === 0 &&
                      translationLanguageFullCode && (
                        <button onClick={() => resetTranslationLanguage()}>
                          Reset
                        </button>
                      )}
                    {translationLanguages &&
                      translationLanguages.length === 0 &&
                      !translationLanguageFullCode && (
                        <>
                          <p>
                            {t(
                              "common-translation-picker-explain-available-translations"
                            )}
                          </p>
                          <p>
                            {t(
                              "common-translation-picker-explain-exotic-translations"
                            )}
                          </p>
                        </>
                      )}
                    {translationLanguages && translationLanguages.length > 0 && (
                      <SelectLanguage
                        style={{ display: "block", whiteSpace: "nowrap" }}
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
                    <Title>
                      {t("common-translation-picker-language-preferences")}
                    </Title>
                    <SelectLanguage
                      style={{ display: "block", whiteSpace: "nowrap" }}
                      label={t(
                        "common-translation-picker-label-default-language"
                      )}
                      languagesList={defaultLanguages}
                      onLanguageChange={languageCode =>
                        switchDefaultLanguage(languageCode)
                      }
                      value={defaultLanguageFullCode}
                      data-testid="switch-default-language"
                    />
                  </PickerWrapper>
                </CloseOnEscape>
              </>
            );
          }}
        </LanguageManagerConsumer>
      </div>
    );
  }
}

export default withNamespaces("common")(
  inject("translationsStore")(observer(TranslationPickerClass))
);
