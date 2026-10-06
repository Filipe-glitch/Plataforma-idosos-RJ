// função para fechar o menu quando o usuário clica em algo 
document.querySelectorAll('nav .ul a').forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

document.getElementById("reminder-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("reminder-title").value;
    const date = document.getElementById("reminder-date").value; // AAAA-MM-DD
    const time = document.getElementById("reminder-time").value; // HH:MM

    // Formata a data para exibição brasileira (DD/MM/AAAA)
    const [year, month, day] = date.split("-");
    const dataBR = `${day}/${month}/${year}`;

    // Cria os objetos de data para calcular 1h de duração com precisão
    const start = new Date(`${date}T${time}:00`);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    // Converte para ISO string sem pontuações (AAAAMMDDTHHMMSS)
    const toISO = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0];

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${toISO(start)}/${toISO(end)}&details=${encodeURIComponent("Lembrete criado via Portal Digital da Terceira Idade RJ")}`;

    document.getElementById("reminder-output").innerHTML = `
        <div style="margin-top: 20px; padding: 15px; background: #dcfce7; color: #14532d; border-radius: 8px; border: 1px solid #86efac;">
            <strong>✓ Lembrete Gerado!</strong><br>
            📌 <strong>Compromisso:</strong> ${title}<br>
            📅 <strong>Data/Hora:</strong> ${dataBR} às ${time}<br><br>
            <a href="${calendarUrl}" target="_blank" rel="noopener" class="btn-google-calendar">
                📅 Salvar na Google Agenda
            </a>
        </div>
    `;

    this.reset();
});