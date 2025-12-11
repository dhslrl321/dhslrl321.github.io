import {useEffect, useState} from "react";

export default function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("./data.json", {cache: "no-store"})
            .then((res) => res.json())
            .then(setData)
            .catch(console.error);
    }, []);

    return (
        <div style={{padding: 20, fontFamily: "sans-serif"}}>
            <h1>GitHub Data Dashboard</h1>
            <p style={{opacity: 0.7}}>자동 수집된 data.json을 렌더링합니다.</p>

            {data.length === 0 && <p>No data yet.</p>}

            {data
                .slice()
                .reverse()
                .map((item) => (
                    <div key={item.id}
                         style={{
                             border: "1px solid #ccc",
                             padding: 12,
                             borderRadius: 8,
                             marginTop: 20
                         }}>
                        <div style={{fontSize: 12, opacity: 0.7}}>
                            {item.fetchedAt}
                        </div>
                        <pre style={{
                            background: "#111",
                            padding: 10,
                            color: "#0f0",
                            overflowX: "auto",
                            borderRadius: 6,
                            marginTop: 10
                        }}>
              {JSON.stringify(item.payload, null, 2)}
            </pre>
                    </div>
                ))}
        </div>
    );
}
