const Loader = () => (
    <div className="w-full  flex items-center justify-center mx-auto">
        <div className="loader flex">
            {/* You can use a spinner icon or any loading animation here */}
            <svg
                className="animate-spin h-5 w-5 text-dark"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"
                />
            </svg>
        </div>
    </div>
);

export default Loader;