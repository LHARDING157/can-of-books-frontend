import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import About from "./pages/About";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BookPage from "./pages/BookPage";

export default function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    const API = "http://localhost:8082/books";
    const res = await axios.get(API);
    setBooks(res.data);
  }

  // Create
  async function postBooks(event) {
    event.preventDefault();
    const API = "http://localhost:8082/books";
    await axios.post(API, form);
    getBooks();
    setForm({
      title: "",
      description: "",
      status: "",
    });
  }

  async function deleteBook(id) {
    const API = `http://localhost:8082/books/${id}`;
    await axios.delete(API);
    getBooks();
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  return (
    <BrowserRouter>
      <div className="app">
        <h1>BOOKS!</h1>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                books={books}
                form={form}
                handleChange={handleChange}
                postBooks={postBooks}
                deleteBook={deleteBook}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/book/:id" element={<BookPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
