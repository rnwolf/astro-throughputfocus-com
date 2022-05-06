import Config from "$/website.config.cjs";

const capitalize = ([firstLetter, ...restOfWord]) =>
  firstLetter.toUpperCase() + restOfWord.join("");

// When we have the key for an author and we want to display the full name use this function.
const getAuthorName = (key) =>
  Config.authors.filter((author) => {
    return author.key == key;
  })[0].fullname;

export { capitalize, getAuthorName };
