import { fetchGET } from "./fetch";

const resource = "promise";

export const fetchPromiseCount = ({ groupby }) => fetchGET(`${resource}/count`, { groupby });