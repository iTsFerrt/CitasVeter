import { useState, useEffect, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { FaDog, FaEdit, FaTrash } from 'react-icons/fa'

// Componente Header optimizado con memo
const Header = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-10"
    >
      <h1 className="font-black text-5xl md:w-2/3 mx-auto">
        Seguimiento Pacientes {''}
        <span className="text-indigo-600">Veterinaria</span>
      </h1>
      <p className="mt-5 text-gray-600">
        Administra tus pacientes y citas de manera eficiente
      </p>
    </motion.div>
  )
})

// Componente Formulario optimizado
const Formulario = memo(({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
  })

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setFormData(paciente)
    }
  }, [paciente])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    if (Object.values(formData).some(value => !value)) {
      toast.error('Todos los campos son obligatorios')
      return
    }

    if (paciente.id) {
      // Editando
      const pacientesActualizados = pacientes.map(pacienteState =>
        pacienteState.id === paciente.id ? { ...formData, id: paciente.id } : pacienteState
      )
      setPacientes(pacientesActualizados)
      toast.success('Paciente actualizado correctamente')
    } else {
      // Nuevo registro
      const nuevoPaciente = {
        ...formData,
        id: Date.now().toString()
      }
      setPacientes([...pacientes, nuevoPaciente])
      toast.success('Paciente agregado correctamente')
    }

    setPaciente({})
    setFormData({
      nombre: '',
      propietario: '',
      email: '',
      fecha: '',
      sintomas: ''
    })
  }, [formData, paciente, pacientes, setPacientes, setPaciente])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="md:w-1/2 lg:w-2/5 mx-5"
    >
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        <div className="mb-5">
          <label htmlFor="nombre" className="block text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Nombre de la Mascota"
            className="input mt-2"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
            Nombre Propietario
          </label>
          <input
            id="propietario"
            name="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="input mt-2"
            value={formData.propietario}
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email Contacto Propietario"
            className="input mt-2"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="fecha" className="block text-gray-700 uppercase font-bold">
            Fecha
          </label>
          <input
            id="fecha"
            name="fecha"
            type="date"
            className="input mt-2"
            value={formData.fecha}
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="sintomas"
            name="sintomas"
            className="input mt-2"
            placeholder="Describe los Síntomas"
            value={formData.sintomas}
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          className="btn btn-primary w-full"
          value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
        />
      </form>
    </motion.div>
  )
})

// Componente Paciente optimizado
const Paciente = memo(({ paciente, setPaciente, eliminarPaciente }) => {
  const { nombre, propietario, email, fecha, sintomas, id } = paciente

  const handleEliminar = useCallback(() => {
    if (window.confirm('¿Deseas eliminar este paciente?')) {
      eliminarPaciente(id)
      toast.success('Paciente eliminado correctamente')
    }
  }, [eliminarPaciente, id])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white shadow-md rounded-lg p-5 mb-5"
    >
      <div className="flex items-center gap-3 mb-3">
        <FaDog className="text-indigo-600 text-2xl" />
        <h3 className="font-bold text-xl">{nombre}</h3>
      </div>

      <div className="space-y-2">
        <p className="text-gray-600">
          <span className="font-bold">Propietario:</span> {propietario}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Email:</span> {email}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Fecha:</span> {fecha}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Síntomas:</span> {sintomas}
        </p>
      </div>

      <div className="flex justify-end gap-3 mt-5">
        <button
          type="button"
          className="btn btn-primary flex items-center gap-2"
          onClick={() => setPaciente(paciente)}
        >
          <FaEdit /> Editar
        </button>

        <button
          type="button"
          className="btn btn-danger flex items-center gap-2"
          onClick={handleEliminar}
        >
          <FaTrash /> Eliminar
        </button>
      </div>
    </motion.div>
  )
})

// Componente ListadoPacientes optimizado
const ListadoPacientes = memo(({ pacientes, setPaciente, eliminarPaciente }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll"
    >
      {pacientes && pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {''}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>

          <AnimatePresence>
            {pacientes.map(paciente => (
              <Paciente
                key={paciente.id}
                paciente={paciente}
                setPaciente={setPaciente}
                eliminarPaciente={eliminarPaciente}
              />
            ))}
          </AnimatePresence>
        </>
      ) : (
        <div className="text-center">
          <h2 className="font-black text-3xl">No hay pacientes</h2>
          <p className="text-xl mt-5 mb-10">
            Comienza agregando pacientes {''}
            <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
          </p>
        </div>
      )}
    </motion.div>
  )
})

// Componente principal App
function App() {
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})

  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? []
      setPacientes(pacientesLS)
    }
    obtenerLS()
  }, [])

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])

  const eliminarPaciente = useCallback(id => {
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)
    setPacientes(pacientesActualizados)
  }, [pacientes])

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App 