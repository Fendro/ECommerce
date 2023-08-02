export function urlFetch(path, args) {
	let url = "http://localhost:4242/" + path + "?";
	if (args) {
		Object.keys(args).forEach(key => {
			url += key + "=" + args[key] + "&"
		});
	}
	return url.slice(0, -1);
}