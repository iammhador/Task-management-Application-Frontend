import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h3 className="font-semibold text-4xl text-red-600 mb-4">
          404! PAGE NOT FOUND!!
        </h3>
        <Link href="/">
          <p className="text-blue-500 text-lg">GO TO HOME</p>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
