import { checkApi } from '@/lib/checkdata'
import { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata({
  params
}: {
  params: { id: string }
}): Promise<Metadata> {
  const id = params.id
  const tableName=id[0]
  const contractAddress=id[1]
  const imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/images/${id}`
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/player/${id}`

  const filteredData = await checkApi(tableName, contractAddress);
console.log('filter hooks ',filteredData[0].title)
  return {
    title: 'Contract gated video',
    description: 'Get access to the gated videos',
    openGraph: {
      title: 'Gated Contract creators video/livestream',
      images: [imageUrl]
    },
    other: {
      'fc:frame': 'vNext',
      'of:accepts:xmtp': '2024-02-01',
      'fc:frame:image': imageUrl,
      'fc:frame:post_url': postUrl,
      'fc:frame:button:1': `Watch Livestream, video`
    }
  }
}

export default function Home() {
  return (
    <main className="flex flex-col text-center p-8 lg:p-16">
      <div className="flex flex-col">
        <p className="font-black text-purple-400">Farcaster Frame</p>
        <h1 className="mt-12 lg:mt-16 text-6xl font-bold">
          View gated video on Livepeer
        </h1>
        <Link href="/" className="mt-20 text-green-500 underline">
         For this video
        </Link>
      </div>
    </main>
  )
}
