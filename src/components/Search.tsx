// based on https://github.com/topheman/npm-registry-browser/blob/master/src/components/Search.js

import { Component } from "react";
import Downshift from "downshift";
import axios, { CancelToken, Canceler } from "axios";
import classNames from "classnames";

import { filterHtmlProps, debounce } from "../utils/helpers";
import {
  TmdbSearchResultsList,
  TmdbSearchResultsEntity,
  TmdbSearchResults
} from "../@types";

const DEBOUNCE_MS = 300;

interface SearchProps {
  searchResource: (
    queryValue: string,
    { cancelToken }: { cancelToken?: CancelToken }
  ) => Promise<TmdbSearchResults>;
  goToResource: (searchResult: TmdbSearchResultsEntity) => void;
  className?: string;
}

interface SearchState {
  loading: boolean;
  error: boolean;
  results: TmdbSearchResultsList;
}

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
          getLabelProps,
          getInputProps,
          getMenuProps,
          isOpen,
          getItemProps,
          highlightedIndex,
          clearSelection
        }) => (
          <div
            className={classNames(className)}
            {...filterHtmlProps(remainingProps)}
          >
            <label {...getLabelProps()}>Search</label>
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
            <button onClick={() => clearSelection()}>X</button>
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
          </div>
        )}
      </Downshift>
    );
  }
}

export default Search;
