import HeroCarousel from '@/components/HeroCarousel';
import Searchbar from '@/components/Searchbar';
import Image from 'next/image';


const Home = () => {
  return (
    <>
    {/* section Start by starting layout */}
      <section className="md:px:20 py-24 px-6 ">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
        {/* main starts */}
            <p className="small-text">
              Smart Shopping Starts here : 
              <Image
              src = "/assets/icons/arrow-right.svg"
              alt = "arrow right"
              width = {16}
              height = {16}
              />
            </p>

            <h1 className='head-text'>
              Unleash the Power of 
              <span className='text-primary'> PriceWise </span>
            </h1>
            <p className='mt-6'>
                Powerful, and easy to use price comparison tool
                , and self-server product and growth analytics to help you convert engage ,and retain more.
            </p>
            <Searchbar/>
          </div>

          <HeroCarousel />     
        </div>
      </section>

      {/* Trending Section */}

      <section className='trending-section'>
          <h2 className='section-text'> Trending</h2>
          <div className='flex flex-wrap gap-x-8 gap-y-16'>
            {["food", "foods", "Burger" , "Pizza"].map((product) => (
              <div>{product}</div>
            ))}

          </div>
      </section>
    </>
    )
}

export default Home;