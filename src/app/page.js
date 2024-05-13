"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
    const [data, setData] = useState([]);
    const [localData, setLocalData] = useState([]);
    const router = useRouter();

    const fetchData = async () => {
        try {
            const response = await axios.get(
                "http://10.33.35.37/sait_project_api/mahasiswa_api"
            );
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const fetchLocalData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3030/sait_project_api/mahasiswa_api"
            );
            setLocalData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching local data: ", error);
        }
    };

    const handleDeleteLocal = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:3030/sait_project_api/mahasiswa_api/${id}`
            );

            if (response.data.status === 1) {
                alert("Mahasiswa Deleted Successfully.");
                fetchLocalData();
            } else {
                alert("Mahasiswa Deletion Failed.");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting mahasiswa.");
        }
    };

    const handleDeleteUbuntu = async (id) => {
        try {
            const response = await axios.delete(
                `http://10.33.35.37/sait_project_api/mahasiswa_api/${id}`
            );

            if (response.data.status === 1) {
                alert("Mahasiswa Deleted Successfully.");
                fetchData();
            } else {
                alert("Mahasiswa Deletion Failed.");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting mahasiswa.");
        }
    };

    const handleDelete = async (id) => {
        await handleDeleteLocal(id);
        await handleDeleteUbuntu(id);
    };

    useEffect(() => {
        fetchData();
        fetchLocalData();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-4">
                    Data Mahasiswa dari Server Ubuntu
                </h1>
                <button
                    onClick={() => router.push("/add")}
                    className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add New
                </button>
                <table className="table-auto w-full border-2 border-gray-500">
                    <thead className="bg-blue-200">
                        <tr>
                            <th className="px-4 py-2 border-r border-gray-500">
                                Nama
                            </th>
                            <th className="px-4 py-2 border-r border-gray-500">
                                Alamat
                            </th>
                            <th className="px-4 py-2 border-gray-500">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id_mhs}>
                                <td className="border px-4 py-2 border-gray-500">
                                    {item.nama}
                                </td>
                                <td className="border px-4 py-2 border-gray-500">
                                    {item.alamat}
                                </td>
                                <td className="border px-4 py-2 border-gray-500 flex justify-between space-x-2">
                                    <button
                                        onClick={() =>
                                            router.push(`/edit/${item.id_mhs}`)
                                        }
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(item.id_mhs)
                                        }
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h1 className="text-2xl font-bold mb-4 mt-8">
                    Data Mahasiswa dari Local Mac OS
                </h1>
                <button
                    onClick={() => router.push("/add")}
                    className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add New
                </button>
                <table className="table-auto w-full border-2 border-gray-500">
                    <thead className="bg-blue-200">
                        <tr>
                            <th className="px-4 py-2 border-r border-gray-500">
                                Nama
                            </th>
                            <th className="px-4 py-2 border-r border-gray-500">
                                Alamat
                            </th>
                            <th className="px-4 py-2 border-gray-500">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {localData.map((item) => (
                            <tr key={item.id_mhs}>
                                <td className="border px-4 py-2 border-gray-500">
                                    {item.nama}
                                </td>
                                <td className="border px-4 py-2 border-gray-500">
                                    {item.alamat}
                                </td>
                                <td className="border px-4 py-2 border-gray-500 flex justify-between space-x-2">
                                    <button
                                        onClick={() =>
                                            router.push(`/edit/${item.id_mhs}`)
                                        }
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(item.id_mhs)
                                        }
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
