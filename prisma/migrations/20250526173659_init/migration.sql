-- CreateTable
CREATE TABLE "Jogador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Partida" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "local" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Estatistica" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jogadorId" INTEGER NOT NULL,
    "partidaId" INTEGER NOT NULL,
    "gols" INTEGER NOT NULL,
    "assistencias" INTEGER NOT NULL,
    CONSTRAINT "Estatistica_jogadorId_fkey" FOREIGN KEY ("jogadorId") REFERENCES "Jogador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Estatistica_partidaId_fkey" FOREIGN KEY ("partidaId") REFERENCES "Partida" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Estatistica_jogadorId_partidaId_key" ON "Estatistica"("jogadorId", "partidaId");
