import { NextRequest, NextResponse } from 'next/server'
import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit'
import { checkApi } from '@/lib/checkdata'
import { checkBuyer } from '@/lib/checkBuyer'

const NEYNAR_API_KEY =process.env.NEYNAR_API_KEY 

export const dynamic = 'force-dynamic'

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const ids = params.id.split('-')
    const tableName= ids[0]
    const contractAddress = ids[1]

    const filteredData = await checkApi(tableName, contractAddress);
console.log('filter hooks ',filteredData[0].title)
    const body: FrameRequest = await req.json()
  
    const { isValid, message } = await getFrameMessage(body, {
      neynarApiKey: NEYNAR_API_KEY
    })
  
    if (!isValid) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const wallets = message.interactor.verified_accounts
    const hasAccessed = await checkBuyer(contractAddress, wallets);//checking condition

    if (wallets.length === 0) {
        const imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/no-wallets.jpg`
    
        return new NextResponse(
          `<!DOCTYPE html>
          <html>
            <head>
              <title>No wallets!</title>
              <meta property="og:title" content="You need to add at least 1 wallet!" />
              <meta property="of:accepts:xmtp" content="2024-02-01" />
              <meta property="og:image" content="${imageUrl}" />
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${imageUrl}" />
            </head>
            <body />
          </html>`,
          {
            status: 200,
            headers: {
              'Content-Type': 'text/html'
            }
          }
        )
      }

      if(hasAccessed){
        const postUrl = `https://lvpr.tv?v=${filteredData[0].streamId}`
        const imageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/all-good.jpg`
      

      let videoMeta = ``
      let response
      if (filteredData.streamId) {
        videoMeta = `
        <meta property="fc:frame:video" content="${filteredData[0].streamId}" />
        <meta property="fc:frame:video:type" content="application/x-mpegURL" />`
      }
  
      response = new NextResponse(
        `<!DOCTYPE html>
        <html>
          <head>
            <title>Watch the video!</title>
            <meta property="og:title" content="You can watch the video!" />
            <meta property="of:accepts:xmtp" content="2024-02-01" />
            <meta property="og:image" content="${imageUrl}" />
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${imageUrl}" />
            <meta property="fc:frame:button:1" content="Watch in browser" />
            <meta property="fc:frame:button:1:action" content="link" />
            <meta property="fc:frame:button:1:target" content="${postUrl}" />
            ${videoMeta}
          </head>
          <body />
        </html>`,
        {
          status: 200,
          headers: {
            'Content-Type': 'text/html'
          }
        }
      )
    }
    else{
        return new NextResponse(`<!DOCTYPE html><html><head>
        <title>This is frame 4</title>
        <meta property="og:image" content="${process.env.NEXT_PUBLIC_SITE_URL}/framemaster.png" />
        <meta property="fc:frame" content="vNext" />
        <meta property="of:accepts:xmtp" content="2024-02-01" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_SITE_URL}/framemaster.png" />
    
        <meta property="fc:frame:button:1" content="View Tutorial" />
        <meta property="fc:frame:button:1:action" content="link" />

        <meta property="fc:frame:button:1:target" content="https://github.com/Nith567" />
    
        <meta property="fc:frame:button:2" content="Restart" />
        <meta property="fc:frame:button:2:action" content="post" />
        <meta property="fc:frame:button:2:target" content="https://github.com/Nith567" />
        </head></html>`
      )  
    }
  }
  
