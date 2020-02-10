const router=require('express').Router();
const pool=require('../database');
const {createTable}=require('../helpers/helper');

router.get('/', async(req,res)=>{
    const listas=await pool.query('SELECT * FROM listas');
    console.log(listas);
    res.render('listas/todas_listas', {listas,total_num: listas.length});
});

router.get('/add', async(req,res)=>{
    res.render('listas/nueva_lista');
});
router.post('/add', async(req,res)=>{
    await pool.query('INSERT INTO listas set ?',[{fullname: req.body.txt_fullname}]);
    const row=await pool.query(`SELECT ID FROM listas WHERE fullname ='${req.body.txt_fullname}'`);
    const id=row[0].ID;
    console.log(id);
    await createTable(id);
    res.redirect('/');
});

router.get('/:id_lista/delete_all', async(req,res)=>{
    await pool.query(`DROP TABLE ${req.params.id_lista}_table`);
    await createTable(req.params.id_lista);
    res.redirect(`/listas/${req.params.id_lista}`);

});
router.get('/:id_lista/delete_list', async(req,res)=>{
    await pool.query(`DROP TABLE ${req.params.id_lista}_table`);
    await pool.query(`DELETE FROM listas WHERE ID=${req.params.id_lista}`);
    req.flash('msg_exito', 'Lista eliminada exitosamente'); 
    res.redirect('/');
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