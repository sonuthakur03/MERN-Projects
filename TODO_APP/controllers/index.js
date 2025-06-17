const Todo = require("../models/Todo");
const moment = require("moment");

const handleGetAllTodos = async (req, res) => {
	try {
		res.locals.moment = moment;
		const todos = await Todo.find({});
		res.render("index", { title: "List Todo", todos });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

const handleGetNewTodo = (req, res) => {
	try {
		res.render("newTodo", { title: "New Todo" });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

const handleCreateNewTodo = async (req, res) => {
	try {
		const body = req.body;
		if (!body || !body.title || !body.desc) {
			return res.status(400).json({ message: "All field should be filled" });
		}
		await Todo.create({
			title: body.title,
			desc: body.desc,
		});
		res.redirect("/");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const handleShowUpdateTodo = async (req, res) => {
	try {
		const { id } = req.query;
		const todo = await Todo.findById(id);
		res.render("updateTodo", { title: "Update Todo", todo });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

const handleShowDeleteTodo = (req, res) => {
	try {
		const id = req.query.id;
		res.render("deleteTodo", { title: "Delete Todo", id });
	} catch (error) {
		res.status(500).json({ msg: error.message });
	}
};

const handleUpdateTodo = async (req, res) => {
	try {
		const id = req.params.id;
		const { title, desc } = req.body;

		const todo = await Todo.findByIdAndUpdate(
			id,
			{ title, desc },
			{ new: true } // returns the updated document
		);

		if (!todo) {
			return res.status(404).json({ message: "No todo found" });
		}

		res.redirect("/");
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const handleDeleteTodo = async (req, res) => {
	try {
		const id = req.params.id;

		const deletedTodo = await Todo.findByIdAndDelete(id);

		if (!deletedTodo) {
			return res.status(404).json({ message: "Todo not found" });
		}

		return res.redirect("/");
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	handleGetAllTodos,
	handleDeleteTodo,
	handleShowUpdateTodo,
	handleCreateNewTodo,
	handleGetNewTodo,
	handleUpdateTodo,
	handleShowDeleteTodo,
};
