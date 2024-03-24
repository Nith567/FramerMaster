import Image from 'next/image'
import LoginButton from '@/components/login'
import VideoUploader from '@/components/upload'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <LoginButton/>
          <VideoUploader/>
      </div>
    </main>
  )
}
