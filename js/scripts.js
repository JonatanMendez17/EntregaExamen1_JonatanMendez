  // Datos para las diferentes páginas
        const data = {
            team: [
                { name: "Ana García", role: "Diseñadora UI/UX", img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
                { name: "Carlos López", role: "Desarrollador Frontend", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w-300&q=80" },
                { name: "María Rodríguez", role: "Desarrolladora Backend", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
                { name: "Pedro Martínez", role: "Gerente de Proyecto", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" }
            ],
            services: [
                { title: "Diseño Web", description: "Creación de sitios web atractivos y responsivos", icon: "🎨" },
                { title: "Desarrollo Frontend", description: "Implementación de interfaces de usuario modernas", icon: "💻" },
                { title: "Desarrollo Backend", description: "Construcción de lógica de servidor y bases de datos", icon: "⚙️" },
                { title: "E-commerce", description: "Tiendas online completas con sistemas de pago", icon: "🛒" },
                { title: "SEO", description: "Optimización para motores de búsqueda", icon: "🔍" },
                { title: "Mantenimiento", description: "Soporte y actualizaciones continuas", icon: "🔧" }
            ],
            portfolio: [
                { title: "Tienda Online Moda", category: "ecommerce", description: "E-commerce completo para marca de moda" },
                { title: "Portal Corporativo", category: "web", description: "Sitio web corporativo con panel de administración" },
                { title: "App de Reservas", category: "web", description: "Aplicación web para reservas en línea" },
                { title: "Identidad de Marca", category: "design", description: "Diseño de logotipo y materiales de marketing" },
                { title: "Blog Personal", category: "web", description: "Blog personalizado con sistema de comentarios" },
                { title: "Plataforma Educativa", category: "web", description: "Sitio web para cursos en línea" }
            ],
            events: [
                "Webinar: Introducción al Desarrollo Web - 15 de noviembre",
                "Taller de Diseño UX/UI - 22 de noviembre",
                "Charla sobre JavaScript Moderno - 30 de noviembre",
                "Curso de React para Principiantes - 5 de diciembre"
            ],
            values: [
                "Calidad en cada proyecto",
                "Innovación constante",
                "Compromiso con el cliente",
                "Trabajo en equipo",
                "Transparencia en los procesos"
            ]
        };

        // Variables globales
        let counterValue = 0;
        let visitCount = localStorage.getItem('visitCount') || 0;
        
        // Inicialización cuando el DOM está listo
        document.addEventListener('DOMContentLoaded', function() {
            // Actualizar contador de visitas
            visitCount++;
            document.getElementById('visit-count').textContent = visitCount;
            localStorage.setItem('visitCount', visitCount);
            
            // Configurar navegación
            setupNavigation();
            
            // Configurar eventos de la página de inicio
            setupHomePage();
            
            // Configurar eventos de la página "Nosotros"
            setupAboutPage();
            
            // Configurar eventos de la página "Servicios"
            setupServicesPage();
            
            // Configurar eventos de la página "Portafolio"
            setupPortfolioPage();
            
            // Configurar eventos de la página "Contacto"
            setupContactPage();
            
            // Cargar datos iniciales
            loadInitialData();
        });
        
        // Configurar navegación entre páginas
        function setupNavigation() {
            const navLinks = document.querySelectorAll('.nav-link');
            const logo = document.querySelector('.logo');
            
            // Navegación por enlaces
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const pageId = this.getAttribute('data-page');
                    
                    // Cambiar página activa
                    switchPage(pageId);
                    
                    // Actualizar enlace activo
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Logo también lleva a la página de inicio
            logo.addEventListener('click', function(e) {
                e.preventDefault();
                switchPage('home');
                
                // Actualizar enlace activo
                navLinks.forEach(l => l.classList.remove('active'));
                document.querySelector('.nav-link[data-page="home"]').classList.add('active');
            });
        }
        
        // Cambiar entre páginas
        function switchPage(pageId) {
            // Ocultar todas las páginas
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Mostrar la página seleccionada
            document.getElementById(pageId).classList.add('active');
            
            // Cargar contenido específico de la página si es necesario
            if (pageId === 'about' && document.getElementById('team-container').innerHTML === '') {
                loadTeam();
            } else if (pageId === 'services' && document.getElementById('services-container').innerHTML === '') {
                loadServices();
            } else if (pageId === 'portfolio' && document.getElementById('portfolio-container').innerHTML === '') {
                loadPortfolio();
            }
        }
        
        // Configurar página de inicio
        function setupHomePage() {
            // Botón de saludo
            document.getElementById('welcome-btn').addEventListener('click', function() {
                const messages = [
                    "¡Hola! Bienvenido a nuestro sitio web.",
                    "Esperamos que disfrutes tu visita.",
                    "Gracias por explorar nuestro contenido.",
                    "No dudes en contactarnos si tienes preguntas."
                ];
                
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                const messageEl = document.getElementById('welcome-message');
                
                messageEl.textContent = randomMessage;
                messageEl.className = 'message success';
                messageEl.style.display = 'block';
                
                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    messageEl.style.display = 'none';
                }, 5000);
            });
            
            // Contador
            document.getElementById('increase-btn').addEventListener('click', function() {
                counterValue++;
                updateCounter();
            });
            
            document.getElementById('decrease-btn').addEventListener('click', function() {
                counterValue--;
                updateCounter();
            });
            
            document.getElementById('reset-btn').addEventListener('click', function() {
                counterValue = 0;
                updateCounter();
            });
            
            // Cargar eventos
            document.getElementById('load-events').addEventListener('click', loadEvents);
        }
        
        // Actualizar contador
        function updateCounter() {
            document.getElementById('counter').textContent = counterValue;
            
            // Cambiar color según el valor
            const counterEl = document.getElementById('counter');
            if (counterValue > 0) {
                counterEl.style.color = '#28a745';
            } else if (counterValue < 0) {
                counterEl.style.color = '#dc3545';
            } else {
                counterEl.style.color = '#4a6fa5';
            }
        }
        
        // Configurar página "Nosotros"
        function setupAboutPage() {
            // Cargar equipo
            document.getElementById('load-team').addEventListener('click', loadTeam);
            
            // Alternar valores
            document.getElementById('toggle-values').addEventListener('click', function() {
                const valuesList = document.getElementById('values-list');
                
                if (valuesList.innerHTML === '') {
                    loadValues();
                    this.textContent = 'Ocultar Valores';
                } else {
                    valuesList.innerHTML = '';
                    this.textContent = 'Mostrar Valores';
                }
            });
        }
        
        // Configurar página "Servicios"
        function setupServicesPage() {
            // Cargar servicios
            document.getElementById('load-services').addEventListener('click', loadServices);
            
            // Calculadora de precios
            const pagesSlider = document.getElementById('pages');
            const pagesValue = document.getElementById('pages-value');
            const serviceType = document.getElementById('service-type');
            const estimatedCost = document.getElementById('estimated-cost');
            
            // Actualizar valor del slider
            pagesSlider.addEventListener('input', function() {
                pagesValue.textContent = `${this.value} página${this.value > 1 ? 's' : ''}`;
                calculatePrice();
            });
            
            // Cambio en tipo de servicio
            serviceType.addEventListener('change', calculatePrice);
            
            // Botón calcular
            document.getElementById('calculate-cost').addEventListener('click', calculatePrice);
            
            // Calcular precio inicial
            calculatePrice();
        }
        
        // Configurar página "Portafolio"
        function setupPortfolioPage() {
            // Cargar portafolio
            document.getElementById('load-portfolio').addEventListener('click', loadPortfolio);
            
            // Filtro de proyectos
            document.getElementById('filter-category').addEventListener('change', filterProjects);
        }
        
        // Configurar página "Contacto"
        function setupContactPage() {
            // Formulario de contacto
            document.getElementById('contact-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                
                // Simular envío de formulario
                const formMessage = document.getElementById('form-message');
                
                if (name && email && message) {
                    formMessage.textContent = `¡Gracias ${name}! Tu mensaje ha sido enviado. Te contactaremos pronto a ${email}.`;
                    formMessage.className = 'message success';
                    
                    // Limpiar formulario
                    this.reset();
                } else {
                    formMessage.textContent = 'Por favor, completa todos los campos obligatorios.';
                    formMessage.className = 'message error';
                }
                
                formMessage.style.display = 'block';
                
                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            });
            
            // Alternar mapa
            document.getElementById('toggle-map').addEventListener('click', function() {
                const map = document.getElementById('map');
                
                if (map.style.display === 'none') {
                    map.style.display = 'flex';
                    this.textContent = 'Ocultar Mapa';
                } else {
                    map.style.display = 'none';
                    this.textContent = 'Mostrar Mapa';
                }
            });
        }
        
        // Cargar datos iniciales
        function loadInitialData() {
            // Cargar eventos en la página de inicio
            loadEvents();
            
            // Cargar valores en la página "Nosotros"
            loadValues();
        }
        
        // Cargar eventos
        function loadEvents() {
            const eventsList = document.getElementById('events-list');
            eventsList.innerHTML = '';
            
            data.events.forEach(event => {
                const eventItem = document.createElement('div');
                eventItem.className = 'section';
                eventItem.innerHTML = `<p>📅 ${event}</p>`;
                eventsList.appendChild(eventItem);
            });
            
            document.getElementById('load-events').textContent = 'Eventos Cargados';
            document.getElementById('load-events').disabled = true;
        }
        
        // Cargar equipo
        function loadTeam() {
            const teamContainer = document.getElementById('team-container');
            teamContainer.innerHTML = '';
            
            data.team.forEach(member => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <img src="${member.img}" alt="${member.name}">
                    <div class="card-content">
                        <h3>${member.name}</h3>
                        <p>${member.role}</p>
                    </div>
                `;
                teamContainer.appendChild(card);
            });
            
            document.getElementById('load-team').textContent = 'Equipo Cargado';
            document.getElementById('load-team').disabled = true;
        }
        
        // Cargar valores
        function loadValues() {
            const valuesList = document.getElementById('values-list');
            valuesList.innerHTML = '';
            
            data.values.forEach(value => {
                const li = document.createElement('li');
                li.textContent = value;
                li.style.margin = '0.5rem 0';
                li.style.paddingLeft = '1rem';
                li.style.listStyleType = 'disc';
                valuesList.appendChild(li);
            });
        }
        
        // Cargar servicios
        function loadServices() {
            const servicesContainer = document.getElementById('services-container');
            servicesContainer.innerHTML = '';
            
            data.services.forEach(service => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-content">
                        <h3>${service.icon} ${service.title}</h3>
                        <p>${service.description}</p>
                    </div>
                `;
                servicesContainer.appendChild(card);
            });
            
            document.getElementById('load-services').textContent = 'Servicios Cargados';
            document.getElementById('load-services').disabled = true;
        }
        
        // Cargar portafolio
        function loadPortfolio() {
            const portfolioContainer = document.getElementById('portfolio-container');
            portfolioContainer.innerHTML = '';
            
            data.portfolio.forEach(project => {
                const card = document.createElement('div');
                card.className = 'card';
                card.setAttribute('data-category', project.category);
                card.innerHTML = `
                    <div class="card-content">
                        <h3>${project.title}</h3>
                        <p><strong>Categoría:</strong> ${project.category}</p>
                        <p>${project.description}</p>
                    </div>
                `;
                portfolioContainer.appendChild(card);
            });
            
            document.getElementById('load-portfolio').textContent = 'Proyectos Cargados';
            document.getElementById('load-portfolio').disabled = true;
            
            // Inicializar filtro
            filterProjects();
        }
        
        // Calcular precio de servicios
        function calculatePrice() {
            const serviceType = document.getElementById('service-type').value;
            const pages = parseInt(document.getElementById('pages').value);
            
            let basePrice = 0;
            let pageMultiplier = 100;
            
            switch(serviceType) {
                case 'basic':
                    basePrice = 500;
                    pageMultiplier = 80;
                    break;
                case 'ecommerce':
                    basePrice = 1500;
                    pageMultiplier = 120;
                    break;
                case 'custom':
                    basePrice = 3000;
                    pageMultiplier = 200;
                    break;
            }
            
            const totalPrice = basePrice + (pages * pageMultiplier);
            document.getElementById('estimated-cost').textContent = `$${totalPrice.toLocaleString()}`;
        }
        
        // Filtrar proyectos
        function filterProjects() {
            const category = document.getElementById('filter-category').value;
            const projects = document.querySelectorAll('#portfolio-container .card');
            const filteredProjects = document.getElementById('filtered-projects');
            
            // Contador de proyectos por categoría
            let count = 0;
            
            projects.forEach(project => {
                if (category === 'all' || project.getAttribute('data-category') === category) {
                    project.style.display = 'block';
                    count++;
                } else {
                    project.style.display = 'none';
                }
            });
            
            // Mostrar contador
            filteredProjects.innerHTML = `<p>Mostrando ${count} proyecto${count !== 1 ? 's' : ''} de la categoría "${category}"</p>`;
        }