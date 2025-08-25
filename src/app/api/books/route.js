import { BookRepository } from "@/api/book-repository";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page") || 1;
  const books = await BookRepository.list(page);
  return Response.json(books);
}
