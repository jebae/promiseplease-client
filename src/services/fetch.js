import axios from "axios";

const SERVICE_API = process.env.SERVICE_API;
const CANCEL_TOKEN = axios.CancelToken;
let cancel;

export function fetchGET(resource, params) {
	if (!params)
		params = {};
	params = Object.keys(params).reduce((acc ,cur) => {
		if (params[cur]) {
			acc[cur] = (typeof params[cur] === "object")
				? JSON.stringify(params[cur])
				: params[cur];
		}
		return acc;
	}, {});
	return axios.get(`${SERVICE_API}/${resource}`, {
		params,
		cancelToken: new CANCEL_TOKEN(function executor(c) {
			cancel = c;
		})
	}).catch((err) => {
		if (!axios.isCancel(err))
			throw err;
	});
}