export const sum = (a: number, b: number): number => a + b;

/**
 * Based on:
 * - https://stackoverflow.com/questions/20856197/remove-non-ascii-character-in-string
 * - https://gist.github.com/alisterlf/3490957
 *
 * TODO: if necessary, use a package that supports arabic, cyrillic, etc ...
 */
export function normalizeString(string: string) {
  const accents =
    "ÀÁÂÃÄÅĄĀāàáâãäåąßÒÓÔÕÕÖØŐòóôőõöøĎďDŽdžÈÉÊËĘèéêëęðÇçČčĆćÐÌÍÎÏĪìíîïīÙÚÛÜŰùűúûüĽĹŁľĺłÑŇŃňñńŔŕŠŚŞšśşŤťŸÝÿýŽŻŹžżźđĢĞģğ";
  const out =
    "AAAAAAAAaaaaaaaasOOOOOOOOoooooooDdDZdzEEEEEeeeeeeCcCcCcDIIIIIiiiiiUUUUUuuuuuLLLlllNNNnnnRrSSSsssTtYYyyZZZzzzdGGgg";
  return (string || "")
    .toLowerCase()
    .split("")
    .map(
      (letter: string): string => {
        let index = accents.indexOf(letter);
        return index !== -1 ? out[index] : letter;
      }
    ) // remove accents
    .join("")
    .replace(/[^\x00-\x7F]/g, "") // remove non ascii chars
    .replace(/[^\w\s]/gi, "")
    .replace(/ /g, "-");
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// based on https://github.com/topheman/npm-registry-browser/blob/master/src/utils/helpers.js
export function debounce(func: any, wait: number, immediate?: boolean) {
  let timeout: number | null;
  return function debounced(...args: any[]) {
    // @ts-ignore
    const context = this as any;
    const later = function later() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout as number);
    timeout = setTimeout(later, wait) as any;
    if (callNow) {
      func.apply(context, args);
    }
  };
}
