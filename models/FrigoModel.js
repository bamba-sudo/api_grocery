const db = require('../config/config');

const Frigo = function (frigo) {
  this.id = frigo.id;
  this.name = frigo.name;
};

Frigo.create = (newFrigo, result) => {
  db.query('INSERT INTO frigo SET ?', newFrigo, (err, res) => {
    if (err) {
      console.error('Error creating frigo: ', err);
      result(err, null);
      return;
    }
    console.log(`Frigo ${newFrigo.id} was created.`);
    result(null, { id: newFrigo.id, name: newFrigo.name });
  });
};

Frigo.findById = (frigoId, result) => {
  db.query(`SELECT * FROM frigo WHERE id = ${frigoId}`, (err, res) => {
    if (err) {
      console.error('Error finding frigo: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('Frigo found: ', res[0]);
      result(null, res[0]);
      return;
    }
    // Frigo with the given id not found
    result({ kind: 'not_found' }, null);
  });
};

Frigo.getAll = (result) => {
  db.query('SELECT * FROM frigo', (err, res) => {
    if (err) {
      console.error('Error getting frigos: ', err);
      result(err, null);
      return;
    }
    console.log('Frigos found: ', res);
    result(null, res);
  });
};

Frigo.updateById = (id, frigo, result) => {
  db.query(
    'UPDATE frigo SET name = ? WHERE id = ?',
    [frigo.name, id],
    (err, res) => {
      if (err) {
        console.error('Error updating frigo: ', err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        // Frigo with the given id not found
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('Frigo updated: ', { id: id, ...frigo });
      result(null, { id: id, ...frigo });
    }
  );
};

Frigo.remove = (id, result) => {
  db.query('DELETE FROM frigo WHERE id = ?', id, (err, res) => {
    if (err) {
      console.error('Error deleting frigo: ', err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      // Frigo with the given id not found
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('Frigo deleted with id: ', id);
    result(null, res);
  });
};

Frigo.removeAll = (result) => {
  db.query('DELETE FROM frigo', (err, res) => {
    if (err) {
      console.error('Error deleting frigos: ', err);
      result(err, null);
      return;
    }
    console.log(`Deleted ${res.affectedRows} frigos`);
    result(null, res);
  });
};

module.exports = Frigo;
