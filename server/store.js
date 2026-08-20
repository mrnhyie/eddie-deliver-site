const fs = require('fs');
const path = require('path');

const dataDir = process.env.VERCEL
  ? '/tmp'
  : path.join(__dirname, 'data');

const dbPath = path.join(dataDir, 'eddies.json');

function emptyDb() {
  return {
    errands: [],
    restaurants: [],
    seq: { errands: 1, restaurants: 1 },
  };
}

function ensureDir() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
}

function read() {
  try {
    if (!fs.existsSync(dbPath)) return emptyDb();
    return { ...emptyDb(), ...JSON.parse(fs.readFileSync(dbPath, 'utf8')) };
  } catch {
    return emptyDb();
  }
}

function write(db) {
  ensureDir();
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

function now() {
  return new Date().toISOString();
}

const store = {
  createErrand({ name, phone, email, pickup, dropoff, description }) {
    const db = read();
    const row = {
      id: db.seq.errands++,
      name,
      phone,
      email: email || '',
      pickup,
      dropoff,
      description,
      status: 'Pending',
      created_at: now(),
    };
    db.errands.unshift(row);
    write(db);
    return row;
  },

  listErrands() {
    return read().errands;
  },

  updateErrandStatus(id, status) {
    const db = read();
    const row = db.errands.find((e) => String(e.id) === String(id));
    if (!row) return null;
    row.status = status;
    write(db);
    return row;
  },

  deleteErrand(id) {
    const db = read();
    const before = db.errands.length;
    db.errands = db.errands.filter((e) => String(e.id) !== String(id));
    write(db);
    return db.errands.length < before;
  },

  createRestaurant(data) {
    const db = read();
    const row = {
      id: db.seq.restaurants++,
      restaurant_name: data.restaurant_name,
      contact_name: data.contact_name,
      phone: data.phone,
      email: data.email,
      location: data.location,
      service_type: data.service_type || '',
      message: data.message || '',
      status: 'New',
      created_at: now(),
    };
    db.restaurants.unshift(row);
    write(db);
    return row;
  },

  listRestaurants() {
    return read().restaurants;
  },

  updateRestaurantStatus(id, status) {
    const db = read();
    const row = db.restaurants.find((r) => String(r.id) === String(id));
    if (!row) return null;
    row.status = status;
    write(db);
    return row;
  },

  deleteRestaurant(id) {
    const db = read();
    const before = db.restaurants.length;
    db.restaurants = db.restaurants.filter((r) => String(r.id) !== String(id));
    write(db);
    return db.restaurants.length < before;
  },
};

module.exports = store;
