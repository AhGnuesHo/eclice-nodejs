const books = [
  { id: 1, title: "War and Peace", author: "Leo Tolstoy" },
  { id: 2, title: "The Old Man and the Sea", author: "Ernest Hemingway" },
  { id: 3, title: "The Republic", author: "Plato" },
  { id: 4, title: "Meditations", author: "Marcus Aurelius" },
  { id: 5, title: "Anna Karenina", author: "Leo Tolstoy" },
  { id: 6, title: "A Farewell to Arms", author: "Ernest Hemingway" },
];

exports.getBookList = () => {
  return books.map(({ id, title, author }) => ({
    id,
    title,
    author,
  }));
};

exports.findBook = (id) => {
  const find = books.find((book) => book.id === id);
  if (find.length < 1) {
    throw new Error("Book not found");
  }
  return find;
};
