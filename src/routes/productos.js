const router=require('express').Router();
const pool=require('../database');

router.get('/listas/:id_lista/add_prod', async(req,res)=>{
    res.render('productos/nuevo_prod', {id_lista:req.params.id_lista});
});
router.post('/listas/:id_lista/add_prod', async(req,res)=>{
    //console.log(req.body.txt_titulo);
    const {txt_fullname} = req.body; //Crear una variable String con el mismo nombre que el elemento del array
    const errores=[];   

    if(!txt_fullname){
        errores.push({texto_error: 'Porfavor, inserte un título.'});
    }
    if(errores.length>0){
        res.redirect(`/listas/${req.params.id_lista}`);
    }else{
        await pool.query(`INSERT INTO ${req.params.id_lista}_table set ?`,[{fullname:txt_fullname}])
        req.flash('msg_exito', 'Producto añadido con éxito');
        res.redirect(`/listas/${req.params.id_lista}`);
    }
});


router.get('/listas/:id_lista/edit_prod/:id_prod',async(req,res)=>{
    const prod=await pool.query(`SELECT * FROM ${req.params.id_lista}_table WHERE ID=${req.params.id_prod}`);
    console.log(prod);
    res.render('productos/editar_prod', {prod:prod[0],id_lista:req.params.id_lista});
});
router.put('/listas/:id_lista/edit_prod/:id_prod',async(req,res)=>{
    const {txt_fullname}=req.body;
    await pool.query(`UPDATE ${req.params.id_lista}_table set ? WHERE ID=?`, [req.params.id_prod, {ID:req.params.id_prod, fullname: txt_titulo}]);
    req.flash('msg_exito', 'Producto actualizado correctamente');
    res.redirect(`/listas/${req.params.id_lista}`);
});
router.get('/listas/:id_lista/delete_prod/:id_prod',async(req,res)=>{
    await pool.query(`DELETE FROM ${req.params.id_lista}_table WHERE ID=?`,[req.params.id_prod]);
    req.flash('msg_exito', 'Prodcuto eliminado correctamente');
    res.redirect(`/listas/${req.params.id_lista}`);
});


module.exports = router;