import { CoinTable } from '@/components/CoinTable';
import { InfiniteMovingCards } from '@/components/infinite-moving-cards';
import { GlobalMarketCapChart } from '@/components/MultiLineChart';
import WatchList from '@/components/WatchList';

export default async function Home() {
  return (
    <main className="">
      <div className="mb-4 p-3 md:p-0">
        <div className="flex m-4 md:mr-5 md:ml-5 flex-col md:flex-row xl:items-center justify-between max-w-6xl gap-3 lg:mx-auto ">
          <GlobalMarketCapChart />
          <WatchList />
        </div>
        <div className="flex max-w-[320px] items-center lg:mx-auto lg:max-w-6xl flex-col justify-center gap-3 mt-14 lg:mt-9 mb-9">
          <InfiniteMovingCards />
        </div>
        <div className="">
          <CoinTable page="home" />
        </div>
      </div>
    </main>
  );
}
