// Função para remover vértices consecutivos duplicados em um anel
function removeDuplicateVertices(ring) {
	return ring.filter((coord, idx, arr) => {
		if (idx === 0) return true;
		const prev = arr[idx - 1];
		return coord[0] !== prev[0] || coord[1] !== prev[1];
	});
}

// Função para limpar a geometria de vértices duplicados
function cleanGeometry(geometry) {
	if (!geometry) return geometry;
	if (geometry.type === 'Polygon') {
		geometry.coordinates = geometry.coordinates.map(removeDuplicateVertices);
	} else if (geometry.type === 'MultiPolygon') {
		geometry.coordinates = geometry.coordinates.map(
			polygon => polygon.map(removeDuplicateVertices)
		);
	}
	return geometry;
}

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
			// const geometryClean = cleanGeometry(f.geometry);
			const lote = {
				objectid: f.properties.objectid,
				ct_ciu: f.properties.ct_ciu,
				x: f.properties.x,
				y: f.properties.y,
				lt_endereco: f.properties.lt_endereco,
				lt_cep: f.properties.lt_cep,
				lt_setor: f.properties.lt_setor,
				lt_quadra: f.properties.lt_quadra,
				lt_conjunto: f.properties.lt_conjunto,
				lt_lote: f.properties.lt_lote,
				lt_nome: f.properties.lt_nome,
				lt_ra: f.properties.lt_ra,
				ac_area_ce: f.properties.ac_area_ce,
				ac_area_cpv: f.properties.ac_area_cpv,
				ac_area_cp: f.properties.ac_area_cp,
				ac_area_cq: f.properties.ac_area_cq,
				ac_area_cm: f.properties.ac_area_cm,
				ac_area_ct: f.properties.ac_area_ct,
				ct_origem: f.properties.ct_origem,
				geometry: f.geometry
			};
			await Lote.create(lote);
			count++;
			if (count % 1000 === 0) {
				console.log(`${count} lotes importados...`);
			}
		} catch (err) {
			erros++;
			console.warn('Erro ao importar lote:', f.properties.objectid, err.message);
		}
	}

	console.log(`Importação concluída! Total de lotes: ${count}, erros: ${erros}`);
	process.exit();
}

importGeojson();

