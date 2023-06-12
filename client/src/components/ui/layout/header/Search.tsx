import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'

export const Search: FC = () => {
	const [search, setSearch] = useState('')
	const history = useRouter()

	return (
		<div className="relative flex items-center ml-2">
			<input
				type="search"
				value={search}
				onChange={e => setSearch(e.target.value)}
				id="message"
				className="px-4 bg-secondaryTr text-white py-2 w-full outline-non focus:border-primary border border-grey border-solid transition-all placeholder:text-gray rounded-lg"
				placeholder="Search..."
				aria-label="Search"
			/>
			<button
				className="absolute -right-1 text-center rounded-r-xl font-medium shadow px-5 py-2 hover: shadow-lg transition duration-300 ease-in-out text-white bg-primary"
				style={{
					top: '5px',
					height: '46px'
				}}
				type="button"
				id="button-addon1"
				data-te-ripple-init
				data-te-ripple-color="light"
				onClick={() => {
					history.push(`/q?term=${search}`)
				}}
			>
				<RiSearch2Line />
			</button>
		</div>
	)
}
