const router = require('express').Router();
const pool = require('../database');

router.get('/listas/:lista_id/add_prod', async (req, res) => {
    const { lista_id } = req.params;
    res.render('productos/nuevo_prod', { lista_id });
});
router.post('/listas/:lista_id/add_prod', async (req, res) => {
    const { name_producto } = req.body; //Crear una variable String con el mismo nombre que el elemento del array
    const errores = [];

    if (!name_producto) {
        errores.push({ texto_error: 'Porfavor, inserte un título.' });
    }
    if (errores.length > 0) {
        res.redirect(`/listas/${req.params.lista_id}`);
    } else {
        pool.query(`INSERT INTO productos SET ?`, [{ name_producto, lista_id: req.params.lista_id }])
            .then(response => {
                req.flash('msg_exito', 'Producto añadido con éxito');
                res.redirect(`/listas/${req.params.lista_id}`);
            })
            .catch(err=>res.send(err));

    }
});


router.get('/listas/:lista_id/edit_prod/:producto_id', async (req, res) => {
    const { lista_id, producto_id } = req.params;
    pool.query('SELECT * FROM productos WHERE producto_id=?', [producto_id])
        .then(response => {
            res.render('productos/editar_prod', { prod: response[0], lista_id });
        })
        .catch(err => res.send(err));

});
router.post('/listas/:lista_id/edit_prod/:producto_id', async (req, res) => {
    const { name_producto } = req.body;
    const { producto_id, lista_id} = req.params;
    pool.query('UPDATE productos SET ? WHERE producto_id=?', [{ name_producto, producto_id }, producto_id])
        .then(response => {
            req.flash('msg_exito', 'Producto actualizado correctamente');
            res.redirect(`/listas/${lista_id}`);
        })
        .catch(err => res.send(err));

});
router.get('/listas/:lista_id/delete_prod/:producto_id', async (req, res) => {
    pool.query(`DELETE FROM productos WHERE producto_id=?`, [req.params.producto_id])
        .then(response => {
            req.flash('msg_exito', 'Prodcuto eliminado correctamente');
            res.redirect(`/listas/${req.params.lista_id}`);
        })
        .catch(err => res.send(err));

});


module.exports = router;