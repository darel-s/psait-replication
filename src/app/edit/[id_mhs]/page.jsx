"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EditMahasiswa({ params }) {
    const id_mahasiswa = params.id_mhs;
    const router = useRouter();

    const [mahasiswa, setMahasiswa] = useState(null);
    const [nama, setNama] = useState("");
    const [alamat, setAlamat] = useState("");

    useEffect(() => {
        if (id_mahasiswa) {
            fetchMahasiswa();
        }
    }, [id_mahasiswa]);

    const fetchMahasiswa = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3030/sait_project_api/mahasiswa_api/${id_mahasiswa}`
            );
            setMahasiswa(response.data);
            setNama(response.data.nama);
            setAlamat(response.data.alamat);
        } catch (error) {
            console.error("Error fetching mahasiswa: ", error);
        }
    };

    const updateMahasiswaLocal = async () => {
        try {
            const response = await axios.put(
                `http://localhost:3030/sait_project_api/mahasiswa_api/${id_mahasiswa}`,
                {
                    nama,
                    alamat,
                }
            );

            if (response.data.status === 1) {
                alert("Mahasiswa Updated Successfully.");
                router.push("/");
            } else {
                alert("Updating Mahasiswa Failed.");
            }
        } catch (error) {
            console.error("Error updating mahasiswa: ", error);
        }
    };

    const updateMahasiswaUbuntu = async () => {
        try {
            const response = await axios.put(
                `http://10.33.35.37/sait_project_api/mahasiswa_api/${id_mahasiswa}`,
                {
                    nama,
                    alamat,
                }
            );

            if (response.data.status === 1) {
                alert("Mahasiswa Updated Successfully.");
                router.push("/");
            } else {
                alert("Updating Mahasiswa Failed.");
            }
        } catch (error) {
            console.error("Error updating mahasiswa: ", error);
        }
    };

    const handleUpdate = async () => {
        updateMahasiswaLocal();
        updateMahasiswaUbuntu();
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
                        onClick={handleUpdate}
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}
