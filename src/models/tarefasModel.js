const mongoose = require('mongoose');

const Tarefaschema = new mongoose.Schema({
  titulo: { type: String, required: true },
  conteudo: { type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now },
});

const TarefasModel = mongoose.model('Tarefas', Tarefaschema);

function Tarefas(body) {
  this.body = body;
  this.errors = [];
  this.Tarefas = null;
}

Tarefas.prototype.register = async function() {
  this.valida();
  if(this.errors.length > 0) return;
  this.Tarefas = await TarefasModel.create(this.body);
};

Tarefas.prototype.valida = function() {
  this.cleanUp();
  console.log(this.body);
  if(!this.body.titulo) this.errors.push('titulo é um campo obrigatório.');
};

Tarefas.prototype.cleanUp = function() {
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    titulo: this.body.titulo,
    conteudo: this.body.conteudo,
  };
};

Tarefas.prototype.edit = async function(id) {
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length > 0) return;
  this.Tarefas = await TarefasModel.findByIdAndUpdate(id, this.body, { new: true });
};

Tarefas.buscaPorId = async function(id) {
  if(typeof id !== 'string') return;
  const Tarefas = await TarefasModel.findById(id);
  return Tarefas;
};

Tarefas.prototype.getAll = async function() {
  const Tarefas = await TarefasModel.find()
    .sort({ criadoEm: -1 });
  return Tarefas;
};

Tarefas.delete = async function(id) {
  if(typeof id !== 'string') return;
  const Tarefas = await TarefasModel.findOneAndDelete({_id: id});
  return Tarefas;
};


module.exports = Tarefas;