import { CoinTable } from '@/components/CoinTable';
import { InfiniteMovingCards } from '@/components/infinite-moving-cards';
import { GlobalMarketCapChart } from '@/components/MultiLineChart';
import WatchList from '@/components/WatchList';

export default async function Home() {
  return (
    <main className="">
      <div className="mb-4 p-3 md:p-0 max-w-6xl mx-auto">
        <div className="flex m-4 sm:mr-5 sm:ml-5 flex-col md:flex-row items-center justify-between max-w-6xl gap-3 mx-auto">
          <GlobalMarketCapChart />
          <WatchList />
        </div>
        <div className="flex sm:max-w-4xl max-w-3xl w-full items-center mx-auto md:max-w-6xl flex-col justify-center gap-3 mt-14 sm:mt-9 mb-9">
          <InfiniteMovingCards />
        </div>
        <div className="">
          <CoinTable page="home" />
        </div>
      </div>
    </main>
  );
}
