// import { MultiLineChart } from '@/components/MultiLineChart';

import { GlobalMarketCapChart } from '@/components/MultiLineChart';
import WatchList from '@/components/WatchList';

export default async function Home() {
  // const res = await fetch(
  //   `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&x_cg_demo_api_key=${process.env.API_KEY}`
  // );
  // const data = await res.json();
  // console.log(data);
  return (
    <main>
      <div className="">
        {/* <MultiLineChart /> */}
        <div className="flex m-4 flex-col md:flex-row items-center justify-between max-w-5xl mx-auto ">
          <GlobalMarketCapChart />
          <WatchList />
        </div>
      </div>
    </main>
  );
}
