import styled from 'styled-components'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import { FieldErrors, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCabins } from '../../services/apiCabins'
import toast from 'react-hot-toast'
import FormRow from '../../ui/FormRow'

interface CabinFormData {
	name: string
	maxCapacity: number
	regularPrice: number
	discount: number
	description: string
	image: FileList
}

const FormRow2 = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`

function CreateCabinForm() {
	const { register, handleSubmit, reset, formState, getValues } = useForm<CabinFormData>()

	const queryClient = useQueryClient()

	const { mutate, status } = useMutation({
		mutationFn: createCabins,
		onSuccess: () => {
			toast.success('the cabin is successfully created')
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			})
			reset()
		},
		onError: err => toast.error(err.message),
	})

	const onSubmit = function (data: CabinFormData) {
		// console.log(data)
		mutate({ ...data, image: data?.image[0] })
	}

	const onError = function (errors: FieldErrors<any>) {}

	const { errors } = formState
	//

	const isLoading = status === 'pending'

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="Cabin name" error={errors.name?.message}>
				<Input
					type="text"
					id="name"
					{...register('name', {
						required: 'this filed is required',
					})}
				/>
			</FormRow>

			<FormRow error={errors.maxCapacity?.message} label="Maximum capacity">
				<Input
					type="number"
					id="maxCapacity"
					{...register('maxCapacity', {
						required: 'this filed is required',
						min: {
							value: 1,
							message: 'Capacity should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label="Regular price" error={errors.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					{...register('regularPrice', {
						required: 'this filed is required',
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors.discount?.message}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					{...register('discount', {
						required: 'this filed is required',
						validate: value =>
							value <= getValues().regularPrice || 'Discount should be less than regular price',
					})}
				/>
			</FormRow>

			<FormRow label="Description for website" error={errors.description?.message}>
				<Textarea
					id="description"
					defaultValue=""
					{...register('description', {
						required: 'this filed is required',
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo" error={errors.image?.message}>
				<FileInput
					id="image"
					accept="image/*"
					type="file"
					{...register('image', {
						required: 'this filed is required',
					})}
				/>
			</FormRow>

			<FormRow2>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button>{isLoading ? 'Creating cabin...' : 'Create cabin'}</Button>
			</FormRow2>
		</Form>
	)
}

export default CreateCabinForm
