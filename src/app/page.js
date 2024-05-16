"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
    const [data, setData] = useState([]);
    const [localData, setLocalData] = useState([]);
    const router = useRouter();

    const fetchDataUbuntu = async () => {
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
        fetchDataUbuntu();
        fetchLocalData();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-4">
                    Source Ubuntu Server
                </h1>
                <button
                    onClick={() => router.push("/add")}
                    className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add New
                </button>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th className="px-6 py-3" scope="col">
                                    Nama
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    Alamat
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr
                                    key={item.id_mhs}
                                    className="bg-white border-b"
                                >
                                    <td className="px-6 py-4">{item.nama}</td>
                                    <td className="px-6 py-4">{item.alamat}</td>
                                    <td className="px-6 py-4 space-x-2">
                                        <button
                                            onClick={() =>
                                                router.push(
                                                    `/edit/${item.id_mhs}`
                                                )
                                            }
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(item.id_mhs)
                                            }
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h1 className="text-2xl font-bold mb-4 mt-8">
                    Source Local Windows
                </h1>
                <button
                    onClick={() => router.push("/add")}
                    className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add New
                </button>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th className="px-6 py-3" scope="col">
                                    Nama
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    Alamat
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {localData.map((item) => (
                                <tr
                                    key={item.id_mhs}
                                    className="bg-white border-b"
                                >
                                    <td className="px-6 py-4">{item.nama}</td>
                                    <td className="px-6 py-4">{item.alamat}</td>
                                    <td className="px-6 py-4 space-x-2">
                                        <button
                                            onClick={() =>
                                                router.push(
                                                    `/edit/${item.id_mhs}`
                                                )
                                            }
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(item.id_mhs)
                                            }
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
