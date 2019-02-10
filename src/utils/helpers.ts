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
  return string
    .toLowerCase()
    .split("")
    .map(
      (letter: string): string => {
        let index = accents.indexOf(letter);
        return index !== -1 ? out[index] : letter;
      }
    )
    .join("")
    .replace(/[^\x00-\x7F]/g, "")
    .replace(/ /g, "-");
}
