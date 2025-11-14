# Kilorama

Aplicación web para registrar y gestionar el trabajo de trozado de vegetales, con seguimiento de entregas diarias y generación de comprobantes por período de pago.

## 🚀 Características

- **Registro de entregas**: Múltiples entregas por día con kilos solicitados y entregados
- **Períodos automáticos**: Cálculo de períodos de pago (1-15 y 16-fin de mes)
- **Comprobantes PDF**: Generación de tickets con resumen detallado
- **Almacenamiento persistente**: Los datos se guardan localmente
- **Edición y eliminación**: Gestión completa de registros
- **Diseño responsivo**: Interfaz optimizada para móvil y escritorio

## 🛠️ Tecnologías

- React 18
- Vite
- Tailwind CSS
- jsPDF
- Lucide React (iconos)

## 📦 Instalación
```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/control-trozado.git

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build
```

## 🌐 Despliegue en Vercel

1. Conecta tu repositorio en [vercel.com](https://vercel.com)
2. Framework Preset: **Vite**
3. Despliega automáticamente

## 📁 Estructura del Proyecto
```
src/
├── components/          # Componentes React
│   ├── Header.jsx
│   ├── Summary.jsx
│   ├── EntryForm.jsx
│   └── EntryList.jsx
├── utils/              # Utilidades
│   ├── pdfGenerator.js
│   └── storage.js
├── styles/             # Estilos CSS
│   └── index.css
├── App.jsx             # Componente principal
└── main.jsx            # Punto de entrada
```

## 💡 Uso

1. **Crear registro**: Click en "Nuevo Registro", ingresa fecha y entregas
2. **Ver período actual**: Resumen automático con totales
3. **Generar comprobante**: Descarga PDF con detalle completo
4. **Editar/Eliminar**: Gestiona registros individuales o días completos

## 📄 Licencia

MIT

## 👤 Autor

© 2025 Beraka Studio