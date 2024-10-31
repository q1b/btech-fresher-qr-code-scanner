import { getFresher } from "@/db/utils";
import { QRCodeSVG } from "qrcode.react"

type Params = Promise<{ id: number }>

const randomTailwindcssGradient = () => {
    const gradients = [
        'from-blue-500 to-cyan-500',
        'from-rose-500 to-pink-500',
        'from-yellow-500 to-amber-500',
        'from-green-500 to-emerald-500',
        'from-violet-500 to-purple-500',
        'from-red-500 to-pink-500',
        'from-blue-500 to-indigo-500',
        'from-yellow-500 to-orange-500',
        'from-green-500 to-lime-500',
        'from-violet-500 to-fuchsia-500',
    ]
    return gradients[Math.floor(Math.random() * gradients.length)]
}

export default async function UserQRPage({ params }: { params: Params }) {
    const { id } = await params;
    const fresher = await getFresher(id);
    if (!fresher) return <div>Not found</div>
    return <>
        <QRCodeSVG height={240} width={240} value={`${id}`} />
        <p className="mt-2 text-xs">Show above QR Code to get entry</p>
        <div className="mb-10 flex flex-col items-center">
            <h1 className={`text-pretty text-center bg-clip-text text-transparent bg-gradient-to-tr ${randomTailwindcssGradient()} text-5xl font-semibold tracking-tight sm:text-balance sm:text-6xl`}>{fresher.name}</h1>
            <h4 className="mt-4 text-3xl text-center font-mono font-bold">You are Welcome to ADUNA 3.0 </h4>
        </div>
    </>
}