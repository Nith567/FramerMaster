import Image from 'next/image'
import LoginButton from '@/components/login'
export default function Home() {
  return (
<main className="flex min-h-screen flex-col items-center justify-between p-24">
  <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
    <p className="text-center text-gray-800 leading-relaxed">
      Livepeer video creators can easily create custom contracts that are securely stored in the Tableland database. Using our Privy setup, creators can upload their livestream playback URLs or any video URLs in a secure and abstracted way.
    </p>
    <p className="mt-4 text-center text-gray-800 leading-relaxed">
      Once uploaded, they will receive a unique frame link where they can paste their URL into WarpCast. This allows anyone to view the video by paying with ETH or native tokens, all within the frame itself. Our platform seamlessly integrates with Privy, making it easy for creators to manage and share their content.
    </p>
    <div className="mt-8 flex justify-center">
      <LoginButton />
    </div>
  </div>
</main>
  )
}
