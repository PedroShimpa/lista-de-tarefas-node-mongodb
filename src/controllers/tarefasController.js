const Tarefas = require('../models/tarefasModel');

exports.index = async (req, res) => {
	try {

		const model = new Tarefas(req.body);
		var tarefas = await model.getAll();
		res.json(tarefas);
	} catch (e) {
		return res.status('500').json({
			errors: ["erro ao buscar tarefas."]
		});
	}
};

exports.register = async (req, res) => {
	try {
		const tarefas = new Tarefas(req.body);
		await tarefas.register();

		if (tarefas.errors.length > 0) {
			return res.status('500').json({
				errors: tarefas.errors
			});
		}

		return res.status('200').json({
			success: ["Tarefa Registrada."]
		});
	} catch (e) {
		return res.status('500').json({
			errors: ["Erro inesperado ao incluir tarefa."]
		});
	}
};

exports.editIndex = async function (req, res) {
	if (!req.params.id) return res.render('404');

	const tarefas = await Tarefas.buscaPorId(req.params.id);
	if (!tarefas) return res.render('404');
	return res.status('200').json({
		tarefas: tarefas
	});
};

exports.edit = async function (req, res) {
	try {
		if (!req.params.id) return res.status('404')
		const tarefas = new Tarefas(req.body);
		await tarefas.edit(req.params.id);

		if (tarefas.errors.length > 0) {
			return res.status('400').json({
				errors: tarefas.errors
			});
		}

		return res.status('200').json({
			success: "Tarefa Ediyada"
		});
	} catch (e) {
		return res.status('400');
	}
};

exports.delete = async function (req, res) {
	if (!req.params.id) return res.status('400');


	const tarefas = await Tarefas.delete(req.params.id);
	if (!tarefas) return res.status('400');

	return res.status('200').json({
		success: "Tarefa apagada"
	});
};