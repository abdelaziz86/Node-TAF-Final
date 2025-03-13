const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

const BOOKS_PER_PAGE = 8;

router.get("/", async (req, res) => {
    const search = req.query.search || "";  
    const page = parseInt(req.query.page) || 1;

    try {
        const query = search
            ? { $or: [
                { title: { $regex: search, $options: "i" } },
                { author: { $regex: search, $options: "i" } }
            ]}
            : {};

        const totalBooks = await Book.countDocuments(query);
        const totalPages = Math.ceil(totalBooks / BOOKS_PER_PAGE);

        const books = await Book.find(query)
            .skip((page - 1) * BOOKS_PER_PAGE)
            .limit(BOOKS_PER_PAGE)
            .lean();

        res.render("index", {
            books,
            currentPage: page,
            totalPages,
            search
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
});

router.get("/add", (req, res) => {
  res.render("addBook");
});

router.post("/add", async (req, res) => {
  const { title, author, year, summary } = req.body;
  await Book.create({ title, author, year, summary });
  res.redirect("/");
});

const mongoose = require("mongoose");

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("ID invalide !");
  }
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).send("Livre non trouvé");
  res.render("bookDetails", { book });
});

router.get("/edit/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render("editBook", { book });
});

router.post("/edit/:id", async (req, res) => {
  const { title, author, year, summary } = req.body;
  await Book.findByIdAndUpdate(req.params.id, { title, author, year, summary });
  res.redirect("/");
});

router.post("/delete/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
