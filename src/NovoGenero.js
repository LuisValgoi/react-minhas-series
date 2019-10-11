import React, { useState }from 'react';

const NovoGenero = () => {
  return (
    <div className="container">
      <h1>Novo Genêros</h1>
      <form>
        <div className="form-group">
          <label for="name">Nome do Genêro</label>
          <input type="text" className="form-control" id="name" placeholder="Nome do Gênero" />
        </div>
        <button type="button" class="btn btn-primary">Salvar</button>
      </form>
    </div>
  );
};

export default NovoGenero;