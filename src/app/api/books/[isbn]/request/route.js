import { BookRepository } from "@/api/book-repository";

export async function POST(req) {
  const data = await req.json();
  const book = await BookRepository.findByIsbn(data.isbn);
  if (!book) {
    return new Response(null, { status: 404 });
  }
  return new Response(null, { status: 204 });
}
