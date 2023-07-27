export async function load({ params }) {
	console.log(params);

	return { username: params.username };
}
