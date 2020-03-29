const KAKAO_APP_KEY = process.env.KAKAO_APP_KEY;
const KAKAO_MAP_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
const MARKER_OPACITY = {
	on: 1.0,
	off: 0.5,
}

/* load */
export const loadKakaoMap = (containerId, onLoad) => {
	const script = document.createElement("script");

	script.async = true;
	script.src = KAKAO_MAP_URL;
	document.head.appendChild(script);
	script.onload = () => {
		kakao.maps.load(() => {
			const container = document.getElementById(containerId);
			const options = {
				center: latLngObj(37.506502, 127.053617),
				level: 7
			};
			const map = new kakao.maps.Map(container, options);
			onLoad(map);
		});
	}
}

/* map */
export const latLngObj = (lat, lng) => new kakao.maps.LatLng(lat, lng);

export const setNewCenter = (map, lat, lng) => {
	map.setCenter(latLngObj(lat, lng));
}

/* marker */
export const setMarkerOn = (marker) => {
	marker.setOpacity(MARKER_OPACITY.on);
}

export const setMarkerOff = (marker) => {
	marker.setOpacity(MARKER_OPACITY.off);
}

export const removeMarkers = (markers) => {
	markers.forEach(marker => {
		marker.setMap(null);
	});
}

export const createMarker = (lat, lng) => {
	const latlng = latLngObj(lat, lng);
	const marker = new kakao.maps.Marker({
		position: latlng,
		clickable: true,
	});

	return marker;
}

const markerAddEventListener = (marker, event, callback) => {
	kakao.maps.event.addListener(marker, event, callback);
}

export const initMarker = (marker, map, onClick) => {
	marker.setMap(map);
	markerAddEventListener(marker, "click", onClick);
	setMarkerOff(marker);
}