import { TopButton } from "../components/TopButton";
import Logo from "../assets/KapsAll-logo.png";


function Settings() {


    return (
        <>
            <div className="flex flex-col grow h-screen w-full dark:bg-gray-900">
                <header className="">
                    <div className="flex py-5 items-center bg-white dark:bg-gray-900">
                        <div className="container px-10 pb-5  flex items-center justify-between mx-auto border-b-[1px] dark:border-gray-700">
                            <h1 className="text-3xl text-red mr-10">
                                <img className="h-11" src={Logo} alt="KapsAll Logo" />
                            </h1>
                            <nav className="flex  gap-3 text-sm font-semibold text-gray-400">
                                <TopButton url="/" title="Compose" />
                                <TopButton url="/" title="Replies" />
                                <TopButton url="/settings" title="Settings" active />
                            </nav>
                        </div>
                    </div>
                    <div className="flex mb-10 py-5 items-center">
                        <div className="container px-10 mx-auto flex">
                            <h2 className="text-3xl font-semibold dark:text-white">
                                Settings
                            </h2>
                        </div>
                    </div>
                </header>

                <div className="flex flex-col grow bg-slate-100 dark:bg-gray-800">
                    <main className="flex container px-10 mx-auto ">
                        <p>settings hoho</p>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Settings;
