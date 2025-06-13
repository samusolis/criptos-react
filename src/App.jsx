import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';
import Error from './components/Error';
import Logocripto from './img/Logocripto.png';

// Estilos
const Contenedor = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 90%;
  display: flex;
  flex-direction: column;

  @media (min-width: 992px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
  }
`;

const ColumnaIzquierda = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 80px;

  @media (max-width: 991px) {
    justify-content: center;
  }
`;

const Imagen = styled.img`
  max-width: 120px;
  width: 100%;
  margin-left: 40px;

  @media (max-width: 991px) {
    margin-left: 0;
  }
`;

const ColumnaCentro = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 80px;

  @media (max-width: 991px) {
    margin-top: 40px;
    justify-content: center;
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
      <ColumnaIzquierda>
        <Imagen src={Logocripto} alt="imagen criptomonedas" />
      </ColumnaIzquierda>

      <ColumnaCentro>
        <Heading>Cotiza Criptomonedas Ya!</Heading>
        {error && <Error>TODOS LOS CAMPOS SON OBLIGATORIOS</Error>}
        <Formulario setMonedas={setMonedas} />
      </ColumnaCentro>

      <ContenedorResultado>
        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado} />}
      </ContenedorResultado>
    </Contenedor>
  );
}

export default App;
