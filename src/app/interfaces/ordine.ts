import { Prodotto } from "./prodotto";

export interface Ordine {
    acquisti:Prodotto[],
      totale: number,
      data: Date|undefined,
      idUtente: number,
      indirizzo: string,
      metodoDiPagamento: string,
      id: number|undefined
}
