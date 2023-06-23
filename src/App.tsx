import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { TopButton } from "./components/TopButton";
// import { Button } from "./components/Button";

import Logo from "./assets/KapsAll-logo.png";
import { Button } from "@material-tailwind/react";

function App() {
  const navigate = useNavigate();
  const [page, setPage] = useState('campaigns');
  const location = useLocation();
  const isPage = (pageName: string) => location.pathname.search(pageName.toLowerCase()) !== -1


  useEffect(() => {
    if (isPage('settings')) {
      setPage('settings');
    }
    if (isPage('campaigns')) {
      setPage('campaigns');
    }
    if (isPage('new')) {
      setPage('campaigns');
    }
  }, [page])

  return (
    <>
      <div className="flex flex-col grow h-screen w-full dark:bg-gray-900">
        <header className="">
          <div className="flex py-2 items-center bg-white dark:bg-gray-900 border-b-[1px] dark:border-gray-700">
            <div className="container px-10  flex items-center justify-between mx-auto ">
              <h1 className="text-3xl text-red mr-10">
                <Link to="/" onClick={() => setPage('campaigns')}>
                  <img className="h-11" src={Logo} alt="KapsAll Logo" />
                </Link>
              </h1>
              <nav className="flex  gap-3 text-sm font-semibold text-gray-400">
                <TopButton url="/campaigns" title="Campaigns" active={page == 'campaigns'} onClick={() => setPage('campaigns')} />
                <TopButton url="/settings" title="Settings" active={page == 'settings'} onClick={() => setPage('settings')} />
              </nav>
            </div>
          </div>
        </header>

        <div className="flex bg-gray-100 dark:bg-gray-900 py-5 pb-16 -mb-12 items-center">
          <div className="container px-10 mx-auto flex justify-between items-center">
            <h2 className="text-3xl font-semibold dark:text-gray-200">
              {page[0].toUpperCase() + page.substring(1)}
            </h2>
            {
              isPage('campaigns') &&
              <Button className="rounded-full shadow-none" ripple color="red" onClick={() => { setPage('Compose'); navigate('/new'); }} >New Campaign</Button>
            }
            {
              isPage('client') &&
              <Button disabled className="rounded-full shadow-none" ripple color="red" onClick={() => { setPage('Compose'); navigate('/newClient'); }} >New Client</Button>
            }
            {
              isPage('product') &&
              <Button disabled className="rounded-full shadow-none" ripple color="red" onClick={() => { setPage('Compose'); navigate('/newProduct'); }} >New Product</Button>
            }
            {
              isPage('template') &&
              <Button disabled className="rounded-full shadow-none" ripple color="red" onClick={() => { setPage('Compose'); navigate('/newProduct'); }} >New Template</Button>
            }            
          </div>
        </div>
        <div className="flex flex-col grow bg-gradient-to-b from-gray-200 to-gray-200 dark:from-gray-800 dark:to-slate-900 mt-12 ">
          <main className="flex flex-col container px-10 pb-20 mx-auto -mt-10">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
