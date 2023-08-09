<<<<<<< HEAD
export default function serverURL(path, args) {
	let url = "http://localhost:4242/" + path;
	if (!args)
		return url;
	url += "?";
=======
export function serverURL(path, args) {
    let url = "http://localhost:4242/" + path;
    if (!args) return url;
    url += "?";
>>>>>>> 18e7e36c694cc3e7b92da7cb3874a6ea26776a61

    Object.keys(args).forEach(key => {
        if ((typeof args[key]) === "object") {
            args[key].forEach(value => {
                url += key + "=" + value + "&"
            })
        } else {
            url += key + "=" + args[key] + "&"
        }
    });

    return url.slice(0, -1);
}