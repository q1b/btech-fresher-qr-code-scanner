import { getFresherList } from "@/db/utils"
import Link from "next/link";

export default async function UsersPage() {
    const fresherList = await getFresherList();
    return (
        <div className="">
            <div className="flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="relative">

                            <table className="min-w-full table-fixed divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">ID</th>
                                        <th scope="col" className="min-w-[12rem] py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Name</th>
                                        {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th> */}
                                        {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th> */}
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                                            Entries
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {fresherList.map((fresher,i) => (
                                        <tr key={fresher.id}>
                                            <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900">{i+1}</td>
                                            <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900">
                                                <Link href={`/users/${fresher.id}`}>
                                                    {fresher.name}
                                                </Link>
                                            </td>
                                            {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{fresher.rollNo}</td> */}
                                            {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td> */}
                                            <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3 text-gray-500">
                                                {fresher.entries || 0}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}