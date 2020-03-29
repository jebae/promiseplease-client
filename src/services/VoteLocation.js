import { fetchGET } from "./fetch";

const resource = "vote-location";

export const fetchVoteLocation = ({ city, constituency }) => fetchGET(`${resource}`, { city, constituency });