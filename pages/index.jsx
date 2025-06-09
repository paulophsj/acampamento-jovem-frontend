import { getAllMessagesForUser, postMessages } from '@/api/Messages';
import { createUser } from '@/api/User';
import { UseUserContext } from '@/components/Auth/UserContext';
import Alert from '@/components/LabelMessage';
import Loader from '@/components/Loader';
import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faBirthdayCake, faEnvelope, faFire, faHeart, faMapMarked, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { IMaskInput } from 'react-imask';

const AcampamentoJuventude = () => {
  const { user, load } = UseUserContext()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasMedication, setHasMedication] = useState(false);
  const [hasAllergies, setHasAllergies] = useState(false);
  const [hasPsychMeds, setHasPsychMeds] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false)
  const [mensagemMural, setMensagemMural] = useState({
    isError: null,
    message: null
  })
  const [loadMessages, setLoadMessages] = useState(false)

  const [error, setError] = useState({
    isError: null,
    mensagem: null
  })

  const getAllMessages = async () => {
    setLoadMessages(true)
    try {
      const data = await getAllMessagesForUser()
      setMessages(data)
    } catch (error) {
      console.error(error.messages)
    }
    setLoadMessages(false)

  }
  useEffect(() => {
    getAllMessages()
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(e.target);
    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    try {
      await createUser(formDataObj)
      setError({
        isError: false,
        mensagem: "Você foi registrado e em breve terá um retorno!"
      })
      e.target.reset();
    } catch (err) {
      setError({
        isError: true,
        mensagem: err.message
      })
    }
    finally {
      setLoading(false)
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const formObject = {}
    formData.forEach((value, key) => {
      formObject[key] = value
    })
    try {
      await postMessages(formObject)
      setMensagemMural({ isError: false, message: "Agradeçemos sua mensagem! Em breve ela será analisada e inserida no mural." })
      e.target.reset()
    } catch (error) {
      setMensagemMural({
        isError: true,
        message: error.message
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleAnchorClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }

    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-white text-gray-900 max-sm:absolute">
      {/* Header/Navbar */}
      <header className="fixed w-full bg-black bg-opacity-90 text-white z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="cross-icon"></div>
            <span className="font-bold text-lg">Acampamento 2025</span>
          </div>

          <button
            id="mobile-menu-button"
            className="md:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>

          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="nav-link relative group hover:text-gray-300 transition-colors" onClick={handleAnchorClick}>Início<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></a>
            <a href="#about" className="nav-link relative group hover:text-gray-300 transition-colors" onClick={handleAnchorClick}>Sobre<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></a>
            <a href="#gallery" className="nav-link relative group hover:text-gray-300 transition-colors" onClick={handleAnchorClick}>Galeria<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></a>
            <a href="#registration" className="nav-link relative group hover:text-gray-300 transition-colors" onClick={handleAnchorClick}>Inscrição<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></a>
            <a href="#messages" className="nav-link relative group hover:text-gray-300 transition-colors" onClick={handleAnchorClick}>Mensagens<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></a>
            <a href="#contact" className="nav-link relative group hover:text-gray-300 transition-colors" onClick={handleAnchorClick}>Contato<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span></a>

            {
              load ? <Loader spinCollor={'white'} borderCollor={'black'} />
                : (
                  user && user.sub ? (
                    <Link href={{ pathname: "/dashboard" }} className='className="nav-link relative group hover:text-gray-300 transition-colors"'>
                      {user.email}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  ) : (
                    <Link href={{ pathname: "/login" }} className='className="nav-link relative group hover:text-gray-300 transition-colors"'>
                      Login
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )
                )
            }
          </nav>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-black bg-opacity-95 w-full`}>
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            <a href="#home" className="text-white hover:text-gray-300 transition-colors" onClick={handleAnchorClick}>Início</a>
            <a href="#about" className="text-white hover:text-gray-300 transition-colors" onClick={handleAnchorClick}>Sobre</a>
            <a href="#gallery" className="text-white hover:text-gray-300 transition-colors" onClick={handleAnchorClick}>Galeria</a>
            <a href="#registration" className="text-white hover:text-gray-300 transition-colors" onClick={handleAnchorClick}>Inscrição</a>
            <a href="#messages" className="text-white hover:text-gray-300 transition-colors" onClick={handleAnchorClick}>Mensagens</a>
            <a href="#contact" className="text-white hover:text-gray-300 transition-colors" onClick={handleAnchorClick}>Contato</a>
            {
              load ? <Loader spinCollor={'white'} borderCollor={'black'} />
                : (
                  user && user.sub ? (
                    <Link href={{ pathname: "/dashboard" }} className='className="nav-link relative group hover:text-gray-300 transition-colors"'>
                      {user.email}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  ) : (
                    <Link href={{ pathname: "/login" }} className='className="nav-link relative group hover:text-gray-300 transition-colors"'>
                      Login
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )
                )
            }
          </div>
        </div>
      </header >

      {/* Hero Section */}
      < section id="home" className="hero-section min-h-screen flex items-center justify-center text-white pt-16" >
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L12 20" stroke="white" strokeWidth="2" strokeLinecap="round"></path>
              <path d="M4 12L20 12" stroke="white" strokeWidth="2" strokeLinecap="round"></path>
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">ACAMPAMENTO DA JUVENTUDE 2025</h1>
          <p className="text-xl md:text-2xl font-light mb-8">Edição especial no centenário da nossa igreja</p>
          <p className="text-xl md:text-3xl font-medium mb-12 max-w-3xl mx-auto">"Um reencontro com Deus, com você mesmo e com a juventude!"</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a href="#registration" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors transform hover:scale-105 duration-200" onClick={handleAnchorClick}>INSCREVA-SE</a>
            <a href="#about" className="border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-black transition-colors" onClick={handleAnchorClick}>SAIBA MAIS</a>
          </div>
        </div>
      </section >

      {/* About Section */}
      < section id="about" className="py-20 bg-black text-white" >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">SOBRE O ACAMPAMENTO</h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gray-900 p-8 rounded-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                  <h3 className="text-xl font-bold">Nosso Propósito</h3>
                </div>
                <p className="text-gray-300">O Acampamento da Juventude é um momento especial de conexão espiritual, onde jovens de diversas redes da Igreja Batista em Coqueiral se reúnem para fortalecer sua fé, criar laços de amizade e vivenciar experiências transformadoras.</p>
              </div>

              <div className="bg-gray-900 p-8 rounded-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <h3 className="text-xl font-bold">União de Redes</h3>
                </div>
                <p className="text-gray-300">Reunimos adolescentes e jovens de diversos grupos pequenos, projetos locais e regionais, incluindo participantes do Agreste de Pernambuco, criando uma comunidade vibrante e diversa unida pela fé.</p>
              </div>

              <div className="bg-gray-900 p-8 rounded-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faBirthdayCake} />
                  </div>
                  <h3 className="text-xl font-bold">Edição Centenário</h3>
                </div>
                <p className="text-gray-300">Em 2025, celebramos o centenário da Igreja Batista em Coqueiral, tornando este acampamento uma edição histórica e especial. Uma oportunidade única de fazer parte desta celebração enquanto renovamos nossa fé.</p>
              </div>

              <div className="bg-gray-900 p-8 rounded-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faFire} />
                  </div>
                  <h3 className="text-xl font-bold">Impacto Transformador</h3>
                </div>
                <p className="text-gray-300">Mais que um evento, o acampamento é uma experiência que transforma vidas. Através de momentos de adoração, estudos bíblicos, atividades recreativas e comunhão, buscamos um encontro genuíno com Deus.</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-xl font-light italic">"Esperamos receber cerca de 300 participantes para juntos vivermos momentos inesquecíveis de fé e comunhão."</p>
            </div>
          </div>
        </div>
      </section >

      {/* Gallery Section */}
      < section id="gallery" className="py-20 bg-white" >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">GALERIA DE FOTOS</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Placeholder for gallery images */}
            <div className="gallery-item aspect-square hover:scale-105 transition-transform bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/IMG_8030.JPG"
                alt="Imagem do acampamento"
                fill
                className="object-cover"
              />
            </div>
            <div className="gallery-item aspect-square hover:scale-105 transition-transform bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/IMG_8157.JPG"
                alt="Imagem do acampamento"
                fill
                className="object-cover"
              />
            </div>
            <div className="gallery-item aspect-square hover:scale-105 transition-transform bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/IMG_8224.JPG"
                alt="Imagem do acampamento"
                fill
                className="object-cover"
              />
            </div>
            <div className="gallery-item aspect-square hover:scale-105 transition-transform bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/imagem5.JPG"
                alt="Imagem do acampamento"
                fill
                className="object-cover"
              />
            </div>
            <div className="gallery-item aspect-square hover:scale-105 transition-transform bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/IMG_8310.JPG"
                alt="Imagem do acampamento"
                fill
                className="object-cover"
              />
            </div>
            <div className="gallery-item aspect-square hover:scale-105 transition-transform bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/IMG_9835.jpg"
                alt="Imagem do acampamento"
                fill
                className="object-cover"
              />
            </div>
            <div className="gallery-item aspect-square hover:scale-105 transition-transform bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/20190413194352_IMG_9860.jpg"
                alt="Imagem do acampamento"
                fill
                className="object-cover"
              />
            </div>
            <div className="gallery-item aspect-square hover:scale-105 transition-transform bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/IMG_7827.JPG"
                alt="Imagem do acampamento"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="mt-10 text-center">
            <p className="text-gray-600">Fotos de acampamentos anteriores. Venha fazer parte desta história!</p>
          </div>
        </div>
      </section >

      {/* Registration Form Section */}
      < section id="registration" className="py-20 bg-black text-white" >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">INSCRIÇÃO</h2>

          <div className="max-w-3xl mx-auto bg-gray-900 rounded-lg p-8">
            <form id="registration-form" className="space-y-6" onSubmit={handleRegistrationSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nome" className="block mb-2 font-medium">Nome completo</label>
                  <input type="text" id="nome" name="nome" required className="form-input w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none" />
                </div>

                <div>
                  <label htmlFor="nomeGrupo" className="block mb-2 font-medium">Nome do grupo pequeno</label>
                  <input type="text" id="nomeGrupo" name="nomeGrupo" required className="form-input w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="telefoneUsuario" className="block mb-2 font-medium">Telefone do participante</label>
                  <IMaskInput
                    mask="(00) 0 0000-0000"
                    definitions={{
                      '0': /[0-9]/
                    }}
                    type="tel"
                    id="telefoneUsuario"
                    name="telefoneUsuario"
                    required
                    className="form-input w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="nomeResponsavel" className="block mb-2 font-medium">Nome do responsável</label>
                  <input type="text" id="nomeResponsavel" name="nomeResponsavel" required className="form-input w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none" />
                </div>

                <div>
                  <label htmlFor="telefoneResponsavel" className="block mb-2 font-medium">Telefone do responsável</label>
                  <IMaskInput
                    mask="(00) 0 0000-0000"
                    definitions={{
                      '0': /[0-9]/
                    }}
                    type="tel"
                    id="telefoneResponsavel"
                    name="telefoneResponsavel"
                    required
                    className="form-input w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="parentescoResponsavel" className="block mb-2 font-medium">Relação do responsável com o participante</label>
                  <input type="text" id="parentescoResponsavel" name="parentescoResponsavel" required className="form-input w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none" />
                </div>

                <div>
                  <label htmlFor="rede" className="block mb-2 font-medium">Rede ou projeto ao qual pertence</label>
                  <input type="text" id="rede" name="rede" required className="form-input w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none" />
                </div>

                <div>
                  <label htmlFor="tamanhoCamisa" className="block mb-2 font-medium">Tamanho da camisa</label>
                  <select id="tamanhoCamisa" name="tamanhoCamisa" required className="form-input w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none">
                    <option value="">Selecione</option>
                    <option value="PP">PP</option>
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                    <option value="GG">GG</option>
                    <option value="XG">XG</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6 mt-6">
                <h3 className="text-xl font-bold mb-4">Informações de Saúde</h3>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-5 w-5"
                        checked={hasMedication}
                        onChange={(e) => setHasMedication(e.target.checked)}
                      />
                      <span>Usa algum medicamento contínuo?</span>
                    </label>
                    <div id="medicationDetails" className={`mt-3 ${hasMedication ? 'block' : 'hidden'}`}>
                      <label htmlFor="medication" className="block mb-2 font-medium">Qual medicamento?</label>
                      <input
                        type="text"
                        id="temMedicamento"
                        name="temMedicamento"
                        className="form-input w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none"
                        required={hasMedication}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-5 w-5"
                        checked={hasAllergies}
                        onChange={(e) => setHasAllergies(e.target.checked)}
                      />
                      <span>Tem alergias?</span>
                    </label>
                    <div id="allergiesDetails" className={`mt-3 ${hasAllergies ? 'block' : 'hidden'}`}>
                      <label htmlFor="allergies" className="block mb-2 font-medium">Quais alergias?</label>
                      <input
                        type="text"
                        id="temAlergia"
                        name="temAlergia"
                        className="form-input w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none"
                        required={hasAllergies}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-5 w-5"
                        checked={hasPsychMeds}
                        onChange={(e) => setHasPsychMeds(e.target.checked)}
                      />
                      <span>Usa medicamentos psicológicos?</span>
                    </label>
                    <div id="psychMedsDetails" className={`mt-3 ${hasPsychMeds ? 'block' : 'hidden'}`}>
                      <label htmlFor="psychTreatment" className="block mb-2 font-medium">Qual o tipo de tratamento ou problema?</label>
                      <input
                        type="text"
                        id="temMedicamentoControlado"
                        name="temMedicamentoControlado"
                        className="form-input w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none"
                        required={hasPsychMeds}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {
                error && error.isError !== null ? <Alert isError={error.isError} message={error.mensagem} /> : ""
              }
              <div className="text-center pt-6">
                <button type={!loading ? "submit" : "button"} className="bg-white cursor-pointer text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors transform hover:scale-105 duration-200">
                  {
                    loading ? (
                      <Loader spinCollor={'black'} />
                    ) : (
                      "ENVIAR INSCRICAO"
                    )
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </section >

      {/* Messages Wall Section */}
      < section id="messages" className="py-20 bg-white" >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">MURAL DE MENSAGENS</h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-100 rounded-lg p-6 mb-10">
              <form id="message-form" className="space-y-4" onSubmit={handleMessageSubmit}>
                <div>
                  <label htmlFor="nome" className="block mb-2 font-medium">Seu nome</label>
                  <input type="text" id="nome" name="nome" required className="form-input bg-white w-full px-4 py-2 rounded border border-gray-300 focus:outline-1" />
                </div>

                <div>
                  <label htmlFor="mensagem" className="block mb-2 font-medium">Sua mensagem, expectativa ou oração</label>
                  <textarea id="mensagem" name="mensagem" rows="4" required className="form-input bg-white w-full px-4 py-2 rounded border border-gray-300 focus:outline-1"></textarea>
                </div>

                <div className="text-center">
                  <div className={"mb-6"}>
                    {
                      loadMessages ? (
                        <div className='flex gap-2'>
                          <Loader spinCollor={'black'} />
                          <p>
                            Carregando mensagens...
                          </p>
                        </div>
                      ) : (
                        mensagemMural && mensagemMural.isError == true ? <Alert isError={true} message={mensagemMural.message} />
                          : mensagemMural && mensagemMural.isError == false ? <Alert isError={false} message={mensagemMural.message} />
                          : ""
                      )
                    }
                  </div>
                  <button type="submit" className="bg-black text-white px-6 py-2 rounded-full font-bold hover:bg-gray-800 transition-colors">COMPARTILHAR</button>
                </div>
              </form>
            </div>

            <div id="messages-container" className="grid md:grid-cols-2 gap-6">
              {messages.map(message => (
                <div key={message.id} className="message-card bg-gray-100 p-6 rounded-lg">
                  <p className="italic text-gray-600 mb-4">"{message.mensagem}"</p>
                  <p className="font-bold text-right">- {message.nome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section >

      {/* Contact Section */}
      < section id="contact" className="py-20 bg-black text-white" >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">CONTATO</h2>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
            <div>
              <div className="bg-gray-900 p-8 rounded-lg h-full">
                <h3 className="text-xl font-bold mb-6">Informações</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <FontAwesomeIcon icon={faMapMarked} />
                    </div>
                    <div>
                      <p className="font-bold mb-1">Local do Acampamento</p>
                      <p className="text-gray-300">Estrada do Monjope, 54 - Monjope, Igarassu - PE</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <FontAwesomeIcon icon={faPhone} />
                    </div>
                    <div>
                      <p className="font-bold mb-1">Telefone</p>
                      <p className="text-gray-300">(81) 99949-2125</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div>
                      <p className="font-bold mb-1">E-mail</p>
                      <p className="text-gray-300">acampamentojuventude2025@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-900 p-8 rounded-lg h-full">
                <h3 className="text-xl font-bold mb-6">Redes Sociais</h3>

                <div className="space-y-6">
                  <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="flex items-center group">
                    <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center mr-4 group-hover:bg-green-500 group-hover:text-white transition-colors">
                      <FontAwesomeIcon icon={faWhatsapp} />
                    </div>
                    <span className="group-hover:underline">WhatsApp</span>
                  </a>

                  <div className="pt-6 border-t border-gray-700">
                    <h4 className="font-bold mb-4">Compartilhe este evento</h4>
                    <div className="flex space-x-4">
                      <a href="#" className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                        <FontAwesomeIcon icon={faFacebook} />
                      </a>
                      <a href="#" className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors">
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                      <a href="#" className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors">
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Footer */}
      < footer className="bg-gray-900 text-white py-10" >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="cross-icon"></div>
                <span className="font-bold text-lg">Acampamento da Juventude 2025</span>
              </div>
              <p className="text-gray-400 mt-2">Igreja Batista em Coqueiral</p>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400">© 2024 Igreja Batista em Coqueiral</p>
              <p className="text-gray-400">Edição Especial de Centenário</p>
            </div>
          </div>
        </div>
      </footer >

      {/* Back to Top Button */}
      < button
        id="back-to-top"
        className={`fixed bottom-6 right-6 bg-black text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${showBackToTop ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={scrollToTop}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button >
    </div >
  );
};

export default AcampamentoJuventude;