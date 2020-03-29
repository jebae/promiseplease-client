import { fetchGET } from "./fetch";

const resource = "voter";

export const fetchVoterCount = () => fetchGET(`${resource}/count`);