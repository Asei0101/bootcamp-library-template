export default async function Request({ params }) {
  const { isbn } = await params;
  return (
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
  );
}
