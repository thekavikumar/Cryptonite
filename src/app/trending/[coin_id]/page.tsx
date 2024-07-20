import React from 'react';

const Page = ({ params }: { params: { coin_id: string } }) => {
  return (
    <div>
      <h1>{params.coin_id}</h1>
    </div>
  );
};

export default Page;
