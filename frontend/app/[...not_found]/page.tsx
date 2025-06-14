import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-[40rem] bg-gray-100 text-gray-700">
      <Frown className="w-20 h-20 text-red-600 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-500 text-lg">
        Sorry, the page you&#x2c;re looking for doesn&#x2c;t exist.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200"
      >
        Go Back Home
      </a>
    </div>
  );
}
