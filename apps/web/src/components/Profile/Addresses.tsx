import React, { useState } from "react";
import { Plus, Pencil, Trash2, X, MapPin } from "lucide-react";

import {
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} from "../../store/api";

type Address = {
  _id: string;
  city: string;
  address: string;
};

type User = {
  addresses: Address[];
};

export const Addresses = () => {
  const [createAddress, { isLoading: isCreating }] =
    useCreateAddressMutation();

  const [updateAddress, { isLoading: isUpdating }] =
    useUpdateAddressMutation();

  const [deleteAddress, { isLoading: isDeleting }] =
    useDeleteAddressMutation();

  const [user, setUser] = useState<User>(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser
      ? JSON.parse(storedUser)
      : { addresses: [] };
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] =
    useState<Address | null>(null);

  const [form, setForm] = useState({
    city: "",
    address: "",
  });

  const addresses = user.addresses || [];

  const updateLocalUser = (updatedUser: User) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleAdd = () => {
    setEditingAddress(null);

    setForm({
      city: "",
      address: "",
    });

    setIsModalOpen(true);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);

    setForm({
      city: address.city,
      address: address.address,
    });

    setIsModalOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      if (editingAddress) {
        const response = await updateAddress({
          addressId: editingAddress._id,
          city: form.city,
          address: form.address,
        }).unwrap();

        updateLocalUser(response.data);
      } else {
        const response = await createAddress({
          city: form.city,
          address: form.address,
        }).unwrap();

        updateLocalUser(response.data);
      }

      setIsModalOpen(false);

      setForm({
        city: "",
        address: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (addressId: string) => {
    if (addresses.length === 1) {
      alert("Oxirgi addressni o'chirib bo'lmaydi");
      return;
    }

    const confirmed = window.confirm(
      "Bu addressni o'chirmoqchimisiz?"
    );

    if (!confirmed) return;

    try {
      const response =
        await deleteAddress(addressId).unwrap();

      updateLocalUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold">
          Saved Addresses
        </h2>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-black text-white text-sm px-4 py-2.5 rounded-lg"
        >
          <Plus size={14} />
          Add Address
        </button>
      </div>

      {/* Addresses */}
      <div className="flex flex-col gap-4">
        {addresses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No saved addresses
          </div>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr._id}
              className="border rounded-lg p-5 flex items-start justify-between"
            >
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded bg-gray-100 flex items-center justify-center">
                  <MapPin
                    size={16}
                    className="text-gray-500"
                  />
                </div>

                <div>
                  <div className="font-semibold text-sm">
                    {addr.city}
                  </div>

                  <div className="text-sm text-gray-500 mt-1">
                    {addr.address}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleEdit(addr)}
                  className="flex items-center gap-1 text-gray-700"
                >
                  <Pencil size={13} />
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(addr._id)
                  }
                  disabled={isDeleting}
                  className="flex items-center gap-1 text-orange-600 bg-orange-50 px-3 py-1.5 rounded"
                >
                  <Trash2 size={13} />
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold">
                {editingAddress
                  ? "Edit Address"
                  : "Add Address"}
              </h3>

              <button
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="border rounded-lg px-3 py-2"
                required
              />

              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="border rounded-lg px-3 py-2"
                required
              />

              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="bg-black text-white rounded-lg py-2.5"
              >
                {isCreating || isUpdating
                  ? "Saving..."
                  : editingAddress
                  ? "Update"
                  : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};