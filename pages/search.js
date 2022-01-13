// import { format } from "date-fns/esm"
import { useRouter } from "next/router"
import Footer from "../components/Footer"
import Header from "../components/Header"
import InfoCard from "../components/InfoCard"
import Map from "../components/Map"

const Search = ({ searchResults }) => {

    const router = useRouter()
    const { location, startDate, endDate, guests } = router.query

    // const formattedStartDate = format(new Date(startDate), 'dd MMMM yy')
    // const formattedEndDate = format(new Date(endDate), 'dd MMMM yy')

    return (
        <div className="h-screen">
            <Header placeholder={`${location} | ${startDate} - ${endDate} | ${guests} guests`} />

            <main className="flex mt-[92px]">
                <section className="flex-grow pt-12 px-6">
                    <p className="text-xs">300+ Stays - {`${startDate} - ${endDate}`} - for {guests} guests</p>
                    <h1 className="font-semibold text-3xl mt-2 mb-4">Stays in {location}</h1>
                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More filters</p>
                    </div>

                    <div className="flex flex-col">
                        {
                            searchResults?.map(res => (
                                <InfoCard
                                    key={res.img}
                                    img={res.img}
                                    title={res.title}
                                    description={res.description}
                                    location={res.location}
                                    star={res.star}
                                    price={res.price}
                                    total={res.total}
                                />
                            ))
                        }
                    </div>
                </section>

                <section className="hidden xl:inline-flex xl:min-w-[600px]">
                    <div className="hidden fixed xl:inline-flex xl:min-w-[600px]">
                        <Map searchResults={searchResults} />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Search

export async function getServerSideProps() {
    const searchResults = await fetch('https://links.papareact.com/isz')
        .then(res => res.json())

    return {
        props: {
            searchResults
        }
    }
}
