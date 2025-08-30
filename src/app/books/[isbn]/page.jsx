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
          <h1 className="text-5xl font-bold">
            ここはISBN:{isbn}の本のページです。
          </h1>
          <p className="py-6">
            本情報の表示をしてみましょう。例えば、本の名前は{book.title}です。
            また、
            <Link href={`/books/${isbn}/request`} className="link">
              予約ページ
            </Link>
            へのリンクを張りましょう。
          </p>
        </div>
      </div>
    </div>
  );
}
