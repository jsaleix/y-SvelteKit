export async function load({ params }) {
	console.log(params);
	const { username, tweetId } = params;
	return { username, tweetId };
}
