document.addEventListener('DOMContentLoaded', function() {
    // Obtém os campos de e-mail, senha, o botão de login e a área de mensagens de erro
    const campoEmail = document.querySelector('input[name="email"]');
    const campoSenha = document.querySelector('input[name="password"]');
    const botaoLogin = document.querySelector('.botao');
    const areaErro = document.querySelector('.area-erro'); // Área de erro onde a mensagem será exibida

    // Função para validar o formato do e-mail
    function validarEmail(email) {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,}$/;
        return regexEmail.test(email);
    }

    // Função para verificar se ambos os campos estão preenchidos e o e-mail é válido
    function verificarCampos() {
        const emailValido = validarEmail(campoEmail.value);

        // Exibe ou limpa a mensagem de erro de email
        if (!emailValido && campoEmail.value !== "") {
            areaErro.textContent = "Por favor, insira um e-mail válido."; // Mensagem de erro
        } else {
            areaErro.textContent = ""; // Limpa a mensagem de erro
        }

        // Habilita o botão se o e-mail for válido e a senha estiver preenchida
        if (campoEmail.value !== "" && campoSenha.value !== "" && emailValido) {
            botaoLogin.disabled = false; // Habilita o botão
        } else {
            botaoLogin.disabled = true;  // Desabilita o botão
        }
    }

    // Adiciona eventos de 'input' para os campos de e-mail e senha
    campoEmail.addEventListener('input', verificarCampos);
    campoSenha.addEventListener('input', verificarCampos);

    // Adiciona um evento de clique ao botão de login
    botaoLogin.addEventListener('click', function(event) {
        // Previne o comportamento padrão de enviar o formulário
        event.preventDefault();

        // Obtém os valores dos campos de e-mail e senha
        const email = campoEmail.value;
        const senha = campoSenha.value;

        // Valida os campos
        if (email === "" || senha === "") {
            alert("Por favor, preencha todos os campos.");
        } else if (!validarEmail(email)) {
            alert("Por favor, insira um e-mail válido.");
        } else {
            // Criar objeto com os dados a serem enviados
            const dadosLogin = {
                email: email,
                senha: senha
            };
            console.log(dadosLogin)
            // Enviar dados para o backend usando fetch
            fetch('http://localhost:3000/login/efetuar-login', {  
                method: 'POST',  // Tipo da requisição (POST)
                headers: {
                    'Content-Type': 'application/json',  // Tipo de conteúdo sendo enviado
                },
                body: JSON.stringify(dadosLogin)  // Enviar os dados como JSON
            })
            .then(response => response.json())  // Converte a resposta para JSON
            .then(data => {
                if (data.statusCode) {
                    // Exibe a mensagem de erro se a resposta do backend não for de sucesso
                    alert('Login falhou: ' + data.message);
                } else {
                    // Exibe a mensagem de erro se a resposta do backend não for de sucesso
                    window.location.href = "main.html";
                }
            })
            .catch(error => {
                console.error('Erro ao enviar a requisição:', error);
                alert('Ocorreu um erro ao tentar realizar o login. Tente novamente.');
            });
        }
    });

    // Inicializa o estado do botão (desabilitado ao carregar a página)
    verificarCampos();
});
