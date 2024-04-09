import Image from 'next/image'
import LoginButton from '@/components/login'
export default function Home() {
  return (
<main className="flex flex-col items-center justify-between p-24 min-h-screen">
  <div className="flex items-center justify-between max-w-5xl w-full font-mono text-sm lg:flex z-10">
    <div className='flext flex-col'>
    <h1 className="text-3xl font-bold">FrameMaster</h1>
    <p className="mt-4 text-center text-blue-800 leading-relaxed">
      Do livestream and engage with fans just with a one frame link
    </p>
  </div>
    <div className="mt-8 flex justify-center">
      <LoginButton />
    </div>
  </div>
</main>


  )
}
