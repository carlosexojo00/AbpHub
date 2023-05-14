function StudentInfo(props) {
  return (
    <div className="flex justify-between w-full p-4 border border-gray-300 rounded shadow-md font-semibold mb-4">
      <p>
        {props.studentInformation.name} {props.studentInformation.lastName}
      </p>
      <p
        className="text-red-500 cursor-pointer"
        onClick={() => props.deleteStud(props.studentInformation.id)}
      >
        Eliminar
      </p>
    </div>
  );
}

export default StudentInfo;
