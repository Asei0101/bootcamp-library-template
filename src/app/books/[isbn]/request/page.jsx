import Link from "next/link";

export default async function Request({ params }) {
  const { isbn } = await params;
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
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              ここはISBN:{isbn}の本の予約ページです。
            </h1>
            <p className="py-6">
              個人情報の入力欄を作り、送信後に予約成功を通知したのち、本の個別ページに戻りましょう。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
