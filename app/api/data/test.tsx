"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/data")
      .then(res => res.json())
      .then(d => setData(d.data));
  }, []);

  return (
    <div>
      <h1>Data dari Google Sheets</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
