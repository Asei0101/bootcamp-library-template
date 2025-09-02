import { headers } from "next/headers";
import Link from "next/link";

export default async function BookInfo({ params }) {
  const { isbn } = await params;
  const headersList = await headers();
  const host = headersList.get("host");
  const res = await fetch(`http://${host}/api/books/${isbn}`);
  const book = await res.json();
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-base-200 border-b">
        <div className="mx-auto px-4 py-3">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m16 8.41l-4.5-4.5L4.41 11H6v8h3v-6h5v6h3v-8h1.59L17 9.41V6h-1zM2 12l9.5-9.5L15 6V5h3v4l3 3h-3v8h-5v-6h-3v6H5v-8z"
              />
            </svg>
            <span className="font-bold text-lg">図書検索</span>
          </Link>
        </div>
      </header>

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
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
            <button className="btn btn-soft btn-primary btn-lg px-6 py-3 text-lg whitespace-nowrap">
              <Link
                href={`/books/${isbn}/request`}
                className="flex items-center gap-3 no-underline whitespace-nowrap"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                >
                  <path
                    fill="currentColor"
                    d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1m-9-1a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1M18 6H4.27l2.55 6H15c.33 0 .62-.16.8-.4l3-4c.13-.17.2-.38.2-.6a1 1 0 0 0-1-1m-3 7H6.87l-.77 1.56L6 15a1 1 0 0 0 1 1h11v1H7a2 2 0 0 1-2-2a2 2 0 0 1 .25-.97l.72-1.47L2.34 4H1V3h2l.85 2H18a2 2 0 0 1 2 2c0 .5-.17.92-.45 1.26l-2.91 3.89c-.36.51-.96.85-1.64.85"
                  />
                </svg>
                予約する
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
