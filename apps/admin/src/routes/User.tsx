import { useState } from "react";
import { DataTable } from "../components/ui/DataTable";
import { Pagination } from "../components/ui/Pagination";
import { useGetUsersQuery } from "../store/api";
import type { User } from "../types/user";

const PAGE_SIZE = 10;

export default function Users() {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetUsersQuery({ page, limit: PAGE_SIZE });

  const users = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const columns = [
    {
      header: "Full Name",
      accessor: (row: User) => (
        <span className="font-medium text-neutral-800">{row.fullname}</span>
      ),
    },
    {
      header: "Phone",
      accessor: (row: User) => row.phone,
    },
    {
      header: "Role",
      accessor: (row: User) => (
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            row.role === "admin"
              ? "bg-orange-100 text-orange-700"
              : "bg-neutral-100 text-neutral-600"
          }`}
        >
          {row.role}
        </span>
      ),
    },
    {
      header: "Addresses",
      accessor: (row: User) => (
        <span className="text-neutral-500">
          {row.addresses?.length ?? 0} address{row.addresses?.length === 1 ? "" : "es"}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-neutral-500">
        Loading users...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        Failed to load users. {(error as any)?.status ?? ""}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Users</h1>
        <p className="text-sm text-neutral-500 mt-1">
          View registered users.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={users}
        getRowId={(row) => row._id}
        emptyMessage="No users yet."
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}