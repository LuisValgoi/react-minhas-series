import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios";

const Series = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/api/series").then(res => {
      setData(res.data.data);
    });
  }, []);
  
  const deleteRecord = (id) => {
    axios.delete("/api/series/" + id).then((res) => {
      const filtrado = data.filter(res => res.id !== id);
      setData(filtrado)
    });
  };

  const renderizaLinha = (record) => {
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        <td>
          <Link className="btn btn-info" to={"/series/" + record.id}>Editar</Link>
          <button className="btn btn-danger" onClick={() => deleteRecord(record.id)}>Remover</button>
        </td>
      </tr>
    );
  }

  if (data.length === 0) {
    return (
      
      <div className="container">
        <h1>Séries</h1>
        <div>
          <Link to="/series/novo" className="btn btn-primary">Nova Série</Link>
        </div>
        <div className="alert alert-warning" role="alert">
          Você não possui séries criadas.
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Séries</h1>

      <div>
        <Link to="/series/novo" className="btn btn-primary">Nova Série</Link>
      </div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(renderizaLinha)}
        </tbody>
      </table>
    </div>
  );
};

export default Series;