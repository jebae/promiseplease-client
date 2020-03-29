import { fetchGET } from "./fetch";

const resource = "candidate";

export const fetchCandidates = ({ city, constituency }) => fetchGET(`${resource}`, { city, constituency });
export const fetchCandidateCount = ({ groupby }) => fetchGET(`${resource}/count`, { groupby });
export const fetchCandidateAge = ({ aggregate }) => fetchGET(`${resource}/age`, { aggregate });