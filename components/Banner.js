import Image from "next/image"

const Banner = () => {
    return (
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] xl:h-[600px] 2xl:h-[700px]">
            <Image
                src="https://links.papareact.com/0fm"
                layout="fill"
                objectFit="cover"
                objectPosition="left"
            />
            <div className="absolute w-full text-center top-1/2 bottom-1/22">
                <p className="text-sm sm:text-lg">Not sure where to go? Perfect.</p>
                <button className="text-purple-500 px-9 py-3.5 bg-white rounded-full cursor-pointer shadow-md font-bold my-3 hover:shadow-xl active:scale-90 transition">I'm flexible</button>
            </div>
        </div>
    )
}

export default Banner
