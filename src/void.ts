// Thanks to https://github.com/Mikarific for this code

function GM_fetch(
	details: VMScriptGMXHRDetails<string | object | Document | Blob | ArrayBuffer>,
): Promise<VMScriptResponseObject<string | object | Document | Blob | ArrayBuffer>> {
	return new Promise((resolve, reject) => {
		GM_xmlhttpRequest({
			...details,
			onload: (response) => resolve(response),
			onerror: (err) => reject(err),
			timeout: 10000,
		});
	});
}

export enum PanoramaType {
	OFFICIAL = 2,
	UNOFFICIAL = 10,
}

export type Panorama = {
	type: PanoramaType;
	id: string;
};

export function decodePanoId(panoId: string): Panorama {
	try {
		// Cursed Protobuf Parsing Bullshit

		// Convert potential base64 encoded protobuf panoId into a Uint8Array
		// We do it this way to avoid browser incompatibilities with Uint8Array.fromBase64
		const binary = atob(panoId.replaceAll('-', '+').replaceAll('_', '/').replaceAll('.', '='));
		const bytes = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) {
			bytes[i] = binary.charCodeAt(i);
		}

		let index = 0;
		// Check if the first field (panorama type) is an integer
		// 0x08 is 00001000 in binary, so this checks if...
		// The field number, 00001 (1), is the first one.
		// The wire type, 000 (0), is that of a protobuf VARINT.
		// https://protobuf.dev/programming-guides/encoding/
		if (index >= bytes.length || bytes[index] !== 0x08) throw new Error('Not a protobuf panoId.');
		index++;

		const decodeVarint = () => {
			let result = 0;
			let shift = 0;
			let count = 0;
			while (index < bytes.length && count < 5) {
				const byte = bytes[index]!;
				index++;
				result |= (byte & 0x7f) << shift;
				if ((byte & 0x80) === 0) return result;
				shift += 7;
				count++;
			}
			return null;
		};

		// Get the type from the panoId
		const type = decodeVarint();
		if (type === null) throw new Error('Not a protobuf panoId.');

		// Check if the second field (panorama id) is a string
		// 0x12 is 00010010 in binary, so this checks if...
		// The field number, 00010 (2), is the second one.
		// The wire type, 010 (2), is that of a protobuf LEN.
		// https://protobuf.dev/programming-guides/encoding/
		if (index >= bytes.length || bytes[index] !== 0x12) throw new Error('Not a protobuf panoId.');
		index++;

		const decodeLen = () => {
			// Get the length of the panorama id string
			const length = decodeVarint();
			if (length === null) return null;

			// Check if the rest of the bytes are enough for the string
			if (index + length > bytes.length) return null;

			// Decode the string
			const strBytes = bytes.slice(index, index + length);
			try {
				return new TextDecoder().decode(strBytes);
			} catch {
				// If this catches, the string is invalid UTF-8
				return null;
			}
		};

		const id = decodeLen();
		if (id === null) throw new Error('Not a protobuf panoId.');

		return { type, id };
	} catch {
		// If this catches, the panoId is not a base64 encoded protobuf, and therefore does not include the pano type.
		// From here, we can guess the pano type from the ID.

		// Assume the panorama is official coverage unless proven otherwise.
		let type = PanoramaType.OFFICIAL;

		// If the panorama doesn't match the format of official streetview coverage, it is guaranteed to be unofficial.
		// Official panorama IDs are 22 characters long and end with a "g", "w", "A", or "Q".
		// https://reanna.neocities.org/blog/street-view-pano-ids/
		if (!/^[\w-]{21}[gwAQ]$/.test(panoId)) type = PanoramaType.UNOFFICIAL;

		return { type, id: panoId };
	}
}

// TODO: Use batch metadata requests
export async function isVoid({ type, id }: Panorama) {
	console.log("[Void Detector] Checking pano for void", id);
	try {
		const { status, response } = await GM_fetch({
			method: 'POST',
			headers: { 'Content-Type': 'application/json+protobuf' },
			url: 'https://maps.googleapis.com/$rpc/google.internal.maps.mapsjs.v1.MapsJsInternalService/GetMetadata',
			// The last argument here is a list of types of data to get from the panorama ID.
			// Type 0 - ???
			// Type 1 - panorama type/id, imageWidth, imageHeight, array of cropWidth/cropHeight for each available zoom level, tileWidth, tileHeight
			// Type 2 - date the panorama was taken, month/year, multiple unknowns
			// Type 3 - copyright, and a link to an icon image of some sort?
			// Type 4 - latitude, longitude, heading, tilt, roll, a few unknowns
			// Type 5 - ???
			// Type 6 - links, each one has panorama type/id, lat/long, heading, tilt, roll, and the same unknowns as type 4
			// Type 7 - ???
			// Type 8 - ???
			// Only type 1 and type 4 are needed to be able to render a panorama image, so those are the only two I request for.

			// We only need 4 here because a void pano lacks lat and lng (exit coords)
			data: `[["apiv3"],["en","US"],[[[${type},"${id}"]]],[[1,4]]]`,
			responseType: 'json',
		});
		if (status !== 200) return null;
		if (response === null) return null;

		let meta: any = response;

		console.log("[Void Detector] Metadata", meta);

		if (!meta[1][0][5]) {
			// No exit coords, this is void
			return true;
		} else {
			// Exit coords, this is not void
			return false;
		}
	} catch (err) {
		console.error(err);
		return null;
	}
}
