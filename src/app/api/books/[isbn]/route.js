import { BookRepository } from "@/api/book-repository";

export async function GET(_req, ctx) {
  const { isbn } = await ctx.params;
  const book = await BookRepository.findByIsbn(isbn);
  return Response.json(book);
}
