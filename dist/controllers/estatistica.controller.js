import * as estatisticaService from '../services/estatistica.service';
export async function listar(req, res) {
    const estatisticas = await estatisticaService.listar();
    res.json(estatisticas);
}
export async function buscarPorId(req, res) {
    const id = Number(req.params.id);
    const estatistica = await estatisticaService.buscarPorId(id);
    if (!estatistica)
        return res.status(404).json({ mensagem: 'Estatística não encontrada' });
    res.json(estatistica);
}
export async function criar(req, res) {
    const estatistica = await estatisticaService.criar(req.body);
    res.status(201).json(estatistica);
}
export async function atualizar(req, res) {
    const id = Number(req.params.id);
    const atualizado = await estatisticaService.atualizar(id, req.body);
    res.json(atualizado);
}
export async function deletar(req, res) {
    const id = Number(req.params.id);
    await estatisticaService.deletar(id);
    res.status(204).send();
}
