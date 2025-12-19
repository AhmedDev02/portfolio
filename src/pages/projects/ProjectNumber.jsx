function ProjectNumber({ number }) {
  return (
    <div className="w-1/5 h-full text-9xl flex justify-center items-center">
      <h2 className="text-center">
        {+number < 10 ? 0 : 1}
        {+number > 9 ? +number - 10 : +number}
      </h2>
    </div>
  );
}

export default ProjectNumber;
