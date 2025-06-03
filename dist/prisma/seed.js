"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function randomName() {
    const nomes = [
        'Neymar', 'Cristiano Ronaldo', 'Messi', 'Mbappé', 'Haaland', 'Vinicius Jr', 'Modric', 'Benzema',
        'Salah', 'Kane', 'De Bruyne', 'Alisson', 'Casemiro', 'Rodrygo', 'Raphinha', 'Gabriel Jesus',
        'Marquinhos', 'Thiago Silva', 'Danilo', 'Paquetá', 'Enner Valencia', 'ScottBraiteh'
    ];
    return nomes[Math.floor(Math.random() * nomes.length)];
}
async function main() {
    // Usuários
    await prisma.usuario.createMany({
        data: [
            { email: 'admin@email.com', senha: '123456', nome: 'Admin' },
            { email: 'user@email.com', senha: '123456', nome: 'User' }
        ]
    });
    // Jogadores (22 aleatórios)
    const jogadoresData = Array.from({ length: 22 }, (_, i) => ({
        nome: randomName() + ' ' + (i + 1),
        imagem: `uploads/jogador${i + 1}.jpg`
    }));
    await prisma.jogador.createMany({ data: jogadoresData });
    // Partidas (3 partidas)
    await prisma.partida.createMany({
        data: [
            { data: new Date('2024-05-01T16:00:00Z'), local: 'Estádio A' },
            { data: new Date('2024-05-02T18:00:00Z'), local: 'Estádio B' },
            { data: new Date('2024-05-03T20:00:00Z'), local: 'Estádio C' }
        ]
    });
    // Estatísticas (cada jogador em uma partida aleatória)
    const estatisticasData = [];
    for (let i = 1; i <= 22; i++) {
        estatisticasData.push({
            jogadorId: i,
            partidaId: (i % 3) + 1,
            gols: Math.floor(Math.random() * 4),
            assistencias: Math.floor(Math.random() * 3)
        });
    }
    await prisma.estatistica.createMany({ data: estatisticasData });
}
main()
    .then(() => {
    console.log('Seed concluído!');
    return prisma.$disconnect();
})
    .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
});
