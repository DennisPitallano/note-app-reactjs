/*
  Warnings:

  - You are about to drop the column `createAt` on the `NoteOnTag` table. All the data in the column will be lost.
  - You are about to drop the column `import` on the `NoteAttributes` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NoteOnTag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "noteId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "createdAt" TEXT
);
INSERT INTO "new_NoteOnTag" ("id", "noteId", "tagId") SELECT "id", "noteId", "tagId" FROM "NoteOnTag";
DROP TABLE "NoteOnTag";
ALTER TABLE "new_NoteOnTag" RENAME TO "NoteOnTag";
CREATE UNIQUE INDEX "NoteOnTag_noteId_tagId_key" ON "NoteOnTag"("noteId", "tagId");
CREATE TABLE "new_NoteAttributes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "noteId" TEXT NOT NULL,
    "important" INTEGER,
    "pinned" INTEGER,
    "updateDate" TEXT
);
INSERT INTO "new_NoteAttributes" ("id", "noteId", "pinned", "updateDate") SELECT "id", "noteId", "pinned", "updateDate" FROM "NoteAttributes";
DROP TABLE "NoteAttributes";
ALTER TABLE "new_NoteAttributes" RENAME TO "NoteAttributes";
CREATE UNIQUE INDEX "NoteAttributes_id_noteId_key" ON "NoteAttributes"("id", "noteId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
