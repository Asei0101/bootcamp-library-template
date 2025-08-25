-- CreateTable
CREATE TABLE "Book" (
    "isbn" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "publisher" TEXT NOT NULL,
    "imageUrlS" TEXT NOT NULL,
    "imageUrlM" TEXT NOT NULL,
    "imageUrlL" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");
