const pool=require('../database');
module.exports={
    createTable: async (id_txt)=>{
        id_txt=id_txt+'_table';
        await pool.query(`CREATE TABLE ${id_txt}(
            ID INT(11) NOT NULL ,
            fullname VARCHAR(30) NOT NULL
        );`);
        await pool.query(`ALTER TABLE ${id_txt} ADD PRIMARY KEY (id);`);
        await pool.query(`ALTER TABLE ${id_txt} MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2`);
    }
}