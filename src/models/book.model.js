// title, author, price, publishedDate

import { model, Schema } from "mongoose";

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Book Name is Required"],
  },
  author: {
    type: String,
    required: [true, "Author Name is Required"],
  },
  price: {
    type: Number,
    required: [true, "Book Price is Required"]
  },
  publishDate: {
    type: Date,
    required: [true, "Book Publishing Date is required"]
  },
});


export const Book = model("Book", bookSchema);





/*
Example: 

  {
    "title": "Atomic Habits",
    "author": "James Clear",
    "price": 499,
    "publishDate": "2018-10-16"
  }

*/