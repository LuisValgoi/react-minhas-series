import React, { useState } from 'react';
import { Redirect } from "react-router-dom"
import axios from "axios";

const NovoGenero = () => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const onChange = (event) => {
    setName(event.target.value);
  }
  const onSave = () => {
    axios.post("/api/genres", {
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
      <h1>Novo Genêros</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome do Genêro</label>
          <input type="text" value={name} onChange={onChange} className="form-control" id="name" placeholder="Nome do Gênero" />
        </div>
        <button type="button" onClick={onSave} className="btn btn-primary">Salvar</button>
      </form>
    </div>
  );
};

export default NovoGenero;