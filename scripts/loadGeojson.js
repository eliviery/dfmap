
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { createReadStream } from 'fs';
import Lote from '../model/Lote.js';

import pkg1 from 'stream-json';
const { parser } = pkg1;
import pkg2 from 'stream-json/streamers/StreamArray.js';
const { streamArray } = pkg2;
import pkg3 from 'stream-json/filters/Pick.js';
const { pick } = pkg3;
config();

const mongoUri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=${process.env.MONGO_DB}`;

async function importGeojson() {
  await mongoose.connect(mongoUri);

  // Pipeline corrigido para acessar features dentro do objeto GeoJSON
  const pipeline = createReadStream('df_EPSG4326.geojson')
    .pipe(parser())
    .pipe(pick({ filter: 'features' }))
    .pipe(streamArray());

  let count = 0;
  let erros = 0;
  for await (const { value: f } of pipeline) {
    try {
      if (f.properties.ct_ciu === '00188I4C0045') {
        console.log(f.properties.ct_ciu, '\n', JSON.stringify(f.properties, null, 2));
        console.log('\n', JSON.stringify(f.geometry, null, 2));
        break;
      }

      // await Lote.create(lote);
      // count++;
      // if (count % 10000 === 0) {
      //   console.log(`${count} lotes importados...`);
      // }
    } catch (err) {
      erros++;
      console.warn('Erro ao importar lote:', f.properties.objectid, err.message);
    }
  }

  console.log(`Importação concluída! Total de lotes: ${count}, erros: ${erros}`);
  process.exit();
}

importGeojson();

