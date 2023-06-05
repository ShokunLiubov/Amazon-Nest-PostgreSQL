import { FC } from 'react'

export const Loader: FC = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="spinner"
			color="black"
		>
			<circle className="path" cx="12" cy="12" r="10" />
			<style jsx>{`
				.spinner {
					animation: rotate 2s linear infinite;
					width: 50px;
					height: 50px;
				}

				.path {
					stroke: #70c1b3;
					stroke-opacity: 0.8;
					stroke-linecap: round;
					animation: dash 1.5s ease-in-out infinite;
				}

				@keyframes rotate {
					100% {
						transform: rotate(360deg);
					}
				}

				@keyframes dash {
					0% {
						stroke-dasharray: 1, 150;
						stroke-dashoffset: 0;
					}
					50% {
						stroke-dasharray: 90, 150;
						stroke-dashoffset: -35;
					}
					100% {
						stroke-dasharray: 90, 150;
						stroke-dashoffset: -124;
					}
				}
			`}</style>
		</svg>
	)
}
