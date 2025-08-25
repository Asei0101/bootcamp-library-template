import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class BookRepository {
  static async findByIsbn(isbn) {
    const book = prisma.book.findUnique({
      where: { isbn },
    });
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  }

  static async list(page = 1) {
    return await prisma.book.findMany({ skip: (page - 1) * 20, take: 20 });
  }

  static async search(query, page = 1) {
    if (!(query && page >= 1)) {
      throw new Error("Invalid arguments");
    }
    const conditions = query
      .trim()
      .split(/\s+/u)
      .map((q) => ({
        title: {
          contains: q,
        },
      }));
    return await prisma.book.findMany({
      where: {
        AND: conditions,
      },
      skip: (page - 1) * 20,
      take: 20,
    });
  }
}
