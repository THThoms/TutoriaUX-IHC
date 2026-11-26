# Contribución — Tomás Solis

**Rol:** arquitectura e implementación (rúbrica: "Arquitectura e implementación funcional" y
"GitHub, documentación y colaboración").

## Entregables

| Entregable | Archivo |
|---|---|
| Capa de dominio (entidad, estados, reglas, validaciones) | `src/domain/` |
| Capa de aplicación (casos de uso R1–R6, borrador) | `src/application/reservaService.js` |
| Capa de infraestructura (catálogo y `localStorage`) | `src/infrastructure/` |
| Capa de presentación (vistas, componentes, enrutador, estilos mobile first) | `src/presentation/`, `index.html` |
| Punto de composición | `src/main.js` |
| Servidor local sin dependencias | `scripts/servidor.js`, `package.json` |
| 22 pruebas funcionales | `tests/` |
| Documento de arquitectura con diagramas | `docs/arquitectura.md` |
| Documento de pruebas funcionales | `docs/pruebas-funcionales.md` |
| README del repositorio | `README.md` |

## Decisiones tomadas

- JavaScript nativo con módulos ES y capas separadas para poder probar dominio y aplicación sin navegador.
- Validación por paso con resumen de errores enlazado y mensajes junto al campo.
- Borrador persistente para no perder datos al volver, corregir o recargar.
- Foco gestionado entre pantallas y pasos; región `aria-live` para anuncios.
