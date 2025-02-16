// Components
import ProfileFetcherCard from "@/components/ProfileFetcherCard";
import Repair from "@/components/Repair";

const Home = () => {
  return (
    <div className="mx-auto xl:w-2/3 w-11/12 space-y-5 my-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Asosiy sahifa</h1>
      </div>
      <div className="w-full flex justify-between items-start gap-5">
        <ProfileFetcherCard />
      </div>
    </div>
  );
};

export default Home;
