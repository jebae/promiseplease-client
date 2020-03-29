import { fetchGET } from "./fetch";

const resource = "party";

export const fetchPartyCount = () => fetchGET(`${resource}/count`);