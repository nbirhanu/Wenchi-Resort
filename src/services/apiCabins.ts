import supabase, { supabaseUrl } from './supabase'

export async function getCabins() {
	let { data, error } = await supabase.from('cabins').select('*')

	if (error) {
		console.error(error)
		throw new Error('cabins cound not be loaded')
	}

	return data
}

// CREATE CABINS

export async function createCabins(newCabin: any) {
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '')
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

	// create cabins
	const { data, error } = await supabase
		.from('cabins')
		.insert([{ ...newCabin, image: imagePath }])
		.select()
	if (error) {
		console.error(error)
		throw new Error('cabins cound not be created')
	}

	// upload image

	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image)

	//delete

	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id)
		console.error(storageError)
		throw new Error('Cabin image could not be uploaded and the cabin was not created')
	}

	return data
}

// DELETE CABINS
interface Id {
	id: any
}

export async function deleteCabins(id: Id) {
	const { data, error } = await supabase.from('cabins').delete().eq('id', id)

	if (error) {
		console.error(error)
		throw new Error('cabins cound not be loaded')
	}

	return data
}
