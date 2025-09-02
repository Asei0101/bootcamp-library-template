import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host");
  const page = 1;
  const res = await fetch(`http://${host}/api/books?page=${page}`);
  const books = await res.json();
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-base-200 border-b">
        <div className="mx-auto px-4 py-3 flex items-center justify-between">
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

          <Link href="/search" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9.5 4a6.5 6.5 0 0 1 6.5 6.5c0 1.62-.59 3.1-1.57 4.23l5.65 5.65l-.71.71l-5.65-5.65A6.47 6.47 0 0 1 9.5 17A6.5 6.5 0 0 1 3 10.5A6.5 6.5 0 0 1 9.5 4m0 1A5.5 5.5 0 0 0 4 10.5A5.5 5.5 0 0 0 9.5 16a5.5 5.5 0 0 0 5.5-5.5A5.5 5.5 0 0 0 9.5 5"
              />
            </svg>
            検索
          </Link>
        </div>
      </header>

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="py-4 text-left">
            <h2 className="text-4xl font-bold">本の一覧</h2>
            <ul className="text-2xl list-disc list-inside">
              {books.map((book) => (
                <li key={book.isbn}>
                  <Link href={`/books/${book.isbn}`} className="link">
                    {book.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
