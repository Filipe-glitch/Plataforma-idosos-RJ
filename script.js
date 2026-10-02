document.addEventListener("DOMContentLoaded", function () {
    let currentFontSize = 18;

    // Aumentar Fonte (A+) - Altera a raiz HTML afetando todos os rem/elementos
    document.getElementById("btn-increase-font").addEventListener("click", function () {
        if (currentFontSize < 28) {
            currentFontSize += 2;
            document.documentElement.style.setProperty('--base-font-size', currentFontSize + 'px');
        }
    });

    // Diminuir Fonte (A-) - Altera a raiz HTML afetando todos os rem/elementos
    document.getElementById("btn-decrease-font").addEventListener("click", function () {
        if (currentFontSize > 14) {
            currentFontSize -= 2;
            document.documentElement.style.setProperty('--base-font-size', currentFontSize + 'px');
        }
    });

    // Alternar Alto Contraste
    document.getElementById("btn-toggle-contrast").addEventListener("click", function () {
        document.body.classList.toggle("high-contrast");
    });

    // Lógica do Formulário com Integração para Google Agenda
    const form = document.getElementById("reminder-form");
    const output = document.getElementById("reminder-output");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("reminder-title").value;
        const date = document.getElementById("reminder-date").value;
        const time = document.getElementById("reminder-time").value;

        // Formatação da data e hora para a URL do Google Calendar (YYYYMMDDTHHMMSSZ)
        const dateFormatted = date.replace(/-/g, "");
        const timeFormatted = time.replace(":", "") + "00";
        const startDateTime = `${dateFormatted}T${timeFormatted}`;
        const endDateTime = `${dateFormatted}T${(parseInt(time.replace(":", "")) + 100).toString().padStart(4, '0')}00`;

        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent("Lembrete criado via Portal Digital da Terceira Idade RJ")}`;

        output.innerHTML = `
            <div style="margin-top: 20px; padding: 15px; background: #dcfce7; color: #14532d; border-radius: 6px; border: 1px solid #86efac;">
                <strong>✓ Lembrete Gerado!</strong><br>
                📌 <strong>Compromisso:</strong> ${title}<br>
                📅 <strong>Data/Hora:</strong> ${date} às ${time}<br><br>
                <a href="${googleCalendarUrl}" target="_blank" rel="noopener" class="btn-google-calendar">
                    📅 Salvar na Google Agenda
                </a>
            </div>
        `;

        form.reset();
    });
});