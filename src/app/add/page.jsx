"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
    const [nama, setNama] = useState("");
    const [alamat, setAlamat] = useState("");
    const router = useRouter();

    const handleSaveLocal = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3030/sait_project_api/mahasiswa_api",
                {
                    nama,
                    alamat,
                }
            );

            if (response.data.status === 1) {
                alert("Mahasiswa Added Successfully.");
                router.push("/");
            } else {
                alert("Adding Mahasiswa Failed.");
            }
        } catch (error) {
            alert("Error adding mahasiswa.");
        }
    };

    const handleSaveUbuntu = async () => {
        try {
            const response = await axios.post(
                "http://10.33.35.37/sait_project_api/mahasiswa_api",
                {
                    nama,
                    alamat,
                }
            );

            if (response.data.status === 1) {
                alert("Mahasiswa Added Successfully.");
                router.push("/");
            } else {
                alert("Adding Mahasiswa Failed.");
            }
        } catch (error) {
            alert("Error adding mahasiswa.");
        }
    };

    const handleSave = async () => {
        handleSaveLocal();
        handleSaveUbuntu();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="p-6 bg-white rounded shadow-md w-80">
                <form className="space-y-5">
                    <label className="block">
                        <span className="text-gray-700">Nama:</span>
                        <input
                            type="text"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Alamat:</span>
                        <input
                            type="text"
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </label>
                </form>
                <div className="flex justify-end space-x-2 mt-6">
                    <button
                        onClick={() => router.push("/")}
                        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}
