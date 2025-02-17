// Components
import newsService from "@/api/services/newsService";
import ProfileFetcherCard from "@/components/ProfileFetcherCard";
import Repair from "@/components/Repair";
import SectionLoader from "@/components/SectionLoader";
import { updateNews } from "@/store/features/newsSlice";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

const Home = () => {
  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch()

  const LoadLatestNews = useCallback(async () => {
    setLoader(true);
    try {
      const data = await newsService.getNews();
      dispatch(updateNews(data));
    } catch (error) {
      notification.error("Server tomonidan hato");
    } finally {
      setLoader(false);
    }
  }, [dispatch]);

  useEffect(() => {
    LoadLatestNews();
  }, [LoadLatestNews]);

  const news = useSelector((state) => state.news.data);

  return (
    <div className="mx-auto xl:w-2/3 w-11/12 space-y-5 my-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Bosh sahifa</h1>
      </div>
      <div className="w-full flex justify-between items-start gap-5">
        <ProfileFetcherCard />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">Yangiliklar</h2>
          </div>
          {
            loader ? (
              <SectionLoader/>
            ) : (
              <div className="space-y-5">
                {
                  news.map((news) => {
                    return (
                      <div key={news._id} className="bg-white border rounded-3xl overflow-hidden">
                        <div className="w-full relative">
                          <div className=" absolute top-3 px-3 flex w-full justify-between items-center">
                            <p className="bg-white px-3 font-semibold flex items-center rounded-full gap-2"><i className='bx bxs-check-circle text-xl text-primary-default'></i> Original malumot</p>
                            <p className="bg-white px-3 font-semibold flex items-center rounded-full gap-2"><i className='bx bxs-time text-xl text-primary-default'></i> {format(new Date(news.created_at), "PPpp")}</p>
                          </div>
                          <img src={news.banner.large} alt={news.title} className="w-full" />
                        </div>
                        <div className="p-5">
                          <p className="text-lg font-semibold">{news.title}</p>
                          <p><span className="font-semibold">izoh:</span> {news.desc}</p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          }
        </div>
      </div>
      <div className="w-full py-10 text-center">
          <p className="font-medium text-lg">mene_market company ishchilar paneli <i className='bx bx-registered'></i></p>
          <p>Web sahifa mene market companiyasi ishchilari uchun ish paneli sifatida ishlab chiqilgan.</p>
      </div>
    </div>
  );
};

export default Home;
