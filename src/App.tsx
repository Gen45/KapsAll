import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { TopButton } from "./components/TopButton";
import Logo from "./assets/KapsAll-logo.png";
import { TOPBUTTONS } from "./utils/constants";
import { GeneralContext } from "./contexts/GeneralContext";

export function App() {

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

    <GeneralContext.Provider value="">
      <div className="flex flex-col grow h-screen w-full dark:bg-gray-900">
        <header className="">
          <div className="flex py-2 items-center bg-white dark:bg-gray-900 border-b-[1px] dark:border-gray-700">
            <div className="container px-10  flex items-center justify-between mx-auto ">
              <h1 className="text-3xl text-red mr-10">
                <Link to="/" onClick={() => setTopButton(TOPBUTTONS.CAMPAIGNS)}>
                  <img className="h-11 object-contain" src={Logo} alt="KapsAll Logo" />
                </Link>
              </h1>
              <nav className="flex  gap-3 text-sm font-semibold text-gray-400">
                <TopButton url={`/${TOPBUTTONS.CAMPAIGNS}`} title={TOPBUTTONS.CAMPAIGNS} active={topButton == TOPBUTTONS.CAMPAIGNS} onClick={() => { setTopButton(TOPBUTTONS.CAMPAIGNS); setPage(TOPBUTTONS.CAMPAIGNS) }} />
                {/* <TopButton url={`/${TOPBUTTONS.CLIENTS}`} title={TOPBUTTONS.CLIENTS} active={topButton == TOPBUTTONS.CLIENTS} onClick={() => { setTopButton(TOPBUTTONS.CLIENTS); setPage(TOPBUTTONS.CLIENTS) }} />
                <TopButton url={`/${TOPBUTTONS.PRODUCTS}`} title={TOPBUTTONS.PRODUCTS} active={topButton == TOPBUTTONS.PRODUCTS} onClick={() => { setTopButton(TOPBUTTONS.PRODUCTS); setPage(TOPBUTTONS.PRODUCTS) }} />
                <TopButton url={`/${TOPBUTTONS.TEMPLATES}`} title={TOPBUTTONS.TEMPLATES} active={topButton == TOPBUTTONS.TEMPLATES} onClick={() => { setTopButton(TOPBUTTONS.TEMPLATES); setPage(TOPBUTTONS.TEMPLATES) }} /> */}
              </nav>
            </div>
          </div>
        </header>
        <Outlet context={page} />
      </div>
    </GeneralContext.Provider>
  );
}

export function usePage(): string {
  return useOutletContext<string>();
}

export default App;
