import { useState, useEffect } from "react";

export default function BuscarClube() {
    const [clubes, setClubes] = useState([]);
    const [erro, setErro] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.cartola.globo.com/clubes`);
            const data = await response.json();
            const clubesList = Object.values(data);
            setClubes(clubesList);
        } catch (error) {
            setErro(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="containerApi">
            {erro && <p>Ocorreu um erro: {erro.message}</p>}
            <ul className="lista">
            {clubes.slice(1).map((clube) => (
                    <li key={clube.id} style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={clube.escudos['60x60']}
                            alt={`${clube.nome} logo`}
                            className="escudos"
                        />
                        <div className="timesTxt">
                            <p className="nomeTime">{clube.nome}</p>
                            <p className="apelidoTime">{clube.apelido}</p>
                        </div>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    );
}