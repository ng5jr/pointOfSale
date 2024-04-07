import { useState, useEffect } from "react";
import DeleteIcon from "../public/delete.png";
import Image from "next/image";

function PointOfSale({ prods }) {
  const productos = prods;
  const [venta, setVenta] = useState([]);
  const [total, setTotal] = useState(0);
  const [metodoPago, setMetodoPago] = useState("Cash");
  const [moneda, setMoneda] = useState("USD");
  const [nuevaVenta, setNuevaVenta] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [valueMXN, setValueMXN] = useState(15);

  const handleAddToCart = (producto) => {
    const item = {
      ...producto,
      cantidad: 1,
      subtotal: parseFloat(producto["precio"].replace("$", "")),
    };
    // @ts-ignore
    setVenta([...venta, item]);
    setTotal(total + item.subtotal);
  };

  const handleRemoveFromCart = (index) => {
    const itemToRemove = venta[index];
    setVenta(venta.filter((item, i) => i !== index));
    // @ts-ignore
    setTotal(total - itemToRemove.subtotal);
  };

  const handleMetodoPagoChange = (event) => {
    setMetodoPago(event.target.value); // Actualizar el estado metodoPago
  };
  const handleMonedaChange = (event) => {
    setMoneda(event.target.value); // Actualizar el estado metodoPago
  };

  function Submit(e) {
    e.preventDefault();
    const formEle = document.querySelector("form");
    const formDatab = new FormData(formEle);
    fetch(
      "https://script.google.com/macros/s/AKfycby4p8LxyrxwBuUIxA8gMJRjRMZVdsD3BV8OkBHJLXyvRtUpSVyZVVHIqzh0gXXSUi6b/exec",
      {
        method: "POST",
        body: formDatab,
      }
    )
      .then((response) => {
        if (response.ok) {
          // If submission is successful, set submitStatus to indicate success
          setSubmitStatus("VENTA REGISTRADA");
          setTimeout(() => {
            setVenta([]);
            setTotal(0);
            setNuevaVenta(false);
          }, 1000);
          setTimeout(() => {
            setSubmitStatus("");
          }, 2000);
        } else {
          // If submission fails, set submitStatus to indicate failure
          setSubmitStatus("ERROR, INTENTE NUEVAMENTE");
        }
      })
      .catch((error) => {
        // If an error occurs during submission, set submitStatus to indicate error
        setSubmitStatus("An error occurred. Please try again later.");
        console.error("Error submitting form:", error);
      });
  }

  return (
    <div className="pos">
      <>
        <div className="venta">
          <button
            className="button"
            onClick={() => {
              if (nuevaVenta) {
                setSubmitStatus("");
                setVenta([]);
                setTotal(0);
              }

              setNuevaVenta(!nuevaVenta);
            }}
          >
            {nuevaVenta ? "CANCELAR VENTA" : "NUEVA VENTA"}
          </button>
        </div>

        {nuevaVenta && (
          <div className="orden">
            <h2 className="section-title">INGRESE ORDEN</h2>
            <div className="cambio">
              <h3>Cambio del día</h3>
              <input
                className="valueMXN"
                type="text"
                value={valueMXN}
                onChange={(e) => {
                  setValueMXN(e.target.value);
                }}
              />
            </div>
            <ul className="products-list">
              {productos.length !== 0 &&
                productos.map((producto, index) => (
                  <li key={index} className="product-item">
                    <span className="product-name">
                      {producto["producto"]} - {producto["precio"]}
                    </span>
                    <button
                      className="button"
                      onClick={() => handleAddToCart(producto)}
                    >
                      Agregar
                    </button>
                  </li>
                ))}
            </ul>
            <h2 className="section-title">CARRITO</h2>
            <form className="form" onSubmit={(e) => Submit(e)}>
              <div className="cart-items">
                {venta.map((item, index) => {
                  const currentDate = new Date().toLocaleDateString("es-MX");
                  const currentTime = new Date().toLocaleTimeString();

                  return (
                    <div key={index} className="cart-item">
                      <input
                        type="hidden"
                        name={`Producto_${index}`}
                        value={item.producto}
                      />
                      <input
                        type="hidden"
                        name={`Cambiousado_${index}`}
                        value={valueMXN}
                      />
                      <input
                        type="hidden"
                        name={`Precio_${index}`}
                        value={item.precio}
                      />
                      <input
                        type="hidden"
                        name={`Cantidad_${index}`}
                        value={item.cantidad}
                      />
                      <input
                        type="hidden"
                        name={`Fecha_${index}`}
                        value={currentDate}
                      />
                      <input
                        type="hidden"
                        name={`Hora_${index}`}
                        value={currentTime}
                      />
                      <input
                        type="hidden"
                        name={`Metodopago_${index}`}
                        value={metodoPago}
                      />
                      <input
                        type="hidden"
                        name={`Moneda_${index}`}
                        value={moneda}
                      />
                      <span>
                        {item.producto} - {item.cantidad} x {item.precio} = $
                        {item.subtotal.toFixed(2)}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleRemoveFromCart(index)}
                        className="button delete"
                      >
                        <Image alt="deleteIcon" src={DeleteIcon} />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="checkout">
                <div className="totales">
                  <span className="cart-total">
                    Total: USD {total.toFixed(2)} / MXN{" "}
                    {(total.toFixed(2) * valueMXN).toFixed(2)}
                  </span>
                </div>
                <div className="selectores">
                  <div className="metodo">
                    <label htmlFor="MetodoPago">Método de Pago:</label>
                    <select
                      value={metodoPago}
                      name="MetodoPago"
                      id="MetodoPago"
                      onChange={handleMetodoPagoChange}
                      className="select-input"
                    >
                      <option value="Cash">Efectivo</option>
                      <option value="Tarjeta">Tarjeta</option>
                    </select>
                  </div>
                  <div className="monedas">
                    <label htmlFor="Moneda">Moneda:</label>
                    <select
                      value={moneda}
                      name="Moneda"
                      id="Moneda"
                      onChange={handleMonedaChange}
                      className="select-input"
                    >
                      <option value="USD">USD</option>
                      <option value="MXN">MXN</option>
                    </select>
                  </div>
                </div>
                <input
                  className="submitButton button"
                  type="submit"
                  value="Registrar Venta"
                />
              </div>
            </form>
          </div>
        )}
      </>
      {submitStatus && <p className="submit-message">{submitStatus}</p>}
    </div>
  );
}

export default PointOfSale;
