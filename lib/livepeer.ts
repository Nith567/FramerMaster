import { getSrc } from '@livepeer/react/external';
import axios from 'axios';
import { Livepeer } from 'livepeer';

const livepeer = new Livepeer({
	apiKey:process.env.LIVEPEER_API_KEY,
});

// curl --request POST \
//   --url https://livepeer.studio/api/stream \
//   --header 'Authorization: Bearer <api-key>' \
//   --header 'Content-Type: application/json' \
//   --data '{
//   "name": "test_stream",https://lvpr.tv/broadcast/2006-u5k8-2rds-2iws
// }'
// converting  this to an axios call

const token = process.env.LIVEPEER_API_KEY;

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