import { NextRequest, NextResponse } from 'next/server'
import { ImageResponse } from 'next/og'
import { checkApi } from '@/lib/checkdata'

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
    const ids = params.id.split('-')
    const tableName= ids[0]
    const contractAddress = ids[1]
    const filteredData = await checkApi(tableName, contractAddress);
console.log('filter hooks ',filteredData[0].title)

return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
          fontSize: 80,
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))',
            backgroundClip: 'text',
            color: 'transparent',
            fontSize: 80,
            fontWeight: 700,
            margin: 0,
          }}
        >
          {filteredData[0].title}
          {filteredData[0].metadata}
        </p>
        {filteredData && (
          <p
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))',
              backgroundClip: 'text',
              color: 'transparent',
              fontSize: 80,
              fontWeight: 700,
              margin: 0,
              marginTop: 20,
            }}
          >
            {filteredData[0].steamId}
            {filteredData[0].price}
          </p>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
} catch (e: any) {
  console.log(`${e.message}`)
  return new Response(`Failed to generate the image`, {
    status: 500,
  })
}
}