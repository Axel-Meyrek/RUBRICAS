const Rubrica = (titulo, descripcion, fecha, id) => {
    return (
        /* HTML */
        `<article class="rubrica">
            <div class="rubrica_container">
                <h3 class="rubrica_name">${titulo}</h3>
                <p class="rubrica_description">${descripcion}</p>
                    <p class="rubrica_fecha">Creada el ${fecha}</p>
            </div>
            
            <div class="rubrica_containerButtons">
                
                <button onclick="simularRubrica(${id})" class="rubrica_button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M21.544 11.045c.304.426.456.64.456.955c0 .316-.152.529-.456.955C20.178 14.871 16.689 19 12 19c-4.69 0-8.178-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12c0-.316.152-.529.456-.955C3.822 9.129 7.311 5 12 5c4.69 0 8.178 4.13 9.544 6.045"/><path d="M15 12a3 3 0 1 0-6 0a3 3 0 0 0 6 0"/></g></svg>
                </button>

                <button onclick="editarRubrica(${id})" class="rubrica_button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 1024 1024"><path fill="currentColor" d="M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z"/><path fill="currentColor" d="m469.952 554.24l52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"/></svg>
                    Editar
                </button>
                
                <button class="rubrica_button rubrica_button--delete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 40 40"><path fill="currentColor" d="M32.937 7.304H27.19v-.956c0-1.345-.423-2.32-1.278-2.915c-.604-.39-1.353-.588-2.224-.588h-6.441l-.014.003l-.014-.003h-.909c-2.259 0-3.503 1.244-3.503 3.503v.956H7.063a.75.75 0 0 0 0 1.5h.647l1.946 25.785c0 1.631.945 2.566 2.594 2.566h15.461c1.611 0 2.557-.93 2.592-2.51L32.25 8.804h.686a.75.75 0 0 0 .001-1.5m-2.302 2.976H9.326l-.111-1.476h21.531zM14.308 6.348c0-1.423.58-2.003 2.003-2.003h7.378c.578 0 1.053.117 1.389.333c.413.287.613.833.613 1.67v.956H14.308zm14.498 28.224c-.019.81-.295 1.083-1.095 1.083H12.25c-.818 0-1.094-.269-1.096-1.123L9.439 11.779h21.082z"/><path fill="currentColor" d="M17.401 12.969a.75.75 0 0 0-.722.776l.704 19.354a.75.75 0 0 0 .748.723l.028-.001a.75.75 0 0 0 .722-.776l-.703-19.355c-.015-.414-.353-.757-.777-.721m-4.649.001a.75.75 0 0 0-.696.8l1.329 19.354a.75.75 0 0 0 .747.698l.053-.002a.75.75 0 0 0 .696-.8l-1.329-19.354a.756.756 0 0 0-.8-.696m9.784-.001c-.419-.04-.762.308-.776.722l-.705 19.354a.75.75 0 0 0 .722.776l.028.001a.75.75 0 0 0 .748-.723l.705-19.354a.75.75 0 0 0-.722-.776m4.649.001a.757.757 0 0 0-.8.696L25.056 33.02a.75.75 0 0 0 .696.8l.053.002a.75.75 0 0 0 .747-.698l1.329-19.354a.75.75 0 0 0-.696-.8"/></svg>
                </button>
            </div>
        </article>`);

}

export default Rubrica;