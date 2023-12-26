Buenas tardes chic@s, os dejo los requerimientos para el segundo proyecto de Node.js
Requerimientos para proyecto 2 

fecha entrega límite: 9 de enero de 2024 a las 23:59
modo de entrega: enviar enlace de repositorio github público a oscar.martinez@bootcamp-upgrade.com
descripción: seguir con el resultado del proyecto 1 e incluir nuevas funcionalidades
organización de equipos: individual o por parejas
 
requisitos:
    i) Cumplir los requisitos del proyecto 1
    ii) Como mínimo desarrollar 1 ruta PUT y 1 ruta PATCH.
    iii) Que los usuarios se puedan registrar y luego loggear mediante JWT (estrategia de tokens).
    iv) Como mínimo una ruta privada (que solo sea accesible mediante validación de token). Que solo pueda acceder el dueño del recurso.
    v) Como mínimo una ruta autorizada (que solo sea accesible mediante rol). Que solo pueda acceder el usuario que pertenece a ese rol (antes tendrás que agregar un atributo `rol` al schema de tu usuario).
    vi) Las contraseñas deben guardarse encriptadas usando cifrado con biblioteca bcryptjs.
    vii) En la definición de esquemas debe modelarse como mínimo una relación entre dos esquemas (usa ObjectId y ref).
    viii) Debes usar arquitectura limpia. Separa y organiza en distintas carpetas el proyecto tal y como hiciste en el primer proyecto.


Usar arquitectura limpia. Separa y organiza en distintas carpetas el proyecto. 
. └── proyecto/ 
├── controllers/ 
│ 
├── producto.controller.js 
│ 
└── usuario.controller.js 
├── helpers/ 
│ 
└── validadores.js 
├── models/ 
│ 
├── producto.model.js 
│ 
└── usuario.model.js 
├── routes/ 
│ 
├── producto.routes.js 
│ 
└── usuario.routes.js 
├── index.js 
└── package.json