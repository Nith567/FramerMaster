import { getSrc } from '@livepeer/react/external';
import axios from 'axios';
import { Livepeer } from 'livepeer';


export const createStream= async (streamData: { name: string }) => {
	const url = 'https://livepeer.studio/api/stream';
	const headers = {
		Authorization: `Bearer 41c68e93-8b26-4e49-834c-458b015ba152`,
		'Content-Type': 'application/json',
	};
	const response = await axios.post(url, streamData, { headers });
	const stream = response.data;
	console.log('stream created:', stream,);
	return stream;
}

export const getStreamUrl = (streamKey: string) => {
	return `https://lvpr.tv/broadcast/${streamKey}`;
}
export const getPlayback = (streamKey: string) => {
	return `https://lvpr.tv?v=${streamKey}`;
}

