import mongoose from 'mongoose';

const { Schema } = mongoose;

const LoteSchema = new Schema({
  objectid:{ type: Number, required: true },
  ct_ciu:{ type: String, default: "0121IV4B0004"},
  x:{ type: Number, required: true },
  y:{ type: Number, required: true },
  lt_endereco:{ type: String, default: null },
  lt_cep:{ type: String, default: "70800210"},
  lt_setor:{ type: String, default: "SHTN"},
  lt_quadra:{ type: String, default: "TRECHO 1"},
  lt_conjunto:{ type: String, default: "POLO 3"},
  lt_lote:{ type: String, default: "LT 8"},
  lt_nome:{ type: String, default: null},
  lt_ra:{ type: Number, default: 1},
  ac_area_ce:{ type: Number, default: 0.0},
  ac_area_cpv:{ type: Number, default: 0.0},
  ac_area_cp:{ type: Number, default: 0.0},
  ac_area_cq:{ type: Number, default: 0.0},
  ac_area_cm:{ type: Number, default: 0.0},
  ac_area_ct:{ type: Number, default: 0.0},
  ct_origem:{ type: Number, default: 2},
  geometry: {
    type: {
      type: String, // "MultiPolygon"
      enum: ['Polygon','MultiPolygon'], // Restringe a aceitar apenas "MultiPolygon"
      required: true
    },
    coordinates: {
      type: Array, // Array de arrays de coordenadas (para MultiPolygon)
      required: true
    }
  }

});

LoteSchema.index({ geometry: '2dsphere' });

LoteSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  // next();
});

const Lote = mongoose.model('Lote', LoteSchema);

export default Lote;