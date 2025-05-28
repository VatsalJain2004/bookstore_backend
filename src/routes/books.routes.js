import { Router } from "express";
import { deleteBooksByBookId, getAllBooks, getBooksById, updateBooksByBookId, uploadBooksByBookDetails } from "../controllers/books.controller.js";

const router = Router();
router.route("/").get(getAllBooks).post(uploadBooksByBookDetails);
router.route("/:bookId").get(getBooksById).put(updateBooksByBookId).delete(deleteBooksByBookId);

export default router;