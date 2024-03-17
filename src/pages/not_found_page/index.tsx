const NotFoundPage = () => {
  return (
    <div className="flex justify-around items-center w-screen h-screen">
      <div className="items-center flex gap-4">
        <p className="font-cabin font-bold text-2xl">404</p>
        <div className="w-1 h-14 bg-[#668AE4]" ></div>
        <p className="font-cabin font-semibold text-xl">Questa pagina non esiste.</p>
      </div>
    </div>
  );
}

export default NotFoundPage;