import { Spinner } from "./ui/spinner";

const LazyLoader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
            <Spinner />
            <p className="mt-4 text-sm font-medium text-gray-600">
                Loading...
            </p>
        </div>
    );
};

export default LazyLoader;
