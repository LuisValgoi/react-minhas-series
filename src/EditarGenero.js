import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom"
import axios from "axios";

const EditarGenero = (props) => {
  const params = props.match.params;
  const routeId = params.id;
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get("/api/genres/" + routeId).then((res) => {
      setName(res.data.name);
    })
  }, [routeId]);

  const onChange = (event) => {
    setName(event.target.value);
  }
  const onEdit = (id) => {
    axios.put("/api/genres/" + id, {
      name: name
    }).then(() => {
      setSuccess(true);
    });
  };

  if(success) {
    return <Redirect to="/generos"/>
  }

  return (
    <div className="container">
      <h1>Editar Genêros</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome do Genêro</label>
          <input type="text" value={name} onChange={onChange} className="form-control" id="name" placeholder="Nome do Gênero" />
        </div>
        <button type="button" onClick={() => onEdit(routeId)} className="btn btn-primary">Salvar</button>
      </form>
    </div>
  );
};

export default EditarGenero;