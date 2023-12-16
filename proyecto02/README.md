descripcion: hacer una API con Node, Express y Mongodb. Elige un caso de uso que te motive (tienda online, club deportivo, concesionario, biblioteca ...) y realiza una API para acceder y almacenar datos.

requisitos: 
i) Debes usar Mongo Atlas para alojar tu base de datos en la nube. 
ii) Debes usar Node, Express.js y Mongoose para conectar con mongo. 
iii) Como mínimo debes definir 2 esquemas - Ejemplo: Si vendes productos en tu tienda, al menos define los esquemas producto y usuario 
    git git- Ejemplo: Si modelas una biblioteca, al menos define los esquemas libro y autor 
    - Ejemplo: Si modelas un concesionario, al menos define los esquemas coche y cliente. 
iv) Como mínimo debes desarrollar 1 ruta GET, 1 ruta POST y 1 ruta DELETE para cada esquema 
v) Debes usar arquitectura limpia. Separa y organiza en distintas carpetas el proyecto. Ejemplo: 
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