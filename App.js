import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";

import CampoFormulario from "./components/CampoFormulario";

export default function App() {
  const [formulario, setFormulario] = useState({
    nombreEquipo: "",
    nombreCapitan: "",
    email: "",
    telefono: "",
    categoria: "",
  });

const cambiarCampo = (campo, valor) => {
  const nuevoFormulario = {
    ...formulario,
    [campo]: valor,
  };

  setFormulario(nuevoFormulario);

  const nuevosErrores = {
    ...errores,
  };

  if (campo === "nombreEquipo") {
    if (!valor.trim()) {
      nuevosErrores.nombreEquipo =
        "El nombre del equipo es obligatorio.";
    } else if (valor.trim().length < 3 || valor.trim().length > 20) {
      nuevosErrores.nombreEquipo =
        "Debe tener entre 3 y 20 caracteres.";
    } else {
      delete nuevosErrores.nombreEquipo;
    }
  }

  if (campo === "nombreCapitan") {
    if (!valor.trim()) {
      nuevosErrores.nombreCapitan =
        "El nombre del capitán es obligatorio.";
    } else {
      delete nuevosErrores.nombreCapitan;
    }
  }

  if (campo === "email") {
    if (!valor.trim()) {
      nuevosErrores.email = "El email es obligatorio.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim())
    ) {
      nuevosErrores.email = "Ingresá un email válido.";
    } else {
      delete nuevosErrores.email;
    }
  }

  if (campo === "telefono") {
    if (!valor.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    } else if (!/^\d+$/.test(valor.trim())) {
      nuevosErrores.telefono =
        "El teléfono debe contener solamente números.";
    } else {
      delete nuevosErrores.telefono;
    }
  }

  if (campo === "categoria") {
    if (!valor.trim()) {
      nuevosErrores.categoria = "Seleccioná una categoría.";
    } else {
      delete nuevosErrores.categoria;
    }
  }

  setErrores(nuevosErrores);
};
  const validarFormulario = () => {
    const nuevosErrores = {};

    // Nombre del equipo
    if (!formulario.nombreEquipo.trim()) {
      nuevosErrores.nombreEquipo = "El nombre del equipo es obligatorio.";
    } else if (
      formulario.nombreEquipo.trim().length < 3 ||
      formulario.nombreEquipo.trim().length > 20
    ) {
      nuevosErrores.nombreEquipo =
        "Debe tener entre 3 y 20 caracteres.";
    }

    // Nombre del capitán
    if (!formulario.nombreCapitan.trim()) {
      nuevosErrores.nombreCapitan =
        "El nombre del capitán es obligatorio.";
    }

    // Email
    if (!formulario.email.trim()) {
      nuevosErrores.email = "El email es obligatorio.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email.trim())
    ) {
      nuevosErrores.email = "Ingresá un email válido.";
    }

    // Teléfono
    if (!formulario.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    } else if (!/^\d+$/.test(formulario.telefono.trim())) {
      nuevosErrores.telefono =
        "El teléfono debe contener solamente números.";
    }

    // Categoría
    if (!formulario.categoria.trim()) {
      nuevosErrores.categoria = "Seleccioná una categoría.";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const confirmarInscripcion = () => {
    const formularioValido = validarFormulario();

    if (!formularioValido) {
      return;
    }

    Alert.alert(
      "Inscripción confirmada",
      `El equipo ${formulario.nombreEquipo} fue inscripto correctamente.`
    );
  };

  const formularioCompleto =
    formulario.nombreEquipo.trim() !== "" &&
    formulario.nombreCapitan.trim() !== "" &&
    formulario.email.trim() !== "" &&
    formulario.telefono.trim() !== "" &&
    formulario.categoria.trim() !== "";

  const hayErrores = Object.keys(errores).length > 0;

  const puedeConfirmar = formularioCompleto && !hayErrores;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.titulo}>Inscripción al Torneo</Text>

          <Text style={styles.subtitulo}>
            Torneo de e-sports
          </Text>
        </View>

        <View style={styles.formulario}>
          <CampoFormulario
            label="Nombre del equipo"
            placeholder="Ej: Los Campeones"
            value={formulario.nombreEquipo}
            onChangeText={(valor) =>
              cambiarCampo("nombreEquipo", valor)
            }
            keyboardType="default"
            error={errores.nombreEquipo}
          />

          <CampoFormulario
            label="Nombre del capitán"
            placeholder="Ej: Juan Pérez"
            value={formulario.nombreCapitan}
            onChangeText={(valor) =>
              cambiarCampo("nombreCapitan", valor)
            }
            keyboardType="default"
            error={errores.nombreCapitan}
          />

          <CampoFormulario
            label="Email"
            placeholder="ejemplo@gmail.com"
            value={formulario.email}
            onChangeText={(valor) =>
              cambiarCampo("email", valor)
            }
            keyboardType="email-address"
            error={errores.email}
          />

          <CampoFormulario
            label="Teléfono"
            placeholder="Ej: 1123456789"
            value={formulario.telefono}
            onChangeText={(valor) =>
              cambiarCampo("telefono", valor)
            }
            keyboardType="phone-pad"
            error={errores.telefono}
          />

          <View style={styles.categoriaContainer}>
            <Text style={styles.categoriaTitulo}>
              Categoría
            </Text>

            <View style={styles.botonesCategoria}>
              <TouchableOpacity
                style={[
                  styles.botonCategoria,
                  formulario.categoria === "Sub-16" &&
                    styles.botonCategoriaSeleccionado,
                ]}
                onPress={() =>
                  cambiarCampo("categoria", "Sub-16")
                }
              >
                <Text
                  style={[
                    styles.textoCategoria,
                    formulario.categoria === "Sub-16" &&
                      styles.textoCategoriaSeleccionado,
                  ]}
                >
                  Sub-16
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.botonCategoria,
                  formulario.categoria === "Libre" &&
                    styles.botonCategoriaSeleccionado,
                ]}
                onPress={() =>
                  cambiarCampo("categoria", "Libre")
                }
              >
                <Text
                  style={[
                    styles.textoCategoria,
                    formulario.categoria === "Libre" &&
                      styles.textoCategoriaSeleccionado,
                  ]}
                >
                  Libre
                </Text>
              </TouchableOpacity>
            </View>

            {errores.categoria ? (
              <Text style={styles.errorCategoria}>
                {errores.categoria}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={[
              styles.botonConfirmar,
              !puedeConfirmar && styles.botonDeshabilitado,
            ]}
            disabled={!puedeConfirmar}
            onPress={confirmarInscripcion}
          >
            <Text
              style={[
                styles.textoConfirmar,
                !puedeConfirmar &&
                  styles.textoConfirmarDeshabilitado,
              ]}
            >
              Confirmar inscripción
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
  },

  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 55,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 28,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#171717",
    marginBottom: 6,
  },

  subtitulo: {
    fontSize: 16,
    color: "#666",
  },

  formulario: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },

  categoriaContainer: {
    marginBottom: 20,
  },

  categoriaTitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 10,
  },

  botonesCategoria: {
    flexDirection: "row",
    gap: 10,
  },

  botonCategoria: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  botonCategoriaSeleccionado: {
    backgroundColor: "#222",
    borderColor: "#222",
  },

  textoCategoria: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },

  textoCategoriaSeleccionado: {
    color: "#fff",
  },

  errorCategoria: {
    color: "#d32f2f",
    fontSize: 13,
    marginTop: 6,
  },

  botonConfirmar: {
    backgroundColor: "#222",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 5,
  },

  botonDeshabilitado: {
    backgroundColor: "#d1d1d1",
  },

  textoConfirmar: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  textoConfirmarDeshabilitado: {
    color: "#888",
  },
});