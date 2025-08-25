import { BookRepository } from "@/api/book-repository";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");
  const page = searchParams.get("page") || 1;
  const books = await BookRepository.search(query, page);
  return Response.json(books);
}
