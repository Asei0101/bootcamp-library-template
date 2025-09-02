import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host");
  const page = 1;
  const res = await fetch(`http://${host}/api/books?page=${page}`);
  const books = await res.json();
  const sampleBook = books[0];
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">ここはホームです。</h1>
          <p className="py-6">
            <Link href="/search" className="link">
              検索ページ
            </Link>
            へのリンクや本の一覧の表示などをしてみましょう。
            本をクリックした際は本の個別ページにも飛べるようにしてみましょう。
            例えばISBN:{sampleBook.isbn}の本のページは
            <Link href={`/books/${sampleBook.isbn}`} className="link">
              こちら
            </Link>
            です。
          </p>
          <div className="py-4 text-left">
            <h2 className="text-2xl font-bold">本の一覧</h2>
            <ul className="list-disc list-inside">
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
    </div>
  );
}
