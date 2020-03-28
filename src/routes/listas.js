const router=require('express').Router();
const pool=require('../database');

router.get('/', async(req,res)=>{
    pool.query('SELECT * FROM listas')
        .then(response=>{
            res.render('listas/todas_listas', {listas: response,total_num: response.length})
        })
        .catch(err=>res.send(err));
});

router.get('/add', async(req,res)=>{
    res.render('listas/nueva_lista');
});
router.post('/add', async(req,res)=>{
    pool.query('INSERT INTO listas SET ?',[req.body])
        .then(response=>res.redirect('/'))
        .catch(err=>res.send(err));
});

router.get('/:lista_id/delete_all', async(req,res)=>{
    pool.query('DELETE FROM productos WHERE lista_id = ?', [req.params.lista_id])
        .then(response=>{
            res.redirect(`/listas/${req.params.lista_id}`);
        })
        .catch(err=>res.send(err));
    

});
router.get('/:lista_id/delete_list', async(req,res)=>{
    pool.query('DELETE FROM productos WHERE lista_id = ?', [req.params.lista_id])
        .then(response=>{
            pool.query('DELETE FROM listas WHERE lista_id = ?',[req.params.lista_id], (err)=>{
                if(err){
                    res.send(err);
                }else{
                    req.flash('msg_exito', 'Lista eliminada exitosamente'); 
                    res.redirect('/');
                }
            });
        })
        .catch(err=>res.send(err));
    
});
router.get('/:lista_id/edit_list', async(req,res)=>{
    pool.query(`SELECT * FROM listas WHERE lista_id=${req.params.lista_id}`)
        .then(response=>res.render('listas/edit_list', {list:response[0]}))
        .catch(err=>res.send(err));
});
router.post('/:lista_id/edit_list', async(req,res)=>{
    const {name_lista}=req.body;
    pool.query('UPDATE listas SET ? WHERE lista_id = ? ', [{name_lista}, req.params.lista_id])
        .then(response=>res.redirect('/'))
        .catch(err=>res.send(err));
});
router.get('/:lista_id', async(req,res)=>{
    const prods=await pool.query(`SELECT * FROM productos NATURAL JOIN listas`);
    console.log(prods);
    res.render('listas/elementos_lista', {prods,total_num: prods.length,lista_id: req.params.lista_id});
});

module.exports=router;