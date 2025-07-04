import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'

const InputSubmit = styled.input`
    background-color:  #1e9028;
    border: none;
    padding: 10px;
    width: 100%;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #3ea447;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas)
    const [ criptomoneda, SelectCriptomoneda ] = useSelectMonedas('Elige tu Criptomoneda', criptos)  //cuando se hace la consulta en el array esos datos se pasan aqui

    useEffect(() =>{
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map( cripto => {

                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre:cripto.CoinInfo.FullName
                }
                return objeto
                

            })
            setCriptos(arrayCriptos)
        
        }
        consultarAPI(); //la vamos a llamar solo una vez para que nos traiga los datos que necesitemos
    },[])

    const handleSubmit = e => {
        e.preventDefault()

    if ([moneda, criptomoneda].includes('')) {
        setError(true)
        
        return
    }
    setError(false)
    setMonedas({
        moneda,
        criptomoneda
    })
    }

    return (
    <>
        {error && <Error>TODOS LOS CAMPOS SON OBLIGATORIOS</Error>}
        <form
            onSubmit={handleSubmit}
        >

            <SelectMonedas/>
            <SelectCriptomoneda/>

            
            <InputSubmit 
                type="submit" 
                value="Cotizar"
            />
        </form>
    </>
    )
}

export default Formulario
