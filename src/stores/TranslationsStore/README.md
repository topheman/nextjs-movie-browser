# TranslationsStore

Mobx store that stores available translations for resources.

Sometimes, `english_name` only contains a [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (two-letter codes, one per language) and not the full name.

This is why [`languageMapping.json`](./languageMapping.json) exists based on this [stackoverflow answer](https://stackoverflow.com/questions/3217492/list-of-language-codes-in-yaml-or-json/4900304#20623472) to provide the same language label for each code.
