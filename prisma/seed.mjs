import * as fs from "fs";

import { parse } from "@fast-csv/parse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const COLUMN_TO_HEADER = {
  isbn: "ISBN",
  title: "Book-Title",
  author: "Book-Author",
  year: "Year-Of-Publication",
  publisher: "Publisher",
  imageUrlS: "Image-URL-S",
  imageUrlM: "Image-URL-M",
  imageUrlL: "Image-URL-L",
};

const rowToRecord = (row) => {
  const { year, ...rest } = COLUMN_TO_HEADER;
  return Object.entries(rest).reduce(
    (acc, [c, h]) => Object.assign(acc, { [c]: row[h] }),
    { year: parseInt(row[year]) }
  );
};

async function main() {
  for (let start = 0; start < 10000; start += 1000) {
    const data = await new Promise((resolve) => {
      const data = [];
      fs.createReadStream("books.csv")
        .pipe(
          parse({
            delimiter: ";",
            escape: "\\",
            headers: true,
            skipRows: start,
            maxRows: 1000,
          })
        )
        .on("data", (row) => data.push(rowToRecord(row)))
        .on("end", () => resolve(data));
    });
    await prisma.book.createMany({ data });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
