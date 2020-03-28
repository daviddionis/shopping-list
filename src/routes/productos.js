const router=require('express').Router();
const pool=require('../database');

router.get('/listas/:lista_id/add_prod', async(req,res)=>{
    const {lista_id}=req.params;
    res.render('productos/nuevo_prod', {lista_id});
});
router.post('/listas/:lista_id/add_prod', async(req,res)=>{
    const {name_producto} = req.body; //Crear una variable String con el mismo nombre que el elemento del array
    const errores=[];   

    if(!name_producto){
        errores.push({texto_error: 'Porfavor, inserte un título.'});
    }
    if(errores.length>0){
        res.redirect(`/listas/${req.params.lista_id}`);
    }else{
        pool.query(`INSERT INTO productos SET ?`,[{name_producto, lista_id: req.params.lista_id}])
        req.flash('msg_exito', 'Producto añadido con éxito');
        res.redirect(`/listas/${req.params.lista_id}`);
    }
});


router.get('/listas/:lista_id/edit_prod/:id_prod',async(req,res)=>{
    const prod=await pool.query(`SELECT * FROM ${req.params.lista_id}_table WHERE ID=${req.params.id_prod}`);
    console.log(prod);
    res.render('productos/editar_prod', {prod:prod[0],lista_id:req.params.lista_id});
});
router.put('/listas/:lista_id/edit_prod/:id_prod',async(req,res)=>{
    const {txt_fullname}=req.body;
    await pool.query(`UPDATE ${req.params.lista_id}_table set ? WHERE ID=?`, [req.params.id_prod, {ID:req.params.id_prod, fullname: txt_titulo}]);
    req.flash('msg_exito', 'Producto actualizado correctamente');
    res.redirect(`/listas/${req.params.lista_id}`);
});
router.get('/listas/:lista_id/delete_prod/:id_prod',async(req,res)=>{
    await pool.query(`DELETE FROM ${req.params.lista_id}_table WHERE ID=?`,[req.params.id_prod]);
    req.flash('msg_exito', 'Prodcuto eliminado correctamente');
    res.redirect(`/listas/${req.params.lista_id}`);
});


module.exports = router;