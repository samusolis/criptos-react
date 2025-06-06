import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'
import Error from './components/Error' // Importamos el componente de error

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 4rem;
  }
`;

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 40px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #1e9028;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

const ContenedorResultado = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;

  @media (min-width: 992px) {
    padding-top: 150px;
  }
`;

function App() {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setCargando(true);
        setResultado({});
        setError(false);

        const { moneda, criptomoneda } = monedas;

        if (!moneda || !criptomoneda) {
          setError(true);
          setCargando(false);
          return;
        }

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado.DISPLAY[criptomoneda][moneda]);
        setCargando(false);
      };

      cotizarCripto();
    }
  }, [monedas]);

  return (
    <Contenedor>
      <div>
        <Heading>Cotiza Criptomonedas Ya!</Heading>

        {error && <Error>TODOS LOS CAMPOS SON OBLIGATORIOS</Error>}

        <Formulario setMonedas={setMonedas} />
      </div>

      <ContenedorResultado>
        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado} />}
      </ContenedorResultado>
    </Contenedor>
  );
}

export default App;
