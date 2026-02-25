

# ![](img/favicon.svg) dfmap

Mapa residencial do Distrito Federal

---

Este projeto utiliza uma população de desenhos geométricos de todos os lotes do Distrito Federal e seus dados, como tamanho, localização, endereço, etc., extraídos da Plataforma ArcGIS, transferidos via GeoJSON para um Banco de Dados MongoDB.

> Nota:
  Durante a normalização dos dados geométricos, um lote apresentou falha.
  Dados do lote:

  ```json
    {
        "objectid": 419816,
        "ct_ciu": "00188I4C0045",
        "x": 205899.47950000037,
        "y": 8236301.8013,
        "lt_endereco": "NÚCLEO RURAL CAPÃO CUMPRIDO S/N",
        "lt_cep": "71693000",
        "lt_setor": "NÚCLEO RURAL CAPÃO CUMPRIDO",
        "lt_quadra": " ",
        "lt_conjunto": " ",
        "lt_lote": "S/N",
        "lt_nome": " ",
        "lt_ra": 14,
        "ac_area_ce": 48,
        "ac_area_cpv": 0,
        "ac_area_cp": 0,
        "ac_area_cq": 0,
        "ac_area_cm": 0,
        "ac_area_ct": 48,
        "ct_origem": 9,
        "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [-47.747120363451806, -15.935119344167445], // P1
              [-47.74709775517919, -15.935032582317884], // P2
              [-47.74692502102059, -15.935077738210621], // P3
              [-47.746945407812255, -15.935164785802824], // P4
              [-47.74698747851916, -15.935154013175364], // P5
              [-47.746987562002765, -15.935154317378869], // P6
              //[-47.746945407812255, -15.935164785802824], // P4 (repetido, removido para evitar redundância)
              [-47.74697008718358, -15.935256678312065], // P7
              [-47.747149055848766, -15.935208777672711], // P8
              [-47.74712150871577, -15.935121053698746], // P9
              [-47.74712086123614, -15.935121214585676], // P10
              [-47.747120363451806, -15.935119344167445] // P1 (fechando o polígono)
            ]
          ]
        ]
      }
    }
  ```

## Autor

Projeto criado por Eli.

Revisar durante o desenvolvimento:

- React como base sólida para aplicações front-end em 2026;
- Vite como padrão para projetos React sem framework;
- Next.js para aplicações que exigem SEO, SSR e cache;
- TanStack Router como alternativa moderna ao React Router DOM;
- Tailwind CSS fortalecido pela integração com IA e componentização;
- TanStack Query (React Query) com Suspense para comunicação de dados;
- Zustand como padrão de mercado para gerenciamento de estado;
- Radix UI e Base UI para componentes acessíveis e desacoplados;
- React Hook Form com Zod para formulários e validação de dados;
- Playwright como ferramenta essencial para testes automatizados;
- Arquiteturas Local First e Offline First como tendência;
- Ferramentas como Electric SQL, TanStack DB e Xero;
- Maior aproximação entre design e desenvolvimento front-end impulsionada pela IA.

Alterado para Branch DEV

