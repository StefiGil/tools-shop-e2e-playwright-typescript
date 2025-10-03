# Tools Shop

## Descripción
Este proyecto contiene pruebas automatizadas de la página de **Tools Shop** utilizando **Playwright y TypeScript**. El objetivo es validar los principales flujos funcionales del sistema de forma escalable y reproducible.

Se abordan los siguientes módulos:
- Autenticación
- Gestión de Productos
- Carrito de Compras
- Checkout
- Órdenes

## Estructura del proyecto
```text
auto-sales-e2e-playwright-typescript/
|- tests/                  # Archivos de pruebas organizados por módulo
|- page-objects/           # Modelos de página (Page Object Model)
|- data/                   # Datos de prueba (JSON)
|- playwright.config.ts    # Configuración de Playwright
|- package.json            # Dependencias y scripts
```

## Patrones de diseño utilizados
- **Page Object Model (POM)**: cada página tiene su clase para centralizar locators y acciones.
- **Fixtures**: configuración de setup y teardown para tests.
- **Data-driven testing**: pruebas parametrizadas con archivos JSON, para cubrir múltiples escenarios sin repetir código.

## Requisitos
- Node.js >= 18
- npm
- Navegador Chromium, Firefox o WebKit (gestionado por Playwright)

## Instalación
```bash
git clone https://github.com/StefiGil/tools-shop-e2e-playwright-typescript.git
cd auto-sales-e2e-playwright-typescript
npm install
```

## Ejecución de pruebas
- Ejecutar todas las pruebas:
```bash
npm test
```
- Ejecutar pruebas de un módulo específico:
```bash
npm test tests/gestion-productos
```
- Ejecutar con reporte en HTML:
```bash
npm test:report
```

