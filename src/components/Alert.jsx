function Alert(props) {
  return (
    <div
      className={`flex p-4 mb-4 text-sm text-${props.color}-800 border border-${props.color}-300 rounded-lg bg-${props.color}-50 dark:bg-gray-800 dark:text-${props.color}-400 dark:border-${props.color}-800 md:mx-20`}
      role="alert"
    >
      <svg
        aria-hidden="true"
        className="flex-shrink-0 inline w-5 h-5 mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">{props.title}</span>
      <div>
        <span className="font-medium">{props.message}</span>
      </div>
    </div>
  );
}

export default Alert;
