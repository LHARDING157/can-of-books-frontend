import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BookPage() {
  const [book, setBook] = useState({});
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
  });

  const { id } = useParams();

  useEffect(() => {
    getBook();
  }, []);

  async function getBook() {
    const API = `http://localhost:8082/books?_id=${id}`;
    const res = await axios.get(API);
    setBook(res.data[0]);
    setForm({
      title: res.data[0].title,
      description: res.data[0].description,
      status: res.data[0].status,
    });
  }

  async function updateBook(event) {
    event.preventDefault();
    const API = `http://localhost:8082/books/${id}`;

    await axios.put(API, form);
    getBook();
  }

  function handleChange(event) {
    const newForm = { ...form, [event.target.name]: event.target.value };
    setForm(newForm);
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.description}</p>
      <p>{book.status}</p>
      <form onSubmit={updateBook}>
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
        <input type="submit" />
      </form>
    </div>
  );
}
