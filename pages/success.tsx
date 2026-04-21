import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Success() {
  const router = useRouter()
  const [sessionId, setSessionId] = useState<string>('')

  useEffect(() => {
    if (router.query.session_id) {
      setSessionId(router.query.session_id as string)
    }
  }, [router.query.session_id])

  return (
    <>
      <Head>
        <title>Payment Successful - Ghostline RP Store</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800 rounded-lg max-w-md">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-400 mb-6">
            Thank you for your purchase. Your items will be delivered to your account shortly.
          </p>
          {sessionId && (
            <p className="text-sm text-gray-500 mb-6">
              Session ID: {sessionId}
            </p>
          )}
          <button
            onClick={() => router.push('/store')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors"
          >
            Back to Store
          </button>
        </div>
      </main>
    </>
  )
}
