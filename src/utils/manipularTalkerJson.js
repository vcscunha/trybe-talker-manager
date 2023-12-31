const { readFile, writeFile } = require('fs').promises;
const { resolve } = require('path');

const PATH_TALKER_JSON = resolve(__dirname, '../talker.json');

const obterPalestrantes = async () => {
  const dados = await readFile(PATH_TALKER_JSON, 'utf-8');
  const palestrantes = JSON.parse(dados);
  return palestrantes;
};

const cadastrarPalestrante = async (dadosPalestrante) => {
  const palestrantes = await obterPalestrantes();
  const { name, age, talk: { watchedAt, rate } } = dadosPalestrante;

  const proximoId = palestrantes.length + 1;

  const palestrante = { id: proximoId, name, age, talk: { watchedAt, rate } };
  palestrantes.push(palestrante);

  try {
    await writeFile(PATH_TALKER_JSON, JSON.stringify(palestrantes));
    return palestrante;
  } catch (erro) {
    console.error(erro.message);
  }
};

const alterarPalestrante = async (id, dadosPalestrante) => {
  const palestrantes = await obterPalestrantes();
  const { name, age, talk: { watchedAt, rate } } = dadosPalestrante;

  const novoPalestrantes = palestrantes.map((palestrante) => {
    if (palestrante.id === id) {
      const palestranteAtual = { id, name, age, talk: { watchedAt, rate } };
      return palestranteAtual;
    }
    return palestrante;
  });

  try {
    await writeFile(PATH_TALKER_JSON, JSON.stringify(novoPalestrantes));
    return { id, name, age, talk: { watchedAt, rate } };
  } catch (erro) {
    console.error(erro.message);
  }
};

const deletarPalestrante = async (id) => {
  const palestrantes = await obterPalestrantes();

  const novoPalestrantes = palestrantes
    .filter((palestrante) => palestrante.id !== id);

  try {
    await writeFile(PATH_TALKER_JSON, JSON.stringify(novoPalestrantes));
  } catch (erro) {
    console.error(erro.message);
  }
};

module.exports = {
  obterPalestrantes,
  cadastrarPalestrante,
  alterarPalestrante,
  deletarPalestrante,
};
