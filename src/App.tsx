import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { TopButton } from "./components/TopButton";
import Logo from "./assets/KapsAll-logo.png";
import { Button } from "@material-tailwind/react";
import { TOPBUTTONS } from "./utils/constants";

function App() {

  const navigate = useNavigate();
  const [topButton, setTopButton] = useState(TOPBUTTONS.CAMPAIGNS);
  const [page, setPage] = useState(TOPBUTTONS.CAMPAIGNS);
  const location = useLocation();

  const isPage = (pageName: string) => location.pathname.search(pageName.toLowerCase()) !== -1

  useEffect(() => {
    if (isPage(TOPBUTTONS.CAMPAIGNS)) {
      setTopButton(TOPBUTTONS.CAMPAIGNS);
    }
  }, [topButton, page])

  const handleNewCampaign = () => {
    setTopButton(TOPBUTTONS.CAMPAIGNS);
    setPage('New Campaign');
    navigate(`/${TOPBUTTONS.CAMPAIGNS.toLocaleLowerCase()}/new`);
  }

  return (
    <>
      <div className="flex flex-col grow h-screen w-full dark:bg-gray-900">
        <header className="">
          <div className="flex py-2 items-center bg-white dark:bg-gray-900 border-b-[1px] dark:border-gray-700">
            <div className="container px-10  flex items-center justify-between mx-auto ">
              <h1 className="text-3xl text-red mr-10">
                <Link to="/" onClick={() => setTopButton(TOPBUTTONS.CAMPAIGNS)}>
                  <img className="h-11" src={Logo} alt="KapsAll Logo" />
                </Link>
              </h1>
              <nav className="flex  gap-3 text-sm font-semibold text-gray-400">
                <TopButton url={`/${TOPBUTTONS.CAMPAIGNS}`} title={TOPBUTTONS.CAMPAIGNS} active={topButton == TOPBUTTONS.CAMPAIGNS} onClick={() => {setTopButton(TOPBUTTONS.CAMPAIGNS); setPage(TOPBUTTONS.CAMPAIGNS)}} />
                <TopButton url={`/${TOPBUTTONS.CLIENTS}`} title={TOPBUTTONS.CLIENTS} active={topButton == TOPBUTTONS.CLIENTS} onClick={() => {setTopButton(TOPBUTTONS.CLIENTS); setPage(TOPBUTTONS.CLIENTS)}} />
                <TopButton url={`/${TOPBUTTONS.PRODUCTS}`} title={TOPBUTTONS.PRODUCTS} active={topButton == TOPBUTTONS.PRODUCTS} onClick={() => {setTopButton(TOPBUTTONS.PRODUCTS); setPage(TOPBUTTONS.PRODUCTS)}} />
                <TopButton url={`/${TOPBUTTONS.TEMPLATES}`} title={TOPBUTTONS.TEMPLATES} active={topButton == TOPBUTTONS.TEMPLATES} onClick={() => {setTopButton(TOPBUTTONS.TEMPLATES); setPage(TOPBUTTONS.TEMPLATES)}} />
              </nav>
            </div>
          </div>
        </header>

        <div className="flex bg-gray-100 dark:bg-gray-900 py-5 pb-16 -mb-12 items-center">
          <div className="container px-10 mx-auto flex justify-between items-center">
            <h2 className="text-3xl font-semibold dark:text-gray-200">
              {page[0].toUpperCase() + page.substring(1)}
            </h2>
            <Button className="rounded-full shadow-none" ripple color="red" onClick={() => { handleNewCampaign() }} >New Campaign</Button>
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
