import cn from 'clsx'
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'orange' | 'white'
}

export const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	variant,
	...rest
}) => {
	return (
		<button
			{...rest}
			className={cn('rounded-xl font-medium shadow px-10 py-2', className, {
				'text-white bg-primary': variant === 'orange',
				'text-primary bg-white': variant === 'white'
			})}
		>
			{children}
		</button>
	)
}
