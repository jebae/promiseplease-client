import { fetchGET } from "./fetch";

const resource = "word";

export const fetchWords = ({ text, next }) => fetchGET(`${resource}`, { text, next });