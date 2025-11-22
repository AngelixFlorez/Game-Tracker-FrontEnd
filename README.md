# Game Tracker Frontend

## Descripción
Este proyecto es el frontend para la aplicación **Game Tracker**. Es una aplicación web moderna y responsiva construida con React y Vite, diseñada para ofrecer una experiencia de usuario fluida similar a plataformas de streaming como Netflix. Permite a los usuarios explorar su biblioteca de juegos, ver detalles y gestionar reseñas.

## Funcionalidades Principales
- **Interfaz Moderna**: Diseño atractivo con modo oscuro, gradientes y animaciones suaves.
- **Catálogo de Juegos**: Visualización de juegos en formato de cuadrícula y listas.
- **Detalle de Juegos**: Modales interactivos con información detallada de cada juego.
- **Gestión de Reseñas**: Interfaz para añadir y visualizar reseñas con calificación de estrellas.
- **Diseño Responsivo**: Adaptable a diferentes tamaños de pantalla.

## Tecnologías Usadas
- **React**: Librería de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de construcción rápida para proyectos web modernos.
- **Tailwind CSS**: Framework de CSS utilitario para un diseño rápido y personalizado.
- **React Router**: Enrutamiento dinámico para la navegación entre páginas.
- **Axios**: Cliente HTTP para realizar peticiones al backend.
- **React Icons**: Colección de iconos populares para React.

## Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/AngelixFlorez/Game-Tracker-FrontEnd.git
    cd Game-Tracker-FrontEnd
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar conexión con el Backend:**
    Asegúrate de que el backend esté ejecutándose (por defecto en el puerto 3000). La configuración del proxy se encuentra en `vite.config.js`.

4.  **Iniciar la aplicación:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:3001` (o el puerto que indique la consola).

## Estructura del Proyecto
- `src/componentes/`: Componentes reutilizables de la interfaz (botones, tarjetas, modales).
- `src/paginas/`: Vistas principales de la aplicación (Inicio, Biblioteca, Gestión).
- `src/styles/`: Archivos de estilos globales y configuración de Tailwind.
- `src/App.jsx`: Componente raíz que define las rutas.
- `src/main.jsx`: Punto de entrada de la aplicación React.
