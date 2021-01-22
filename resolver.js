const { db } = require("./cnn")

const proyetcomResolver = {

    Query: {
        persona(root, { cedula_persona }) {
            if (cedula_persona == undefined)
                return db.any("select * from persona order by cedula_persona desc")
            else
                return db.any("select * from persona WHERE cedula_persona=$1;", [cedula_persona])

        },
        usuario(root, { id_usuario }) {
            if (id_usuario == undefined)
                return db.any("select * from usuario order by cedula_persona desc")
            else
                var a = db.any("select * from usuario WHERE id_usuario=$1;", [id_usuario])
            console.log(a)
            return db.any("select * from usuario WHERE id_usuario=$1;", [id_usuario])
        },
        producto(root, { id_producto }) {
            if (id_producto == undefined)
                return db.any("select * from producto order by id_producto desc")
            else
                return db.any("select * from producto WHERE id_producto=$1;", [id_producto])
        },
        serviciocliente(root, { id_servicio }) {
            if (id_servicio == undefined)
                return db.any("select * from serviciocliente order by id_servicio desc")
            else
                return db.any("select * from serviciocliente WHERE id_servicio=$1;", [id_servicio])
        }
    },
    Mutation: {
        /*PERSONA*/
        async createPersona(root, { persona }) {
            if (persona === undefined) return null
            const query = `INSERT INTO persona (cedula_persona, nombre_persona, apellido_persona, direccion_persona, 
                telefono_persona, email_persona, fechanac_persona) 
                VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *;`
            let result = await db.one(query, [persona.cedula_persona, persona.nombre_persona,
                persona.apellido_persona, persona.direccion_persona,
                persona.telefono_persona, persona.email_persona, persona.fechanac_persona
            ])
            console.log(persona)
            return result
        },
        async updatePersona(root, { persona }) {
            if (persona === undefined) return null
            const query = `UPDATE persona SET  
            nombre_persona=$2, apellido_persona=$3, direccion_persona=$4, 
            telefono_persona=$5, email_persona=$6, fechanac_persona=$7
            WHERE cedula_persona=$1 RETURNING *;`
            let result = await db.one(query, [persona.cedula_persona, persona.nombre_persona,
                persona.apellido_persona, persona.direccion_persona,
                persona.telefono_persona, persona.email_persona, persona.fechanac_persona
            ])
            return result
        },
        async deletePersona(root, { persona }) {
            if (persona === undefined) return null
            const query = `DELETE FROM persona
            WHERE cedula_persona=$1 RETURNING *;`
            let result = await db.one(query, [persona.cedula_persona])
            return result
        },
        /*USUARIO */
        async createUsuario(root, { usuario }) {
            if (usuario === undefined) return null
            const query = `INSERT INTO usuario (id_usuario, cedula_persona, contrasena_usuario, fecharegistro_usuario) 
                VALUES($1,$2,$3,current_date) RETURNING *;`
            let result = await db.one(query, [usuario.id_usuario, usuario.cedula_persona,
                usuario.contrasena_usuario
            ])
            console.log(usuario)
            return result
        },
        async updateUsuario(root, { usuario }) {
            if (usuario === undefined) return null
            const query = `UPDATE usuario SET  
            cedula_persona=$2, contrasena_usuario=$3, fecharegistro_usuario=current_date
            WHERE id_usuario=$1 RETURNING *;`
            let result = await db.one(query, [usuario.id_usuario, usuario.cedula_persona,
                usuario.contrasena_usuario
            ])
            return result
        },
        async deleteUsuario(root, { usuario }) {
            if (usuario === undefined) return null
            const query = `DELETE FROM usuario
            WHERE id_usuario=$1 RETURNING *;`
            let result = await db.one(query, [usuario.id_usuario])
            return result
        },
        /*async loginUsuario(root, { usuario }) {
            if (usuario === undefined) return null
            const query = `select * FROM usuario
            WHERE id_usuario=$1 RETURNING *;`
            let result = await db.one(query, [usuario.id_usuario])
            return result
        },*/
        /*PRODUCTO */
        async createProducto(root, { producto }) {
            if (producto === undefined) return null
            const query = `INSERT INTO producto ( nombre_producto, descripcion_producto, fecharegistro_producto,
                precio_producto, imagen) 
                VALUES($1,$2,current_date,$3,$4) RETURNING *;`
            let result = await db.one(query, [producto.nombre_producto, producto.descripcion_producto,
                producto.precio_producto, producto.imagen
            ])
            console.log(producto)
            return result
        },
        async updateProducto(root, { producto }) {
            if (producto === undefined) return null
            const query = `UPDATE producto SET  
            nombre_producto=$2, descripcion_producto=$3, fecharegistro_producto=current_date, 
            precio_producto=$4, imagen=$5
            WHERE id_producto=$1 RETURNING *;`
            let result = await db.one(query, [producto.id_producto, producto.nombre_producto, producto.descripcion_producto,
                producto.precio_producto, producto.imagen
            ])
            return result
        },
        async deleteProducto(root, { producto }) {
            if (producto === undefined) return null
            const query = `DELETE FROM producto
            WHERE id_producto=$1 RETURNING *;`
            let result = await db.one(query, [producto.id_producto])
            return result
        },
        /* SERVICIO AL CLIENTE */
        async createServicio(root, { serviciocliente }) {
            if (serviciocliente === undefined) return null
            const query = `INSERT INTO serviciocliente (id_usuario,  descripcion_servicio, fecha_servicio) 
                VALUES($1,$2,current_date) RETURNING *;`
            let result = await db.one(query, [serviciocliente.id_usuario,
                serviciocliente.descripcion_servicio
            ])
            console.log(serviciocliente)
            return result
        },
        async updateServicio(root, { serviciocliente }) {
            if (serviciocliente === undefined) return null
            const query = `UPDATE serviciocliente SET  
             id_usuario=$2,  descripcion_servicio=$3, fecha_servicio=current_date
            WHERE id_servicio=$1 RETURNING *;`
            let result = await db.one(query, [serviciocliente.id_servicio, serviciocliente.id_usuario,
                serviciocliente.descripcion_servicio
            ])
            return result
        },
        async deleteServicio(root, { serviciocliente }) {
            if (serviciocliente === undefined) return null
            const query = `DELETE FROM serviciocliente
            WHERE id_servicio=$1 RETURNING *;`
            let result = await db.one(query, [serviciocliente.id_servicio])
            return result
        }
    }

}

export default proyetcomResolver;
