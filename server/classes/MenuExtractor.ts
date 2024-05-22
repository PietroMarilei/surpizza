class MenuExtractor {
  /**
   * Estrae i piatti e i loro prezzi da un testo di menu.
   * @param text Il testo del menu da analizzare.
   * @returns Un array di oggetti, ciascuno contenente il nome e il prezzo di un piatto.
   */
  extractDishes(text: string): Array<{ name: string; price: string }> {
    const dishes: Array<{ id: number | string; name: string; price: string }> =
      [];
    // Regex per identificare il nome del piatto e il prezzo
    const regex = /([^\d]+?)\s+([e€\s]*\d+[\s,]*\d*[,.]?\d*\s*)/gi;
    let match;

    let i = 0;
    while ((match = regex.exec(text)) !== null) {
      i++;
      let name = match[1].trim();
      let price = match[2].trim().replace(/\s+/g, "");

      // Pulizia dei caratteri speciali mantenendo lettere, numeri, spazi e il simbolo dell'euro
      name = this.cleanText(name);
      price = this.cleanText(price);

      // Sostituisci il carattere '\' con un ritorno a capo '\n' nel nome
      name = this.replaceBackslashWithNewline(name);

      dishes.push({ id: i, name, price });
    }

    return dishes;
  }
  //TODO: rivedere questa parte forse quei caratteri erano intepretati come "a capo"?
  //TODO: aggiungere uno skip per 4 Formaggi
  /**
   * Rimuove tutti i caratteri speciali tranne le lettere (anche accentate), i numeri, gli spazi e il simbolo dell'euro.
   * @param text Il testo da pulire.
   * @returns Il testo pulito.
   */
  cleanText(text: string): string {
    // Includi caratteri accentati e il simbolo dell'euro
    return text.replace(/[^\w\s€,\.À-ÖØ-öø-ÿ]/gi, "");
  }

  /**
   * Sostituisce ogni occorrenza del carattere '\' con un ritorno a capo '\n'.
   * @param text Il testo da modificare.
   * @returns Il testo modificato.
   */
  replaceBackslashWithNewline(text: string): string {
    return text.replace(/\\/g, "\n");
  }
}

export default MenuExtractor;
