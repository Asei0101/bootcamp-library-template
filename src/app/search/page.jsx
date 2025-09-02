import { headers } from "next/headers";
import Link from "next/link";

export default async function Search({ searchParams }) {
  const query = (searchParams?.query ?? "").trim();
  const page = Number(searchParams?.page ?? 1);

  let books = [];
  let error = null;

  if (query) {
    try {
      const params = new URLSearchParams({ query, page });
      const headersList = await headers();
      const host = headersList.get("host");
      const res = await fetch(`http://${host}/api/books/search?${params}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      books = await res.json();
    } catch (e) {
      console.error(e);
      error = "検索中にエラーが発生しました。";
    }
  }

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

      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-md w-full">
            <form method="GET" className="my-4">
              <label className="input w-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  name="query"
                  type="search"
                  className="grow"
                  placeholder="検索"
                  defaultValue={query}
                  aria-label="検索語"
                />
              </label>
            </form>

            {/* 検索結果表示 */}
            {error ? (
              <p className="py-6 text-red-500">{error}</p>
            ) : query ? (
              books && books.length > 0 ? (
                <div className="py-4 text-left">
                  <h2 className="text-2xl font-bold">
                    検索結果（{books.length}件）
                  </h2>
                  <ul className="list-none list-inside mt-2">
                    {books.map((book) => (
                      <li key={book.isbn} className="py-1">
                        <Link href={`/books/${book.isbn}`} className="link">
                          {book.title}
                        </Link>
                        <span className="text-sm text-muted ml-2">
                          ISBN: {book.isbn}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="py-6">検索に該当する本が見つかりませんでした。</p>
              )
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}