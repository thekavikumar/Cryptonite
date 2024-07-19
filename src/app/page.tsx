import { DataTableDemo } from '@/components/CoinTable';
import { GlobalMarketCapChart } from '@/components/MultiLineChart';
import WatchList from '@/components/WatchList';

export default async function Home() {
  return (
    <main>
      <div className="">
        <div className="flex m-4 mr-5 ml-5 flex-col md:flex-row items-center justify-between max-w-6xl gap-3 lg:mx-auto ">
          <GlobalMarketCapChart />
          <WatchList />
        </div>
        <div className="">
          {/* <TreadingTable coins={[]} /> */}
          <DataTableDemo />
        </div>
      </div>
    </main>
  );
}
