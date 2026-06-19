const storeKeys = {
  session: 'sg_platform_session',
  language: 'sg_platform_language',
  respondents: 'sg_platform_respondents',
  businesses: 'sg_platform_businesses',
  drafts: 'sg_platform_drafts',
  surveys: 'sg_platform_surveys',
  responses: 'sg_platform_product_responses',
  samples: 'sg_platform_sample_requests',
  custom: 'sg_platform_custom_program_requests',
  emails: 'sg_platform_email_logs',
  notes: 'sg_platform_lead_notes',
  passwordResets: 'sg_platform_password_resets',
  productOverrides: 'sg_platform_product_overrides',
  managerPassphraseHash: 'sg_platform_manager_passphrase_hash',
  contactInquiries: 'sg_platform_contact_inquiries',
  investorRequests: 'sg_platform_investor_requests',
  investorFeedback: 'sg_platform_investor_feedback',
  investorInteractionSession: 'sg_investor_interaction_session',
  investorInteractionEvents: 'sg_investor_interaction_events',
  investorEngagementSnapshots: 'sg_investor_engagement_snapshots',
};

const INTERNAL_NOTIFICATION_RECIPIENTS = ['me@balponics.com', 'bbalmir@gmail.com'];

const state = {
  route: 'landing',
  session: readStore(storeKeys.session, null),
  category: 'premium-lettuces',
  search: '',
  managerTab: 'overview',
  selectedProduct: null,
  expandedWhy: null,
  resetEmail: '',
  investorAccessEmail: '',
  investorTrack: 'investor',
  investorScenario: 'base',
  investorHubs: 3,
  investorAnalysis: {
    contribution: 50000,
    investorType: 'Individual',
    participation: 'Equity',
    interestLevel: 'Interested',
    notes: '',
    revenuePerHub: 1400000,
    ebitdaMargin: 24,
    valuationMultiple: 6,
    timelineYears: 5
  },
  contactInquiryType: '',
  activeHomeModel: 'symbio',
  activeHomeFamily: 'lettuces',
  activeHomeHydro: 'water',
  activeHomeStep: 'profile',
  lang: readStore(storeKeys.language, 'en'),
  productOverrides: readStore(storeKeys.productOverrides, {}),
};

const I18N = {
  en: {
    home:'Home', about:'About', products:'Products', why:'Why Hydroponics', farmsProjects:'Farms & Projects', team:'Team', contact:'Contact', register:'Register as Buyer', buyerLogin:'Buyer Login', investors:'Investor & Partnerships',
    heroEyebrow:'SymbioGreens | Powered by Balponics', heroTitle:'Premium Hydroponic Production', heroSubhead:'Fresh | Sustainable | Data-Driven', heroBody:'Helping buyers shape future production through market intelligence.',
    takeSurvey:'Take Production Survey', explore:'Explore Products', learnMore:'Learn More', resumeSurvey:'Resume Survey', aboutFarm:'About the Farm',
    landingTitle:'SymbioGreens is preparing premium hydroponic production guided by real buyer demand.', landingBody:'Explore what we grow, learn why hydroponics matters, and help guide production priorities before crops are scaled.',
    journey:[['SymbioGreens is the farm','A premium hydroponic farm initiative preparing fresh local production for Las Terrenas and the wider hospitality market.'],['Balponics powers the technical model','Hydroponic systems, crop planning, controlled-environment expertise, automation, R&D, and future farm scaling support the farm.'],['Buyer input shapes production','Survey responses help prioritize varieties, samples, estimated volumes, delivery expectations, and custom programs before production scales.']],
    howEyebrow:'How It Works', howTitle:'From Buyer Interest To Production Planning', howSteps:[['Register as buyer','Create a buyer profile so demand signals connect to your business type, location, and sourcing needs.'],['Explore catalog','Review premium lettuces, baby greens, microgreens, herbs, edible flowers, mushrooms, and specialty vegetables.'],['Indicate demand','Tell us what matters: interest level, current usage, weekly volume, delivery rhythm, and packaging preference.'],['Request samples','Use sample requests to help us understand evaluation needs before production scales.'],['Help us plan production','Your responses help prioritize crop planning, custom programs, and reliable local availability.']],
    productAssortmentTitle:'Premium Product Assortment', productAssortmentBody:'From crisp lettuces to vibrant microgreens and aromatic herbs, SymbioGreens is preparing a curated selection of premium hydroponic produce grown for freshness, consistency, and exceptional taste.', productAssortment:[['Lettuces','Beautiful, crisp, high-quality lettuces grown for restaurants, hotels, retailers, and health-conscious consumers.'],['Microgreens','Fresh, nutrient-dense microgreens with vibrant color, delicate texture, and premium culinary appeal.'],['Herbs','Aromatic herbs harvested with care to deliver freshness, fragrance, and flavor.']],
    whyTitle:'Cleaner Production. Smarter Planning. Better Freshness.', whyBody:'Hydroponic systems deliver water and nutrients directly to plant roots, reducing waste while improving consistency, quality, and year-round availability.', whyCaption:'Precision nutrition delivered directly to the root zone.',
    whyCards:{water:['Water Conservation','Hydroponic systems continuously recirculate water, reducing consumption dramatically compared with conventional field agriculture.'],pesticide:['Pesticide Reduction','Growing in controlled environments helps reduce exposure to many common pests and diseases, supporting cleaner production practices.'],nutrient:['Nutrient Efficiency','Plants receive calibrated nutrition directly at the root zone for stronger flavor, color, and consistency.'],year:['Year-Round Production','Protected hydroponic farms support reliable availability beyond normal field-season limits.'],future:['Sustainable Future','Local hydroponic production can shorten supply chains and make fresh specialty crops more resilient.']},
    harvestTitle:'Harvest & Delivery', harvestBody1:'Fresh produce is harvested, inspected, and prepared for delivery according to buyer demand signals collected through the platform.', harvestBody2:'This helps align production with real market demand while maintaining quality, consistency, and freshness.', harvestBullets:['Harvested to order when possible','Consistent quality standards','Production aligned with buyer demand','Reduced supply chain complexity','Premium hydroponic freshness'], harvestCaption:'Harvested fresh and prepared for delivery.',
    qualityTitle:'Quality Assurance & Packaging', qualityHeadline:'Quality Verified Before Every Delivery', qualityBody:'Every crop is inspected, weighed, packaged, labeled, and prepared according to quality standards before reaching buyers. This ensures consistency, freshness, traceability, and professional presentation.', qualityBadges:['Freshness Verified','Quality Inspected','Clean Packaging','Ready For Delivery'], qualityMetrics:['Quality Control','Packaging','Traceability','Freshness'], qualityCaption:'Quality checked, packaged, labeled, and ready for delivery.',
    deliveryTitle:'Distribution & Delivery', deliveryHeadline:'From Farm To Buyer With Freshness Preserved', deliveryBody:'Produce is harvested, packed, and delivered through carefully managed logistics that prioritize freshness, consistency, and reliability.', deliveryBullets:['Fresh harvest delivery','Consistent weekly supply','Hotel & restaurant service','Retail-ready products','Reliable fulfillment'], deliveryMetrics:['Delivery Truck','Route Planning','Freshness','Buyer Network'], deliveryCaption:'Fresh products delivered professionally from farm to buyer.',
    aboutTitle:'SymbioGreens Is The Farm. Balponics Is The Technical Company Behind The Farm.', aboutBody:'SymbioGreens is being developed as a premium hydroponic farm initiative focused on local, fresh, reliable, and high-quality production for Las Terrenas and beyond.',
    ecosystemTitle:'Platform Ecosystem', ecosystemSymbio:'Buyer intelligence, product demand mapping, premium crop planning, and market coordination.', ecosystemBalponics:'Hydroponic production systems, controlled-environment growing, technical support, and premium fresh product operations.',
    productsPageTitle:'Premium Hydroponic Product Catalog', productsPageBody:'Browse the current SymbioGreens product family before registering buyer demand. This public catalog is view-only; detailed production planning, sample requests, and volume signals are collected through the buyer survey.',
    publicProductsTitle:'Explore SymbioGreens Products', viewDetails:'View Details', registerInterest:'Register as a Buyer to express interest', close:'Close',
    flavor:'Flavor', texture:'Texture', possibleFormats:'Possible formats', suggestedBuyers:'Suggested buyers', productionNote:'Production note', publicProductionNote:'Premium, hydroponic, local, fresh production planning will be guided by registered buyer demand.', productSensoryNote:'Detailed sensory notes are available during buyer review and sample evaluation.', productTextureNote:'Texture details are reviewed with buyers during sample evaluation and production planning.', categoryIntroPoints:['This category supports premium buyer programs, menu planning, retail assortment, and local fresh supply.','Buyer input helps prioritize varieties, production timing, sample needs, formats, and delivery planning.','Best use cases are reviewed through the buyer survey so production can match real demand.'],
    categoryNames:{'premium-lettuces':'Premium Lettuces','baby-greens':'Baby Greens',microgreens:'Premium Microgreens','premium-specialty-herbs':'Premium Specialty Herbs','edible-flowers':'Premium Edible Flowers','gourmet-mushrooms':'Premium Gourmet Mushrooms','wellness-mushrooms':'Medicinal / Wellness Mushrooms','specialty-vegetables':'Premium Hydroponic Specialty Vegetables'},
    livingOptions:{'premium-lettuces':'Living Premium Lettuces','baby-greens':'Living Baby Greens',microgreens:'Living Premium Microgreens','premium-specialty-herbs':'Living Premium Specialty Herbs','edible-flowers':'Living Premium Edible Flowers'},
    teamTitle:'Founder & Executive Leadership', teamText:'A concise founder profile for the leadership behind SymbioGreens and the Balponics technical model.', founderTitle:'Founder & CEO, SymbioGreens | Founder, Balponics', founderSubtitle:'Entrepreneur | Business Development | Controlled-Environment Agriculture',
    founderBio:'Bernard Balmir is an entrepreneur and business development executive with more than three decades of experience across telecommunications, international business development, hydroponics, mycology, and sustainable agriculture initiatives.',
    founderVision:'As Founder & CEO of SymbioGreens, Bernard is leading a premium hydroponic farm initiative designed to connect real buyer demand with smarter local production, reduced waste, better freshness, and stronger supply resilience.',
    operationsHomeTitle:'Team & Operations',
    operationsHomeBody:'Behind SymbioGreens is an operations-driven production model designed to coordinate crop planning, harvest timing, quality control, packaging, and buyer communication. Our team structure is built to support consistent execution from greenhouse operations to delivery readiness.',
    operationsHomeCards:[['Coordinated production planning','Crop priorities, timing, and buyer signals are organized before production moves forward.'],['Harvest and packing discipline','Daily workflows support clean handling, reliable preparation, and delivery readiness.'],['Quality-focused operations','Team routines are built around inspection, consistency, freshness, and professional presentation.'],['Buyer-responsive scheduling','Planning stays connected to demand signals, sample requests, and expected delivery needs.']],
    meetTeam:'Meet the Team',
    founderTags:['Hydroponics','Sustainable Agriculture','Business Development','Market Strategy','Controlled-Environment Agriculture','Mycology','International Operations'],
    futureTeamRoles:['Chief Financial Officer','Chief Operating Officer','Head of Farm Operations','Agronomy / Crop Production Lead','Sales & Buyer Relations Director','Logistics & Quality Control Manager'], futureRole:'Future Executive Role', profileSoon:'Profile coming soon',
    contactTitle:'Buyer Interest And Project Coordination', contactBody:'SymbioGreens is collecting buyer demand signals for premium hydroponic production planning in Las Terrenas.', inquiryForm:'Inquiry Form', sendInquiry:'Send Inquiry', name:'Name', email:'Email', phone:'Phone', city:'City', message:'Message', password:'Password', createPassword:'Create Password',
    buyerRegistration:'Buyer Registration', createBuyerProfile:'Create Buyer Profile', firstName:'First Name', lastName:'Last Name', businessName:'Business Name', businessType:'Business Type', weeklyBudget:'Estimated Weekly Produce Budget', buyerNotes:'Buyer Notes', createProfileStart:'Create Profile And Start Survey', login:'Login', forgotPassword:'Forgot Password',
    buyerDashboard:'Buyer Dashboard', catalogSurvey:'Catalog Survey', submitCategory:'Submit Category', submitAll:'Submit All Responses', sampleRequest:'Sample Request', interestLevel:'Interest Level', estimatedWeeklyVolume:'Estimated Weekly Volume', packagingPreference:'Packaging Preference', deliveryFrequency:'Delivery Frequency', comments:'Comments',
    saveProductInterest:'Save Product Interest', saveContinueBrowsing:'Save & Continue Browsing', productInterestSaved:'Product interest saved in this survey session.', selected:'Selected', interestSaved:'Interest Saved', addInterest:'Add Interest', surveyDemandDetails:'Survey Demand Details', estimatedQuantity:'Estimated Quantity / Volume', preferredDeliveryFrequency:'Preferred Delivery Frequency', packagingPreferences:'Packaging Preferences', buyerRequirements:'Notes / Buyer Requirements', sampleRequestLabel:'I would like to request a sample when available.', removeInterest:'Remove Interest', highInterest:'High interest', mediumInterest:'Medium interest', lowInterest:'Low interest', justExploring:'Just exploring', smallSampleQuantity:'Small sample quantity', weeklySupply:'Weekly supply', biWeeklySupply:'Bi-weekly supply', monthlySupply:'Monthly supply', seasonalInterest:'Seasonal interest', weekly:'Weekly', twicePerWeek:'Twice per week', biWeekly:'Bi-weekly', monthly:'Monthly', eventBased:'Event-based', toBeDiscussed:'To be discussed',
    managerDashboard:'Manager Dashboard', managerLogin:'Manager Login', managerSetup:'Set Manager Passphrase', managerLoginBody:'Manager access is hidden from public navigation and protected by a local prototype passphrase.', passphrase:'Passphrase', confirmPassphrase:'Confirm Passphrase', adminOverview:'Overview', adminUsers:'Users', adminDemand:'Demand', adminSamples:'Samples', adminExports:'Exports', adminInvestors:'Investors', signOut:'Sign Out',
    activeCategories:'Active Product Categories', approvedProducts:'Approved Products Loaded', compatibleCategories:'Master-Compatible Categories', submittedSurveys:'Submitted Buyer Surveys', buyerProfiles:'Buyer Profiles', sampleRequests:'Sample Requests',
    investorsTitle:'Investor & Partnerships', investorsBody:'Request access for investor, partner, or strategic project review.', submit:'Submit', contactSaved:'Inquiry saved locally. Production should connect this to secure email or CRM.', investorSaved:'Investor request saved locally.', feedbackSaved:'Feedback saved locally.', investorSubmissionThanks:'Thank you for your submission.\n\nYour profile has been received for review. We carefully evaluate investor and partnership inquiries based on strategic fit, market opportunity, readiness, and alignment with the SymbioGreens / Balponics model. If your submission matches our current priorities, we will contact you for the next step.',
    privacy:'Privacy Policy', terms:'Terms of Use', disclaimer:'Disclaimer', legal:'Legal Information', footerTagline:'SymbioGreens | Premium Hydroponic Farming Powered by Balponics', footerLine1:'Pure. Fresh. Responsible. Local. Buyer intelligence connected to sustainable hydroponic production.', footerLine2:'Balponics Hydroponic Solutions Provider | Precision Agriculture. Premium Results.', footerCompany:'Company', footerEngagement:'Engagement', footerLegal:'Legal', footerAccess:'Access', allRights:'Copyright 2026 SymbioGreens. All rights reserved. Powered by Balponics.',
    requiredFieldsMissing:'Please complete the required fields.', validEmailRequired:'Please enter a valid email address.', passwordsMustMatch:'Passwords must match.', invalidLogin:'Invalid login or inactive account.', restricted:'Restricted access.', noData:'No data yet.', passwordChanged:'Password changed.', resetCodeInvalid:'Reset code is invalid.', resetProfileNotFound:'No buyer profile found for that email.',
  },
};
I18N.es = {...I18N.en, home:'Inicio', about:'Acerca de', products:'Productos', why:'Por que hidroponia', farmsProjects:'Granjas y proyectos', team:'Equipo', contact:'Contacto', register:'Registrarse como comprador', buyerLogin:'Acceso compradores', investors:'Inversionistas y alianzas', takeSurvey:'Tomar encuesta de produccion', explore:'Explorar productos', teamTitle:'Fundador y liderazgo ejecutivo', founderTitle:'Fundador y CEO, SymbioGreens | Fundador, Balponics', founderSubtitle:'Emprendedor | Desarrollo de negocios | Agricultura en ambiente controlado', founderBio:'Bernard Balmir es emprendedor y ejecutivo de desarrollo de negocios con mas de tres decadas de experiencia en telecomunicaciones, negocios internacionales, hidroponia, micologia e iniciativas de agricultura sostenible.', founderVision:'Como fundador y CEO de SymbioGreens, Bernard lidera una iniciativa de granja hidroponica premium disenada para conectar demanda real con produccion local mas inteligente, menos desperdicio, mejor frescura y mayor resiliencia.', founderTags:['Hidroponia','Agricultura sostenible','Desarrollo de negocios','Estrategia de mercado','Agricultura en ambiente controlado','Micologia','Operaciones internacionales'], managerDashboard:'Panel gerente', signOut:'Salir', allRights:'Copyright 2026 SymbioGreens. Todos los derechos reservados. Impulsado por Balponics.'};
I18N.fr = {...I18N.en, home:'Accueil', about:'A propos', products:'Produits', why:'Pourquoi hydroponie', farmsProjects:'Fermes et projets', team:'Equipe', contact:'Contact', register:'Inscription acheteur', buyerLogin:'Connexion acheteur', investors:'Investisseurs et partenariats', takeSurvey:'Repondre a l enquete', explore:'Explorer les produits', teamTitle:'Fondateur et leadership executif', founderTitle:'Fondateur et CEO, SymbioGreens | Fondateur, Balponics', founderSubtitle:'Entrepreneur | Developpement commercial | Agriculture en environnement controle', founderBio:'Bernard Balmir est entrepreneur et dirigeant en developpement commercial avec plus de trois decennies d experience en telecommunications, affaires internationales, hydroponie, mycologie et agriculture durable.', founderVision:'Comme fondateur et CEO de SymbioGreens, Bernard dirige une initiative hydroponique premium concue pour relier la demande reelle a une production locale plus intelligente, moins de gaspillage, plus de fraicheur et une meilleure resilience.', founderTags:['Hydroponie','Agriculture durable','Developpement commercial','Strategie de marche','Agriculture en environnement controle','Mycologie','Operations internationales'], managerDashboard:'Tableau manager', signOut:'Deconnexion', allRights:'Copyright 2026 SymbioGreens. Tous droits reserves. Propulse par Balponics.'};

Object.assign(I18N.es, {
  why:'Por qué hidroponía', takeSurvey:'Responder encuesta de producción', learnMore:'Conocer más', resumeSurvey:'Continuar encuesta', aboutFarm:'Acerca de la granja',
  heroEyebrow:'SymbioGreens | Impulsado por Balponics', heroTitle:'Producción hidropónica premium', heroSubhead:'Fresca | Sostenible | Basada en datos', heroBody:'Ayudamos a los compradores a orientar la producción futura mediante inteligencia de mercado.',
  landingTitle:'SymbioGreens prepara producción hidropónica premium guiada por la demanda real de compradores.', landingBody:'Explore lo que cultivamos, aprenda por qué importa la hidroponía y ayude a orientar prioridades antes de escalar la producción.',
  journey:[['SymbioGreens es la granja','Una iniciativa de granja hidropónica premium que prepara producción local fresca para Las Terrenas y el mercado hotelero ampliado.'],['Balponics impulsa el modelo técnico','Sistemas hidropónicos, planificación de cultivos, agricultura controlada, automatización, I+D y soporte para escalar granjas.'],['La opinión del comprador orienta la producción','Las respuestas ayudan a priorizar variedades, muestras, volúmenes estimados, expectativas de entrega y programas personalizados.']],
  howEyebrow:'Cómo funciona', howTitle:'Del interés del comprador a la planificación de producción',
  howSteps:[['Registrarse como comprador','Cree un perfil para conectar señales de demanda con su tipo de negocio, ubicación y necesidades.'],['Explorar catálogo','Revise lechugas premium, baby greens, microgreens, hierbas, flores comestibles, hongos y vegetales especiales.'],['Indicar demanda','Díganos qué importa: interés, uso actual, volumen semanal, ritmo de entrega y empaque.'],['Solicitar muestras','Las solicitudes de muestra nos ayudan a entender necesidades de evaluación antes de escalar.'],['Ayudarnos a planificar','Sus respuestas ayudan a priorizar cultivos, programas personalizados y disponibilidad local confiable.']],
  productAssortmentTitle:'Surtido premium de productos', productAssortmentBody:'Desde lechugas crujientes hasta microgreens vibrantes y hierbas aromáticas, SymbioGreens prepara una selección premium cultivada para frescura, consistencia y sabor excepcional.',
  productAssortment:[['Lechugas','Lechugas hermosas, crujientes y de alta calidad para restaurantes, hoteles, comercios y consumidores saludables.'],['Microgreens','Microgreens frescos y nutritivos con color vibrante, textura delicada y atractivo culinario premium.'],['Hierbas','Hierbas aromáticas cosechadas con cuidado para entregar frescura, fragancia y sabor.']],
  whyTitle:'Producción más limpia. Planificación más inteligente. Mejor frescura.', whyBody:'Los sistemas hidropónicos entregan agua y nutrientes directamente a las raíces, reduciendo desperdicio y mejorando consistencia, calidad y disponibilidad anual.', whyCaption:'Nutrición de precisión entregada directamente a la zona radicular.',
  whyCards:{water:['Conservación del agua','Los sistemas hidropónicos recirculan agua continuamente, reduciendo el consumo frente a la agricultura convencional.'],pesticide:['Reducción de pesticidas','Cultivar en ambientes controlados reduce exposición a muchas plagas y enfermedades comunes.'],nutrient:['Eficiencia de nutrientes','Las plantas reciben nutrición calibrada en la raíz para mejor sabor, color y consistencia.'],year:['Producción todo el año','Las granjas hidropónicas protegidas apoyan disponibilidad confiable más allá de temporadas de campo.'],future:['Futuro sostenible','La producción hidropónica local puede acortar cadenas de suministro y fortalecer cultivos especiales.']},
  harvestTitle:'Cosecha y entrega', harvestBody1:'Los productos frescos se cosechan, inspeccionan y preparan para entrega según señales de demanda del comprador.', harvestBody2:'Esto alinea la producción con demanda real manteniendo calidad, consistencia y frescura.', harvestBullets:['Cosechado bajo pedido cuando sea posible','Estándares de calidad consistentes','Producción alineada con demanda','Menor complejidad de suministro','Frescura hidropónica premium'], harvestCaption:'Cosechado fresco y preparado para entrega.',
  qualityTitle:'Aseguramiento de calidad y empaque', qualityHeadline:'Calidad verificada antes de cada entrega', qualityBody:'Cada cultivo se inspecciona, pesa, empaca, etiqueta y prepara bajo estándares de calidad antes de llegar al comprador.', qualityBadges:['Frescura verificada','Calidad inspeccionada','Empaque limpio','Listo para entrega'], qualityMetrics:['Control de calidad','Empaque','Trazabilidad','Frescura'], qualityCaption:'Revisado, empacado, etiquetado y listo para entrega.',
  deliveryTitle:'Distribución y entrega', deliveryHeadline:'De la granja al comprador preservando frescura', deliveryBody:'Los productos se cosechan, empacan y entregan mediante logística gestionada para priorizar frescura, consistencia y confiabilidad.', deliveryBullets:['Entrega de cosecha fresca','Suministro semanal consistente','Servicio a hoteles y restaurantes','Productos listos para retail','Cumplimiento confiable'], deliveryMetrics:['Camión de entrega','Planificación de rutas','Frescura','Red de compradores'], deliveryCaption:'Productos frescos entregados profesionalmente de la granja al comprador.',
  productsPageTitle:'Catálogo premium de productos hidropónicos', productsPageBody:'Explore la familia de productos antes de registrar demanda. El catálogo público es solo de consulta; la planificación, muestras y volúmenes se recopilan mediante la encuesta.', publicProductsTitle:'Explorar productos SymbioGreens', viewDetails:'Ver detalles', registerInterest:'Registrarse como comprador para expresar interés', close:'Cerrar',
  flavor:'Sabor', texture:'Textura', possibleFormats:'Formatos posibles', suggestedBuyers:'Compradores sugeridos', productionNote:'Nota de producción', publicProductionNote:'La planificación premium, hidropónica, local y fresca será guiada por la demanda de compradores registrados.', productSensoryNote:'Las notas sensoriales detalladas estarán disponibles durante la revisión del comprador y la evaluación de muestras.', productTextureNote:'Los detalles de textura se revisan con compradores durante la evaluación de muestras y la planificación de producción.', categoryIntroPoints:['Esta categoría apoya programas premium para compradores, planificación de menús, surtido retail y suministro fresco local.','La participación del comprador ayuda a priorizar variedades, tiempos de producción, muestras, formatos y entregas.','Los mejores usos se revisan mediante la encuesta para que la producción responda a demanda real.'],
  categoryNames:{'premium-lettuces':'Lechugas premium','baby-greens':'Baby greens','microgreens':'Microgreens premium','premium-specialty-herbs':'Hierbas especiales premium','edible-flowers':'Flores comestibles premium','gourmet-mushrooms':'Hongos gourmet premium','wellness-mushrooms':'Hongos medicinales / bienestar','specialty-vegetables':'Vegetales hidropónicos especiales premium'},
  livingOptions:{'premium-lettuces':'Lechugas premium vivas','baby-greens':'Baby greens vivos',microgreens:'Microgreens premium vivos','premium-specialty-herbs':'Hierbas especiales premium vivas','edible-flowers':'Flores comestibles premium vivas'},
  operationsHomeTitle:'Equipo y operaciones', operationsHomeBody:'Detrás de SymbioGreens hay un modelo operativo diseñado para coordinar planificación de cultivos, cosecha, calidad, empaque y comunicación con compradores.',
  meetTeam:'Conocer al equipo', contactTitle:'Interés de compradores y coordinación de proyectos', contactBody:'SymbioGreens recopila señales de demanda para planificar producción hidropónica premium en Las Terrenas.', inquiryForm:'Formulario de consulta', sendInquiry:'Enviar consulta',
  name:'Nombre', email:'Correo electrónico', phone:'Teléfono', city:'Ciudad', message:'Mensaje', password:'Contraseña', createPassword:'Crear contraseña', buyerRegistration:'Registro de comprador', createBuyerProfile:'Crear perfil de comprador', firstName:'Nombre', lastName:'Apellido', businessName:'Nombre del negocio', businessType:'Tipo de negocio', weeklyBudget:'Presupuesto semanal estimado de productos', buyerNotes:'Notas del comprador', createProfileStart:'Crear perfil e iniciar encuesta', login:'Iniciar sesión', forgotPassword:'Olvidé mi contraseña',
  viewDetails:'Ver detalles', saveProductInterest:'Guardar interés de producto', saveContinueBrowsing:'Guardar y seguir explorando', productInterestSaved:'Interés de producto guardado en esta sesión de encuesta.', selected:'Seleccionado', interestSaved:'Interés guardado', addInterest:'Agregar interés', surveyDemandDetails:'Detalles de demanda', interestLevel:'Nivel de interés', estimatedQuantity:'Cantidad / volumen estimado', preferredDeliveryFrequency:'Frecuencia de entrega preferida', sampleRequest:'Solicitud de muestra', sampleRequestLabel:'Quisiera solicitar una muestra cuando esté disponible.', packagingPreferences:'Preferencias de empaque', buyerRequirements:'Notas / requisitos del comprador', removeInterest:'Eliminar interés', highInterest:'Alto interés', mediumInterest:'Interés medio', lowInterest:'Bajo interés', justExploring:'Solo explorando', smallSampleQuantity:'Cantidad pequeña de muestra', weeklySupply:'Suministro semanal', biWeeklySupply:'Suministro quincenal', monthlySupply:'Suministro mensual', seasonalInterest:'Interés estacional', weekly:'Semanal', twicePerWeek:'Dos veces por semana', biWeekly:'Quincenal', monthly:'Mensual', eventBased:'Según evento', toBeDiscussed:'Por discutir',
  privacy:'Política de privacidad', terms:'Términos de uso', disclaimer:'Descargo de responsabilidad', legal:'Información legal', footerCompany:'Empresa', footerEngagement:'Participación', footerLegal:'Legal', footerAccess:'Acceso',
  requiredFieldsMissing:'Complete los campos requeridos.', validEmailRequired:'Ingrese un correo electrónico válido.', passwordsMustMatch:'Las contraseñas deben coincidir.', invalidLogin:'Inicio de sesión inválido o cuenta inactiva.', noData:'No hay datos todavía.', passwordChanged:'Contraseña actualizada.', resetCodeInvalid:'El código de recuperación no es válido.', resetProfileNotFound:'No se encontró un perfil de comprador con ese correo.'
});

I18N.es.investorSubmissionThanks = 'Gracias por su envío.\n\nSu perfil fue recibido para revisión. Evaluamos cuidadosamente las consultas de inversión y alianza según ajuste estratégico, oportunidad de mercado, preparación y alineación con el modelo SymbioGreens / Balponics. Si su envío coincide con nuestras prioridades actuales, nos comunicaremos para el siguiente paso.';

Object.assign(I18N.fr, {
  about:'À propos', why:'Pourquoi l’hydroponie', farmsProjects:'Fermes et projets', team:'Équipe', register:'Inscription acheteur', takeSurvey:'Répondre à l’enquête de production', explore:'Explorer les produits', learnMore:'En savoir plus', resumeSurvey:'Continuer l’enquête', aboutFarm:'À propos de la ferme',
  heroEyebrow:'SymbioGreens | Propulsé par Balponics', heroTitle:'Production hydroponique premium', heroSubhead:'Fraîche | Durable | Pilotée par les données', heroBody:'Aider les acheteurs à orienter la production future grâce à l’intelligence de marché.',
  landingTitle:'SymbioGreens prépare une production hydroponique premium guidée par la demande réelle des acheteurs.', landingBody:'Découvrez ce que nous cultivons, pourquoi l’hydroponie compte, et contribuez à orienter les priorités avant le passage à l’échelle.',
  journey:[['SymbioGreens est la ferme','Une initiative de ferme hydroponique premium préparant une production locale fraîche pour Las Terrenas et le marché hôtelier élargi.'],['Balponics porte le modèle technique','Systèmes hydroponiques, planification des cultures, expertise en environnement contrôlé, automatisation, R&D et soutien à l’extension des fermes.'],['Les acheteurs orientent la production','Les réponses aident à prioriser variétés, échantillons, volumes estimés, attentes de livraison et programmes personnalisés.']],
  howEyebrow:'Fonctionnement', howTitle:'De l’intérêt acheteur à la planification de production',
  howSteps:[['S’inscrire comme acheteur','Créez un profil pour relier les signaux de demande à votre activité, votre localisation et vos besoins.'],['Explorer le catalogue','Consultez laitues premium, jeunes pousses, microgreens, herbes, fleurs comestibles, champignons et légumes spécialisés.'],['Indiquer la demande','Précisez le niveau d’intérêt, l’usage actuel, le volume hebdomadaire, le rythme de livraison et l’emballage.'],['Demander des échantillons','Les demandes d’échantillons nous aident à comprendre les besoins d’évaluation avant l’échelle.'],['Aider à planifier','Vos réponses aident à prioriser les cultures, programmes personnalisés et disponibilité locale fiable.']],
  productAssortmentTitle:'Assortiment premium de produits', productAssortmentBody:'Des laitues croquantes aux microgreens vibrants et aux herbes aromatiques, SymbioGreens prépare une sélection premium cultivée pour la fraîcheur, la constance et le goût.',
  productAssortment:[['Laitues','Belles laitues croquantes de haute qualité pour restaurants, hôtels, détaillants et consommateurs attentifs à la santé.'],['Microgreens','Microgreens frais et nutritifs, avec couleur vive, texture délicate et valeur culinaire premium.'],['Herbes','Herbes aromatiques récoltées avec soin pour offrir fraîcheur, parfum et saveur.']],
  whyTitle:'Production plus propre. Planification plus intelligente. Meilleure fraîcheur.', whyBody:'Les systèmes hydroponiques apportent l’eau et les nutriments directement aux racines, réduisant le gaspillage et améliorant la constance, la qualité et la disponibilité toute l’année.', whyCaption:'Nutrition de précision directement livrée à la zone racinaire.',
  whyCards:{water:['Conservation de l’eau','Les systèmes hydroponiques recirculent l’eau en continu, réduisant fortement la consommation par rapport à l’agriculture conventionnelle.'],pesticide:['Réduction des pesticides','La culture en environnement contrôlé réduit l’exposition à de nombreux ravageurs et maladies courants.'],nutrient:['Efficacité nutritionnelle','Les plantes reçoivent une nutrition calibrée à la racine pour plus de saveur, couleur et constance.'],year:['Production toute l’année','Les fermes hydroponiques protégées favorisent une disponibilité fiable au-delà des saisons de plein champ.'],future:['Avenir durable','La production hydroponique locale peut raccourcir les chaînes d’approvisionnement et renforcer les cultures spécialisées.']},
  harvestTitle:'Récolte et livraison', harvestBody1:'Les produits frais sont récoltés, inspectés et préparés selon les signaux de demande collectés auprès des acheteurs.', harvestBody2:'Cela aligne la production sur la demande réelle tout en préservant qualité, constance et fraîcheur.', harvestBullets:['Récolté à la demande lorsque possible','Standards de qualité constants','Production alignée sur la demande','Chaîne d’approvisionnement simplifiée','Fraîcheur hydroponique premium'], harvestCaption:'Récolté frais et préparé pour la livraison.',
  qualityTitle:'Assurance qualité et emballage', qualityHeadline:'Qualité vérifiée avant chaque livraison', qualityBody:'Chaque culture est inspectée, pesée, emballée, étiquetée et préparée selon des standards de qualité avant d’arriver chez les acheteurs.', qualityBadges:['Fraîcheur vérifiée','Qualité inspectée','Emballage propre','Prêt pour livraison'], qualityMetrics:['Contrôle qualité','Emballage','Traçabilité','Fraîcheur'], qualityCaption:'Contrôlé, emballé, étiqueté et prêt pour livraison.',
  deliveryTitle:'Distribution et livraison', deliveryHeadline:'De la ferme à l’acheteur avec fraîcheur préservée', deliveryBody:'Les produits sont récoltés, emballés et livrés grâce à une logistique gérée pour prioriser fraîcheur, constance et fiabilité.', deliveryBullets:['Livraison de récolte fraîche','Approvisionnement hebdomadaire constant','Service hôtels et restaurants','Produits prêts pour le détail','Exécution fiable'], deliveryMetrics:['Camion de livraison','Planification des routes','Fraîcheur','Réseau d’acheteurs'], deliveryCaption:'Produits frais livrés professionnellement de la ferme à l’acheteur.',
  productsPageTitle:'Catalogue premium de produits hydroponiques', productsPageBody:'Parcourez la famille de produits avant d’enregistrer la demande acheteur. Le catalogue public est consultatif; planification, échantillons et volumes sont collectés par l’enquête.', publicProductsTitle:'Explorer les produits SymbioGreens', viewDetails:'Voir les détails', registerInterest:'S’inscrire comme acheteur pour exprimer un intérêt', close:'Fermer',
  flavor:'Saveur', texture:'Texture', possibleFormats:'Formats possibles', suggestedBuyers:'Acheteurs suggérés', productionNote:'Note de production', publicProductionNote:'La planification premium, hydroponique, locale et fraîche sera guidée par la demande des acheteurs inscrits.', productSensoryNote:'Les notes sensorielles détaillées seront disponibles pendant l’examen acheteur et l’évaluation des échantillons.', productTextureNote:'Les détails de texture sont examinés avec les acheteurs pendant l’évaluation des échantillons et la planification de production.', categoryIntroPoints:['Cette catégorie soutient les programmes acheteurs premium, la planification des menus, l’assortiment détail et l’approvisionnement local frais.','La participation des acheteurs aide à prioriser variétés, calendrier de production, échantillons, formats et livraisons.','Les meilleurs usages sont examinés dans l’enquête afin d’aligner la production sur la demande réelle.'],
  categoryNames:{'premium-lettuces':'Laitues premium','baby-greens':'Jeunes pousses','microgreens':'Microgreens premium','premium-specialty-herbs':'Herbes spécialisées premium','edible-flowers':'Fleurs comestibles premium','gourmet-mushrooms':'Champignons gastronomiques premium','wellness-mushrooms':'Champignons médicinaux / bien-être','specialty-vegetables':'Légumes hydroponiques spécialisés premium'},
  livingOptions:{'premium-lettuces':'Laitues premium vivantes','baby-greens':'Jeunes pousses vivantes',microgreens:'Microgreens premium vivants','premium-specialty-herbs':'Herbes spécialisées premium vivantes','edible-flowers':'Fleurs comestibles premium vivantes'},
  operationsHomeTitle:'Équipe et opérations', operationsHomeBody:'Derrière SymbioGreens se trouve un modèle opérationnel conçu pour coordonner planification des cultures, récolte, qualité, emballage et communication acheteur.',
  meetTeam:'Rencontrer l’équipe', contactTitle:'Intérêt acheteur et coordination de projet', contactBody:'SymbioGreens collecte les signaux de demande pour planifier une production hydroponique premium à Las Terrenas.', inquiryForm:'Formulaire de contact', sendInquiry:'Envoyer la demande',
  name:'Nom', email:'E-mail', phone:'Téléphone', city:'Ville', message:'Message', password:'Mot de passe', createPassword:'Créer un mot de passe', buyerRegistration:'Inscription acheteur', createBuyerProfile:'Créer un profil acheteur', firstName:'Prénom', lastName:'Nom', businessName:'Nom de l’entreprise', businessType:'Type d’activité', weeklyBudget:'Budget hebdomadaire estimé en produits', buyerNotes:'Notes acheteur', createProfileStart:'Créer le profil et commencer l’enquête', login:'Connexion', forgotPassword:'Mot de passe oublié',
  viewDetails:'Voir les détails', saveProductInterest:'Enregistrer l’intérêt produit', saveContinueBrowsing:'Enregistrer et continuer', productInterestSaved:'Intérêt produit enregistré dans cette session d’enquête.', selected:'Sélectionné', interestSaved:'Intérêt enregistré', addInterest:'Ajouter un intérêt', surveyDemandDetails:'Détails de la demande', interestLevel:'Niveau d’intérêt', estimatedQuantity:'Quantité / volume estimé', preferredDeliveryFrequency:'Fréquence de livraison souhaitée', sampleRequest:'Demande d’échantillon', sampleRequestLabel:'Je souhaite demander un échantillon lorsqu’il sera disponible.', packagingPreferences:'Préférences d’emballage', buyerRequirements:'Notes / exigences acheteur', removeInterest:'Supprimer l’intérêt', highInterest:'Intérêt élevé', mediumInterest:'Intérêt moyen', lowInterest:'Faible intérêt', justExploring:'Simple exploration', smallSampleQuantity:'Petite quantité d’échantillon', weeklySupply:'Approvisionnement hebdomadaire', biWeeklySupply:'Approvisionnement bihebdomadaire', monthlySupply:'Approvisionnement mensuel', seasonalInterest:'Intérêt saisonnier', weekly:'Hebdomadaire', twicePerWeek:'Deux fois par semaine', biWeekly:'Bihebdomadaire', monthly:'Mensuel', eventBased:'Selon événement', toBeDiscussed:'À discuter',
  privacy:'Politique de confidentialité', terms:'Conditions d’utilisation', disclaimer:'Avertissement', legal:'Informations légales', footerCompany:'Entreprise', footerEngagement:'Engagement', footerLegal:'Mentions légales', footerAccess:'Accès',
  requiredFieldsMissing:'Veuillez compléter les champs requis.', validEmailRequired:'Veuillez saisir une adresse e-mail valide.', passwordsMustMatch:'Les mots de passe doivent correspondre.', invalidLogin:'Connexion invalide ou compte inactif.', noData:'Aucune donnée pour le moment.', passwordChanged:'Mot de passe modifié.', resetCodeInvalid:'Le code de réinitialisation est invalide.', resetProfileNotFound:'Aucun profil acheteur trouvé pour cet e-mail.'
});

I18N.fr.investorSubmissionThanks = 'Merci pour votre soumission.\n\nVotre profil a été reçu pour examen. Nous évaluons attentivement les demandes d’investissement et de partenariat selon l’adéquation stratégique, le potentiel de marché, la préparation et l’alignement avec le modèle SymbioGreens / Balponics. Si votre soumission correspond à nos priorités actuelles, nous vous contacterons pour la prochaine étape.';

Object.assign(I18N.en, {
  contactHeroTitle:'Buyer Interest & Project Coordination',
  contactHeroBody:'Connect with SymbioGreens / Balponics for buyer interest, premium hydroponic supply, project coordination, strategic inquiries, and regional development opportunities.',
  contactHeroSupport:'We review inquiries carefully to understand buyer demand, project opportunities, regional interest, and strategic alignment before follow-up.',
  contactHeroLabels:['Buyer Demand Signals','Project Coordination','Hospitality Supply','Strategic Inquiries','Regional Replication'],
  contactInquiryTypesTitle:'What Type of Inquiry Are You Sending?',
  contactInquiryCards:[
    ['Buyer Interest','For hotels, restaurants, villas, chefs, distributors, retailers, and specialty buyers interested in premium fresh supply.'],
    ['Project Development','For people with land, sites, greenhouse ideas, farm development goals, or local production opportunities.'],
    ['Investor / Partnership','For investment, joint venture, regional development, or strategic collaboration inquiries.'],
    ['Regional Opportunity','For Caribbean, island, tourism, hospitality, or local-market opportunities where the SymbioGreens / Balponics model could be adapted.']
  ],
  contactFormTitle:'Send an Inquiry',
  contactFormIntro:'Tell us about your buyer interest, project idea, or strategic inquiry, and our team will review it.',
  fullName:'Full Name',
  phoneWhatsApp:'Phone / WhatsApp',
  companyOrganization:'Company / Organization',
  cityCountry:'City / Country',
  inquiryType:'Inquiry Type',
  organizationType:'Organization Type',
  messageOpportunity:'Message / Opportunity Description',
  contactSelectInquiryType:'Select inquiry type',
  contactSelectOrgType:'Select organization type',
  contactMessagePlaceholder:'Tell us about your buyer interest, project idea, regional opportunity, or strategic inquiry...',
  contactInquiryOptions:[['Buyer Interest','Buyer Interest'],['Project Development','Project Development'],['Investor / Partnership','Investor / Partnership'],['Regional Opportunity','Regional Opportunity'],['General Inquiry','General Inquiry']],
  contactOrgOptions:['Hotel / Resort','Restaurant / Chef','Distributor','Retailer','Landowner','Investor','Government / Institution','Entrepreneur','Other'],
  contactConfidentialLine:'Your information will be reviewed carefully and treated professionally.',
  contactPrototypeNote:'Prototype note: this static version saves inquiries locally for review. Production should connect this form to secure email or CRM.',
  contactProcessTitle:'How to Connect With Us',
  contactProcessIntro:'We review buyer, project, and strategic inquiries carefully before follow-up.',
  contactProcessSteps:[
    ['Submit Inquiry','Share your buyer interest or project details using the contact form.'],
    ['Initial Review','Our team reviews your inquiry to understand your needs, location, and goals.'],
    ['Project or Buyer Alignment','We align your inquiry with the right solution, team, and resources.'],
    ['Coordination Follow-Up','If there is a fit, we follow up to clarify details and coordinate next steps.'],
    ['Next Step Discussion','Qualified inquiries may move to a call, project discussion, buyer coordination, or partnership review.']
  ],
  contactRegionalTitle:'Regional Coordination & Market Access',
  contactRegionalSubtitle:'Building a Network of Resilient, Local Food Systems Across the Caribbean',
  contactRegionalBody:'SymbioGreens / Balponics is building a regional coordination vision that connects premium hydroponic production, buyer relationships, project development pathways, and resilient local food-system opportunities across selected Caribbean markets. The Dominican Republic serves as the current coordination anchor, while additional island markets represent strategic pathways for local production, hospitality supply, and future regional replication.',
  contactRegionalAnchorTitle:'Dominican Republic — Northeast Corridor',
  contactRegionalAnchorBody:'Current hub of operations, coordination, buyer relationships, production strategy, logistics, and innovation.',
  contactRegionalHaitiTitle:'Haiti — Long-Term Resilience & Innovation Opportunity',
  contactRegionalHaitiBody:'Future R&D, training, food resilience, local production, and sustainable development corridor.',
  contactRegionalValueTitle:'Regional value themes',
  contactRegionalValues:[['Premium Local Production','High-quality greens, herbs, mushrooms, and specialty crops.'],['Buyer Relationships','Connecting hotels, chefs, restaurants, distributors, and retailers.'],['Project Development','Feasibility, design, implementation, and long-term support.'],['Food Resilience','Reducing import dependence and strengthening local food systems.'],['Training & R&D','Innovation, research, education, and technical capacity building.'],['Regional Replication','Scalable model adapted to different island-market needs.']],
  contactRegionalCards:['Hotels & Resorts','Restaurants & Chefs','Distributors','Retail & Specialty Buyers','Project Partners','Regional Opportunities'],
  contactDirectTitle:'Direct Contact',
  contactDirectProject:'General project and partnership inquiries',
  contactDirectFounder:'Direct founder / coordination contact',
  contactDirectNote:'Please include your country, organization, inquiry type, and a short description of what you are trying to build, source, or coordinate.',
  contactFinalTitle:'Let’s Build the Right Connection',
  contactFinalBody:'Whether you are a buyer, project partner, investor, or regional operator, the first step is to share a clear inquiry so we can understand the opportunity and determine the appropriate next step.',
  contactSaved:'Thank you. Your inquiry has been received for review. If your request is aligned with our current priorities, we will contact you for the next step.'
});

Object.assign(I18N.es, {
  contactHeroTitle:'Interés de compradores y coordinación de proyectos',
  contactHeroBody:'Conecte con SymbioGreens / Balponics para interés de compradores, suministro hidropónico premium, coordinación de proyectos, consultas estratégicas y oportunidades regionales.',
  contactHeroSupport:'Revisamos las consultas cuidadosamente para entender la demanda, las oportunidades de proyecto, el interés regional y la alineación estratégica antes de dar seguimiento.',
  contactHeroLabels:['Señales de demanda','Coordinación de proyectos','Suministro hotelero','Consultas estratégicas','Replicación regional'],
  contactInquiryTypesTitle:'¿Qué tipo de consulta desea enviar?',
  contactInquiryCards:[
    ['Buyer Interest','Para hoteles, restaurantes, villas, chefs, distribuidores, minoristas y compradores especializados interesados en suministro fresco premium.'],
    ['Project Development','Para personas con terrenos, sitios, ideas de invernaderos, metas de desarrollo agrícola u oportunidades de producción local.'],
    ['Investor / Partnership','Para inversión, joint venture, desarrollo regional o consultas de colaboración estratégica.'],
    ['Regional Opportunity','Para oportunidades caribeñas, insulares, turísticas, hoteleras o de mercado local donde el modelo SymbioGreens / Balponics pueda adaptarse.']
  ],
  contactFormTitle:'Enviar una consulta',
  contactFormIntro:'Cuéntenos sobre su interés como comprador, idea de proyecto o consulta estratégica, y nuestro equipo la revisará.',
  fullName:'Nombre completo',
  phoneWhatsApp:'Teléfono / WhatsApp',
  companyOrganization:'Empresa / Organización',
  cityCountry:'Ciudad / País',
  inquiryType:'Tipo de consulta',
  organizationType:'Tipo de organización',
  messageOpportunity:'Mensaje / descripción de la oportunidad',
  contactSelectInquiryType:'Seleccione tipo de consulta',
  contactSelectOrgType:'Seleccione tipo de organización',
  contactMessagePlaceholder:'Cuéntenos sobre su interés comprador, idea de proyecto, oportunidad regional o consulta estratégica...',
  contactInquiryOptions:[['Buyer Interest','Interés comprador'],['Project Development','Desarrollo de proyecto'],['Investor / Partnership','Inversión / alianza'],['Regional Opportunity','Oportunidad regional'],['General Inquiry','Consulta general']],
  contactOrgOptions:['Hotel / Resort','Restaurante / Chef','Distribuidor','Minorista','Propietario de terreno','Inversionista','Gobierno / Institución','Emprendedor','Otro'],
  contactConfidentialLine:'Su información será revisada cuidadosamente y tratada de manera profesional.',
  contactPrototypeNote:'Nota de prototipo: esta versión estática guarda las consultas localmente para revisión. Producción debe conectar este formulario a correo seguro o CRM.',
  contactProcessTitle:'Cómo conectar con nosotros',
  contactProcessIntro:'Revisamos cuidadosamente las consultas de compradores, proyectos y estrategia antes del seguimiento.',
  contactProcessSteps:[
    ['Enviar consulta','Comparta su interés comprador o detalles del proyecto usando el formulario de contacto.'],
    ['Revisión inicial','Nuestro equipo revisa su consulta para entender sus necesidades, ubicación y objetivos.'],
    ['Alineación de proyecto o comprador','Alineamos su consulta con la solución, el equipo y los recursos adecuados.'],
    ['Seguimiento de coordinación','Si hay encaje, damos seguimiento para aclarar detalles y coordinar los próximos pasos.'],
    ['Discusión del próximo paso','Las consultas calificadas pueden avanzar a una llamada, discusión de proyecto, coordinación comprador o revisión de alianza.']
  ],
  contactRegionalTitle:'Coordinación regional y acceso al mercado',
  contactRegionalSubtitle:'Construyendo una red de sistemas alimentarios locales y resilientes en el Caribe',
  contactRegionalBody:'SymbioGreens / Balponics está construyendo una visión de coordinación regional que conecta producción hidropónica premium, relaciones con compradores, vías de desarrollo de proyectos y oportunidades resilientes de sistemas alimentarios locales en mercados caribeños seleccionados. La República Dominicana sirve como ancla actual de coordinación, mientras otros mercados insulares representan vías estratégicas para producción local, suministro hotelero y futura replicación regional.',
  contactRegionalAnchorTitle:'República Dominicana — Corredor nordeste',
  contactRegionalAnchorBody:'Centro actual de operaciones, coordinación, relaciones con compradores, estrategia de producción, logística e innovación.',
  contactRegionalHaitiTitle:'Haití — Oportunidad de resiliencia e innovación a largo plazo',
  contactRegionalHaitiBody:'Futuro corredor de I+D, capacitación, resiliencia alimentaria, producción local y desarrollo sostenible.',
  contactRegionalValueTitle:'Temas de valor regional',
  contactRegionalValues:[['Producción local premium','Greens, hierbas, hongos y cultivos especiales de alta calidad.'],['Relaciones con compradores','Conectando hoteles, chefs, restaurantes, distribuidores y minoristas.'],['Desarrollo de proyectos','Factibilidad, diseño, implementación y soporte a largo plazo.'],['Resiliencia alimentaria','Reducir dependencia de importaciones y fortalecer sistemas alimentarios locales.'],['Capacitación e I+D','Innovación, investigación, educación y desarrollo de capacidad técnica.'],['Replicación regional','Modelo escalable adaptado a necesidades de distintos mercados insulares.']],
  contactRegionalCards:['Hoteles y resorts','Restaurantes y chefs','Distribuidores','Retail y compradores especializados','Socios de proyecto','Oportunidades regionales'],
  contactDirectTitle:'Contacto directo',
  contactDirectProject:'Consultas generales de proyectos y alianzas',
  contactDirectFounder:'Contacto directo de fundador / coordinación',
  contactDirectNote:'Incluya su país, organización, tipo de consulta y una breve descripción de lo que desea construir, abastecer o coordinar.',
  contactFinalTitle:'Construyamos la conexión correcta',
  contactFinalBody:'Ya sea comprador, socio de proyecto, inversionista u operador regional, el primer paso es compartir una consulta clara para entender la oportunidad y determinar el próximo paso adecuado.',
  contactSaved:'Gracias. Su consulta fue recibida para revisión. Si su solicitud está alineada con nuestras prioridades actuales, nos comunicaremos para el siguiente paso.'
});

Object.assign(I18N.fr, {
  contactHeroTitle:'Intérêt acheteur et coordination de projet',
  contactHeroBody:'Contactez SymbioGreens / Balponics pour l’intérêt acheteur, l’approvisionnement hydroponique premium, la coordination de projets, les demandes stratégiques et les opportunités régionales.',
  contactHeroSupport:'Nous examinons chaque demande avec soin afin de comprendre la demande acheteur, les opportunités de projet, l’intérêt régional et l’alignement stratégique avant tout suivi.',
  contactHeroLabels:['Signaux de demande acheteur','Coordination de projet','Approvisionnement hôtelier','Demandes stratégiques','Réplication régionale'],
  contactInquiryTypesTitle:'Quel type de demande envoyez-vous ?',
  contactInquiryCards:[
    ['Buyer Interest','Pour hôtels, restaurants, villas, chefs, distributeurs, détaillants et acheteurs spécialisés intéressés par un approvisionnement frais premium.'],
    ['Project Development','Pour les personnes disposant de terrains, sites, idées de serres, objectifs de ferme ou opportunités de production locale.'],
    ['Investor / Partnership','Pour les demandes d’investissement, coentreprise, développement régional ou collaboration stratégique.'],
    ['Regional Opportunity','Pour les opportunités caribéennes, insulaires, touristiques, hôtelières ou de marchés locaux où le modèle SymbioGreens / Balponics pourrait être adapté.']
  ],
  contactFormTitle:'Envoyer une demande',
  contactFormIntro:'Parlez-nous de votre intérêt acheteur, idée de projet ou demande stratégique, et notre équipe l’examinera.',
  fullName:'Nom complet',
  phoneWhatsApp:'Téléphone / WhatsApp',
  companyOrganization:'Entreprise / Organisation',
  cityCountry:'Ville / Pays',
  inquiryType:'Type de demande',
  organizationType:'Type d’organisation',
  messageOpportunity:'Message / description de l’opportunité',
  contactSelectInquiryType:'Sélectionner le type de demande',
  contactSelectOrgType:'Sélectionner le type d’organisation',
  contactMessagePlaceholder:'Décrivez votre intérêt acheteur, idée de projet, opportunité régionale ou demande stratégique...',
  contactInquiryOptions:[['Buyer Interest','Intérêt acheteur'],['Project Development','Développement de projet'],['Investor / Partnership','Investissement / partenariat'],['Regional Opportunity','Opportunité régionale'],['General Inquiry','Demande générale']],
  contactOrgOptions:['Hôtel / Resort','Restaurant / Chef','Distributeur','Détaillant','Propriétaire foncier','Investisseur','Gouvernement / Institution','Entrepreneur','Autre'],
  contactConfidentialLine:'Vos informations seront examinées avec soin et traitées de manière professionnelle.',
  contactPrototypeNote:'Note prototype : cette version statique enregistre les demandes localement pour examen. La production devra connecter ce formulaire à un e-mail sécurisé ou à un CRM.',
  contactProcessTitle:'Comment nous contacter',
  contactProcessIntro:'Nous examinons attentivement les demandes acheteurs, projets et stratégiques avant tout suivi.',
  contactProcessSteps:[
    ['Envoyer une demande','Partagez votre intérêt acheteur ou les détails de votre projet via le formulaire.'],
    ['Examen initial','Notre équipe examine votre demande afin de comprendre vos besoins, votre localisation et vos objectifs.'],
    ['Alignement projet ou acheteur','Nous alignons votre demande avec la solution, l’équipe et les ressources appropriées.'],
    ['Suivi de coordination','S’il existe une adéquation, nous faisons un suivi pour clarifier les détails et coordonner les prochaines étapes.'],
    ['Discussion prochaine étape','Les demandes qualifiées peuvent mener à un appel, une discussion de projet, une coordination acheteur ou une revue de partenariat.']
  ],
  contactRegionalTitle:'Coordination régionale et accès au marché',
  contactRegionalSubtitle:'Construire un réseau de systèmes alimentaires locaux et résilients dans les Caraïbes',
  contactRegionalBody:'SymbioGreens / Balponics développe une vision de coordination régionale reliant la production hydroponique premium, les relations acheteurs, les voies de développement de projets et les opportunités de systèmes alimentaires locaux résilients dans des marchés caribéens sélectionnés. La République dominicaine sert d’ancrage actuel de coordination, tandis que d’autres marchés insulaires représentent des voies stratégiques pour la production locale, l’approvisionnement hôtelier et la réplication régionale future.',
  contactRegionalAnchorTitle:'République dominicaine — Corridor nord-est',
  contactRegionalAnchorBody:'Pôle actuel des opérations, de la coordination, des relations acheteurs, de la stratégie de production, de la logistique et de l’innovation.',
  contactRegionalHaitiTitle:'Haïti — Opportunité de résilience et d’innovation à long terme',
  contactRegionalHaitiBody:'Futur corridor de R&D, formation, résilience alimentaire, production locale et développement durable.',
  contactRegionalValueTitle:'Thèmes de valeur régionale',
  contactRegionalValues:[['Production locale premium','Greens, herbes, champignons et cultures spécialisées de haute qualité.'],['Relations acheteurs','Relier hôtels, chefs, restaurants, distributeurs et détaillants.'],['Développement de projets','Faisabilité, conception, mise en œuvre et soutien à long terme.'],['Résilience alimentaire','Réduire la dépendance aux importations et renforcer les systèmes alimentaires locaux.'],['Formation et R&D','Innovation, recherche, éducation et développement des capacités techniques.'],['Réplication régionale','Modèle évolutif adapté aux besoins de différents marchés insulaires.']],
  contactRegionalCards:['Hôtels et resorts','Restaurants et chefs','Distributeurs','Détail et acheteurs spécialisés','Partenaires de projet','Opportunités régionales'],
  contactDirectTitle:'Contact direct',
  contactDirectProject:'Demandes générales de projet et de partenariat',
  contactDirectFounder:'Contact direct fondateur / coordination',
  contactDirectNote:'Veuillez inclure votre pays, organisation, type de demande et une brève description de ce que vous souhaitez construire, sourcer ou coordonner.',
  contactFinalTitle:'Construisons la bonne connexion',
  contactFinalBody:'Que vous soyez acheteur, partenaire de projet, investisseur ou opérateur régional, la première étape est de partager une demande claire afin que nous puissions comprendre l’opportunité et déterminer la prochaine étape appropriée.',
  contactSaved:'Merci. Votre demande a été reçue pour examen. Si elle correspond à nos priorités actuelles, nous vous contacterons pour la prochaine étape.'
});

const RUNTIME_TRANSLATIONS = {
  es: {
    'SymbioGreens Product Family':'Familia de productos SymbioGreens', 'Why Hydroponics?':'¿Por qué hidroponía?', 'Search':'Buscar', 'Search products':'Buscar productos',
    'Thank you':'Gracias', 'Your buyer demand information was saved locally for this prototype.':'Su información de demanda fue guardada localmente para este prototipo.',
    'Why We Are Building a Smarter Local Food Production Model':'Por qué estamos construyendo un modelo alimentario local más inteligente',
    'The Problem':'El problema', 'Why the Current Supply Model Is Not Enough':'Por qué el modelo actual de suministro no es suficiente',
    'Food Autonomy':'Autonomía alimentaria', 'Building Food Autonomy and Local Resilience':'Construir autonomía alimentaria y resiliencia local',
    'Opportunity':'Oportunidad', 'Turning Dependence Into Opportunity':'Convertir dependencia en oportunidad',
    'Why Hydroponics Is Central to the Model':'Por qué la hidroponía es central en el modelo', 'Better Economics for Local Business':'Mejor economía para negocios locales',
    'Reduced Vulnerability to External Shocks':'Menor vulnerabilidad ante choques externos', 'What We Are Building':'Lo que estamos construyendo',
    'The SymbioGreens + Balponics Ecosystem':'El ecosistema SymbioGreens + Balponics', 'What We Believe':'Lo que creemos',
    'Team & Operations':'Equipo y operaciones', 'SymbioGreens is built around disciplined greenhouse operations, trained production teams, and executive leadership capable of supporting premium hydroponic production, buyer reliability, and scalable project development.':'SymbioGreens se construye alrededor de operaciones disciplinadas de invernadero, equipos capacitados y liderazgo ejecutivo capaz de apoyar producción hidropónica premium, confiabilidad para compradores y desarrollo escalable de proyectos.',
    'Farm Team':'Equipo de granja', 'Farm Team & Operations':'Equipo de granja y operaciones', 'Our operational model depends on trained teams working across production, propagation, harvesting, packing, quality control, cold chain, delivery, and technical support. This is the daily execution behind premium local freshness.':'Nuestro modelo operativo depende de equipos capacitados que trabajan en producción, propagación, cosecha, empaque, control de calidad, cadena fría, entrega y soporte técnico. Esta es la ejecución diaria detrás de la frescura local premium.',
    'Operations Culture':'Cultura operativa', 'Built for Disciplined Execution':'Diseñado para ejecución disciplinada', 'Daily crop monitoring':'Monitoreo diario de cultivos', 'Clean harvest and packing routines':'Rutinas limpias de cosecha y empaque', 'Quality-focused handling':'Manejo enfocado en calidad', 'Buyer-responsive scheduling':'Programación orientada al comprador', 'Technical system oversight':'Supervisión técnica de sistemas', 'Training and continuous improvement':'Capacitación y mejora continua',
    'Operational Team First':'El equipo operativo primero', 'Executive Leadership':'Liderazgo ejecutivo', 'The founding leadership behind a new generation of premium, resilient, and technology-enabled agribusiness in the Caribbean.':'El liderazgo fundador detrás de una nueva generación de agronegocios premium, resilientes y habilitados por tecnología en el Caribe.',
    'Crop Operations':'Operaciones de cultivo', 'Nursery & Propagation':'Vivero y propagación', 'Harvest & Packing':'Cosecha y empaque', 'Quality Control':'Control de calidad', 'Cold Chain & Delivery':'Cadena fría y entrega', 'Training & Technical Support':'Capacitación y soporte técnico',
    'Founder & CEO, SymbioGreens':'Fundador y CEO, SymbioGreens', 'Co-Founder & Strategic Operations Partner':'Cofundador y socio estratégico de operaciones',
    'Investors & Partnerships':'Inversionistas y alianzas', 'Build the Future of Local Food Production With Us':'Construyamos juntos el futuro de la producción local de alimentos',
    'Choose Your Track':'Elija su ruta', 'Choose the path that best matches your interest.':'Elija la ruta que mejor corresponda a su interés.', 'I Am an Investor':'Soy inversionista', 'I Am a Strategic Partner':'Soy socio estratégico',
    'Investor Track':'Ruta de inversionista', 'Investor Interest':'Interés de inversionista', 'Strategic Partner Track':'Ruta de socio estratégico', 'Strategic Partnership Interest':'Interés de alianza estratégica',
    'Review Process':'Proceso de revisión', 'How the Review Process Works':'Cómo funciona el proceso de revisión', 'What We Look For':'Lo que buscamos', 'Important notice':'Aviso importante',
    'Investor Pre-Qualification':'Precalificación de inversionista', 'Strategic Partner Pre-Qualification':'Precalificación de socio estratégico',
    'Full Name':'Nombre completo', 'Company / Organization':'Empresa / Organización', 'Organization':'Organización', 'Phone / WhatsApp':'Teléfono / WhatsApp', 'Country / City':'País / Ciudad', 'Website / LinkedIn':'Sitio web / LinkedIn',
    'Investor Type':'Tipo de inversionista', 'Area of Interest':'Área de interés', 'Investment Capacity':'Capacidad de inversión', 'Preferred Investment Style':'Estilo de inversión preferido', 'Current Sector / Business Background':'Sector actual / experiencia empresarial',
    'Why You Are Interested':'Por qué le interesa', 'Expectations, Return / Impact / Value':'Expectativas, retorno / impacto / valor', 'Resources & Relationships':'Recursos y relaciones',
    'Partner Type':'Tipo de socio', 'Target Market & Location':'Mercado objetivo y ubicación', 'Local Opportunity / Market Need':'Oportunidad local / necesidad del mercado', 'Potential Buyers / Commercial Network':'Compradores potenciales / red comercial', 'Contribution / Resources You May Bring':'Contribución / recursos que puede aportar', 'Capital & Readiness':'Capital y preparación', 'Timeline':'Cronograma', 'Partnership Vision':'Visión de alianza', 'Your Role in the Project':'Su rol en el proyecto', 'Strategic Alignment':'Alineación estratégica',
    'Submit Investor Profile':'Enviar perfil de inversionista', 'Submit Partnership Profile':'Enviar perfil de alianza', 'Indicative range':'Rango indicativo', 'Equity, project finance, strategic capital...':'Capital accionario, financiamiento de proyecto, capital estratégico...', 'Budget range, readiness level':'Rango de presupuesto, nivel de preparación', 'Land, capital, infrastructure, permits, logistics, team, buyer access...':'Terreno, capital, infraestructura, permisos, logística, equipo, acceso a compradores...',
    'Submit Profile':'Enviar perfil', 'Initial Review':'Revisión inicial', 'Clarification':'Aclaración', 'Concept Assessment':'Evaluación del concepto', 'Formal Discussion':'Discusión formal',
    'This website and platform prototype are provided for general corporate, product, market-intelligence, and buyer-interest information only. Content on this site does not constitute a binding product offer, investment solicitation, legal advice, financial advice, or agricultural performance guarantee.':'Este sitio web y prototipo se ofrecen solo como información general corporativa, de productos, inteligencia de mercado e interés de compradores. El contenido no constituye una oferta vinculante, solicitud de inversión, asesoría legal, financiera ni garantía de rendimiento agrícola.',
    'Product images, descriptions, production concepts, availability timelines, and operational examples may be illustrative or subject to change. Agricultural output can vary by crop, genetics, climate, system design, water quality, nutrient program, operating discipline, labor, logistics, and other conditions.':'Las imágenes, descripciones, conceptos de producción, plazos de disponibilidad y ejemplos operativos pueden ser ilustrativos o cambiar. La producción agrícola puede variar por cultivo, genética, clima, diseño del sistema, calidad del agua, nutrición, disciplina operativa, mano de obra, logística y otras condiciones.',
    'No guarantee is made regarding product availability, yield, delivery timing, business performance, investment return, or production outcome unless stated in signed formal agreements. Investor, partnership, and project discussions require separate documentation, due diligence, and approved legal materials.':'No se garantiza disponibilidad, rendimiento, tiempos de entrega, desempeño comercial, retorno de inversión ni resultado productivo salvo que conste en acuerdos formales firmados. Las conversaciones de inversión, alianza y proyecto requieren documentación, debida diligencia y materiales legales aprobados.',
    'All trademarks, names, images, platform content, product descriptions, and site materials are owned by or licensed to SymbioGreens, Balponics, or their respective owners. All rights reserved.':'Todas las marcas, nombres, imágenes, contenido de la plataforma, descripciones de productos y materiales del sitio pertenecen o están licenciados a SymbioGreens, Balponics o sus respectivos propietarios. Todos los derechos reservados.',
    'A buyer profile already exists for this email.':'Ya existe un perfil de comprador para este correo.', 'Use at least 10 characters.':'Use al menos 10 caracteres.', 'Invalid manager passphrase.':'Frase de acceso de gerente inválida.', 'No product interest has been selected yet.':'Todavía no se ha seleccionado ningún interés de producto.'
  },
  fr: {
    'SymbioGreens Product Family':'Famille de produits SymbioGreens', 'Why Hydroponics?':'Pourquoi l’hydroponie ?', 'Search':'Recherche', 'Search products':'Rechercher des produits',
    'Thank you':'Merci', 'Your buyer demand information was saved locally for this prototype.':'Vos informations de demande acheteur ont été enregistrées localement pour ce prototype.',
    'Why We Are Building a Smarter Local Food Production Model':'Pourquoi nous construisons un modèle de production alimentaire locale plus intelligent',
    'The Problem':'Le problème', 'Why the Current Supply Model Is Not Enough':'Pourquoi le modèle actuel d’approvisionnement ne suffit pas',
    'Food Autonomy':'Autonomie alimentaire', 'Building Food Autonomy and Local Resilience':'Construire l’autonomie alimentaire et la résilience locale',
    'Opportunity':'Opportunité', 'Turning Dependence Into Opportunity':'Transformer la dépendance en opportunité',
    'Why Hydroponics Is Central to the Model':'Pourquoi l’hydroponie est centrale dans le modèle', 'Better Economics for Local Business':'Meilleure économie pour les entreprises locales',
    'Reduced Vulnerability to External Shocks':'Vulnérabilité réduite aux chocs externes', 'What We Are Building':'Ce que nous construisons',
    'The SymbioGreens + Balponics Ecosystem':'L’écosystème SymbioGreens + Balponics', 'What We Believe':'Ce que nous croyons',
    'Team & Operations':'Équipe et opérations', 'SymbioGreens is built around disciplined greenhouse operations, trained production teams, and executive leadership capable of supporting premium hydroponic production, buyer reliability, and scalable project development.':'SymbioGreens est construite autour d’opérations de serre disciplinées, d’équipes formées et d’une direction capable de soutenir la production hydroponique premium, la fiabilité acheteur et le développement de projets évolutifs.',
    'Farm Team':'Équipe de ferme', 'Farm Team & Operations':'Équipe de ferme et opérations', 'Our operational model depends on trained teams working across production, propagation, harvesting, packing, quality control, cold chain, delivery, and technical support. This is the daily execution behind premium local freshness.':'Notre modèle opérationnel dépend d’équipes formées en production, propagation, récolte, emballage, contrôle qualité, chaîne du froid, livraison et support technique. C’est l’exécution quotidienne derrière la fraîcheur locale premium.',
    'Operations Culture':'Culture opérationnelle', 'Built for Disciplined Execution':'Conçu pour une exécution disciplinée', 'Daily crop monitoring':'Suivi quotidien des cultures', 'Clean harvest and packing routines':'Routines propres de récolte et d’emballage', 'Quality-focused handling':'Manipulation axée sur la qualité', 'Buyer-responsive scheduling':'Planification orientée acheteurs', 'Technical system oversight':'Supervision technique des systèmes', 'Training and continuous improvement':'Formation et amélioration continue',
    'Operational Team First':'L’équipe opérationnelle d’abord', 'Executive Leadership':'Direction exécutive', 'The founding leadership behind a new generation of premium, resilient, and technology-enabled agribusiness in the Caribbean.':'La direction fondatrice derrière une nouvelle génération d’agribusiness premium, résilient et appuyé par la technologie dans la Caraïbe.',
    'Crop Operations':'Opérations de culture', 'Nursery & Propagation':'Pépinière et propagation', 'Harvest & Packing':'Récolte et emballage', 'Quality Control':'Contrôle qualité', 'Cold Chain & Delivery':'Chaîne du froid et livraison', 'Training & Technical Support':'Formation et support technique',
    'Founder & CEO, SymbioGreens':'Fondateur et CEO, SymbioGreens', 'Co-Founder & Strategic Operations Partner':'Cofondateur et partenaire stratégique opérations',
    'Investors & Partnerships':'Investisseurs et partenariats', 'Build the Future of Local Food Production With Us':'Construisons ensemble l’avenir de la production alimentaire locale',
    'Choose Your Track':'Choisissez votre parcours', 'Choose the path that best matches your interest.':'Choisissez le parcours qui correspond le mieux à votre intérêt.', 'I Am an Investor':'Je suis investisseur', 'I Am a Strategic Partner':'Je suis partenaire stratégique',
    'Investor Track':'Parcours investisseur', 'Investor Interest':'Intérêt investisseur', 'Strategic Partner Track':'Parcours partenaire stratégique', 'Strategic Partnership Interest':'Intérêt de partenariat stratégique',
    'Review Process':'Processus d’examen', 'How the Review Process Works':'Fonctionnement du processus d’examen', 'What We Look For':'Ce que nous recherchons', 'Important notice':'Avis important',
    'Investor Pre-Qualification':'Préqualification investisseur', 'Strategic Partner Pre-Qualification':'Préqualification partenaire stratégique',
    'Full Name':'Nom complet', 'Company / Organization':'Entreprise / Organisation', 'Organization':'Organisation', 'Phone / WhatsApp':'Téléphone / WhatsApp', 'Country / City':'Pays / Ville', 'Website / LinkedIn':'Site web / LinkedIn',
    'Investor Type':'Type d’investisseur', 'Area of Interest':'Domaine d’intérêt', 'Investment Capacity':'Capacité d’investissement', 'Preferred Investment Style':'Style d’investissement préféré', 'Current Sector / Business Background':'Secteur actuel / expérience professionnelle',
    'Why You Are Interested':'Pourquoi cela vous intéresse', 'Expectations, Return / Impact / Value':'Attentes, rendement / impact / valeur', 'Resources & Relationships':'Ressources et relations',
    'Partner Type':'Type de partenaire', 'Target Market & Location':'Marché cible et localisation', 'Local Opportunity / Market Need':'Opportunité locale / besoin du marché', 'Potential Buyers / Commercial Network':'Acheteurs potentiels / réseau commercial', 'Contribution / Resources You May Bring':'Contribution / ressources que vous pouvez apporter', 'Capital & Readiness':'Capital et préparation', 'Timeline':'Calendrier', 'Partnership Vision':'Vision du partenariat', 'Your Role in the Project':'Votre rôle dans le projet', 'Strategic Alignment':'Alignement stratégique',
    'Submit Investor Profile':'Envoyer le profil investisseur', 'Submit Partnership Profile':'Envoyer le profil partenariat', 'Indicative range':'Fourchette indicative', 'Equity, project finance, strategic capital...':'Capital, financement de projet, capital stratégique...', 'Budget range, readiness level':'Fourchette budgétaire, niveau de préparation', 'Land, capital, infrastructure, permits, logistics, team, buyer access...':'Terrain, capital, infrastructure, permis, logistique, équipe, accès acheteurs...',
    'Submit Profile':'Envoyer le profil', 'Initial Review':'Examen initial', 'Clarification':'Clarification', 'Concept Assessment':'Évaluation du concept', 'Formal Discussion':'Discussion formelle',
    'This website and platform prototype are provided for general corporate, product, market-intelligence, and buyer-interest information only. Content on this site does not constitute a binding product offer, investment solicitation, legal advice, financial advice, or agricultural performance guarantee.':'Ce site web et ce prototype sont fournis uniquement à titre d’information générale sur l’entreprise, les produits, l’intelligence de marché et l’intérêt des acheteurs. Le contenu ne constitue pas une offre contraignante, une sollicitation d’investissement, un conseil juridique, financier ni une garantie de performance agricole.',
    'Product images, descriptions, production concepts, availability timelines, and operational examples may be illustrative or subject to change. Agricultural output can vary by crop, genetics, climate, system design, water quality, nutrient program, operating discipline, labor, logistics, and other conditions.':'Les images, descriptions, concepts de production, calendriers de disponibilité et exemples opérationnels peuvent être illustratifs ou sujets à changement. La production agricole peut varier selon la culture, la génétique, le climat, la conception du système, la qualité de l’eau, le programme nutritif, la discipline opérationnelle, la main-d’œuvre, la logistique et d’autres conditions.',
    'No guarantee is made regarding product availability, yield, delivery timing, business performance, investment return, or production outcome unless stated in signed formal agreements. Investor, partnership, and project discussions require separate documentation, due diligence, and approved legal materials.':'Aucune garantie n’est donnée concernant la disponibilité, le rendement, les délais de livraison, la performance commerciale, le retour sur investissement ou le résultat de production sauf dans des accords formels signés. Les discussions d’investissement, partenariat et projet exigent une documentation séparée, une diligence raisonnable et des documents juridiques approuvés.',
    'All trademarks, names, images, platform content, product descriptions, and site materials are owned by or licensed to SymbioGreens, Balponics, or their respective owners. All rights reserved.':'Toutes les marques, noms, images, contenus de plateforme, descriptions de produits et matériaux du site appartiennent ou sont licenciés à SymbioGreens, Balponics ou leurs propriétaires respectifs. Tous droits réservés.',
    'A buyer profile already exists for this email.':'Un profil acheteur existe déjà pour cet e-mail.', 'Use at least 10 characters.':'Utilisez au moins 10 caractères.', 'Invalid manager passphrase.':'Phrase d’accès manager invalide.', 'No product interest has been selected yet.':'Aucun intérêt produit n’a encore été sélectionné.'
  }
};

Object.assign(RUNTIME_TRANSLATIONS.es, {
  "SymbioGreens is being developed as a premium hydroponic farm initiative focused on fresh, local, reliable, and high-quality production. Balponics is the technical company behind the model, supporting hydroponic systems, controlled-environment growing, crop planning, technical execution, and scalable agricultural development.":"SymbioGreens se desarrolla como una iniciativa de granja hidropónica premium enfocada en producción fresca, local, confiable y de alta calidad. Balponics es la empresa técnica detrás del modelo, apoyando sistemas hidropónicos, cultivo en ambiente controlado, planificación de cultivos, ejecución técnica y desarrollo agrícola escalable.",
  "Together, SymbioGreens and Balponics are being built to help create a more resilient, more efficient, and more autonomous food production model for tourism-driven, island, and import-dependent markets where food autonomy, food independence, and local resilience matter.":"Juntas, SymbioGreens y Balponics se desarrollan para ayudar a crear un modelo de producción alimentaria más resiliente, eficiente y autónomo para mercados turísticos, insulares y dependientes de importaciones donde importan la autonomía alimentaria, la independencia y la resiliencia local.",
  "Many island and tourism-driven markets remain highly dependent on imported fresh produce. That dependence creates structural vulnerability. Shipping costs fluctuate. Delays affect freshness. External crises disrupt availability. Premium buyers struggle with inconsistency. Local businesses remain dependent on external supply chains they do not control.":"Muchos mercados insulares y turísticos siguen dependiendo fuertemente de productos frescos importados. Esa dependencia crea vulnerabilidad estructural. Los costos de envío fluctúan. Los retrasos afectan la frescura. Las crisis externas interrumpen la disponibilidad. Los compradores premium enfrentan inconsistencia. Los negocios locales dependen de cadenas externas que no controlan.",
  "This is not only a logistics issue. It is a business resilience issue, a food autonomy issue, and a long-term development issue.":"No es solo un tema logístico. Es un tema de resiliencia empresarial, autonomía alimentaria y desarrollo a largo plazo.",
  "Heavy dependence on imported fresh produce":"Alta dependencia de productos frescos importados", "Exposure to shipping cost variation":"Exposición a variación de costos de envío", "Supply disruptions during global crises":"Interrupciones de suministro durante crisis globales", "Reduced freshness from long transport chains":"Menor frescura por cadenas de transporte largas", "Inconsistent quality and availability":"Calidad y disponibilidad inconsistentes", "Limited local control over supply":"Control local limitado sobre el suministro", "Lost opportunities for local value creation":"Oportunidades perdidas de creación de valor local",
  "A smarter local production model can help communities, businesses, and countries reduce their dependence on distant supply chains. By producing more strategically at the local level, markets gain greater food autonomy, better control, stronger resilience, and improved ability to respond to shocks.":"Un modelo local más inteligente puede ayudar a comunidades, empresas y países a reducir su dependencia de cadenas lejanas. Al producir de forma más estratégica localmente, los mercados ganan autonomía alimentaria, mejor control, mayor resiliencia y mejor capacidad de respuesta ante choques.",
  "This is especially important for island economies and hospitality markets, where dependence on imported produce can create vulnerability.":"Esto es especialmente importante para economías insulares y mercados hoteleros, donde la dependencia de importaciones puede crear vulnerabilidad.",
  "Stronger Food Autonomy":"Mayor autonomía alimentaria", "Produce more strategically at the local level and reduce dependence on distant supply chains.":"Producir de forma más estratégica localmente y reducir dependencia de cadenas lejanas.", "Better Food Independence":"Mejor independencia alimentaria", "Control more critical fresh-food supply decisions within the local market.":"Controlar más decisiones críticas de suministro fresco dentro del mercado local.", "Improved National Resilience":"Mayor resiliencia nacional", "Build a food system that can withstand disruption, volatility, and long-term pressure.":"Construir un sistema alimentario capaz de resistir interrupciones, volatilidad y presión a largo plazo.", "Better Business Continuity":"Mejor continuidad empresarial", "Support reliable supply for hotels, restaurants, retailers, and institutions.":"Apoyar suministro confiable para hoteles, restaurantes, comercios e instituciones.", "More Local Control":"Más control local", "Improve control over quality, timing, harvest planning, and buyer responsiveness.":"Mejorar el control de calidad, tiempos, planificación de cosecha y respuesta al comprador.",
  "One of the biggest opportunities in this model is the ability to help markets shift from being only importers to becoming producers. Instead of depending almost entirely on incoming goods, local businesses and operators can participate in value creation through controlled production, packaging, technical operations, and local supply relationships.":"Una de las mayores oportunidades de este modelo es ayudar a los mercados a pasar de ser solo importadores a convertirse en productores. En vez de depender casi totalmente de productos entrantes, los negocios y operadores locales pueden participar en la creación de valor mediante producción controlada, empaque, operaciones técnicas y relaciones de suministro local.",
  "That shift matters economically. More value can stay in the local economy. More knowledge can be built locally. More jobs can be created locally. More strategic capacity can be developed locally.":"Ese cambio importa económicamente. Más valor puede quedarse en la economía local. Más conocimiento puede desarrollarse localmente. Más empleos pueden crearse localmente. Más capacidad estratégica puede construirse localmente.",
  "Import Dependence":"Dependencia de importaciones", "Relying on distant markets creates vulnerability, higher costs, and supply risk.":"Depender de mercados lejanos crea vulnerabilidad, mayores costos y riesgo de suministro.", "Local Production Planning":"Planificación de producción local", "Assess local needs, land, resources, and market demand to design a productive strategy.":"Evaluar necesidades locales, tierra, recursos y demanda para diseñar una estrategia productiva.", "Hydroponic Systems":"Sistemas hidropónicos", "Deploy efficient systems that maximize yield, conserve resources, and support year-round production.":"Implementar sistemas eficientes que maximicen rendimiento, conserven recursos y apoyen producción todo el año.", "Quality Handling & Processing":"Manejo y procesamiento de calidad", "Maintain standards through careful handling, packing, cold chain, and traceability.":"Mantener estándares mediante manejo cuidadoso, empaque, cadena fría y trazabilidad.", "Local Supply & Distribution":"Suministro y distribución local", "Deliver fresh produce to local markets, businesses, and communities.":"Entregar productos frescos a mercados, negocios y comunidades locales.", "Stronger Local Economy":"Economía local más fuerte", "Keep value local, create jobs, build resilience, and strengthen food autonomy.":"Mantener valor local, crear empleos, construir resiliencia y fortalecer la autonomía alimentaria.",
  "Hydroponics makes it possible to produce premium crops with greater control over water, nutrients, spacing, hygiene, and harvest planning. In the right context, hydroponics is not just a technology upgrade; it is a strategic production model for freshness, consistency, efficiency, and resilience.":"La hidroponía permite producir cultivos premium con mayor control de agua, nutrientes, espacio, higiene y planificación de cosecha. En el contexto correcto, no es solo una mejora tecnológica; es un modelo estratégico para frescura, consistencia, eficiencia y resiliencia.",
  "For SymbioGreens and Balponics, hydroponics supports local production in a way that is cleaner, more planned, and more adaptive to modern market needs.":"Para SymbioGreens y Balponics, la hidroponía apoya una producción local más limpia, planificada y adaptable a las necesidades modernas del mercado.",
  "Supports more intelligent and efficient water use.":"Apoya un uso del agua más inteligente y eficiente.", "Allows intensive, organized production using towers, NFT, DWC, Dutch buckets, and tray systems.":"Permite producción intensiva y organizada usando torres, NFT, DWC, cubos holandeses y sistemas de bandeja.", "Local Freshness":"Frescura local", "Enables faster movement from harvest to delivery.":"Permite mover el producto más rápido de la cosecha a la entrega.", "More Consistent Quality":"Calidad más consistente", "Supports premium produce standards for hotels, restaurants, and specialty buyers.":"Apoya estándares premium para hoteles, restaurantes y compradores especializados.", "Greater Production Control":"Mayor control de producción", "Supports crop planning, monitoring, and reliable operating systems.":"Apoya planificación de cultivos, monitoreo y sistemas operativos confiables.", "Smarter Risk Management":"Gestión de riesgo más inteligente", "Reduces some dependence on fragile external supply chains.":"Reduce parte de la dependencia de cadenas externas frágiles.",
  "SymbioGreens is built around disciplined greenhouse operations, trained production teams, and executive leadership capable of supporting premium hydroponic production, buyer reliability, and scalable project development.":"SymbioGreens se construye alrededor de operaciones disciplinadas de invernadero, equipos capacitados y liderazgo ejecutivo capaz de apoyar producción hidropónica premium, confiabilidad para compradores y desarrollo escalable de proyectos.",
  "Our operational model depends on trained teams working across production, propagation, harvesting, packing, quality control, cold chain, delivery, and technical support. This is the daily execution behind premium local freshness.":"Nuestro modelo operativo depende de equipos capacitados en producción, propagación, cosecha, empaque, control de calidad, cadena fría, entrega y soporte técnico. Esa es la ejecución diaria detrás de la frescura local premium.",
  "Greenhouse Production Team":"Equipo de producción de invernadero", "Daily crop care, greenhouse routines, hydroponic system monitoring, plant health observation, and production execution inside the growing areas.":"Cuidado diario de cultivos, rutinas de invernadero, monitoreo hidropónico, observación de salud vegetal y ejecución productiva en las áreas de cultivo.", "Seed starting, young plant care, propagation scheduling, transplant readiness, and early-stage crop quality control.":"Inicio de semillas, cuidado de plantas jóvenes, programación de propagación, preparación para trasplante y control temprano de calidad.", "Harvest discipline, product handling, washing, grading, packing, labeling, and preparation for buyer delivery.":"Disciplina de cosecha, manejo, lavado, clasificación, empaque, etiquetado y preparación para entrega.", "Visual inspection, freshness checks, crop consistency, hygiene standards, traceability, and presentation quality.":"Inspección visual, revisión de frescura, consistencia, higiene, trazabilidad y presentación.", "Cold holding, delivery preparation, route coordination, electric delivery logistics, and freshness protection from farm to buyer.":"Conservación en frío, preparación de entrega, coordinación de rutas, logística eléctrica y protección de frescura de la granja al comprador.", "Team training, SOP implementation, hydroponic system support, equipment checks, crop planning, and continuous operational improvement.":"Capacitación, implementación de SOP, soporte de sistemas hidropónicos, revisión de equipos, planificación de cultivos y mejora continua.",
  "Team & Operations":"Equipo y operaciones", "Built for Disciplined Execution":"Diseñado para ejecución disciplinada", "Daily crop monitoring":"Monitoreo diario de cultivos", "Clean harvest and packing routines":"Rutinas limpias de cosecha y empaque", "Quality-focused handling":"Manejo enfocado en calidad", "Buyer-responsive scheduling":"Programación sensible a compradores", "Technical system oversight":"Supervisión técnica del sistema", "Training and continuous improvement":"Capacitación y mejora continua",
  "The founding leadership behind a new generation of premium, resilient, and technology-enabled agribusiness in the Caribbean.":"El liderazgo fundador detrás de una nueva generación de agronegocios premium, resilientes y habilitados por tecnología en el Caribe.",
  "Multilingual entrepreneur, innovation strategist, and agritech founder with 30+ years of experience across telecom, emerging markets, sustainable agriculture, and business development.":"Emprendedor multilingüe, estratega de innovación y fundador agrotecnológico con más de 30 años de experiencia en telecomunicaciones, mercados emergentes, agricultura sostenible y desarrollo de negocios.",
  "Investor relations":"Relaciones con inversionistas", "Market expansion":"Expansión de mercado", "Agribusiness operator, food-distribution executive, and heir to a Haitian legacy of agriculture, importation, and ecological innovation.":"Operador agroempresarial, ejecutivo de distribución alimentaria y heredero de un legado haitiano de agricultura, importación e innovación ecológica.", "Operations execution":"Ejecución operativa", "Food distribution":"Distribución alimentaria", "Quality discipline":"Disciplina de calidad",
  "Bernard Balmir is a multilingual entrepreneur, executive strategist, and innovation-driven business builder with more than three decades of experience across telecommunications, fintech, prepaid services, international business development, agritech, hydroponics, and sustainable production systems.":"Bernard Balmir es un emprendedor multilingüe, estratega ejecutivo y constructor de negocios impulsado por la innovación, con más de tres décadas de experiencia en telecomunicaciones, fintech, servicios prepagados, desarrollo internacional, agrotecnología, hidroponía y sistemas de producción sostenible.",
  "Trained with a strong business and legal foundation, Bernard developed an entrepreneurial mindset early in life and built his career around innovation, niche markets, and practical execution. In the United States, he was among the early pioneers of pinless prepaid long-distance calling, helping disrupt a prepaid calling-card industry that had remained largely unchanged for years.":"Formado con una sólida base empresarial y legal, Bernard desarrolló temprano una mentalidad emprendedora y construyó su carrera alrededor de innovación, nichos de mercado y ejecución práctica. En Estados Unidos fue uno de los pioneros de llamadas prepagadas sin PIN, ayudando a transformar una industria que llevaba años casi sin cambios.",
  "Over the course of his career, Bernard has led and participated in ventures across the Caribbean, the United States, Latin America, Europe, and Africa, with experience in executive leadership, business development, sales strategy, market entry, strategic partnerships, customer operations, and commercial scaling.":"A lo largo de su carrera, Bernard ha liderado y participado en proyectos en el Caribe, Estados Unidos, América Latina, Europa y África, con experiencia en liderazgo ejecutivo, desarrollo de negocios, ventas, entrada a mercados, alianzas estratégicas, operaciones de clientes y escalamiento comercial.",
  "In recent years, Bernard has focused his energy on controlled-environment agriculture, hydroponics, specialty crops, mushrooms, circular production systems, and sustainable food infrastructure through Balponics and related initiatives.":"En los últimos años, Bernard ha enfocado su energía en agricultura de ambiente controlado, hidroponía, cultivos especiales, hongos, sistemas circulares e infraestructura alimentaria sostenible mediante Balponics e iniciativas relacionadas.",
  "As CEO, Bernard leads the company vision, strategy, partnerships, investor relations, business model, brand positioning, and long-term expansion across the Dominican Republic, Haiti, and the wider Caribbean.":"Como CEO, Bernard lidera la visión, estrategia, alianzas, relaciones con inversionistas, modelo de negocio, posicionamiento de marca y expansión a largo plazo en República Dominicana, Haití y el Caribe ampliado.",
  "Marcel Bernard Ville-Drouin is a Haitian entrepreneur, agribusiness operator, and business executive with nearly three decades of experience across food products, importation, distribution, manufacturing, and agricultural ventures.":"Marcel Bernard Ville-Drouin es un emprendedor haitiano, operador agroempresarial y ejecutivo de negocios con casi tres décadas de experiencia en productos alimenticios, importación, distribución, manufactura y proyectos agrícolas.",
  "Trained in Business Administration, Marcel has spent more than 25 years building and managing businesses connected to food supply, consumer products, agriculture, and commercial distribution. He is associated with Minaya Spices and Maison Ville-Drouin, two names tied to Haiti's food and product distribution sectors.":"Formado en Administración de Empresas, Marcel ha pasado más de 25 años construyendo y gestionando negocios vinculados al suministro alimentario, productos de consumo, agricultura y distribución comercial. Está asociado con Minaya Spices y Maison Ville-Drouin, nombres vinculados a los sectores de alimentos y distribución en Haití.",
  "Marcel also comes from one of Haiti's recognized entrepreneurial families. His father, Philippe Ville-Drouin, was the founder and driving force behind Le Montcel, an ecological and agricultural property in the Kenscoff/Belot area connected to agriculture, environmental stewardship, rural development, and local production.":"Marcel también proviene de una de las familias emprendedoras reconocidas de Haití. Su padre, Philippe Ville-Drouin, fue fundador e impulsor de Le Montcel, una propiedad ecológica y agrícola en Kenscoff/Belot vinculada a la agricultura, gestión ambiental, desarrollo rural y producción local.",
  "His experience gives him practical knowledge of procurement, logistics, wholesale markets, inventory management, customer relationships, and the realities of operating in complex Caribbean environments.":"Su experiencia le aporta conocimiento práctico de compras, logística, mercados mayoristas, inventario, relaciones con clientes y las realidades de operar en entornos caribeños complejos.",
  "As COO, Marcel brings operational leadership, commercial realism, supplier and market experience, and grounded execution across procurement, production planning, logistics, distribution, quality control, and day-to-day operations.":"Como COO, Marcel aporta liderazgo operativo, realismo comercial, experiencia con proveedores y mercados, y ejecución práctica en compras, planificación de producción, logística, distribución, control de calidad y operaciones diarias.",
  "SymbioGreens and Balponics are developing a premium controlled-environment agriculture model designed for local freshness, food autonomy, hospitality supply, technical training, and scalable project replication. We welcome serious inquiries from qualified investors and strategic partners aligned with our mission to build smarter local food systems.":"SymbioGreens y Balponics desarrollan un modelo premium de agricultura en ambiente controlado diseñado para frescura local, autonomía alimentaria, suministro hotelero, capacitación técnica y replicación escalable de proyectos. Recibimos consultas serias de inversionistas calificados y socios estratégicos alineados con nuestra misión.",
  "For qualified investors seeking exposure to scalable local food production, hydroponic infrastructure, and regional growth opportunities.":"Para inversionistas calificados interesados en producción local escalable, infraestructura hidropónica y oportunidades regionales de crecimiento.", "For partners bringing land, capital, market access, buyer relationships, infrastructure, or local execution capacity.":"Para socios que aportan tierra, capital, acceso a mercado, relaciones con compradores, infraestructura o capacidad de ejecución local.", "Investor track selected: review investment opportunities in Balponics, SymbioGreens, farm development, technical platforms, and regional growth.":"Ruta de inversionista seleccionada: revise oportunidades en Balponics, SymbioGreens, desarrollo de granjas, plataformas técnicas y crecimiento regional.", "Strategic partner track selected: explore project partnerships where local partners bring market access, resources, execution capacity, or infrastructure.":"Ruta de socio estratégico seleccionada: explore alianzas donde socios locales aporten mercado, recursos, ejecución o infraestructura.",
  "This track is for qualified investors seeking exposure to controlled-environment agriculture, premium local food production, hydroponic infrastructure, farm development, technical platforms, or regional growth opportunities.":"Esta ruta es para inversionistas calificados interesados en agricultura controlada, producción local premium, infraestructura hidropónica, desarrollo de granjas, plataformas técnicas u oportunidades regionales.",
  "Individual investor":"Inversionista individual", "Family office":"Family office", "Strategic investor":"Inversionista estratégico", "Institutional investor":"Inversionista institucional", "Development / impact investor":"Inversionista de desarrollo / impacto", "Balponics Technical Systems & Services":"Sistemas y servicios técnicos Balponics", "SymbioGreens Farm Development":"Desarrollo de granjas SymbioGreens", "SymbioGreens Network / Group Expansion":"Expansión de red / grupo SymbioGreens", "Specific Model Farms & Projects":"Granjas y proyectos modelo específicos", "Regional Replication Projects":"Proyectos de replicación regional", "Strategic Growth Capital":"Capital estratégico de crecimiento",
  "I understand this is a selective preliminary review process and not an investment offer or guaranteed opportunity.":"Entiendo que este es un proceso preliminar selectivo y no una oferta de inversión ni oportunidad garantizada.",
  "This track is for partners who want to bring the SymbioGreens / Balponics model to a specific market, country, island, city, hospitality zone, or commercial network.":"Esta ruta es para socios que desean llevar el modelo SymbioGreens / Balponics a un mercado, país, isla, ciudad, zona hotelera o red comercial específica.",
  "SymbioGreens / Balponics can bring the model, systems, crop strategy, training, technical support, brand standards, and operating framework. A local partner may bring land, capital, infrastructure, buyer access, market access, operations, or local execution. Partnership structures vary by project and may involve meaningful long-term participation within the approved investor equity pool, subject to project structure, technical contribution, capital structure, and support role. This is not a fixed offer; final terms require formal review and negotiation.":"SymbioGreens / Balponics puede aportar el modelo, sistemas, estrategia de cultivos, capacitación, soporte técnico, estándares de marca y marco operativo. Un socio local puede aportar tierra, capital, infraestructura, acceso a compradores, mercado, operaciones o ejecución local. Las estructuras varían por proyecto y pueden incluir participación significativa a largo plazo dentro del fondo de participación de inversionistas aprobado, sujeto a estructura del proyecto, contribución técnica, capital y rol de soporte. No es una oferta fija; los términos finales requieren revisión formal y negociación.",
  "Market / country partner":"Socio de mercado / país", "Land or infrastructure partner":"Socio de tierra o infraestructura", "Hospitality / buyer network partner":"Socio hotelero / red de compradores", "Capital partner":"Socio de capital", "Operations partner":"Socio operativo", "Government / institutional partner":"Socio gubernamental / institucional", "I understand partnership structures vary by project and require formal review, negotiation, and legal documentation.":"Entiendo que las estructuras de alianza varían por proyecto y requieren revisión formal, negociación y documentación legal.",
  "All submissions are reviewed for strategic fit, readiness, and alignment to ensure we build the right partnerships and invest in the right opportunities.":"Todas las solicitudes se revisan por ajuste estratégico, preparación y alineación para construir las alianzas correctas e invertir en las oportunidades adecuadas.", "Complete the appropriate pre-qualification form with detailed information.":"Complete el formulario de precalificación correspondiente con información detallada.", "We review background, readiness, market fit, and strategic alignment.":"Revisamos antecedentes, preparación, ajuste de mercado y alineación estratégica.", "If there is potential alignment, we may request more information or schedule a call.":"Si existe alineación potencial, podemos solicitar más información o programar una llamada.", "Qualified opportunities may be assessed for demand, feasibility, capital needs, operating model, and long-term viability.":"Las oportunidades calificadas pueden evaluarse por demanda, viabilidad, capital, modelo operativo y sostenibilidad a largo plazo.", "Only aligned opportunities move to structured commercial, investment, or partnership review.":"Solo las oportunidades alineadas avanzan a una revisión comercial, de inversión o alianza estructurada.",
  "Serious capital or real market access":"Capital serio o acceso real al mercado", "Strong local need":"Necesidad local fuerte", "Hospitality or specialty buyer demand":"Demanda hotelera o de compradores especializados", "Long-term alignment":"Alineación a largo plazo", "Operational discipline":"Disciplina operativa", "Shared value creation":"Creación de valor compartido", "This page is for preliminary expressions of interest only. It is not an offer of securities, not a solicitation to invest, not a guaranteed partnership, and not a guarantee that any submission will advance. All opportunities are subject to review, due diligence, legal documentation, negotiation, and applicable laws.":"Esta página es solo para expresiones preliminares de interés. No es una oferta de valores, solicitud de inversión, alianza garantizada ni garantía de avance. Todas las oportunidades están sujetas a revisión, debida diligencia, documentación legal, negociación y leyes aplicables."
});

Object.assign(RUNTIME_TRANSLATIONS.fr, {
  "SymbioGreens is being developed as a premium hydroponic farm initiative focused on fresh, local, reliable, and high-quality production. Balponics is the technical company behind the model, supporting hydroponic systems, controlled-environment growing, crop planning, technical execution, and scalable agricultural development.":"SymbioGreens est développée comme une initiative de ferme hydroponique premium axée sur une production fraîche, locale, fiable et de haute qualité. Balponics est l’entreprise technique derrière le modèle, soutenant les systèmes hydroponiques, la culture en environnement contrôlé, la planification des cultures, l’exécution technique et le développement agricole évolutif.",
  "Together, SymbioGreens and Balponics are being built to help create a more resilient, more efficient, and more autonomous food production model for tourism-driven, island, and import-dependent markets where food autonomy, food independence, and local resilience matter.":"Ensemble, SymbioGreens et Balponics sont développées pour créer un modèle alimentaire plus résilient, efficace et autonome pour les marchés touristiques, insulaires et dépendants des importations, où l’autonomie alimentaire et la résilience locale comptent.",
  "Many island and tourism-driven markets remain highly dependent on imported fresh produce. That dependence creates structural vulnerability. Shipping costs fluctuate. Delays affect freshness. External crises disrupt availability. Premium buyers struggle with inconsistency. Local businesses remain dependent on external supply chains they do not control.":"De nombreux marchés insulaires et touristiques restent fortement dépendants des produits frais importés. Cette dépendance crée une vulnérabilité structurelle. Les coûts d’expédition fluctuent, les retards affectent la fraîcheur, les crises externes perturbent la disponibilité et les acheteurs premium subissent l’inconstance.",
  "This is not only a logistics issue. It is a business resilience issue, a food autonomy issue, and a long-term development issue.":"Ce n’est pas seulement un problème logistique. C’est un enjeu de résilience commerciale, d’autonomie alimentaire et de développement à long terme.",
  "Heavy dependence on imported fresh produce":"Forte dépendance aux produits frais importés", "Exposure to shipping cost variation":"Exposition aux variations des coûts d’expédition", "Supply disruptions during global crises":"Interruptions d’approvisionnement pendant les crises mondiales", "Reduced freshness from long transport chains":"Fraîcheur réduite par de longues chaînes de transport", "Inconsistent quality and availability":"Qualité et disponibilité irrégulières", "Limited local control over supply":"Contrôle local limité sur l’approvisionnement", "Lost opportunities for local value creation":"Occasions perdues de création de valeur locale",
  "A smarter local production model can help communities, businesses, and countries reduce their dependence on distant supply chains. By producing more strategically at the local level, markets gain greater food autonomy, better control, stronger resilience, and improved ability to respond to shocks.":"Un modèle local plus intelligent peut aider communautés, entreprises et pays à réduire leur dépendance aux chaînes lointaines. En produisant plus stratégiquement localement, les marchés gagnent en autonomie alimentaire, contrôle, résilience et capacité de réponse aux chocs.",
  "This is especially important for island economies and hospitality markets, where dependence on imported produce can create vulnerability.":"C’est particulièrement important pour les économies insulaires et les marchés hôteliers, où la dépendance aux importations peut créer une vulnérabilité.",
  "Stronger Food Autonomy":"Autonomie alimentaire renforcée", "Produce more strategically at the local level and reduce dependence on distant supply chains.":"Produire plus stratégiquement localement et réduire la dépendance aux chaînes lointaines.", "Better Food Independence":"Meilleure indépendance alimentaire", "Control more critical fresh-food supply decisions within the local market.":"Contrôler davantage de décisions critiques d’approvisionnement frais dans le marché local.", "Improved National Resilience":"Résilience nationale améliorée", "Build a food system that can withstand disruption, volatility, and long-term pressure.":"Construire un système alimentaire capable de résister aux perturbations, à la volatilité et aux pressions longues.", "Better Business Continuity":"Meilleure continuité d’activité", "Support reliable supply for hotels, restaurants, retailers, and institutions.":"Soutenir un approvisionnement fiable pour hôtels, restaurants, détaillants et institutions.", "More Local Control":"Plus de contrôle local", "Improve control over quality, timing, harvest planning, and buyer responsiveness.":"Améliorer le contrôle de la qualité, du calendrier, de la récolte et de la réponse acheteur.",
  "One of the biggest opportunities in this model is the ability to help markets shift from being only importers to becoming producers. Instead of depending almost entirely on incoming goods, local businesses and operators can participate in value creation through controlled production, packaging, technical operations, and local supply relationships.":"L’une des grandes opportunités de ce modèle est d’aider les marchés à passer du rôle d’importateurs à celui de producteurs. Au lieu de dépendre presque entièrement des produits entrants, les entreprises locales peuvent participer à la création de valeur par la production contrôlée, l’emballage, les opérations techniques et les relations locales d’approvisionnement.",
  "That shift matters economically. More value can stay in the local economy. More knowledge can be built locally. More jobs can be created locally. More strategic capacity can be developed locally.":"Ce changement compte économiquement. Plus de valeur, de connaissances, d’emplois et de capacité stratégique peuvent rester et se développer localement.",
  "Import Dependence":"Dépendance aux importations", "Relying on distant markets creates vulnerability, higher costs, and supply risk.":"Dépendre de marchés lointains crée vulnérabilité, coûts plus élevés et risques d’approvisionnement.", "Local Production Planning":"Planification de production locale", "Assess local needs, land, resources, and market demand to design a productive strategy.":"Évaluer les besoins locaux, les terres, les ressources et la demande pour concevoir une stratégie productive.", "Hydroponic Systems":"Systèmes hydroponiques", "Deploy efficient systems that maximize yield, conserve resources, and support year-round production.":"Déployer des systèmes efficaces qui maximisent le rendement, économisent les ressources et soutiennent la production annuelle.", "Quality Handling & Processing":"Manutention et transformation qualité", "Maintain standards through careful handling, packing, cold chain, and traceability.":"Maintenir les standards par une manutention soignée, l’emballage, la chaîne du froid et la traçabilité.", "Local Supply & Distribution":"Approvisionnement et distribution locale", "Deliver fresh produce to local markets, businesses, and communities.":"Livrer des produits frais aux marchés, entreprises et communautés locales.", "Stronger Local Economy":"Économie locale renforcée", "Keep value local, create jobs, build resilience, and strengthen food autonomy.":"Garder la valeur localement, créer des emplois, renforcer la résilience et l’autonomie alimentaire.",
  "Hydroponics makes it possible to produce premium crops with greater control over water, nutrients, spacing, hygiene, and harvest planning. In the right context, hydroponics is not just a technology upgrade; it is a strategic production model for freshness, consistency, efficiency, and resilience.":"L’hydroponie permet de produire des cultures premium avec plus de contrôle sur l’eau, les nutriments, l’espace, l’hygiène et la planification de récolte. Dans le bon contexte, ce n’est pas seulement une technologie; c’est un modèle stratégique de fraîcheur, constance, efficacité et résilience.",
  "For SymbioGreens and Balponics, hydroponics supports local production in a way that is cleaner, more planned, and more adaptive to modern market needs.":"Pour SymbioGreens et Balponics, l’hydroponie soutient une production locale plus propre, planifiée et adaptée aux besoins modernes du marché.",
  "SymbioGreens is built around disciplined greenhouse operations, trained production teams, and executive leadership capable of supporting premium hydroponic production, buyer reliability, and scalable project development.":"SymbioGreens est construite autour d’opérations de serre disciplinées, d’équipes formées et d’une direction capable de soutenir la production hydroponique premium, la fiabilité acheteur et le développement de projets évolutifs.",
  "Our operational model depends on trained teams working across production, propagation, harvesting, packing, quality control, cold chain, delivery, and technical support. This is the daily execution behind premium local freshness.":"Notre modèle opérationnel dépend d’équipes formées en production, propagation, récolte, emballage, contrôle qualité, chaîne du froid, livraison et support technique. C’est l’exécution quotidienne derrière la fraîcheur locale premium.",
  "Greenhouse Production Team":"Équipe de production en serre", "Daily crop care, greenhouse routines, hydroponic system monitoring, plant health observation, and production execution inside the growing areas.":"Soins quotidiens des cultures, routines de serre, surveillance des systèmes hydroponiques, observation de la santé végétale et exécution dans les zones de culture.", "Seed starting, young plant care, propagation scheduling, transplant readiness, and early-stage crop quality control.":"Semis, soin des jeunes plants, calendrier de propagation, préparation au repiquage et contrôle qualité précoce.", "Harvest discipline, product handling, washing, grading, packing, labeling, and preparation for buyer delivery.":"Discipline de récolte, manutention, lavage, tri, emballage, étiquetage et préparation pour livraison.", "Visual inspection, freshness checks, crop consistency, hygiene standards, traceability, and presentation quality.":"Inspection visuelle, contrôles de fraîcheur, constance des cultures, hygiène, traçabilité et qualité de présentation.", "Cold holding, delivery preparation, route coordination, electric delivery logistics, and freshness protection from farm to buyer.":"Maintien au froid, préparation de livraison, coordination des routes, logistique électrique et protection de la fraîcheur.", "Team training, SOP implementation, hydroponic system support, equipment checks, crop planning, and continuous operational improvement.":"Formation d’équipe, mise en œuvre des SOP, support hydroponique, vérification des équipements, planification des cultures et amélioration continue.",
  "Team & Operations":"Équipe et opérations", "Built for Disciplined Execution":"Conçu pour une exécution disciplinée", "Daily crop monitoring":"Surveillance quotidienne des cultures", "Clean harvest and packing routines":"Routines propres de récolte et d’emballage", "Quality-focused handling":"Manutention axée sur la qualité", "Buyer-responsive scheduling":"Planification adaptée aux acheteurs", "Technical system oversight":"Supervision technique du système", "Training and continuous improvement":"Formation et amélioration continue",
  "The founding leadership behind a new generation of premium, resilient, and technology-enabled agribusiness in the Caribbean.":"La direction fondatrice derrière une nouvelle génération d’agroentreprises premium, résilientes et technologiques dans les Caraïbes.",
  "Multilingual entrepreneur, innovation strategist, and agritech founder with 30+ years of experience across telecom, emerging markets, sustainable agriculture, and business development.":"Entrepreneur multilingue, stratège de l’innovation et fondateur agritech avec plus de 30 ans d’expérience dans les télécoms, marchés émergents, agriculture durable et développement commercial.",
  "Investor relations":"Relations investisseurs", "Market expansion":"Expansion de marché", "Agribusiness operator, food-distribution executive, and heir to a Haitian legacy of agriculture, importation, and ecological innovation.":"Opérateur agro-industriel, dirigeant de distribution alimentaire et héritier d’un héritage haïtien d’agriculture, d’importation et d’innovation écologique.", "Operations execution":"Exécution opérationnelle", "Food distribution":"Distribution alimentaire", "Quality discipline":"Discipline qualité",
  "Bernard Balmir is a multilingual entrepreneur, executive strategist, and innovation-driven business builder with more than three decades of experience across telecommunications, fintech, prepaid services, international business development, agritech, hydroponics, and sustainable production systems.":"Bernard Balmir est un entrepreneur multilingue, stratège exécutif et bâtisseur d’entreprises axé sur l’innovation, avec plus de trois décennies d’expérience dans les télécommunications, la fintech, les services prépayés, le développement international, l’agritech, l’hydroponie et les systèmes de production durable.",
  "Trained with a strong business and legal foundation, Bernard developed an entrepreneurial mindset early in life and built his career around innovation, niche markets, and practical execution. In the United States, he was among the early pioneers of pinless prepaid long-distance calling, helping disrupt a prepaid calling-card industry that had remained largely unchanged for years.":"Formé avec une solide base commerciale et juridique, Bernard a développé tôt un esprit entrepreneurial et bâti sa carrière autour de l’innovation, des marchés de niche et de l’exécution concrète. Aux États-Unis, il fut parmi les pionniers des appels longue distance prépayés sans PIN, contribuant à transformer une industrie longtemps inchangée.",
  "Over the course of his career, Bernard has led and participated in ventures across the Caribbean, the United States, Latin America, Europe, and Africa, with experience in executive leadership, business development, sales strategy, market entry, strategic partnerships, customer operations, and commercial scaling.":"Au cours de sa carrière, Bernard a dirigé et participé à des projets dans les Caraïbes, aux États-Unis, en Amérique latine, en Europe et en Afrique, avec une expérience en direction, développement commercial, ventes, entrée de marché, partenariats stratégiques, opérations clients et croissance commerciale.",
  "In recent years, Bernard has focused his energy on controlled-environment agriculture, hydroponics, specialty crops, mushrooms, circular production systems, and sustainable food infrastructure through Balponics and related initiatives.":"Ces dernières années, Bernard s’est concentré sur l’agriculture en environnement contrôlé, l’hydroponie, les cultures spécialisées, les champignons, les systèmes circulaires et l’infrastructure alimentaire durable via Balponics et initiatives associées.",
  "As CEO, Bernard leads the company vision, strategy, partnerships, investor relations, business model, brand positioning, and long-term expansion across the Dominican Republic, Haiti, and the wider Caribbean.":"Comme CEO, Bernard dirige la vision, la stratégie, les partenariats, les relations investisseurs, le modèle d’affaires, le positionnement de marque et l’expansion à long terme en République dominicaine, en Haïti et dans les Caraïbes élargies.",
  "Marcel Bernard Ville-Drouin is a Haitian entrepreneur, agribusiness operator, and business executive with nearly three decades of experience across food products, importation, distribution, manufacturing, and agricultural ventures.":"Marcel Bernard Ville-Drouin est un entrepreneur haïtien, opérateur agro-industriel et dirigeant avec près de trois décennies d’expérience dans les produits alimentaires, l’importation, la distribution, la fabrication et les projets agricoles.",
  "Trained in Business Administration, Marcel has spent more than 25 years building and managing businesses connected to food supply, consumer products, agriculture, and commercial distribution. He is associated with Minaya Spices and Maison Ville-Drouin, two names tied to Haiti's food and product distribution sectors.":"Formé en administration des affaires, Marcel a passé plus de 25 ans à construire et gérer des entreprises liées à l’approvisionnement alimentaire, aux produits de consommation, à l’agriculture et à la distribution commerciale. Il est associé à Minaya Spices et Maison Ville-Drouin, deux noms liés aux secteurs haïtiens de l’alimentation et de la distribution.",
  "Marcel also comes from one of Haiti's recognized entrepreneurial families. His father, Philippe Ville-Drouin, was the founder and driving force behind Le Montcel, an ecological and agricultural property in the Kenscoff/Belot area connected to agriculture, environmental stewardship, rural development, and local production.":"Marcel vient aussi d’une famille entrepreneuriale reconnue d’Haïti. Son père, Philippe Ville-Drouin, fut le fondateur et moteur de Le Montcel, une propriété écologique et agricole dans la zone de Kenscoff/Belot liée à l’agriculture, la gestion environnementale, le développement rural et la production locale.",
  "His experience gives him practical knowledge of procurement, logistics, wholesale markets, inventory management, customer relationships, and the realities of operating in complex Caribbean environments.":"Son expérience lui donne une connaissance pratique des achats, de la logistique, des marchés de gros, de la gestion des stocks, des relations clients et des réalités opérationnelles des environnements caribéens complexes.",
  "As COO, Marcel brings operational leadership, commercial realism, supplier and market experience, and grounded execution across procurement, production planning, logistics, distribution, quality control, and day-to-day operations.":"Comme COO, Marcel apporte leadership opérationnel, réalisme commercial, expérience fournisseurs et marchés, et exécution concrète dans les achats, la planification, la logistique, la distribution, le contrôle qualité et les opérations quotidiennes.",
  "SymbioGreens and Balponics are developing a premium controlled-environment agriculture model designed for local freshness, food autonomy, hospitality supply, technical training, and scalable project replication. We welcome serious inquiries from qualified investors and strategic partners aligned with our mission to build smarter local food systems.":"SymbioGreens et Balponics développent un modèle premium d’agriculture en environnement contrôlé conçu pour la fraîcheur locale, l’autonomie alimentaire, l’approvisionnement hôtelier, la formation technique et la réplication évolutive. Nous accueillons les demandes sérieuses d’investisseurs qualifiés et de partenaires stratégiques alignés sur notre mission.",
  "For qualified investors seeking exposure to scalable local food production, hydroponic infrastructure, and regional growth opportunities.":"Pour les investisseurs qualifiés intéressés par la production locale évolutive, l’infrastructure hydroponique et les opportunités régionales.", "For partners bringing land, capital, market access, buyer relationships, infrastructure, or local execution capacity.":"Pour les partenaires apportant terrain, capital, accès au marché, relations acheteurs, infrastructure ou capacité d’exécution locale.", "Investor track selected: review investment opportunities in Balponics, SymbioGreens, farm development, technical platforms, and regional growth.":"Parcours investisseur sélectionné: examinez les opportunités Balponics, SymbioGreens, développement de fermes, plateformes techniques et croissance régionale.", "Strategic partner track selected: explore project partnerships where local partners bring market access, resources, execution capacity, or infrastructure.":"Parcours partenaire stratégique sélectionné: explorez les projets où les partenaires locaux apportent accès au marché, ressources, exécution ou infrastructure.",
  "This track is for qualified investors seeking exposure to controlled-environment agriculture, premium local food production, hydroponic infrastructure, farm development, technical platforms, or regional growth opportunities.":"Ce parcours s’adresse aux investisseurs qualifiés intéressés par l’agriculture contrôlée, la production locale premium, l’infrastructure hydroponique, le développement de fermes, les plateformes techniques ou la croissance régionale.",
  "Individual investor":"Investisseur individuel", "Family office":"Family office", "Strategic investor":"Investisseur stratégique", "Institutional investor":"Investisseur institutionnel", "Development / impact investor":"Investisseur développement / impact", "Balponics Technical Systems & Services":"Systèmes et services techniques Balponics", "SymbioGreens Farm Development":"Développement de fermes SymbioGreens", "SymbioGreens Network / Group Expansion":"Expansion réseau / groupe SymbioGreens", "Specific Model Farms & Projects":"Fermes et projets modèles spécifiques", "Regional Replication Projects":"Projets de réplication régionale", "Strategic Growth Capital":"Capital stratégique de croissance",
  "I understand this is a selective preliminary review process and not an investment offer or guaranteed opportunity.":"Je comprends qu’il s’agit d’un processus préliminaire sélectif et non d’une offre d’investissement ni d’une opportunité garantie.",
  "This track is for partners who want to bring the SymbioGreens / Balponics model to a specific market, country, island, city, hospitality zone, or commercial network.":"Ce parcours s’adresse aux partenaires souhaitant apporter le modèle SymbioGreens / Balponics à un marché, pays, île, ville, zone hôtelière ou réseau commercial spécifique.",
  "SymbioGreens / Balponics can bring the model, systems, crop strategy, training, technical support, brand standards, and operating framework. A local partner may bring land, capital, infrastructure, buyer access, market access, operations, or local execution. Partnership structures vary by project and may involve meaningful long-term participation within the approved investor equity pool, subject to project structure, technical contribution, capital structure, and support role. This is not a fixed offer; final terms require formal review and negotiation.":"SymbioGreens / Balponics peut apporter le modèle, les systèmes, la stratégie de cultures, la formation, le support technique, les standards de marque et le cadre opérationnel. Un partenaire local peut apporter terrain, capital, infrastructure, accès acheteurs, marché, opérations ou exécution locale. Les structures varient selon le projet et peuvent impliquer une participation significative à long terme dans le pool de participation investisseur approuvé, sous réserve de la structure du projet, de la contribution technique, de la structure du capital et du rôle de support. Ce n’est pas une offre fixe; les termes finaux exigent examen formel et négociation.",
  "Market / country partner":"Partenaire marché / pays", "Land or infrastructure partner":"Partenaire terrain ou infrastructure", "Hospitality / buyer network partner":"Partenaire hôtelier / réseau acheteurs", "Capital partner":"Partenaire capital", "Operations partner":"Partenaire opérations", "Government / institutional partner":"Partenaire gouvernemental / institutionnel", "I understand partnership structures vary by project and require formal review, negotiation, and legal documentation.":"Je comprends que les structures de partenariat varient selon le projet et exigent examen formel, négociation et documentation juridique.",
  "All submissions are reviewed for strategic fit, readiness, and alignment to ensure we build the right partnerships and invest in the right opportunities.":"Toutes les soumissions sont examinées selon l’adéquation stratégique, la préparation et l’alignement afin de bâtir les bons partenariats et investir dans les bonnes opportunités.", "Complete the appropriate pre-qualification form with detailed information.":"Complétez le formulaire de préqualification approprié avec des informations détaillées.", "We review background, readiness, market fit, and strategic alignment.":"Nous examinons le contexte, la préparation, l’adéquation au marché et l’alignement stratégique.", "If there is potential alignment, we may request more information or schedule a call.":"S’il existe un alignement potentiel, nous pouvons demander plus d’informations ou planifier un appel.", "Qualified opportunities may be assessed for demand, feasibility, capital needs, operating model, and long-term viability.":"Les opportunités qualifiées peuvent être évaluées selon la demande, la faisabilité, les besoins en capital, le modèle opérationnel et la viabilité long terme.", "Only aligned opportunities move to structured commercial, investment, or partnership review.":"Seules les opportunités alignées avancent vers un examen commercial, d’investissement ou de partenariat structuré.",
  "Serious capital or real market access":"Capital sérieux ou accès réel au marché", "Strong local need":"Besoin local fort", "Hospitality or specialty buyer demand":"Demande hôtelière ou acheteurs spécialisés", "Long-term alignment":"Alignement à long terme", "Operational discipline":"Discipline opérationnelle", "Shared value creation":"Création de valeur partagée", "This page is for preliminary expressions of interest only. It is not an offer of securities, not a solicitation to invest, not a guaranteed partnership, and not a guarantee that any submission will advance. All opportunities are subject to review, due diligence, legal documentation, negotiation, and applicable laws.":"Cette page sert uniquement aux expressions préliminaires d’intérêt. Ce n’est pas une offre de titres, une sollicitation d’investissement, un partenariat garanti ni une garantie d’avancement. Toutes les opportunités sont soumises à examen, diligence raisonnable, documentation juridique, négociation et lois applicables."
});

Object.assign(RUNTIME_TRANSLATIONS.es, {
  "Las Terrenas Model Farm Project":"Proyecto de Granja Modelo Las Terrenas",
  "A premium hydroponic production model designed for hospitality, specialty buyers, local freshness, and Caribbean replication.":"Un modelo premium de producción hidropónica diseñado para hotelería, compradores especializados, frescura local y replicación en el Caribe.",
  "The Las Terrenas project is designed as a reference model for premium controlled-environment agriculture in tourism-driven and island markets. The concept combines greenhouse production, crop planning, post-harvest handling, cold storage, electric delivery logistics, and buyer-responsive operations into one practical, scalable farm model.":"El proyecto Las Terrenas está diseñado como modelo de referencia para agricultura premium en ambiente controlado en mercados turísticos e insulares. El concepto integra producción en invernadero, planificación de cultivos, manejo poscosecha, almacenamiento en frío, logística de entrega eléctrica y operaciones sensibles a compradores en un modelo práctico y escalable.",
  "View Model Layout":"Ver diseño del modelo", "Discuss a Project":"Conversar sobre un proyecto", "Inside the Production Environment":"Dentro del entorno de producción", "Reference Model":"Modelo de referencia", "The Reference Model: Las Terrenas":"El modelo de referencia: Las Terrenas",
  "Inside the SymbioGreens / Balponics production environment - a controlled greenhouse model using vertical hydroponic towers, clean water systems, and technical growing infrastructure for premium local production.":"Dentro del entorno de producción SymbioGreens / Balponics: un modelo de invernadero controlado con torres hidropónicas verticales, sistemas limpios de agua e infraestructura técnica de cultivo para producción local premium.",
  "Las Terrenas serves as the first model environment for a premium hydroponic production hub. The project is designed to serve hotels, restaurants, villas, specialty food buyers, and local fresh-food channels with consistent, high-quality produce grown close to market.":"Las Terrenas sirve como primer entorno modelo para un centro de producción hidropónica premium. El proyecto está diseñado para atender hoteles, restaurantes, villas, compradores especializados y canales locales de alimentos frescos con productos consistentes y de alta calidad cultivados cerca del mercado.",
  "The model is intended to demonstrate controlled-environment production, vertical hydroponic growing, efficient water and nutrient delivery, clean technical operations, quality-focused crop management, and premium local freshness.":"El modelo busca demostrar producción en ambiente controlado, cultivo hidropónico vertical, entrega eficiente de agua y nutrientes, operaciones técnicas limpias, gestión enfocada en calidad y frescura local premium.",
  "Site":"Sitio", "Approx. 1,500 m2 property":"Propiedad de aprox. 1,500 m2", "Pilot production zone":"Zona piloto de producción", "Approx. 300 m2 initial phase":"Aprox. 300 m2 en fase inicial", "Main greenhouse area":"Área principal de invernaderos", "Approx. 1,050 m2 primary production concept":"Aprox. 1,050 m2 como concepto principal de producción", "Systems":"Sistemas", "Crop mix":"Mezcla de cultivos", "Cucumbers, tomatoes, eggplant, lettuces, herbs, microgreens, specialty crops":"Pepinos, tomates, berenjena, lechugas, hierbas, microgreens y cultivos especiales", "Pilot tray target":"Meta piloto de bandejas", "Approx. 800 trays/month for microgreens and baby greens":"Aprox. 800 bandejas/mes para microgreens y baby greens", "Market served":"Mercado atendido", "Hospitality, specialty retail, fresh local supply":"Hotelería, comercio especializado y suministro local fresco",
  "Model Layout":"Diseño del modelo", "Conceptual Greenhouse Layout":"Diseño conceptual del invernadero",
  "The layout visual is shown as an illustrative planning reference for integrated farm design, production systems, post-harvest flow, cold chain, delivery readiness, and scalable project planning.":"El visual del diseño se muestra como referencia ilustrativa para planificación integrada de granja, sistemas de producción, flujo poscosecha, cadena fría, preparación de entrega y planificación escalable de proyectos.",
  "Conceptual greenhouse layout showing the Las Terrenas model configuration, including Dutch Bucket, NFT, DWC, nursery, microgreens, harvest and packing, cold storage, utility systems, and electric delivery access.":"Diseño conceptual del invernadero que muestra la configuración del modelo Las Terrenas, incluyendo Dutch Bucket, NFT, DWC, vivero, microgreens, cosecha y empaque, almacenamiento en frío, sistemas de servicio y acceso para entrega eléctrica.",
  "Three Production Systems, One Integrated Farm Model":"Tres sistemas de producción, un modelo integrado de granja",
  "Dutch Bucket Greenhouse":"Invernadero Dutch Bucket", "Designed for fruiting and bush crops such as cucumbers, tomatoes, eggplant, and peppers. Dutch bucket systems allow controlled nutrient delivery, strong root-zone management, and efficient production of premium crops for hospitality and specialty buyers.":"Diseñado para cultivos de fruto y arbustivos como pepinos, tomates, berenjenas y pimientos. Los sistemas Dutch Bucket permiten nutrición controlada, gestión fuerte de la zona radicular y producción eficiente de cultivos premium para hotelería y compradores especializados.",
  "NFT Greenhouse":"Invernadero NFT", "Designed for leafy greens, herbs, and fast-turnover crops using nutrient film technique channels. NFT production supports clean, efficient growing for products where consistency, freshness, and presentation matter.":"Diseñado para hojas verdes, hierbas y cultivos de rotación rápida usando canales NFT. La producción NFT apoya un cultivo limpio y eficiente para productos donde importan consistencia, frescura y presentación.",
  "DWC Greenhouse":"Invernadero DWC", "Designed for lettuce and similar salad crops using deep water culture raft systems. DWC production supports stable growth, consistent quality, and reliable volume planning for local fresh supply.":"Diseñado para lechugas y cultivos similares usando sistemas DWC de balsas. La producción DWC apoya crecimiento estable, calidad consistente y planificación confiable de volumen para suministro local fresco.",
  "Built Around More Than Growing":"Construido alrededor de más que cultivar",
  "A premium farm model requires more than greenhouse production. The Las Terrenas concept integrates the operational infrastructure needed to harvest, protect, pack, store, and deliver quality produce with discipline.":"Un modelo de granja premium requiere más que producción en invernadero. El concepto Las Terrenas integra la infraestructura operativa necesaria para cosechar, proteger, empacar, almacenar y entregar productos de calidad con disciplina.",
  "Nursery & Propagation":"Vivero y propagación", "Seedling germination, plant starts, and early crop management.":"Germinación, arranque de plantas y manejo temprano de cultivos.", "Microgreens & Tray Production":"Microgreens y producción en bandejas", "High-turnover production for microgreens, baby greens, and chef-oriented specialty products.":"Producción de alta rotación para microgreens, baby greens y productos especiales orientados a chefs.", "Harvest & Packing Facility":"Instalación de cosecha y empaque", "Post-harvest handling, grading, cleaning, packing, labeling, and quality control.":"Manejo poscosecha, clasificación, limpieza, empaque, etiquetado y control de calidad.", "Cold Rooms & Freshness Holding":"Cuartos fríos y conservación de frescura", "Temperature-controlled storage to preserve quality, shelf life, and buyer confidence.":"Almacenamiento con temperatura controlada para preservar calidad, vida útil y confianza del comprador.", "Utility & Water Treatment":"Servicios y tratamiento de agua", "Nutrient mixing, filtration, dosing, recirculation, pH/EC management, and water quality control.":"Mezcla de nutrientes, filtración, dosificación, recirculación, manejo pH/EC y control de calidad del agua.", "Electric Delivery Access":"Acceso de entrega eléctrica", "Clean, quiet electric vans or small trucks supporting local delivery to hotels, restaurants, villas, and specialty buyers.":"Vans o camiones eléctricos limpios y silenciosos para entrega local a hoteles, restaurantes, villas y compradores especializados.",
  "Tour, Education & Demonstration Value":"Valor de tours, educación y demostración", "The model farm can also function as a demonstration and visitor experience. In tourism-driven markets, a well-designed greenhouse farm can support guided visits, chef and buyer tours, sustainability education, training, and community engagement.":"La granja modelo también puede funcionar como experiencia de demostración y visita. En mercados turísticos, una granja de invernadero bien diseñada puede apoyar visitas guiadas, recorridos para chefs y compradores, educación en sostenibilidad, capacitación y participación comunitaria.", "Discuss Demonstration Opportunities":"Conversar sobre oportunidades de demostración",
  "Guided Tours":"Tours guiados", "Structured visits that explain the production model and sustainability value.":"Visitas estructuradas que explican el modelo de producción y su valor sostenible.", "Buyer & Chef Visits":"Visitas de compradores y chefs", "Practical walkthroughs for hospitality, restaurant, and specialty food buyers.":"Recorridos prácticos para hotelería, restaurantes y compradores especializados.", "Sustainability Education":"Educación en sostenibilidad", "A visible model for local food resilience, water efficiency, and reduced import dependence.":"Un modelo visible de resiliencia alimentaria local, eficiencia de agua y menor dependencia de importaciones.", "Training & Demonstrations":"Capacitación y demostraciones", "Hands-on learning for operators, teams, partners, and community programs.":"Aprendizaje práctico para operadores, equipos, socios y programas comunitarios.",
  "What We Offer":"Lo que ofrecemos", "Through the SymbioGreens and Balponics model, the project can be adapted into different farm formats depending on land size, market demand, climate conditions, budget, crop strategy, and operational goals.":"Mediante el modelo SymbioGreens y Balponics, el proyecto puede adaptarse a distintos formatos de granja según tamaño de terreno, demanda, clima, presupuesto, estrategia de cultivos y objetivos operativos.",
  "Feasibility & Market Alignment":"Factibilidad y alineación de mercado", "Market demand review, buyer mapping, crop priorities, and commercial positioning.":"Revisión de demanda, mapeo de compradores, prioridades de cultivos y posicionamiento comercial.", "Site Planning & Concept Development":"Planificación del sitio y desarrollo conceptual", "Farm layout, greenhouse configuration, workflow planning, and phased development strategy.":"Diseño de granja, configuración de invernadero, flujo de trabajo y estrategia por fases.", "Climate-Adapted Greenhouse Design":"Diseño de invernadero adaptado al clima", "Greenhouse concepts adapted to tropical, coastal, island, and tourism-driven environments.":"Conceptos adaptados a entornos tropicales, costeros, insulares y turísticos.", "Hydroponic System Selection":"Selección de sistemas hidropónicos", "Dutch Bucket, NFT, DWC, microgreens, nursery, and specialty crop system planning.":"Planificación de Dutch Bucket, NFT, DWC, microgreens, vivero y cultivos especiales.", "Post-Harvest & Cold Chain":"Poscosecha y cadena fría", "Harvest flow, packing, cold room planning, freshness holding, and delivery readiness.":"Flujo de cosecha, empaque, cuartos fríos, conservación de frescura y preparación de entrega.", "Training, SOPs & Commissioning":"Capacitación, SOPs y puesta en marcha", "Team training, crop planning, system commissioning, quality protocols, and operating discipline.":"Capacitación de equipo, planificación de cultivos, puesta en marcha, protocolos de calidad y disciplina operativa.", "Long-Term Technical Support":"Soporte técnico a largo plazo", "Ongoing improvement, crop planning support, production troubleshooting, and scaling roadmap.":"Mejora continua, soporte de planificación, solución de problemas y ruta de escalamiento.",
  "Opportunity Pathways":"Rutas de oportunidad", "Designed for Caribbean Replication":"Diseñado para replicación en el Caribe", "Las Terrenas is the reference model, but the same logic can be adapted to other island and tourism-driven markets where premium freshness, import reduction, food resilience, and reliable local supply create strong value. The examples below are conceptual model adaptations, not confirmed foreign projects.":"Las Terrenas es el modelo de referencia, pero la misma lógica puede adaptarse a otros mercados insulares y turísticos donde la frescura premium, reducción de importaciones, resiliencia alimentaria y suministro local confiable crean valor. Los ejemplos son adaptaciones conceptuales, no proyectos extranjeros confirmados.",
  "Bahamas Hospitality Supply Model":"Modelo de suministro hotelero de Bahamas", "Resort & Villa Fresh Produce Hub":"Centro de productos frescos para resorts y villas", "A conceptual model designed for resort clusters, private villas, fine dining, and premium hospitality buyers. The focus is fresh local produce, reliable delivery, high presentation value, and reduced dependence on imported supply.":"Modelo conceptual para clusters de resorts, villas privadas, alta cocina y compradores hoteleros premium. El enfoque es producto local fresco, entrega confiable, alta presentación y menor dependencia de importaciones.",
  "Bermuda High-Value Island Model":"Modelo insular de alto valor de Bermuda", "Compact Food Resilience & Premium Local Supply":"Resiliencia alimentaria compacta y suministro local premium", "A compact, high-value greenhouse model adapted for island conditions, limited land, and premium local demand. The focus is year-round freshness, food resilience, efficient space use, cold chain discipline, and high-quality local production.":"Modelo compacto de invernadero de alto valor adaptado a condiciones insulares, terreno limitado y demanda local premium. El enfoque es frescura todo el año, resiliencia alimentaria, uso eficiente del espacio, cadena fría y producción local de alta calidad.",
  "Eastern Caribbean Boutique Market Model":"Modelo boutique de mercado del Caribe Oriental", "Modular Local Supply & Tourism Cluster Hub":"Centro modular de suministro local y turismo", "A modular farm concept for tourism clusters, local retailers, institutional buyers, and island communities. The model can combine greenhouse production, training, crop planning, post-harvest handling, and electric local delivery in a scalable format.":"Concepto modular de granja para clusters turísticos, comercios locales, compradores institucionales y comunidades insulares. Puede combinar producción en invernadero, capacitación, planificación, poscosecha y entrega local eléctrica en formato escalable.",
  "Premium local freshness":"Frescura local premium", "Reduced import dependence":"Menor dependencia de importaciones", "Climate-smart hydroponics":"Hidroponía climáticamente inteligente", "Buyer-responsive production":"Producción sensible al comprador", "Training and operational support":"Capacitación y soporte operativo",
  "Where This Model Fits":"Dónde encaja este modelo", "The model can be adapted to markets where freshness, reliability, presentation, and proximity create value. Each project should be shaped by buyer demand, land conditions, climate realities, and operational capacity.":"El modelo puede adaptarse a mercados donde frescura, confiabilidad, presentación y proximidad crean valor. Cada proyecto debe moldearse por demanda, terreno, clima y capacidad operativa.", "Hotels & Resorts":"Hoteles y resorts", "Restaurants & Fine Dining":"Restaurantes y alta cocina", "Private Villas":"Villas privadas", "Specialty Retail":"Comercio especializado", "Wellness & Tourism Operators":"Operadores de bienestar y turismo", "Institutional Buyers":"Compradores institucionales", "Island Communities":"Comunidades insulares", "Training & Demonstration Centers":"Centros de capacitación y demostración",
  "Build a Local Freshness Model":"Construir un modelo local de frescura", "Whether developed as a pilot farm, hospitality supply hub, training site, or regional production model, the SymbioGreens / Balponics approach is designed to connect premium production with real buyer demand.":"Ya sea como granja piloto, centro de suministro hotelero, sitio de capacitación o modelo regional, el enfoque SymbioGreens / Balponics conecta producción premium con demanda real de compradores.", "Contact Us":"Contactarnos"
});

Object.assign(RUNTIME_TRANSLATIONS.fr, {
  "Las Terrenas Model Farm Project":"Projet de ferme modèle Las Terrenas",
  "A premium hydroponic production model designed for hospitality, specialty buyers, local freshness, and Caribbean replication.":"Un modèle de production hydroponique premium conçu pour l’hôtellerie, les acheteurs spécialisés, la fraîcheur locale et la réplication dans les Caraïbes.",
  "The Las Terrenas project is designed as a reference model for premium controlled-environment agriculture in tourism-driven and island markets. The concept combines greenhouse production, crop planning, post-harvest handling, cold storage, electric delivery logistics, and buyer-responsive operations into one practical, scalable farm model.":"Le projet Las Terrenas est conçu comme modèle de référence pour l’agriculture premium en environnement contrôlé dans les marchés touristiques et insulaires. Le concept combine production en serre, planification des cultures, post-récolte, stockage froid, logistique électrique et opérations orientées acheteurs dans un modèle pratique et évolutif.",
  "View Model Layout":"Voir le plan du modèle", "Discuss a Project":"Discuter d’un projet", "Inside the Production Environment":"À l’intérieur de l’environnement de production", "Reference Model":"Modèle de référence", "The Reference Model: Las Terrenas":"Le modèle de référence : Las Terrenas",
  "Inside the SymbioGreens / Balponics production environment - a controlled greenhouse model using vertical hydroponic towers, clean water systems, and technical growing infrastructure for premium local production.":"À l’intérieur de l’environnement de production SymbioGreens / Balponics : un modèle de serre contrôlée utilisant des tours hydroponiques verticales, des systèmes d’eau propres et une infrastructure technique de culture pour une production locale premium.",
  "Las Terrenas serves as the first model environment for a premium hydroponic production hub. The project is designed to serve hotels, restaurants, villas, specialty food buyers, and local fresh-food channels with consistent, high-quality produce grown close to market.":"Las Terrenas sert de premier environnement modèle pour un hub de production hydroponique premium. Le projet est conçu pour servir hôtels, restaurants, villas, acheteurs spécialisés et circuits locaux avec des produits constants et de haute qualité cultivés près du marché.",
  "The model is intended to demonstrate controlled-environment production, vertical hydroponic growing, efficient water and nutrient delivery, clean technical operations, quality-focused crop management, and premium local freshness.":"Le modèle vise à démontrer la production en environnement contrôlé, la culture hydroponique verticale, l’apport efficace d’eau et de nutriments, des opérations techniques propres, une gestion axée sur la qualité et la fraîcheur locale premium.",
  "Site":"Site", "Approx. 1,500 m2 property":"Propriété d’environ 1 500 m2", "Pilot production zone":"Zone pilote de production", "Approx. 300 m2 initial phase":"Environ 300 m2 en phase initiale", "Main greenhouse area":"Zone principale de serres", "Approx. 1,050 m2 primary production concept":"Environ 1 050 m2 comme concept principal de production", "Systems":"Systèmes", "Crop mix":"Mix de cultures", "Cucumbers, tomatoes, eggplant, lettuces, herbs, microgreens, specialty crops":"Concombres, tomates, aubergines, laitues, herbes, microgreens et cultures spécialisées", "Pilot tray target":"Objectif pilote de plateaux", "Approx. 800 trays/month for microgreens and baby greens":"Environ 800 plateaux/mois pour microgreens et jeunes pousses", "Market served":"Marché desservi", "Hospitality, specialty retail, fresh local supply":"Hôtellerie, commerce spécialisé et approvisionnement local frais",
  "Model Layout":"Plan du modèle", "Conceptual Greenhouse Layout":"Plan conceptuel de serre",
  "The layout visual is shown as an illustrative planning reference for integrated farm design, production systems, post-harvest flow, cold chain, delivery readiness, and scalable project planning.":"Le visuel du plan sert de référence illustrative pour la conception intégrée de ferme, les systèmes de production, le flux post-récolte, la chaîne du froid, la préparation de livraison et la planification évolutive.",
  "Conceptual greenhouse layout showing the Las Terrenas model configuration, including Dutch Bucket, NFT, DWC, nursery, microgreens, harvest and packing, cold storage, utility systems, and electric delivery access.":"Plan conceptuel montrant la configuration du modèle Las Terrenas, incluant Dutch Bucket, NFT, DWC, pépinière, microgreens, récolte et emballage, stockage froid, systèmes techniques et accès de livraison électrique.",
  "Three Production Systems, One Integrated Farm Model":"Trois systèmes de production, un modèle de ferme intégré",
  "Dutch Bucket Greenhouse":"Serre Dutch Bucket", "Designed for fruiting and bush crops such as cucumbers, tomatoes, eggplant, and peppers. Dutch bucket systems allow controlled nutrient delivery, strong root-zone management, and efficient production of premium crops for hospitality and specialty buyers.":"Conçu pour les cultures fruitières et arbustives comme concombres, tomates, aubergines et poivrons. Les systèmes Dutch Bucket permettent une nutrition contrôlée, une gestion forte de la zone racinaire et une production efficace de cultures premium pour l’hôtellerie et les acheteurs spécialisés.",
  "NFT Greenhouse":"Serre NFT", "Designed for leafy greens, herbs, and fast-turnover crops using nutrient film technique channels. NFT production supports clean, efficient growing for products where consistency, freshness, and presentation matter.":"Conçu pour feuilles vertes, herbes et cultures à rotation rapide avec canaux NFT. La production NFT soutient une culture propre et efficace lorsque constance, fraîcheur et présentation comptent.",
  "DWC Greenhouse":"Serre DWC", "Designed for lettuce and similar salad crops using deep water culture raft systems. DWC production supports stable growth, consistent quality, and reliable volume planning for local fresh supply.":"Conçu pour laitues et cultures similaires avec systèmes DWC en radeaux. La production DWC soutient croissance stable, qualité constante et planification fiable des volumes pour l’approvisionnement local frais.",
  "Built Around More Than Growing":"Construit autour de plus que la culture",
  "A premium farm model requires more than greenhouse production. The Las Terrenas concept integrates the operational infrastructure needed to harvest, protect, pack, store, and deliver quality produce with discipline.":"Un modèle de ferme premium exige plus que la production en serre. Le concept Las Terrenas intègre l’infrastructure opérationnelle nécessaire pour récolter, protéger, emballer, stocker et livrer des produits de qualité avec discipline.",
  "Nursery & Propagation":"Pépinière et propagation", "Seedling germination, plant starts, and early crop management.":"Germination, jeunes plants et gestion précoce des cultures.", "Microgreens & Tray Production":"Microgreens et production en plateaux", "High-turnover production for microgreens, baby greens, and chef-oriented specialty products.":"Production à rotation rapide pour microgreens, jeunes pousses et produits spécialisés pour chefs.", "Harvest & Packing Facility":"Installation de récolte et emballage", "Post-harvest handling, grading, cleaning, packing, labeling, and quality control.":"Manutention post-récolte, tri, nettoyage, emballage, étiquetage et contrôle qualité.", "Cold Rooms & Freshness Holding":"Chambres froides et conservation fraîcheur", "Temperature-controlled storage to preserve quality, shelf life, and buyer confidence.":"Stockage contrôlé en température pour préserver qualité, durée de vie et confiance acheteur.", "Utility & Water Treatment":"Services et traitement de l’eau", "Nutrient mixing, filtration, dosing, recirculation, pH/EC management, and water quality control.":"Mélange nutritif, filtration, dosage, recirculation, gestion pH/EC et contrôle de l’eau.", "Electric Delivery Access":"Accès livraison électrique", "Clean, quiet electric vans or small trucks supporting local delivery to hotels, restaurants, villas, and specialty buyers.":"Véhicules électriques propres et silencieux pour livrer hôtels, restaurants, villas et acheteurs spécialisés.",
  "Tour, Education & Demonstration Value":"Valeur de visite, éducation et démonstration", "The model farm can also function as a demonstration and visitor experience. In tourism-driven markets, a well-designed greenhouse farm can support guided visits, chef and buyer tours, sustainability education, training, and community engagement.":"La ferme modèle peut aussi servir d’expérience de démonstration et de visite. Dans les marchés touristiques, une serre bien conçue peut soutenir visites guidées, tours chefs et acheteurs, éducation durable, formation et engagement communautaire.", "Discuss Demonstration Opportunities":"Discuter des opportunités de démonstration",
  "Guided Tours":"Visites guidées", "Structured visits that explain the production model and sustainability value.":"Visites structurées expliquant le modèle de production et la valeur durable.", "Buyer & Chef Visits":"Visites acheteurs et chefs", "Practical walkthroughs for hospitality, restaurant, and specialty food buyers.":"Parcours pratiques pour hôtellerie, restaurants et acheteurs spécialisés.", "Sustainability Education":"Éducation à la durabilité", "A visible model for local food resilience, water efficiency, and reduced import dependence.":"Un modèle visible de résilience alimentaire locale, efficacité hydrique et réduction des importations.", "Training & Demonstrations":"Formation et démonstrations", "Hands-on learning for operators, teams, partners, and community programs.":"Apprentissage pratique pour opérateurs, équipes, partenaires et programmes communautaires.",
  "What We Offer":"Ce que nous offrons", "Through the SymbioGreens and Balponics model, the project can be adapted into different farm formats depending on land size, market demand, climate conditions, budget, crop strategy, and operational goals.":"Grâce au modèle SymbioGreens et Balponics, le projet peut être adapté à différents formats selon terrain, demande, climat, budget, stratégie de cultures et objectifs opérationnels.",
  "Feasibility & Market Alignment":"Faisabilité et alignement marché", "Market demand review, buyer mapping, crop priorities, and commercial positioning.":"Analyse de demande, cartographie acheteurs, priorités de cultures et positionnement commercial.", "Site Planning & Concept Development":"Planification de site et concept", "Farm layout, greenhouse configuration, workflow planning, and phased development strategy.":"Plan de ferme, configuration serre, flux de travail et stratégie par phases.", "Climate-Adapted Greenhouse Design":"Serre adaptée au climat", "Greenhouse concepts adapted to tropical, coastal, island, and tourism-driven environments.":"Concepts adaptés aux environnements tropicaux, côtiers, insulaires et touristiques.", "Hydroponic System Selection":"Sélection du système hydroponique", "Dutch Bucket, NFT, DWC, microgreens, nursery, and specialty crop system planning.":"Planification Dutch Bucket, NFT, DWC, microgreens, pépinière et cultures spécialisées.", "Post-Harvest & Cold Chain":"Post-récolte et chaîne du froid", "Harvest flow, packing, cold room planning, freshness holding, and delivery readiness.":"Flux de récolte, emballage, chambres froides, conservation fraîcheur et préparation livraison.", "Training, SOPs & Commissioning":"Formation, SOPs et mise en service", "Team training, crop planning, system commissioning, quality protocols, and operating discipline.":"Formation d’équipe, planification, mise en service, protocoles qualité et discipline opérationnelle.", "Long-Term Technical Support":"Support technique à long terme", "Ongoing improvement, crop planning support, production troubleshooting, and scaling roadmap.":"Amélioration continue, soutien de planification, dépannage production et feuille de route d’échelle.",
  "Opportunity Pathways":"Parcours d’opportunité", "Designed for Caribbean Replication":"Conçu pour la réplication caribéenne", "Las Terrenas is the reference model, but the same logic can be adapted to other island and tourism-driven markets where premium freshness, import reduction, food resilience, and reliable local supply create strong value. The examples below are conceptual model adaptations, not confirmed foreign projects.":"Las Terrenas est le modèle de référence, mais la même logique peut s’adapter à d’autres marchés insulaires et touristiques où fraîcheur premium, réduction des importations, résilience alimentaire et approvisionnement fiable créent de la valeur. Les exemples ci-dessous sont conceptuels, pas des projets étrangers confirmés.",
  "Bahamas Hospitality Supply Model":"Modèle d’approvisionnement hôtelier des Bahamas", "Resort & Villa Fresh Produce Hub":"Hub de produits frais pour resorts et villas", "A conceptual model designed for resort clusters, private villas, fine dining, and premium hospitality buyers. The focus is fresh local produce, reliable delivery, high presentation value, and reduced dependence on imported supply.":"Modèle conceptuel pour clusters de resorts, villas privées, gastronomie et acheteurs hôteliers premium. L’accent est mis sur produits locaux frais, livraison fiable, forte présentation et moindre dépendance aux importations.",
  "Bermuda High-Value Island Model":"Modèle insulaire haut de gamme des Bermudes", "Compact Food Resilience & Premium Local Supply":"Résilience alimentaire compacte et approvisionnement local premium", "A compact, high-value greenhouse model adapted for island conditions, limited land, and premium local demand. The focus is year-round freshness, food resilience, efficient space use, cold chain discipline, and high-quality local production.":"Modèle compact de serre haut de gamme adapté aux conditions insulaires, terrains limités et demande locale premium. L’accent est mis sur fraîcheur annuelle, résilience alimentaire, espace efficace, chaîne du froid et production locale de qualité.",
  "Eastern Caribbean Boutique Market Model":"Modèle boutique du marché des Caraïbes orientales", "Modular Local Supply & Tourism Cluster Hub":"Hub modulaire d’approvisionnement local et tourisme", "A modular farm concept for tourism clusters, local retailers, institutional buyers, and island communities. The model can combine greenhouse production, training, crop planning, post-harvest handling, and electric local delivery in a scalable format.":"Concept modulaire pour clusters touristiques, détaillants locaux, acheteurs institutionnels et communautés insulaires. Le modèle peut combiner serre, formation, planification, post-récolte et livraison électrique locale dans un format évolutif.",
  "Premium local freshness":"Fraîcheur locale premium", "Reduced import dependence":"Dépendance aux importations réduite", "Climate-smart hydroponics":"Hydroponie adaptée au climat", "Buyer-responsive production":"Production orientée acheteurs", "Training and operational support":"Formation et support opérationnel",
  "Where This Model Fits":"Où ce modèle s’applique", "The model can be adapted to markets where freshness, reliability, presentation, and proximity create value. Each project should be shaped by buyer demand, land conditions, climate realities, and operational capacity.":"Le modèle peut s’adapter aux marchés où fraîcheur, fiabilité, présentation et proximité créent de la valeur. Chaque projet doit être façonné par la demande acheteur, le terrain, le climat et la capacité opérationnelle.", "Hotels & Resorts":"Hôtels et resorts", "Restaurants & Fine Dining":"Restaurants et gastronomie", "Private Villas":"Villas privées", "Specialty Retail":"Commerce spécialisé", "Wellness & Tourism Operators":"Opérateurs bien-être et tourisme", "Institutional Buyers":"Acheteurs institutionnels", "Island Communities":"Communautés insulaires", "Training & Demonstration Centers":"Centres de formation et démonstration",
  "Build a Local Freshness Model":"Construire un modèle local de fraîcheur", "Whether developed as a pilot farm, hospitality supply hub, training site, or regional production model, the SymbioGreens / Balponics approach is designed to connect premium production with real buyer demand.":"Qu’il soit développé comme ferme pilote, hub hôtelier, site de formation ou modèle régional, l’approche SymbioGreens / Balponics relie production premium et demande réelle des acheteurs.", "Contact Us":"Nous contacter"
});

Object.assign(RUNTIME_TRANSLATIONS.es, {
  "The Las Terrenas / Northeast DR project is designed as the first reference model for premium controlled-environment agriculture in tourism-driven and island markets. The concept combines greenhouse production, crop planning, post-harvest handling, cold storage, electric delivery logistics, renewable-first energy planning, and buyer-responsive operations into one practical, scalable farm model.":"El proyecto Las Terrenas / Nordeste RD está diseñado como el primer modelo de referencia para agricultura premium en ambiente controlado en mercados turísticos e insulares. El concepto combina producción en invernadero, planificación de cultivos, manejo poscosecha, almacenamiento en frío, logística de entrega eléctrica, planificación energética renovable primero y operaciones orientadas al comprador en un modelo práctico y escalable.",
  "The Reference Model: Las Terrenas / Northeast DR":"El modelo de referencia: Las Terrenas / Nordeste RD",
  "The model is intended to demonstrate controlled-environment production, vertical hydroponic growing, efficient water and nutrient delivery, clean technical operations, quality-focused crop management, renewable-first planning, and premium local freshness.":"El modelo busca demostrar producción en ambiente controlado, cultivo hidropónico vertical, entrega eficiente de agua y nutrientes, operaciones técnicas limpias, manejo de cultivos enfocado en calidad, planificación renovable primero y frescura local premium.",
  "The layout visual is shown as an illustrative planning reference for integrated farm design, production systems, post-harvest flow, cold chain, delivery readiness, renewable energy planning, and scalable project planning.":"El visual del diseño se muestra como referencia ilustrativa para planificación integrada de finca, sistemas de producción, flujo poscosecha, cadena de frío, preparación de entrega, planificación de energía renovable y planificación escalable del proyecto.",
  "The Las Terrenas / Northeast DR model is designed as a reference platform that can be adapted to different Caribbean and island markets. Each market may require a different configuration depending on land availability, tourism demand, import dependence, buyer concentration, water access, energy costs, logistics, and local operating capacity.":"El modelo Las Terrenas / Nordeste RD está diseñado como una plataforma de referencia adaptable a distintos mercados caribeños e insulares. Cada mercado puede requerir una configuración distinta según disponibilidad de tierra, demanda turística, dependencia de importaciones, concentración de compradores, acceso al agua, costos energéticos, logística y capacidad operativa local.",
  "These examples are not presented as confirmed projects. They are illustrative replication models showing how SymbioGreens / Balponics can adapt the same core production logic to different island realities.":"Estos ejemplos no se presentan como proyectos confirmados. Son modelos ilustrativos de réplica que muestran cómo SymbioGreens / Balponics puede adaptar la misma lógica productiva central a distintas realidades insulares.",
  "Illustrative Caribbean replication concept":"Concepto ilustrativo de réplica caribeña",
  "View Model Concept":"Ver concepto del modelo",
  "A scalable controlled-environment agriculture hub designed to serve resorts, villas, chefs, restaurants, and specialty buyers with premium local supply.":"Un centro escalable de agricultura en ambiente controlado diseñado para servir resorts, villas, chefs, restaurantes y compradores especializados con suministro local premium.",
  "Resort and villa supply":"Suministro para resorts y villas",
  "Chef-driven demand":"Demanda impulsada por chefs",
  "Import replacement":"Sustitución de importaciones",
  "Same-day freshness":"Frescura el mismo día",
  "Scalable island model":"Modelo insular escalable",
  "Local business opportunity":"Oportunidad de negocio local",
  "A compact, high-value controlled-environment farm model adapted for limited land, premium local markets, and island food resilience.":"Un modelo compacto y de alto valor de finca en ambiente controlado adaptado a terrenos limitados, mercados locales premium y resiliencia alimentaria insular.",
  "Compact footprint":"Huella compacta",
  "High-value production":"Producción de alto valor",
  "Limited land adaptation":"Adaptación a terreno limitado",
  "Resilience and efficiency":"Resiliencia y eficiencia",
  "Year-round premium supply":"Suministro premium todo el año",
  "A modular production hub for tourism clusters, restaurants, boutique hotels, local retailers, cruise markets, and island communities.":"Un centro modular de producción para clusters turísticos, restaurantes, hoteles boutique, comercios locales, mercados de cruceros y comunidades insulares.",
  "Modular greenhouse planning":"Planificación modular de invernaderos",
  "Local market adaptation":"Adaptación al mercado local",
  "Tourism cluster supply":"Suministro para clusters turísticos",
  "Training and technical support":"Capacitación y soporte técnico",
  "Scalable investment model":"Modelo de inversión escalable",
  "Local food resilience":"Resiliencia alimentaria local",
  "Martinique Premium Fresh Supply Model":"Modelo de suministro fresco premium de Martinica",
  "An integrated fresh supply model designed for culinary culture, wellness products, specialty herbs, local freshness, and sustainable production.":"Un modelo integrado de suministro fresco diseñado para cultura culinaria, productos de bienestar, hierbas especiales, frescura local y producción sostenible.",
  "Culinary and wellness demand":"Demanda culinaria y de bienestar",
  "Herbs and specialty crops":"Hierbas y cultivos especiales",
  "Efficient water use":"Uso eficiente del agua",
  "Local delivery":"Entrega local",
  "Value-added processing":"Procesamiento de valor agregado",
  "Regional replication potential":"Potencial de réplica regional",
  "Guadeloupe Resilient Local Supply Model":"Modelo de suministro local resiliente de Guadalupe",
  "A resilient local supply model designed around controlled-environment production, local business opportunity, reduced imports, and regional scalability.":"Un modelo resiliente de suministro local diseñado alrededor de producción en ambiente controlado, oportunidades de negocio local, reducción de importaciones y escalabilidad regional.",
  "Resilient by design":"Resiliente por diseño",
  "Controlled-environment production":"Producción en ambiente controlado",
  "Packing and cold chain":"Empaque y cadena de frío",
  "Electric fleet and delivery":"Flota eléctrica y entrega",
  "Scalable Caribbean model":"Modelo caribeño escalable",
  "Renewable Energy":"Energía renovable",
  "Renewable-First Energy Strategy":"Estrategia energética renovable primero",
  "Many Caribbean and island markets have one abundant strategic resource: sunlight. The SymbioGreens / Balponics model is designed around a renewable-first energy philosophy, with solar power as the primary energy strategy wherever feasible. Greenhouse production, pumps, irrigation, cold rooms, lighting, monitoring, and processing systems should be planned with energy efficiency, solar integration, battery storage, and operational resilience in mind.":"Muchos mercados caribeños e insulares tienen un recurso estratégico abundante: el sol. El modelo SymbioGreens / Balponics está diseñado alrededor de una filosofía energética renovable primero, con energía solar como estrategia principal siempre que sea viable. La producción en invernadero, bombas, riego, cuartos fríos, iluminación, monitoreo y procesamiento deben planificarse considerando eficiencia energética, integración solar, almacenamiento en baterías y resiliencia operativa.",
  "The goal is not only to grow food locally, but to build farms that are less vulnerable to fuel costs, grid instability, and external energy shocks. This does not claim every site will be 100% renewable; it means each project should be engineered with renewable-first, solar-led, and resilient energy planning wherever feasible.":"La meta no es solo cultivar alimentos localmente, sino construir fincas menos vulnerables a costos de combustible, inestabilidad de la red y choques energéticos externos. Esto no afirma que cada sitio será 100% renovable; significa que cada proyecto debe diseñarse con planificación energética renovable primero, liderada por solar y resiliente siempre que sea viable.",
  "Solar-Led Power":"Energía liderada por solar",
  "Solar is prioritized because island markets often have strong sun exposure and high electricity costs.":"La energía solar se prioriza porque los mercados insulares suelen tener alta exposición solar y costos eléctricos elevados.",
  "Battery Storage & Resilience":"Almacenamiento en baterías y resiliencia",
  "Energy storage can help protect irrigation, climate systems, cold rooms, and monitoring during grid instability.":"El almacenamiento puede ayudar a proteger riego, sistemas climáticos, cuartos fríos y monitoreo durante inestabilidad de la red.",
  "Efficient Farm Design":"Diseño eficiente de finca",
  "Energy efficiency must be built into pumps, water systems, cold storage, lighting, and greenhouse operations.":"La eficiencia energética debe integrarse en bombas, sistemas de agua, almacenamiento frío, iluminación y operaciones de invernadero.",
  "Hybrid Backup Planning":"Planificación de respaldo híbrido",
  "Reliable food production requires continuity, so backup systems may be included where necessary.":"La producción confiable de alimentos requiere continuidad, por lo que pueden incluirse sistemas de respaldo cuando sea necesario.",
  "Wind Where Appropriate":"Viento donde sea apropiado",
  "Small wind or hybrid systems may be explored in locations where wind conditions make sense.":"Pueden explorarse sistemas eólicos pequeños o híbridos en ubicaciones donde las condiciones de viento tengan sentido.",
  "Lower Exposure to Energy Volatility":"Menor exposición a volatilidad energética",
  "Renewable-first planning can reduce exposure to fuel price shocks and grid instability.":"La planificación renovable primero puede reducir la exposición a choques de precios de combustible e inestabilidad de la red.",
  "R&D Platform":"Plataforma de I+D",
  "Research, Development & Future Food Systems":"Investigación, desarrollo y sistemas alimentarios futuros",
  "SymbioGreens and Balponics are being developed as more than a production operation. The goal is to remain at the cutting edge of hydroponics, controlled-environment agriculture, specialty crop development, renewable energy integration, data-informed growing, and future food-production technologies.":"SymbioGreens y Balponics se están desarrollando como algo más que una operación productiva. La meta es mantenerse a la vanguardia de la hidroponía, agricultura en ambiente controlado, desarrollo de cultivos especiales, integración de energía renovable, cultivo informado por datos y tecnologías futuras de producción alimentaria.",
  "The platform should continuously test new crops, improve production methods, refine water and nutrient efficiency, evaluate automation, and explore emerging biological and renewable-energy concepts that may support resilient agriculture in the future.":"La plataforma debe probar continuamente nuevos cultivos, mejorar métodos de producción, perfeccionar la eficiencia de agua y nutrientes, evaluar automatización y explorar conceptos biológicos y de energía renovable emergentes que puedan apoyar una agricultura resiliente en el futuro.",
  "Crop Trials":"Pruebas de cultivos",
  "Testing premium lettuces, herbs, microgreens, edible flowers, mushrooms, medicinal plants, and specialty crops based on real buyer demand.":"Pruebas de lechugas premium, hierbas, microgreens, flores comestibles, hongos, plantas medicinales y cultivos especiales basadas en demanda real de compradores.",
  "Hydroponic System Optimization":"Optimización de sistemas hidropónicos",
  "Improving tower systems, NFT, DWC, Dutch Bucket, microgreens, substrate systems, irrigation, nutrient delivery, and production workflows.":"Mejora de sistemas de torres, NFT, DWC, Dutch Bucket, microgreens, sistemas de sustrato, riego, entrega de nutrientes y flujos productivos.",
  "Water & Nutrient Efficiency":"Eficiencia de agua y nutrientes",
  "Improving recirculation, filtration, dosing, monitoring, and responsible water use.":"Mejora de recirculación, filtración, dosificación, monitoreo y uso responsable del agua.",
  "Automation & Monitoring":"Automatización y monitoreo",
  "Exploring sensors, pH/EC monitoring, flow tracking, climate data, crop records, and digital production management.":"Exploración de sensores, monitoreo pH/EC, seguimiento de flujo, datos climáticos, registros de cultivo y gestión digital de producción.",
  "Renewable Energy Integration":"Integración de energía renovable",
  "Testing solar-led power, storage, energy efficiency, and hybrid resilience models.":"Pruebas de energía liderada por solar, almacenamiento, eficiencia energética y modelos híbridos de resiliencia.",
  "Future Biological Systems":"Sistemas biológicos futuros",
  "Exploring future-facing concepts such as algae-related research, photosynthesis-based biological systems, biofertilizers, and other emerging sustainable production technologies where scientifically and commercially feasible.":"Exploración de conceptos futuros como investigación relacionada con algas, sistemas biológicos basados en fotosíntesis, biofertilizantes y otras tecnologías emergentes de producción sostenible cuando sean científica y comercialmente viables.",
  "Innovation statement":"Declaración de innovación",
  "SymbioGreens and Balponics are not designed to stand still. The platform is built to test, learn, improve, and adapt - because the future of food production will depend on smarter systems, better resource use, renewable energy, local resilience, and continuous innovation.":"SymbioGreens y Balponics no están diseñados para quedarse quietos. La plataforma está construida para probar, aprender, mejorar y adaptarse, porque el futuro de la producción alimentaria dependerá de sistemas más inteligentes, mejor uso de recursos, energía renovable, resiliencia local e innovación continua.",
  "Whether developed as a pilot farm, hospitality supply hub, training site, or regional production model, the SymbioGreens / Balponics approach is designed to connect premium production with real buyer demand, renewable-first planning, and continuous innovation.":"Ya sea como granja piloto, centro de suministro hotelero, sitio de capacitación o modelo regional, el enfoque SymbioGreens / Balponics está diseñado para conectar producción premium con demanda real de compradores, planificación renovable primero e innovación continua."
});

Object.assign(RUNTIME_TRANSLATIONS.fr, {
  "The Las Terrenas / Northeast DR project is designed as the first reference model for premium controlled-environment agriculture in tourism-driven and island markets. The concept combines greenhouse production, crop planning, post-harvest handling, cold storage, electric delivery logistics, renewable-first energy planning, and buyer-responsive operations into one practical, scalable farm model.":"Le projet Las Terrenas / Nord-Est RD est conçu comme le premier modèle de référence pour une agriculture premium en environnement contrôlé dans les marchés touristiques et insulaires. Le concept combine production en serre, planification des cultures, gestion post-récolte, stockage froid, logistique de livraison électrique, planification énergétique axée sur les renouvelables et opérations orientées acheteurs dans un modèle pratique et évolutif.",
  "The Reference Model: Las Terrenas / Northeast DR":"Le modèle de référence : Las Terrenas / Nord-Est RD",
  "The model is intended to demonstrate controlled-environment production, vertical hydroponic growing, efficient water and nutrient delivery, clean technical operations, quality-focused crop management, renewable-first planning, and premium local freshness.":"Le modèle vise à démontrer la production en environnement contrôlé, la culture hydroponique verticale, l’apport efficace d’eau et de nutriments, des opérations techniques propres, une gestion axée sur la qualité, une planification renouvelable en priorité et une fraîcheur locale premium.",
  "The layout visual is shown as an illustrative planning reference for integrated farm design, production systems, post-harvest flow, cold chain, delivery readiness, renewable energy planning, and scalable project planning.":"Le visuel du plan sert de référence illustrative pour la conception intégrée de ferme, les systèmes de production, le flux post-récolte, la chaîne du froid, la préparation de livraison, la planification énergétique renouvelable et la planification évolutive du projet.",
  "The Las Terrenas / Northeast DR model is designed as a reference platform that can be adapted to different Caribbean and island markets. Each market may require a different configuration depending on land availability, tourism demand, import dependence, buyer concentration, water access, energy costs, logistics, and local operating capacity.":"Le modèle Las Terrenas / Nord-Est RD est conçu comme une plateforme de référence adaptable à différents marchés caribéens et insulaires. Chaque marché peut exiger une configuration différente selon la disponibilité foncière, la demande touristique, la dépendance aux importations, la concentration des acheteurs, l’accès à l’eau, les coûts énergétiques, la logistique et la capacité opérationnelle locale.",
  "These examples are not presented as confirmed projects. They are illustrative replication models showing how SymbioGreens / Balponics can adapt the same core production logic to different island realities.":"Ces exemples ne sont pas présentés comme des projets confirmés. Ce sont des modèles illustratifs de réplication montrant comment SymbioGreens / Balponics peut adapter la même logique de production aux différentes réalités insulaires.",
  "Illustrative Caribbean replication concept":"Concept illustratif de réplication caribéenne",
  "View Model Concept":"Voir le concept du modèle",
  "A scalable controlled-environment agriculture hub designed to serve resorts, villas, chefs, restaurants, and specialty buyers with premium local supply.":"Un hub agricole évolutif en environnement contrôlé conçu pour servir resorts, villas, chefs, restaurants et acheteurs spécialisés avec un approvisionnement local premium.",
  "Resort and villa supply":"Approvisionnement resorts et villas",
  "Chef-driven demand":"Demande portée par les chefs",
  "Import replacement":"Remplacement des importations",
  "Same-day freshness":"Fraîcheur le jour même",
  "Scalable island model":"Modèle insulaire évolutif",
  "Local business opportunity":"Opportunité commerciale locale",
  "A compact, high-value controlled-environment farm model adapted for limited land, premium local markets, and island food resilience.":"Un modèle compact et haut de gamme de ferme en environnement contrôlé adapté aux terrains limités, aux marchés locaux premium et à la résilience alimentaire insulaire.",
  "Compact footprint":"Empreinte compacte",
  "High-value production":"Production à forte valeur",
  "Limited land adaptation":"Adaptation aux terrains limités",
  "Resilience and efficiency":"Résilience et efficacité",
  "Year-round premium supply":"Approvisionnement premium toute l’année",
  "A modular production hub for tourism clusters, restaurants, boutique hotels, local retailers, cruise markets, and island communities.":"Un hub de production modulaire pour pôles touristiques, restaurants, hôtels boutique, détaillants locaux, marchés de croisière et communautés insulaires.",
  "Modular greenhouse planning":"Planification modulaire des serres",
  "Local market adaptation":"Adaptation au marché local",
  "Tourism cluster supply":"Approvisionnement des pôles touristiques",
  "Training and technical support":"Formation et support technique",
  "Scalable investment model":"Modèle d’investissement évolutif",
  "Local food resilience":"Résilience alimentaire locale",
  "Martinique Premium Fresh Supply Model":"Modèle d’approvisionnement frais premium de Martinique",
  "An integrated fresh supply model designed for culinary culture, wellness products, specialty herbs, local freshness, and sustainable production.":"Un modèle intégré d’approvisionnement frais conçu pour la culture culinaire, les produits bien-être, les herbes spécialisées, la fraîcheur locale et la production durable.",
  "Culinary and wellness demand":"Demande culinaire et bien-être",
  "Herbs and specialty crops":"Herbes et cultures spécialisées",
  "Efficient water use":"Utilisation efficace de l’eau",
  "Local delivery":"Livraison locale",
  "Value-added processing":"Transformation à valeur ajoutée",
  "Regional replication potential":"Potentiel de réplication régionale",
  "Guadeloupe Resilient Local Supply Model":"Modèle d’approvisionnement local résilient de Guadeloupe",
  "A resilient local supply model designed around controlled-environment production, local business opportunity, reduced imports, and regional scalability.":"Un modèle d’approvisionnement local résilient conçu autour de la production en environnement contrôlé, des opportunités commerciales locales, de la réduction des importations et de l’évolutivité régionale.",
  "Resilient by design":"Résilient par conception",
  "Controlled-environment production":"Production en environnement contrôlé",
  "Packing and cold chain":"Emballage et chaîne du froid",
  "Electric fleet and delivery":"Flotte électrique et livraison",
  "Scalable Caribbean model":"Modèle caribéen évolutif",
  "Renewable Energy":"Énergie renouvelable",
  "Renewable-First Energy Strategy":"Stratégie énergétique renouvelable en priorité",
  "Many Caribbean and island markets have one abundant strategic resource: sunlight. The SymbioGreens / Balponics model is designed around a renewable-first energy philosophy, with solar power as the primary energy strategy wherever feasible. Greenhouse production, pumps, irrigation, cold rooms, lighting, monitoring, and processing systems should be planned with energy efficiency, solar integration, battery storage, and operational resilience in mind.":"De nombreux marchés caribéens et insulaires disposent d’une ressource stratégique abondante : le soleil. Le modèle SymbioGreens / Balponics est conçu autour d’une philosophie énergétique renouvelable en priorité, avec le solaire comme stratégie principale lorsque cela est faisable. Production en serre, pompes, irrigation, chambres froides, éclairage, suivi et systèmes de transformation doivent être planifiés avec efficacité énergétique, intégration solaire, stockage par batteries et résilience opérationnelle.",
  "The goal is not only to grow food locally, but to build farms that are less vulnerable to fuel costs, grid instability, and external energy shocks. This does not claim every site will be 100% renewable; it means each project should be engineered with renewable-first, solar-led, and resilient energy planning wherever feasible.":"L’objectif n’est pas seulement de produire localement, mais de bâtir des fermes moins vulnérables aux coûts du carburant, à l’instabilité du réseau et aux chocs énergétiques externes. Cela ne signifie pas que chaque site sera 100 % renouvelable; cela signifie que chaque projet doit être conçu avec une planification énergétique renouvelable en priorité, menée par le solaire et résiliente lorsque cela est faisable.",
  "Solar-Led Power":"Énergie menée par le solaire",
  "Solar is prioritized because island markets often have strong sun exposure and high electricity costs.":"Le solaire est priorisé car les marchés insulaires ont souvent un fort ensoleillement et des coûts électriques élevés.",
  "Battery Storage & Resilience":"Stockage batterie et résilience",
  "Energy storage can help protect irrigation, climate systems, cold rooms, and monitoring during grid instability.":"Le stockage d’énergie peut aider à protéger l’irrigation, les systèmes climatiques, les chambres froides et le suivi lors d’instabilités du réseau.",
  "Efficient Farm Design":"Conception de ferme efficace",
  "Energy efficiency must be built into pumps, water systems, cold storage, lighting, and greenhouse operations.":"L’efficacité énergétique doit être intégrée aux pompes, systèmes d’eau, stockage froid, éclairage et opérations de serre.",
  "Hybrid Backup Planning":"Planification de secours hybride",
  "Reliable food production requires continuity, so backup systems may be included where necessary.":"Une production alimentaire fiable exige la continuité; des systèmes de secours peuvent donc être inclus si nécessaire.",
  "Wind Where Appropriate":"Éolien lorsque pertinent",
  "Small wind or hybrid systems may be explored in locations where wind conditions make sense.":"De petits systèmes éoliens ou hybrides peuvent être étudiés là où les conditions de vent sont pertinentes.",
  "Lower Exposure to Energy Volatility":"Moindre exposition à la volatilité énergétique",
  "Renewable-first planning can reduce exposure to fuel price shocks and grid instability.":"La planification renouvelable en priorité peut réduire l’exposition aux chocs de prix du carburant et à l’instabilité du réseau.",
  "R&D Platform":"Plateforme R&D",
  "Research, Development & Future Food Systems":"Recherche, développement et futurs systèmes alimentaires",
  "SymbioGreens and Balponics are being developed as more than a production operation. The goal is to remain at the cutting edge of hydroponics, controlled-environment agriculture, specialty crop development, renewable energy integration, data-informed growing, and future food-production technologies.":"SymbioGreens et Balponics sont développés comme plus qu’une opération de production. L’objectif est de rester à la pointe de l’hydroponie, de l’agriculture en environnement contrôlé, du développement de cultures spécialisées, de l’intégration des énergies renouvelables, de la culture guidée par les données et des futures technologies alimentaires.",
  "The platform should continuously test new crops, improve production methods, refine water and nutrient efficiency, evaluate automation, and explore emerging biological and renewable-energy concepts that may support resilient agriculture in the future.":"La plateforme doit tester continuellement de nouvelles cultures, améliorer les méthodes de production, affiner l’efficacité de l’eau et des nutriments, évaluer l’automatisation et explorer des concepts biologiques et énergétiques émergents pouvant soutenir une agriculture résiliente à l’avenir.",
  "Crop Trials":"Essais de cultures",
  "Testing premium lettuces, herbs, microgreens, edible flowers, mushrooms, medicinal plants, and specialty crops based on real buyer demand.":"Essais de laitues premium, herbes, microgreens, fleurs comestibles, champignons, plantes médicinales et cultures spécialisées selon la demande réelle des acheteurs.",
  "Hydroponic System Optimization":"Optimisation des systèmes hydroponiques",
  "Improving tower systems, NFT, DWC, Dutch Bucket, microgreens, substrate systems, irrigation, nutrient delivery, and production workflows.":"Amélioration des systèmes de tours, NFT, DWC, Dutch Bucket, microgreens, substrats, irrigation, apport nutritif et flux de production.",
  "Water & Nutrient Efficiency":"Efficacité de l’eau et des nutriments",
  "Improving recirculation, filtration, dosing, monitoring, and responsible water use.":"Amélioration de la recirculation, filtration, dosage, suivi et usage responsable de l’eau.",
  "Automation & Monitoring":"Automatisation et suivi",
  "Exploring sensors, pH/EC monitoring, flow tracking, climate data, crop records, and digital production management.":"Exploration des capteurs, suivi pH/EC, suivi des flux, données climatiques, registres de culture et gestion numérique de la production.",
  "Renewable Energy Integration":"Intégration des énergies renouvelables",
  "Testing solar-led power, storage, energy efficiency, and hybrid resilience models.":"Tests d’énergie solaire, stockage, efficacité énergétique et modèles hybrides de résilience.",
  "Future Biological Systems":"Systèmes biologiques futurs",
  "Exploring future-facing concepts such as algae-related research, photosynthesis-based biological systems, biofertilizers, and other emerging sustainable production technologies where scientifically and commercially feasible.":"Exploration de concepts d’avenir comme la recherche liée aux algues, les systèmes biologiques fondés sur la photosynthèse, les biofertilisants et d’autres technologies durables émergentes lorsque cela est scientifiquement et commercialement faisable.",
  "Innovation statement":"Déclaration d’innovation",
  "SymbioGreens and Balponics are not designed to stand still. The platform is built to test, learn, improve, and adapt - because the future of food production will depend on smarter systems, better resource use, renewable energy, local resilience, and continuous innovation.":"SymbioGreens et Balponics ne sont pas conçus pour rester immobiles. La plateforme est bâtie pour tester, apprendre, améliorer et s’adapter, car l’avenir de la production alimentaire dépendra de systèmes plus intelligents, d’une meilleure utilisation des ressources, des énergies renouvelables, de la résilience locale et de l’innovation continue.",
  "Whether developed as a pilot farm, hospitality supply hub, training site, or regional production model, the SymbioGreens / Balponics approach is designed to connect premium production with real buyer demand, renewable-first planning, and continuous innovation.":"Qu’il soit développé comme ferme pilote, hub d’approvisionnement hôtelier, site de formation ou modèle régional, l’approche SymbioGreens / Balponics est conçue pour relier production premium, demande réelle des acheteurs, planification renouvelable en priorité et innovation continue."
});

Object.assign(RUNTIME_TRANSLATIONS.es, {
  "Las Terrenas / Northeast DR Model Farm Hub":"Centro de finca modelo Las Terrenas / Nordeste RD",
  "A premium controlled-environment agriculture campus designed for same-day local supply, imported specialty produce replacement, resort and chef demand, and Caribbean replication.":"Un campus premium de agricultura en ambiente controlado diseñado para suministro local el mismo día, sustitución de productos especiales importados, demanda de resorts y chefs, y réplica caribeña.",
  "The Las Terrenas / Sanchez / Rio San Juan operating corridor is planned as the first reference hub for the Northeast Dominican Republic. The model combines 500 phase-one hydroponic towers, microgreens, mushrooms, specialty crops, medicinal plants, value-added processing, cold chain, logistics, solar-assisted resilience, staff facilities, visitor experience, and R&D capacity.":"El corredor operativo Las Terrenas / Sánchez / Río San Juan está planificado como el primer centro de referencia para el Nordeste de la República Dominicana. El modelo combina 500 torres hidropónicas de fase uno, microgreens, hongos, cultivos especiales, plantas medicinales, procesamiento de valor agregado, cadena de frío, logística, resiliencia asistida por energía solar, instalaciones para el personal, experiencia de visitantes y capacidad de I+D.",
  "View Hub Model":"Ver modelo del hub",
  "Illustrative Las Terrenas Northeast Dominican Republic controlled-environment agriculture model farm hub":"Centro ilustrativo de finca modelo de agricultura en ambiente controlado en Las Terrenas, Nordeste de República Dominicana",
  "Illustrative model hub based on the private investor presentation: a diversified controlled-environment agriculture campus combining 500 phase-one hydroponic towers, microgreens, mushrooms, specialty crops, medicinal plants, value-added processing, cold chain, solar-assisted resilience, staff facilities, logistics, visitor experience, and R&D capacity.":"Hub modelo ilustrativo basado en la presentación privada para inversionistas: un campus diversificado de agricultura en ambiente controlado que combina 500 torres hidropónicas de fase uno, microgreens, hongos, cultivos especiales, plantas medicinales, procesamiento de valor agregado, cadena de frío, resiliencia asistida por energía solar, instalaciones para el personal, logística, experiencia de visitantes y capacidad de I+D.",
  "Reference Hub":"Hub de referencia",
  "Las Terrenas is positioned as a full model farm hub, not a small pilot greenhouse. The hub is designed to serve resorts, chefs, restaurants, distributors, wellness buyers, specialty retailers, and fresh local supply channels with premium produce grown close to market.":"Las Terrenas se posiciona como un hub completo de finca modelo, no como un pequeño invernadero piloto. El hub está diseñado para servir resorts, chefs, restaurantes, distribuidores, compradores de bienestar, comercios especializados y canales locales de suministro fresco con productos premium cultivados cerca del mercado.",
  "The operating corridor connects Las Terrenas, Sanchez, and Rio San Juan, with commercial reach toward Santo Domingo, Punta Cana, Cap Cana, Casa de Campo, and the North Coast where appropriate. Detailed financial projections remain reserved for qualified investor review.":"El corredor operativo conecta Las Terrenas, Sánchez y Río San Juan, con alcance comercial hacia Santo Domingo, Punta Cana, Cap Cana, Casa de Campo y la Costa Norte cuando sea apropiado. Las proyecciones financieras detalladas quedan reservadas para revisión de inversionistas calificados.",
  "Land area":"Área de terreno",
  "Approx. 15 hectares for phase one planning":"Aprox. 15 hectáreas para la planificación de fase uno",
  "Greenhouse area":"Área de invernadero",
  "Approx. 10,610 m2 controlled-environment production area":"Aprox. 10,610 m2 de área de producción en ambiente controlado",
  "Plot area":"Área del terreno operativo",
  "Approx. 30,000 m2 initial hub footprint":"Aprox. 30,000 m2 de huella inicial del hub",
  "Hydroponic towers":"Torres hidropónicas",
  "500 phase-one towers, 8-inch diameter and 8-foot height":"500 torres de fase uno, 8 pulgadas de diámetro y 8 pies de altura",
  "Plant sites":"Sitios de plantas",
  "Approx. 80 plant sites per tower and 40,000 plants per cycle":"Aprox. 80 sitios de plantas por torre y 40,000 plantas por ciclo",
  "Microgreens":"Microgreens",
  "8,000-9,000 trays per cycle in five-level racks":"8,000-9,000 bandejas por ciclo en racks de cinco niveles",
  "Mushrooms":"Hongos",
  "Approx. 2,000 kg per month target capacity":"Aprox. 2,000 kg por mes como capacidad objetivo",
  "Commercial corridor":"Corredor comercial",
  "Las Terrenas / Sanchez / Rio San Juan with broader Dominican reach":"Las Terrenas / Sánchez / Río San Juan con alcance dominicano más amplio",
  "Hub Layout":"Diseño del hub",
  "Model Farm Hub Campus":"Campus hub de finca modelo",
  "The visual is an illustrative planning reference for a diversified controlled-environment agriculture campus with production greenhouses, microgreens, mushrooms, specialty substrate crops, medicinal and wellness plants, processing, cold chain, logistics, utilities, staff facilities, visitor experience, and R&D / training capacity.":"El visual es una referencia ilustrativa de planificación para un campus diversificado de agricultura en ambiente controlado con invernaderos productivos, microgreens, hongos, cultivos especiales en sustrato, plantas medicinales y de bienestar, procesamiento, cadena de frío, logística, servicios, instalaciones para el personal, experiencia de visitantes y capacidad de I+D / capacitación.",
  "Panoramic illustrated model farm hub for Las Terrenas Northeast Dominican Republic":"Hub panorámico ilustrado de finca modelo para Las Terrenas, Nordeste de República Dominicana",
  "Illustrative model based on initial project design. Final layout remains subject to site conditions, engineering, budget, permitting, buyer demand, and phased implementation.":"Modelo ilustrativo basado en el diseño inicial del proyecto. El diseño final queda sujeto a condiciones del sitio, ingeniería, presupuesto, permisos, demanda de compradores e implementación por fases.",
  "Four Complementary Growing Systems":"Cuatro sistemas de cultivo complementarios",
  "The hub model is diversified by design, supporting fresh produce, chef-focused crops, wellness-oriented crops, mushrooms, and value-added product pathways.":"El modelo de hub es diversificado por diseño, apoyando productos frescos, cultivos enfocados en chefs, cultivos orientados al bienestar, hongos y rutas de productos de valor agregado.",
  "Hydroponic Tower Greenhouses":"Invernaderos de torres hidropónicas",
  "Phase one is centered on 500 high-density hydroponic towers for herbs, leafy greens, and specialty crops, with approximately 40,000 plant sites per cycle.":"La fase uno se centra en 500 torres hidropónicas de alta densidad para hierbas, hojas verdes y cultivos especiales, con aproximadamente 40,000 sitios de plantas por ciclo.",
  "Microgreens Facility":"Instalación de microgreens",
  "A controlled-room microgreens facility with five-level racks and approximately 8,000-9,000 trays per cycle for chef-oriented, high-turnover crops.":"Una instalación de microgreens en sala controlada con racks de cinco niveles y aproximadamente 8,000-9,000 bandejas por ciclo para cultivos de alta rotación orientados a chefs.",
  "Mushroom Grow Rooms":"Salas de cultivo de hongos",
  "Dedicated indoor rooms for gourmet mushrooms such as lion's mane, king oyster, shiitake, enoki, and other specialty varieties where commercially appropriate.":"Salas interiores dedicadas a hongos gourmet como lion's mane, king oyster, shiitake, enoki y otras variedades especiales cuando sea comercialmente apropiado.",
  "Specialty Substrate Greenhouse":"Invernadero de sustrato especializado",
  "Substrate production for larger-root crops, Asian herbs, wellness crops, resort kitchen ingredients, and specialty varieties such as kaffir lime, pandan, lemongrass, curry leaves, ginger, and turmeric where appropriate.":"Producción en sustrato para cultivos de raíces más grandes, hierbas asiáticas, cultivos de bienestar, ingredientes para cocinas de resorts y variedades especiales como lima kaffir, pandan, lemongrass, hojas de curry, jengibre y cúrcuma cuando sea apropiado.",
  "Built as a Complete Operating Hub":"Construido como un hub operativo completo",
  "The Las Terrenas hub concept includes the infrastructure required to grow, process, protect, pack, store, manage, and deliver premium products with commercial discipline.":"El concepto del hub Las Terrenas incluye la infraestructura requerida para cultivar, procesar, proteger, empacar, almacenar, gestionar y entregar productos premium con disciplina comercial.",
  "Medicinal & Wellness Plant Area":"Área de plantas medicinales y de bienestar",
  "Dedicated production planning for tulsi, gotu kola, lemon balm, moringa, stevia, ashwagandha, ginger, turmeric, and other approved wellness-oriented crops.":"Planificación de producción dedicada para tulsi, gotu kola, melisa, moringa, stevia, ashwagandha, jengibre, cúrcuma y otros cultivos aprobados orientados al bienestar.",
  "Drying & Value-Added Processing":"Secado y procesamiento de valor agregado",
  "Light processing capacity for herbs, teas, spices, seasoning blends, mushroom powders, drying, packaging, and value-added products.":"Capacidad de procesamiento ligero para hierbas, tés, especias, mezclas de sazones, polvos de hongos, secado, empaque y productos de valor agregado.",
  "Cold Storage & Packing Line":"Almacenamiento frío y línea de empaque",
  "Refrigerated rooms, sorting, grading, washing, labeling, quality control, and buyer-ready packing flow.":"Cuartos refrigerados, clasificación, graduación, lavado, etiquetado, control de calidad y flujo de empaque listo para compradores.",
  "Logistics & Fleet":"Logística y flota",
  "Refrigerated delivery truck, pickup or management vehicles, loading access, and delivery flow for resorts, chefs, restaurants, and distributors.":"Camión refrigerado de entrega, vehículos pickup o de gestión, acceso de carga y flujo de entrega para resorts, chefs, restaurantes y distribuidores.",
  "Solar & Electrical Resilience":"Resiliencia solar y eléctrica",
  "Solar-assisted power, battery storage, efficient electrical design, and backup planning to reduce exposure to energy instability.":"Energía asistida por solar, almacenamiento en baterías, diseño eléctrico eficiente y planificación de respaldo para reducir exposición a inestabilidad energética.",
  "Water & Nutrient Management":"Gestión de agua y nutrientes",
  "Reservoirs, filtration, nutrient mixing, irrigation control, recirculation, pH/EC monitoring, and water-quality discipline.":"Reservorios, filtración, mezcla de nutrientes, control de riego, recirculación, monitoreo pH/EC y disciplina de calidad de agua.",
  "Manager House, Office & Staff Facilities":"Casa del gerente, oficina e instalaciones para el personal",
  "Operations office, manager residence, staff housing or rest areas, bathrooms, laundry, secure storage, administration, and monitoring space.":"Oficina de operaciones, residencia del gerente, alojamiento o áreas de descanso del personal, baños, lavandería, almacenamiento seguro, administración y espacio de monitoreo.",
  "Visitor Experience, Training & Demonstration Value":"Experiencia de visitantes, capacitación y valor demostrativo",
  "The model farm can also support farm visits, chef sampling, guided tours, harvest list presentation, culinary experiences, training, and tasteful farm-to-table or herbal tea workshop concepts for tourism-driven markets.":"La finca modelo también puede apoyar visitas a la finca, degustaciones para chefs, recorridos guiados, presentación de listas de cosecha, experiencias culinarias, capacitación y conceptos de talleres de finca a mesa o té herbal para mercados turísticos.",
  "Visitor Experience & Chef Area":"Experiencia de visitantes y área de chefs",
  "Guided farm tours, chef sampling, tasting area, farm-to-table education, harvest lists, and tasteful culinary or herbal tea workshop concepts.":"Recorridos guiados, degustaciones para chefs, área de cata, educación de finca a mesa, listas de cosecha y conceptos culinarios o de té herbal presentados con buen gusto.",
  "Training & Demonstration Zone":"Zona de capacitación y demostración",
  "Hands-on training for operators, greenhouse teams, partners, culinary buyers, and community programs.":"Capacitación práctica para operadores, equipos de invernadero, socios, compradores culinarios y programas comunitarios.",
  "Buyer & Distributor Visits":"Visitas de compradores y distribuidores",
  "Practical walkthroughs for resorts, chefs, restaurants, distributors, wellness buyers, and specialty food channels.":"Recorridos prácticos para resorts, chefs, restaurantes, distribuidores, compradores de bienestar y canales de alimentos especiales.",
  "R&D / Innovation Area":"Área de I+D / innovación",
  "Crop trials, hydroponic system testing, monitoring, automation, future food systems, and continuous production improvement.":"Pruebas de cultivos, ensayos de sistemas hidropónicos, monitoreo, automatización, sistemas alimentarios futuros y mejora continua de producción.",
  "energy profile":"perfil energético",
  "Dominican Republic First, Caribbean Next":"República Dominicana primero, Caribe después",
  "The Las Terrenas / Northeast DR model is designed as a reference platform that can be adapted to different Caribbean and island markets after the Dominican Republic launch path is validated. Each market may require a different configuration depending on land availability, tourism demand, import dependence, buyer concentration, water access, energy costs, logistics, and local operating capacity.":"El modelo Las Terrenas / Nordeste RD está diseñado como plataforma de referencia adaptable a distintos mercados caribeños e insulares después de validar la ruta de lanzamiento en República Dominicana. Cada mercado puede requerir una configuración diferente según disponibilidad de tierra, demanda turística, dependencia de importaciones, concentración de compradores, acceso al agua, costos energéticos, logística y capacidad operativa local.",
  "Many Caribbean and island markets have one abundant strategic resource: sunlight. The Las Terrenas hub is planned with solar-assisted operations, battery storage, electrical resilience, efficient farm design, and backup planning as core operating considerations.":"Muchos mercados caribeños e insulares tienen un recurso estratégico abundante: el sol. El hub Las Terrenas está planificado con operaciones asistidas por energía solar, almacenamiento en baterías, resiliencia eléctrica, diseño eficiente de finca y planificación de respaldo como consideraciones operativas centrales.",
  "SymbioGreens and Balponics are being developed as more than a production operation. The hub model should support crop trials, hydroponic system testing, renewable energy integration, data-informed growing, automation review, and future food-production research.":"SymbioGreens y Balponics se están desarrollando como algo más que una operación productiva. El modelo de hub debe apoyar pruebas de cultivos, ensayos de sistemas hidropónicos, integración de energía renovable, cultivo informado por datos, revisión de automatización e investigación futura de producción alimentaria.",
  "The model can be adapted to markets where freshness, reliability, presentation, and proximity create value. Each project should be shaped by buyer demand, land conditions, climate realities, energy profile, logistics, and operational capacity.":"El modelo puede adaptarse a mercados donde frescura, confiabilidad, presentación y proximidad crean valor. Cada proyecto debe moldearse por demanda de compradores, condiciones del terreno, realidades climáticas, perfil energético, logística y capacidad operativa.",
  "Whether developed as a model farm hub, hospitality supply campus, training site, or regional production platform, the SymbioGreens / Balponics approach is designed to connect premium production with real buyer demand, renewable-first planning, commercial discipline, and continuous innovation.":"Ya sea desarrollado como hub de finca modelo, campus de suministro hotelero, sitio de capacitación o plataforma regional de producción, el enfoque SymbioGreens / Balponics está diseñado para conectar producción premium con demanda real de compradores, planificación renovable primero, disciplina comercial e innovación continua."
});

Object.assign(RUNTIME_TRANSLATIONS.fr, {
  "Las Terrenas / Northeast DR Model Farm Hub":"Hub de ferme modèle Las Terrenas / Nord-Est RD",
  "A premium controlled-environment agriculture campus designed for same-day local supply, imported specialty produce replacement, resort and chef demand, and Caribbean replication.":"Un campus premium d’agriculture en environnement contrôlé conçu pour l’approvisionnement local le jour même, le remplacement de produits spécialisés importés, la demande des resorts et chefs, et la réplication caribéenne.",
  "The Las Terrenas / Sanchez / Rio San Juan operating corridor is planned as the first reference hub for the Northeast Dominican Republic. The model combines 500 phase-one hydroponic towers, microgreens, mushrooms, specialty crops, medicinal plants, value-added processing, cold chain, logistics, solar-assisted resilience, staff facilities, visitor experience, and R&D capacity.":"Le corridor opérationnel Las Terrenas / Sánchez / Río San Juan est prévu comme premier hub de référence pour le Nord-Est de la République dominicaine. Le modèle combine 500 tours hydroponiques de phase un, microgreens, champignons, cultures spécialisées, plantes médicinales, transformation à valeur ajoutée, chaîne du froid, logistique, résilience assistée par solaire, installations du personnel, expérience visiteurs et capacité R&D.",
  "View Hub Model":"Voir le modèle du hub",
  "Illustrative Las Terrenas Northeast Dominican Republic controlled-environment agriculture model farm hub":"Hub illustratif de ferme modèle d’agriculture en environnement contrôlé à Las Terrenas, Nord-Est de la République dominicaine",
  "Illustrative model hub based on the private investor presentation: a diversified controlled-environment agriculture campus combining 500 phase-one hydroponic towers, microgreens, mushrooms, specialty crops, medicinal plants, value-added processing, cold chain, solar-assisted resilience, staff facilities, logistics, visitor experience, and R&D capacity.":"Hub modèle illustratif basé sur la présentation privée aux investisseurs : un campus diversifié d’agriculture en environnement contrôlé combinant 500 tours hydroponiques de phase un, microgreens, champignons, cultures spécialisées, plantes médicinales, transformation à valeur ajoutée, chaîne du froid, résilience assistée par solaire, installations du personnel, logistique, expérience visiteurs et capacité R&D.",
  "Reference Hub":"Hub de référence",
  "Las Terrenas is positioned as a full model farm hub, not a small pilot greenhouse. The hub is designed to serve resorts, chefs, restaurants, distributors, wellness buyers, specialty retailers, and fresh local supply channels with premium produce grown close to market.":"Las Terrenas est positionné comme un hub complet de ferme modèle, et non comme une petite serre pilote. Le hub est conçu pour servir resorts, chefs, restaurants, distributeurs, acheteurs bien-être, détaillants spécialisés et circuits locaux avec des produits premium cultivés près du marché.",
  "The operating corridor connects Las Terrenas, Sanchez, and Rio San Juan, with commercial reach toward Santo Domingo, Punta Cana, Cap Cana, Casa de Campo, and the North Coast where appropriate. Detailed financial projections remain reserved for qualified investor review.":"Le corridor opérationnel relie Las Terrenas, Sánchez et Río San Juan, avec une portée commerciale vers Santo Domingo, Punta Cana, Cap Cana, Casa de Campo et la Côte Nord lorsque pertinent. Les projections financières détaillées restent réservées à l’examen d’investisseurs qualifiés.",
  "Land area":"Surface foncière",
  "Approx. 15 hectares for phase one planning":"Environ 15 hectares pour la planification de phase un",
  "Greenhouse area":"Surface de serre",
  "Approx. 10,610 m2 controlled-environment production area":"Environ 10 610 m2 de zone de production en environnement contrôlé",
  "Plot area":"Surface opérationnelle",
  "Approx. 30,000 m2 initial hub footprint":"Environ 30 000 m2 d’empreinte initiale du hub",
  "Hydroponic towers":"Tours hydroponiques",
  "500 phase-one towers, 8-inch diameter and 8-foot height":"500 tours de phase un, 8 pouces de diamètre et 8 pieds de hauteur",
  "Plant sites":"Sites de plantation",
  "Approx. 80 plant sites per tower and 40,000 plants per cycle":"Environ 80 sites de plantation par tour et 40 000 plantes par cycle",
  "Microgreens":"Microgreens",
  "8,000-9,000 trays per cycle in five-level racks":"8 000-9 000 plateaux par cycle sur racks à cinq niveaux",
  "Mushrooms":"Champignons",
  "Approx. 2,000 kg per month target capacity":"Environ 2 000 kg par mois de capacité cible",
  "Commercial corridor":"Corridor commercial",
  "Las Terrenas / Sanchez / Rio San Juan with broader Dominican reach":"Las Terrenas / Sánchez / Río San Juan avec portée dominicaine élargie",
  "Hub Layout":"Plan du hub",
  "Model Farm Hub Campus":"Campus hub de ferme modèle",
  "The visual is an illustrative planning reference for a diversified controlled-environment agriculture campus with production greenhouses, microgreens, mushrooms, specialty substrate crops, medicinal and wellness plants, processing, cold chain, logistics, utilities, staff facilities, visitor experience, and R&D / training capacity.":"Le visuel est une référence illustrative pour un campus diversifié d’agriculture en environnement contrôlé avec serres de production, microgreens, champignons, cultures spécialisées en substrat, plantes médicinales et bien-être, transformation, chaîne du froid, logistique, utilités, installations du personnel, expérience visiteurs et capacité R&D / formation.",
  "Panoramic illustrated model farm hub for Las Terrenas Northeast Dominican Republic":"Hub panoramique illustré de ferme modèle pour Las Terrenas, Nord-Est de la République dominicaine",
  "Illustrative model based on initial project design. Final layout remains subject to site conditions, engineering, budget, permitting, buyer demand, and phased implementation.":"Modèle illustratif basé sur la conception initiale du projet. Le plan final reste soumis aux conditions du site, à l’ingénierie, au budget, aux permis, à la demande des acheteurs et à la mise en œuvre par phases.",
  "Four Complementary Growing Systems":"Quatre systèmes de culture complémentaires",
  "The hub model is diversified by design, supporting fresh produce, chef-focused crops, wellness-oriented crops, mushrooms, and value-added product pathways.":"Le modèle de hub est diversifié par conception, soutenant produits frais, cultures pour chefs, cultures bien-être, champignons et parcours de produits à valeur ajoutée.",
  "Hydroponic Tower Greenhouses":"Serres à tours hydroponiques",
  "Phase one is centered on 500 high-density hydroponic towers for herbs, leafy greens, and specialty crops, with approximately 40,000 plant sites per cycle.":"La phase un est centrée sur 500 tours hydroponiques haute densité pour herbes, feuilles vertes et cultures spécialisées, avec environ 40 000 sites de plantation par cycle.",
  "Microgreens Facility":"Installation de microgreens",
  "A controlled-room microgreens facility with five-level racks and approximately 8,000-9,000 trays per cycle for chef-oriented, high-turnover crops.":"Une installation de microgreens en salle contrôlée avec racks à cinq niveaux et environ 8 000-9 000 plateaux par cycle pour cultures à rotation rapide orientées chefs.",
  "Mushroom Grow Rooms":"Salles de culture de champignons",
  "Dedicated indoor rooms for gourmet mushrooms such as lion's mane, king oyster, shiitake, enoki, and other specialty varieties where commercially appropriate.":"Salles intérieures dédiées aux champignons gourmet comme lion's mane, king oyster, shiitake, enoki et autres variétés spécialisées lorsque commercialement approprié.",
  "Specialty Substrate Greenhouse":"Serre de substrat spécialisé",
  "Substrate production for larger-root crops, Asian herbs, wellness crops, resort kitchen ingredients, and specialty varieties such as kaffir lime, pandan, lemongrass, curry leaves, ginger, and turmeric where appropriate.":"Production en substrat pour cultures à racines plus grandes, herbes asiatiques, cultures bien-être, ingrédients de cuisine de resort et variétés spécialisées comme kaffir lime, pandan, lemongrass, feuilles de curry, gingembre et curcuma lorsque pertinent.",
  "Built as a Complete Operating Hub":"Construit comme un hub opérationnel complet",
  "The Las Terrenas hub concept includes the infrastructure required to grow, process, protect, pack, store, manage, and deliver premium products with commercial discipline.":"Le concept du hub Las Terrenas inclut l’infrastructure nécessaire pour cultiver, transformer, protéger, emballer, stocker, gérer et livrer des produits premium avec discipline commerciale.",
  "Medicinal & Wellness Plant Area":"Zone de plantes médicinales et bien-être",
  "Dedicated production planning for tulsi, gotu kola, lemon balm, moringa, stevia, ashwagandha, ginger, turmeric, and other approved wellness-oriented crops.":"Planification de production dédiée pour tulsi, gotu kola, mélisse, moringa, stevia, ashwagandha, gingembre, curcuma et autres cultures bien-être approuvées.",
  "Drying & Value-Added Processing":"Séchage et transformation à valeur ajoutée",
  "Light processing capacity for herbs, teas, spices, seasoning blends, mushroom powders, drying, packaging, and value-added products.":"Capacité de transformation légère pour herbes, thés, épices, mélanges d’assaisonnement, poudres de champignons, séchage, emballage et produits à valeur ajoutée.",
  "Cold Storage & Packing Line":"Stockage froid et ligne d’emballage",
  "Refrigerated rooms, sorting, grading, washing, labeling, quality control, and buyer-ready packing flow.":"Chambres réfrigérées, tri, calibrage, lavage, étiquetage, contrôle qualité et flux d’emballage prêt pour acheteurs.",
  "Logistics & Fleet":"Logistique et flotte",
  "Refrigerated delivery truck, pickup or management vehicles, loading access, and delivery flow for resorts, chefs, restaurants, and distributors.":"Camion de livraison réfrigéré, véhicules pickup ou de gestion, accès de chargement et flux de livraison pour resorts, chefs, restaurants et distributeurs.",
  "Solar & Electrical Resilience":"Résilience solaire et électrique",
  "Solar-assisted power, battery storage, efficient electrical design, and backup planning to reduce exposure to energy instability.":"Énergie assistée par solaire, stockage batterie, conception électrique efficace et planification de secours pour réduire l’exposition à l’instabilité énergétique.",
  "Water & Nutrient Management":"Gestion de l’eau et des nutriments",
  "Reservoirs, filtration, nutrient mixing, irrigation control, recirculation, pH/EC monitoring, and water-quality discipline.":"Réservoirs, filtration, mélange nutritif, contrôle de l’irrigation, recirculation, suivi pH/EC et discipline de qualité de l’eau.",
  "Manager House, Office & Staff Facilities":"Maison du manager, bureau et installations du personnel",
  "Operations office, manager residence, staff housing or rest areas, bathrooms, laundry, secure storage, administration, and monitoring space.":"Bureau d’opérations, résidence du manager, logement ou zones de repos du personnel, sanitaires, buanderie, stockage sécurisé, administration et espace de suivi.",
  "Visitor Experience, Training & Demonstration Value":"Expérience visiteurs, formation et valeur démonstrative",
  "The model farm can also support farm visits, chef sampling, guided tours, harvest list presentation, culinary experiences, training, and tasteful farm-to-table or herbal tea workshop concepts for tourism-driven markets.":"La ferme modèle peut aussi soutenir visites de ferme, dégustations pour chefs, visites guidées, présentation de listes de récolte, expériences culinaires, formation et concepts de ferme-à-table ou ateliers de tisanes pour marchés touristiques.",
  "Visitor Experience & Chef Area":"Expérience visiteurs et zone chefs",
  "Guided farm tours, chef sampling, tasting area, farm-to-table education, harvest lists, and tasteful culinary or herbal tea workshop concepts.":"Visites guidées, dégustations chefs, zone de dégustation, éducation ferme-à-table, listes de récolte et concepts culinaires ou ateliers de tisanes présentés avec goût.",
  "Training & Demonstration Zone":"Zone de formation et démonstration",
  "Hands-on training for operators, greenhouse teams, partners, culinary buyers, and community programs.":"Formation pratique pour opérateurs, équipes de serre, partenaires, acheteurs culinaires et programmes communautaires.",
  "Buyer & Distributor Visits":"Visites acheteurs et distributeurs",
  "Practical walkthroughs for resorts, chefs, restaurants, distributors, wellness buyers, and specialty food channels.":"Parcours pratiques pour resorts, chefs, restaurants, distributeurs, acheteurs bien-être et circuits alimentaires spécialisés.",
  "R&D / Innovation Area":"Zone R&D / innovation",
  "Crop trials, hydroponic system testing, monitoring, automation, future food systems, and continuous production improvement.":"Essais de cultures, tests de systèmes hydroponiques, suivi, automatisation, futurs systèmes alimentaires et amélioration continue de la production.",
  "energy profile":"profil énergétique",
  "Dominican Republic First, Caribbean Next":"République dominicaine d’abord, Caraïbes ensuite",
  "The Las Terrenas / Northeast DR model is designed as a reference platform that can be adapted to different Caribbean and island markets after the Dominican Republic launch path is validated. Each market may require a different configuration depending on land availability, tourism demand, import dependence, buyer concentration, water access, energy costs, logistics, and local operating capacity.":"Le modèle Las Terrenas / Nord-Est RD est conçu comme une plateforme de référence adaptable à différents marchés caribéens et insulaires après validation du lancement en République dominicaine. Chaque marché peut exiger une configuration différente selon disponibilité foncière, demande touristique, dépendance aux importations, concentration des acheteurs, accès à l’eau, coûts énergétiques, logistique et capacité opérationnelle locale.",
  "Many Caribbean and island markets have one abundant strategic resource: sunlight. The Las Terrenas hub is planned with solar-assisted operations, battery storage, electrical resilience, efficient farm design, and backup planning as core operating considerations.":"De nombreux marchés caribéens et insulaires disposent d’une ressource stratégique abondante : le soleil. Le hub Las Terrenas est planifié avec opérations assistées par solaire, stockage batterie, résilience électrique, conception de ferme efficace et planification de secours comme considérations opérationnelles centrales.",
  "SymbioGreens and Balponics are being developed as more than a production operation. The hub model should support crop trials, hydroponic system testing, renewable energy integration, data-informed growing, automation review, and future food-production research.":"SymbioGreens et Balponics sont développés comme plus qu’une opération de production. Le modèle de hub doit soutenir essais de cultures, tests de systèmes hydroponiques, intégration des énergies renouvelables, culture guidée par les données, examen de l’automatisation et recherche future en production alimentaire.",
  "The model can be adapted to markets where freshness, reliability, presentation, and proximity create value. Each project should be shaped by buyer demand, land conditions, climate realities, energy profile, logistics, and operational capacity.":"Le modèle peut s’adapter aux marchés où fraîcheur, fiabilité, présentation et proximité créent de la valeur. Chaque projet doit être façonné par demande acheteur, conditions foncières, réalités climatiques, profil énergétique, logistique et capacité opérationnelle.",
  "Whether developed as a model farm hub, hospitality supply campus, training site, or regional production platform, the SymbioGreens / Balponics approach is designed to connect premium production with real buyer demand, renewable-first planning, commercial discipline, and continuous innovation.":"Qu’il soit développé comme hub de ferme modèle, campus d’approvisionnement hôtelier, site de formation ou plateforme régionale de production, l’approche SymbioGreens / Balponics est conçue pour relier production premium, demande réelle des acheteurs, planification renouvelable en priorité, discipline commerciale et innovation continue."
});

Object.assign(RUNTIME_TRANSLATIONS.es, {
  "The Las Terrenas / Sánchez / Río San Juan operating corridor is planned as the first reference hub for the Northeast Dominican Republic. The model combines 500 phase-one hydroponic towers, microgreens, mushrooms, specialty crops, medicinal plants, value-added processing, cold chain, logistics, solar-assisted resilience, staff facilities, visitor experience, and R&D capacity.":"El corredor operativo Las Terrenas / Sánchez / Río San Juan está planificado como el primer centro de referencia para el Nordeste de la República Dominicana. El modelo combina 500 torres hidropónicas de fase uno, microgreens, hongos, cultivos especiales, plantas medicinales, procesamiento de valor agregado, cadena de frío, logística, resiliencia asistida por energía solar, instalaciones para el personal, experiencia de visitantes y capacidad de I+D.",
  "The operating corridor connects Las Terrenas, Sánchez, and Río San Juan, with commercial reach toward Santo Domingo, Punta Cana, Cap Cana, Casa de Campo, and the North Coast where appropriate. Detailed financial projections remain reserved for qualified investor review.":"El corredor operativo conecta Las Terrenas, Sánchez y Río San Juan, con alcance comercial hacia Santo Domingo, Punta Cana, Cap Cana, Casa de Campo y la Costa Norte cuando sea apropiado. Las proyecciones financieras detalladas quedan reservadas para revisión de inversionistas calificados.",
  "Las Terrenas / Sánchez / Río San Juan with broader Dominican reach":"Las Terrenas / Sánchez / Río San Juan con alcance dominicano más amplio"
});

Object.assign(RUNTIME_TRANSLATIONS.fr, {
  "The Las Terrenas / Sánchez / Río San Juan operating corridor is planned as the first reference hub for the Northeast Dominican Republic. The model combines 500 phase-one hydroponic towers, microgreens, mushrooms, specialty crops, medicinal plants, value-added processing, cold chain, logistics, solar-assisted resilience, staff facilities, visitor experience, and R&D capacity.":"Le corridor opérationnel Las Terrenas / Sánchez / Río San Juan est prévu comme premier hub de référence pour le Nord-Est de la République dominicaine. Le modèle combine 500 tours hydroponiques de phase un, microgreens, champignons, cultures spécialisées, plantes médicinales, transformation à valeur ajoutée, chaîne du froid, logistique, résilience assistée par solaire, installations du personnel, expérience visiteurs et capacité R&D.",
  "The operating corridor connects Las Terrenas, Sánchez, and Río San Juan, with commercial reach toward Santo Domingo, Punta Cana, Cap Cana, Casa de Campo, and the North Coast where appropriate. Detailed financial projections remain reserved for qualified investor review.":"Le corridor opérationnel relie Las Terrenas, Sánchez et Río San Juan, avec une portée commerciale vers Santo Domingo, Punta Cana, Cap Cana, Casa de Campo et la Côte Nord lorsque pertinent. Les projections financières détaillées restent réservées à l’examen d’investisseurs qualifiés.",
  "Las Terrenas / Sánchez / Río San Juan with broader Dominican reach":"Las Terrenas / Sánchez / Río San Juan avec portée dominicaine élargie"
});

Object.assign(RUNTIME_TRANSLATIONS.es, {
  "Chief Technology Officer":"Director de Tecnología",
  "Multidisciplinary technologist, inventor, and systems builder with 30+ years of experience in business management, applied innovation, biofuels, hydroponics, and sustainable production systems.":"Tecnólogo multidisciplinario, inventor y constructor de sistemas con más de 30 años de experiencia en gestión empresarial, innovación aplicada, biocombustibles, hidroponía y sistemas de producción sostenible.",
  "Systems design":"Diseño de sistemas",
  "Applied innovation":"Innovación aplicada",
  "Automation & integration":"Automatización e integración",
  "Sustainable production":"Producción sostenible",
  "Fritz Dambreville is a multidisciplinary technologist, inventor, builder, and solutions-driven executive with more than 30 years of experience across business management, technology innovation, applied research, and practical engineering. As Chief Technology Officer, Fritz brings to the project a rare combination of technical intelligence, hands-on problem solving, and the ability to transform complex ideas into workable systems.":"Fritz Dambreville es un tecnólogo multidisciplinario, inventor, constructor y ejecutivo orientado a soluciones con más de 30 años de experiencia en gestión empresarial, innovación tecnológica, investigación aplicada e ingeniería práctica. Como Director de Tecnología, Fritz aporta al proyecto una combinación poco común de inteligencia técnica, resolución práctica de problemas y capacidad para transformar ideas complejas en sistemas funcionales.",
  "With a background in Industrial Engineering, Fritz has built his career around innovation, experimentation, and execution. He is the type of technical leader who does not simply analyze problems from a distance; he studies them, breaks them down, builds solutions, tests them, improves them, and finds practical ways to make them work in real conditions. His strength lies in connecting engineering logic with business reality.":"Con formación en Ingeniería Industrial, Fritz ha construido su carrera alrededor de la innovación, la experimentación y la ejecución. Es el tipo de líder técnico que no analiza los problemas desde lejos; los estudia, los descompone, construye soluciones, las prueba, las mejora y encuentra formas prácticas de hacerlas funcionar en condiciones reales. Su fortaleza está en conectar la lógica de ingeniería con la realidad empresarial.",
  "Over the course of his career, Fritz has worked across Haiti and the United States, including Miami, developing experience in business operations, technology systems, product development, research, and applied innovation. His work has touched multiple disciplines, including biofuels, alternative energy, hydrofuels, hydroponics, mechanical systems, and sustainable production concepts. This broad technical range gives him the ability to evaluate a project not only from one angle, but as a complete operating system.":"A lo largo de su carrera, Fritz ha trabajado en Haití y Estados Unidos, incluido Miami, desarrollando experiencia en operaciones empresariales, sistemas tecnológicos, desarrollo de productos, investigación e innovación aplicada. Su trabajo ha tocado múltiples disciplinas, incluyendo biocombustibles, energía alternativa, hidrocombustibles, hidroponía, sistemas mecánicos y conceptos de producción sostenible. Esta amplitud técnica le permite evaluar un proyecto no desde un solo ángulo, sino como un sistema operativo completo.",
  "Fritz has also been a long-standing collaborator and trusted strategic partner of Bernard Balmir. Their collaboration goes back to Bernard's first major business projects, where Fritz played an important role as a technical thinker, builder, and solutions partner. That history creates a strong foundation of trust, shared vision, and practical understanding between the company's leadership and its technology direction.":"Fritz también ha sido colaborador de larga data y socio estratégico de confianza de Bernard Balmir. Su colaboración se remonta a los primeros grandes proyectos empresariales de Bernard, donde Fritz desempeñó un papel importante como pensador técnico, constructor y socio de soluciones. Esa historia crea una base sólida de confianza, visión compartida y comprensión práctica entre el liderazgo de la compañía y su dirección tecnológica.",
  "Within the project, Fritz's role is central to systems design, technical evaluation, innovation, automation, research, equipment integration, and operational problem solving. His contribution supports the company's ability to develop controlled-environment farms that are efficient, scalable, resilient, and technically sound.":"Dentro del proyecto, el rol de Fritz es central para el diseño de sistemas, evaluación técnica, innovación, automatización, investigación, integración de equipos y resolución de problemas operativos. Su contribución apoya la capacidad de la compañía para desarrollar fincas de ambiente controlado eficientes, escalables, resilientes y técnicamente sólidas.",
  "As CTO, Fritz Dambreville represents the project's technical backbone: an inventor, builder, and multidisciplinary problem solver with the experience, creativity, and discipline required to support a new generation of sustainable agribusiness systems in Haiti, the Dominican Republic, and the wider Caribbean.":"Como CTO, Fritz Dambreville representa la columna vertebral técnica del proyecto: un inventor, constructor y solucionador multidisciplinario con la experiencia, creatividad y disciplina necesarias para apoyar una nueva generación de sistemas agroempresariales sostenibles en Haití, República Dominicana y el Caribe en general."
});

Object.assign(RUNTIME_TRANSLATIONS.fr, {
  "Chief Technology Officer":"Directeur de la technologie",
  "Multidisciplinary technologist, inventor, and systems builder with 30+ years of experience in business management, applied innovation, biofuels, hydroponics, and sustainable production systems.":"Technologue multidisciplinaire, inventeur et bâtisseur de systèmes avec plus de 30 ans d’expérience en gestion d’entreprise, innovation appliquée, biocarburants, hydroponie et systèmes de production durable.",
  "Systems design":"Conception de systèmes",
  "Applied innovation":"Innovation appliquée",
  "Automation & integration":"Automatisation et intégration",
  "Sustainable production":"Production durable",
  "Fritz Dambreville is a multidisciplinary technologist, inventor, builder, and solutions-driven executive with more than 30 years of experience across business management, technology innovation, applied research, and practical engineering. As Chief Technology Officer, Fritz brings to the project a rare combination of technical intelligence, hands-on problem solving, and the ability to transform complex ideas into workable systems.":"Fritz Dambreville est un technologue multidisciplinaire, inventeur, bâtisseur et dirigeant orienté solutions avec plus de 30 ans d’expérience en gestion d’entreprise, innovation technologique, recherche appliquée et ingénierie pratique. Comme Directeur de la technologie, Fritz apporte au projet une rare combinaison d’intelligence technique, de résolution pratique des problèmes et de capacité à transformer des idées complexes en systèmes fonctionnels.",
  "With a background in Industrial Engineering, Fritz has built his career around innovation, experimentation, and execution. He is the type of technical leader who does not simply analyze problems from a distance; he studies them, breaks them down, builds solutions, tests them, improves them, and finds practical ways to make them work in real conditions. His strength lies in connecting engineering logic with business reality.":"Formé en ingénierie industrielle, Fritz a construit sa carrière autour de l’innovation, de l’expérimentation et de l’exécution. C’est le type de leader technique qui ne se contente pas d’analyser les problèmes à distance; il les étudie, les décompose, construit des solutions, les teste, les améliore et trouve des moyens pratiques de les faire fonctionner en conditions réelles. Sa force réside dans le lien entre logique d’ingénierie et réalité commerciale.",
  "Over the course of his career, Fritz has worked across Haiti and the United States, including Miami, developing experience in business operations, technology systems, product development, research, and applied innovation. His work has touched multiple disciplines, including biofuels, alternative energy, hydrofuels, hydroponics, mechanical systems, and sustainable production concepts. This broad technical range gives him the ability to evaluate a project not only from one angle, but as a complete operating system.":"Au cours de sa carrière, Fritz a travaillé en Haïti et aux États-Unis, notamment à Miami, développant une expérience en opérations d’entreprise, systèmes technologiques, développement de produits, recherche et innovation appliquée. Son travail touche plusieurs disciplines, dont les biocarburants, les énergies alternatives, les hydrofuels, l’hydroponie, les systèmes mécaniques et les concepts de production durable. Cette large portée technique lui permet d’évaluer un projet non pas sous un seul angle, mais comme un système opérationnel complet.",
  "Fritz has also been a long-standing collaborator and trusted strategic partner of Bernard Balmir. Their collaboration goes back to Bernard's first major business projects, where Fritz played an important role as a technical thinker, builder, and solutions partner. That history creates a strong foundation of trust, shared vision, and practical understanding between the company's leadership and its technology direction.":"Fritz est aussi un collaborateur de longue date et un partenaire stratégique de confiance de Bernard Balmir. Leur collaboration remonte aux premiers grands projets d’affaires de Bernard, où Fritz a joué un rôle important comme penseur technique, bâtisseur et partenaire de solutions. Cette histoire crée une base solide de confiance, de vision partagée et de compréhension pratique entre la direction de l’entreprise et son orientation technologique.",
  "Within the project, Fritz's role is central to systems design, technical evaluation, innovation, automation, research, equipment integration, and operational problem solving. His contribution supports the company's ability to develop controlled-environment farms that are efficient, scalable, resilient, and technically sound.":"Dans le projet, le rôle de Fritz est central pour la conception de systèmes, l’évaluation technique, l’innovation, l’automatisation, la recherche, l’intégration d’équipements et la résolution de problèmes opérationnels. Sa contribution soutient la capacité de l’entreprise à développer des fermes en environnement contrôlé efficaces, évolutives, résilientes et techniquement solides.",
  "As CTO, Fritz Dambreville represents the project's technical backbone: an inventor, builder, and multidisciplinary problem solver with the experience, creativity, and discipline required to support a new generation of sustainable agribusiness systems in Haiti, the Dominican Republic, and the wider Caribbean.":"Comme CTO, Fritz Dambreville représente la colonne vertébrale technique du projet : un inventeur, bâtisseur et résolveur de problèmes multidisciplinaire avec l’expérience, la créativité et la discipline nécessaires pour soutenir une nouvelle génération de systèmes agro-industriels durables en Haïti, en République dominicaine et dans l’ensemble des Caraïbes."
});

Object.assign(RUNTIME_TRANSLATIONS.es, {
  "Chief Information Officer & Chief Security Officer":"Director de Información y Director de Seguridad",
  "Information technology executive, enterprise systems leader, and security-focused operator with experience across IT services, digital infrastructure, managed systems, and institutional technology operations.":"Ejecutivo de tecnología de la información, líder de sistemas empresariales y operador enfocado en seguridad con experiencia en servicios IT, infraestructura digital, sistemas gestionados y operaciones tecnológicas institucionales.",
  "Information systems":"Sistemas de información",
  "Cybersecurity governance":"Gobernanza de ciberseguridad",
  "Digital infrastructure":"Infraestructura digital",
  "Institutional operations":"Operaciones institucionales",
  "Bertrand Roc is an information technology executive, digital infrastructure strategist, and business leader with extensive experience across enterprise IT services, technology distribution, managed systems, cybersecurity awareness, and institutional operations. As Chief Information Officer and Chief Security Officer, Bertrand brings to the company a strong combination of technical education, business leadership, operational discipline, and trusted professional credibility.":"Bertrand Roc es un ejecutivo de tecnología de la información, estratega de infraestructura digital y líder empresarial con amplia experiencia en servicios IT empresariales, distribución tecnológica, sistemas gestionados, conciencia de ciberseguridad y operaciones institucionales. Como Director de Información y Director de Seguridad, Bertrand aporta a la compañía una sólida combinación de formación técnica, liderazgo empresarial, disciplina operativa y credibilidad profesional.",
  "Bertrand studied Information Technology at New England Institute of Technology in the United States, building a strong foundation in computer systems, digital infrastructure, networking, enterprise technology operations, and information management. His academic background, combined with years of practical leadership in the field, has allowed him to understand technology not only as hardware and software, but as a strategic operating backbone for modern businesses.":"Bertrand estudió Tecnología de la Información en New England Institute of Technology en Estados Unidos, construyendo una base sólida en sistemas informáticos, infraestructura digital, redes, operaciones tecnológicas empresariales y gestión de información. Su formación académica, combinada con años de liderazgo práctico, le permite entender la tecnología no solo como hardware y software, sino como una columna vertebral estratégica para empresas modernas.",
  "Over the course of his career, Bertrand has been closely associated with Keijzer Computer SA, one of Haiti's recognized technology companies, active in computer equipment, accessories, IT services, enterprise support, and technology solutions. Through this work, he gained broad experience serving corporate clients, institutions, and large-volume customers, with responsibilities touching procurement, bulk sales, technical service delivery, client relationships, inventory management, and business operations.":"A lo largo de su carrera, Bertrand ha estado estrechamente asociado con Keijzer Computer SA, una de las compañías tecnológicas reconocidas de Haití, activa en equipos informáticos, accesorios, servicios IT, soporte empresarial y soluciones tecnológicas. A través de este trabajo adquirió amplia experiencia atendiendo clientes corporativos, instituciones y compradores de gran volumen, con responsabilidades en compras, ventas al por mayor, prestación de servicios técnicos, relaciones con clientes, gestión de inventario y operaciones empresariales.",
  "Bertrand is also associated with ITTEK PRO, a managed service provider based in Port-au-Prince, reflecting his continued involvement in professional IT services, managed technology support, connectivity, systems administration, and enterprise solutions. His experience positions him as a valuable technology leader for a modern agribusiness platform where digital systems, secure communications, data protection, and operational reliability are essential.":"Bertrand también está asociado con ITTEK PRO, un proveedor de servicios gestionados con sede en Puerto Príncipe, lo que refleja su participación continua en servicios IT profesionales, soporte tecnológico gestionado, conectividad, administración de sistemas y soluciones empresariales. Su experiencia lo posiciona como un líder tecnológico valioso para una plataforma agroempresarial moderna donde los sistemas digitales, las comunicaciones seguras, la protección de datos y la confiabilidad operativa son esenciales.",
  "Beyond his business and technology background, Bertrand is publicly recognized as Honorary Consul of the Netherlands in Haiti, a role that reflects credibility, discretion, institutional trust, and the ability to operate professionally with international stakeholders.":"Más allá de su trayectoria empresarial y tecnológica, Bertrand es reconocido públicamente como Cónsul Honorario de los Países Bajos en Haití, un rol que refleja credibilidad, discreción, confianza institucional y capacidad para operar profesionalmente con actores internacionales.",
  "Within the company, Bertrand's role is critical to the design and supervision of information systems, cybersecurity protocols, access control, internal communications, data management, digital infrastructure, and technology governance. As the company scales across production sites, investor relations, logistics, farm operations, and digital monitoring systems, secure and reliable information architecture will be essential.":"Dentro de la compañía, el rol de Bertrand es crítico para el diseño y supervisión de sistemas de información, protocolos de ciberseguridad, control de acceso, comunicaciones internas, gestión de datos, infraestructura digital y gobernanza tecnológica. A medida que la compañía escala en sitios de producción, relaciones con inversionistas, logística, operaciones agrícolas y monitoreo digital, una arquitectura de información segura y confiable será esencial.",
  "As CIO and Chief Security Officer, Bertrand Roc represents the company's digital and security backbone: a technology executive capable of aligning business operations, information systems, cybersecurity, connectivity, and institutional reliability into a professional platform for growth.":"Como CIO y Director de Seguridad, Bertrand Roc representa la columna vertebral digital y de seguridad de la compañía: un ejecutivo tecnológico capaz de alinear operaciones empresariales, sistemas de información, ciberseguridad, conectividad y confiabilidad institucional en una plataforma profesional de crecimiento."
});

Object.assign(RUNTIME_TRANSLATIONS.fr, {
  "Chief Information Officer & Chief Security Officer":"Directeur de l’information et directeur de la sécurité",
  "Information technology executive, enterprise systems leader, and security-focused operator with experience across IT services, digital infrastructure, managed systems, and institutional technology operations.":"Dirigeant en technologies de l’information, leader de systèmes d’entreprise et opérateur axé sur la sécurité avec une expérience en services IT, infrastructure numérique, systèmes gérés et opérations technologiques institutionnelles.",
  "Information systems":"Systèmes d’information",
  "Cybersecurity governance":"Gouvernance cybersécurité",
  "Digital infrastructure":"Infrastructure numérique",
  "Institutional operations":"Opérations institutionnelles",
  "Bertrand Roc is an information technology executive, digital infrastructure strategist, and business leader with extensive experience across enterprise IT services, technology distribution, managed systems, cybersecurity awareness, and institutional operations. As Chief Information Officer and Chief Security Officer, Bertrand brings to the company a strong combination of technical education, business leadership, operational discipline, and trusted professional credibility.":"Bertrand Roc est un dirigeant en technologies de l’information, stratège en infrastructure numérique et leader d’entreprise avec une vaste expérience des services IT d’entreprise, de la distribution technologique, des systèmes gérés, de la sensibilisation à la cybersécurité et des opérations institutionnelles. Comme Directeur de l’information et Directeur de la sécurité, Bertrand apporte à l’entreprise une solide combinaison de formation technique, de leadership commercial, de discipline opérationnelle et de crédibilité professionnelle.",
  "Bertrand studied Information Technology at New England Institute of Technology in the United States, building a strong foundation in computer systems, digital infrastructure, networking, enterprise technology operations, and information management. His academic background, combined with years of practical leadership in the field, has allowed him to understand technology not only as hardware and software, but as a strategic operating backbone for modern businesses.":"Bertrand a étudié les technologies de l’information au New England Institute of Technology aux États-Unis, construisant une base solide en systèmes informatiques, infrastructure numérique, réseaux, opérations technologiques d’entreprise et gestion de l’information. Sa formation, combinée à des années de leadership pratique, lui permet de comprendre la technologie non seulement comme matériel et logiciel, mais comme colonne vertébrale stratégique des entreprises modernes.",
  "Over the course of his career, Bertrand has been closely associated with Keijzer Computer SA, one of Haiti's recognized technology companies, active in computer equipment, accessories, IT services, enterprise support, and technology solutions. Through this work, he gained broad experience serving corporate clients, institutions, and large-volume customers, with responsibilities touching procurement, bulk sales, technical service delivery, client relationships, inventory management, and business operations.":"Au cours de sa carrière, Bertrand a été étroitement associé à Keijzer Computer SA, l’une des entreprises technologiques reconnues d’Haïti, active dans les équipements informatiques, accessoires, services IT, support d’entreprise et solutions technologiques. Grâce à ce travail, il a acquis une large expérience auprès de clients corporatifs, institutions et clients à fort volume, avec des responsabilités en approvisionnement, ventes en volume, prestation de services techniques, relations clients, gestion d’inventaire et opérations commerciales.",
  "Bertrand is also associated with ITTEK PRO, a managed service provider based in Port-au-Prince, reflecting his continued involvement in professional IT services, managed technology support, connectivity, systems administration, and enterprise solutions. His experience positions him as a valuable technology leader for a modern agribusiness platform where digital systems, secure communications, data protection, and operational reliability are essential.":"Bertrand est également associé à ITTEK PRO, un fournisseur de services gérés basé à Port-au-Prince, reflétant son implication continue dans les services IT professionnels, le support technologique géré, la connectivité, l’administration de systèmes et les solutions d’entreprise. Son expérience le positionne comme un leader technologique précieux pour une plateforme agro-industrielle moderne où les systèmes numériques, les communications sécurisées, la protection des données et la fiabilité opérationnelle sont essentiels.",
  "Beyond his business and technology background, Bertrand is publicly recognized as Honorary Consul of the Netherlands in Haiti, a role that reflects credibility, discretion, institutional trust, and the ability to operate professionally with international stakeholders.":"Au-delà de son parcours commercial et technologique, Bertrand est publiquement reconnu comme Consul honoraire des Pays-Bas en Haïti, un rôle qui reflète crédibilité, discrétion, confiance institutionnelle et capacité à travailler professionnellement avec des acteurs internationaux.",
  "Within the company, Bertrand's role is critical to the design and supervision of information systems, cybersecurity protocols, access control, internal communications, data management, digital infrastructure, and technology governance. As the company scales across production sites, investor relations, logistics, farm operations, and digital monitoring systems, secure and reliable information architecture will be essential.":"Au sein de l’entreprise, le rôle de Bertrand est essentiel pour la conception et la supervision des systèmes d’information, protocoles de cybersécurité, contrôle d’accès, communications internes, gestion des données, infrastructure numérique et gouvernance technologique. À mesure que l’entreprise se développe sur plusieurs sites de production, relations investisseurs, logistique, opérations agricoles et systèmes de suivi numérique, une architecture d’information sûre et fiable sera essentielle.",
  "As CIO and Chief Security Officer, Bertrand Roc represents the company's digital and security backbone: a technology executive capable of aligning business operations, information systems, cybersecurity, connectivity, and institutional reliability into a professional platform for growth.":"Comme CIO et Directeur de la sécurité, Bertrand Roc représente la colonne vertébrale numérique et sécuritaire de l’entreprise : un dirigeant technologique capable d’aligner opérations commerciales, systèmes d’information, cybersécurité, connectivité et fiabilité institutionnelle dans une plateforme professionnelle de croissance."
});

Object.assign(I18N.en, {
  viewProfile:'View Profile',
  heroBody:'Helping buyers shape future production through market intelligence, crop planning, and premium controlled-environment agriculture.',
  farmsProjectsCta:'Farms & Projects',
  homeConnectedEyebrow:'SymbioGreens | Balponics | Buyer Input',
  homeConnectedTitle:'A Smarter Model For Premium Local Production',
  homeConnectedSubtitle:'Three pillars working together to grow what the market needs.',
  homeConnectedVisualAlt:'SymbioGreens Balponics buyer input model',
  homeConnectedCards:{
    symbio:{title:'SymbioGreens Is The Farm', short:'Premium local production for hospitality, retail, chefs, and local markets.', detail:'SymbioGreens is the farm-facing production brand: focused on growing, harvesting, quality, buyer relationships, and premium local supply.'},
    balponics:{title:'Balponics Powers The Technical Model', short:'Hydroponic systems, automation, crop planning, and farm scaling support.', detail:'Balponics supports the technical backbone: controlled-environment systems, crop planning, SOPs, training, R&D, and future project replication.'},
    buyers:{title:'Buyer Input Shapes Production', short:'Real demand signals help prioritize varieties, volumes, samples, packaging, and delivery.', detail:'Buyer input helps the platform decide what to grow, when to grow it, and how it reaches buyers with maximum freshness and reliability.'}
  },
  homeProductFamilyTitle:'SymbioGreens Product Family',
  homeProductFamilySubtitle:'A diverse portfolio of premium produce and value-added products grown with precision, harvested with care, and delivered for freshness.',
  homeProductFamilyVisualAlt:'SymbioGreens product family overview',
  homeProductFamilyCta:'Explore The Full Catalog',
  homeProductFamilyCards:{
    lettuces:{title:'Premium Lettuces', short:'Crisp, colorful, high-quality lettuces for restaurants, hotels, retailers, and health-conscious consumers.', detail:'Buyers choose premium lettuces for reliable texture, vibrant color, consistent quality, and recurring fresh salad programs.'},
    microgreens:{title:'Microgreens', short:'Nutrient-dense specialty greens with vibrant color, delicate texture, and premium culinary appeal.', detail:'Microgreens add visual impact, flavor intensity, and high-value menu flexibility for chefs, hospitality, wellness, and retail buyers.'},
    herbs:{title:'Culinary Herbs', short:'Fresh aromatic herbs for chefs, restaurants, hotels, wellness menus, and specialty retail.', detail:'Herbs support beverages, sauces, finishing, wellness menus, and custom chef programs where aroma and freshness matter.'},
    mushrooms:{title:'Gourmet Mushrooms', short:'Premium culinary mushrooms for chefs, wellness buyers, and specialty markets.', detail:'Mushrooms create umami, texture, and plant-forward menu opportunities while supporting future specialty and value-added programs.'},
    flowers:{title:'Edible Flowers & Specialty Garnishes', short:'High-impact visual products for chefs, resorts, fine dining, cocktails, events, and premium presentation.', detail:'Edible flowers and garnishes support high-end plating, pastries, beverages, events, and hospitality presentation programs.'},
    wellness:{title:'Medicinal & Wellness Plants', short:'Selected wellness-oriented crops for teas, extracts, fresh use, and value-added products.', detail:'Wellness plants create future opportunities for herbs, botanicals, teas, and value-added products when demand, compliance, and processing fit.'},
    vegetables:{title:'Specialty Vegetables & Substrate Crops', short:'Selected larger-root and specialty crops grown using Dutch Bucket, substrate, or controlled systems.', detail:'Specialty vegetables help serve chef menus, resorts, grocers, and custom programs that need distinctive freshness and controlled production.'},
    value:{title:'Value-Added Products', short:'Dry herbs, teas, seasoning blends, mushroom powders, and packaged specialty products.', detail:'Value-added products can extend shelf life, reduce waste, create branded offerings, and support future retail or wellness channels.'}
  },
  homeHydroEyebrow:'Why Hydroponics Matters',
  homeHydroTitle:'Smarter Growing. Better Resources. Stronger Food Systems.',
  homeHydroSubtitle:'Hydroponics complements traditional agriculture by delivering premium quality, using resources more efficiently, and supporting local food resilience.',
  homeHydroVisualAlt:'Why hydroponics matters educational overview',
  homeHydroNote:'Hydroponics does not replace all agriculture. It complements it with the right crops, the right systems, and the right markets.',
  homeHydroCards:{
    water:{title:'Water Conservation', short:'Recirculated systems deliver water to roots while reducing unnecessary waste.', detail:'Hydroponic systems can use dramatically less water than conventional field agriculture by recirculating water and delivering it precisely where plants need it.'},
    nutrient:{title:'Nutrient Efficiency', short:'Plants receive calibrated nutrition directly at the root zone.', detail:'Controlled feeding improves uptake, reduces runoff, and supports stronger flavor, color, growth consistency, and predictable production planning.'},
    pest:{title:'Reduced Pest Pressure', short:'Protected environments reduce exposure to many pests and diseases.', detail:'Cleaner growing conditions support lower chemical pressure, better crop hygiene, and a more reliable premium fresh product standard.'},
    year:{title:'Year-Round Production', short:'Controlled environments reduce seasonal limitations.', detail:'Protected farms can plan harvest windows and maintain more consistent availability beyond normal field-season constraints.'},
    freshness:{title:'Local Freshness', short:'Growing closer to buyers shortens the time from harvest to delivery.', detail:'Local controlled production can improve flavor, texture, shelf life, and buyer confidence by reducing distance between farm and market.'},
    future:{title:'Sustainable Future', short:'Local production strengthens food resilience and community value.', detail:'Hydroponics can reduce import reliance, support local jobs, improve resource efficiency, and make premium fresh supply more resilient.'}
  },
  homeBuyerFlowTitle:'From Buyer Interest To Production Planning',
  homeBuyerFlowSubtitle:'Your demand helps us grow what you need.',
  homeBuyerFlowCta:'Take The Production Survey',
  homeBuyerFlowSteps:{
    profile:{title:'Create A Buyer Profile', short:'Share who you are, where you operate, and the type of supply you need.', detail:'A buyer profile helps connect demand signals to business type, location, volume context, and sourcing needs.'},
    explore:{title:'Explore The Product Family', short:'Review lettuces, microgreens, herbs, mushrooms, edible flowers, specialty crops, and value-added products.', detail:'Product exploration helps buyers identify what fits menus, shelves, wellness programs, hospitality supply, and custom sourcing.'},
    demand:{title:'Indicate Demand', short:'Tell us preferred products, estimated volumes, delivery rhythm, packaging needs, and sample requirements.', detail:'Demand inputs guide crop selection, planting priorities, harvest planning, packaging formats, and local supply decisions.'},
    samples:{title:'Request Samples Or Coordination', short:'Samples and coordination help validate quality, format, and expectations before scale production.', detail:'Sample requests help the team understand buyer evaluation needs and refine product specs before production expands.'},
    planning:{title:'Shape Production Planning', short:'Your input shapes what we grow, when we grow it, and how it reaches your business with maximum freshness.', detail:'The goal is a more reliable local supply chain built around buyer demand, production discipline, and premium freshness.'}
  },
  qualityBadges:['Freshness Verified','Quality Inspected','Clean Packaging','Ready For Delivery','Traceability','Harvest Discipline','Cold Chain Ready'],
  homeFinalCtaTitle:'Ready To Shape Future Production?',
  homeFinalCtaBody:'Tell us what your business needs, explore the product family, and help guide premium local hydroponic production before production scales.'
});

Object.assign(I18N.es, {
  viewProfile:'Ver perfil',
  heroBody:'Ayudamos a los compradores a orientar la producción futura mediante inteligencia de mercado, planificación de cultivos y agricultura premium en ambiente controlado.',
  farmsProjectsCta:'Granjas y proyectos',
  homeConnectedEyebrow:'SymbioGreens | Balponics | Aporte del comprador',
  homeConnectedTitle:'Un modelo más inteligente para producción local premium',
  homeConnectedSubtitle:'Tres pilares trabajan juntos para cultivar lo que el mercado necesita.',
  homeConnectedVisualAlt:'Modelo SymbioGreens Balponics con aporte del comprador',
  homeConnectedCards:{
    symbio:{title:'SymbioGreens es la granja', short:'Producción local premium para hoteles, restaurantes, chefs, retail y mercados locales.', detail:'SymbioGreens es la marca de producción: cultivo, cosecha, calidad, relación con compradores y suministro local premium.'},
    balponics:{title:'Balponics impulsa el modelo técnico', short:'Sistemas hidropónicos, automatización, planificación de cultivos y apoyo para escalar.', detail:'Balponics aporta la base técnica: sistemas controlados, planificación, SOPs, capacitación, I+D y futura réplica de proyectos.'},
    buyers:{title:'El comprador orienta la producción', short:'Las señales reales priorizan variedades, volúmenes, muestras, empaques y entrega.', detail:'La información del comprador ayuda a decidir qué cultivar, cuándo cultivarlo y cómo entregarlo con máxima frescura y confiabilidad.'}
  },
  homeProductFamilyTitle:'Familia de productos SymbioGreens',
  homeProductFamilySubtitle:'Un portafolio diverso de productos premium y valor agregado, cultivado con precisión, cosechado con cuidado y entregado para frescura.',
  homeProductFamilyVisualAlt:'Resumen de la familia de productos SymbioGreens',
  homeProductFamilyCta:'Explorar el catálogo completo',
  homeProductFamilyCards:{
    lettuces:{title:'Lechugas premium', short:'Lechugas crujientes y coloridas para restaurantes, hoteles, comercios y consumidores saludables.', detail:'Los compradores eligen estas lechugas por textura confiable, color vibrante, calidad consistente y programas frescos recurrentes.'},
    microgreens:{title:'Microgreens', short:'Brotes especiales nutritivos con color vibrante, textura delicada y atractivo culinario premium.', detail:'Los microgreens agregan impacto visual, intensidad de sabor y flexibilidad de alto valor para chefs, hotelería, bienestar y retail.'},
    herbs:{title:'Hierbas culinarias', short:'Hierbas aromáticas frescas para chefs, restaurantes, hoteles, menús wellness y retail especializado.', detail:'Las hierbas apoyan bebidas, salsas, terminaciones, menús wellness y programas personalizados donde el aroma y la frescura importan.'},
    mushrooms:{title:'Hongos gourmet', short:'Hongos culinarios premium para chefs, compradores wellness y mercados especiales.', detail:'Los hongos aportan umami, textura y oportunidades de menús plant-forward, además de futuros programas especiales y valor agregado.'},
    flowers:{title:'Flores comestibles y garnish', short:'Productos visuales de alto impacto para chefs, resorts, fine dining, cocteles, eventos y presentación premium.', detail:'Las flores comestibles apoyan emplatado, pastelería, bebidas, eventos y programas de hospitalidad de alta presentación.'},
    wellness:{title:'Plantas medicinales y wellness', short:'Cultivos orientados a bienestar para tés, extractos, uso fresco y productos de valor agregado.', detail:'Las plantas wellness abren oportunidades futuras para hierbas, botánicos, tés y productos de valor agregado cuando la demanda y el cumplimiento encajen.'},
    vegetables:{title:'Vegetales especiales y sustrato', short:'Cultivos de raíz más grande y especiales usando Dutch Bucket, sustrato o sistemas controlados.', detail:'Los vegetales especiales ayudan a servir menús de chef, resorts, comercios y programas personalizados con frescura distintiva.'},
    value:{title:'Productos de valor agregado', short:'Hierbas secas, tés, mezclas de condimentos, polvos de hongos y productos especiales empacados.', detail:'El valor agregado puede extender vida útil, reducir desperdicio, crear ofertas de marca y apoyar canales retail o wellness.'}
  },
  homeHydroEyebrow:'Por qué importa la hidroponía',
  homeHydroTitle:'Cultivo más inteligente. Mejores recursos. Sistemas alimentarios más fuertes.',
  homeHydroSubtitle:'La hidroponía complementa la agricultura tradicional entregando calidad premium, usando recursos con mayor eficiencia y apoyando resiliencia alimentaria local.',
  homeHydroVisualAlt:'Resumen educativo de por qué importa la hidroponía',
  homeHydroNote:'La hidroponía no reemplaza toda la agricultura. La complementa con los cultivos, sistemas y mercados correctos.',
  homeHydroCards:{
    water:{title:'Conservación del agua', short:'Sistemas recirculados entregan agua a las raíces y reducen desperdicio.', detail:'La hidroponía puede usar mucho menos agua que el cultivo de campo al recircular y entregar agua con precisión.'},
    nutrient:{title:'Eficiencia de nutrientes', short:'Las plantas reciben nutrición calibrada directamente en la raíz.', detail:'La alimentación controlada mejora absorción, reduce escorrentía y apoya sabor, color, consistencia y planificación predecible.'},
    pest:{title:'Menor presión de plagas', short:'Ambientes protegidos reducen exposición a plagas y enfermedades.', detail:'Condiciones más limpias apoyan menor presión química, mejor higiene del cultivo y un estándar fresco premium más confiable.'},
    year:{title:'Producción todo el año', short:'Los ambientes controlados reducen límites estacionales.', detail:'Las granjas protegidas permiten planificar cosechas y mantener disponibilidad más constante fuera de temporadas de campo.'},
    freshness:{title:'Frescura local', short:'Cultivar cerca de compradores reduce el tiempo entre cosecha y entrega.', detail:'La producción local controlada mejora sabor, textura, vida útil y confianza al reducir distancia entre granja y mercado.'},
    future:{title:'Futuro sostenible', short:'La producción local fortalece resiliencia alimentaria y valor comunitario.', detail:'La hidroponía puede reducir dependencia de importaciones, apoyar empleos locales, mejorar eficiencia y hacer más resiliente el suministro fresco.'}
  },
  homeBuyerFlowTitle:'Del interés del comprador a la planificación de producción',
  homeBuyerFlowSubtitle:'Su demanda nos ayuda a cultivar lo que necesita.',
  homeBuyerFlowCta:'Responder encuesta de producción',
  homeBuyerFlowSteps:{
    profile:{title:'Crear perfil de comprador', short:'Comparta quién es, dónde opera y qué tipo de suministro necesita.', detail:'El perfil conecta señales de demanda con tipo de negocio, ubicación, volumen y necesidades de abastecimiento.'},
    explore:{title:'Explorar la familia de productos', short:'Revise lechugas, microgreens, hierbas, hongos, flores comestibles, cultivos especiales y valor agregado.', detail:'Explorar productos ayuda a identificar lo que encaja con menús, anaqueles, wellness, hotelería y abastecimiento personalizado.'},
    demand:{title:'Indicar demanda', short:'Indique productos, volúmenes, ritmo de entrega, empaque y muestras.', detail:'La demanda orienta selección de cultivos, prioridades de siembra, cosecha, formatos y suministro local.'},
    samples:{title:'Solicitar muestras o coordinación', short:'Las muestras validan calidad, formato y expectativas antes de escalar producción.', detail:'Las solicitudes ayudan a entender necesidades de evaluación y ajustar especificaciones antes de ampliar producción.'},
    planning:{title:'Dar forma a la planificación', short:'Su aporte define qué cultivamos, cuándo y cómo llega con máxima frescura.', detail:'La meta es una cadena local más confiable basada en demanda, disciplina operativa y frescura premium.'}
  },
  qualityBadges:['Frescura verificada','Calidad inspeccionada','Empaque limpio','Listo para entrega','Trazabilidad','Disciplina de cosecha','Cadena de frío lista'],
  homeFinalCtaTitle:'¿Listo para orientar la producción futura?',
  homeFinalCtaBody:'Cuéntenos qué necesita su negocio, explore la familia de productos y ayude a guiar la producción hidropónica local premium antes de escalar.'
});

Object.assign(I18N.fr, {
  viewProfile:'Voir le profil',
  heroBody:'Aider les acheteurs à orienter la production future grâce à l’intelligence de marché, à la planification des cultures et à l’agriculture premium en environnement contrôlé.',
  farmsProjectsCta:'Fermes et projets',
  homeConnectedEyebrow:'SymbioGreens | Balponics | Contribution acheteur',
  homeConnectedTitle:'Un modèle plus intelligent pour une production locale premium',
  homeConnectedSubtitle:'Trois piliers travaillent ensemble pour cultiver ce dont le marché a besoin.',
  homeConnectedVisualAlt:'Modèle SymbioGreens Balponics avec contribution acheteur',
  homeConnectedCards:{
    symbio:{title:'SymbioGreens est la ferme', short:'Production locale premium pour hôtellerie, restaurants, chefs, détail et marchés locaux.', detail:'SymbioGreens est la marque de production: culture, récolte, qualité, relations acheteurs et approvisionnement local premium.'},
    balponics:{title:'Balponics porte le modèle technique', short:'Systèmes hydroponiques, automatisation, planification des cultures et soutien au passage à l’échelle.', detail:'Balponics apporte la base technique: systèmes contrôlés, planification, SOPs, formation, R&D et future réplication de projets.'},
    buyers:{title:'Les acheteurs orientent la production', short:'Les signaux réels priorisent variétés, volumes, échantillons, emballages et livraison.', detail:'Les informations acheteurs aident à décider quoi cultiver, quand le cultiver et comment le livrer avec fraîcheur et fiabilité.'}
  },
  homeProductFamilyTitle:'Famille de produits SymbioGreens',
  homeProductFamilySubtitle:'Un portefeuille diversifié de produits premium et à valeur ajoutée, cultivés avec précision, récoltés avec soin et livrés pour la fraîcheur.',
  homeProductFamilyVisualAlt:'Aperçu de la famille de produits SymbioGreens',
  homeProductFamilyCta:'Explorer le catalogue complet',
  homeProductFamilyCards:{
    lettuces:{title:'Laitues premium', short:'Laitues croquantes et colorées pour restaurants, hôtels, détaillants et consommateurs attentifs à la santé.', detail:'Les acheteurs choisissent ces laitues pour leur texture fiable, couleur vibrante, qualité constante et programmes frais récurrents.'},
    microgreens:{title:'Microgreens', short:'Jeunes pousses nutritives avec couleur vibrante, texture délicate et attrait culinaire premium.', detail:'Les microgreens apportent impact visuel, intensité de saveur et flexibilité de haut niveau pour chefs, hôtellerie, bien-être et détail.'},
    herbs:{title:'Herbes culinaires', short:'Herbes aromatiques fraîches pour chefs, restaurants, hôtels, menus bien-être et détail spécialisé.', detail:'Les herbes soutiennent boissons, sauces, finitions, menus bien-être et programmes chef où l’arôme et la fraîcheur comptent.'},
    mushrooms:{title:'Champignons gastronomiques', short:'Champignons culinaires premium pour chefs, acheteurs bien-être et marchés spécialisés.', detail:'Les champignons apportent umami, texture et opportunités de menus végétaux ainsi que des programmes spécialisés et à valeur ajoutée.'},
    flowers:{title:'Fleurs comestibles et garnitures', short:'Produits visuels à fort impact pour chefs, resorts, fine dining, cocktails, événements et présentation premium.', detail:'Les fleurs comestibles soutiennent dressage, pâtisserie, boissons, événements et programmes hôteliers haut de gamme.'},
    wellness:{title:'Plantes médicinales et bien-être', short:'Cultures orientées bien-être pour thés, extraits, usage frais et produits à valeur ajoutée.', detail:'Les plantes bien-être créent de futures opportunités pour herbes, botaniques, thés et produits à valeur ajoutée lorsque demande et conformité le permettent.'},
    vegetables:{title:'Légumes spécialisés et substrats', short:'Cultures à racines plus grandes ou spécialisées en Dutch Bucket, substrat ou systèmes contrôlés.', detail:'Les légumes spécialisés servent menus de chefs, resorts, détaillants et programmes personnalisés avec fraîcheur distinctive.'},
    value:{title:'Produits à valeur ajoutée', short:'Herbes sèches, thés, mélanges d’assaisonnement, poudres de champignons et produits spécialisés emballés.', detail:'La valeur ajoutée peut prolonger la durée de conservation, réduire le gaspillage, créer des offres de marque et soutenir le détail ou le bien-être.'}
  },
  homeHydroEyebrow:'Pourquoi l’hydroponie compte',
  homeHydroTitle:'Culture plus intelligente. Meilleures ressources. Systèmes alimentaires plus forts.',
  homeHydroSubtitle:'L’hydroponie complète l’agriculture traditionnelle en offrant une qualité premium, une meilleure utilisation des ressources et une résilience alimentaire locale.',
  homeHydroVisualAlt:'Aperçu éducatif sur l’importance de l’hydroponie',
  homeHydroNote:'L’hydroponie ne remplace pas toute l’agriculture. Elle la complète avec les bonnes cultures, les bons systèmes et les bons marchés.',
  homeHydroCards:{
    water:{title:'Conservation de l’eau', short:'Les systèmes recirculés apportent l’eau aux racines tout en réduisant le gaspillage.', detail:'Les systèmes hydroponiques peuvent utiliser beaucoup moins d’eau que les cultures de plein champ grâce à la recirculation et à l’apport précis.'},
    nutrient:{title:'Efficacité des nutriments', short:'Les plantes reçoivent une nutrition calibrée directement à la racine.', detail:'L’alimentation contrôlée améliore l’absorption, réduit le ruissellement et soutient saveur, couleur, constance et planification prévisible.'},
    pest:{title:'Pression parasitaire réduite', short:'Les environnements protégés réduisent l’exposition à de nombreux ravageurs et maladies.', detail:'Des conditions plus propres soutiennent une pression chimique moindre, une meilleure hygiène des cultures et un standard frais premium plus fiable.'},
    year:{title:'Production toute l’année', short:'Les environnements contrôlés réduisent les limites saisonnières.', detail:'Les fermes protégées permettent de planifier les récoltes et de maintenir une disponibilité plus régulière hors saison.'},
    freshness:{title:'Fraîcheur locale', short:'Cultiver près des acheteurs réduit le délai entre récolte et livraison.', detail:'La production locale contrôlée améliore saveur, texture, durée de conservation et confiance en réduisant la distance entre ferme et marché.'},
    future:{title:'Avenir durable', short:'La production locale renforce la résilience alimentaire et la valeur communautaire.', detail:'L’hydroponie peut réduire la dépendance aux importations, soutenir l’emploi local, améliorer l’efficacité et rendre l’approvisionnement frais plus résilient.'}
  },
  homeBuyerFlowTitle:'De l’intérêt acheteur à la planification de production',
  homeBuyerFlowSubtitle:'Votre demande nous aide à cultiver ce dont vous avez besoin.',
  homeBuyerFlowCta:'Répondre à l’enquête de production',
  homeBuyerFlowSteps:{
    profile:{title:'Créer un profil acheteur', short:'Partagez qui vous êtes, où vous opérez et le type d’approvisionnement recherché.', detail:'Le profil relie les signaux de demande au type d’activité, à la localisation, au volume et aux besoins d’approvisionnement.'},
    explore:{title:'Explorer la famille de produits', short:'Consultez laitues, microgreens, herbes, champignons, fleurs comestibles, cultures spécialisées et valeur ajoutée.', detail:'L’exploration aide à identifier ce qui convient aux menus, rayons, programmes bien-être, hôtellerie et approvisionnement personnalisé.'},
    demand:{title:'Indiquer la demande', short:'Précisez produits, volumes, rythme de livraison, emballage et échantillons.', detail:'La demande guide choix des cultures, priorités de plantation, récolte, formats et approvisionnement local.'},
    samples:{title:'Demander des échantillons ou coordination', short:'Les échantillons valident qualité, format et attentes avant le passage à l’échelle.', detail:'Les demandes aident l’équipe à comprendre les besoins d’évaluation et à ajuster les spécifications avant expansion.'},
    planning:{title:'Orienter la planification', short:'Votre contribution définit quoi cultiver, quand, et comment livrer avec fraîcheur maximale.', detail:'L’objectif est une chaîne locale plus fiable, construite autour de la demande, de la discipline opérationnelle et de la fraîcheur premium.'}
  },
  qualityBadges:['Fraîcheur vérifiée','Qualité inspectée','Emballage propre','Prêt pour livraison','Traçabilité','Discipline de récolte','Chaîne du froid prête'],
  homeFinalCtaTitle:'Prêt à orienter la production future ?',
  homeFinalCtaBody:'Dites-nous ce dont votre entreprise a besoin, explorez la famille de produits et aidez à guider la production hydroponique locale premium avant le passage à l’échelle.'
});

Object.assign(RUNTIME_TRANSLATIONS.es, {
  "Clean power, resilient farms, sustainable growth.":"Energía limpia, granjas resilientes, crecimiento sostenible.",
  "SymbioGreens and Balponics are designed around a renewable-first energy strategy. In Caribbean and island markets where sunlight is abundant and energy costs can be volatile, solar-led infrastructure, battery storage where feasible, efficient farm design, and smart energy management can strengthen operational resilience and improve long-term economics.":"SymbioGreens y Balponics están diseñados alrededor de una estrategia energética renovable primero. En mercados caribeños e insulares donde el sol es abundante y los costos energéticos pueden ser volátiles, la infraestructura liderada por solar, el almacenamiento en baterías donde sea viable, el diseño eficiente de granja y la gestión inteligente de energía pueden fortalecer la resiliencia operativa y mejorar la economía a largo plazo.",
  "The objective is not to make unrealistic claims of immediate full independence from the grid. The objective is to design farms that reduce exposure to energy volatility, improve continuity during disruptions, and support cleaner production through practical renewable integration.":"El objetivo no es hacer afirmaciones poco realistas de independencia inmediata total de la red. El objetivo es diseñar granjas que reduzcan la exposición a la volatilidad energética, mejoren la continuidad durante interrupciones y apoyen una producción más limpia mediante integración renovable práctica.",
  "Battery Storage":"Almacenamiento en baterías",
  "Battery systems can store excess solar energy for peak demand, night operations, and critical systems such as monitoring, pumps, and cold storage.":"Los sistemas de baterías pueden almacenar exceso de energía solar para demanda pico, operaciones nocturnas y sistemas críticos como monitoreo, bombas y almacenamiento en frío.",
  "High-efficiency solar arrays can support daily farm operations, irrigation, lighting, monitoring, packing, and cold-chain support where technically and economically feasible.":"Los arreglos solares de alta eficiencia pueden apoyar operaciones diarias, riego, iluminación, monitoreo, empaque y cadena de frío donde sea técnica y económicamente viable.",
  "Backup systems may still be required for continuity during storms, extended cloudy periods, technical faults, or grid disruptions.":"Los sistemas de respaldo aún pueden ser necesarios para continuidad durante tormentas, períodos nublados prolongados, fallas técnicas o interrupciones de la red.",
  "Smart Energy Management":"Gestión inteligente de energía",
  "Monitoring and automation can help schedule loads, reduce waste, protect equipment, and improve operational reliability.":"El monitoreo y la automatización pueden ayudar a programar cargas, reducir desperdicios, proteger equipos y mejorar la confiabilidad operativa.",
  "Stronger Margins & Resilience":"Márgenes y resiliencia más fuertes",
  "Lower exposure to unpredictable energy costs can improve planning, protect freshness, and support more resilient unit economics.":"Una menor exposición a costos energéticos impredecibles puede mejorar la planificación, proteger la frescura y apoyar una economía unitaria más resiliente.",
  "Monitoring Architecture":"Arquitectura de monitoreo",
  "Water & Nutrient Monitoring Station":"Estación de monitoreo de agua y nutrientes",
  "Smart control. Precise monitoring. Consistent growth.":"Control inteligente. Monitoreo preciso. Crecimiento consistente.",
  "Controlled-environment agriculture depends on disciplined water and nutrient management. Monitoring pH, EC, temperature, flow, irrigation timing, filtration, and recirculation helps protect crop health, reduce waste, and improve consistency across production cycles.":"La agricultura en ambiente controlado depende de una gestión disciplinada del agua y los nutrientes. Monitorear pH, EC, temperatura, flujo, tiempos de riego, filtración y recirculación ayuda a proteger la salud del cultivo, reducir desperdicio y mejorar la consistencia entre ciclos.",
  "This is presented as a planned monitoring architecture and target operating model, subject to site conditions, engineering design, equipment selection, and phased implementation.":"Esto se presenta como una arquitectura de monitoreo planificada y un modelo operativo objetivo, sujeto a condiciones del sitio, diseño de ingeniería, selección de equipos e implementación por fases.",
  "Water Quality":"Calidad del agua",
  "Continuous monitoring of key water parameters supports a clean and stable foundation for plant health.":"El monitoreo continuo de parámetros clave del agua apoya una base limpia y estable para la salud vegetal.",
  "pH / EC Tracking":"Seguimiento de pH / EC",
  "Real-time measurement helps maintain nutrient availability and supports better plant uptake.":"La medición en tiempo real ayuda a mantener la disponibilidad de nutrientes y apoya una mejor absorción por las plantas.",
  "Irrigation Control":"Control de riego",
  "Automated scheduling and dosing can deliver water and nutrients at the right time and in the right quantity.":"La programación y dosificación automatizadas pueden entregar agua y nutrientes en el momento y la cantidad adecuados.",
  "Recirculation":"Recirculación",
  "Closed-loop or semi-closed systems can reduce water waste and improve resource efficiency.":"Los sistemas cerrados o semicerrados pueden reducir el desperdicio de agua y mejorar la eficiencia de recursos.",
  "Data-Informed Growing":"Cultivo informado por datos",
  "Centralized monitoring gives operators better visibility into system performance, crop needs, and potential problems.":"El monitoreo centralizado ofrece a los operadores mejor visibilidad del desempeño del sistema, necesidades del cultivo y posibles problemas.",
  "System Reliability":"Confiabilidad del sistema",
  "Redundant components, alerts, and routine monitoring help protect crops and reduce operational risk.":"Los componentes redundantes, alertas y monitoreo rutinario ayudan a proteger cultivos y reducir riesgo operativo.",
  "Advancing sustainable agriculture through science, technology, and integrated systems.":"Impulsando la agricultura sostenible mediante ciencia, tecnología y sistemas integrados.",
  "The SymbioGreens / Balponics model is designed to evolve through applied research, crop trials, system optimization, automation, data collection, and continuous improvement. The goal is to test what works locally, refine production protocols, improve resilience, and build a platform that can adapt to different Caribbean and island market conditions.":"El modelo SymbioGreens / Balponics está diseñado para evolucionar mediante investigación aplicada, ensayos de cultivos, optimización de sistemas, automatización, recolección de datos y mejora continua. La meta es probar lo que funciona localmente, refinar protocolos de producción, mejorar la resiliencia y construir una plataforma adaptable a distintos mercados caribeños e insulares.",
  "Testing varieties and growing techniques to identify high-performing crops for local buyers, climate conditions, and market demand.":"Prueba de variedades y técnicas de cultivo para identificar cultivos de alto desempeño para compradores locales, condiciones climáticas y demanda del mercado.",
  "System Optimization":"Optimización de sistemas",
  "Refining growing environments, irrigation, spacing, lighting, airflow, and workflows to improve quality and operational efficiency.":"Refinamiento de ambientes de cultivo, riego, espaciamiento, iluminación, flujo de aire y procesos para mejorar calidad y eficiencia operativa.",
  "Studying fertigation, nutrient delivery, and recirculation to reduce waste and improve crop performance.":"Estudio de fertirrigación, entrega de nutrientes y recirculación para reducir desperdicio y mejorar el desempeño del cultivo.",
  "Automation & Monitoring":"Automatización y monitoreo",
  "Using sensors, data, alerts, and control systems to support better decisions and consistent operations.":"Uso de sensores, datos, alertas y sistemas de control para apoyar mejores decisiones y operaciones consistentes.",
  "Renewable Integration":"Integración renovable",
  "Studying how solar, batteries, efficient equipment, and smart energy scheduling can support resilient production.":"Estudio de cómo solar, baterías, equipos eficientes y programación energética inteligente pueden apoyar una producción resiliente.",
  "Designing scalable, nutritious, local production systems that can strengthen community resilience and long-term food security.":"Diseño de sistemas locales de producción nutritivos y escalables que pueden fortalecer la resiliencia comunitaria y la seguridad alimentaria a largo plazo.",
  "Biological Innovation":"Innovación biológica",
  "Future Food Systems & Biological Innovation":"Sistemas alimentarios futuros e innovación biológica",
  "Research today, resilience tomorrow.":"Investigación hoy, resiliencia mañana.",
  "Beyond immediate production, the platform can support exploratory research into biological systems, sustainable inputs, algae research, beneficial microorganisms, biostimulants, automation, and integrated future food solutions. These areas are research pathways and future opportunities, not guaranteed commercial technologies.":"Más allá de la producción inmediata, la plataforma puede apoyar investigación exploratoria en sistemas biológicos, insumos sostenibles, investigación de algas, microorganismos beneficiosos, bioestimulantes, automatización y soluciones alimentarias futuras integradas. Estas áreas son rutas de investigación y oportunidades futuras, no tecnologías comerciales garantizadas.",
  "Exploratory Algae Research":"Investigación exploratoria de algas",
  "Investigating algae biology, strain discovery, and potential applications in nutrition, agriculture, and bioproducts.":"Investigación de biología de algas, descubrimiento de cepas y aplicaciones potenciales en nutrición, agricultura y bioproductos.",
  "Biological Systems":"Sistemas biológicos",
  "Studying soil microbiomes, beneficial microorganisms, plant interactions, and biological inputs that may support healthier growing systems.":"Estudio de microbiomas del suelo, microorganismos beneficiosos, interacciones vegetales e insumos biológicos que pueden apoyar sistemas de cultivo más saludables.",
  "Sustainable Inputs":"Insumos sostenibles",
  "Evaluating biofertilizers, biostimulants, compost-derived products, and other inputs that may reduce external dependencies.":"Evaluación de biofertilizantes, bioestimulantes, productos derivados de compost y otros insumos que pueden reducir dependencias externas.",
  "Emerging Technologies":"Tecnologías emergentes",
  "Exploring automation, sensors, AI-supported analysis, and data platforms to improve system efficiency and monitoring.":"Exploración de automatización, sensores, análisis apoyado por IA y plataformas de datos para mejorar eficiencia y monitoreo.",
  "Innovation Pathway":"Ruta de innovación",
  "Using iterative research, validation, and integration to move promising ideas from concept to practical application.":"Uso de investigación iterativa, validación e integración para llevar ideas prometedoras del concepto a la aplicación práctica.",
  "Future Resilience":"Resiliencia futura",
  "Building adaptive production systems that can support people, communities, and markets in the face of climate, logistics, and supply-chain challenges.":"Construcción de sistemas productivos adaptativos que puedan apoyar a personas, comunidades y mercados frente a desafíos climáticos, logísticos y de cadena de suministro.",
  "Build Resilient Local Production Systems":"Construir sistemas locales de producción resilientes",
  "From renewable-first infrastructure to water monitoring, crop trials, and future food research, SymbioGreens and Balponics are building a platform for cleaner, smarter, and more resilient food production.":"Desde infraestructura renovable primero hasta monitoreo de agua, ensayos de cultivos e investigación alimentaria futura, SymbioGreens y Balponics construyen una plataforma para una producción de alimentos más limpia, inteligente y resiliente.",
  "Investor & Partnership Review":"Revisión de inversionistas y alianzas"
});

Object.assign(RUNTIME_TRANSLATIONS.fr, {
  "Clean power, resilient farms, sustainable growth.":"Énergie propre, fermes résilientes, croissance durable.",
  "SymbioGreens and Balponics are designed around a renewable-first energy strategy. In Caribbean and island markets where sunlight is abundant and energy costs can be volatile, solar-led infrastructure, battery storage where feasible, efficient farm design, and smart energy management can strengthen operational resilience and improve long-term economics.":"SymbioGreens et Balponics sont conçus autour d’une stratégie énergétique renouvelable d’abord. Dans les marchés caribéens et insulaires où l’ensoleillement est abondant et les coûts énergétiques peuvent être volatils, l’infrastructure menée par le solaire, le stockage par batteries lorsque c’est faisable, la conception efficace des fermes et la gestion intelligente de l’énergie peuvent renforcer la résilience opérationnelle et améliorer l’économie à long terme.",
  "The objective is not to make unrealistic claims of immediate full independence from the grid. The objective is to design farms that reduce exposure to energy volatility, improve continuity during disruptions, and support cleaner production through practical renewable integration.":"L’objectif n’est pas de promettre une indépendance immédiate et totale du réseau. L’objectif est de concevoir des fermes qui réduisent l’exposition à la volatilité énergétique, améliorent la continuité pendant les perturbations et soutiennent une production plus propre par une intégration renouvelable pratique.",
  "Battery Storage":"Stockage par batteries",
  "Battery systems can store excess solar energy for peak demand, night operations, and critical systems such as monitoring, pumps, and cold storage.":"Les systèmes de batteries peuvent stocker l’énergie solaire excédentaire pour la demande de pointe, les opérations nocturnes et les systèmes critiques comme le monitoring, les pompes et le stockage froid.",
  "High-efficiency solar arrays can support daily farm operations, irrigation, lighting, monitoring, packing, and cold-chain support where technically and economically feasible.":"Des panneaux solaires à haute efficacité peuvent soutenir les opérations quotidiennes, l’irrigation, l’éclairage, le monitoring, l’emballage et la chaîne du froid lorsque c’est techniquement et économiquement faisable.",
  "Backup systems may still be required for continuity during storms, extended cloudy periods, technical faults, or grid disruptions.":"Des systèmes de secours peuvent rester nécessaires pour assurer la continuité pendant les tempêtes, longues périodes nuageuses, défaillances techniques ou perturbations du réseau.",
  "Smart Energy Management":"Gestion intelligente de l’énergie",
  "Monitoring and automation can help schedule loads, reduce waste, protect equipment, and improve operational reliability.":"Le monitoring et l’automatisation peuvent aider à planifier les charges, réduire le gaspillage, protéger les équipements et améliorer la fiabilité opérationnelle.",
  "Stronger Margins & Resilience":"Marges et résilience renforcées",
  "Lower exposure to unpredictable energy costs can improve planning, protect freshness, and support more resilient unit economics.":"Une moindre exposition aux coûts énergétiques imprévisibles peut améliorer la planification, protéger la fraîcheur et soutenir une économie unitaire plus résiliente.",
  "Monitoring Architecture":"Architecture de monitoring",
  "Water & Nutrient Monitoring Station":"Station de suivi de l’eau et des nutriments",
  "Smart control. Precise monitoring. Consistent growth.":"Contrôle intelligent. Monitoring précis. Croissance régulière.",
  "Controlled-environment agriculture depends on disciplined water and nutrient management. Monitoring pH, EC, temperature, flow, irrigation timing, filtration, and recirculation helps protect crop health, reduce waste, and improve consistency across production cycles.":"L’agriculture en environnement contrôlé dépend d’une gestion rigoureuse de l’eau et des nutriments. Le suivi du pH, de l’EC, de la température, du débit, du calendrier d’irrigation, de la filtration et de la recirculation aide à protéger la santé des cultures, réduire le gaspillage et améliorer la régularité entre les cycles.",
  "This is presented as a planned monitoring architecture and target operating model, subject to site conditions, engineering design, equipment selection, and phased implementation.":"Ceci est présenté comme une architecture de monitoring planifiée et un modèle opérationnel cible, sous réserve des conditions du site, de l’ingénierie, du choix des équipements et d’une mise en œuvre par phases.",
  "Water Quality":"Qualité de l’eau",
  "Continuous monitoring of key water parameters supports a clean and stable foundation for plant health.":"Le suivi continu des paramètres clés de l’eau soutient une base propre et stable pour la santé des plantes.",
  "pH / EC Tracking":"Suivi pH / EC",
  "Real-time measurement helps maintain nutrient availability and supports better plant uptake.":"La mesure en temps réel aide à maintenir la disponibilité des nutriments et favorise une meilleure absorption par les plantes.",
  "Irrigation Control":"Contrôle de l’irrigation",
  "Automated scheduling and dosing can deliver water and nutrients at the right time and in the right quantity.":"La programmation et le dosage automatisés peuvent fournir eau et nutriments au bon moment et dans la bonne quantité.",
  "Recirculation":"Recirculation",
  "Closed-loop or semi-closed systems can reduce water waste and improve resource efficiency.":"Les systèmes fermés ou semi-fermés peuvent réduire le gaspillage d’eau et améliorer l’efficacité des ressources.",
  "Data-Informed Growing":"Culture pilotée par les données",
  "Centralized monitoring gives operators better visibility into system performance, crop needs, and potential problems.":"Le monitoring centralisé donne aux opérateurs une meilleure visibilité sur la performance du système, les besoins des cultures et les problèmes potentiels.",
  "System Reliability":"Fiabilité du système",
  "Redundant components, alerts, and routine monitoring help protect crops and reduce operational risk.":"Les composants redondants, alertes et contrôles réguliers aident à protéger les cultures et réduire le risque opérationnel.",
  "Advancing sustainable agriculture through science, technology, and integrated systems.":"Faire progresser l’agriculture durable par la science, la technologie et les systèmes intégrés.",
  "The SymbioGreens / Balponics model is designed to evolve through applied research, crop trials, system optimization, automation, data collection, and continuous improvement. The goal is to test what works locally, refine production protocols, improve resilience, and build a platform that can adapt to different Caribbean and island market conditions.":"Le modèle SymbioGreens / Balponics est conçu pour évoluer par la recherche appliquée, les essais de cultures, l’optimisation des systèmes, l’automatisation, la collecte de données et l’amélioration continue. L’objectif est de tester ce qui fonctionne localement, affiner les protocoles de production, améliorer la résilience et bâtir une plateforme adaptable à différents marchés caribéens et insulaires.",
  "Testing varieties and growing techniques to identify high-performing crops for local buyers, climate conditions, and market demand.":"Tester variétés et techniques de culture pour identifier les cultures les plus performantes selon les acheteurs locaux, le climat et la demande.",
  "System Optimization":"Optimisation des systèmes",
  "Refining growing environments, irrigation, spacing, lighting, airflow, and workflows to improve quality and operational efficiency.":"Affiner les environnements de culture, l’irrigation, l’espacement, l’éclairage, la ventilation et les flux de travail pour améliorer qualité et efficacité opérationnelle.",
  "Studying fertigation, nutrient delivery, and recirculation to reduce waste and improve crop performance.":"Étudier la fertigation, l’apport nutritif et la recirculation pour réduire le gaspillage et améliorer la performance des cultures.",
  "Automation & Monitoring":"Automatisation et monitoring",
  "Using sensors, data, alerts, and control systems to support better decisions and consistent operations.":"Utiliser capteurs, données, alertes et systèmes de contrôle pour soutenir de meilleures décisions et des opérations régulières.",
  "Renewable Integration":"Intégration renouvelable",
  "Studying how solar, batteries, efficient equipment, and smart energy scheduling can support resilient production.":"Étudier comment le solaire, les batteries, les équipements efficaces et la planification intelligente de l’énergie peuvent soutenir une production résiliente.",
  "Designing scalable, nutritious, local production systems that can strengthen community resilience and long-term food security.":"Concevoir des systèmes locaux, nutritifs et évolutifs qui peuvent renforcer la résilience communautaire et la sécurité alimentaire à long terme.",
  "Biological Innovation":"Innovation biologique",
  "Future Food Systems & Biological Innovation":"Systèmes alimentaires futurs et innovation biologique",
  "Research today, resilience tomorrow.":"Recherche aujourd’hui, résilience demain.",
  "Beyond immediate production, the platform can support exploratory research into biological systems, sustainable inputs, algae research, beneficial microorganisms, biostimulants, automation, and integrated future food solutions. These areas are research pathways and future opportunities, not guaranteed commercial technologies.":"Au-delà de la production immédiate, la plateforme peut soutenir la recherche exploratoire sur les systèmes biologiques, les intrants durables, la recherche sur les algues, les microorganismes bénéfiques, les biostimulants, l’automatisation et les solutions alimentaires futures intégrées. Ces domaines sont des voies de recherche et des opportunités futures, pas des technologies commerciales garanties.",
  "Exploratory Algae Research":"Recherche exploratoire sur les algues",
  "Investigating algae biology, strain discovery, and potential applications in nutrition, agriculture, and bioproducts.":"Étudier la biologie des algues, la découverte de souches et les applications potentielles en nutrition, agriculture et bioproduits.",
  "Biological Systems":"Systèmes biologiques",
  "Studying soil microbiomes, beneficial microorganisms, plant interactions, and biological inputs that may support healthier growing systems.":"Étudier les microbiomes du sol, microorganismes bénéfiques, interactions végétales et intrants biologiques pouvant soutenir des systèmes de culture plus sains.",
  "Sustainable Inputs":"Intrants durables",
  "Evaluating biofertilizers, biostimulants, compost-derived products, and other inputs that may reduce external dependencies.":"Évaluer biofertilisants, biostimulants, produits issus du compost et autres intrants pouvant réduire les dépendances externes.",
  "Emerging Technologies":"Technologies émergentes",
  "Exploring automation, sensors, AI-supported analysis, and data platforms to improve system efficiency and monitoring.":"Explorer l’automatisation, les capteurs, l’analyse assistée par IA et les plateformes de données pour améliorer efficacité et monitoring.",
  "Innovation Pathway":"Parcours d’innovation",
  "Using iterative research, validation, and integration to move promising ideas from concept to practical application.":"Utiliser recherche itérative, validation et intégration pour faire passer les idées prometteuses du concept à l’application pratique.",
  "Future Resilience":"Résilience future",
  "Building adaptive production systems that can support people, communities, and markets in the face of climate, logistics, and supply-chain challenges.":"Construire des systèmes de production adaptatifs capables de soutenir personnes, communautés et marchés face aux défis climatiques, logistiques et d’approvisionnement.",
  "Build Resilient Local Production Systems":"Construire des systèmes locaux de production résilients",
  "From renewable-first infrastructure to water monitoring, crop trials, and future food research, SymbioGreens and Balponics are building a platform for cleaner, smarter, and more resilient food production.":"De l’infrastructure renouvelable d’abord au suivi de l’eau, aux essais de cultures et à la recherche alimentaire future, SymbioGreens et Balponics construisent une plateforme pour une production alimentaire plus propre, plus intelligente et plus résiliente.",
  "Investor & Partnership Review":"Revue investisseurs et partenariats"
});

const FOUNDER_PROFILE = {
  name: 'Bernard Balmir',
};

const CATEGORY_STORIES = {
  'premium-lettuces':['Premium lettuces for consistent salads, wraps, plated greens, and premium fresh programs.','Buyers care because texture, shelf life, and visual quality drive repeat menu performance.','Best for restaurants, hotels, grocers, meal prep, and recurring weekly supply.'],
  'baby-greens':['Tender greens harvested for flavor, color, and fast kitchen use.','Buyer value comes from flexible mixes, signature salads, wellness menus, and prep speed.','Best for chefs, salad programs, hotels, cafes, and specialty retail packs.'],
  microgreens:['High-impact young greens used for flavor, garnish, nutrition, and presentation.','Small volumes can create premium visual and culinary value.','Best for fine dining, hotels, catering, juice bars, and menu development.'],
  'premium-specialty-herbs':['Specialty herbs for aroma, finishing, beverages, sauces, and chef-led menu identity.','Fresh herbs are often hard to source consistently at premium quality.','Best for restaurants, cocktail programs, resorts, specialty retailers, and custom herb mixes.'],
  'edible-flowers':['Premium edible flowers for color, plating, pastry, beverage, and events.','Quality and freshness are essential for safe, attractive presentation.','Best for fine dining, hotels, pastry teams, catering, and high-end retail.'],
  'gourmet-mushrooms':['Culinary mushrooms for umami, texture, plant-forward menus, and premium specials.','Consistent supply supports menu planning and chef experimentation.','Best for restaurants, hotels, specialty grocers, vegan menus, and tasting programs.'],
  'wellness-mushrooms':['Future wellness mushroom category reserved for approved products and assets.','Demand review will help shape compliant future opportunities.','Best for future wellness, retail, and value-added product exploration.'],
  'specialty-vegetables':['Hydroponic specialty vegetables for distinctive color, crunch, and menu differentiation.','Unique vegetables can become signature ingredients and seasonal features.','Best for chefs, grocers, resorts, specialty buyers, and custom production programs.'],
};

function readStore(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function writeStore(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function uid(prefix) { return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`; }
function esc(value) { return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c])); }
function t(key) { return (I18N[state.lang] && I18N[state.lang][key]) || I18N.en[key] || key; }
function list(key) { const value = t(key); return Array.isArray(value) ? value : []; }
function dict(key) { const value = t(key); return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }
function translateText(value) {
  const map = RUNTIME_TRANSLATIONS[state.lang];
  if (!map || state.lang === 'en') return value;
  const normalized = String(value ?? '').replace(/\s+/g, ' ').trim();
  return map[normalized] || value;
}
function applyRuntimeTranslations(root = document) {
  if (state.lang === 'en' || !root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!node.nodeValue.trim() || !parent || ['SCRIPT','STYLE','NOSCRIPT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    const raw = node.nodeValue;
    const translated = translateText(raw);
    if (translated !== raw) {
      const leading = raw.match(/^\s*/)?.[0] || '';
      const trailing = raw.match(/\s*$/)?.[0] || '';
      node.nodeValue = `${leading}${translated}${trailing}`;
    }
  });
  root.querySelectorAll?.('[placeholder], [aria-label], [title], option').forEach(el => {
    ['placeholder','aria-label','title'].forEach(attr => {
      if (!el.hasAttribute?.(attr)) return;
      const value = el.getAttribute(attr);
      const translated = translateText(value);
      if (translated !== value) el.setAttribute(attr, translated);
    });
    if (el.tagName === 'OPTION') {
      const translated = translateText(el.textContent);
      if (translated !== el.textContent) el.textContent = translated;
    }
  });
}
function normalizeEmail(value) { return String(value || '').trim().toLowerCase(); }
function normalizePassword(value) { return String(value || '').trim(); }
function cleanText(value, max = 1000) { return String(value || '').trim().slice(0, max); }
function isValidEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value)); }
async function hashText(value) {
  const text = normalizePassword(value);
  if (!window.crypto?.subtle) return `plain:${text}`;
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2,'0')).join('');
}
async function passwordMatches(user, password) {
  const normalized = normalizePassword(password);
  if (user.password_hash) return user.password_hash === await hashText(normalized);
  return normalizePassword(user.password) === normalized;
}
function asArray(value) { return Array.isArray(value) ? value : []; }
function platformData() { return typeof PLATFORM !== 'undefined' ? PLATFORM : {categories:[], products:[]}; }
function products() { return (platformData().products || []).filter(p => override(p.id).active !== false && p.active !== false); }
function categories() { return (platformData().categories || []).slice().sort((a,b) => (a.sort_order || 0) - (b.sort_order || 0)); }
function categoryById(id) { return categories().find(c => c.id === id); }
function productById(id) { return products().find(p => p.id === id); }
function override(id) { return state.productOverrides[id] || {}; }
function productName(p) { return override(p.id).product_name || p.product_name; }
function categoryLabel(id) { return dict('categoryNames')[id] || categoryById(id)?.name || id; }
function localizedProductCopy(value, fallbackKey = 'productSensoryNote') { return state.lang === 'en' ? (value || t(fallbackKey)) : t(fallbackKey); }
function localizedFormat(value) {
  const maps = {
    es: {'Hydroponic':'Hidropónico','Vertical Tower':'Torre vertical','A-Frame':'Marco tipo A','Tray':'Bandeja','Dutch Bucket':'Cubo holandés','Log / Block':'Bloque / sustrato','Controlled Grow Room':'Sala de cultivo controlada'},
    fr: {'Hydroponic':'Hydroponique','Vertical Tower':'Tour verticale','A-Frame':'Cadre en A','Tray':'Plateau','Dutch Bucket':'Seau hollandais','Log / Block':'Bloc / substrat','Controlled Grow Room':'Salle de culture contrôlée'}
  };
  return maps[state.lang]?.[value] || value;
}
function productFormats(p) {
  const methods = Array.isArray(p.production_method)
    ? p.production_method
    : p.production_method
      ? String(p.production_method).split('/').map(item => item.trim()).filter(Boolean)
      : [];
  return [...methods.map(localizedFormat), dict('livingOptions')[p.category_id]].filter(Boolean).join(', ');
}
function imageFor(p) { const o = override(p.id); return o.images?.thumbnail || o.images?.webp || p.images?.thumbnail || p.images?.webp || p.images?.png || ''; }
function detailImageFor(p) { const o = override(p.id); return o.images?.webp || o.images?.png || o.images?.thumbnail || p.images?.webp || p.images?.png || p.images?.thumbnail || imageFor(p); }
function draftKey(productId) { return `${state.session?.respondent_id || 'guest'}:${productId}`; }
function getDraft(productId) { return readStore(storeKeys.drafts, {})[draftKey(productId)] || {product_id: productId}; }
function saveDraft(productId, patch) { const drafts = readStore(storeKeys.drafts, {}); drafts[draftKey(productId)] = {...getDraft(productId), ...patch, product_id: productId, updated_at: new Date().toISOString()}; writeStore(storeKeys.drafts, drafts); }
function removeDraft(productId) { const drafts = readStore(storeKeys.drafts, {}); delete drafts[draftKey(productId)]; writeStore(storeKeys.drafts, drafts); }
function hasSavedInterest(productId) {
  const d = getDraft(productId);
  return Boolean(d.interest_level || d.estimated_quantity || d.weekly_volume || d.delivery_frequency || d.sample_request === 'Yes' || d.packaging_preference || d.comments);
}
function surveySelectOptions(values, selected) {
  return values.map(([value,label]) => `<option value="${esc(value)}" ${selected === value ? 'selected' : ''}>${esc(label)}</option>`).join('');
}
function productInterestPayload(productId, formData = null) {
  const p = productById(productId);
  const d = formData ? Object.fromEntries(formData) : getDraft(productId);
  const quantity = d.estimated_quantity || d.weekly_volume || '';
  const frequency = d.delivery_frequency || '';
  const sampleRequested = d.sample_request === 'Yes' || d.sample_requested === 'Yes';
  const packaging = d.packaging_preference || d.packaging_preferences || '';
  const notes = d.comments || d.notes || '';
  return {
    local_buyer_id: state.session?.respondent_id || '',
    local_customer_id: state.session?.respondent_id || '',
    product_id: productId,
    product_name: p ? productName(p) : productId,
    category_id: p?.category_id || '',
    category: p ? categoryLabel(p.category_id) : '',
    interest_level: d.interest_level || '',
    quantity_estimate: quantity,
    estimated_quantity: quantity,
    delivery_frequency: frequency,
    preferred_delivery_frequency: frequency,
    sample_request: sampleRequested,
    sample_requested: sampleRequested,
    packaging_preference: packaging,
    packaging_preferences: packaging,
    notes,
    language: state.lang,
    source_page: location.hash || hashForRoute(state.route),
    metadata: {
      local_buyer_id: state.session?.respondent_id || '',
      route: state.route,
      category_id: p?.category_id || ''
    },
    created_at: new Date().toISOString()
  };
}
async function saveProductInterest(productInterest) {
  const backend = window.SymbioGreensBackend;
  if (backend?.isBackendEnabled?.()) {
    return backend.saveProductInterest(productInterest);
  }
  return {ok: false, data: productInterest, error: null, backend: 'local', skipped: true};
}
function currentRespondent() { return asArray(readStore(storeKeys.respondents, [])).find(r => r.id === state.session?.respondent_id); }
function logEmail(to, template, subject) { const rows = asArray(readStore(storeKeys.emails, [])); rows.push({id:uid('email'), to, template, subject, created_at:new Date().toISOString(), status:'queued_local_preview'}); writeStore(storeKeys.emails, rows); }
function notifyInternal(template, subject) { INTERNAL_NOTIFICATION_RECIPIENTS.forEach(to => logEmail(to, template, subject)); }
function backendSyncUnavailable(result) {
  return window.SymbioGreensBackend?.isBackendEnabled?.() && result && result.ok === false && result.backend === 'supabase';
}
function localSyncMessage() {
  return translateText('Your submission was saved locally. Online sync is temporarily unavailable, so please contact us directly if this is urgent.');
}

function routeFromLocation() {
  const token = String(location.hash || '').replace(/^#\/?/, '').toLowerCase();
  return ({'':'landing',home:'landing',about:'brand',products:'products','why-hydroponics':'whyHydroponics',farms:'lasTerrenas','farms-projects':'lasTerrenas','las-terrenas':'lasTerrenas',team:'team',contact:'contact',register:'register','buyer-login':'login',login:'login',dashboard:'dashboard',catalog:'catalog','forgot-password':'forgotPassword','reset-password':'resetPassword',manager:'manager',admin:'manager',internal:'manager',investors:'investors','investor-access':'investorAccess','investor-login':'investorLogin','investor-dashboard':'investorDashboard','investor-model':'investorModel','investor-documents':'investorDocuments','investor-review':'investorReview',privacy:'privacy',terms:'terms',disclaimer:'disclaimer',legal:'legal'}[token]) || 'landing';
}
function hashForRoute(route) {
  return ({landing:'home',brand:'about',whyHydroponics:'why-hydroponics',lasTerrenas:'farms-projects',login:'buyer-login',forgotPassword:'forgot-password',resetPassword:'reset-password',manager:'manager',investorAccess:'investor-access',investorLogin:'investor-login',investorDashboard:'investor-dashboard',investorModel:'investor-model',investorDocuments:'investor-documents',investorReview:'investor-review'}[route]) || route;
}
function syncLocationForRoute(route) { const hash = `#${hashForRoute(route)}`; if (location.hash !== hash) history.pushState(null, '', hash); }
function scrollRouteToTop() { requestAnimationFrame(() => window.scrollTo({top:0, left:0, behavior:'auto'})); }
function navigateToRoute(route, options = {}) {
  state.route = route;
  syncLocationForRoute(route);
  if (options.closeModal !== false) closeModal();
  mount();
  if (options.scroll !== false) scrollRouteToTop();
}

function mount() {
  document.documentElement.lang = state.lang;
  renderNav();
  document.querySelectorAll('[data-footer-i18n]').forEach(el => { el.textContent = t(el.dataset.footerI18n); });
  const app = document.getElementById('app');
  app.innerHTML = renderRoute();
  applyRuntimeTranslations(document.getElementById('topNav'));
  applyRuntimeTranslations(app);
  applyRuntimeTranslations(document.querySelector('.platform-footer'));
}

function renderNav() {
  const nav = document.getElementById('topNav');
  const items = [['landing',t('home')],['products',t('products')],['lasTerrenas',t('farmsProjects')],['team',t('team')],['brand',t('about')],['investors',t('investors')],['contact',t('contact')]];
  nav.innerHTML = `${items.map(([route,label]) => `<button class="nav-btn ${state.route===route?'active':''}" data-route="${route}">${esc(label)}</button>`).join('')}
    ${state.session?.role === 'manager' ? `<button class="nav-btn ${state.route==='manager'?'active':''}" data-route="manager">${esc(t('managerDashboard'))}</button>` : ''}
    ${state.session ? `<button class="ghost-btn" data-action="logout">${esc(t('signOut'))}</button>` : ''}
    <div class="language-selector">${['en','es','fr'].map(lang => `<button class="lang-btn ${state.lang===lang?'active':''}" data-lang="${lang}">${lang.toUpperCase()}</button>`).join('')}</div>`;
}

function renderRoute() {
  if (state.route === 'brand') return aboutPanel();
  if (state.route === 'products') return productsPanel(false);
  if (state.route === 'whyHydroponics') return whyHydroponicsPanel();
  if (state.route === 'lasTerrenas') return lasTerrenasPanel();
  if (state.route === 'team') return teamOperationsPanel();
  if (state.route === 'contact') return contactPanel();
  if (state.route === 'register') return registerPanel();
  if (state.route === 'login') return loginPanel();
  if (state.route === 'forgotPassword') return forgotPasswordPanel();
  if (state.route === 'resetPassword') return resetPasswordPanel();
  if (state.route === 'dashboard') return state.session?.role === 'buyer' ? buyerDashboard() : loginPanel();
  if (state.route === 'catalog') return state.session?.role === 'buyer' ? buyerCatalog() : registerPanel();
  if (state.route === 'manager') return managerRoute();
  if (state.route === 'investors') return investorsPanel();
  if (['investorAccess','investorLogin','investorDashboard','investorModel','investorDocuments'].includes(state.route)) return investorPrivatePlaceholderPanel(state.route);
  if (state.route === 'investorReview') return investorReviewPanel();
  if (['privacy','terms','disclaimer','legal'].includes(state.route)) return legalPanel(state.route);
  if (state.route === 'thankyou') return `<section class="thank-you"><h1>Thank you</h1><p>Your buyer demand information was saved locally for this prototype.</p><button class="primary-btn" data-route="dashboard">${esc(t('buyerDashboard'))}</button></section>`;
  return landingPage();
}

function landingPage() {
  return `${heroPanel()}${journeyPanel()}${assortmentPanel()}${whyHydroponicsPanel()}${buyerPlanningStepperPanel()}<section class="panel story-panel">${harvestOperationsPanel()}${qualityAssurancePanel()}${distributionDeliveryPanel()}</section>${teamOperationsShortPanel()}${homeFinalCtaPanel()}`;
}
function heroPanel() {
  return `<section class="homepage-hero"><div class="homepage-hero-overlay"><div class="hero-copy-overlay"><div class="eyebrow">${esc(t('heroEyebrow'))}</div><h1>${esc(t('heroTitle'))}</h1><strong class="hero-subhead">${esc(t('heroSubhead'))}</strong><p>${esc(t('heroBody'))}</p><div class="hero-actions"><button class="primary-btn" data-action="startProductionSurvey">${esc(t('takeSurvey'))}</button><button class="ghost-btn" data-route="products">${esc(t('explore'))}</button><button class="ghost-btn" data-route="lasTerrenas">${esc(t('farmsProjectsCta'))}</button></div></div></div></section>`;
}
function journeyPanel() {
  const cards = dict('homeConnectedCards');
  const activeKey = cards[state.activeHomeModel] ? state.activeHomeModel : Object.keys(cards)[0];
  const active = cards[activeKey] || {};
  return `<section class="home-premium-panel home-connected-panel"><div class="home-section-header"><span>${esc(t('homeConnectedEyebrow'))}</span><h2>${esc(t('homeConnectedTitle'))}</h2><p>${esc(t('homeConnectedSubtitle'))}</p></div><div class="home-connected-layout"><figure class="home-visual-card"><img src="public/company/production/home-symbiogreens-balponics-buyer-model.png" alt="${esc(t('homeConnectedVisualAlt'))}"></figure><div class="home-interactive-column"><div class="home-choice-grid three">${Object.entries(cards).map(([key,item], index) => `<button type="button" class="home-choice-card ${activeKey === key ? 'active' : ''}" data-action="setHomeModel" data-home-model="${esc(key)}"><span class="home-card-index">${String(index + 1).padStart(2,'0')}</span><strong>${esc(item.title)}</strong><p>${esc(item.short)}</p></button>`).join('')}</div><article class="home-detail-panel"><span>${String(Object.keys(cards).indexOf(activeKey) + 1).padStart(2,'0')}</span><strong>${esc(active.title)}</strong><p>${esc(active.detail)}</p></article></div></div></section>`;
}
function assortmentPanel() {
  const cards = dict('homeProductFamilyCards');
  const activeKey = cards[state.activeHomeFamily] ? state.activeHomeFamily : Object.keys(cards)[0];
  const active = cards[activeKey] || {};
  return `<section class="home-premium-panel home-family-panel"><div class="home-section-header"><span>SymbioGreens</span><h2>${esc(t('homeProductFamilyTitle'))}</h2><p>${esc(t('homeProductFamilySubtitle'))}</p></div><figure class="home-visual-card wide"><img src="public/company/production/home-symbiogreens-product-family.png" alt="${esc(t('homeProductFamilyVisualAlt'))}"></figure><div class="home-family-grid">${Object.entries(cards).map(([key,item], index) => `<button type="button" class="home-family-card ${activeKey === key ? 'active' : ''}" data-action="setHomeFamily" data-home-family="${esc(key)}"><span class="home-card-index">${index + 1}</span><strong>${esc(item.title)}</strong><p>${esc(item.short)}</p></button>`).join('')}</div><article class="home-detail-panel split"><div><span>${esc(active.title)}</span><p>${esc(active.detail)}</p></div><button class="primary-btn" data-route="products">${esc(t('homeProductFamilyCta'))}</button></article></section>`;
}
function howItWorksPanel() {
  return `<section class="panel story-panel"><div class="toolbar"><div><div class="eyebrow">${esc(t('howEyebrow'))}</div><h2>${esc(t('howTitle'))}</h2></div><button class="primary-btn" data-action="startProductionSurvey">${esc(t('takeSurvey'))}</button></div><div class="how-grid">${list('howSteps').map(([a,b],i) => `<article class="how-step"><span>${String(i+1).padStart(2,'0')}</span><strong>${esc(a)}</strong><p>${esc(b)}</p></article>`).join('')}</div>${harvestOperationsPanel()}${qualityAssurancePanel()}${distributionDeliveryPanel()}</section>`;
}
function harvestOperationsPanel() {
  return `<div class="operations-feature"><div class="operations-copy"><h3>${esc(t('harvestTitle'))}</h3><p>${esc(t('harvestBody1'))}</p><p>${esc(t('harvestBody2'))}</p><ul>${list('harvestBullets').map(x => `<li>${esc(x)}</li>`).join('')}</ul></div><figure class="operations-image"><div class="operations-photo" style="background-image:url('public/company/production/harvest-delivery-operations.png')"></div><figcaption>${esc(t('harvestCaption'))}</figcaption></figure></div>`;
}
function qualityAssurancePanel() {
  return `<div class="quality-feature"><div class="quality-copy"><div class="eyebrow">${esc(t('qualityTitle'))}</div><h3>${esc(t('qualityHeadline'))}</h3><p>${esc(t('qualityBody'))}</p><div class="quality-badges">${list('qualityBadges').map(x => `<span><b>?</b>${esc(x)}</span>`).join('')}</div><div class="quality-metrics">${list('qualityMetrics').map(x => `<span><b>?</b>${esc(x)}</span>`).join('')}</div></div><figure class="quality-image-card"><img src="public/company/production/packaging-quality-control.png" alt="Quality assurance and packaging for premium hydroponic produce"><figcaption>${esc(t('qualityCaption'))}</figcaption></figure></div>`;
}
function distributionDeliveryPanel() {
  return `<div class="delivery-feature"><figure class="delivery-image-card"><img src="public/company/production/delivery-logistics.png" alt="Distribution and delivery of fresh SymbioGreens produce"><figcaption>${esc(t('deliveryCaption'))}</figcaption></figure><div class="delivery-copy"><div class="eyebrow">${esc(t('deliveryTitle'))}</div><h3>${esc(t('deliveryHeadline'))}</h3><p>${esc(t('deliveryBody'))}</p><ul>${list('deliveryBullets').map(x => `<li>${esc(x)}</li>`).join('')}</ul><div class="delivery-metrics">${list('deliveryMetrics').map(x => `<span><b>?</b>${esc(x)}</span>`).join('')}</div></div></div>`;
}
function whyHydroponicsPanel() {
  const cards = dict('homeHydroCards');
  const activeKey = cards[state.activeHomeHydro] ? state.activeHomeHydro : Object.keys(cards)[0];
  const active = cards[activeKey] || {};
  return `<section class="home-premium-panel home-hydro-panel"><div class="home-section-header"><span>${esc(t('homeHydroEyebrow'))}</span><h2>${esc(t('homeHydroTitle'))}</h2><p>${esc(t('homeHydroSubtitle'))}</p></div><figure class="home-visual-card wide"><img src="public/company/production/home-why-hydroponics-matters.png" alt="${esc(t('homeHydroVisualAlt'))}"></figure><div class="home-hydro-grid">${Object.entries(cards).map(([key,item], index) => `<button type="button" class="home-hydro-card ${activeKey === key ? 'active' : ''}" data-action="setHomeHydro" data-home-hydro="${esc(key)}"><span class="home-card-index">${index + 1}</span><div class="why-icon why-icon-${esc(key)}">${whyIcon(key === 'pest' ? 'pesticide' : key === 'freshness' ? 'future' : key)}</div><strong>${esc(item.title)}</strong><p>${esc(item.short)}</p></button>`).join('')}</div><article class="home-detail-panel split"><div><span>${esc(active.title)}</span><p>${esc(active.detail)}</p></div><small>${esc(t('homeHydroNote'))}</small></article></section>`;
}
function buyerPlanningStepperPanel() {
  const steps = dict('homeBuyerFlowSteps');
  const activeKey = steps[state.activeHomeStep] ? state.activeHomeStep : Object.keys(steps)[0];
  const active = steps[activeKey] || {};
  return `<section class="home-premium-panel home-buyer-flow"><div class="home-section-header"><span>${esc(t('howEyebrow'))}</span><h2>${esc(t('homeBuyerFlowTitle'))}</h2><p>${esc(t('homeBuyerFlowSubtitle'))}</p></div><div class="home-stepper">${Object.entries(steps).map(([key,item], index) => `<button type="button" class="home-step-card ${activeKey === key ? 'active' : ''}" data-action="setHomeStep" data-home-step="${esc(key)}"><span class="home-card-index">${String(index + 1).padStart(2,'0')}</span><strong>${esc(item.title)}</strong><p>${esc(item.short)}</p></button>`).join('')}</div><article class="home-detail-panel split"><div><span>${esc(active.title)}</span><p>${esc(active.detail)}</p></div><button class="primary-btn" data-action="startProductionSurvey">${esc(t('homeBuyerFlowCta'))}</button></article></section>`;
}
function homeFinalCtaPanel() {
  return `<section class="home-final-cta"><div><h2>${esc(t('homeFinalCtaTitle'))}</h2><p>${esc(t('homeFinalCtaBody'))}</p></div><div class="hero-actions"><button class="primary-btn" data-action="startProductionSurvey">${esc(t('takeSurvey'))}</button><button class="ghost-btn" data-route="products">${esc(t('explore'))}</button><button class="ghost-btn" data-route="contact">${esc(t('contact'))}</button></div></section>`;
}
function whyIcon(key) {
  const icons = {
    water:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 6c7 9 12 16 12 24a12 12 0 0 1-24 0C12 22 17 15 24 6Z"/><path d="M17 32c4 3 10 3 14 0"/><path d="M34 14c4 2 6 5 6 9"/><path d="M14 14c-4 2-6 5-6 9"/></svg>',
    pesticide:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 5 39 11v11c0 10-6 17-15 21C15 39 9 32 9 22V11l15-6Z"/><path d="M18 26c4-7 12-7 16-1"/><path d="M15 31c7 2 14 2 21-2"/></svg>',
    nutrient:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 5c5 7 9 12 9 17a9 9 0 0 1-18 0c0-5 4-10 9-17Z"/><path d="M24 31v12"/><path d="M24 39c-6 0-10-3-13-8"/><path d="M24 39c6 0 10-3 13-8"/><path d="M14 20h20"/></svg>',
    year:'<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="10" width="32" height="30" rx="4"/><path d="M16 6v8M32 6v8M8 19h32"/><path d="M24 25c4 4 4 8 0 12-4-4-4-8 0-12Z"/><path d="M18 31c4-2 8-2 12 0"/></svg>',
    future:'<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="17"/><path d="M8 24h32"/><path d="M24 7c5 5 7 11 7 17s-2 12-7 17c-5-5-7-11-7-17s2-12 7-17Z"/><path d="M29 27c5-1 8-4 10-7"/><path d="M19 30c-4-1-7-4-9-8"/></svg>',
  };
  return icons[key] || icons.future;
}
function aboutPanel() {
  const problemCards = ['Heavy dependence on imported fresh produce','Exposure to shipping cost variation','Supply disruptions during global crises','Reduced freshness from long transport chains','Inconsistent quality and availability','Limited local control over supply','Lost opportunities for local value creation'];
  const autonomyCards = [['Stronger Food Autonomy','Produce more strategically at the local level and reduce dependence on distant supply chains.'],['Better Food Independence','Control more critical fresh-food supply decisions within the local market.'],['Improved National Resilience','Build a food system that can withstand disruption, volatility, and long-term pressure.'],['Better Business Continuity','Support reliable supply for hotels, restaurants, retailers, and institutions.'],['More Local Control','Improve control over quality, timing, harvest planning, and buyer responsiveness.'],['Reduced Vulnerability','Reduce exposure to external shocks without pretending to replace all agriculture or imports.']];
  const importerSteps = [['Import Dependence','Relying on distant markets creates vulnerability, higher costs, and supply risk.'],['Local Production Planning','Assess local needs, land, resources, and market demand to design a productive strategy.'],['Hydroponic Systems','Deploy efficient systems that maximize yield, conserve resources, and support year-round production.'],['Quality Handling & Processing','Maintain standards through careful handling, packing, cold chain, and traceability.'],['Local Supply & Distribution','Deliver fresh produce to local markets, businesses, and communities.'],['Stronger Local Economy','Keep value local, create jobs, build resilience, and strengthen food autonomy.']];
  const hydroCards = [['Water Efficiency','Supports more intelligent and efficient water use.'],['Better Use of Space','Allows intensive, organized production using towers, NFT, DWC, Dutch buckets, and tray systems.'],['Local Freshness','Enables faster movement from harvest to delivery.'],['More Consistent Quality','Supports premium produce standards for hotels, restaurants, and specialty buyers.'],['Greater Production Control','Supports crop planning, monitoring, and reliable operating systems.'],['Smarter Risk Management','Reduces some dependence on fragile external supply chains.']];
  const businessCards = ['Better margins through local supply opportunities','Less spoilage from long transport chains','Improved responsiveness to buyer demand','More value retained in the local economy','More supply flexibility','Stronger local business ecosystems'];
  const shockCards = ['Less exposure to freight volatility','Less dependence on distant supply chains','Greater continuity during disruptions','Stronger local fallback capacity','Better buyer confidence during instability'];
  const buildCards = ['Controlled-environment production','Hydroponic systems','Nursery and propagation','Premium crop strategy','Harvest and packing','Cold chain and delivery readiness','Technical support and training','Scalable project replication'];
  const principles = [['Local First','Grow closer to the market whenever possible.'],['Resilience by Design','Reduce vulnerability through smarter local production.'],['Water Intelligence','Use water more efficiently and responsibly.'],['Quality Before Volume','Premium buyers need consistency, freshness, and presentation.'],['Innovation With Purpose','Technology should solve real production and business problems.'],['Build Local Value','Create better opportunities for local businesses, teams, and operators.'],['From Import Dependence to Productive Capacity','Help transform supply dependence into local production potential.'],['Replicable Systems','Build models that can be adapted to other locations and markets.']];
  return `<section class="about-strategy-page"><section class="about-strategy-hero"><div class="eyebrow">${esc(t('about'))}</div><h1>Why We Are Building a Smarter Local Food Production Model</h1><p>SymbioGreens is being developed as a premium hydroponic farm initiative focused on fresh, local, reliable, and high-quality production. Balponics is the technical company behind the model, supporting hydroponic systems, controlled-environment growing, crop planning, technical execution, and scalable agricultural development.</p><p>Together, SymbioGreens and Balponics are being built to help create a more resilient, more efficient, and more autonomous food production model for tourism-driven, island, and import-dependent markets where food autonomy, food independence, and local resilience matter.</p></section><section class="about-strategy-block"><div class="about-section-copy"><div class="eyebrow">The Problem</div><h2>Why the Current Supply Model Is Not Enough</h2><p>Many island and tourism-driven markets remain highly dependent on imported fresh produce. That dependence creates structural vulnerability. Shipping costs fluctuate. Delays affect freshness. External crises disrupt availability. Premium buyers struggle with inconsistency. Local businesses remain dependent on external supply chains they do not control.</p><p>This is not only a logistics issue. It is a business resilience issue, a food autonomy issue, and a long-term development issue.</p></div><div class="about-chip-grid">${problemCards.map(item => `<span>${esc(item)}</span>`).join('')}</div></section><figure class="about-visual-card"><img src="public/company/production/about-import-vs-local-production.png" alt="Import dependency compared with local production model"><figcaption>Import dependency versus a local production model: shorter supply routes, better control, stronger freshness, and more local resilience.</figcaption></figure><section class="about-strategy-block"><div class="about-section-copy"><div class="eyebrow">Food Autonomy</div><h2>Building Food Autonomy and Local Resilience</h2><p>A smarter local production model can help communities, businesses, and countries reduce their dependence on distant supply chains. By producing more strategically at the local level, markets gain greater food autonomy, better control, stronger resilience, and improved ability to respond to shocks.</p><p>This is especially important for island economies and hospitality markets, where dependence on imported produce can create vulnerability.</p></div><div class="about-card-grid">${autonomyCards.map(([title,body]) => `<article><strong>${esc(title)}</strong><p>${esc(body)}</p></article>`).join('')}</div></section><figure class="about-visual-card"><img src="public/company/production/about-food-autonomy-resilience.png" alt="Food autonomy and resilience benefits"><figcaption>Local, controlled-environment production strengthens communities by improving reliability, control, and long-term food resilience.</figcaption></figure><section class="about-strategy-block"><div class="about-section-copy"><div class="eyebrow">Opportunity</div><h2>Turning Dependence Into Opportunity</h2><p>One of the biggest opportunities in this model is the ability to help markets shift from being only importers to becoming producers. Instead of depending almost entirely on incoming goods, local businesses and operators can participate in value creation through controlled production, packaging, technical operations, and local supply relationships.</p><p>That shift matters economically. More value can stay in the local economy. More knowledge can be built locally. More jobs can be created locally. More strategic capacity can be developed locally.</p></div><div class="about-step-grid">${importerSteps.map(([title,body], index) => `<article><span>${index + 1}</span><strong>${esc(title)}</strong><p>${esc(body)}</p></article>`).join('')}</div></section><figure class="about-visual-card"><img src="public/company/production/about-importer-to-producer.png" alt="From importer to producer pathway"><figcaption>From importer to producer: planning, systems, quality handling, local distribution, and stronger local economic autonomy.</figcaption></figure><section class="about-strategy-block"><div class="about-section-copy"><div class="eyebrow">Why Hydroponics</div><h2>Why Hydroponics Is Central to the Model</h2><p>Hydroponics makes it possible to produce premium crops with greater control over water, nutrients, spacing, hygiene, and harvest planning. In the right context, hydroponics is not just a technology upgrade; it is a strategic production model for freshness, consistency, efficiency, and resilience.</p><p>For SymbioGreens and Balponics, hydroponics supports local production in a way that is cleaner, more planned, and more adaptive to modern market needs.</p></div><div class="about-card-grid">${hydroCards.map(([title,body]) => `<article><strong>${esc(title)}</strong><p>${esc(body)}</p></article>`).join('')}</div></section><figure class="about-visual-card"><img src="public/company/production/about-why-hydroponics-works.png" alt="Why hydroponics works benefits"><figcaption>Hydroponics supports water efficiency, space efficiency, local freshness, consistency, production control, and smarter risk management.</figcaption></figure><section class="about-strategy-block"><div class="about-section-copy"><h2>Better Economics for Local Businesses</h2><p>A stronger local production model creates more than food. It creates economic opportunity. Hotels, restaurants, villas, retailers, and food operators gain access to fresher local products. Entrepreneurs and agricultural operators gain the opportunity to produce, package, and supply instead of relying only on imports.</p><p>This can improve profit retention, reduce waste, shorten delivery cycles, and create more responsive buyer relationships.</p></div><div class="about-chip-grid">${businessCards.map(item => `<span>${esc(item)}</span>`).join('')}</div></section><section class="about-strategy-block"><div class="about-section-copy"><h2>Less Vulnerable to External Shocks</h2><p>Recent years have shown how fragile global supply systems can become. Shipping costs can rise sharply. Delays can become normal. Crises can interrupt product flows. Markets that depend almost entirely on imports remain exposed.</p><p>A local controlled-environment production layer can help reduce that exposure. It does not replace all agriculture or all imports, but it strengthens resilience by creating a reliable local base for selected premium crops.</p></div><div class="about-card-grid compact">${shockCards.map(item => `<article><strong>${esc(item)}</strong></article>`).join('')}</div></section><section class="about-strategy-block about-ecosystem-block"><div class="about-section-copy"><div class="eyebrow">The Ecosystem</div><h2>The Farm and the Technical Platform</h2><p>SymbioGreens is the farm-facing production brand: focused on growing, harvesting, quality, buyer relationships, and premium local supply. Balponics is the technical company behind the model: supporting hydroponic design, greenhouse systems, crop planning, training, post-harvest systems, and long-term project development.</p><p>Balponics provides the systems, technical discipline, and production model. SymbioGreens brings that model to life through real farm execution and market-facing supply.</p></div><div class="about-duo-grid"><article><h3>SymbioGreens</h3><ul><li>Premium fresh production</li><li>Market-facing supply</li><li>Hospitality and local buyers</li><li>Quality and consistency</li><li>Local fresh-food model</li></ul></article><article><h3>Balponics</h3><ul><li>Technical systems</li><li>Hydroponic design</li><li>Greenhouse planning</li><li>Training and SOPs</li><li>Crop strategy and operational support</li></ul></article></div></section><figure class="about-visual-card"><img src="public/company/production/about-symbiogreens-balponics-ecosystem.png" alt="SymbioGreens and Balponics ecosystem model"><figcaption>SymbioGreens and Balponics together: technical systems, crop planning, farm production, quality delivery, buyers, feedback, and continuous improvement.</figcaption></figure><section class="about-strategy-block"><div class="about-section-copy"><h2>More Than a Farm</h2><p>The ambition is not simply to build a farm. The ambition is to build a model: a system that combines controlled growing, efficient water use, crop planning, operational discipline, post-harvest handling, cold-chain support, delivery readiness, and scalable technical know-how.</p><p>This is about creating a production ecosystem that can serve local buyers today and become a replicable model for tomorrow.</p></div><div class="about-chip-grid">${buildCards.map(item => `<span>${esc(item)}</span>`).join('')}</div></section><section class="about-strategy-block"><div class="about-section-copy"><h2>Our Operating Principles</h2></div><div class="about-card-grid">${principles.map(([title,body]) => `<article><strong>${esc(title)}</strong><p>${esc(body)}</p></article>`).join('')}</div></section><section class="about-strategy-cta"><div><h2>Building a More Autonomous Fresh Food Future</h2><p>SymbioGreens and Balponics are being developed to help create cleaner, smarter, more resilient local food systems with premium hydroponic production, better resource efficiency, stronger local business opportunity, and reduced dependence on fragile supply chains.</p></div><div class="hero-actions"><button class="primary-btn" data-route="lasTerrenas">Explore Farms & Projects</button><button class="ghost-btn" data-route="products">${esc(t('explore'))}</button><button class="ghost-btn" data-route="contact">Contact Us</button></div></section></section>`;
}
              function lasTerrenasPanel() {
                const interiorImage = 'public/company/production/greenhouse-interior-tower-production.png';
                const layoutImage = 'public/company/production/las-terrenas-northeast-dr-model-farm-hub.png';
                const metrics = [['Land area','Approx. 15 hectares for phase one planning'],['Greenhouse area','Approx. 10,610 m2 controlled-environment production area'],['Plot area','Approx. 30,000 m2 initial hub footprint'],['Hydroponic towers','500 phase-one towers, 8-inch diameter and 8-foot height'],['Plant sites','Approx. 80 plant sites per tower and 40,000 plants per cycle'],['Microgreens','8,000-9,000 trays per cycle in five-level racks'],['Mushrooms','Approx. 2,000 kg per month target capacity'],['Commercial corridor','Las Terrenas / Sánchez / Río San Juan with broader Dominican reach']];
                const systems = [['Hydroponic Tower Greenhouses','Phase one is centered on 500 high-density hydroponic towers for herbs, leafy greens, and specialty crops, with approximately 40,000 plant sites per cycle.'],['Microgreens Facility','A controlled-room microgreens facility with five-level racks and approximately 8,000-9,000 trays per cycle for chef-oriented, high-turnover crops.'],['Mushroom Grow Rooms','Dedicated indoor rooms for gourmet mushrooms such as lion\'s mane, king oyster, shiitake, enoki, and other specialty varieties where commercially appropriate.'],['Specialty Substrate Greenhouse','Substrate production for larger-root crops, Asian herbs, wellness crops, resort kitchen ingredients, and specialty varieties such as kaffir lime, pandan, lemongrass, curry leaves, ginger, and turmeric where appropriate.']];
                const infrastructure = [['Medicinal & Wellness Plant Area','Dedicated production planning for tulsi, gotu kola, lemon balm, moringa, stevia, ashwagandha, ginger, turmeric, and other approved wellness-oriented crops.'],['Drying & Value-Added Processing','Light processing capacity for herbs, teas, spices, seasoning blends, mushroom powders, drying, packaging, and value-added products.'],['Cold Storage & Packing Line','Refrigerated rooms, sorting, grading, washing, labeling, quality control, and buyer-ready packing flow.'],['Logistics & Fleet','Refrigerated delivery truck, pickup or management vehicles, loading access, and delivery flow for resorts, chefs, restaurants, and distributors.'],['Solar & Electrical Resilience','Solar-assisted power, battery storage, efficient electrical design, and backup planning to reduce exposure to energy instability.'],['Water & Nutrient Management','Reservoirs, filtration, nutrient mixing, irrigation control, recirculation, pH/EC monitoring, and water-quality discipline.'],['Manager House, Office & Staff Facilities','Operations office, manager residence, staff housing or rest areas, bathrooms, laundry, secure storage, administration, and monitoring space.']];
                const offers = [['Feasibility & Market Alignment','Market demand review, buyer mapping, crop priorities, corridor strategy, and commercial positioning.'],['Site Planning & Concept Development','Campus layout, greenhouse configuration, workflow planning, hub infrastructure, and phased development strategy.'],['Climate-Adapted Greenhouse Design','Greenhouse concepts adapted to tropical, coastal, island, and tourism-driven environments.'],['Hydroponic System Selection','Tower hydroponics, microgreens, mushrooms, substrate systems, medicinal crops, nursery, and specialty crop planning.'],['Post-Harvest & Cold Chain','Harvest flow, packing, cold room planning, freshness holding, quality control, and delivery readiness.'],['Training, SOPs & Commissioning','Team training, crop planning, system commissioning, quality protocols, technical operations, and operating discipline.'],['Long-Term Technical Support','Ongoing improvement, crop planning support, production troubleshooting, renewable planning, and scaling roadmap.']];
                const education = [['Visitor Experience & Chef Area','Guided farm tours, chef sampling, tasting area, farm-to-table education, harvest lists, and tasteful culinary or herbal tea workshop concepts.'],['Training & Demonstration Zone','Hands-on training for operators, greenhouse teams, partners, culinary buyers, and community programs.'],['Buyer & Distributor Visits','Practical walkthroughs for resorts, chefs, restaurants, distributors, wellness buyers, and specialty food channels.'],['R&D / Innovation Area','Crop trials, hydroponic system testing, monitoring, automation, future food systems, and continuous production improvement.']];
                const regional = [
                  ['Bahamas Hospitality Supply Model','Illustrative Caribbean replication concept','A scalable controlled-environment agriculture hub designed to serve resorts, villas, chefs, restaurants, and specialty buyers with premium local supply.','public/company/production/bahamas_hospitality_supply_model_concept.png',['Resort and villa supply','Chef-driven demand','Import replacement','Same-day freshness','Scalable island model','Local business opportunity']],
                  ['Bermuda High-Value Island Model','Illustrative Caribbean replication concept','A compact, high-value controlled-environment farm model adapted for limited land, premium local markets, and island food resilience.','public/company/production/bermuda_high_value_agriculture_model_pitch.png',['Compact footprint','High-value production','Limited land adaptation','Local freshness','Resilience and efficiency','Year-round premium supply']],
                  ['Eastern Caribbean Boutique Market Model','Illustrative Caribbean replication concept','A modular production hub for tourism clusters, restaurants, boutique hotels, local retailers, cruise markets, and island communities.','public/company/production/regional-eastern-caribbean-boutique-market-model.png',['Modular greenhouse planning','Local market adaptation','Tourism cluster supply','Training and technical support','Scalable investment model','Local food resilience']],
                  ['Martinique Premium Fresh Supply Model','Illustrative Caribbean replication concept','An integrated fresh supply model designed for culinary culture, wellness products, specialty herbs, local freshness, and sustainable production.','public/company/fresh_and_sustainable_agriculture_for_martinique.png',['Culinary and wellness demand','Herbs and specialty crops','Efficient water use','Local delivery','Value-added processing','Regional replication potential']],
                  ['Guadeloupe Resilient Local Supply Model','Illustrative Caribbean replication concept','A resilient local supply model designed around controlled-environment production, local business opportunity, reduced imports, and regional scalability.','public/company/guadeloupe_resilient_local_farm_model.png',['Resilient by design','Controlled-environment production','Local business opportunity','Packing and cold chain','Electric fleet and delivery','Scalable Caribbean model']],
                ];
                const applications = ['Hotels & Resorts','Restaurants & Fine Dining','Private Villas','Specialty Retail','Wellness & Tourism Operators','Institutional Buyers','Island Communities','Training & Demonstration Centers'];
                return `<section class="projects-page"><section class="projects-hero"><div><div class="eyebrow">${esc(t('farmsProjects'))}</div><h1>Las Terrenas / Northeast DR Model Farm Hub</h1><p>A premium controlled-environment agriculture campus designed for same-day local supply, imported specialty produce replacement, resort and chef demand, and Caribbean replication.</p><p>The Las Terrenas / Sánchez / Río San Juan operating corridor is planned as the first reference hub for the Northeast Dominican Republic. The model combines 500 phase-one hydroponic towers, microgreens, mushrooms, specialty crops, medicinal plants, value-added processing, cold chain, logistics, solar-assisted resilience, staff facilities, visitor experience, and R&D capacity.</p><div class="hero-actions"><button class="primary-btn" data-action="openImageLightbox" data-image="${esc(layoutImage)}" data-title="Las Terrenas / Northeast DR Model Farm Hub">View Hub Model</button><button class="ghost-btn" data-route="contact">Discuss a Project</button></div></div><figure class="projects-hero-visual"><button class="project-image-button" data-action="openImageLightbox" data-image="${esc(layoutImage)}" data-title="Las Terrenas / Northeast DR Model Farm Hub"><img src="${esc(layoutImage)}" alt="Illustrative Las Terrenas Northeast Dominican Republic controlled-environment agriculture model farm hub"></button><figcaption>Illustrative model hub based on the private investor presentation: a diversified controlled-environment agriculture campus combining 500 phase-one hydroponic towers, microgreens, mushrooms, specialty crops, medicinal plants, value-added processing, cold chain, solar-assisted resilience, staff facilities, logistics, visitor experience, and R&D capacity.</figcaption></figure></section><section class="project-block"><div class="section-intro"><div class="eyebrow">Reference Hub</div><h2>The Reference Model: Las Terrenas / Northeast DR</h2><p>Las Terrenas is positioned as a full model farm hub, not a small pilot greenhouse. The hub is designed to serve resorts, chefs, restaurants, distributors, wellness buyers, specialty retailers, and fresh local supply channels with premium produce grown close to market.</p><p>The operating corridor connects Las Terrenas, Sánchez, and Río San Juan, with commercial reach toward Santo Domingo, Punta Cana, Cap Cana, Casa de Campo, and the North Coast where appropriate. Detailed financial projections remain reserved for qualified investor review.</p></div><div class="project-metrics">${metrics.map(([label,value]) => `<article><strong>${esc(label)}</strong><span>${esc(value)}</span></article>`).join('')}</div></section><section class="project-block"><div class="section-intro"><div class="eyebrow">Hub Layout</div><h2>Model Farm Hub Campus</h2><p>The visual is an illustrative planning reference for a diversified controlled-environment agriculture campus with production greenhouses, microgreens, mushrooms, specialty substrate crops, medicinal and wellness plants, processing, cold chain, logistics, utilities, staff facilities, visitor experience, and R&D / training capacity.</p></div><figure class="project-feature-image"><button class="project-image-button" data-action="openImageLightbox" data-image="${esc(layoutImage)}" data-title="Las Terrenas / Northeast DR Model Farm Hub"><img src="${esc(layoutImage)}" alt="Panoramic illustrated model farm hub for Las Terrenas Northeast Dominican Republic"></button><figcaption>Illustrative model based on initial project design. Final layout remains subject to site conditions, engineering, budget, permitting, buyer demand, and phased implementation.</figcaption></figure></section><section class="project-block"><div class="section-intro"><h2>Four Complementary Growing Systems</h2><p>The hub model is diversified by design, supporting fresh produce, chef-focused crops, wellness-oriented crops, mushrooms, and value-added product pathways.</p></div><div class="project-card-grid four">${systems.map(([title,body]) => `<article class="project-card"><strong>${esc(title)}</strong><p>${esc(body)}</p></article>`).join('')}</div></section><section class="project-block"><div class="section-intro"><h2>Built as a Complete Operating Hub</h2><p>The Las Terrenas hub concept includes the infrastructure required to grow, process, protect, pack, store, manage, and deliver premium products with commercial discipline.</p></div><div class="project-card-grid">${infrastructure.map(([title,body]) => `<article class="project-card"><strong>${esc(title)}</strong><p>${esc(body)}</p></article>`).join('')}</div></section><section class="project-block"><div class="section-intro"><h2>Visitor Experience, Training & Demonstration Value</h2><p>The model farm can also support farm visits, chef sampling, guided tours, harvest list presentation, culinary experiences, training, and tasteful farm-to-table or herbal tea workshop concepts for tourism-driven markets.</p><button class="ghost-btn" data-route="contact">Discuss Demonstration Opportunities</button></div><div class="project-card-grid four">${education.map(([title,body]) => `<article class="project-card"><strong>${esc(title)}</strong><p>${esc(body)}</p></article>`).join('')}</div></section><section class="project-block"><div class="section-intro"><h2>What We Offer</h2><p>Through the SymbioGreens and Balponics model, the project can be adapted into different farm formats depending on land size, market demand, climate conditions, budget, crop strategy, energy profile, and operational goals.</p></div><div class="project-card-grid">${offers.map(([title,body]) => `<article class="project-card service"><strong>${esc(title)}</strong><p>${esc(body)}</p></article>`).join('')}</div></section><section class="project-block regional-models"><div class="section-intro"><div class="eyebrow">Dominican Republic First, Caribbean Next</div><h2>Designed for Caribbean Replication</h2><p>The Las Terrenas / Northeast DR model is designed as a reference platform that can be adapted to different Caribbean and island markets after the Dominican Republic launch path is validated. Each market may require a different configuration depending on land availability, tourism demand, import dependence, buyer concentration, water access, energy costs, logistics, and local operating capacity.</p><p>These examples are not presented as confirmed projects. They are illustrative replication models showing how SymbioGreens / Balponics can adapt the same core production logic to different island realities.</p></div><div class="regional-grid">${regional.map(([title,subtitle,body,img,bullets]) => `<article class="regional-card"><button class="project-image-button" data-action="openImageLightbox" data-image="${esc(img)}" data-title="${esc(title)}"><img src="${esc(img)}" alt="${esc(title)}"></button><div class="regional-card-body"><span>${esc(subtitle)}</span><h3>${esc(title)}</h3><p>${esc(body)}</p><ul>${bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul><button class="ghost-btn" data-action="openImageLightbox" data-image="${esc(img)}" data-title="${esc(title)}">View Model Concept</button></div></article>`).join('')}</div></section>${projectInnovationSections()}<section class="project-block"><div class="section-intro"><h2>Where This Model Fits</h2><p>The model can be adapted to markets where freshness, reliability, presentation, and proximity create value. Each project should be shaped by buyer demand, land conditions, climate realities, energy profile, logistics, and operational capacity.</p></div><div class="application-grid">${applications.map(item => `<span>${esc(item)}</span>`).join('')}</div></section><section class="project-cta"><div><h2>Build Resilient Local Production Systems</h2><p>From renewable-first infrastructure to water monitoring, crop trials, and future food research, SymbioGreens and Balponics are building a platform for cleaner, smarter, and more resilient food production.</p></div><div class="hero-actions"><button class="primary-btn" data-route="contact">Discuss a Project</button><button class="ghost-btn" data-route="investors">Investor & Partnership Review</button><button class="ghost-btn" data-route="contact">Contact Us</button></div></section></section>`;
              }
              function projectInnovationSections() {
                const sections = [
                  {
                    eyebrow:'Renewable Energy',
                    title:'Renewable-First Energy Strategy',
                    subtitle:'Clean power, resilient farms, sustainable growth.',
                    image:'public/company/farms-renewable-first-energy-strategy.png',
                    alt:'Renewable-first energy strategy showing solar-led greenhouse power, battery storage, smart energy management, cold room support, and resilient farm infrastructure.',
                    body:['SymbioGreens and Balponics are designed around a renewable-first energy strategy. In Caribbean and island markets where sunlight is abundant and energy costs can be volatile, solar-led infrastructure, battery storage where feasible, efficient farm design, and smart energy management can strengthen operational resilience and improve long-term economics.','The objective is not to make unrealistic claims of immediate full independence from the grid. The objective is to design farms that reduce exposure to energy volatility, improve continuity during disruptions, and support cleaner production through practical renewable integration.'],
                    cards:[['Solar-Led Power','High-efficiency solar arrays can support daily farm operations, irrigation, lighting, monitoring, packing, and cold-chain support where technically and economically feasible.'],['Battery Storage','Battery systems can store excess solar energy for peak demand, night operations, and critical systems such as monitoring, pumps, and cold storage.'],['Hybrid Backup Planning','Backup systems may still be required for continuity during storms, extended cloudy periods, technical faults, or grid disruptions.'],['Smart Energy Management','Monitoring and automation can help schedule loads, reduce waste, protect equipment, and improve operational reliability.'],['Stronger Margins & Resilience','Lower exposure to unpredictable energy costs can improve planning, protect freshness, and support more resilient unit economics.']]
                  },
                  {
                    eyebrow:'Monitoring Architecture',
                    title:'Water & Nutrient Monitoring Station',
                    subtitle:'Smart control. Precise monitoring. Consistent growth.',
                    image:'public/company/farms-water-nutrient-monitoring-station.png',
                    alt:'Water and nutrient monitoring station showing pH and EC tracking, irrigation control, recirculation, filtration, pumps, sensors, and nutrient delivery to hydroponic crops.',
                    body:['Controlled-environment agriculture depends on disciplined water and nutrient management. Monitoring pH, EC, temperature, flow, irrigation timing, filtration, and recirculation helps protect crop health, reduce waste, and improve consistency across production cycles.','This is presented as a planned monitoring architecture and target operating model, subject to site conditions, engineering design, equipment selection, and phased implementation.'],
                    cards:[['Water Quality','Continuous monitoring of key water parameters supports a clean and stable foundation for plant health.'],['pH / EC Tracking','Real-time measurement helps maintain nutrient availability and supports better plant uptake.'],['Irrigation Control','Automated scheduling and dosing can deliver water and nutrients at the right time and in the right quantity.'],['Recirculation','Closed-loop or semi-closed systems can reduce water waste and improve resource efficiency.'],['Data-Informed Growing','Centralized monitoring gives operators better visibility into system performance, crop needs, and potential problems.'],['System Reliability','Redundant components, alerts, and routine monitoring help protect crops and reduce operational risk.']]
                  },
                  {
                    eyebrow:'R&D Platform',
                    title:'Research, Development & Future Food Systems',
                    subtitle:'Advancing sustainable agriculture through science, technology, and integrated systems.',
                    image:'public/company/farms-rd-future-food-systems.png',
                    alt:'Research and development greenhouse showing crop trials, system optimization, water and nutrient efficiency, automation, renewable integration, and future food systems.',
                    body:['The SymbioGreens / Balponics model is designed to evolve through applied research, crop trials, system optimization, automation, data collection, and continuous improvement. The goal is to test what works locally, refine production protocols, improve resilience, and build a platform that can adapt to different Caribbean and island market conditions.'],
                    cards:[['Crop Trials','Testing varieties and growing techniques to identify high-performing crops for local buyers, climate conditions, and market demand.'],['System Optimization','Refining growing environments, irrigation, spacing, lighting, airflow, and workflows to improve quality and operational efficiency.'],['Water & Nutrient Efficiency','Studying fertigation, nutrient delivery, and recirculation to reduce waste and improve crop performance.'],['Automation & Monitoring','Using sensors, data, alerts, and control systems to support better decisions and consistent operations.'],['Renewable Integration','Studying how solar, batteries, efficient equipment, and smart energy scheduling can support resilient production.'],['Future Food Systems','Designing scalable, nutritious, local production systems that can strengthen community resilience and long-term food security.']]
                  },
                  {
                    eyebrow:'Biological Innovation',
                    title:'Future Food Systems & Biological Innovation',
                    subtitle:'Research today, resilience tomorrow.',
                    image:'public/company/farms-biological-innovation-future-resilience.png',
                    alt:'Biological innovation concept showing exploratory algae research, biological systems, sustainable inputs, emerging technologies, and future food resilience.',
                    body:['Beyond immediate production, the platform can support exploratory research into biological systems, sustainable inputs, algae research, beneficial microorganisms, biostimulants, automation, and integrated future food solutions. These areas are research pathways and future opportunities, not guaranteed commercial technologies.'],
                    cards:[['Exploratory Algae Research','Investigating algae biology, strain discovery, and potential applications in nutrition, agriculture, and bioproducts.'],['Biological Systems','Studying soil microbiomes, beneficial microorganisms, plant interactions, and biological inputs that may support healthier growing systems.'],['Sustainable Inputs','Evaluating biofertilizers, biostimulants, compost-derived products, and other inputs that may reduce external dependencies.'],['Emerging Technologies','Exploring automation, sensors, AI-supported analysis, and data platforms to improve system efficiency and monitoring.'],['Innovation Pathway','Using iterative research, validation, and integration to move promising ideas from concept to practical application.'],['Future Resilience','Building adaptive production systems that can support people, communities, and markets in the face of climate, logistics, and supply-chain challenges.']]
                  }
                ];
                return `<section class="project-innovation-stack">${sections.map((section, index) => `<article class="project-innovation-section ${index % 2 ? 'reverse' : ''}"><div class="project-innovation-copy"><div class="eyebrow">${esc(section.eyebrow)}</div><h2>${esc(section.title)}</h2><p class="project-innovation-subtitle">${esc(section.subtitle)}</p>${section.body.map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}<div class="project-innovation-cards">${section.cards.map(([title,body], cardIndex) => `<article class="${cardIndex === 0 ? 'active' : ''}"><span>${String(cardIndex + 1).padStart(2,'0')}</span><strong>${esc(title)}</strong><p>${esc(body)}</p></article>`).join('')}</div></div><figure class="project-innovation-visual"><button class="project-image-button" data-action="openImageLightbox" data-image="${esc(section.image)}" data-title="${esc(section.title)}"><img src="${esc(section.image)}" alt="${esc(section.alt)}"></button></figure></article>`).join('')}</section>`;
              }
              function productsPanel(compact) {
                const cats = categories();
                const selected = state.category || cats[0]?.id;
                const allProducts = products();
                if (compact) {
                  const featured = cats.map(c => allProducts.find(p => p.category_id === c.id)).filter(Boolean).slice(0, 4);
                  return `<section class="public-products-section product-preview-section"><div class="toolbar"><div><div class="eyebrow">${esc(t('products'))}</div><h2>${esc(t('publicProductsTitle'))}</h2><p>${esc(t('productsPageBody'))}</p></div><button class="primary-btn" data-route="products">${esc(t('explore'))}</button></div><div class="public-product-grid">${featured.map(productCardPublic).join('')}</div></section>`;
                }
                const visible = allProducts.filter(p => !selected || p.category_id === selected).filter(p => productName(p).toLowerCase().includes(state.search.toLowerCase()));
                return `<section class="public-products-section"><div class="toolbar"><div><div class="eyebrow">${esc(t('products'))}</div><h2>${esc(compact ? t('publicProductsTitle') : t('productsPageTitle'))}</h2><p>${esc(t('productsPageBody'))}</p></div><button class="primary-btn" data-action="startProductionSurvey">${esc(t('takeSurvey'))}</button></div><div class="public-category-row">${cats.map(c => `<button class="public-category-chip ${selected===c.id?'active':''}" data-category="${esc(c.id)}"><span class="category-thumb">${esc((c.family || c.name).slice(0,2).toUpperCase())}</span>${esc(categoryLabel(c.id))}</button>`).join('')}</div>${categoryIntro(selected)}<div class="form-grid"><label><span>${esc(t('Search'))}</span><input type="search" data-search value="${esc(state.search)}" placeholder="${esc(t('Search products'))}"></label></div><div class="public-product-grid">${visible.slice(0, compact ? 8 : visible.length).map(productCardPublic).join('')}</div></section>`;
              }
              function categoryIntro(id) {
                const story = state.lang === 'en' ? (CATEGORY_STORIES[id] || []) : list('categoryIntroPoints');
                const living = dict('livingOptions')[id];
                return `<div class="category-intro"><article class="card"><h3>${esc(categoryLabel(id))}</h3>${story.map(s => `<p>${esc(s)}</p>`).join('')}${living ? `<p><strong>${esc(living)}</strong></p>` : ''}<button class="ghost-btn" data-action="startProductionSurvey">${esc(t('takeSurvey'))}</button></article></div>`;
              }
              function productCardPublic(p) {
                return `<article class="card public-product-card" data-action="openProduct" data-product="${esc(p.id)}"><img src="${esc(imageFor(p))}" alt="${esc(productName(p))}"><h3>${esc(productName(p))}</h3><p>${esc(localizedProductCopy(p.flavor_profile))}</p><button class="ghost-btn" data-action="openProduct" data-product="${esc(p.id)}">${esc(t('viewDetails'))}</button></article>`;
}
function teamOperationsShortPanel() {
  return `<section class="team-operations-section home-team-operations-section"><div class="team-operations-copy"><div class="eyebrow">${esc(t('team'))}</div><h2>${esc(t('operationsHomeTitle'))}</h2><p>${esc(t('operationsHomeBody'))}</p><div class="team-operations-list">${list('operationsHomeCards').map(card => `<article><strong>${esc(card[0])}</strong><p>${esc(card[1])}</p></article>`).join('')}</div><button class="primary-btn" data-route="team">${esc(t('meetTeam'))}</button></div><figure class="team-operations-image-card"><img src="public/company/production/team-operations.png" alt="SymbioGreens team and daily operations handling premium fresh produce"></figure></section>`;
}
function teamOperationsPanel() {
  const operationCards = [
    ['Greenhouse Production Team','Daily crop care, greenhouse routines, hydroponic system monitoring, plant health observation, and production execution inside the growing areas.','public/company/production/team-greenhouse-production.png'],
    ['Nursery & Propagation','Seed starting, young plant care, propagation scheduling, transplant readiness, and early-stage crop quality control.','public/company/production/team-nursery-propagation.png'],
    ['Harvest & Packing','Harvest discipline, product handling, washing, grading, packing, labeling, and preparation for buyer delivery.','public/company/production/team-harvest-packing.png'],
    ['Quality Control','Visual inspection, freshness checks, crop consistency, hygiene standards, traceability, and presentation quality.','public/company/production/team-quality-control.png'],
    ['Cold Chain & Delivery','Cold holding, delivery preparation, route coordination, electric delivery logistics, and freshness protection from farm to buyer.','public/company/production/team-cold-chain-delivery.png'],
    ['Training & Technical Support','Team training, SOP implementation, hydroponic system support, equipment checks, crop planning, and continuous operational improvement.','public/company/production/team-training-technical-support.png'],
  ];
  const culture = ['Daily crop monitoring','Clean harvest and packing routines','Quality-focused handling','Buyer-responsive scheduling','Technical system oversight','Training and continuous improvement'];
  return `<section class="team-page" id="team"><section class="team-page-hero"><div class="eyebrow">${esc(t('team'))}</div><h1>${esc(t('Team & Operations'))}</h1><p>${esc(t('SymbioGreens is built around disciplined greenhouse operations, trained production teams, and executive leadership capable of supporting premium hydroponic production, buyer reliability, and scalable project development.'))}</p></section><section class="team-operations-gallery"><div class="toolbar"><div><div class="eyebrow">${esc(t('Farm Team'))}</div><h2>${esc(t('Farm Team & Operations'))}</h2><p>${esc(t('Our operational model depends on trained teams working across production, propagation, harvesting, packing, quality control, cold chain, delivery, and technical support. This is the daily execution behind premium local freshness.'))}</p></div></div><div class="team-image-grid">${operationCards.map(([title,body,img]) => `<article class="team-image-card"><img src="${esc(img)}" alt="${esc(title)}"><div><h3>${esc(title)}</h3><p>${esc(body)}</p></div></article>`).join('')}</div></section><section class="operations-culture-section"><div class="section-intro"><div class="eyebrow">${esc(t('Operations Culture'))}</div><h2>${esc(t('Built for Disciplined Execution'))}</h2></div><div class="operations-culture-grid">${culture.map(item => `<span>${esc(t(item))}</span>`).join('')}</div></section><section class="leadership-section team-executive-section"><div class="toolbar"><div><div class="eyebrow">${esc(t('Executive Leadership'))}</div><h2>${esc(t('Executive Leadership'))}</h2><p>${esc(t('The founding leadership behind a new generation of premium, resilient, and technology-enabled agribusiness in the Caribbean.'))}</p></div></div>${executiveLeadershipCards()}</section></section>`;
}
function executiveLeadershipCards() {
  return `<div class="executive-profile-grid">${executiveProfiles().map(profile => `<article class="executive-profile-card"><img src="${esc(profile.image)}" alt="${esc(profile.name)} executive portrait"><div class="executive-profile-body"><h3>${esc(profile.name)}</h3><strong>${esc(profile.title)}</strong><p class="executive-tagline">${esc(profile.tagline)}</p><div class="tag-row">${profile.highlights.map(item => `<span class="tag">${esc(item)}</span>`).join('')}</div><button class="ghost-btn" data-action="openExecutiveProfile" data-executive="${esc(profile.id)}">${esc(t('viewProfile'))}</button></div></article>`).join('')}</div>`;
}
function executiveProfiles() {
  return [
    {
      id:'bernard-balmir',
      name:'Bernard Balmir',
      title:'Founder & Chief Executive Officer',
      tagline:'Multilingual entrepreneur, innovation strategist, and agritech founder with 30+ years of experience across telecom, emerging markets, sustainable agriculture, and business development.',
      image:'public/company/production/executive-bernard-balmir.png',
      highlights:['Vision & strategy','Investor relations','Market expansion','Controlled-environment agriculture'],
      bio:[
        'Bernard Balmir is a multilingual entrepreneur, executive strategist, and innovation-driven business builder with more than three decades of experience across telecommunications, fintech, prepaid services, international business development, agritech, hydroponics, and sustainable production systems.',
        'Trained with a strong business and legal foundation, Bernard developed an entrepreneurial mindset early in life and built his career around innovation, niche markets, and practical execution. In the United States, he was among the early pioneers of pinless prepaid long-distance calling, helping disrupt a prepaid calling-card industry that had remained largely unchanged for years.',
        'Over the course of his career, Bernard has led and participated in ventures across the Caribbean, the United States, Latin America, Europe, and Africa, with experience in executive leadership, business development, sales strategy, market entry, strategic partnerships, customer operations, and commercial scaling.',
        'In recent years, Bernard has focused his energy on controlled-environment agriculture, hydroponics, specialty crops, mushrooms, circular production systems, and sustainable food infrastructure through Balponics and related initiatives.',
        'As CEO, Bernard leads the company vision, strategy, partnerships, investor relations, business model, brand positioning, and long-term expansion across the Dominican Republic, Haiti, and the wider Caribbean.'
      ]
    },
    {
      id:'bertrand-roc',
      name:'Bertrand Roc',
      title:'Chief Information Officer & Chief Security Officer',
      tagline:'Information technology executive, enterprise systems leader, and security-focused operator with experience across IT services, digital infrastructure, managed systems, and institutional technology operations.',
      image:'public/company/production/executive-bertrand-roc.png',
      highlights:['Information systems','Cybersecurity governance','Digital infrastructure','Institutional operations'],
      bio:[
        'Bertrand Roc is an information technology executive, digital infrastructure strategist, and business leader with extensive experience across enterprise IT services, technology distribution, managed systems, cybersecurity awareness, and institutional operations. As Chief Information Officer and Chief Security Officer, Bertrand brings to the company a strong combination of technical education, business leadership, operational discipline, and trusted professional credibility.',
        'Bertrand studied Information Technology at New England Institute of Technology in the United States, building a strong foundation in computer systems, digital infrastructure, networking, enterprise technology operations, and information management. His academic background, combined with years of practical leadership in the field, has allowed him to understand technology not only as hardware and software, but as a strategic operating backbone for modern businesses.',
        'Over the course of his career, Bertrand has been closely associated with Keijzer Computer SA, one of Haiti\'s recognized technology companies, active in computer equipment, accessories, IT services, enterprise support, and technology solutions. Through this work, he gained broad experience serving corporate clients, institutions, and large-volume customers, with responsibilities touching procurement, bulk sales, technical service delivery, client relationships, inventory management, and business operations.',
        'Bertrand is also associated with ITTEK PRO, a managed service provider based in Port-au-Prince, reflecting his continued involvement in professional IT services, managed technology support, connectivity, systems administration, and enterprise solutions. His experience positions him as a valuable technology leader for a modern agribusiness platform where digital systems, secure communications, data protection, and operational reliability are essential.',
        'Beyond his business and technology background, Bertrand is publicly recognized as Honorary Consul of the Netherlands in Haiti, a role that reflects credibility, discretion, institutional trust, and the ability to operate professionally with international stakeholders.',
        'Within the company, Bertrand\'s role is critical to the design and supervision of information systems, cybersecurity protocols, access control, internal communications, data management, digital infrastructure, and technology governance. As the company scales across production sites, investor relations, logistics, farm operations, and digital monitoring systems, secure and reliable information architecture will be essential.',
        'As CIO and Chief Security Officer, Bertrand Roc represents the company\'s digital and security backbone: a technology executive capable of aligning business operations, information systems, cybersecurity, connectivity, and institutional reliability into a professional platform for growth.'
      ]
    },
    {
      id:'marcel-bernard-villedrouin',
      name:'Marcel Bernard Villedrouin',
      title:'Co-Founder & Chief Operating Officer',
      tagline:'Agribusiness operator, food-distribution executive, and heir to a Haitian legacy of agriculture, importation, and ecological innovation.',
      image:'public/company/production/executive-marcel-bernard-villedrouin.png',
      highlights:['Operations execution','Food distribution','Procurement & logistics','Quality discipline'],
      bio:[
        'Marcel Bernard Villedrouin is a Haitian entrepreneur, agribusiness operator, and business executive with nearly three decades of experience across food products, importation, distribution, manufacturing, and agricultural ventures.',
        "Trained in Business Administration, Marcel has spent more than 25 years building and managing businesses connected to food supply, consumer products, agriculture, and commercial distribution. He is associated with Minaya Spices and Maison Ville-Drouin, two names tied to Haiti's food and product distribution sectors.",
        "Marcel also comes from one of Haiti's recognized entrepreneurial families. His father, Philippe Villedrouin, was the founder and driving force behind Le Montcel, an ecological and agricultural property in the Kenscoff/Belot area connected to agriculture, environmental stewardship, rural development, and local production.",
        'His experience gives him practical knowledge of procurement, logistics, wholesale markets, inventory management, customer relationships, and the realities of operating in complex Caribbean environments.',
        'As COO, Marcel brings operational leadership, commercial realism, supplier and market experience, and grounded execution across procurement, production planning, logistics, distribution, quality control, and day-to-day operations.'
      ]
    },
    {
      id:'fritz-dambreville',
      name:'Fritz Dambreville',
      title:'Chief Technology Officer',
      tagline:'Multidisciplinary technologist, inventor, and systems builder with 30+ years of experience in business management, applied innovation, biofuels, hydroponics, and sustainable production systems.',
      image:'public/company/production/executive-fritz-dambreville.png',
      highlights:['Systems design','Applied innovation','Automation & integration','Sustainable production'],
      bio:[
        'Fritz Dambreville is a multidisciplinary technologist, inventor, builder, and solutions-driven executive with more than 30 years of experience across business management, technology innovation, applied research, and practical engineering. As Chief Technology Officer, Fritz brings to the project a rare combination of technical intelligence, hands-on problem solving, and the ability to transform complex ideas into workable systems.',
        'With a background in Industrial Engineering, Fritz has built his career around innovation, experimentation, and execution. He is the type of technical leader who does not simply analyze problems from a distance; he studies them, breaks them down, builds solutions, tests them, improves them, and finds practical ways to make them work in real conditions. His strength lies in connecting engineering logic with business reality.',
        'Over the course of his career, Fritz has worked across Haiti and the United States, including Miami, developing experience in business operations, technology systems, product development, research, and applied innovation. His work has touched multiple disciplines, including biofuels, alternative energy, hydrofuels, hydroponics, mechanical systems, and sustainable production concepts. This broad technical range gives him the ability to evaluate a project not only from one angle, but as a complete operating system.',
        'Fritz has also been a long-standing collaborator and trusted strategic partner of Bernard Balmir. Their collaboration goes back to Bernard\'s first major business projects, where Fritz played an important role as a technical thinker, builder, and solutions partner. That history creates a strong foundation of trust, shared vision, and practical understanding between the company\'s leadership and its technology direction.',
        'Within the project, Fritz\'s role is central to systems design, technical evaluation, innovation, automation, research, equipment integration, and operational problem solving. His contribution supports the company\'s ability to develop controlled-environment farms that are efficient, scalable, resilient, and technically sound.',
        'As CTO, Fritz Dambreville represents the project\'s technical backbone: an inventor, builder, and multidisciplinary problem solver with the experience, creativity, and discipline required to support a new generation of sustainable agribusiness systems in Haiti, the Dominican Republic, and the wider Caribbean.'
      ]
    }
  ];
}
function founderProfileCompactPanel() {
  return `<section class="leadership-section about-founder-profile"><div class="toolbar"><div><div class="eyebrow">${esc(t('team'))}</div><h2>${esc(t('teamTitle'))}</h2><p>${esc(t('teamText'))}</p></div></div><div class="leadership-grid">${founderProfileCompactCard()}</div></section>`;
}
function founderProfileCompactCard() {
  return `<article class="leader-card leader-card-primary founder-profile-compact"><div class="leader-avatar">${esc(FOUNDER_PROFILE.name.split(' ').map(part => part[0]).join(''))}</div><div class="leader-body"><h3>${esc(FOUNDER_PROFILE.name)}</h3><strong>${esc(t('founderTitle'))}</strong><p>${esc(t('founderBio'))}</p><p>${esc(t('founderVision'))}</p><div class="tag-row">${list('founderTags').map(tag => `<span class="tag">${esc(tag)}</span>`).join('')}</div></div></article>`;
}
function contactPanel() {
  if (state.route !== 'contact') return contactCompactPanel();
  return contactFullPanel();
}
function contactCompactPanel() {
  return `<section class="contact-section"><div><div class="eyebrow">${esc(t('contact'))}</div><h2>${esc(t('contactTitle'))}</h2><p>${esc(t('contactBody'))}</p><div class="contact-actions"><a class="primary-btn" href="mailto:me@balponics.com">me@balponics.com</a><a class="ghost-btn" href="mailto:bbalmir@gmail.com">bbalmir@gmail.com</a></div></div><form class="form-panel" data-form="contact"><h3>${esc(t('inquiryForm'))}</h3><label><span>${esc(t('name'))}</span><input name="name" required></label><label><span>${esc(t('email'))}</span><input name="email" type="email" required></label><label><span>${esc(t('city'))}</span><input name="region"></label><label><span>${esc(t('message'))}</span><textarea name="message" required></textarea></label><button class="primary-btn">${esc(t('sendInquiry'))}</button></form></section>`;
}
function contactFullPanel() {
  const heroLabels = list('contactHeroLabels');
  const inquiryCards = list('contactInquiryCards');
  const inquiryOptions = list('contactInquiryOptions');
  const orgOptions = list('contactOrgOptions');
  const processSteps = list('contactProcessSteps');
  const regionalCards = list('contactRegionalCards');
  const regionalValues = list('contactRegionalValues');
  const inquiryOptionMarkup = inquiryOptions.map(([value, label]) => `<option value="${esc(value)}" ${state.contactInquiryType === value ? 'selected' : ''}>${esc(label)}</option>`).join('');
  const orgOptionMarkup = orgOptions.map(label => `<option value="${esc(label)}">${esc(label)}</option>`).join('');
  return `<section class="contact-page"><section class="contact-hero-panel"><div class="contact-hero-copy"><div class="eyebrow">${esc(t('contact'))}</div><h1>${esc(t('contactHeroTitle'))}</h1><p>${esc(t('contactHeroBody'))}</p><p>${esc(t('contactHeroSupport'))}</p><div class="contact-pill-row">${heroLabels.map(label => `<span>${esc(label)}</span>`).join('')}</div></div><figure class="contact-visual-card contact-hero-visual"><img src="public/company/production/contact-hero-buyer-project-coordination.png" alt="${esc(t('contactHeroTitle'))}"></figure></section><section class="contact-inquiry-section"><div class="section-intro"><h2>${esc(t('contactInquiryTypesTitle'))}</h2></div><div class="contact-inquiry-grid">${inquiryCards.map(([value, body]) => `<button class="contact-inquiry-card ${state.contactInquiryType === value ? 'active' : ''}" type="button" data-action="setContactInquiry" data-inquiry="${esc(value)}"><strong>${esc((inquiryOptions.find(option => option[0] === value) || [value, value])[1])}</strong><p>${esc(body)}</p></button>`).join('')}</div></section><section class="contact-form-section"><figure class="contact-visual-card contact-form-visual"><img src="public/company/production/contact-send-inquiry-form.png" alt="${esc(t('contactFormTitle'))}"></figure><form class="form-panel contact-routing-form" data-form="contact"><div class="eyebrow">${esc(t('contact'))}</div><h2>${esc(t('contactFormTitle'))}</h2><p>${esc(t('contactFormIntro'))}</p><div class="form-grid"><label><span>${esc(t('fullName'))}</span><input name="name" required></label><label><span>${esc(t('email'))}</span><input name="email" type="email" required></label><label><span>${esc(t('phoneWhatsApp'))}</span><input name="phone"></label><label><span>${esc(t('companyOrganization'))}</span><input name="company"></label><label><span>${esc(t('cityCountry'))}</span><input name="region"></label><label><span>${esc(t('inquiryType'))}</span><select name="inquiry_type" required><option value="">${esc(t('contactSelectInquiryType'))}</option>${inquiryOptionMarkup}</select></label><label class="full"><span>${esc(t('organizationType'))}</span><select name="organization_type"><option value="">${esc(t('contactSelectOrgType'))}</option>${orgOptionMarkup}</select></label><label class="full"><span>${esc(t('messageOpportunity'))}</span><textarea name="message" placeholder="${esc(t('contactMessagePlaceholder'))}" required></textarea></label></div><p class="contact-confidential">${esc(t('contactConfidentialLine'))}</p><button class="primary-btn">${esc(t('sendInquiry'))}</button><p class="contact-prototype-note">${esc(t('contactPrototypeNote'))}</p></form></section><section class="contact-process-section"><div class="section-intro"><h2>${esc(t('contactProcessTitle'))}</h2><p>${esc(t('contactProcessIntro'))}</p></div><figure class="contact-visual-card"><img src="public/company/production/contact-how-to-connect.png" alt="${esc(t('contactProcessTitle'))}"></figure><div class="contact-step-grid">${processSteps.map(([title, body], index) => `<article><span>${String(index + 1).padStart(2,'0')}</span><strong>${esc(title)}</strong><p>${esc(body)}</p></article>`).join('')}</div></section><section class="contact-regional-section"><div class="contact-regional-copy"><div class="eyebrow">${esc(t('contact'))}</div><h2>${esc(t('contactRegionalTitle'))}</h2><h3>${esc(t('contactRegionalSubtitle'))}</h3><p>${esc(t('contactRegionalBody'))}</p></div><figure class="contact-visual-card contact-regional-wide-visual"><img src="public/company/production/contact-regional-caribbean-market-access.png" alt="${esc(t('contactRegionalTitle'))}"></figure><div class="contact-regional-focus-grid"><article><strong>${esc(t('contactRegionalAnchorTitle'))}</strong><p>${esc(t('contactRegionalAnchorBody'))}</p></article><article><strong>${esc(t('contactRegionalHaitiTitle'))}</strong><p>${esc(t('contactRegionalHaitiBody'))}</p></article></div><div class="contact-regional-value-list"><h3>${esc(t('contactRegionalValueTitle'))}</h3><div>${regionalValues.map(([title, body]) => `<article><strong>${esc(title)}</strong><p>${esc(body)}</p></article>`).join('')}</div></div><div class="contact-regional-grid">${regionalCards.map(label => `<span>${esc(label)}</span>`).join('')}</div></section><section class="contact-direct-section"><div><h2>${esc(t('contactDirectTitle'))}</h2><p>${esc(t('contactDirectNote'))}</p></div><div class="contact-direct-grid"><article><strong>${esc(t('contactDirectProject'))}</strong><a href="mailto:me@balponics.com">me@balponics.com</a></article><article><strong>${esc(t('contactDirectFounder'))}</strong><a href="mailto:bbalmir@gmail.com">bbalmir@gmail.com</a></article></div></section><section class="contact-final-cta"><h2>${esc(t('contactFinalTitle'))}</h2><p>${esc(t('contactFinalBody'))}</p><button class="primary-btn" data-action="focusContactForm">${esc(t('sendInquiry'))}</button></section></section>`;
}
function registerPanel() {
  return `<section class="form-panel"><div class="eyebrow">${esc(t('buyerRegistration'))}</div><h1>${esc(t('createBuyerProfile'))}</h1><form data-form="register"><div class="form-grid"><label><span>${esc(t('firstName'))}</span><input name="first_name" required></label><label><span>${esc(t('lastName'))}</span><input name="last_name" required></label><label><span>${esc(t('email'))}</span><input name="email" type="email" required></label><label><span>${esc(t('phone'))}</span><input name="phone"></label><label><span>${esc(t('businessName'))}</span><input name="business_name" required></label><label><span>${esc(t('businessType'))}</span><input name="business_type"></label><label><span>${esc(t('city'))}</span><input name="city"></label><label><span>${esc(t('weeklyBudget'))}</span><input name="weekly_budget"></label><label><span>${esc(t('createPassword'))}</span><input name="password" type="password" required></label></div><label><span>${esc(t('buyerNotes'))}</span><textarea name="notes"></textarea></label><button class="primary-btn">${esc(t('createProfileStart'))}</button></form></section>`;
}
function loginPanel() {
  return `<section class="form-panel"><h1>${esc(t('buyerLogin'))}</h1><form data-form="buyerLogin"><label><span>${esc(t('email'))}</span><input name="email" type="email" required></label><label><span>${esc(t('password'))}</span><input name="password" type="password" required></label><button class="primary-btn">${esc(t('login'))}</button><button class="ghost-btn" type="button" data-route="forgotPassword">${esc(t('forgotPassword'))}</button></form></section>`;
}
function forgotPasswordPanel() {
  return `<section class="form-panel"><h1>${esc(t('forgotPassword'))}</h1><p>Prototype flow: a reset code is generated locally. Production requires secure backend email delivery.</p><form data-form="requestReset"><label><span>${esc(t('email'))}</span><input name="email" type="email" required></label><button class="primary-btn">Generate Local Reset Code</button></form></section>`;
}
function resetPasswordPanel() {
  return `<section class="form-panel"><h1>Reset Password</h1><form data-form="resetPassword"><label><span>${esc(t('email'))}</span><input name="email" type="email" value="${esc(state.resetEmail)}" required></label><label><span>Reset Code</span><input name="reset_code" required></label><label><span>New Password</span><input name="new_password" type="password" required></label><label><span>Confirm Password</span><input name="confirm_password" type="password" required></label><button class="primary-btn">${esc(t('passwordChanged'))}</button></form></section>`;
}
function buyerDashboard() {
  const r = currentRespondent();
  return `<section class="panel"><div class="toolbar"><div><h1>${esc(t('buyerDashboard'))}</h1><p>${esc(r?.email || '')}</p></div><button class="primary-btn" data-route="catalog">${esc(t('catalogSurvey'))}</button></div>${productsPanel(true)}</section>`;
}
function buyerCatalog() {
  return `<section class="layout buyer-survey-layout"><aside class="sidebar">${categories().map(c => `<button class="manager-tab ${state.category===c.id?'active':''}" data-category="${esc(c.id)}">${esc(categoryLabel(c.id))}</button>`).join('')}<button class="primary-btn" data-action="submitCategory">${esc(t('submitCategory'))}</button><button class="ghost-btn" data-action="submitAll">${esc(t('submitAll'))}</button></aside><div><div class="section-intro compact"><div class="eyebrow">${esc(t('catalogSurvey'))}</div><h1>${esc(categoryLabel(state.category))}</h1><p>${esc(t('productsPageBody'))}</p></div><div class="catalog-grid survey-product-grid">${products().filter(p => p.category_id === state.category).map(productSurveyCard).join('')}</div></div></section>`;
}
function productSurveyCard(p) {
  const saved = hasSavedInterest(p.id);
  return `<article class="card product-card survey-product-card ${saved ? 'is-selected' : ''}" data-survey-product="${esc(p.id)}"><div class="survey-product-media"><img src="${esc(imageFor(p))}" alt="${esc(productName(p))}">${saved ? `<span class="saved-badge">${esc(t('interestSaved'))}</span>` : ''}</div><div class="survey-product-copy"><span class="survey-category">${esc(categoryLabel(p.category_id))}</span><h3>${esc(productName(p))}</h3><p>${esc(localizedProductCopy(p.flavor_profile))}</p></div><button class="ghost-btn" data-action="openSurveyProduct" data-product="${esc(p.id)}">${esc(saved ? t('viewDetails') : t('addInterest'))}</button></article>`;
}
function managerRoute() {
  if (state.session?.role === 'buyer') return `<section class="form-panel"><h1>${esc(t('restricted'))}</h1><p>Buyer accounts cannot access manager tools.</p></section>`;
  if (state.session?.role !== 'manager') return managerLoginPanel();
  return managerDashboard();
}
function managerLoginPanel() {
  const setup = !readStore(storeKeys.managerPassphraseHash, '');
  return `<section class="form-panel"><h1>${esc(setup ? t('managerSetup') : t('managerLogin'))}</h1><p>${esc(t('managerLoginBody'))}</p><form data-form="managerLogin"><label><span>${esc(t('email'))}</span><input name="email" type="email" required></label><label><span>${esc(t('passphrase'))}</span><input name="password" type="password" required></label>${setup ? `<label><span>${esc(t('confirmPassphrase'))}</span><input name="confirm_password" type="password" required></label>` : ''}<button class="primary-btn">${esc(t('login'))}</button></form></section>`;
}
function managerDashboard() {
  const tabs = [['overview',t('adminOverview')],['users',t('adminUsers')],['demand',t('adminDemand')],['samples',t('adminSamples')],['investors',t('adminInvestors')],['exports',t('adminExports')]];
  return `<section class="manager-shell"><aside class="manager-tabs">${tabs.map(([id,label]) => `<button class="manager-tab ${state.managerTab===id?'active':''}" data-manager-tab="${id}">${esc(label)}</button>`).join('')}</aside><div class="manager-content"><h1>${esc(t('managerDashboard'))}</h1>${managerContent()}</div></section>`;
}
function managerContent() {
  if (state.managerTab === 'users') return usersAdmin();
  if (state.managerTab === 'demand') return tableView(readStore(storeKeys.responses, []));
  if (state.managerTab === 'samples') return tableView(readStore(storeKeys.samples, []));
  if (state.managerTab === 'investors') return tableView(readStore(storeKeys.investorRequests, []));
  if (state.managerTab === 'exports') return `<div class="card"><button class="primary-btn" data-action="exportWorkbook">Export Workbook</button><button class="ghost-btn" data-action="exportRespondents">Export Respondents CSV</button></div>`;
  return `${adminStatsPanel()}<div class="chart-grid"><div class="card"><h3>Recent Buyer Profiles</h3>${tableView(readStore(storeKeys.respondents, []).slice(-6))}</div><div class="card"><h3>Email Log</h3>${tableView(readStore(storeKeys.emails, []).slice(-6))}</div></div>`;
}
function adminStatsPanel() {
  const activeCats = categories().filter(c => c.status === 'active').length;
  const rows = [[t('activeCategories'),activeCats],[t('approvedProducts'),products().length],[t('compatibleCategories'),categories().length],[t('submittedSurveys'),asArray(readStore(storeKeys.surveys, [])).length],[t('buyerProfiles'),asArray(readStore(storeKeys.respondents, [])).length],[t('sampleRequests'),asArray(readStore(storeKeys.samples, [])).length]];
  return `<div class="dashboard-grid">${rows.map(([label,value]) => `<article class="metric"><strong>${esc(value)}</strong><span>${esc(label)}</span></article>`).join('')}</div>`;
}
function usersAdmin() {
  const rows = asArray(readStore(storeKeys.respondents, []));
  return `<div class="card">${rows.length ? rows.map(r => `<div class="bar-row"><strong>${esc(r.email)}</strong><span>${esc(r.account_status || 'Active')}</span><button class="ghost-btn" data-action="activateUser" data-user="${esc(r.id)}">Activate</button><button class="ghost-btn" data-action="deactivateUser" data-user="${esc(r.id)}">Deactivate</button><button class="ghost-btn" data-action="resetUserPassword" data-user="${esc(r.id)}">Reset Password</button></div>`).join('') : esc(t('noData'))}</div>`;
}
function tableView(rows) {
  rows = asArray(rows);
  if (!rows.length) return `<p>${esc(t('noData'))}</p>`;
  const heads = [...new Set(rows.flatMap(r => Object.keys(r)))].slice(0,8);
  return `<div class="table-wrap"><table><thead><tr>${heads.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${heads.map(h => `<td>${esc(Array.isArray(r[h]) ? r[h].join(', ') : r[h] ?? '')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function investorModel() { return window.SYMBIOGREENS_INVESTOR_MODEL || {}; }
function investorSessionId() {
  let id = readStore(storeKeys.investorInteractionSession, '');
  if (!id) {
    id = uid('inv_session');
    writeStore(storeKeys.investorInteractionSession, id);
  }
  return id;
}
function money(value) {
  return new Intl.NumberFormat('en-US', {style:'currency', currency: investorModel().currency || 'USD', maximumFractionDigits:0}).format(Number(value || 0));
}
function percent(value, digits = 2) { return `${Number(value || 0).toFixed(digits)}%`; }
function contributionAnalysis(amount = state.investorAnalysis.contribution) {
  const model = investorModel();
  const raiseTarget = model.raiseTarget || 2200000;
  const contribution = Math.max(0, Math.min(Number(amount || 0), raiseTarget));
  const shareOfRaise = raiseTarget ? contribution / raiseTarget : 0;
  const equityPool = model.investorEquityPoolPercent || model.maxInvestorEquityPercent || 30;
  const estimatedEquity = Math.min(shareOfRaise * equityPool, model.maxInvestorEquityPercent || 30);
  return {
    contribution,
    shareOfRaisePercent: shareOfRaise * 100,
    estimatedEquityPercent: estimatedEquity,
    founderAllocation: contribution * ((model.founderDevelopmentAllocationPercent || 10) / 100),
    remainingRaise: Math.max(raiseTarget - contribution, 0)
  };
}
function selectedFirstHubScenario() {
  return (investorModel().firstHubScenarios || []).find(item => item.id === state.investorScenario) || (investorModel().firstHubScenarios || [])[1] || {};
}
function platformAnalysis() {
  const model = investorModel();
  const hubs = Math.max(1, Number(state.investorHubs || model.hubAssumptions?.defaultHubCount || 1));
  const revenuePerHub = Math.max(0, Number(state.investorAnalysis.revenuePerHub || model.hubAssumptions?.defaultRevenuePerHub || 0));
  const ebitdaMargin = Math.max(0, Number(state.investorAnalysis.ebitdaMargin || 0)) / 100;
  const valuationMultiple = Math.max(0, Number(state.investorAnalysis.valuationMultiple || 0));
  const totalRevenue = hubs * revenuePerHub;
  const totalEbitda = totalRevenue * ebitdaMargin;
  const valuation = totalEbitda * valuationMultiple;
  const equity = contributionAnalysis().estimatedEquityPercent / 100;
  return {hubs, revenuePerHub, ebitdaMargin, valuationMultiple, totalRevenue, totalEbitda, valuation, theoreticalInvestorValue: valuation * equity};
}
function investorEngagementLevel(score) {
  const levels = investorModel().engagementScoring?.levels || [];
  return levels.find(item => score >= item.min && score <= item.max) || {level:'cold', followUp:'No immediate action or nurture follow-up.'};
}
function calculateInvestorEngagementScore(sessionId = investorSessionId()) {
  const events = asArray(readStore(storeKeys.investorInteractionEvents, [])).filter(event => event.session_id === sessionId);
  const weights = investorModel().engagementScoring?.weights || {};
  let score = 0;
  let highest = 0;
  let lastContribution = 0;
  const scenarios = new Set();
  events.forEach(event => {
    score += weights[event.event_type] || 0;
    const contribution = Number(event.contribution_amount || event.event_payload?.contribution || 0);
    if (contribution) {
      lastContribution = contribution;
      highest = Math.max(highest, contribution);
      if (contribution >= 50000) score += weights.contribution_above_50000 || 0;
      if (contribution >= 100000) score += weights.contribution_above_100000 || 0;
      if (contribution >= 250000) score += weights.contribution_above_250000 || 0;
    }
    if (event.scenario_name) scenarios.add(event.scenario_name);
  });
  const level = investorEngagementLevel(score);
  return {
    session_id: sessionId,
    total_events: events.length,
    calculator_uses: events.filter(event => event.event_type === 'scenario_calculated').length,
    highest_contribution_tested: highest,
    last_contribution_tested: lastContribution,
    markets_viewed: [],
    scenarios_viewed: [...scenarios],
    submitted_interest: events.some(event => event.event_type === 'non_binding_interest_submitted'),
    requested_review: events.some(event => event.event_type === 'investor_review_requested'),
    engagement_score: score,
    engagement_level: level.level,
    recommended_follow_up: level.followUp,
    updated_at: new Date().toISOString()
  };
}
async function saveInvestorEngagementSnapshot(payload) {
  const rows = asArray(readStore(storeKeys.investorEngagementSnapshots, []));
  rows.push({...payload, id:uid('inv_score'), created_at:new Date().toISOString()});
  writeStore(storeKeys.investorEngagementSnapshots, rows);
  if (window.SymbioGreensBackend?.isBackendEnabled?.()) {
    await window.SymbioGreensBackend.saveInvestorEngagementSnapshot?.(payload);
  }
}
async function trackInvestorEvent(eventType, payload = {}) {
  const sessionId = investorSessionId();
  const row = {
    id: uid('inv_event'),
    session_id: sessionId,
    event_type: eventType,
    event_label: payload.event_label || eventType,
    event_payload: payload,
    contribution_amount: payload.contribution_amount || payload.contribution || null,
    estimated_equity: payload.estimated_equity || payload.estimatedEquityPercent || null,
    scenario_name: payload.scenario_name || payload.scenario || '',
    page_route: location.hash || hashForRoute(state.route),
    source_section: payload.source_section || '',
    language: state.lang,
    backend_enabled: Boolean(window.SymbioGreensBackend?.isBackendEnabled?.()),
    created_at: new Date().toISOString()
  };
  writeStore(storeKeys.investorInteractionEvents, [...asArray(readStore(storeKeys.investorInteractionEvents, [])), row]);
  if (window.SymbioGreensBackend?.isBackendEnabled?.()) {
    await window.SymbioGreensBackend.trackInvestorEvent?.(eventType, row);
  }
  await saveInvestorEngagementSnapshot(calculateInvestorEngagementScore(sessionId));
}
function trackInvestorPageOpenedOnce() {
  if (state._investorPageTracked) return;
  state._investorPageTracked = true;
  trackInvestorEvent('investor_page_opened', {source_section:'investor_page'});
}
function investorMetric(label, value, note = '') {
  return `<article class="investor-metric"><span>${esc(label)}</span><strong>${esc(value)}</strong>${note ? `<small>${esc(note)}</small>` : ''}</article>`;
}
function investorAnalysisPanel() {
  const model = investorModel();
  const analysis = contributionAnalysis();
  const scenario = selectedFirstHubScenario();
  const platform = platformAnalysis();
  const presets = model.contributionPresets || [50000,100000,200000,250000,500000,1000000,2200000];
  const examples = model.examples || presets.map(contributionAnalysis);
  const useOfFunds = model.useOfFunds || [];
  const risks = model.risks || [];
  const scenarioInvestorShare = (scenario.distributableProfit || 0) * (analysis.estimatedEquityPercent / 100);
  return `<section class="investor-analysis-section" id="investor-analysis">
    <div class="section-intro">
      <div class="eyebrow">Investor Analysis</div>
      <h2>From First Hub to Caribbean Platform</h2>
      <p>The Las Terrenas model is designed as the first reference hub for a scalable controlled-environment agriculture platform. The first-hub financials remain grounded in the Northeast Dominican Republic model, while platform scenarios are illustrative only.</p>
    </div>
    <div class="investor-disclaimer compact"><strong>Important notice</strong><p>${esc(model.disclaimer || '')}</p></div>
    <div class="investor-tool-grid">
      <article class="investor-tool-card investor-calculator-card">
        <h3>Investment Participation Calculator</h3>
        <div class="quick-amount-row">${presets.map(value => `<button class="ghost-btn ${Number(state.investorAnalysis.contribution) === value ? 'active' : ''}" type="button" data-action="setInvestorContribution" data-contribution="${value}">${esc(money(value))}</button>`).join('')}</div>
        <div class="form-grid two">
          <label><span>Contribution amount</span><input data-investor-field="contribution" type="number" min="0" max="${esc(model.raiseTarget || 2200000)}" step="1000" value="${esc(state.investorAnalysis.contribution)}"></label>
          <label><span>Investor type</span><select data-investor-field="investorType">${(model.investorTypes || []).map(item => `<option ${state.investorAnalysis.investorType === item ? 'selected' : ''}>${esc(item)}</option>`).join('')}</select></label>
          <label><span>Preferred participation</span><select data-investor-field="participation">${(model.participationTypes || []).map(item => `<option ${state.investorAnalysis.participation === item ? 'selected' : ''}>${esc(item)}</option>`).join('')}</select></label>
          <label><span>Interest level</span><select data-investor-field="interestLevel">${(model.interestLevels || []).map(item => `<option ${state.investorAnalysis.interestLevel === item ? 'selected' : ''}>${esc(item)}</option>`).join('')}</select></label>
        </div>
        <label><span>Notes / comments</span><textarea data-investor-field="notes" placeholder="Optional discussion notes">${esc(state.investorAnalysis.notes || '')}</textarea></label>
        <div class="investor-metric-grid">
          ${investorMetric('Contribution', money(analysis.contribution))}
          ${investorMetric('Share of target raise', percent(analysis.shareOfRaisePercent))}
          ${investorMetric('Estimated equity from 30% pool', percent(analysis.estimatedEquityPercent), 'Capped at 30%')}
          ${investorMetric('Founder/platform allocation portion', money(analysis.founderAllocation), 'Contribution x 10%')}
          ${investorMetric('Remaining raise', money(analysis.remainingRaise))}
        </div>
        <div class="investor-action-row"><button class="primary-btn" type="button" data-action="calculateInvestorScenario">Calculate Investment Scenario</button><button class="ghost-btn" type="button" data-action="submitInvestorInterest">Submit Non-Binding Investor Interest</button><button class="ghost-btn" type="button" data-action="requestInvestorReview">Request Investor Review</button></div>
      </article>
      <article class="investor-tool-card">
        <h3>First Hub Economics</h3>
        <div class="scenario-toggle-row">${(model.firstHubScenarios || []).map(item => `<button class="ghost-btn ${state.investorScenario === item.id ? 'active' : ''}" type="button" data-action="setInvestorScenario" data-scenario="${esc(item.id)}">${esc(item.label)}</button>`).join('')}</div>
        <div class="investor-metric-grid">
          ${investorMetric('Illustrative annual revenue', money(scenario.annualRevenue))}
          ${investorMetric('Illustrative EBITDA margin', percent((scenario.ebitdaMargin || 0) * 100))}
          ${investorMetric('Illustrative distributable profit', money(scenario.distributableProfit))}
          ${investorMetric('Investor share at current estimate', money(scenarioInvestorShare))}
          ${investorMetric('Payback range', scenario.paybackRange || 'discussion-only')}
          ${investorMetric('ROI multiple scenario', `${Number(scenario.roiMultiple || 0).toFixed(1)}x`, 'Illustrative only')}
        </div>
        <p class="investor-note">${esc(scenario.notes || '')}</p>
      </article>
    </div>
    <div class="investor-tool-grid">
      <article class="investor-tool-card">
        <h3>Platform Expansion Upside</h3>
        <p>The first hub is a proof point for a repeatable Caribbean controlled-environment agriculture model if successfully executed.</p>
        <div class="platform-stage-list">${(model.expansionStages || []).map(([stage, text]) => `<div><strong>${esc(stage)}</strong><span>${esc(text)}</span></div>`).join('')}</div>
      </article>
      <article class="investor-tool-card">
        <h3>Multi-Hub Revenue Simulator</h3>
        <div class="quick-amount-row">${(model.hubAssumptions?.hubPresets || [1,3,5,10]).map(count => `<button class="ghost-btn ${Number(state.investorHubs) === count ? 'active' : ''}" type="button" data-action="setInvestorHubs" data-hubs="${count}">${count} hub${count === 1 ? '' : 's'}</button>`).join('')}</div>
        <div class="form-grid two">
          <label><span>Custom hubs</span><input data-investor-field="hubs" type="number" min="1" max="25" step="1" value="${esc(state.investorHubs)}"></label>
          <label><span>Revenue per hub</span><input data-investor-field="revenuePerHub" type="number" min="0" step="50000" value="${esc(state.investorAnalysis.revenuePerHub)}"></label>
          <label><span>EBITDA margin (%)</span><input data-investor-field="ebitdaMargin" type="number" min="0" max="60" step="1" value="${esc(state.investorAnalysis.ebitdaMargin)}"></label>
          <label><span>Valuation multiple</span><input data-investor-field="valuationMultiple" type="number" min="0" max="15" step="0.5" value="${esc(state.investorAnalysis.valuationMultiple)}"></label>
        </div>
        <div class="investor-metric-grid">
          ${investorMetric('Platform revenue', money(platform.totalRevenue))}
          ${investorMetric('Platform EBITDA', money(platform.totalEbitda))}
          ${investorMetric('Potential valuation range', money(platform.valuation), 'Scenario multiple')}
          ${investorMetric('Theoretical investor value', money(platform.theoreticalInvestorValue), 'Based on current estimated equity')}
        </div>
      </article>
    </div>
    <div class="investor-tool-grid">
      <article class="investor-tool-card">
        <h3>Use of Funds</h3>
        <div class="funds-list">${useOfFunds.map(([label, amount]) => `<div><span>${esc(label)}</span><strong>${esc(money(amount))}</strong></div>`).join('')}</div>
        <p class="investor-note">Total shown: ${esc(money(model.useOfFundsTotal || 0))}. Allocation remains subject to final budgets, legal structure, and execution planning.</p>
      </article>
      <article class="investor-tool-card">
        <h3>Risk & Mitigation</h3>
        <div class="risk-list">${risks.map(([risk, mitigation]) => `<div><strong>${esc(risk)}</strong><p>${esc(mitigation)}</p></div>`).join('')}</div>
      </article>
    </div>
    <article class="investor-tool-card">
      <h3>Investor Participation Examples</h3>
      <div class="table-wrap"><table><thead><tr><th>Contribution</th><th>Share of raise</th><th>Estimated equity</th><th>Founder/platform allocation</th><th>Remaining raise</th></tr></thead><tbody>${examples.map(row => `<tr><td>${esc(money(row.contribution))}</td><td>${esc(percent(row.shareOfRaisePercent))}</td><td>${esc(percent(row.indicativeInvestorEquityPercent))}</td><td>${esc(money(row.founderDevelopmentAllocationReleased))}</td><td>${esc(money(row.remainingRaise))}</td></tr>`).join('')}</tbody></table></div>
    </article>
    <p class="investor-privacy-note">When you use investor tools or submit investor information, SymbioGreens may record your submitted inputs and interaction history to evaluate investor interest, respond to inquiries, improve investor communications, and support appropriate follow-up. These tools are illustrative and non-binding.</p>
  </section>`;
}
function investorsPanel() {
  trackInvestorPageOpenedOnce();
  const active = state.investorTrack || 'investor';
  const reviewSteps = [['Submit Profile','Complete the appropriate pre-qualification form with detailed information.'],['Initial Review','We review background, readiness, market fit, and strategic alignment.'],['Clarification','If there is potential alignment, we may request more information or schedule a call.'],['Concept Assessment','Qualified opportunities may be assessed for demand, feasibility, capital needs, operating model, and long-term viability.'],['Formal Discussion','Only aligned opportunities move to structured commercial, investment, or partnership review.']];
  const lookFor = ['Serious capital or real market access','Strong local need','Hospitality or specialty buyer demand','Long-term alignment','Operational discipline','Shared value creation'];
  return `<section class="investor-page"><section class="investor-hero"><div class="investor-hero-copy"><div class="eyebrow">Investors & Partnerships</div><h1>Build the Future of Local Food Production With Us</h1><p>SymbioGreens and Balponics are developing a premium controlled-environment agriculture model designed for local freshness, food autonomy, hospitality supply, technical training, and scalable project replication. We welcome serious inquiries from qualified investors and strategic partners aligned with our mission to build smarter local food systems.</p></div><figure class="investor-hero-visual"><img src="public/company/production/investor-partnerships-hero.png" alt="Investors and strategic partnerships two-track overview"></figure></section><section class="track-selector-panel"><div class="section-intro"><h2>Choose Your Track</h2><p>Choose the path that best matches your interest.</p></div><div class="track-selector-grid"><button class="track-selector ${active === 'investor' ? 'active' : ''}" data-action="setInvestorTrack" data-track="investor"><span>I Am an Investor</span><small>For qualified investors seeking exposure to scalable local food production, hydroponic infrastructure, and regional growth opportunities.</small></button><button class="track-selector ${active === 'partner' ? 'active' : ''}" data-action="setInvestorTrack" data-track="partner"><span>I Am a Strategic Partner</span><small>For partners bringing land, capital, market access, buyer relationships, infrastructure, or local execution capacity.</small></button></div><div class="track-selected-note">${active === 'investor' ? 'Investor track selected: review investment opportunities in Balponics, SymbioGreens, farm development, technical platforms, and regional growth.' : 'Strategic partner track selected: explore project partnerships where local partners bring market access, resources, execution capacity, or infrastructure.'}</div></section><section class="track-section investor-track-section ${active === 'investor' ? 'active' : 'muted'}" id="investor-track"><div class="track-header"><div><div class="eyebrow">Investor Track</div><h2>Investor Interest</h2><p>This track is for qualified investors seeking exposure to controlled-environment agriculture, premium local food production, hydroponic infrastructure, farm development, technical platforms, or regional growth opportunities.</p></div><figure><img src="public/company/production/investor-track-overview.png" alt="Investor track pre-qualification overview"></figure></div>${investorInterestForm()}</section><section class="track-section partner-track-section ${active === 'partner' ? 'active' : 'muted'}" id="partner-track"><div class="track-header"><div><div class="eyebrow">Strategic Partner Track</div><h2>Strategic Partnership Interest</h2><p>This track is for partners who want to bring the SymbioGreens / Balponics model to a specific market, country, island, city, hospitality zone, or commercial network.</p><p>SymbioGreens / Balponics can bring the model, systems, crop strategy, training, technical support, brand standards, and operating framework. A local partner may bring land, capital, infrastructure, buyer access, market access, operations, or local execution. Partnership structures vary by project and may involve meaningful long-term participation within the approved investor equity pool, subject to project structure, technical contribution, capital structure, and support role. This is not a fixed offer; final terms require formal review and negotiation.</p></div><figure><img src="public/company/production/strategic-partner-track-overview.png" alt="Strategic partner track overview"></figure></div>${partnerInterestForm()}</section>${investorAnalysisPanel()}<section class="review-process-section"><div class="section-intro"><div class="eyebrow">Review Process</div><h2>How the Review Process Works</h2><p>All submissions are reviewed for strategic fit, readiness, and alignment to ensure we build the right partnerships and invest in the right opportunities.</p></div><figure class="investor-wide-visual"><img src="public/company/production/investor-review-process.png" alt="How the investor and partnership review process works"></figure><div class="review-step-grid">${reviewSteps.map(([title,body], index) => `<article><span>${String(index + 1).padStart(2,'0')}</span><strong>${esc(title)}</strong><p>${esc(body)}</p></article>`).join('')}</div></section><section class="what-we-look-for"><div class="section-intro"><h2>What We Look For</h2></div><div class="investor-card-grid">${lookFor.map(item => `<article><strong>${esc(item)}</strong></article>`).join('')}</div></section><section class="investor-disclaimer"><strong>Important notice</strong><p>This page is for preliminary expressions of interest only. It is not an offer of securities, not a solicitation to invest, not a guaranteed partnership, and not a guarantee that any submission will advance. All opportunities are subject to review, due diligence, legal documentation, negotiation, and applicable laws.</p></section></section>`;
}
function investorInterestForm() {
  return `<form class="investor-form" data-form="investor"><input type="hidden" name="inquiry_type" value="Investor"><h3>Investor Pre-Qualification</h3><div class="form-grid two"><label><span>Full Name</span><input name="full_name" required></label><label><span>Company / Organization</span><input name="company"></label><label><span>Email</span><input name="email" type="email" required></label><label><span>Phone / WhatsApp</span><input name="phone"></label><label><span>Country / City</span><input name="country_city"></label><label><span>Website / LinkedIn</span><input name="website"></label><label><span>Investor Type</span><select name="investor_type"><option>Individual investor</option><option>Family office</option><option>Strategic investor</option><option>Institutional investor</option><option>Development / impact investor</option></select></label><label><span>Area of Interest</span><select name="investment_area"><option>Balponics Technical Systems & Services</option><option>SymbioGreens Farm Development</option><option>SymbioGreens Network / Group Expansion</option><option>Specific Model Farms & Projects</option><option>Regional Replication Projects</option><option>Strategic Growth Capital</option></select></label><label><span>Investment Capacity</span><input name="investment_capacity" placeholder="Indicative range"></label><label><span>Preferred Investment Style</span><input name="investment_style" placeholder="Equity, project finance, strategic capital..."></label><label class="full"><span>Current Sector / Business Background</span><textarea name="sector_background"></textarea></label><label class="full"><span>Why You Are Interested</span><textarea name="why_interested" required></textarea></label><label class="full"><span>Expectations, Return / Impact / Value</span><textarea name="expectations"></textarea></label><label class="full"><span>Resources & Relationships</span><textarea name="resources_relationships"></textarea></label><label class="checkbox-row full"><input type="checkbox" name="review_consent" value="Yes" required><span>I understand this is a selective preliminary review process and not an investment offer or guaranteed opportunity.</span></label></div><button class="primary-btn">Submit Investor Profile</button></form>`;
}
function partnerInterestForm() {
  return `<form class="investor-form" data-form="investor"><input type="hidden" name="inquiry_type" value="Strategic Partner"><h3>Strategic Partner Pre-Qualification</h3><div class="form-grid two"><label><span>Full Name</span><input name="full_name" required></label><label><span>Organization</span><input name="company"></label><label><span>Email</span><input name="email" type="email" required></label><label><span>Phone / WhatsApp</span><input name="phone"></label><label><span>Partner Type</span><select name="partner_type"><option>Market / country partner</option><option>Land or infrastructure partner</option><option>Hospitality / buyer network partner</option><option>Capital partner</option><option>Operations partner</option><option>Government / institutional partner</option></select></label><label><span>Target Market & Location</span><input name="target_market" required></label><label class="full"><span>Local Opportunity / Market Need</span><textarea name="local_opportunity"></textarea></label><label class="full"><span>Potential Buyers / Commercial Network</span><textarea name="buyers"></textarea></label><label class="full"><span>Contribution / Resources You May Bring</span><textarea name="contributions" placeholder="Land, capital, infrastructure, permits, logistics, team, buyer access..."></textarea></label><label><span>Capital & Readiness</span><input name="capital_readiness" placeholder="Budget range, readiness level"></label><label><span>Timeline</span><input name="timeline"></label><label class="full"><span>Partnership Vision</span><textarea name="partnership_vision" required></textarea></label><label class="full"><span>Your Role in the Project</span><textarea name="role_in_project"></textarea></label><label class="full"><span>Strategic Alignment</span><textarea name="strategic_alignment"></textarea></label><label class="checkbox-row full"><input type="checkbox" name="review_consent" value="Yes" required><span>I understand partnership structures vary by project and require formal review, negotiation, and legal documentation.</span></label></div><button class="primary-btn">Submit Partnership Profile</button></form>`;
}
function investorPrivatePlaceholderPanel(route) {
  const labels = {
    investorAccess:'Investor Access',
    investorLogin:'Investor Login',
    investorDashboard:'Private Investor Dashboard',
    investorModel:'Investor Model',
    investorDocuments:'Investor Documents'
  };
  return `<section class="form-panel"><div class="eyebrow">Private Investor Platform</div><h1>${esc(labels[route] || 'Investor Access')}</h1><p>This private investor area is prepared for future Supabase authentication and approved investor access. Financial model details, documents, potential non-binding commitments, and dashboard materials must remain behind secure approved access before production launch.</p><p>Current static mode does not create live investor accounts, send invitation emails, or expose confidential documents.</p><button class="primary-btn" data-route="investors">Return To Investor & Partnerships</button></section>`;
}
function investorReviewPanel() {
  return `<section class="form-panel"><h1>Investor Review</h1><p>This prototype route is protected in production by backend authentication and approved investor access. Local access requests are reviewed in the manager dashboard.</p><button class="primary-btn" data-route="investors">${esc(t('investors'))}</button></section>`;
}
function legalPanel(route) {
  const title = route === 'privacy' ? t('privacy') : route === 'terms' ? t('terms') : route === 'disclaimer' ? t('disclaimer') : t('legal');
  return `<section class="form-panel"><div class="eyebrow">${esc(t('legal'))}</div><h1>${esc(title)}</h1><p>This website and platform prototype are provided for general corporate, product, market-intelligence, and buyer-interest information only. Content on this site does not constitute a binding product offer, investment solicitation, legal advice, financial advice, or agricultural performance guarantee.</p><p>Product images, descriptions, production concepts, availability timelines, and operational examples may be illustrative or subject to change. Agricultural output can vary by crop, genetics, climate, system design, water quality, nutrient program, operating discipline, labor, logistics, and other conditions.</p><p>No guarantee is made regarding product availability, yield, delivery timing, business performance, investment return, or production outcome unless stated in signed formal agreements. Investor, partnership, and project discussions require separate documentation, due diligence, and approved legal materials.</p><p>All trademarks, names, images, platform content, product descriptions, and site materials are owned by or licensed to SymbioGreens, Balponics, or their respective owners. All rights reserved.</p></section>`;
}

function openProduct(id) {
  const p = productById(id);
  if (!p) return;
  state.selectedProduct = id;
  document.getElementById('productModal').innerHTML = `<div class="modal-backdrop" data-action="closeModal"></div><div class="modal-card product-modal-card"><button class="ghost-btn modal-close" data-action="closeModal">${esc(t('close'))}</button><figure class="product-modal-media"><img src="${esc(detailImageFor(p))}" alt="${esc(productName(p))}"></figure><div class="product-modal-body"><div class="eyebrow">${esc(categoryLabel(p.category_id))}</div><h2>${esc(productName(p))}</h2><p class="product-modal-lede">${esc(localizedProductCopy(p.flavor_profile))}</p><div class="story-band product-modal-details"><article><strong>${esc(t('flavor'))}</strong><p>${esc(localizedProductCopy(p.flavor_profile))}</p></article><article><strong>${esc(t('texture'))}</strong><p>${esc(localizedProductCopy(p.texture, 'productTextureNote'))}</p></article><article><strong>${esc(t('possibleFormats'))}</strong><p>${esc(productFormats(p))}</p></article></div><p class="product-modal-note"><strong>${esc(t('productionNote'))}</strong> ${esc(t('publicProductionNote'))}</p><button class="primary-btn" data-action="startProductionSurvey">${esc(t('takeSurvey'))}</button></div></div>`;
  document.getElementById('productModal').classList.add('open');
  document.getElementById('productModal').setAttribute('aria-hidden','false');
  applyRuntimeTranslations(document.getElementById('productModal'));
}
function openSurveyProduct(id) {
  const p = productById(id);
  if (!p || state.session?.role !== 'buyer') return openProduct(id);
  const d = getDraft(id);
  const interestOptions = [['', ''], ['High interest', t('highInterest')], ['Medium interest', t('mediumInterest')], ['Low interest', t('lowInterest')], ['Just exploring', t('justExploring')]];
  const quantityOptions = [['', ''], ['Small sample quantity', t('smallSampleQuantity')], ['Weekly supply', t('weeklySupply')], ['Bi-weekly supply', t('biWeeklySupply')], ['Monthly supply', t('monthlySupply')], ['Seasonal interest', t('seasonalInterest')], ['To be discussed', t('toBeDiscussed')]];
  const frequencyOptions = [['', ''], ['Weekly', t('weekly')], ['Twice per week', t('twicePerWeek')], ['Bi-weekly', t('biWeekly')], ['Monthly', t('monthly')], ['Event-based', t('eventBased')], ['To be discussed', t('toBeDiscussed')]];
  const saved = hasSavedInterest(id);
  state.selectedProduct = id;
  document.getElementById('productModal').innerHTML = `<div class="modal-backdrop" data-action="closeModal"></div><div class="modal-card product-modal-card survey-product-modal-card"><button class="ghost-btn modal-close" data-action="closeModal">${esc(t('close'))}</button><figure class="product-modal-media"><img src="${esc(detailImageFor(p))}" alt="${esc(productName(p))}"></figure><div class="product-modal-body"><div class="eyebrow">${esc(categoryLabel(p.category_id))}</div><h2>${esc(productName(p))}</h2>${saved ? `<span class="saved-badge inline">${esc(t('interestSaved'))}</span>` : ''}<p class="product-modal-lede">${esc(localizedProductCopy(p.flavor_profile))}</p><div class="story-band product-modal-details"><article><strong>${esc(t('flavor'))}</strong><p>${esc(localizedProductCopy(p.flavor_profile))}</p></article><article><strong>${esc(t('texture'))}</strong><p>${esc(localizedProductCopy(p.texture, 'productTextureNote'))}</p></article><article><strong>${esc(t('possibleFormats'))}</strong><p>${esc(productFormats(p))}</p></article></div><form class="survey-product-form" data-form="productInterest" data-product="${esc(id)}"><h3>${esc(t('surveyDemandDetails'))}</h3><label><span>${esc(t('interestLevel'))}</span><select name="interest_level">${surveySelectOptions(interestOptions, d.interest_level || '')}</select></label><label><span>${esc(t('estimatedQuantity'))}</span><select name="estimated_quantity">${surveySelectOptions(quantityOptions, d.estimated_quantity || d.weekly_volume || '')}</select></label><label><span>${esc(t('preferredDeliveryFrequency'))}</span><select name="delivery_frequency">${surveySelectOptions(frequencyOptions, d.delivery_frequency || '')}</select></label><label><span>${esc(t('packagingPreferences'))}</span><input name="packaging_preference" value="${esc(d.packaging_preference || '')}" placeholder="${esc(t('toBeDiscussed'))}"></label><label class="checkbox-row"><input type="checkbox" name="sample_request" value="Yes" ${d.sample_request === 'Yes' ? 'checked' : ''}><span>${esc(t('sampleRequestLabel'))}</span></label><label><span>${esc(t('buyerRequirements'))}</span><textarea name="comments" placeholder="${esc(t('buyerRequirements'))}">${esc(d.comments || '')}</textarea></label><div class="survey-modal-actions"><button class="primary-btn" type="submit">${esc(t('saveProductInterest'))}</button><button class="ghost-btn" type="button" data-action="saveSurveyProduct" data-product="${esc(id)}">${esc(t('saveContinueBrowsing'))}</button>${saved ? `<button class="ghost-btn danger" type="button" data-action="removeSurveyProduct" data-product="${esc(id)}">${esc(t('removeInterest'))}</button>` : ''}</div><div class="modal-status" aria-live="polite"></div></form></div></div>`;
  document.getElementById('productModal').classList.add('open');
  document.getElementById('productModal').setAttribute('aria-hidden','false');
  applyRuntimeTranslations(document.getElementById('productModal'));
}
async function saveSurveyProductFromModal(productId, closeAfter = false) {
  const form = document.querySelector(`form[data-form="productInterest"][data-product="${CSS.escape(productId)}"]`);
  if (!form) return;
  const fd = new FormData(form);
  const payload = productInterestPayload(productId, fd);
  const patch = {
    interest_level: payload.interest_level,
    estimated_quantity: payload.estimated_quantity,
    weekly_volume: payload.estimated_quantity,
    delivery_frequency: payload.preferred_delivery_frequency,
    sample_request: payload.sample_requested ? 'Yes' : 'No',
    packaging_preference: payload.packaging_preferences,
    comments: payload.notes
  };
  saveDraft(productId, patch);
  const result = await saveProductInterest(payload);
  const status = form.querySelector('.modal-status');
  if (status) status.textContent = backendSyncUnavailable(result) ? localSyncMessage() : t('productInterestSaved');
  if (closeAfter) {
    setTimeout(() => {
      closeModal();
      if (state.route === 'catalog') mount();
    }, 450);
  }
}
function openImageLightbox(src, title) {
  if (!src) return;
  document.getElementById('productModal').innerHTML = `<div class="modal-backdrop" data-action="closeModal"></div><div class="modal-card project-lightbox-card"><button class="ghost-btn modal-close" data-action="closeModal">${esc(t('close'))}</button><figure><img src="${esc(src)}" alt="${esc(title || 'Project visual')}"><figcaption>${esc(title || 'Project visual')}</figcaption></figure></div>`;
  document.getElementById('productModal').classList.add('open');
  document.getElementById('productModal').setAttribute('aria-hidden','false');
  applyRuntimeTranslations(document.getElementById('productModal'));
}
function openExecutiveProfile(id) {
  const profile = executiveProfiles().find(item => item.id === id);
  if (!profile) return;
  document.getElementById('productModal').innerHTML = `<div class="modal-backdrop" data-action="closeModal"></div><div class="modal-card executive-modal-card"><button class="ghost-btn modal-close" data-action="closeModal">${esc(t('close'))}</button><figure class="executive-modal-media"><img src="${esc(profile.image)}" alt="${esc(profile.name)} executive portrait"></figure><div class="executive-modal-body"><div class="eyebrow">${esc(t('Executive Leadership'))}</div><h2>${esc(profile.name)}</h2><strong>${esc(profile.title)}</strong><p class="executive-tagline">${esc(profile.tagline)}</p><div class="tag-row">${profile.highlights.map(item => `<span class="tag">${esc(item)}</span>`).join('')}</div>${profile.bio.map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}</div></div>`;
  document.getElementById('productModal').classList.add('open');
  document.getElementById('productModal').setAttribute('aria-hidden','false');
  applyRuntimeTranslations(document.getElementById('productModal'));
}
function closeModal() { const modal = document.getElementById('productModal'); modal.innerHTML = ''; modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }

async function registerBuyer(e) {
  e.preventDefault();
  const fd = Object.fromEntries(new FormData(e.target));
  const email = normalizeEmail(fd.email);
  if (!isValidEmail(email) || !fd.first_name || !fd.business_name || !fd.password) return alert(t('requiredFieldsMissing'));
  const respondents = asArray(readStore(storeKeys.respondents, []));
  if (respondents.some(r => normalizeEmail(r.email) === email)) return alert(translateText('A buyer profile already exists for this email.'));
  const business = {id:uid('biz'), name:cleanText(fd.business_name,160), type:cleanText(fd.business_type,120), city:cleanText(fd.city,120), weekly_budget:cleanText(fd.weekly_budget,80)};
  const respondent = {id:uid('rsp'), business_id:business.id, first_name:cleanText(fd.first_name,80), last_name:cleanText(fd.last_name,80), email, phone:cleanText(fd.phone,60), password_hash:await hashText(fd.password), account_status:'Active', notes:cleanText(fd.notes), created_at:new Date().toISOString()};
  writeStore(storeKeys.businesses, [...asArray(readStore(storeKeys.businesses, [])), business]);
  writeStore(storeKeys.respondents, [...respondents, respondent]);
  logEmail(email, 'buyer_registration_confirmation', 'SymbioGreens buyer registration received');
  notifyInternal('manager_new_buyer_alert', `New buyer registered: ${email}`);
  state.session = {role:'buyer', respondent_id:respondent.id, email};
  writeStore(storeKeys.session, state.session);
  navigateToRoute('catalog', {closeModal:false});
}
async function loginBuyer(e) {
  e.preventDefault();
  const fd = Object.fromEntries(new FormData(e.target));
  const email = normalizeEmail(fd.email);
  const user = asArray(readStore(storeKeys.respondents, [])).find(r => normalizeEmail(r.email) === email);
  if (!user || user.account_status === 'Inactive' || !(await passwordMatches(user, fd.password))) return alert(t('invalidLogin'));
  state.session = {role:'buyer', respondent_id:user.id, email};
  writeStore(storeKeys.session, state.session);
  navigateToRoute('dashboard', {closeModal:false});
}
async function loginManager(e) {
  e.preventDefault();
  const fd = Object.fromEntries(new FormData(e.target));
  if (!isValidEmail(fd.email)) return alert(t('validEmailRequired'));
  const pass = normalizePassword(fd.password);
  if (pass.length < 10) return alert(translateText('Use at least 10 characters.'));
  const existing = readStore(storeKeys.managerPassphraseHash, '');
  const hash = await hashText(pass);
  if (!existing) {
    if (pass !== normalizePassword(fd.confirm_password)) return alert(t('passwordsMustMatch'));
    writeStore(storeKeys.managerPassphraseHash, hash);
  } else if (hash !== existing) return alert(translateText('Invalid manager passphrase.'));
  state.session = {role:'manager', email:normalizeEmail(fd.email)};
  writeStore(storeKeys.session, state.session);
  navigateToRoute('manager', {closeModal:false});
}
async function submitSurvey(categoryId) {
  const r = currentRespondent();
  if (!r) return;
  const drafts = readStore(storeKeys.drafts, {});
  const selected = Object.entries(drafts).filter(([key,d]) => key.startsWith(`${r.id}:`) && (!categoryId || productById(d.product_id)?.category_id === categoryId)).map(([,d]) => d).filter(d => d.interest_level || d.sample_request === 'Yes' || d.weekly_volume || d.comments);
  if (!selected.length) return alert(translateText('No product interest has been selected yet.'));
  const survey = {id:uid('srv'), respondent_id:r.id, business_id:r.business_id, category_id:categoryId || 'all_categories', submitted_at:new Date().toISOString()};
  const responseRows = selected.map(d => ({...d, id:uid('resp'), survey_id:survey.id, respondent_id:r.id, business_id:r.business_id, created_at:new Date().toISOString()}));
  const sampleRows = selected.filter(d => d.sample_request === 'Yes').map(d => ({id:uid('sample'), product_id:d.product_id, respondent_id:r.id, business_id:r.business_id, status:'Requested', created_at:new Date().toISOString()}));
  writeStore(storeKeys.surveys, [...asArray(readStore(storeKeys.surveys, [])), survey]);
  writeStore(storeKeys.responses, [...asArray(readStore(storeKeys.responses, [])), ...responseRows]);
  writeStore(storeKeys.samples, [...asArray(readStore(storeKeys.samples, [])), ...sampleRows]);
  if (window.SymbioGreensBackend?.isBackendEnabled?.()) {
    const surveyPayload = {
      local_buyer_id: r.id,
      local_business_id: r.business_id,
      category_id: categoryId || 'all_categories',
      category_label: categoryId ? categoryLabel(categoryId) : 'All Categories',
      response_scope: categoryId ? 'category' : 'all_categories',
      responses: responseRows.map(row => ({
        ...row,
        product_name: productById(row.product_id) ? productName(productById(row.product_id)) : row.product_id,
        category_id: productById(row.product_id)?.category_id || ''
      })),
      status: 'submitted',
      submitted_at: survey.submitted_at,
      language: state.lang,
      source_page: location.hash || hashForRoute(state.route),
      metadata: {local_survey_id: survey.id, local_buyer_id: r.id, local_business_id: r.business_id}
    };
    const results = await Promise.all([
      window.SymbioGreensBackend.saveBuyerSurvey(surveyPayload),
      ...selected.map(d => saveProductInterest(productInterestPayload(d.product_id)))
    ]);
    if (results.some(backendSyncUnavailable)) alert(localSyncMessage());
  }
  notifyInternal('manager_survey_alert', `Survey submitted by ${r.email}`);
  navigateToRoute('thankyou', {closeModal:false});
}
async function requestReset(e) {
  e.preventDefault();
  const email = normalizeEmail(new FormData(e.target).get('email'));
  const user = asArray(readStore(storeKeys.respondents, [])).find(r => normalizeEmail(r.email) === email);
  if (!user) return alert(t('resetProfileNotFound'));
  const code = Math.random().toString(36).slice(2,8).toUpperCase();
  const resets = readStore(storeKeys.passwordResets, {});
  resets[email] = {code, respondent_id:user.id, created_at:new Date().toISOString(), used:false};
  writeStore(storeKeys.passwordResets, resets);
  state.resetEmail = email;
  alert(`Local reset code for ${email}: ${code}\n\nPrototype only. Production must send this securely by email.`);
  navigateToRoute('resetPassword', {closeModal:false});
}
async function resetPassword(e) {
  e.preventDefault();
  const fd = Object.fromEntries(new FormData(e.target));
  const email = normalizeEmail(fd.email);
  const reset = readStore(storeKeys.passwordResets, {})[email];
  if (!reset || reset.used || reset.code !== String(fd.reset_code || '').trim().toUpperCase()) return alert(t('resetCodeInvalid'));
  if (normalizePassword(fd.new_password) !== normalizePassword(fd.confirm_password)) return alert(t('passwordsMustMatch'));
  const respondents = asArray(readStore(storeKeys.respondents, []));
  const index = respondents.findIndex(r => r.id === reset.respondent_id);
  if (index < 0) return;
  respondents[index] = {...respondents[index], password_hash:await hashText(fd.new_password), account_status:'Active', password_reset_required:false, updated_at:new Date().toISOString()};
  writeStore(storeKeys.respondents, respondents);
  const resets = readStore(storeKeys.passwordResets, {});
  resets[email] = {...reset, used:true};
  writeStore(storeKeys.passwordResets, resets);
  alert(t('passwordChanged'));
  navigateToRoute('login', {closeModal:false});
}
async function submitContact(e) {
  e.preventDefault();
  const fd = Object.fromEntries(new FormData(e.target));
  if (!isValidEmail(fd.email)) return alert(t('validEmailRequired'));
  const rows = asArray(readStore(storeKeys.contactInquiries, []));
  const row = {
    id:uid('inq'),
    name:cleanText(fd.name,160),
    email:normalizeEmail(fd.email),
    phone:cleanText(fd.phone,80),
    company:cleanText(fd.company,160),
    region:cleanText(fd.region,160),
    inquiry_type:cleanText(fd.inquiry_type || 'General Inquiry',120),
    organization_type:cleanText(fd.organization_type,120),
    message:cleanText(fd.message),
    created_at:new Date().toISOString(),
    status:'New'
  };
  rows.push(row);
  writeStore(storeKeys.contactInquiries, rows);
  const result = await window.SymbioGreensBackend?.saveContactMessage?.({
    ...row,
    language: state.lang,
    source_page: location.hash || hashForRoute(state.route),
    metadata: {local_contact_id: row.id}
  });
  notifyInternal('manager_public_inquiry_alert', `Public inquiry from ${fd.name || fd.email}`);
  alert(backendSyncUnavailable(result) ? localSyncMessage() : t('contactSaved'));
  state.contactInquiryType = '';
  e.target.reset();
}
async function submitInvestor(e) {
  e.preventDefault();
  const fd = Object.fromEntries(new FormData(e.target));
  if (!isValidEmail(fd.email)) return alert(t('validEmailRequired'));
  const rows = asArray(readStore(storeKeys.investorRequests, []));
  const cleaned = Object.fromEntries(Object.entries(fd).map(([key, value]) => [key, cleanText(value)]));
  const row = {...cleaned, id:uid('inv'), inquiry_type:cleanText(fd.inquiry_type || 'Investor / Partner'), full_name:cleanText(fd.full_name,160), email:normalizeEmail(fd.email), company:cleanText(fd.company,160), status:'new', approved_access:false, created_at:new Date().toISOString()};
  rows.push(row);
  writeStore(storeKeys.investorRequests, rows);
  const result = await window.SymbioGreensBackend?.saveInvestorPrequalification?.({
    ...row,
    language: state.lang,
    source_page: location.hash || hashForRoute(state.route),
    metadata: {local_investor_request_id: row.id}
  });
  await trackInvestorEvent('prequalification_submitted', {source_section:'investor_prequalification', event_payload: row, contribution_amount: cleanText(fd.investment_capacity || fd.capital_readiness || '')});
  notifyInternal('manager_investor_request_alert', `${fd.inquiry_type || 'Investor / partner'} request from ${fd.full_name || fd.email}`);
  alert(backendSyncUnavailable(result) ? localSyncMessage() : t('investorSubmissionThanks'));
  e.target.reset();
}
async function submitNonBindingInvestorInterest(requestReview = false) {
  const analysis = contributionAnalysis();
  const platform = platformAnalysis();
  const payload = {
    opportunity_area: 'SymbioGreens Caribbean platform',
    interest_summary: [
      `Contribution scenario: ${money(analysis.contribution)}`,
      `Estimated equity: ${percent(analysis.estimatedEquityPercent)}`,
      `Participation: ${state.investorAnalysis.participation}`,
      `Interest level: ${state.investorAnalysis.interestLevel}`,
      state.investorAnalysis.notes ? `Notes: ${state.investorAnalysis.notes}` : ''
    ].filter(Boolean).join('\n'),
    target_region: 'Las Terrenas / Caribbean platform',
    preferred_structure: state.investorAnalysis.participation,
    status: requestReview ? 'reviewing' : 'new',
    metadata: {
      session_id: investorSessionId(),
      investor_type: state.investorAnalysis.investorType,
      contribution_amount: analysis.contribution,
      share_of_raise_percent: analysis.shareOfRaisePercent,
      estimated_equity_percent: analysis.estimatedEquityPercent,
      founder_platform_allocation: analysis.founderAllocation,
      remaining_raise: analysis.remainingRaise,
      platform_scenario: platform
    },
    created_at: new Date().toISOString()
  };
  const rows = asArray(readStore(storeKeys.investorFeedback, []));
  rows.push({...payload, id:uid('inv_interest'), request_review: requestReview});
  writeStore(storeKeys.investorFeedback, rows);
  await trackInvestorEvent(requestReview ? 'investor_review_requested' : 'non_binding_interest_submitted', {
    source_section: 'investor_analysis',
    contribution_amount: analysis.contribution,
    estimated_equity: analysis.estimatedEquityPercent,
    event_payload: payload.metadata
  });
  if (window.SymbioGreensBackend?.isBackendEnabled?.()) {
    await window.SymbioGreensBackend.saveInvestorInterest?.(payload);
    await window.SymbioGreensBackend.investor?.saveInvestorCalculatorSession?.({
      scenario_name: state.investorScenario,
      inputs: {...state.investorAnalysis, hubs: state.investorHubs},
      outputs: {analysis, platform},
      is_saved: true,
      created_at: new Date().toISOString()
    });
  }
  alert(requestReview ? 'Investor review request saved. This is non-binding and subject to formal review.' : 'Non-binding investor interest saved for discussion.');
}
async function manageUser(action, userId) {
  const respondents = asArray(readStore(storeKeys.respondents, []));
  const index = respondents.findIndex(r => r.id === userId);
  if (index < 0) return;
  if (action === 'activateUser') respondents[index].account_status = 'Active';
  if (action === 'deactivateUser') respondents[index].account_status = 'Inactive';
  if (action === 'resetUserPassword') {
    const temporaryPassword = `SG-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
    respondents[index].password_hash = await hashText(temporaryPassword);
    respondents[index].password_reset_required = true;
    respondents[index].account_status = 'Active';
    alert(`Temporary password for ${respondents[index].email}: ${temporaryPassword}\n\nPrototype only. Production must send this through secure reset email.`);
  }
  respondents[index].updated_at = new Date().toISOString();
  writeStore(storeKeys.respondents, respondents);
  mount();
}
function exportCsv(kind) {
  const map = {respondents:readStore(storeKeys.respondents, []), responses:readStore(storeKeys.responses, []), samples:readStore(storeKeys.samples, [])};
  const rows = map[kind] || [];
  if (!rows.length) return alert(t('noData'));
  const heads = [...new Set(rows.flatMap(r => Object.keys(r)))];
  const cell = v => `"${String(v ?? '').replaceAll('"','""')}"`;
  download(`${kind}.csv`, [heads.map(cell).join(','), ...rows.map(r => heads.map(h => cell(r[h])).join(','))].join('\n'), 'text/csv');
}
function exportWorkbook() {
  const sections = [['respondents',readStore(storeKeys.respondents, [])],['responses',readStore(storeKeys.responses, [])],['samples',readStore(storeKeys.samples, [])]];
  download('symbiogreens-market-intelligence-workbook.xls', `<html><body>${sections.map(([name,rows]) => `<h2>${name}</h2>${tableView(rows)}`).join('<br>')}</body></html>`, 'application/vnd.ms-excel');
}
function download(name, content, type) { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([content], {type})); a.download = name; a.click(); URL.revokeObjectURL(a.href); }

document.addEventListener('click', e => {
  const routeBtn = e.target.closest('[data-route]');
  if (routeBtn) { e.preventDefault(); navigateToRoute(routeBtn.dataset.route); return; }
  const langBtn = e.target.closest('[data-lang]');
  if (langBtn) { state.lang = langBtn.dataset.lang; writeStore(storeKeys.language, state.lang); mount(); return; }
  const catBtn = e.target.closest('[data-category]');
  if (catBtn) { state.category = catBtn.dataset.category; mount(); return; }
  const tabBtn = e.target.closest('[data-manager-tab]');
  if (tabBtn) { state.managerTab = tabBtn.dataset.managerTab; mount(); return; }
  const actionBtn = e.target.closest('[data-action]');
  const surveyProductCard = e.target.closest('.survey-product-card[data-survey-product]');
  const publicProductCard = e.target.closest('.public-product-card[data-product]');
  if (!actionBtn && surveyProductCard) { openSurveyProduct(surveyProductCard.dataset.surveyProduct); return; }
  if (!actionBtn && publicProductCard) { openProduct(publicProductCard.dataset.product); return; }
  if (!actionBtn) return;
  const action = actionBtn.dataset.action;
  if (action === 'homeStart') { e.preventDefault(); navigateToRoute('landing'); return; }
  if (action === 'logout') { localStorage.removeItem(storeKeys.session); state.session = null; navigateToRoute('landing'); return; }
  if (action === 'startProductionSurvey') { navigateToRoute(state.session?.role === 'buyer' ? 'catalog' : 'register'); return; }
  if (action === 'openProduct') { openProduct(actionBtn.dataset.product); return; }
  if (action === 'openSurveyProduct') { openSurveyProduct(actionBtn.dataset.product); return; }
  if (action === 'saveSurveyProduct') { saveSurveyProductFromModal(actionBtn.dataset.product, true); return; }
  if (action === 'removeSurveyProduct') { removeDraft(actionBtn.dataset.product); closeModal(); if (state.route === 'catalog') mount(); return; }
  if (action === 'openImageLightbox') { openImageLightbox(actionBtn.dataset.image, actionBtn.dataset.title); return; }
  if (action === 'openExecutiveProfile') { openExecutiveProfile(actionBtn.dataset.executive); return; }
  if (action === 'setHomeModel') { state.activeHomeModel = actionBtn.dataset.homeModel || 'symbio'; mount(); return; }
  if (action === 'setHomeFamily') { state.activeHomeFamily = actionBtn.dataset.homeFamily || 'lettuces'; mount(); return; }
  if (action === 'setHomeHydro') { state.activeHomeHydro = actionBtn.dataset.homeHydro || 'water'; mount(); return; }
  if (action === 'setHomeStep') { state.activeHomeStep = actionBtn.dataset.homeStep || 'profile'; mount(); return; }
  if (action === 'setInvestorTrack') { state.investorTrack = actionBtn.dataset.track || 'investor'; mount(); setTimeout(() => document.querySelector(state.investorTrack === 'partner' ? '#partner-track' : '#investor-track')?.scrollIntoView({behavior:'smooth', block:'start'}), 0); return; }
  if (action === 'setInvestorContribution') {
    state.investorAnalysis.contribution = Number(actionBtn.dataset.contribution || 0);
    const analysis = contributionAnalysis();
    trackInvestorEvent('quick_contribution_clicked', {source_section:'investment_calculator', contribution_amount: analysis.contribution, estimated_equity: analysis.estimatedEquityPercent});
    mount();
    return;
  }
  if (action === 'setInvestorScenario') {
    state.investorScenario = actionBtn.dataset.scenario || 'base';
    trackInvestorEvent('scenario_viewed', {source_section:'first_hub_economics', scenario_name: state.investorScenario});
    mount();
    return;
  }
  if (action === 'setInvestorHubs') {
    state.investorHubs = Number(actionBtn.dataset.hubs || 1);
    trackInvestorEvent('multi_hub_simulator_used', {source_section:'multi_hub_simulator', event_payload: platformAnalysis()});
    mount();
    return;
  }
  if (action === 'calculateInvestorScenario') {
    const analysis = contributionAnalysis();
    trackInvestorEvent('scenario_calculated', {source_section:'investment_calculator', contribution_amount: analysis.contribution, estimated_equity: analysis.estimatedEquityPercent, scenario_name: state.investorScenario});
    alert(`Illustrative scenario calculated: ${percent(analysis.estimatedEquityPercent)} estimated equity on ${money(analysis.contribution)}. This is non-binding and discussion-only.`);
    return;
  }
  if (action === 'submitInvestorInterest') { submitNonBindingInvestorInterest(false); return; }
  if (action === 'requestInvestorReview') { submitNonBindingInvestorInterest(true); return; }
  if (action === 'setContactInquiry') { state.contactInquiryType = actionBtn.dataset.inquiry || ''; mount(); setTimeout(() => document.querySelector('[data-form="contact"]')?.scrollIntoView({behavior:'smooth', block:'center'}), 0); return; }
  if (action === 'focusContactForm') { document.querySelector('[data-form="contact"]')?.scrollIntoView({behavior:'smooth', block:'center'}); return; }
  if (action === 'closeModal') { closeModal(); return; }
  if (action === 'toggleWhy') { state.expandedWhy = state.expandedWhy === actionBtn.dataset.why ? null : actionBtn.dataset.why; mount(); return; }
  if (action === 'submitCategory') { submitSurvey(state.category); return; }
  if (action === 'submitAll') { submitSurvey(null); return; }
  if (action === 'exportWorkbook') { exportWorkbook(); return; }
  if (action === 'exportRespondents') { exportCsv('respondents'); return; }
  if (['activateUser','deactivateUser','resetUserPassword'].includes(action)) { manageUser(action, actionBtn.dataset.user); return; }
});
document.addEventListener('focusin', e => {
  if (e.target.closest?.('.investor-form') && !state._investorPrequalStarted) {
    state._investorPrequalStarted = true;
    trackInvestorEvent('prequalification_started', {source_section:'investor_prequalification'});
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
document.addEventListener('input', e => {
  if (e.target.matches('[data-search]')) { state.search = e.target.value; mount(); return; }
  if (e.target.matches('[data-investor-field]')) {
    const field = e.target.dataset.investorField;
    const numericFields = ['contribution','revenuePerHub','ebitdaMargin','valuationMultiple','timelineYears'];
    if (field === 'hubs') {
      state.investorHubs = Number(e.target.value || 1);
      trackInvestorEvent('valuation_sensitivity_changed', {source_section:'valuation_sensitivity', event_payload: platformAnalysis()});
      mount();
      return;
    }
    state.investorAnalysis[field] = numericFields.includes(field) ? Number(e.target.value || 0) : e.target.value;
    const analysis = contributionAnalysis();
    trackInvestorEvent(field === 'contribution' ? 'contribution_amount_entered' : 'valuation_sensitivity_changed', {source_section:'investor_analysis', contribution_amount: analysis.contribution, estimated_equity: analysis.estimatedEquityPercent, event_payload: {[field]: state.investorAnalysis[field]}});
    mount();
    return;
  }
  const draft = e.target.dataset.draft;
  if (draft) { const [productId, field] = draft.split(':'); saveDraft(productId, {[field]: e.target.value}); }
});
document.addEventListener('submit', e => {
  const form = e.target.dataset.form;
  if (!form) return;
  e.preventDefault();
  if (form === 'register') registerBuyer(e);
  if (form === 'buyerLogin') loginBuyer(e);
  if (form === 'managerLogin') loginManager(e);
  if (form === 'requestReset') requestReset(e);
  if (form === 'resetPassword') resetPassword(e);
  if (form === 'contact') submitContact(e);
  if (form === 'investor') submitInvestor(e);
  if (form === 'productInterest') saveSurveyProductFromModal(e.target.dataset.product, false);
});
window.addEventListener('hashchange', () => { state.route = routeFromLocation(); closeModal(); mount(); scrollRouteToTop(); });

state.route = routeFromLocation();
if (!state.category && categories()[0]) state.category = categories()[0].id;
mount();



