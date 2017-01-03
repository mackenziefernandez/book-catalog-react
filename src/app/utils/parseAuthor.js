export const parseAuthor = (authorName) => {
  const names = authorName.split(" ");
  switch (names.length) {
    case 3:
      return [`${names[0]} ${names[1]}`, names[2]];
    default:
      return names;
  }
}