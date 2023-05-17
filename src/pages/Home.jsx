import { Link } from "react-router-dom";

export default function Home({
  postBooks,
  deleteBook,
  books,
  handleChange,
  form,
}) {
  return (
    <div>
      <div className="books-container">
        {books.map((book) => {
          return (
            <div className="books">
              <h3>
                <Link to={`/book/${book._id}`}>{book.title}</Link>
              </h3>
              <p>{book.description}</p>
              <p>{book.status}</p>
              <button className="delbtn" onClick={() => deleteBook(book._id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <form onSubmit={postBooks}>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={form.title}
        />
        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={form.description}
        />
        <input
          name="status"
          placeholder="Status"
          onChange={handleChange}
          value={form.status}
        />
        <input type="submit" value="Add Book" />
      </form>
    </div>
  );
}
