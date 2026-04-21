import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ghostline RP — Premium FiveM Roleplay Server</title>
        <meta name="description" content="Ghostline RP — The ultimate serious RP experience. VIP Packages, Custom Vehicles, Properties & More." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main
        className="min-h-screen text-white relative flex items-center justify-center"
        style={{
          backgroundImage: 'url(/store_background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
        <div className="relative z-10 text-center container mx-auto px-4">

          <img
            src="/store_logo.png"
            alt="Ghostline RP"
            className="object-contain max-w-[500px] w-full h-auto mx-auto mb-6 drop-shadow-[0_0_40px_rgba(138,43,226,0.5)]"
          />

          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            GHOSTLINE RP
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            The ultimate serious RP experience. Custom vehicles, properties, VIP tiers,
            heists, gangs & 500+ hours of custom content.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link
              href="/store"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg shadow-purple-600/30 transition-all hover:scale-105"
            >
              🛒 Visit Store
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
            {[
              { label: 'Custom Vehicles', value: '500+' },
              { label: 'Custom Scripts', value: '61+' },
              { label: 'VIP Tiers', value: '4' },
              { label: 'Heist Missions', value: '10+' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-3xl font-bold text-purple-400">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '🚗', title: '500+ Custom Cars', desc: 'From Civilians to Exotics — all custom imports with real sounds' },
              { icon: '🏠', title: 'Player Properties', desc: 'Houses, businesses, nightclubs — own and manage them all' },
              { icon: '👑', title: 'VIP System', desc: '4 tiers of exclusive perks, vehicles, and priority queue' },
              { icon: '🔫', title: 'Gang & Crime', desc: 'Territory wars, drug ops, heists — build your empire' },
              { icon: '💰', title: 'Ghost Credits', desc: 'Premium in-game currency for exclusive items' },
              { icon: '🎬', title: 'Cinema', desc: 'Watch videos with friends in the in-game cinema' },
            ].map((feat, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/10 text-left">
                <div className="text-3xl mb-2">{feat.icon}</div>
                <h3 className="text-lg font-bold mb-1">{feat.title}</h3>
                <p className="text-sm text-gray-400">{feat.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-gray-500 text-sm">
            © 2026 Ghostline RP — All rights reserved.
          </p>
        </div>
      </main>
    </>
  )
}
