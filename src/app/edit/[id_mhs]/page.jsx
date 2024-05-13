"use client";

import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EditMahasiswa() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [mahasiswa, setMahasiswa] = useState(null);

    useEffect(() => {
        if (id) {
            fetchMahasiswa();
        }
    }, [id]);

    const fetchMahasiswa = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3030/sait_project_api/mahasiswa_api/${id}`
            );
            setMahasiswa(response.data);
        } catch (error) {
            console.error("Error fetching mahasiswa: ", error);
        }
    };

    return <div></div>;
}
