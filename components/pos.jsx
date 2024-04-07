import { useState, useEffect } from "react";

function PointOfSale({ prods }) {
  const productos = prods;
  const [venta, setVenta] = useState([]);
  const [total, setTotal] = useState(0);
  const [metodoPago, setMetodoPago] = useState("Cash");
  const [moneda, setMoneda] = useState("USD");
  const [nuevaVenta, setNuevaVenta] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

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
      "https://script.google.com/macros/s/AKfycbwUPI3A_RdEqr2MRO8v6twa-lYeRKqa2s39nuH8OofnYC9J0XEsqkwvym8ZTdC7Nev8/exec",
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
            setSubmitStatus("");
            setVenta([]);
            setTotal(0);
          }, 1000);
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
    <div className="App">
      <>
        <button onClick={() => setNuevaVenta(!nuevaVenta)}>
          {nuevaVenta ? "CANCELAR VENTA" : "NUEVA VENTA"}
        </button>
        {nuevaVenta && (
          <div>
            <h2>INGRESE ORDEN</h2>
            <ul>
              {productos.length !== 0 &&
                productos.map((producto, index) => (
                  <li key={index}>
                    {producto["producto"]} - {producto["precio"]}
                    <button onClick={() => handleAddToCart(producto)}>
                      Add to Cart
                    </button>
                  </li>
                ))}
            </ul>
            <h2>Cart</h2>
            <form className="form" onSubmit={(e) => Submit(e)}>
              <label htmlFor="MetodoPago">Método de Pago:</label>
              <select
                value={metodoPago}
                name="MetodoPago"
                id="MetodoPago"
                onChange={handleMetodoPagoChange}
              >
                <option value="Cash">Efectivo</option>
                <option value="Tarjeta">Tarjeta</option>
              </select>
              <label htmlFor="Moneda">Método de Pago:</label>
              <select
                value={moneda}
                name="Moneda"
                id="Moneda"
                onChange={handleMonedaChange}
              >
                <option value="USD">USD</option>
                <option value="MXN">MXN</option>
              </select>

              {venta.map((item, index) => {
                // Obtener la fecha actual
                const currentDate = new Date().toLocaleDateString();
                const currentTime = new Date().toLocaleTimeString();

                return (
                  <div key={index}>
                    <input
                      type="hidden"
                      name={`Producto_${index}`}
                      value={item.producto}
                    />
                    <input
                      type="hidden"
                      name={`Cantidad_${index}`}
                      value={item.cantidad}
                    />
                    {/* <input
                      type="hidden"
                      name={`Precio_${index}`}
                      value={item.precio}
                    />
                   */}
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
                    {item.producto} - {item.cantidad} x {item.precio} = $
                    {item.subtotal.toFixed(2)}
                    <button
                      type="button"
                      onClick={() => handleRemoveFromCart(index)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
              {/* {venta.map((item, index) => (
                <div key={index}>
                  <input
                    type="hidden"
                    name="Producto"
                    value={item["producto"]}
                  />
                  <input type="hidden" name="Cantidad" value={item.cantidad} />
                  {item["producto"]} - {item.cantidad} x {item["precio"]} = $
                  {item.subtotal.toFixed(2)}
                  <button
                    type="button"
                    onClick={() => handleRemoveFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              ))} */}
              <input className="submitButton" type="submit" value="submit" />
            </form>
            <h2>Total: ${total.toFixed(2)}</h2>
          </div>
        )}
        {submitStatus && <p>{submitStatus}</p>}
      </>

      {/* <div>
        <form className="form" onSubmit={(e) => Submit(e)}>
          <input
            placeholder="Your Name"
            id="FirstName"
            name="FirstName"
            type="text"
          />
          <input
            placeholder="Your Email"
            id="LastName"
            name="LastName"
            type="text"
          />

          <input className="submitButton" type="submit" value="submit" />
        </form>
      </div> */}
    </div>
  );
}

export default PointOfSale;
