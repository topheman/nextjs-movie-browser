// based on https://github.com/topheman/npm-registry-browser/blob/master/src/components/Search.js

import React, { Component } from "react";
import Downshift from "downshift";
import axios, { CancelToken, Canceler } from "axios";
import classNames from "classnames";
import styled from "styled-components";

import { filterHtmlProps, debounce } from "../utils/helpers";
import {
  TmdbSearchResultsList,
  TmdbSearchResultsEntity,
  TmdbSearchResults
} from "../@types";

const DEBOUNCE_MS = 300;

interface SearchProps extends React.HTMLAttributes<HTMLElement> {
  searchResource: (
    queryValue: string,
    { cancelToken }: { cancelToken?: CancelToken }
  ) => Promise<TmdbSearchResults>;
  goToResource: (searchResult: TmdbSearchResultsEntity) => void;
}

interface SearchState {
  loading: boolean;
  error: boolean;
  results: TmdbSearchResultsList;
}

const Wrapper = styled.div`
  height: ${props => props.theme.searchHeight};
  max-width: ${props => props.theme.maxWidth};
  background-image: url(/static/magnifier-icon.svg);
  background-repeat: no-repeat;
  background-position: 5px 5px;
`;

const InputWrapper = styled.div`
  position: relative;
  input {
    border: 0px;
    height: ${props => props.theme.searchHeight};
    font-size: 100%;
    width: calc(100% - ${props => props.theme.searchHeight});
    padding: 0px;
    padding-left: ${props => props.theme.searchHeight};
    background: none;
  }
  span.close {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 20px;
    height: 20px;
    display: block;
    background-image: url(/static/close-icon.svg);
    opacity: 0.5;
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
  }
`;

class Search extends Component<SearchProps, SearchState> {
  state = {
    loading: false,
    error: false,
    results: [] as TmdbSearchResultsList
  };
  cancelToken: Canceler | undefined = undefined;
  debouncedSearch = debounce((value: string) => {
    this.props
      .searchResource(value, {
        cancelToken: new axios.CancelToken(token => {
          this.cancelToken = token;
        })
      })
      .then(({ results }) => {
        this.cancelToken = undefined;
        this.setState({ results, loading: false, error: false });
      })
      .catch(e => {
        // Early return if request was cancelled
        if (axios.isCancel(e)) {
          return;
        }
        this.setState({
          results: [],
          loading: false,
          error: true
        });
      });
  }, DEBOUNCE_MS);
  search = (value: string) => {
    if (this.cancelToken) {
      this.cancelToken();
    }
    this.setState({ error: false, loading: true });
    this.debouncedSearch(value);
  };
  render() {
    const {
      goToResource,
      searchResource: _,
      className,
      ...remainingProps
    } = this.props;
    const { loading, error, results } = this.state;
    return (
      <Downshift itemToString={() => ""} id="resources-search">
        {({
          getRootProps,
          getInputProps,
          getMenuProps,
          isOpen,
          getItemProps,
          highlightedIndex,
          clearSelection,
          inputValue
        }) => (
          <Wrapper
            {...getRootProps()}
            className={classNames(className)}
            {...filterHtmlProps(remainingProps)}
          >
            <InputWrapper>
              <input
                {...getInputProps({
                  onKeyDown: (event: any) => {
                    if (event.key === "Enter" && highlightedIndex !== null) {
                      goToResource(results[highlightedIndex]);
                    }
                  },
                  onChange: (event: any) => {
                    const value = event.target.value;
                    // the API only answer to queries with 2 chars or more
                    if (value.length > 1) {
                      this.search(value);
                    } else {
                      this.setState({ results: [] });
                    }
                  }
                })}
              />
              {inputValue && (
                <span
                  className="close"
                  onClick={() => clearSelection()}
                  role="button"
                  title="clear"
                />
              )}
            </InputWrapper>
            {isOpen && !error && !loading && results.length > 0 && (
              <ul {...getMenuProps()}>
                {results.map((item, index) => (
                  <li
                    key={item.id}
                    data-testid={`search-result-${item.media_type}-${item.id}`}
                    {...getItemProps({
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? "#ececec" : "white"
                      }
                    })}
                  >
                    {item.name ||
                      item.original_name ||
                      item.title ||
                      item.original_title}
                  </li>
                ))}
              </ul>
            )}
          </Wrapper>
        )}
      </Downshift>
    );
  }
}

export default Search;
