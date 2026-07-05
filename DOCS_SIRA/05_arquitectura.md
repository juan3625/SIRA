Arquitectura del Sistema: S.I.R.A.

Para el desarrollo del Sistema de Información de Repositorios de Aprendizaje (S.I.R.A.), se plantea una Arquitectura Cliente-Servidor basada en el Modelo de 3 Capas. Esta estructura permite separar claramente la interfaz de usuario, las reglas de negocio y el almacenamiento, garantizando un código ordenado, mantenible y escalable.

Capa de Presentación (Frontend / Cliente) Es la interfaz con la que interactúan los administradores, instructores y aprendices. Su objetivo es mostrar la información de manera intuitiva y responsiva.

Tecnologías: HTML5, CSS3 y JavaScript.

Diseño: Se implementará un diseño fluido y adaptable (Responsive Web Design) estructurado principalmente mediante CSS Flexbox para gestionar la alineación y distribución de los elementos (como las tarjetas de recursos y los menús de navegación) en diferentes tamaños de pantalla.

Función: Capturar las interacciones del usuario (como buscar un recurso o subir un archivo) y enviar las peticiones al servidor. Capa de Lógica de Negocio (Backend / Servidor) Es el "cerebro" de la aplicación. Aquí se procesan todas las reglas del sistema, como la autenticación de usuarios, la validación de permisos por roles y la gestión de la subida/descarga de archivos.

Tecnologías: Python apoyado en el framework FastAPI.

Función: FastAPI permitirá construir una API RESTful de alto rendimiento. Esta capa recibe las peticiones HTTP desde el Frontend, ejecuta la lógica necesaria (por ejemplo, verificar si un aprendiz tiene acceso a una ficha específica), interactúa con la base de datos y devuelve una respuesta estructurada (generalmente en formato JSON).

Capa de Datos (Base de Datos) Es el componente encargado del almacenamiento persistente y seguro de toda la información estructurada del sistema.

Tecnologías: Motor de Base de Datos Relacional (SQL).

Función: Alojar las tablas interconectadas del sistema (Usuarios, Roles, Fichas, Programas, Competencias y Recursos). Garantiza la integridad referencial para que las consultas (queries) sean rápidas y no existan datos huérfanos.

Flujo de Comunicación (Cómo interactúan las capas) Petición (Request): Un aprendiz ingresa al Frontend y usa la barra de búsqueda para encontrar una guía de aprendizaje. El Frontend envía una petición HTTP al Backend (API).

Procesamiento: FastAPI (Python) recibe la petición, valida que el aprendiz tenga una sesión activa y ejecuta una consulta SQL.

Consulta (Query): El Backend se conecta a la Base de Datos Relacional buscando los recursos que coincidan con la palabra clave y la ficha del aprendiz.

Respuesta (Response): La Base de Datos devuelve los registros al Backend, este los formatea como un archivo JSON y los envía de vuelta al Frontend.

Visualización: El Frontend toma esos datos JSON y renderiza en pantalla las tarjetas con los documentos listos para descargar.