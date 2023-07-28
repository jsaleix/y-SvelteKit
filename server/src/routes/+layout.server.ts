export async function load({ locals }: { params: any; locals: App.Locals }) {
	return { user: locals.user };
}
