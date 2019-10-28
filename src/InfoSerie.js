import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom"
import axios from "axios";
import { Badge } from "reactstrap";

const InfoSerie = (props) => {
  const [form, setForm] = useState({});
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState("INFO");
  const [data, setData] = useState({});
  const [genres, setGenres] = useState([]);

  const params = props.match.params;
  const routeId = params.id;
  useEffect(() => {
    axios
      .get("/api/series/" + routeId)
      .then(res => {
        setData(res.data);
        setForm(res.data);
      });
  }, [routeId]);
  useEffect(() => {
    axios
      .get("/api/genres/")
      .then(res => {
        setGenres(res.data)
      });
  }, []);

  const masterHeader = {
    "height": "50vh",
    "minHeight": "500px",
    "backgroundImage": `url('${data.background}')`,
    "backgroundSize": "cover",
    "backgroundPosition": "center",
    "backgroundRepeat": "no-repeat"
  };

  const onChange = field => (event) => {
    setForm({
      ...form,
      [field]: event.target.value
    });
    console.log(form)
  }
  const onSave = () => {
    axios.post("/api/series", {
      name: form
    }).then(() => {
      setSuccess(true);
    });
  };

  if(success) {
    return <Redirect to="/series"/>
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className="h-100" style={{ background:"rgba(0,0,0,0.7)" }}>
          <div className="h-100 container">
            <div className="row h-100 align-items-center">
              <div className="col-3">
                <img alt={data.name} className="img-fluid img-thumbnail" src={data.poster}></img>
              </div>
              <div className="col-8">
                <h1 className="font-weight: light text-white">{data.name}</h1>
                <div className="lead text-white">
                  <Badge color="success">Teste</Badge>
                  Gênero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div>
        <button className="btn btn-primary" onClick={() => setMode("EDIT")}>Editar</button>
      </div>
      { mode === "EDIT" &&
        <div className="container">
          <h1>Nova Série</h1>
          <button className="btn btn-primary" onClick={() => setMode("INFO")}>Descartar</button>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nome da Série</label>
              <input type="text" value={form.name} onChange={onChange("name")} className="form-control" id="name" placeholder="Nome do Série" />
            </div>
            <div className="form-group">
              <label htmlFor="name">Comentários</label>
              <input type="text" value={form.comments} onChange={onChange("comments")} className="form-control" id="name" placeholder="Nome do Série" />
            </div>
            <button type="button" onClick={onSave} className="btn btn-primary">Salvar</button>
          </form>
        </div>
      }
    </div>
  );
};

export default InfoSerie;