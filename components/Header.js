import Image from "next/image"
import { GlobeAltIcon, MenuIcon, SearchIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/solid'
import { useState } from "react"

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from 'react-date-range'
import { useRouter } from "next/router"

const Header = ({ placeholder }) => {

    const [searchInput, setSearchInput] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [guests, setGuests] = useState(1)
    const router = useRouter()

    const selectionRange = {
        startDate,
        endDate,
        key: 'selection',
    }

    const handleSelect = ranges => {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    return (
        <header className="fixed w-full top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
            {/* Logo */}
            <div onClick={() => router.push('/')} className="relative flex items-center h-8 cursor-pointer my-auto">
                <Image
                    src="https://links.papareact.com/qd3"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                />
            </div>

            {/* Search */}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    type="text"
                    className="flex-grow bg-transparent outline-none pl-5 text-gray-600 placeholder-gray-400"
                    placeholder={placeholder || "Start your search"}
                />
                <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
            </div>

            {/* Icons */}
            <div className="flex items-center justify-end space-x-4 text-gray-500">
                <p className="hidden md:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer" />

                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <MenuIcon className="h-6 cursor-pointer" />
                    <UserCircleIcon className="h-6 cursor-pointer" />
                </div>
            </div>

            {/* Calendar */}
            {
                searchInput &&
                <div className="flex flex-col col-span-3 mx-auto">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelect}
                    />
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-xl flex-grow font-medium">Number of guests</h2>

                        <UsersIcon className="h-5 text-gray-700" />
                        <input value={guests} onChange={e => setGuests(e.target.value)} type="number" min={1} className="w-12 pl-2.5 outline-none" />
                    </div>
                    <div className="flex">
                        <button onClick={() => setSearchInput('')} className="flex-grow text-gray-500">Cancel</button>
                        <button onClick={() => router.push({
                            pathname: '/search',
                            query: {
                                location: searchInput,
                                startDate: startDate.toISOString().slice(0, 10),
                                endDate: endDate.toISOString().slice(0, 10),
                                guests
                            }
                        })} className="flex-grow text-red-400">Search</button>
                    </div>
                </div>
            }
        </header>
    )
}

export default Header
