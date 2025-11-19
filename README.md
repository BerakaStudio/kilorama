# Kilorama

Aplicación web para registrar y gestionar el trabajo de trozado de vegetales, con seguimiento de entregas diarias y generación de comprobantes por período de pago.

## 🚀 Características

- **Registro de entregas**: Múltiples entregas por día con kilos solicitados y entregados
- **Períodos automáticos**: Cálculo de períodos de pago (1-15 y 16-fin de mes)
- **Comprobantes PDF**: Generación de tickets tipo recibo con resumen detallado y altura dinámica
- **Almacenamiento persistente**: Datos guardados localmente con sincronización entre pestañas
- **Onboarding personalizado**: Introducción interactiva con registro de usuario
- **Registro rápido**: Botón "Registrar Hoy" para acceso directo desde el header
- **Panel de configuración**: Modo claro/oscuro, ajuste de tamaño de fuente (S/M/L), cambio de nombre
- **Edición y eliminación**: Gestión completa de registros agrupados por día
- **Diseño responsivo**: Interfaz optimizada para móvil y escritorio con skeleton loaders
- **PWA ready**: Preparada para instalación como aplicación

## 🛠️ Tecnologías

- React 18
- Vite
- Tailwind CSS
- jsPDF
- Lucide React (iconos)
- React Hot Toast (notificaciones)

## 📦 Instalación
```bash
# Clonar repositorio
git clone https://github.com/BerakaStudio/kilorama.git

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
│   ├── EntryList.jsx
│   ├── Modal.jsx
│   ├── OnboardingModal.jsx
│   ├── SettingsModal.jsx
│   ├── SkeletonLoader.jsx
│   └── Footer.jsx
├── contexts/           # Contextos React
│   └── ThemeContext.jsx
├── utils/              # Utilidades
│   ├── pdfGenerator.js
│   └── storage.js
├── styles/             # Estilos CSS
│   └── index.css
├── img/                # Recursos visuales
├── App.jsx             # Componente principal
└── main.jsx            # Punto de entrada
```

## 💡 Uso

1. **Primera vez**: Completa el onboarding e ingresa tu nombre
2. **Crear registro**: Click en "Nuevo Registro" o "Registrar Hoy" desde el header
3. **Ver período actual**: Resumen automático con totales en tiempo real
4. **Generar comprobante**: Descarga PDF tipo ticket con altura adaptativa
5. **Configuración**: Ajusta tema, tamaño de texto y cambia tu nombre
6. **Editar/Eliminar**: Gestiona días completos con todos sus registros

## 🎨 Características de Diseño

- Fuente Inter desde Google Fonts
- Modo claro/oscuro con persistencia
- 3 tamaños de texto (S/M/L) con escalado proporcional de iconos
- Interfaz adaptativa mobile/desktop
- Skeleton loaders durante carga inicial
- Toast notifications para feedback inmediato
- Tooltips informativos en acciones principales

## 📄 Licencia

MIT

## 👤 Autor

© 2025 [Beraka Studio](https://beraka.cl)