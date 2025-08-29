import { headers } from "next/headers";
import Link from "next/link";

export default async function Search() {
  const params = new URLSearchParams({
    query: "Clara", // 検索したい文字列
    page: 1,
  });
  const headersList = await headers();
  const host = headersList.get("host");
  const res = await fetch(`http://${host}/api/books/search?${params}`);
  const books = await res.json();
  const sampleBook = books[0];
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">ここは検索ページです。</h1>
          <p className="py-6">
            検索バーと検索結果の表示をしてみましょう。
            本をクリックした際は本の個別ページにも飛べるようにしてみましょう。
            例えばISBN:{sampleBook.isbn}の本のページは
            <Link href={`/books/${sampleBook.isbn}`} className="link">
              こちら
            </Link>
            です。
          </p>
        </div>
      </div>
    </div>
  );
}
