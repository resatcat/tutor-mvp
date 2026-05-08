export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Знаток — умный помощник по математике
        </h1>
        <p className="text-lg text-gray-600">
          Помогаем ученикам 7-го класса разобраться в домашних заданиях. 
          ИИ объясняет, репетитор помогает там, где нужен человек.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-base font-medium hover:bg-blue-700 transition-colors">
          Хочу попробовать
        </button>
        <p className="text-sm text-gray-400">
          Закрытое тестирование · Скоро открываем доступ
        </p>
      </div>
    </main>
  );
}