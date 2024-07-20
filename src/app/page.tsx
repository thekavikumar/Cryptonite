import { DataTableDemo } from '@/components/CoinTable';
import { InfiniteMovingCards } from '@/components/infinite-moving-cards';
import { GlobalMarketCapChart } from '@/components/MultiLineChart';
import WatchList from '@/components/WatchList';

export default async function Home() {
  return (
    <main className="">
      <div className="mb-4">
        <div className="flex m-4 mr-5 ml-5 flex-col md:flex-row items-center justify-between max-w-6xl gap-3 lg:mx-auto ">
          <GlobalMarketCapChart />
          <WatchList />
        </div>
        <div className="flex flex-col justify-center gap-3 mt-9 mb-9">
          <h1 className="text-center text-2xl font-semibold">
            Public Market Holdings
          </h1>
          <InfiniteMovingCards />
        </div>
        <div className="">
          <DataTableDemo page="home" />
        </div>
      </div>
    </main>
  );
}
