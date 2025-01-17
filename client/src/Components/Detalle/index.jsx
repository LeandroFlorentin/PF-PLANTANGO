import { ArtTrackSharp, SetMealOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import './Detalle.css'

const Detalle = (props) => {
  const [item, setItem] = useState({});
  const { id } = useParams();

  //   faltaria agregar "breadcrumbs" para volver hacia atras , etc

  useEffect(() => {
    props.from(id).then((plant) => {
      setItem(plant);
    });
  }, []);
  return (
    <>
      <div className="container-fluid media altoMedia">
        {item.img ? (
          <img
            src={item?.img}
            className="card"
            style={{
              borderRadius: "2rem",
              objectFit: "cover",
              width: "100%",
              height: 'auto'
            }}
          />
        ) : null}
        <div className="media-body ml-4" style={{ minWidth: "50vw" }}>
          {item.title ? (
            <h1 className="mt-0" style={{ textTransform: "uppercase" }}>
              <strong>{item.title}</strong>
            </h1>
          ) : null}
          {item.subtitle ? (
            <h2 style={{ fontStyle: "italic" }}>{item.subtitle}</h2>
          ) : null}
          {item.description ? (
            <p className="card p-4">{item.description}</p>
          ) : null}
          {item.caracteristics
            ? item.caracteristics.map((carac, i) => (
              <div className="" key={i}>
                <h5>
                  <strong style={{ textTransform: "uppercase" }}>
                    {carac.type}
                  </strong>
                </h5>
                <h6>{carac.value}</h6>
              </div>
            ))
            : null}
        </div>
      </div>
    </>
  );
};

export default Detalle;
