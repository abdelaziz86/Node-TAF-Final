require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/Book");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const books = [
  {
    title: "1984",
    author: "George Orwell",
    year: 1949,
    summary:
      "Dystopian social science fiction novel and cautionary tale about the future.",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    summary: "A novel about racial injustice in the Deep South.",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    summary: "A critique of the American Dream in the 1920s.",
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    year: 1851,
    summary: "The story of Captain Ahab's obsession with a giant whale.",
  },
  {
    title: "War and Peace",
    author: "Leo Tolstoy",
    year: 1869,
    summary:
      "A novel that intertwines historical events with personal narratives.",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    summary:
      "A romantic novel about the manners and matrimony of British society.",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
    summary: "A novel about teenage alienation and rebellion.",
  },
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    year: 1866,
    summary: "A psychological drama about crime and redemption.",
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    year: 1932,
    summary:
      "A futuristic novel about a society controlled by pleasure and technology.",
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    year: 1954,
    summary:
      "An epic fantasy adventure about the battle between good and evil.",
  },
];

const seedDB = async () => {
  try {
    await Book.deleteMany({});  
    await Book.insertMany(books);
    console.log("✅ 10 books added successfully!");
  } catch (err) {
    console.error("❌ Error inserting books:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
