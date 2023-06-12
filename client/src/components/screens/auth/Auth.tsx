import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { IEmailPassword } from '@/store/user/user.interface'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import { validEmail } from './email.valid'
import { useAuthRedirect } from './useAuthRedirect'
import { Heading } from '@/ui/Heading'
import { Loader } from '@/ui/Loader'
import { Meta } from '@/ui/Meta'
import { Button } from '@/ui/button/Button'
import Field from '@/ui/input/Field'

const Auth: FC = () => {
	useAuthRedirect()

	const { isLoading } = useAuth()

	const { login, register } = useActions()

	const [type, setType] = useState<'login' | 'register'>('login')

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IEmailPassword>({
		mode: 'onChange'
	})

	const onSubmit = (data: IEmailPassword) => {
		if (type === 'login') {
			login(data)
		} else {
			register(data)
		}

		reset()
	}

	return (
		<Meta title="Auth">
			<section className="flex h-screen">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="rounded-lg bg-white shadow-sm p-8 m-auto"
				>
					{isLoading ? (
						<>
							<Loader /> ghhgghghgh
						</>
					) : (
						<>
							<Heading className="capitalize text-center mb-4">{type}</Heading>

							<Field
								{...formRegister('email', {
									required: 'Email is required',
									pattern: {
										value: validEmail,
										message: 'Please enter a valid email address'
									}
								})}
								name="Email"
								placeholder="Email"
								error={errors.email?.message}
							/>

							<Field
								{...formRegister('password', {
									required: 'Password is required',
									minLength: {
										value: 6,
										message: 'Min length should more 6 symbols '
									}
								})}
								name="Password"
								placeholder="Password"
								error={errors.password?.message}
								type="password"
							/>
							<Button variant="orange">Let's go!</Button>

							<button
								type="button"
								className="inline-block opacity-50 mt-3 ml-6 text-sm"
								onClick={() => setType(type === 'login' ? 'register' : 'login')}
							>
								{type === 'login' ? 'Register' : 'Login'}
							</button>
						</>
					)}
				</form>
			</section>
		</Meta>
	)
}

export default Auth
