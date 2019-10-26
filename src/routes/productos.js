const router=require('express').Router();

const Note = require('../models/Producto');

router.get('/notes/add',(req,res)=>{
    res.render('notes/nueva-nota');
});

router.delete('/eliminar-todo', async(req,res)=>{
    await Note.remove({});
    res.redirect('/notes');

});
router.post('/notes/agregar-nota', async(req,res)=>{
    //console.log(req.body.txt_titulo);
    const {txt_titulo} = req.body; //Crear una variable String con el mismo nombre que el elemento del array
    const errores=[];   

    if(!txt_titulo){
        errores.push({texto_error: 'Porfavor, inserte un título.'});
    }
    if(errores.length>0){
        res.render('notes/nueva-nota', {
            errores,
            txt_titulo,
        });
    }else{
        const notaNueva= new Note({titulo: txt_titulo});
        await notaNueva.save();
        req.flash('msg_exito', 'Elemento añadido con éxito');
        res.redirect('/notes');
    }
});

router.get('/notes', async(req,res)=>{
    const notas=await Note.find().sort({fecha: 'desc'});
    res.render('notes/todas-notas', {notas,total_num: notas.length});
});

router.get('/notes/edit/:user_id',async(req,res)=>{
    const nota=await Note.findById(req.params.user_id);
    res.render('notes/editar-nota', {nota});
});
router.put('/notes/editar-nota/:user_id',async(req,res)=>{
    const {txt_titulo}=req.body;
    await Note.findByIdAndUpdate(req.params.user_id, {titulo: txt_titulo});
    req.flash('msg_exito', 'Nota actualizada correctamente');
    res.redirect('/notes');
});
router.delete('/notes/eliminar-nota/:user_id',async(req,res)=>{
    await Note.findByIdAndDelete(req.params.user_id);
    req.flash('msg_exito', 'Nota eliminada correctamente');
    res.redirect('/notes');
});


module.exports = router;