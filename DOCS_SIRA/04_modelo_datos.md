Para la gestión de la información de S.I.R.A., se propone el Modelo Relacional. Este modelo organiza los datos de forma estructurada mediante tablas interconectadas (como Usuarios, Fichas y Recursos). Su elección permite establecer reglas lógicas claras sobre cómo interactúa la información, evitando la duplicidad de datos, garantizando que ningún archivo quede huérfano y facilitando su posterior desarrollo e implementación en una base de datos SQL.

Entidades y Atributos (Modelo Conceptual) Usuario Representa a cualquier persona que ingresa al sistema (Administradores, Instructores y Aprendices).

id_usuario (Identificador único)

nombre_completo

correo_electronico

contrasena (encriptada)

estado (Activo / Inactivo)

Rol Define los permisos y el nivel de acceso dentro de la plataforma.

id_rol (Identificador único)

nombre_rol (Ej: Administrador, Instructor, Aprendiz)

descripcion

ProgramaFormacion El programa académico al que pertenecen las fichas y las competencias.

id_programa (Identificador único)

codigo_programa (Código institucional)

nombre_programa (Ej: Análisis y Desarrollo de Software)

Ficha El grupo específico de estudiantes asociado a un programa y a un trimestre.

id_ficha (Identificador único)

codigo_ficha (Número de la ficha)

trimestre_actual

Competencia Las unidades de aprendizaje que agrupan los diferentes temas y materiales.

id_competencia (Identificador único)

codigo_competencia

nombre_competencia

RecursoAprendizaje El núcleo del repositorio: los archivos, guías o enlaces subidos al sistema.

id_recurso (Identificador único)

titulo

descripcion

tipo_recurso (Ej: PDF, ZIP, URL, Documento)

ruta_archivo (Dirección de almacenamiento en el servidor)

url_externa (Opcional, si es un enlace)

fecha_subida

tamano_archivo

Relaciones Lógicas del Sistema Para entender cómo se conectan los datos en el flujo del software:

Usuario - Rol (Muchos a Uno): Muchos usuarios pueden compartir el mismo rol, pero un usuario tiene un único rol asignado en el sistema.

Programa - Ficha (Uno a Muchos): Un programa de formación puede tener muchas fichas (cohortes) asociadas, pero una ficha pertenece a un solo programa.

Programa - Competencia (Uno a Muchos): Un programa de formación contiene múltiples competencias académicas.

Ficha - Usuario (Muchos a Muchos): Una ficha tiene muchos aprendices e instructores asociados, y un usuario (especialmente instructores) puede estar vinculado a varias fichas. Nota: Esto se resuelve en la base de datos mediante una tabla intermedia (ej: Matricula o Asignacion_Ficha).

Recurso - Usuario (Muchos a Uno): Muchos recursos pueden ser subidos por el mismo usuario (autor/instructor), pero cada recurso tiene un único propietario inicial.

Recurso - Ficha (Muchos a Uno): Un recurso de aprendizaje se comparte para una ficha específica (o puede dejarse general para el programa).

Recurso - Competencia (Muchos a Uno): Cada recurso se categoriza dentro de una competencia específica para mantener el orden pedagógico.

Esquema Lógico Relacional (Estructura de Tablas) Si vas a pasar esto a SQL o a un diagrama de tablas con llaves primarias (PK) y llaves foráneas (FK), la estructura quedaría así:

ROLES (PK id_rol, nombre_rol, descripcion)

PROGRAMAS (PK id_programa, codigo_programa, nombre_programa)

COMPETENCIAS (PK id_competencia, codigo_competencia, nombre_competencia, FK id_programa)

FICHAS (PK id_ficha, codigo_ficha, trimestre_actual, FK id_programa)

USUARIOS (PK id_usuario, nombre_completo, correo_electronico, contrasena, estado, FK id_rol)

USUARIOS_FICHAS (Tabla intermedia) (PK/FK id_usuario, PK/FK id_ficha)

RECURSOS (PK id_recurso, titulo, descripcion, tipo_recurso, ruta_archivo, url_externa, fecha_subida, tamano_archivo, FK id_usuario, FK id_ficha, FK id_competencia)

Este modelo garantiza que ningún archivo quede "suelto" en el sistema, ya que siempre sabrás quién lo subió, a qué competencia pertenece y qué ficha lo puede visualizar.