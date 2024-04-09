import { getSrc } from '@livepeer/react/external';
import axios from 'axios';
import { Livepeer } from 'livepeer';

// curl --request POST \
//   --url https://livepeer.studio/api/stream \
//   --header 'Authorization: Bearer <api-key>' \
//   --header 'Content-Type: application/json' \
//   --data '{
//   "name": "demo_stream",https://lvpr.tv/broadcast/2006-u5k8-2r.....
// }'
// converting  this to an axios call


export const createStream= async (streamData: { name: string }) => {
	const url = 'https://livepeer.studio/api/stream';
	const headers = {
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_LIVEPEER_API_KEY}`,
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