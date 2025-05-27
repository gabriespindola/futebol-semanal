import * as partidaService from '../services/partida.service';
export async function listar(req, res) {
    const partidas = await partidaService.listar();
    res.json(partidas);
}
export async function buscarPorId(req, res) {
    const id = Number(req.params.id);
    const partida = await partidaService.buscarPorId(id);
    if (!partida)
        return res.status(404).json({ mensagem: 'Partida não encontrada' });
    res.json(partida);
}
export async function criar(req, res) {
    const partida = await partidaService.criar(req.body);
    res.status(201).json(partida);
}
export async function atualizar(req, res) {
    const id = Number(req.params.id);
    const atualizado = await partidaService.atualizar(id, req.body);
    res.json(atualizado);
}
export async function deletar(req, res) {
    const id = Number(req.params.id);
    await partidaService.deletar(id);
    res.status(204).send();
}
