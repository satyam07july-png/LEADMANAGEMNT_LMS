const PageContainer = ({ children }) => {
  return (
    <main className="flex-1 overflow-y-auto bg-slate-100">

     <div className="mx-auto w-full px-10 py-8 lg:px-10">

        {children}

      </div>

    </main>
  );
};

export default PageContainer;