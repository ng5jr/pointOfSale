import { useState, useEffect } from "react";

function PointOfSale({ prods }) {
  const productos = prods;
  const [venta, setVenta] = useState([]);
  const [total, setTotal] = useState(0);

  const [nuevaVenta, setNuevaVenta] = useState(false);

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

  function Submit(e) {
    e.preventDefault();
    const formEle = document.querySelector("form");
    const formDatab = new FormData(formEle);
    fetch(
      "https://script.google.com/macros/s/AKfycby6VkMAQr6Kk2307A8Kmjz2hFHUTWvlcVQYFvgnhuBBXxkyQiRF4RPfs6ba7fzdHEjz/exec",
      {
        method: "POST",
        body: formDatab,
      }
    )
      .then((res) => console.log(res, formDatab))

      .catch((error) => {
        console.log(error);
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
                    <input
                      type="hidden"
                      name={`Subtotal_${index}`}
                      value={item.subtotal}
                    /> */}
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
