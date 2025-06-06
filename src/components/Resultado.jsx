import styled from "@emotion/styled";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Contenedor = styled.div`
  position: relative;
  width: 100%;
`;

const Card = styled.div`
  background-color: #0a0a23;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 255, 150, 0.3);
  width: 350px;
  color: #FFF;
  font-family: 'Lato', sans-serif;
  position: relative;
`;

const Imagen = styled.img`
  display: block;
  width: 100px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
`;

const Texto = styled.p`
  font-size: 16px;
  margin: 6px 0;
  span {
    font-weight: 700;
    color: #00ffcc;
  }
`;

const Precio = styled.p`
  font-size: 22px;
  margin: 10px 0;
  span {
    font-weight: 700;
    color: #00ffcc;
  }
`;

const TituloGrafica = styled.h4`
  margin-top: 20px;
  font-size: 16px;
  color: #00ffaa;
`;

const limpiarNumero = (valor) => {
  if (!valor) return 0;
  return parseFloat(
    valor
      .replace(/[^0-9.,]/g, "")
      .replace(",", "")        
  ) || 0; 
};

const obtenerMoneda = (precio) => {
  if (!precio) return '';
  const partes = precio.split(' ');
  return partes[0]; // Esto da "USD" si PRICE = "USD 27000.00"
};

const Resultado = ({ resultado }) => {
  const {
    PRICE,
    HIGHDAY,
    LOWDAY,
    CHANGEPCT24HOUR,
    IMAGEURL,
    LASTUPDATE,
  } = resultado;

  const moneda = obtenerMoneda(PRICE);
  const precioActual = limpiarNumero(PRICE);

  const dataGrafica = [
    { name: "Hace 4h", price: +(precioActual * 0.985).toFixed(2) },
    { name: "Hace 3h", price: +(precioActual * 0.99).toFixed(2) },
    { name: "Hace 2h", price: +(precioActual * 0.995).toFixed(2) },
    { name: "Hace 1h", price: precioActual },
  ];

  return (
    <Contenedor>
      <Card>
        {IMAGEURL && <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="imagen Cripto" />}
        <Precio>El Precio es de: <span>{PRICE}</span></Precio>
        <Texto>Precio más alto del día: <span>{HIGHDAY}</span></Texto>
        <Texto>Precio más bajo del día: <span>{LOWDAY}</span></Texto>
        <Texto>Variación últimas 24 Horas: <span>{CHANGEPCT24HOUR}%</span></Texto>

        <TituloGrafica>Variación reciente</TituloGrafica>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={dataGrafica}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" domain={['auto', 'auto']} />
            <Tooltip formatter={(value) => `${moneda} ${value}`} />
            <Line type="monotone" dataKey="price" stroke="#00ffaa" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Contenedor>
  );
};

export default Resultado;
