export function TableRowSkeleton() {
    return (
      <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
        {/* Username and Image */}
        <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-100"></div>
            <div className="h-6 w-24 rounded bg-gray-100"></div>
          </div>
        </td>
        {/* Name */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-32 rounded bg-gray-100"></div>
        </td>
        {/* Gender */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Address */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
      </tr>
    );
  }

  export function UsersTableSkeleton() {
    return (
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Username
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Gender
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Address
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }