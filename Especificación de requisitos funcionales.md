# 📋 Especificación de Requisitos Funcionales

#### 1\. Módulo de Identidad y Acceso (Auth) 🔐

* RF01: El sistema debe contar con un usuario "Administrador Maestro" inicial (Seed).
* RF02: El sistema debe permitir el registro de nuevos usuarios con el rol de "Empleado" por defecto.
* RF03: El sistema debe permitir el inicio de sesión (Login) y gestión de sesiones mediante JWT.
* RF04: El sistema debe permitir a los empleados solicitar un cambio de rol a "Administrador".
* RF05: El sistema debe permitir al Administrador Maestro aprobar o rechazar solicitudes de cambio de rol.

#### 2\. Módulo de Catálogo y Definiciones 📦

* RF06: El sistema debe permitir el CRUD (Crear, Leer, Actualizar, Eliminar) de productos.
* RF07: El sistema debe permitir la gestión de categorías para agrupar productos.
* RF08: El sistema debe permitir asignar una o varias categorías a un producto.
* RF09: El sistema debe permitir la carga y almacenamiento de imágenes para cada producto.
* RF10: El sistema debe permitir el registro y gestión de proveedores (Nombre, contacto, dirección, web).
* RF11: El sistema debe asociar cada producto con su proveedor correspondiente.

#### 3\. Módulo de Identificación y QR 🏷️

* RF12: El sistema debe generar un código QR único basado en el identificador o SKU de cada producto.
* RF13: El sistema debe permitir que, al escanear el QR, se muestre la información detallada y stock actual del producto en una vista móvil.

#### 4\. Módulo de Inventario y Movimientos 🔄

* RF14: El sistema debe permitir registrar "Entradas" de mercancía para aumentar el stock físico.
* RF15: El sistema debe permitir registrar "Salidas" (ventas o mermas) para disminuir el stock.
* RF16: El sistema debe mantener un historial (Kardex) de todos los movimientos de stock realizados.

#### 5\. Módulo de Alertas y Reportes 📊

* RF17: El sistema debe notificar automáticamente cuando un producto alcance su stock mínimo configurado.
* RF18: El sistema debe generar reportes de valorización (Total de dinero invertido en el inventario actual).


# 📋 Especificación Completa: RF e Historias de Usuario

#### 1\. Módulo de Identidad y Acceso (Auth) 🔐

* RF01 (Admin Maestro), RF02 (Registro), RF03 (Login):

&nbsp;	HU01: Como Usuario nuevo, quiero registrarme e iniciar sesión para acceder a las funciones del sistema según mi rol.

* RF04 (Solicitud de cambio), RF05 (Aprobación):

&nbsp;	HU02: Como Empleado, quiero solicitar un ascenso a Administrador para poder gestionar el inventario completo.

&nbsp;	HU03: Como Administrador Maestro, quiero revisar las solicitudes de cambio de rol para mantener la seguridad del sistema.

#### 2\. Módulo de Catálogo y Definiciones 📦

* RF06 (CRUD Productos):

&nbsp;	HU04: Como Administrador, quiero crear y editar productos para mantener el catálogo actualizado.

* RF07, RF08 (Categorías):

&nbsp;	HU05: Como Usuario, quiero clasificar productos por categorías para encontrarlos más fácilmente.

* RF09 (Imágenes):

&nbsp;	HU06: Como Usuario, quiero ver fotos de los productos para identificarlos visualmente sin errores.

* RF10, RF11 (Proveedores):

&nbsp;	HU07: Como Administrador, quiero registrar proveedores y asociarlos a productos para saber a quién comprarle cuando se agote el stock.

#### 3\. Módulo de Identificación y QR 🏷️

* RF12, RF13 (Generación y Escaneo QR):

&nbsp;	HU08: Como Empleado, quiero escanear un código QR con mi celular para ver el stock actual de un producto de forma inmediata en el pasillo del almacén.

#### 4\. Módulo de Inventario y Movimientos 🔄

* RF14, RF15 (Entradas y Salidas):

&nbsp;	HU09: Como Empleado, quiero registrar la entrada o salida de mercancía para que el stock real coincida con el sistema.

* RF16 (Kardex/Historial):

&nbsp;	HU10: Como Administrador, quiero ver el historial de movimientos de un producto para auditar por qué hubo variaciones en el stock.

#### 5\. Módulo de Alertas y Reportes 📊

* RF17 (Alertas Stock Mínimo):

&nbsp;	HU11: Como Administrador, quiero recibir una alerta cuando un producto se esté agotando para realizar un pedido a tiempo.

* RF18 (Reporte de Valorización):

&nbsp;	HU12: Como Dueño del negocio, quiero saber cuánto dinero tengo invertido en mercancía para tomar decisiones financieras.

