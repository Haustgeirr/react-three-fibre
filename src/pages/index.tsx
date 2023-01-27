import { type NextPage } from 'next';

import IntroScene from '../scenes/intro';

const Home: NextPage = () => {
  return (
    <div className="h-screen w-screen bg-black">
      <IntroScene />
    </div>
  );
};

export default Home;
