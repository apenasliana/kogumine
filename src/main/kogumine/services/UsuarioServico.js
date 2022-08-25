const db = require("../../../../server/database")
const util = require('util')
const { query } = require("express")


class UsuarioServico{
    
    static async cadastrarUsuario(usuario){
        const query = util.promisify(db.query).bind(db)

        const sqlInsert = "INSERT INTO usuarios (username,senha,email) VALUES (?,?,?)"
        
        try{
            const result = await query(sqlInsert, [usuario.username, usuario.senha, usuario.email])
                if(result) {
                    const foreignKey = result.insertId
                    try{
                        const resultado = await query("INSERT INTO colecao (idUsuario,custoTotal,qtd_mythic,qtd_rare,qtd_common,totalCards,qtd_uncommon) VALUE (?,0,0,0,0,0,0)", foreignKey)
                        return resultado
                    }catch(err){
                        return err
                    }
                }
            }catch(err){
                return err
            }



    }

    
    static async deletarUsuario(id){
        const query = util.promisify(db.query).bind(db)

        const sqlDelete = "DELETE FROM usuarios WHERE id = ?"
        try{
            const result = await query(sqlDelete, id )
            return result
        }catch(err){
            return err
        }

    }
    static async listUsuario(){
        const query = util.promisify(db.query).bind(db)

        const sqlSelectAll = "SELECT * FROM usuarios"
        try{
            const result = await query(sqlSelectAll)
            return result
        }catch(err){
            return err
        }
    }
    static async getUsuario(id){
        const query = util.promisify(db.query).bind(db)
        
        const sqlSelect = "SELECT * FROM usuarios WHERE id = ?"
        try{
            const result = await query(sqlSelect, id)
            return result
            
        }catch(err){
            return err
        }
    }

    static async putUsuario(usuario,id){
        const query = util.promisify(db.query).bind(db)

        const sqlUpdate = "UPDATE usuarios SET username = ?, senha = ?, email = ? WHERE id = ?"
        try{
            const result = await query(sqlUpdate, [usuario.username, usuario.senha, usuario.email, id] )
                return result

        }catch(err){
            return err
        }

    }
    static async putUsuarioUsername(username,id){
        const query = util.promisify(db.query).bind(db)
        const sqlUpdate = "UPDATE usuarios SET username = ? WHERE id = ?"
        
        try{
            const result = await query(sqlUpdate, [username, id] )
                return result

        }catch(err){
            return err
        }
        

    }
    static async putUsuarioSenha(senha,id){
        const query = util.promisify(db.query).bind(db)

        const sqlUpdate = "UPDATE usuarios SET senha = ? WHERE id = ?"
        try{
            const result = await query(sqlUpdate, [senha, id] )
                return result

        }catch(err){
            return err
        }

    }
    static async putUsuarioEmail(email,id){
        const query = util.promisify(db.query).bind(db)
        const sqlUpdate = "UPDATE usuarios SET email = ? WHERE id = ?"
        try{
            const result = await query(sqlUpdate, [email, id] )
            return result
            
        }catch(err){
            return err
        }
    }


    static validarEmail(email){
        const sqlEmailSearch = "SELECT email FROM usuarios WHERE email = (?)"
        
        db.query(sqlEmailSearch,email, (err,result)=>{
            if(err) {console.log(err)}
            if(result == []) {
                return true
            }else{
                return false
            }
        })
    }
    static validarUsername(username){
        const sqlUsername = "SELECT username FROM usuarios WHERE username = (?)"

        db.query(sqlUsername,username, (err,result)=>{
            if(err) {console.log(err)}
            if(result == []) {
                return true
            }else{
                return false
            }
        })
    }
    static async autenticar(email,senha){
        const query = util.promisify(db.query).bind(db)


        const auth = "SELECT usuarios.id,colecao.id AS idColecao FROM usuarios JOIN colecao ON colecao.idUsuario = usuarios.id WHERE email = (?) AND senha = (?)"

        try{
            const resultado = await query(auth,[email,senha])
            if(resultado[0] != null){
                return resultado[0]
            }
        }catch(err){
            return err
        }

    }

}

module.exports = UsuarioServico