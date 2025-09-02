import { headers } from "next/headers";
import Link from "next/link";

export default async function BookInfo({ params }) {
  const { isbn } = await params;
  const headersList = await headers();
  const host = headersList.get("host");
  const res = await fetch(`http://${host}/api/books/${isbn}`);
  const book = await res.json();
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="py- text-left">
            <ul className="list-none list-inside text-4xl">
              <li className="text-6xl">{book.title}</li>
              <li>著者: {book.author}</li>
              <li>出版社: {book.publisher}</li>
              <li>出版年: {book.publishedDate}</li>
              <li>ISBN: {book.isbn}</li>
              <li>ページ数: {book.pageCount}</li>
              <li>言語: {book.language}</li>
              <li>説明: {book.description}</li>
            </ul>
          </div>
          <div className="py-4 text-left">
            <button className="btn btn-soft btn-primary">
              <Link href={`/books/${isbn}/request`} className="link">
                予約する
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
