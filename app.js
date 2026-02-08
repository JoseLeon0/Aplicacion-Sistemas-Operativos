        const questions = [
            {
                q: "¿Qué es un sistema operativo y por qué se considera el software más importante?",
                a: "Un sistema operativo es el software que coordina y dirige todos los servicios y aplicaciones que utiliza el usuario en una computadora. Se considera el más importante porque administra los recursos del sistema y permite que el hardware y el software funcionen correctamente."
            },
            {
                q: "¿Para qué sirve un sistema operativo?",
                a: "Sirve para permitir que otros programas funcionen, administrar los recursos del sistema, establecer la comunicación entre el usuario y el hardware y asegurar el correcto funcionamiento del equipo."
            },
            {
                q: "¿Cuáles son los componentes principales de un sistema operativo?",
                a: "Sistema de archivos (organiza y estructura los archivos), Interpretación de comandos (traduce las órdenes del usuario), y Núcleo/Kernel (gestiona procesos, memoria, entrada y salida de datos)."
            },
            {
                q: "Menciona cuatro funciones de un sistema operativo.",
                a: "1. Gestionar la memoria RAM, 2. Administrar el CPU, 3. Controlar entradas y salidas de datos, 4. Administrar archivos y permisos de usuario."
            },
            {
                q: "¿Por qué el sistema operativo es intermediario entre usuario y hardware?",
                a: "Porque permite que el usuario interactúe con la computadora sin conocer el lenguaje del hardware, controlando y administrando los recursos del sistema."
            },
            {
                q: "¿Qué es una interfaz de usuario y por qué es necesaria?",
                a: "Es el medio que permite al usuario interactuar con el sistema operativo para ejecutar tareas, configurar el sistema y solucionar problemas."
            },
            {
                q: "Diferencia entre CLI y GUI.",
                a: "CLI: interfaz basada en texto mediante comandos. GUI: interfaz gráfica basada en iconos y elementos visuales."
            },
            {
                q: "Ejemplo de uso de CLI.",
                a: "Cuando un administrador del sistema necesita ejecutar comandos avanzados o automatizar tareas específicas."
            },
            {
                q: "Diferencia entre sistema monousuario y multiusuario.",
                a: "Monousuario: solo permite un usuario a la vez. Multiusuario: permite varios usuarios simultáneamente."
            },
            {
                q: "Diferencia entre multitarea y monotarea.",
                a: "Monotarea: ejecuta un solo proceso. Multitarea: ejecuta varios procesos al mismo tiempo."
            },
            {
                q: "Diferencia entre sistema centralizado y distribuido.",
                a: "Centralizado: usa recursos de una sola computadora. Distribuido: utiliza recursos de varias computadoras."
            },
            {
                q: "¿Qué es una estructura monolítica?",
                a: "Es una estructura donde el sistema operativo está formado por un solo programa con rutinas que pueden comunicarse entre sí."
            },
            {
                q: "Ejemplo de estructura monolítica.",
                a: "Los cajeros automáticos, ya que cumplen funciones específicas predefinidas."
            },
            {
                q: "¿Cómo funciona la estructura jerárquica?",
                a: "Organiza el sistema en capas donde cada una se construye sobre la anterior, protegiendo el núcleo."
            },
            {
                q: "¿Qué son los 'rings'?",
                a: "Son anillos concéntricos que representan niveles de protección, donde el núcleo está más protegido."
            },
            {
                q: "¿Qué es una máquina virtual?",
                a: "Es un sistema que simula una computadora real y permite ejecutar varios sistemas operativos al mismo tiempo."
            },
            {
                q: "¿Qué es la estructura cliente-servidor?",
                a: "Es una estructura donde el cliente solicita servicios y el servidor responde, permitiendo múltiples conexiones."
            },
            {
                q: "¿Qué es el kernel?",
                a: "Es el núcleo del sistema operativo y la interfaz entre el software y el hardware."
            },
            {
                q: "Función del kernel.",
                a: "Controla el acceso al procesador, memoria, dispositivos y gestiona los recursos del sistema."
            },
            {
                q: "Capas del kernel.",
                a: "1. Interfaz con el hardware, 2. Gestión de memoria, 3. Gestor de procesos, 4. Gestor de dispositivos, 5. Sistema de archivos."
            },
            {
                q: "Cuatro funciones del kernel.",
                a: "1. Gestión del almacenamiento, 2. Gestión de procesos, 3. Control de dispositivos, 4. Llamadas al sistema y seguridad."
            },
            {
                q: "Gestión del almacenamiento.",
                a: "Controla cuánta memoria se usa y dónde se almacena."
            },
            {
                q: "Gestión de procesos.",
                a: "Decide qué procesos usa la CPU, cuándo y por cuánto tiempo."
            },
            {
                q: "Controlador de dispositivos.",
                a: "Permite la comunicación entre el hardware y los procesos."
            },
            {
                q: "Llamadas al sistema y seguridad.",
                a: "Permiten que los procesos soliciten servicios al sistema operativo de forma segura."
            },
            {
                q: "Espacio del kernel y del usuario.",
                a: "El kernel opera en un espacio protegido, mientras que los programas del usuario funcionan en un espacio separado."
            },
            {
                q: "Características de un sistema operativo moderno.",
                a: "1. Seguridad, 2. Facilidad de uso, 3. Administración eficiente de recursos, 4. Actualización constante."
            }
        ];

        let currentMode = null;
        let currentIndex = 0;
        let score = 0;
        let answers = [];

        // Mode selection
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', () => {
                const mode = card.dataset.mode;
                selectMode(mode);
            });
        });

        function selectMode(mode) {
            currentMode = mode;
            currentIndex = 0;
            score = 0;
            answers = [];

            document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));
            document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
            document.getElementById('studyArea').classList.remove('hidden');

            if (mode === 'flashcards') {
                initFlashcards();
            } else if (mode === 'quiz') {
                initQuiz();
            } else if (mode === 'review') {
                initReview();
            }
        }

        // FLASHCARDS MODE
        function initFlashcards() {
            renderFlashcard();
        }

        function renderFlashcard() {
            const studyArea = document.getElementById('studyArea');
            const current = questions[currentIndex];

            studyArea.innerHTML = `
                <div class="flashcard" onclick="flipCard()">
                    <div class="flashcard-inner" id="flashcardInner">
                        <div class="flashcard-front">
                            <div class="card-content">${current.q}</div>
                        </div>
                        <div class="flashcard-back">
                            <div class="card-content">${current.a}</div>
                        </div>
                    </div>
                </div>
                <div class="controls">
                    <button class="btn btn-secondary" onclick="previousCard()" ${currentIndex === 0 ? 'disabled' : ''}>
                        ← Anterior
                    </button>
                    <div class="progress">
                        ${currentIndex + 1} / ${questions.length}
                    </div>
                    <button class="btn btn-primary" onclick="nextCard()" ${currentIndex === questions.length - 1 ? 'disabled' : ''}>
                        Siguiente →
                    </button>
                </div>
            `;
        }

        function flipCard() {
            document.getElementById('flashcardInner').classList.toggle('flipped');
        }

        function nextCard() {
            if (currentIndex < questions.length - 1) {
                currentIndex++;
                renderFlashcard();
            }
        }

        function previousCard() {
            if (currentIndex > 0) {
                currentIndex--;
                renderFlashcard();
            }
        }

        // QUIZ MODE
        function initQuiz() {
            answers = [];
            score = 0;
            currentIndex = 0;
            renderQuizQuestion();
        }

        function renderQuizQuestion() {
            if (currentIndex >= questions.length) {
                showQuizResults();
                return;
            }

            const studyArea = document.getElementById('studyArea');
            const current = questions[currentIndex];
            
            // Create wrong answers by mixing other answers
            const wrongAnswers = questions
                .filter((_, i) => i !== currentIndex)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(q => q.a);
            
            const allOptions = [current.a, ...wrongAnswers].sort(() => Math.random() - 0.5);

            studyArea.innerHTML = `
                <div class="quiz-question">
                    Pregunta ${currentIndex + 1} de ${questions.length}
                </div>
                <div class="quiz-question" style="font-size: 1.1em; font-weight: normal; margin-bottom: 30px;">
                    ${current.q}
                </div>
                <div class="quiz-options" id="quizOptions">
                    ${allOptions.map((opt, i) => `
                        <div class="quiz-option" data-answer="${opt}" onclick="selectQuizAnswer(this, '${current.a}')">
                            ${opt}
                        </div>
                    `).join('')}
                </div>
                <div class="controls">
                    <div class="progress">
                        ${currentIndex + 1} / ${questions.length}
                    </div>
                    <button class="btn btn-primary hidden" id="nextQuizBtn" onclick="nextQuizQuestion()">
                        Siguiente →
                    </button>
                </div>
            `;
        }

        function selectQuizAnswer(element, correctAnswer) {
            const options = document.querySelectorAll('.quiz-option');
            options.forEach(opt => {
                opt.style.pointerEvents = 'none';
                if (opt.dataset.answer === correctAnswer) {
                    opt.classList.add('correct');
                } else if (opt === element) {
                    opt.classList.add('incorrect');
                }
            });

            const isCorrect = element.dataset.answer === correctAnswer;
            if (isCorrect) score++;
            answers.push(isCorrect);

            document.getElementById('nextQuizBtn').classList.remove('hidden');
        }

        function nextQuizQuestion() {
            currentIndex++;
            renderQuizQuestion();
        }

        function showQuizResults() {
            const studyArea = document.getElementById('studyArea');
            const percentage = Math.round((score / questions.length) * 100);
            
            let message = '';
            let emoji = '';
            if (percentage >= 90) {
                message = '¡Excelente trabajo!';
                emoji = '🎉';
            } else if (percentage >= 70) {
                message = '¡Muy bien!';
                emoji = '👍';
            } else if (percentage >= 50) {
                message = 'Buen intento';
                emoji = '📚';
            } else {
                message = 'Sigue estudiando';
                emoji = '💪';
            }

            studyArea.innerHTML = `
                <div class="score-display">
                    <div style="font-size: 5em; margin-bottom: 20px;">${emoji}</div>
                    <h2 style="margin-bottom: 20px;">${message}</h2>
                    <div class="score-number">${score}/${questions.length}</div>
                    <div style="font-size: 1.5em; color: #666; margin: 20px 0;">
                        ${percentage}% correcto
                    </div>
                    <div style="margin-top: 30px;">
                        <button class="btn btn-primary" onclick="initQuiz()">Reintentar</button>
                        <button class="btn btn-secondary" onclick="location.reload()">Volver al inicio</button>
                    </div>
                </div>
            `;
        }

        // REVIEW MODE
        function initReview() {
            const studyArea = document.getElementById('studyArea');
            
            studyArea.innerHTML = `
                <h2 style="margin-bottom: 25px; color: #333;">📖 Repaso General</h2>
                <div class="review-list">
                    ${questions.map((item, index) => `
                        <div class="review-item">
                            <div class="review-question">${index + 1}. ${item.q}</div>
                            <div class="review-answer">${item.a}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="controls" style="margin-top: 20px;">
                    <button class="btn btn-secondary" onclick="location.reload()">Volver al inicio</button>
                </div>
            `;
        }