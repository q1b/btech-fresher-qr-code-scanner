'use client'
import type { Fresher } from "@/db/table";
import { getFresher, setFresherEntry } from "@/db/utils";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./loading-spinner";

export function QRScanner() {
  const [scannedId, setScannedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [fresher, setFresher] = useState<Fresher | null>(null);
  useEffect(() => {
    if (scannedId) {
      setLoading(true)
      getFresher(scannedId).then((fresher) => {
        if (fresher) setFresher(fresher)
      }).finally(() => setLoading(false))
    }
  }, [scannedId])
  return (
    <>
      <div className="max-w-sm gap-8 flex flex-col">
        <Scanner
          allowMultiple={false}
          onScan={(result) => {
            if (result[0].rawValue) setScannedId(parseInt(result[0].rawValue))
          }}
          formats={['qr_code']}
        />
        <ol className="list-inside list-decimal text-sm sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            ID{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              {scannedId}
            </code>
          </li>
          {loading && (
            <div className="flex items-center gap-x-4">
              <LoadingSpinner />
              <span className="text-xl">Loading Details...</span>
            </div>
          )}
          {fresher && !loading && (
            <>
              <li className="mb-2">
                Name{" "}
                <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                  {fresher.name}
                </code>
              </li>
              <li className="mb-2">
                Entered{" "}
                <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                  {fresher.entries || '0'}
                </code>
                times.
              </li>
            </>
          )}
        </ol>
      </div>
      {scannedId && fresher && !loading && (
        <div className="flex gap-4 flex-row">
          <button
            onClick={async () => {
              setLoading(true)
              try {
                const entry = await setFresherEntry(scannedId, (fresher.entries || 0) + 1)
                setFresher({
                  ...fresher,
                  entries: entry,
                })
              } catch (error) {
                alert("FAILED to update entry")
              } finally {
                setLoading(false)
              }
            }}
            disabled={loading}
            className="rounded-full disabled:bg-blue-300 border border-solid border-transparent transition-colors flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Allow Entry
          </button>
          <button
            disabled={loading}
            onClick={() => {
              setScannedId(null)
              setFresher(null)
            }}
            className="rounded-full disabled:opacity-40 border border-solid border-black/[.08] bg-black/20 hover:bg-black/10 transition-colors flex items-center justify-center hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            Reset
          </button>
        </div>
      )}
    </>
  );
}