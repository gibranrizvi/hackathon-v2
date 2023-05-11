const Spinner = ({ black, lg }) => {
  return (
    <div
      className={`py-1.5 flex items-center justify-center ${
        lg ? "space-x-2" : "space-x-1"
      } animate-spin`}
    >
      <div
        className={`w-2 h-2 ${black ? "bg-black" : "bg-white"} ${
          lg && "w-3 h-3"
        } rounded-full`}
      ></div>
      <div
        className={`w-2 h-2 ${black ? "bg-black" : "bg-white"} ${
          lg && "w-3 h-3"
        } rounded-full`}
      ></div>
    </div>
  );
};

export default Spinner;
