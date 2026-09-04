export type User = {
    _id: string,
    fullname: string,
    phone: string,
    role: string,
    addresses: {city: string, address: string, _id: string}[],
    createdAt: string,
    updatedAt: string
}