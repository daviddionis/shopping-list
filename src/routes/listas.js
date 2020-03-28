const router=require('express').Router();
const pool=require('../database');

router.get('/', async(req,res)=>{
    const listas=await pool.query('SELECT * FROM listas');
    console.log(listas);
    res.render('listas/todas_listas', {listas,total_num: listas.length});
});

router.get('/add', async(req,res)=>{
    res.render('listas/nueva_lista');
});
router.post('/add', async(req,res)=>{
    pool.query('INSERT INTO listas SET ?',[req.body])
        .then(response=>res.redirect('/'))
        .catch(err=>res.send(err));
});

router.get('/:id_lista/delete_all', async(req,res)=>{
    pool.query('DELETE FROM productos WHERE lista_id = ?', [req.params.id_lista])
        .then(response=>{
            res.redirect(`/listas/${req.params.id_lista}`);
        })
        .catch(err=>res.send(err));
    

});
router.get('/:id_lista/delete_list', async(req,res)=>{
    pool.query('DELETE FROM productos WHERE lista_id = ?', [req.params.id_lista])
        .then(response=>{
            pool.query('DELETE FROM listas WHERE lista_id = ?',[req.params.id_lista], (err)=>{
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
router.get('/:id_lista/edit_list', async(req,res)=>{
    const data=await pool.query(`SELECT * FROM listas WHERE ID=${req.params.id_lista}`);
    res.render('listas/edit_list', {list:data[0]});
});
router.post('/:id_lista/edit_list', async(req,res)=>{
    await pool.query(`UPDATE listas SET fullname = '${req.body.fullname}' WHERE ID=${req.params.id_lista}`);
    res.redirect('/');
});
router.get('/:id_lista', async(req,res)=>{
    const prods=await pool.query(`SELECT * FROM ${req.params.id_lista}_table`);
    console.log(prods);
    res.render('listas/elementos_lista', {prods,total_num: prods.length,id_lista: req.params.id_lista});
});

module.exports=router;