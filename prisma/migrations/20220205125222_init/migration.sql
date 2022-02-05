/*
  Warnings:

  - You are about to drop the column `createdAt` on the `NoteOnTag` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NoteOnTag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "noteId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "createDate" TEXT
);
INSERT INTO "new_NoteOnTag" ("id", "noteId", "tagId") SELECT "id", "noteId", "tagId" FROM "NoteOnTag";
DROP TABLE "NoteOnTag";
ALTER TABLE "new_NoteOnTag" RENAME TO "NoteOnTag";
CREATE UNIQUE INDEX "NoteOnTag_noteId_tagId_key" ON "NoteOnTag"("noteId", "tagId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
