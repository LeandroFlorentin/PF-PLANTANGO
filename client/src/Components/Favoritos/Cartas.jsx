import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFav, editPlantforLike, getFav } from "../../redux/actions";
import "./Favoritos.css";

const CartasFavoritos = ({ items }) => {
  const user = useSelector((e) => e.user);
  const dispatch = useDispatch();
  function eliminarFav(e, items) {
    e.preventDefault();
    dispatch(deleteFav(user.idUser, items.codPlant));
    dispatch(editPlantforLike({
      codPlant: items.codPlant,
      namePlant: items.namePlant,
      descripPlant: items.descripPlant,
      tipo: items.tipo,
      imagePlant: items.imagePlant,
      likes: items.likes - 1,
    }))
    dispatch(getFav(user.idUser));
  }
  return (
    <div className="cardCartaFav">
      {items.imagePlant && (
        <Link
          key={items.codPlant}
          to={`/huerta/${items.codPlant}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <img
            src={items.imagePlant}
            alt="Un producto"
            loading="lazy"
            className="imagen cabeza"
          />
        </Link>
      )}
      <div className="cuerpo">
        <div>
          {items.namePlant && (
            <h3 className="cuerpo-titulo">{items.namePlant}</h3>
          )}
          {items.namePlant?.split(",").slice(1) && (
            <h4 className="cuerpo-subtitulo">
              {items.namePlant?.split(",").slice(1)}
            </h4>
          )}
          {items.tipo && (
            <p className="cuerpo-caracteristica">
              {items.tipo.map((caracteristica, i) => (
                <span
                  className="cuerpo-caracteristica-caracteristica"
                  key={i}
                >
                  {caracteristica}
                </span>
              ))}
            </p>
          )}
        </div>
        {items.precio && (
          <p className="cuerpo-precio">${items.precio / 100}</p>
        )}
        <button className="favON" onClick={(e) => eliminarFav(e, items)} />
      </div>
    </div>
  );
};

export default CartasFavoritos;
