const express = require("express");

const {
	handleGetNewTodo,
	handleCreateNewTodo,
	handleUpdateTodo,
	handleDeleteTodo,
	handleShowUpdateTodo,
	handleGetAllTodos,
	handleShowDeleteTodo,
} = require("../controllers");

const router = express.Router();

router.get("/", handleGetAllTodos);

router.route("/new-todo").get(handleGetNewTodo).post(handleCreateNewTodo);

router.get("/update-todo", handleShowUpdateTodo);

router.post("/update-todo/:id", handleUpdateTodo);

router.get("/delete-todo", handleShowDeleteTodo);

router.get("/confirm-delete/:id", handleDeleteTodo);

module.exports = router;
