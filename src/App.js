import './App.css';
import { useState } from 'react';

function App() {

  const [nombreAutor, setNombreAutor] = useState("")
  const [apellidoAutor, setApellidoAutor] = useState("")
  const [year, setYear] = useState("")
  const [titulo, setTitulo] = useState("")
  const [numPag, setNumPag] = useState("")
  const [fuente, setFuente] = useState("")

  const [state, setState] = useState(false)
  const [inc, setInc] = useState(false)
  const [error, setError] = useState(false)
  const [apa, setApa] = useState({})

  let values = []

  function converter(array){
    // Cita narrativa (basada en el autor)
    let autor = `${array[1]} (${array[2]})`
    let pag = `(p. ${array[4]})`

    // Cita en paréntesis (basada en el texto)
    let cita2 = `(${array[1]}, ${array[2]}, p.${array[4]})`

    // Referencia
    let reference = `${array[1]}, ${array[0].slice(0,1).toUpperCase()}. (${array[2]}). ${array[3]}. ${array[5]}`

    setApa({cita1:{autor,pag},cita2,reference,separation:"|(tu texto)|"})

    if(apa != {}){
      return true
    }else{
      return false
    }

  }

  function controller(){
    values.push(nombreAutor, apellidoAutor, year, titulo, numPag, fuente)

    if(values.includes("")){
      console.log("inc")
      setInc(true)
    }else{
      console.log("ok")
      let conversion = converter(values)

      if(conversion = false){
        setError(true)
      }else{
        setState(true)
        values = []
      }
    }
  }

  function reset(){
    setInc(false)
    setState(false)
    setApa({})
  }

  return (
    <div class="container">
        <h1>Creador de citas APA</h1>
        {state == false ? <form action="" class="form">
            <div class="field">
                <label for="">Nombre de autor</label>
                <input type="text" value={nombreAutor} onChange={(e)=>{setNombreAutor(e.target.value)}} placeholder="Eduardo" />
            </div>
            <div class="field">
                <label for="">Apellido de autor</label>
                <input type="text" value={apellidoAutor} onChange={(e)=>{setApellidoAutor(e.target.value)}} placeholder="Galeano" />
                <p class="advice">En caso de tener más de un autor, ponga solamente el nombre y apellido de uno de ellos.</p>
            </div>
            <div class="field">
                <label for="">Año / Fecha</label>
                <input type="text" value={year} onChange={(e)=>{setYear(e.target.value)}} placeholder="1971" />
            </div>
            <div class="field">
                <label for="">Título</label>
                <input type="text" value={titulo} onChange={(e)=>{setTitulo(e.target.value)}} placeholder="Las venas abiertas de América Latina" />
            </div>
            <div class="field">
                <label for="">Número de página</label>
                <input type="text" value={numPag} onChange={(e)=>{setNumPag(e.target.value)}} placeholder="87" />
            </div>
            <div class="field">
                <label for="">Fuente (editorial, universidad u otras)</label>
                <input type="text" value={fuente} onChange={(e)=>{setFuente(e.target.value)}} placeholder="Siglo XXI" />
            </div>
            {inc == true && <p className="error">Por favor, rellenar los datos vacíos. En caso de no tenerlos, ponga en el campo la palabra "Nulo".</p>}
            {error == true && <p className="error">Hubo un error. Por favor, intente más tarde.</p>}
            <button className="main-btn" onClick={(e)=>{e.preventDefault();controller()}}>Crear</button>
        </form> 
        :
        <div className="results">
          <h2>Resultados</h2>
          <h3 class="null-advice">En caso de haber ingresado "NULO" por un valor incompleto, el campo sin valor no debe ser incluido en la cita.</h3>
          {apa != {} ?
            <>
              <div className="field">
                <h3>Cita narrativa (basada en el autor)</h3>
                <p className="result">{apa.cita1.autor} <span class="advice">{apa.separation}</span> {apa.cita1.pag}</p>
              </div>
              <div className="field">
                <h3>Cita en paréntesis (basada en el texto)</h3>
                <p className="result">{apa.cita2}</p>
              </div>
              <div className="field">
                <h3>Referencia bibliográfica</h3>
                <p className="result">{apa.reference}</p>
                <p className="advice">En caso de haber más de un autor en esta referencia, se lo debe agregar con el mismo formato que el primero. Por ejemplo: Apellido, A., Apellido, B., Autor, C.</p>
              </div>
            </>
          : <h2>ERROR. Por favor intente más tarde</h2>}
          <button className="main-btn" onClick={reset}>Volver al inicio</button>
        </div>
        }
    </div>
  );
}

export default App;
