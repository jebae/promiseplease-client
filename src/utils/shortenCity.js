const citySuffices = [
	"특별시",
	"광역시",
	"특별자치도",
	"특별자치시",
];

export default function shortenCity(city) {
	for (let sufix of citySuffices) {
		if (city.includes(sufix))
			return city.replace(sufix, "");
	}
	if (city.length >= 4)
		return `${city[0]}${city[2]}`
	return city;
}