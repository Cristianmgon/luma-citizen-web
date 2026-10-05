import Link from "next/link";
import PublicFooter from "@/components/public-footer";

export const metadata = {
  title: "Términos y Condiciones de Uso y Privacidad | Luma Protect",
  description:
    "Marco regulatorio, descargo de responsabilidad, política Zero-PII (Ley 25.326) y términos de uso del ecosistema Luma Protect.",
};

export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6 sm:py-10 px-4 sm:px-0">
      {/* HEADER INSTITUCIONAL */}
      <header className="rounded-3xl border border-blue-100 bg-gradient-to-br from-lumaBlueSoft via-white to-blue-50/30 p-6 sm:p-10 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-lumaBlue">
            Marco Institucional y Legal
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            Ley Nacional 25.326 (Protección de Datos Personales)
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
            Vigencia: Septiembre 2026
          </span>
        </div>

        <h1 className="text-3xl font-black text-lumaText sm:text-4xl">
          Términos y Condiciones de Uso y Privacidad
        </h1>

        <p className="text-sm leading-relaxed text-lumaSubtext sm:text-base max-w-3xl">
          Marco regulatorio, salvaguardas ciudadanas y descargo de responsabilidad aplicable a la plataforma web,
          aplicaciones móviles, herramientas preventivas y canales comunitarios del ecosistema <strong>Luma Protect</strong>.
        </p>

        <div className="text-xs text-slate-500 border-t border-blue-200/60 pt-4 flex flex-wrap gap-x-6 gap-y-2">
          <p><strong>Iniciativa:</strong> Proyecto de Investigación Aplicada — Estudiantes de la Licenciatura en Ciberseguridad (UNSO)</p>
          <p><strong>Ámbito:</strong> Universidad Nacional Raúl Scalabrini Ortiz (UNSO)</p>
        </div>
      </header>

      {/* CUERPO LEGAL Y ARTÍCULOS */}
      <main className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 text-slate-800 shadow-sm leading-relaxed text-sm">
        {/* ARTÍCULO 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-lumaBlue flex items-center gap-2">
            <span>1.</span> Naturaleza y Alcance del Ecosistema Luma Protect
          </h2>
          <div className="space-y-2 text-xs sm:text-sm text-slate-700">
            <p>
              <strong>1.1. Finalidad Preventiva y Comunitaria:</strong> El ecosistema Luma Protect (incluyendo su portal web <code>lumaprotect.vercel.app</code>,
              aplicaciones móviles Android, asistentes automatizados y canales de difusión) constituye una herramienta de <strong>asistencia pedagógica,
              concientización civil y mitigación comunitaria</strong> ante el avance del cibercrimen y la ingeniería social digital.
            </p>
            <p>
              <strong>1.2. No constituye Asesoramiento Financiero ni Peritaje Judicial:</strong> Luma Protect <strong>NO es una entidad bancaria, no es una compañía aseguradora contra fraudes, no brinda asesoramiento financiero ni legal vinculante, ni emite dictámenes periciales judiciales</strong>.
              Toda alerta, diagnóstico, puntaje de riesgo o recomendación emitida por los modelos heurísticos responde a estimaciones probabilísticas automatizadas al momento de la consulta
              cuyo único fin es instar a la prudencia ciudadana (<em>&quot;Hacé una pausa&quot;</em>), sin reemplazar el criterio humano ni los canales formales de las autoridades.
            </p>
            <p>
              <strong>1.3. Deslinde y Carácter Estudiantil Autónomo (Aviso sobre la UNSO):</strong> Luma Protect es una iniciativa independiente de investigación aplicada y desarrollo tecnológico concebida e impulsada de manera autónoma por alumnos regulares de la Licenciatura en Ciberseguridad de la Universidad Nacional Raúl Scalabrini Ortiz (UNSO) como parte preparatoria de su Trabajo Final Integrador (TFI). La Universidad Nacional Raúl Scalabrini Ortiz (UNSO) no forma parte societaria, no financia, no patrocina, no administra ni ha emitido a la fecha aval institucional formal, aprobación ni homologación sobre este software, sus herramientas, marcas o diagnósticos. Las opiniones, heurísticas y contenidos expresados son de exclusiva responsabilidad de sus autores y desarrolladores.
            </p>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* ARTÍCULO 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-lumaBlue flex items-center gap-2">
            <span>2.</span> Descargo Expreso de Responsabilidad y Limitación de Daños
          </h2>
          <div className="space-y-2 text-xs sm:text-sm text-slate-700">
            <p>
              <strong>2.1. Decisiones Autónomas del Usuario:</strong> El usuario reconoce y acepta de manera informada y voluntaria que cualquier acción u omisión patrimonial,
              transferencia monetaria, revelación de credenciales, instalación de software o comunicación con terceros que realice, es de su <strong>exclusiva y total responsabilidad personal</strong>.
              Luma Protect, su dirección técnica, sus colaboradores y la institución académica quedan <strong>plenamente deslindados de cualquier daño directo, indirecto, incidental, punitivo o consecuente</strong>,
              lucro cesante, retención de haberes o perjuicio económico derivado de la utilización o imposibilidad de utilización de sus servicios.
            </p>
            <p>
              <strong>2.2. Margen Heurístico de Falsos Positivos y Falsos Negativos:</strong> Por la naturaleza cambiante del cibercrimen, ningún software es 100% infalible:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li><strong>Falsos Negativos:</strong> Luma no garantiza la detección universal de todos los ardides o fraudes existentes.</li>
              <li><strong>Falsos Positivos:</strong> La emisión de una señal de advertencia sobre un mensaje, cuenta o enlace no representa una imputación penal contra ninguna persona o empresa, sino una alerta preventiva basada en heurísticas de anomalía.</li>
            </ul>
            <p>
              <strong>2.3. Exoneración ante Entidades Bancarias y Fintechs:</strong> Las referencias analíticas que la plataforma realice sobre bancos o billeteras virtuales
              (Mercado Pago, Cuenta DNI, Banco de la Nación Argentina, Banco Galicia, Santander, BBVA, etc.) se realizan con fines estrictamente orientados a la detección de usurpación de marca
              por parte de ciberdelincuentes. <strong>Luma Protect no audita la infraestructura ni califica la solvencia ni la seguridad intrínseca de dichas entidades</strong>,
              amparándose bajo la doctrina de <em>Safe Harbor</em> y divulgación de buena fe.
            </p>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* ARTÍCULO 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-lumaBlue flex items-center gap-2">
            <span>3.</span> Condiciones Específicas por Servicio
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 space-y-1.5">
              <h3 className="font-bold text-slate-900">3.1 Verificador Ciudadano de Textos (/verificador)</h3>
              <p>
                Opera como herramienta preventiva comunitaria y pedagógica. El procesamiento de texto se efectúa de modo efímero y anónimo en memoria volátil de tu dispositivo.
              </p>
              <p className="font-semibold text-rose-800">
                ⚠️ Protocolo de Devolución Bancaria Segura: Si un usuario recibe fondos por error, la única vía válida y segura de reintegro es el botón oficial &quot;Devolver transferencia&quot;
                dentro de su propia aplicación bancaria. Se desaconseja terminantemente realizar transferencias manuales hacia otros alias o cuentas sugeridas por chat para evitar maniobras de triangulación.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 space-y-1.5">
              <h3 className="font-bold text-slate-900">3.2 Aplicación Móvil Android</h3>
              <p>
                Por estrictos estándares de seguridad preventiva ciudadana, <strong>la aplicación no se distribuye mediante descargas directas de archivos APK no verificados</strong>.
                La distribución oficial se canaliza con exclusividad a través de <strong>Google Play Store</strong> bajo certificación y previo paso por el programa de evaluación con la comunidad universitaria.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 space-y-1.5">
              <h3 className="font-bold text-slate-900">3.3 Canales y Asistentes de Difusión Ciudadana</h3>
              <p>
                Los canales oficiales de Telegram, TikTok y Facebook operan como medios de divulgación y alerta temprana. No se solicitan transferencias ni datos bancarios por ninguno de estos medios.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* ARTÍCULO 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-lumaBlue flex items-center gap-2">
            <span>4.</span> Política Radical Zero-PII (Ley Nacional 25.326)
          </h2>
          <div className="space-y-2 text-xs sm:text-sm text-slate-700">
            <p>
              En estricto acatamiento a la <strong>Ley N° 25.326 de Protección de Datos Personales</strong> de la República Argentina:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li><strong>Procesamiento On-Device / Local:</strong> El análisis semántico en navegador y dispositivos móviles opera en memoria local sin retransmitir mensajes a servidores centrales.</li>
              <li><strong>Cero Venta o Cesión de Datos:</strong> Luma Protect no comercializa, no renta, no comparte ni monetiza información con terceros, anunciantes ni agregadores de datos.</li>
              <li><strong>Sin Recolección de Identificadores:</strong> No se solicitan números de documento (DNI), claves bancarias, CVU, CBU ni contraseñas de ningún tipo.</li>
            </ul>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* ARTÍCULO 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-lumaBlue flex items-center gap-2">
            <span>5.</span> Canales Oficiales para Denuncias Penales
          </h2>
          <div className="space-y-2 text-xs sm:text-sm text-slate-700">
            <p>
              Si usted ha sido víctima de una estafa consumada o de extorsión, Luma Protect le recuerda que debe radicar la denuncia de inmediato ante las autoridades judiciales competentes:
            </p>
            <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-4 space-y-2 text-xs sm:text-sm">
              <p>
                <strong>Unidad Fiscal Especializada en Ciberdelincuencia (UFECI):</strong><br />
                Ministerio Público Fiscal de la Nación · Correo:{" "}
                <a href="mailto:denunciasufeci@mpf.gov.ar" className="text-lumaBlue underline font-semibold">
                  denunciasufeci@mpf.gov.ar
                </a><br />
                Portal institucional:{" "}
                <a
                  href="https://www.mpf.gob.ar/ufeci/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lumaBlue underline font-semibold"
                >
                  mpf.gob.ar/ufeci
                </a>
              </p>
              <p>
                <strong>Comisarías y Fiscalías de Turno:</strong> Diríjase a la seccional policial o fiscalía correspondiente a su domicilio con el registro de capturas, comprobantes y mensajes pertinentes.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* ARTÍCULO 6 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-lumaBlue flex items-center gap-2">
            <span>6.</span> Aceptación Plena y Vigencia
          </h2>
          <p className="text-xs sm:text-sm text-slate-700">
            La navegación en el portal, la descarga de material educativo o la interacción con cualquiera de las utilidades de Luma Protect implica la
            <strong> conformidad íntegra y sin reserva con los términos y descargos aquí expuestos</strong>.
            Cualquier modificación será debidamente actualizada y publicada en esta misma sección.
          </p>
        </section>
      </main>

      {/* CTA VOLVER */}
      <div className="text-center pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-xs font-bold text-white hover:bg-slate-800 transition"
        >
          ← Volver al Portal Principal
        </Link>
      </div>

      <PublicFooter />
    </div>
  );
}
