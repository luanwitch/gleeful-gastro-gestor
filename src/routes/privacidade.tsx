import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { isPlaceholder, site, whatsappUrl } from "@/config/site";

export const Route = createFileRoute("/privacidade")({
  component: PrivacyPage,
});

function PrivacyPage() {
  const emailOk = !isPlaceholder(site.contact.email);
  const whatsappOk = !isPlaceholder(site.contact.whatsappNumber);

  return (
    <div className="min-h-dvh bg-paper text-earth">
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-sm text-earth/65">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-earth/80">
          <section>
            <h2 className="font-display text-xl font-semibold text-earth">Introdução</h2>
            <p className="mt-3">
              Esta Política de Privacidade descreve como {site.name} coleta, usa e protege as
              informações pessoais que você compartilha por meio deste site. Estamos comprometidos
              com a proteção da sua privacidade e com o cumprimento da Lei Geral de Proteção de
              Dados (LGPD).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-earth">Dados coletados</h2>
            <p className="mt-3">Podemos coletar os seguintes tipos de informações:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Dados de contato:</strong> nome, e-mail e número de WhatsApp, quando você
                preenche o formulário de agendamento ou entra em contato por meio dos CTAs do site.
              </li>
              <li>
                <strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas
                visitadas e tempo de permanência, por meio de ferramentas de medição de audiência
                (Plausible e/ou Google Analytics, mediante consentimento).
              </li>
              <li>
                <strong>Cookies:</strong> utilizamos cookies apenas para medição de audiência e
                funcionamento básico do site. Você pode aceitar ou continuar sem eles.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-earth">Uso das informações</h2>
            <p className="mt-3">Os dados coletados são utilizados exclusivamente para:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Responder às suas solicitações de contato e agendamento;</li>
              <li>Melhorar a experiência de navegação no site;</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
            <p className="mt-3">
              Não compartilhamos, vendemos ou transferimos suas informações pessoais a terceiros,
              exceto quando exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-earth">
              Armazenamento e segurança
            </h2>
            <p className="mt-3">
              Seus dados são armazenados em ambiente seguro e conservados apenas pelo tempo
              necessário para cumprir as finalidades descritas nesta política ou para atender a
              obrigações legais.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-earth">Seus direitos</h2>
            <p className="mt-3">De acordo com a LGPD, você tem direito a:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Confirmar a existência de tratamento de dados pessoais;</li>
              <li>Acessar, corrigir ou atualizar seus dados;</li>
              <li>Solicitar a exclusão ou anonimização de dados;</li>
              <li>Revogar o consentimento a qualquer momento.</li>
            </ul>
            <p className="mt-3">
              Para exercer esses direitos, entre em contato pelo e-mail{" "}
              {emailOk ? (
                <a
                  href={`mailto:${site.contact.email}`}
                  className="underline underline-offset-2 transition-colors hover:text-earth"
                >
                  {site.contact.email}
                </a>
              ) : (
                <span className="text-earth/50">[PREENCHER: e-mail de contato]</span>
              )}
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-earth">Contato</h2>
            <p className="mt-3">
              Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato:
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <strong>E-mail:</strong>{" "}
                {emailOk ? (
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="underline underline-offset-2 transition-colors hover:text-earth"
                  >
                    {site.contact.email}
                  </a>
                ) : (
                  <span className="text-earth/50">[PREENCHER: e-mail]</span>
                )}
              </li>
              <li>
                <strong>WhatsApp:</strong>{" "}
                {whatsappOk ? (
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 transition-colors hover:text-earth"
                  >
                    Enviar mensagem
                  </a>
                ) : (
                  <span className="text-earth/50">[PREENCHER: WhatsApp]</span>
                )}
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
