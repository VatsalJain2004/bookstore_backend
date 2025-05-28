import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import { Book } from "../models/book.model.js"
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const getAllBooks = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const books = await Book.find();
  if (!books) {
    // console.log("books doesn't exists, in getBooks");
    throw new ApiError(404, 'Books not found.');
  }

  return res.status(200).json(new ApiResponse(200, books, "Books Lists"));
});


const getBooksById = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  console.log(bookId);
  if (!bookId) {
    throw new ApiError(404, bookId, `Book by bookId: ${bookId} not found.`)
  }

  const bookByBookId = await Book.findById(bookId);
  if (!bookByBookId) {
    throw new ApiError(404, `Book of BookId : ${bookId} not found.`);
  }

  return res.status(200).json(new ApiResponse(200, bookByBookId, "Books Lists."));
});

const uploadBooksByBookDetails = asyncHandler(async (req, res) => {
  const { title, author, price, publishDate } = req.body;

  if (!title && !author && !price && !publishDate) {
    throw new ApiError(400, "All Fields are required!");
  }

  const book = await Book.create({
    title: title,
    author: author,
    price: price,
    publishDate: publishDate,
  })

  if (!book) {
    throw new ApiError(500, "Internal Database Server Problem");
  }

  return res.status(200).json(new ApiResponse(200, book, `Book uploaded successfully`));
})

const updateBooksByBookId = asyncHandler(async (req, res) => {

  const { bookId } = req.params;
  const { title, publishDate, author, price } = req.body;

  if (!title && !price && !author && !publishDate) {
    throw new ApiError(400, "To Update please provide one of the fields among the title, Author, price and publishDate");
  }

  const book = await Book.findById(bookId);

  if (!book) {
    throw new ApiError(404, "Book not found.");
  }

  const updatedBookDetails = await Book.findByIdAndUpdate(
    bookId,
    {
      title: title,
      author: author,
      price: price,
      publishDate: publishDate,
    },
    {
      new: true,
      runValidators: true,
    }
  )

  if (!updatedBookDetails) {
    throw new ApiError(500, "Failed to Update The Book Details")
  }

  return res.status(200).json(new ApiResponse(
    200, `UpdatedBook Details : ${updatedBookDetails}`
  ))
})



const deleteBooksByBookId = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  const book = await Book.findById(bookId);

  if (!book) {
    throw new ApiError(404, "Book doesn't exists");
  }

  await Book.findByIdAndDelete(bookId);

  return res.status(204).json(new ApiResponse(204, book, `Book Deleted Successfully.`))
})


export { getBooksById, getAllBooks, uploadBooksByBookDetails, updateBooksByBookId, deleteBooksByBookId }