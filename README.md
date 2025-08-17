# **IDAT BANK - Sistema Bancario Web**

**IDAT BANK** es una aplicación web desarrollada como parte del examen final del curso de **Herramientas de Programación 2**. El sistema permite a los usuarios realizar operaciones bancarias básicas como **iniciar sesión**, **consultar saldos** y **realizar transferencias entre cuentas**.

## **Tecnologías Utilizadas**

- **Frontend:** React, Bootstrap, react-router-dom  
- **Backend:** .NET Core 2.1 (API RESTful)  
- **Base de Datos:** SQL Server (o MySQL para versión Java)  
- **Gestión de Estado:** useState, useEffect en React  
- **Control de Rutas:** react-router-dom  

---

## **Instalación**

### **1. Clonar el repositorio**
```bash
git clone https://github.com/sg6107/HP2-EC2-NETCORE-REACT.git
````

### **2. Backend (.NET Core)**

* Abrir la solución en Visual Studio.
* Ejecutar el proyecto con IIS Express.

### **3. Frontend (React)**

```bash
cd "Idat Bank React/IdatBank"
npm install
npm install react-router-dom
npm run dev
```

---

## **Funcionalidades**

* **Login:** Ingreso con número de tarjeta y clave de internet.
* **Consultas:** Visualización de cuentas (**Sueldo** y **Ahorros**) y saldos.
* **Transferencias:** Realización de transferencias entre cuentas.
* **Confirmación:** Detalle de la transferencia realizada.
* **Cierre de sesión:** Opción para cerrar sesión de forma segura.
* **Persistencia:** Uso de `localStorage` para mantener la sesión activa.


