import Image from "next/image"

const MediumCard = ({ img, title }) => {
    return (
        <div className="
            cursor-pointer
            transition transform duration-300 hover:scale-105 ease-out
        ">
            <div className="relative h-72 w-72">
                <Image
                    src={img}
                    layout="fill"
                    className="rounded-xl"
                />
            </div>
            <h3 className="text-xl mt-3">{title}</h3>
        </div>
    )
}

export default MediumCard
