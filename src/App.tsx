import { useState } from 'react';
import { TopButton } from './components/TopButton';
import { TabButton } from './components/TabButton';
import { Preview } from './components/Preview';

import Logo from './assets/KapsAll-logo.png'




function App() {

  const [campaigns, setCampaign] = useState([{
    id: 1,
    nameId: 1,
    productId: 1
  }])

  const information = {
    "sales": {
      email: "Mike@kapsall.com",
      phone: "631-727-0300",
      website: "http://www.KapsAll.com"
    },
    "northenFacility": {
      address1: "200 Mill Road",
      address2: "Riverhead, NY  11901"
    },
    "southernFacility": {
      address1: "251 North Congress Ave.",
      address2: "Delray Beach, FL  33445"
    }
  }


  return (
    <>
      <div className='flex flex-col  grow h-screen w-full'>
        <header className=''>
          <div className='flex py-5 items-center bg-white'>
            <div className='container pb-5  flex items-center justify-between mx-auto border-b-[1px]'>
              <h1 className='text-3xl text-red mr-10'>
                <img className='h-11' src={Logo} alt='Your SVG' />
              </h1>
              <nav className='flex  gap-3 text-sm font-semibold text-gray-400'>
                <TopButton title='Compose' active />
                <TopButton title='Replies' />
                <TopButton title='Settings' />
              </nav>
            </div>
          </div>
          <div className='flex mb-10 py-5 items-center'>
            <div className='container mx-auto flex'>
              <h2 className='text-3xl font-semibold'>Compose</h2>
            </div>

          </div>
        </header>

        <div className='flex flex-col grow bg-slate-100'>
          <main className='flex container mx-auto '>
            <div className='grow pr-10'>
              <h1 className='pt-10 mb-5 text-xl '>
                Edit
              </h1>
              <div className="form">
                <div className="mb-6 max-w-sm">
                  <label className='block text-sm text-gray-500' htmlFor="">Name</label>
                  <input id="name" className='bg-slate-200 appearance-none border-2 border-slate-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' type="text" placeholder='Name' />
                </div>
                <div className="mb-6  max-w-sm">
                  <label className='block text-sm text-gray-500' htmlFor="">Name</label>
                  <input id="name" className='bg-slate-200 appearance-none border-2 border-slate-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' type="text" placeholder='Name' />
                </div>
              </div>
            </div>
            <div className='w-[700px]'>
              <nav className='container -mt-10 bg-slate-200 rounded-t-md overflow-hidden -mb-[2px] mx-auto flex gap-3 text-sm font-semibold text-gray-500'>
                <span className={`p-2 pt-3 px-5 border-b-gray-200 font-light`}>
                  Previews:
                </span>
                <TabButton title='Day one' active />
                <TabButton title='3 days' />
                <TabButton title='10 days' />
                <TabButton title='30 days' />
              </nav>
              <div className='flex bg-white border-slate border-2 rounded-md p-4 z-10'>
                <Preview
                  product={{ name: "Model AU-4 Unscrambler", code: "AU-4", model: "Model AU-4 Unscrambler" }}
                  client={{ name: "Jeff", id: "1" }}
                  information={information}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default App
